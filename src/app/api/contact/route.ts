import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';

// Принудительно используем Node.js runtime для поддержки TCP соединений
export const runtime = 'nodejs';

// Define schema for contact form data
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  message: z.string().min(1, "Message is required").max(1000, "Message is too long"),
});

// Basic in-memory rate limiter
// NOTE: In production, consider using Redis or a service like Upstash
// for persistent rate limiting across server restarts and multiple instances
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string | null): boolean {
  if (!ip) {
    logger.warn('Rate limit check with unknown IP');
    return true; // Allow if IP is unknown (e.g., local development)
  }

  const now = Date.now();
  const requests = (rateLimitMap.get(ip) || []).filter(
    timestamp => now - timestamp < RATE_LIMITS.contact.windowMs
  );
  requests.push(now);
  rateLimitMap.set(ip, requests);

  const allowed = requests.length <= RATE_LIMITS.contact.maxRequests;

  if (!allowed) {
    logger.warn('Rate limit exceeded', { ip, requestCount: requests.length });
  }

  return allowed;
}

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter(
      t => now - t < RATE_LIMITS.contact.windowMs
    );
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate input using Zod
    const validatedData = contactFormSchema.parse(body);
    const { name, email, message } = validatedData;

    // Create transporter using your SMTP server
    // Security: Only disable certificate validation in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const rejectUnauthorized = isDevelopment
      ? process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      : true; // Always validate certificates in production

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for SSL (port 465), false for STARTTLS (port 587)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized,
        // Add minimum TLS version for security
        minVersion: 'TLSv1.2',
      },
    });

    logger.debug('SMTP transporter created', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      rejectUnauthorized,
    });

    // Verify connection
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"Fables Monster Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log success without sensitive information
    logger.info('Email sent successfully', {
      messageId: info.messageId,
      subject: mailOptions.subject,
      recipientDomain: mailOptions.to?.split('@')[1], // Log only domain, not full email
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Contact form validation failed', {
        ip,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    // Log error with details but don't expose them to client
    logger.error('Email sending failed', {
      ip,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

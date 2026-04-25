import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIdentifier, isAllowedOrigin } from '@/lib/security';

// Принудительно используем Node.js runtime для поддержки TCP соединений
export const runtime = 'nodejs';

// Escape HTML special characters to prevent injection in email content
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Define schema for contact form data
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  subject: z.string().max(160, "Subject is too long").optional(),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
});

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (!transporterPromise) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const rejectUnauthorized = isDevelopment
      ? process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      : true;

    transporterPromise = (async () => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized,
          minVersion: 'TLSv1.2',
        },
      });

      await transporter.verify();

      logger.debug('SMTP transporter verified', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        rejectUnauthorized,
      });

      return transporter;
    })();
  }

  try {
    return await transporterPromise;
  } catch (error) {
    transporterPromise = null;
    throw error;
  }
}

export async function POST(request: NextRequest) {
  const clientKey = getClientIdentifier(request);

  if (!isAllowedOrigin(request)) {
    logger.warn('Blocked contact request from disallowed origin', { clientKey });
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  if (!checkRateLimit(`contact:${clientKey}`, RATE_LIMITS.contact)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate input using Zod
    const validatedData = contactFormSchema.parse(body);
    const { name, email, message, subject } = validatedData;
    const safeSubject = subject?.replace(/[\r\n]+/g, ' ').trim();

    const transporter = await getTransporter();

    // Email content
    const mailOptions = {
      from: `"Fables Monster Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: safeSubject || `New Contact Form Message from ${escapeHtml(name)}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${safeSubject || 'Contact form'}
Message: ${message}
      `,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject || 'Contact form')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
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
        clientKey,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    // Log error with details but don't expose them to client
    logger.error('Email sending failed', {
      clientKey,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    transporterPromise = null;

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

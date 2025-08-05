import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Принудительно используем Node.js runtime для поддержки TCP соединений
export const runtime = 'nodejs';

// Define schema for contact form data
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  message: z.string().min(1, "Message is required").max(1000, "Message is too long"),
});

// Basic in-memory rate limiter (for demonstration purposes)
const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS = 5; // Max requests per IP
const TIME_WINDOW = 60 * 1000; // 60 seconds

function checkRateLimit(ip: string | null) {
  if (!ip) return true; // Allow if IP is unknown (e.g., local development without proper headers)

  const now = Date.now();
  const requests = (rateLimitMap.get(ip) || []).filter(timestamp => now - timestamp < TIME_WINDOW);
  requests.push(now);
  rateLimitMap.set(ip, requests);

  return requests.length <= MAX_REQUESTS;
}

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
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // false for STARTTLS (port 587) or true for SSL (port 465)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Required for self-signed certificates or specific server configurations
      },
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
    await transporter.sendMail(mailOptions);

    // Log success (consider using a proper logging solution in production)
    console.log('Email sent successfully:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Email sending failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

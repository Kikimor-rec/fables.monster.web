import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';

export const runtime = 'nodejs';

// Schema for requesting management email
const requestSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
});

// Basic in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string | null): boolean {
  if (!ip) {
    logger.warn('Rate limit check with unknown IP');
    return true;
  }

  const now = Date.now();
  const requests = (rateLimitMap.get(ip) || []).filter(
    timestamp => now - timestamp < RATE_LIMITS.contact.windowMs
  );
  requests.push(now);
  rateLimitMap.set(ip, requests);

  const allowed = requests.length <= RATE_LIMITS.contact.maxRequests;

  if (!allowed) {
    logger.warn('Rate limit exceeded for management email request', { ip, requestCount: requests.length });
  }

  return allowed;
}

// Clean up old entries periodically
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
    const validatedData = requestSchema.parse(body);
    const { email } = validatedData;

    const listmonkUrl = process.env.LISTMONK_API_URL || 'https://news.fables.monster';
    const listmonkUser = process.env.LISTMONK_API_USER;
    const listmonkPassword = process.env.LISTMONK_API_PASSWORD;

    if (!listmonkUser || !listmonkPassword) {
      logger.error('Listmonk credentials not configured');
      // Always return same message - don't reveal configuration issues
      return NextResponse.json(
        { message: 'If this email is subscribed, you will receive a management email shortly.' },
        { status: 200 }
      );
    }

    const authHeader = 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64');

    logger.info('Checking for subscriber to send management email', { email });

    // Search for subscriber
    const searchResponse = await fetch(
      `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${email}'`)}`,
      {
        headers: {
          'Authorization': authHeader,
        },
      }
    );

    if (!searchResponse.ok) {
      logger.error('Listmonk subscriber search failed', {
        email,
        status: searchResponse.status,
      });
      // Always return same message - don't reveal errors
      return NextResponse.json(
        { message: 'If this email is subscribed, you will receive a management email shortly.' },
        { status: 200 }
      );
    }

    const searchData = await searchResponse.json();

    // If subscriber found, send management email
    if (searchData.data?.results?.length > 0) {
      const subscriber = searchData.data.results[0];

      logger.info('Subscriber found, sending management email', {
        email,
        subscriberId: subscriber.id
      });

      // Send transactional email with template ID 5 (management email)
      const emailResponse = await fetch(`${listmonkUrl}/api/tx`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriber_email: email,
          template_id: 5, // Management email template
          content_type: "html",
        }),
      });

      if (emailResponse.ok) {
        logger.info('Management email sent successfully', { email });
      } else {
        const errorData = await emailResponse.json();
        logger.error('Failed to send management email', {
          email,
          status: emailResponse.status,
          error: errorData,
        });
      }
    } else {
      logger.info('Subscriber not found for management email request', { email });
    }

    // Always return the same message regardless of whether subscriber exists
    return NextResponse.json(
      { message: 'If this email is subscribed, you will receive a management email shortly.' },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Management email request validation failed', {
        ip,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Management email request failed', {
      ip,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Don't reveal errors - always return success message
    return NextResponse.json(
      { message: 'If this email is subscribed, you will receive a management email shortly.' },
      { status: 200 }
    );
  }
}

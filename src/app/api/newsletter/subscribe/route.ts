import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIdentifier, isAllowedOrigin, maskEmail } from '@/lib/security';

// Force Node.js runtime for fetch with auth
export const runtime = 'nodejs';

// Define schema for newsletter subscription
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  name: z.string().max(100, "Name is too long").optional(),
  lang: z.enum(['en', 'ru']).optional(),
});

export async function POST(request: NextRequest) {
  const clientKey = getClientIdentifier(request);

  if (!isAllowedOrigin(request)) {
    logger.warn('Blocked newsletter subscribe request from disallowed origin', { clientKey });
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  if (!checkRateLimit(`newsletter-subscribe:${clientKey}`, RATE_LIMITS.newsletter)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate input using Zod
    const validatedData = subscribeSchema.parse(body);
    const { email, name, lang } = validatedData;
    const maskedEmail = maskEmail(email);

    // Get Listmonk configuration from environment
    const listmonkUrl = process.env.LISTMONK_API_URL || 'https://news.fables.monster';
    const listmonkUser = process.env.LISTMONK_API_USER;
    const listmonkPassword = process.env.LISTMONK_API_PASSWORD;
    const listId = parseInt(process.env.LISTMONK_LIST_ID || '1');

    if (!listmonkUser || !listmonkPassword) {
      logger.error('Listmonk credentials not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Create Basic Auth header
    const authHeader = 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64');

    // Prepare subscriber data for Listmonk
    const subscriberData = {
      email: email,
      name: name || email.split('@')[0],
      status: 'enabled',
      lists: [listId],
      attribs: {
        language: lang || 'en',
      },
    };

    logger.debug('Subscribing to newsletter', {
      email: maskedEmail,
      listId,
      lang,
    });

    // Call Listmonk API to create subscriber
    const response = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(subscriberData),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Check if user already exists
      if (response.status === 409 || responseData.message?.includes('already exists')) {
        logger.info('Subscriber already exists', { email: maskedEmail });
        return NextResponse.json(
          { message: 'Subscription request accepted. Please check your email to confirm.' },
          { status: 200 }
        );
      }

      logger.error('Listmonk API error', {
        status: response.status,
        error: responseData,
      });

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    logger.info('Newsletter subscription successful', {
      email: maskedEmail,
      subscriberId: responseData.data?.id,
    });

    return NextResponse.json(
      {
        message: 'Successfully subscribed! Please check your email to confirm.',
        requiresConfirmation: true,
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Newsletter subscription validation failed', {
        clientKey,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Newsletter subscription failed', {
      clientKey,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

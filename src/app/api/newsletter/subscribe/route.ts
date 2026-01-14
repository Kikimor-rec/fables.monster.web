import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';

// Force Node.js runtime for fetch with auth
export const runtime = 'nodejs';

// Define schema for newsletter subscription
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  name: z.string().max(100, "Name is too long").optional(),
  lang: z.enum(['en', 'ru']).optional(),
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
    logger.warn('Rate limit exceeded for newsletter subscription', { ip, requestCount: requests.length });
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

    // Validate input using Zod
    const validatedData = subscribeSchema.parse(body);
    const { email, name, lang } = validatedData;

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

    logger.info('Subscribing to newsletter', {
      email,
      listId,
      listIdType: typeof listId,
      subscriberData: JSON.stringify(subscriberData),
      envListId: process.env.LISTMONK_LIST_ID,
      lang,
    });

    // Call Listmonk API to create subscriber
    const response = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const responseData = await response.json();

    logger.info('Listmonk API response', {
      status: response.status,
      ok: response.ok,
      data: JSON.stringify(responseData),
    });

    if (!response.ok) {
      // Check if user already exists
      if (response.status === 409 || responseData.message?.includes('already exists')) {
        logger.info('Subscriber already exists, checking lists', { email });

        // Search for existing subscriber
        const searchResponse = await fetch(
          `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${email}'`)}`,
          {
            method: 'GET',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
          }
        );

        const searchData = await searchResponse.json();

        if (searchResponse.ok && searchData.data?.results?.length > 0) {
          const subscriber = searchData.data.results[0];
          const subscriberId = subscriber.id;
          const currentListIds = subscriber.lists.map((l: { id: number }) => l.id);

          // Check if already subscribed to this list
          if (currentListIds.includes(listId)) {
            logger.info('Subscriber already in list', { email, listId });
            return NextResponse.json(
              { message: 'You are already subscribed to our newsletter!' },
              { status: 200 }
            );
          }

          // Add to the list
          logger.info('Adding existing subscriber to list', { email, listId });
          const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriberId}`, {
            method: 'PUT',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: subscriber.email,
              name: name || subscriber.name,
              lists: [...currentListIds, listId],
              status: 'enabled',
              attribs: {
                ...subscriber.attribs,
                language: lang || subscriber.attribs?.language || 'en',
              },
            }),
          });

          if (updateResponse.ok) {
            logger.info('Subscriber added to list successfully', { email, listId });
            return NextResponse.json(
              {
                message: 'Successfully subscribed! Please check your email to confirm.',
                requiresConfirmation: true,
              },
              { status: 200 }
            );
          }
        }

        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter!' },
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
      email,
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
        ip,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Newsletter subscription failed', {
      ip,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

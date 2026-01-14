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

    // First, get list UUID from list ID for public API
    // Public subscription API uses UUIDs and automatically handles double opt-in
    logger.info('Getting list UUID', { listId });

    const listsResponse = await fetch(`${listmonkUrl}/api/lists/${listId}`, {
      headers: {
        'Authorization': authHeader,
      },
    });

    if (!listsResponse.ok) {
      logger.error('Failed to get list info', {
        listId,
        status: listsResponse.status,
      });
      return NextResponse.json(
        { error: 'Newsletter service configuration error' },
        { status: 500 }
      );
    }

    const listData = await listsResponse.json();
    const listUuid = listData.data.uuid;

    logger.info('Got list UUID, subscribing via public API', { listId, listUuid, email });

    // Call public subscription API - this respects double opt-in settings
    const response = await fetch(`${listmonkUrl}/api/public/subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name || email.split('@')[0],
        list_uuids: [listUuid],
      }),
    });

    const responseData = await response.json();

    logger.info('Public subscription response', {
      status: response.status,
      ok: response.ok,
      data: JSON.stringify(responseData),
    });

    if (response.ok) {
      logger.info('Subscription successful via public API', { email });
      return NextResponse.json(
        {
          message: 'Successfully subscribed! Please check your email to confirm.',
          requiresConfirmation: true,
        },
        { status: 200 }
      );
    }

    // If public API returns error, check if it's because subscriber already exists
    if (responseData.message?.includes('already exists') || responseData.message?.includes('subscribed')) {
      logger.info('Subscriber already exists via public API', { email });
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      );
    }

    // If public API fails for other reasons, fall back to admin API
    logger.warn('Public API failed, trying admin API fallback', {
      status: response.status,
      error: responseData,
    });

    // Prepare subscriber data for Listmonk admin API
    const subscriberData = {
      email: email,
      name: name || email.split('@')[0],
      status: 'enabled',
      attribs: {
        language: lang || 'en',
      },
    };

    logger.info('Creating subscriber via admin API', {
      email,
      listId,
      lang,
    });

    // Call Listmonk API to create subscriber
    const adminResponse = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const adminResponseData = await adminResponse.json();

    logger.info('Listmonk create subscriber response', {
      status: adminResponse.status,
      ok: adminResponse.ok,
      subscriberId: adminResponseData.data?.id,
    });

    if (adminResponse.ok && adminResponseData.data?.id) {
      // Subscriber created successfully, now add to list
      const subscriberId = adminResponseData.data.id;

      logger.info('Adding subscriber to list', { subscriberId, listId });

      const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name || email.split('@')[0],
          lists: [listId],
          status: 'enabled',
          attribs: {
            language: lang || 'en',
          },
        }),
      });

      const updateData = await updateResponse.json();

      if (updateResponse.ok) {
        logger.info('Subscriber added to list successfully', {
          subscriberId,
          listId,
          lists: updateData.data?.lists,
        });

        return NextResponse.json(
          {
            message: 'Successfully subscribed! Please check your email to confirm.',
            requiresConfirmation: true,
          },
          { status: 200 }
        );
      } else {
        logger.error('Failed to add subscriber to list', {
          subscriberId,
          listId,
          status: updateResponse.status,
          error: updateData,
        });

        // Subscriber created but not added to list - still return success
        return NextResponse.json(
          {
            message: 'Successfully subscribed! Please check your email to confirm.',
            requiresConfirmation: true,
          },
          { status: 200 }
        );
      }
    }

    if (!adminResponse.ok) {
      // Check if user already exists
      if (adminResponse.status === 409 || adminResponseData.message?.includes('already exists')) {
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
          logger.info('Adding existing subscriber to list', { email, listId, currentStatus: subscriber.status });
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
              status: subscriber.status, // Keep existing status
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

      logger.error('Listmonk admin API error', {
        status: adminResponse.status,
        error: adminResponseData,
      });

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    // Should not reach here - admin API returned success without data
    logger.error('Unexpected admin API response', {
      email,
      response: adminResponseData,
    });

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
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

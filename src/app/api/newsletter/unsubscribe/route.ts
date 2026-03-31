import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';

export const runtime = 'nodejs';

// Define schema for unsubscribe request
const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  uuid: z.string().uuid("Invalid subscriber ID").optional(),
}).refine(data => data.email || data.uuid, {
  message: "Either email or subscriber ID is required"
});

// Rate limiting for unsubscribe
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string | null): boolean {
  if (!ip) return true;

  const now = Date.now();
  const requests = (rateLimitMap.get(ip) || []).filter(
    timestamp => now - timestamp < RATE_LIMITS.contact.windowMs
  );
  requests.push(now);
  rateLimitMap.set(ip, requests);

  return requests.length <= RATE_LIMITS.contact.maxRequests;
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
    const validatedData = unsubscribeSchema.parse(body);
    const { email, uuid } = validatedData;

    const listmonkUrl = process.env.LISTMONK_API_URL || 'https://news.fables.monster';
    const listmonkUser = process.env.LISTMONK_API_USER;
    const listmonkPassword = process.env.LISTMONK_API_PASSWORD;

    if (!listmonkUser || !listmonkPassword) {
      logger.error('Listmonk credentials not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    const authHeader = 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64');

    let subscriberId: number | null = null;

    // If UUID provided, use public unsubscribe endpoint
    if (uuid) {
      const response = await fetch(`${listmonkUrl}/subscription/optin/${uuid}?optin=out`, {
        method: 'PUT',
      });

      if (!response.ok) {
        logger.error('Listmonk unsubscribe by UUID failed', {
          uuid,
          status: response.status,
        });
        return NextResponse.json(
          { error: 'Failed to unsubscribe. Please try again later.' },
          { status: 500 }
        );
      }

      logger.info('Newsletter unsubscribe successful (by UUID)', { uuid });
      return NextResponse.json(
        { message: 'Successfully unsubscribed from newsletter.' },
        { status: 200 }
      );
    }

    // If email provided, search for subscriber first
    if (email) {
      // Escape single quotes to prevent query injection in Listmonk API
      const sanitizedEmail = email.replace(/'/g, "''");
      const searchResponse = await fetch(
        `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${sanitizedEmail}'`)}`,
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
        return NextResponse.json(
          { error: 'Failed to find subscriber.' },
          { status: 500 }
        );
      }

      const searchData = await searchResponse.json();

      if (!searchData.data?.results?.length) {
        logger.info('Subscriber not found', { email });
        return NextResponse.json(
          { message: 'Email not found in our newsletter list.' },
          { status: 404 }
        );
      }

      subscriberId = searchData.data.results[0].id;

      // Update subscriber status to blocklisted
      const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'blocklisted',
        }),
      });

      if (!updateResponse.ok) {
        logger.error('Listmonk unsubscribe failed', {
          subscriberId,
          status: updateResponse.status,
        });
        return NextResponse.json(
          { error: 'Failed to unsubscribe. Please try again later.' },
          { status: 500 }
        );
      }

      logger.info('Newsletter unsubscribe successful', {
        email,
        subscriberId,
      });

      return NextResponse.json(
        { message: 'Successfully unsubscribed from newsletter.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Newsletter unsubscribe validation failed', {
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Newsletter unsubscribe failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { RATE_LIMITS } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIdentifier, isAllowedOrigin, maskEmail } from '@/lib/security';

export const runtime = 'nodejs';

// Define schema for unsubscribe request
const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  uuid: z.string().uuid("Invalid subscriber ID").optional(),
}).refine(data => data.email || data.uuid, {
  message: "Either email or subscriber ID is required"
});

const genericSuccessPayload = {
  message: 'If this address exists, it has been unsubscribed from the newsletter.',
};

export async function POST(request: NextRequest) {
  const clientKey = getClientIdentifier(request);

  if (!isAllowedOrigin(request)) {
    logger.warn('Blocked newsletter unsubscribe request from disallowed origin', { clientKey });
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  if (!checkRateLimit(`newsletter-unsubscribe:${clientKey}`, RATE_LIMITS.newsletter)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const validatedData = unsubscribeSchema.parse(body);
    const { email, uuid } = validatedData;
    const maskedEmail = email ? maskEmail(email) : undefined;

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
        if (response.status === 404) {
          logger.info('Unsubscribe UUID not found, returning generic success', { uuid });
          return NextResponse.json(genericSuccessPayload, { status: 200 });
        }

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
      return NextResponse.json(genericSuccessPayload, { status: 200 });
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
          email: maskedEmail,
          status: searchResponse.status,
        });
        return NextResponse.json(
          { error: 'Failed to find subscriber.' },
          { status: 500 }
        );
      }

      const searchData = await searchResponse.json();

      if (!searchData.data?.results?.length) {
        logger.info('Subscriber not found, returning generic success', { email: maskedEmail });
        return NextResponse.json(genericSuccessPayload, { status: 200 });
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
        email: maskedEmail,
        subscriberId,
      });

      return NextResponse.json(genericSuccessPayload, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Newsletter unsubscribe validation failed', {
        clientKey,
        errors: error.issues.map(i => i.message),
      });
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Newsletter unsubscribe failed', {
      clientKey,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

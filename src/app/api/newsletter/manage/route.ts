import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';

// Schema for getting subscriber info
const manageSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Schema for updating subscriber
const updateSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
  attribs: z.record(z.string(), z.unknown()).optional(),
});

// Schema for resending confirmation
const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// GET - Get subscriber info
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const validatedData = manageSchema.parse({ email });

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

    // Search for subscriber
    const searchResponse = await fetch(
      `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${validatedData.email}'`)}`,
      {
        headers: {
          'Authorization': authHeader,
        },
      }
    );

    if (!searchResponse.ok) {
      logger.error('Listmonk subscriber search failed', {
        email: validatedData.email,
        status: searchResponse.status,
      });
      return NextResponse.json(
        { error: 'Failed to find subscriber' },
        { status: 500 }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.data?.results?.length) {
      return NextResponse.json(
        { error: 'Subscriber not found', notFound: true },
        { status: 404 }
      );
    }

    const subscriber = searchData.data.results[0];

    // Return sanitized subscriber data
    return NextResponse.json({
      email: subscriber.email,
      name: subscriber.name,
      status: subscriber.status,
      lists: subscriber.lists,
      attribs: subscriber.attribs || {},
      createdAt: subscriber.created_at,
      updatedAt: subscriber.updated_at,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Get subscriber info failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Failed to get subscriber info' },
      { status: 500 }
    );
  }
}

// PUT - Update subscriber info
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

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

    // First, find subscriber ID
    const searchResponse = await fetch(
      `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${validatedData.email}'`)}`,
      {
        headers: {
          'Authorization': authHeader,
        },
      }
    );

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to find subscriber' },
        { status: 500 }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.data?.results?.length) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    const subscriberId = searchData.data.results[0].id;

    // Update subscriber
    const updateData: Record<string, unknown> = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.attribs) updateData.attribs = validatedData.attribs;

    const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      logger.error('Listmonk update failed', {
        subscriberId,
        status: updateResponse.status,
      });
      return NextResponse.json(
        { error: 'Failed to update subscriber' },
        { status: 500 }
      );
    }

    logger.info('Subscriber updated successfully', {
      email: validatedData.email,
      subscriberId,
    });

    return NextResponse.json({
      message: 'Subscriber updated successfully',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Update subscriber failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}

// POST - Resend confirmation email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = resendSchema.parse(body);

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

    // Find subscriber
    const searchResponse = await fetch(
      `${listmonkUrl}/api/subscribers?query=${encodeURIComponent(`email = '${validatedData.email}'`)}`,
      {
        headers: {
          'Authorization': authHeader,
        },
      }
    );

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to find subscriber' },
        { status: 500 }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.data?.results?.length) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    const subscriber = searchData.data.results[0];

    // If already confirmed, no need to resend
    if (subscriber.status === 'enabled') {
      return NextResponse.json({
        message: 'Subscription already confirmed',
        alreadyConfirmed: true,
      });
    }

    // Trigger optin email resend
    // This is done by updating the subscriber with the same data which triggers the optin flow
    const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriber.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: subscriber.email,
        name: subscriber.name,
        lists: subscriber.lists.map((l: { id: number }) => l.id),
        status: 'unconfirmed',
      }),
    });

    if (!updateResponse.ok) {
      logger.error('Failed to trigger optin resend', {
        subscriberId: subscriber.id,
        status: updateResponse.status,
      });
      return NextResponse.json(
        { error: 'Failed to resend confirmation email' },
        { status: 500 }
      );
    }

    logger.info('Confirmation email resent', {
      email: validatedData.email,
      subscriberId: subscriber.id,
    });

    return NextResponse.json({
      message: 'Confirmation email sent successfully',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    logger.error('Resend confirmation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Failed to resend confirmation' },
      { status: 500 }
    );
  }
}

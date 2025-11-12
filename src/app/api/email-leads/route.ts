import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emailLeads } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const subscribedParam = searchParams.get('subscribed');

    let query = db.select().from(emailLeads);
    const conditions = [];

    if (search) {
      const searchCondition = or(
        like(emailLeads.email, `%${search}%`),
        like(emailLeads.name, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    if (subscribedParam !== null) {
      const subscribedValue = subscribedParam === 'true';
      conditions.push(eq(emailLeads.subscribed, subscribedValue));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, leadMagnet } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    const existingLead = await db
      .select()
      .from(emailLeads)
      .where(eq(emailLeads.email, trimmedEmail))
      .limit(1);

    if (existingLead.length > 0) {
      return NextResponse.json(
        { error: 'Email already subscribed', code: 'DUPLICATE_EMAIL' },
        { status: 400 }
      );
    }

    const newLead = await db
      .insert(emailLeads)
      .values({
        email: trimmedEmail,
        name: name ? name.trim() : null,
        leadMagnet: leadMagnet || null,
        subscribed: true,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newLead[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);

    const errorMessage = (error as Error).message;
    if (errorMessage.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'Email already subscribed', code: 'DUPLICATE_EMAIL' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error: ' + errorMessage },
      { status: 500 }
    );
  }
}
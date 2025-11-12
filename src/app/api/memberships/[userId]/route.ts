import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { memberships } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;

    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid userId is required',
          code: 'INVALID_USER_ID' 
        },
        { status: 400 }
      );
    }

    const membership = await db
      .select()
      .from(memberships)
      .where(eq(memberships.userId, userId))
      .orderBy(desc(memberships.startedAt))
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json(
        { 
          error: 'Membership not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(membership[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { memberships } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_PLAN_TYPES = ['free', 'basic', 'premium'];
const VALID_STATUSES = ['active', 'cancelled', 'expired'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, planType, status, expiresAt, stripeSubscriptionId } = body;

    // Validate required fields
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'userId is required and must be a non-empty string', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!planType || typeof planType !== 'string' || planType.trim() === '') {
      return NextResponse.json(
        { error: 'planType is required and must be a non-empty string', code: 'MISSING_PLAN_TYPE' },
        { status: 400 }
      );
    }

    if (!status || typeof status !== 'string' || status.trim() === '') {
      return NextResponse.json(
        { error: 'status is required and must be a non-empty string', code: 'MISSING_STATUS' },
        { status: 400 }
      );
    }

    // Validate planType
    const normalizedPlanType = planType.trim().toLowerCase();
    if (!VALID_PLAN_TYPES.includes(normalizedPlanType)) {
      return NextResponse.json(
        { 
          error: `planType must be one of: ${VALID_PLAN_TYPES.join(', ')}`, 
          code: 'INVALID_PLAN_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate status
    const normalizedStatus = status.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalizedStatus)) {
      return NextResponse.json(
        { 
          error: `status must be one of: ${VALID_STATUSES.join(', ')}`, 
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: any = {
      userId: userId.trim(),
      planType: normalizedPlanType,
      status: normalizedStatus,
      startedAt: new Date().toISOString(),
    };

    // Add optional fields if provided
    if (expiresAt && typeof expiresAt === 'string' && expiresAt.trim() !== '') {
      insertData.expiresAt = expiresAt.trim();
    }

    if (stripeSubscriptionId && typeof stripeSubscriptionId === 'string' && stripeSubscriptionId.trim() !== '') {
      insertData.stripeSubscriptionId = stripeSubscriptionId.trim();
    }

    // Insert into database
    const newMembership = await db.insert(memberships)
      .values(insertData)
      .returning();

    return NextResponse.json(newMembership[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const membershipId = parseInt(id);

    // Check if membership exists
    const existingMembership = await db.select()
      .from(memberships)
      .where(eq(memberships.id, membershipId))
      .limit(1);

    if (existingMembership.length === 0) {
      return NextResponse.json(
        { error: 'Membership not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { userId, planType, status, startedAt, expiresAt, stripeSubscriptionId } = body;

    // Prepare update data
    const updateData: any = {};

    // Validate and add userId if provided
    if (userId !== undefined) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json(
          { error: 'userId must be a non-empty string', code: 'INVALID_USER_ID' },
          { status: 400 }
        );
      }
      updateData.userId = userId.trim();
    }

    // Validate and add planType if provided
    if (planType !== undefined) {
      if (typeof planType !== 'string' || planType.trim() === '') {
        return NextResponse.json(
          { error: 'planType must be a non-empty string', code: 'INVALID_PLAN_TYPE' },
          { status: 400 }
        );
      }
      const normalizedPlanType = planType.trim().toLowerCase();
      if (!VALID_PLAN_TYPES.includes(normalizedPlanType)) {
        return NextResponse.json(
          { 
            error: `planType must be one of: ${VALID_PLAN_TYPES.join(', ')}`, 
            code: 'INVALID_PLAN_TYPE' 
          },
          { status: 400 }
        );
      }
      updateData.planType = normalizedPlanType;
    }

    // Validate and add status if provided
    if (status !== undefined) {
      if (typeof status !== 'string' || status.trim() === '') {
        return NextResponse.json(
          { error: 'status must be a non-empty string', code: 'INVALID_STATUS' },
          { status: 400 }
        );
      }
      const normalizedStatus = status.trim().toLowerCase();
      if (!VALID_STATUSES.includes(normalizedStatus)) {
        return NextResponse.json(
          { 
            error: `status must be one of: ${VALID_STATUSES.join(', ')}`, 
            code: 'INVALID_STATUS' 
          },
          { status: 400 }
        );
      }
      updateData.status = normalizedStatus;
    }

    // Add startedAt if provided
    if (startedAt !== undefined) {
      if (typeof startedAt !== 'string' || startedAt.trim() === '') {
        return NextResponse.json(
          { error: 'startedAt must be a non-empty string', code: 'INVALID_STARTED_AT' },
          { status: 400 }
        );
      }
      updateData.startedAt = startedAt.trim();
    }

    // Add expiresAt if provided
    if (expiresAt !== undefined) {
      if (expiresAt !== null && (typeof expiresAt !== 'string' || expiresAt.trim() === '')) {
        return NextResponse.json(
          { error: 'expiresAt must be a non-empty string or null', code: 'INVALID_EXPIRES_AT' },
          { status: 400 }
        );
      }
      updateData.expiresAt = expiresAt === null ? null : expiresAt.trim();
    }

    // Add stripeSubscriptionId if provided
    if (stripeSubscriptionId !== undefined) {
      if (stripeSubscriptionId !== null && (typeof stripeSubscriptionId !== 'string' || stripeSubscriptionId.trim() === '')) {
        return NextResponse.json(
          { error: 'stripeSubscriptionId must be a non-empty string or null', code: 'INVALID_STRIPE_SUBSCRIPTION_ID' },
          { status: 400 }
        );
      }
      updateData.stripeSubscriptionId = stripeSubscriptionId === null ? null : stripeSubscriptionId.trim();
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update', code: 'NO_UPDATE_FIELDS' },
        { status: 400 }
      );
    }

    // Update membership
    const updatedMembership = await db.update(memberships)
      .set(updateData)
      .where(eq(memberships.id, membershipId))
      .returning();

    return NextResponse.json(updatedMembership[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
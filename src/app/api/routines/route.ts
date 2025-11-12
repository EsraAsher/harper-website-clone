import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { routines } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const VALID_PET_TYPES = ['dog', 'cat'];
const VALID_APARTMENT_SIZES = ['studio', '1bhk', '2bhk', '3bhk'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const petType = searchParams.get('pet_type');
    const apartmentSize = searchParams.get('apartment_size');

    if (!petType) {
      return NextResponse.json(
        { error: 'pet_type query parameter is required', code: 'MISSING_PET_TYPE' },
        { status: 400 }
      );
    }

    if (!apartmentSize) {
      return NextResponse.json(
        { error: 'apartment_size query parameter is required', code: 'MISSING_APARTMENT_SIZE' },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(routines)
      .where(
        and(
          eq(routines.petType, petType),
          eq(routines.apartmentSize, apartmentSize)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      petType,
      apartmentSize,
      morningRoutine,
      afternoonRoutine,
      eveningRoutine,
      exerciseTips,
      feedingSchedule,
    } = body;

    if (!petType) {
      return NextResponse.json(
        { error: 'petType is required', code: 'MISSING_PET_TYPE' },
        { status: 400 }
      );
    }

    if (!apartmentSize) {
      return NextResponse.json(
        { error: 'apartmentSize is required', code: 'MISSING_APARTMENT_SIZE' },
        { status: 400 }
      );
    }

    const trimmedPetType = petType.trim();
    const trimmedApartmentSize = apartmentSize.trim();

    if (!VALID_PET_TYPES.includes(trimmedPetType)) {
      return NextResponse.json(
        {
          error: `petType must be one of: ${VALID_PET_TYPES.join(', ')}`,
          code: 'INVALID_PET_TYPE',
        },
        { status: 400 }
      );
    }

    if (!VALID_APARTMENT_SIZES.includes(trimmedApartmentSize)) {
      return NextResponse.json(
        {
          error: `apartmentSize must be one of: ${VALID_APARTMENT_SIZES.join(', ')}`,
          code: 'INVALID_APARTMENT_SIZE',
        },
        { status: 400 }
      );
    }

    const newRoutine = await db
      .insert(routines)
      .values({
        petType: trimmedPetType,
        apartmentSize: trimmedApartmentSize,
        morningRoutine: morningRoutine ? morningRoutine.trim() : null,
        afternoonRoutine: afternoonRoutine ? afternoonRoutine.trim() : null,
        eveningRoutine: eveningRoutine ? eveningRoutine.trim() : null,
        exerciseTips: exerciseTips ? exerciseTips.trim() : null,
        feedingSchedule: feedingSchedule ? feedingSchedule.trim() : null,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newRoutine[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid id query parameter is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      petType,
      apartmentSize,
      morningRoutine,
      afternoonRoutine,
      eveningRoutine,
      exerciseTips,
      feedingSchedule,
    } = body;

    const existing = await db
      .select()
      .from(routines)
      .where(eq(routines.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Routine not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const updates: any = {};

    if (petType !== undefined) {
      const trimmedPetType = petType.trim();
      if (!VALID_PET_TYPES.includes(trimmedPetType)) {
        return NextResponse.json(
          {
            error: `petType must be one of: ${VALID_PET_TYPES.join(', ')}`,
            code: 'INVALID_PET_TYPE',
          },
          { status: 400 }
        );
      }
      updates.petType = trimmedPetType;
    }

    if (apartmentSize !== undefined) {
      const trimmedApartmentSize = apartmentSize.trim();
      if (!VALID_APARTMENT_SIZES.includes(trimmedApartmentSize)) {
        return NextResponse.json(
          {
            error: `apartmentSize must be one of: ${VALID_APARTMENT_SIZES.join(', ')}`,
            code: 'INVALID_APARTMENT_SIZE',
          },
          { status: 400 }
        );
      }
      updates.apartmentSize = trimmedApartmentSize;
    }

    if (morningRoutine !== undefined) {
      updates.morningRoutine = morningRoutine ? morningRoutine.trim() : null;
    }

    if (afternoonRoutine !== undefined) {
      updates.afternoonRoutine = afternoonRoutine ? afternoonRoutine.trim() : null;
    }

    if (eveningRoutine !== undefined) {
      updates.eveningRoutine = eveningRoutine ? eveningRoutine.trim() : null;
    }

    if (exerciseTips !== undefined) {
      updates.exerciseTips = exerciseTips ? exerciseTips.trim() : null;
    }

    if (feedingSchedule !== undefined) {
      updates.feedingSchedule = feedingSchedule ? feedingSchedule.trim() : null;
    }

    const updated = await db
      .update(routines)
      .set(updates)
      .where(eq(routines.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
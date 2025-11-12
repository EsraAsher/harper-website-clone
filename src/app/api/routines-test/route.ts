import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { routines } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const petType = searchParams.get('pet_type');
    const apartmentSize = searchParams.get('apartment_size');

    // Validate required parameters
    if (!petType) {
      return NextResponse.json(
        { 
          error: 'pet_type parameter is required',
          code: 'MISSING_PET_TYPE' 
        },
        { status: 400 }
      );
    }

    if (!apartmentSize) {
      return NextResponse.json(
        { 
          error: 'apartment_size parameter is required',
          code: 'MISSING_APARTMENT_SIZE' 
        },
        { status: 400 }
      );
    }

    // Validate pet_type values
    if (!['dog', 'cat'].includes(petType.toLowerCase())) {
      return NextResponse.json(
        { 
          error: 'pet_type must be either "dog" or "cat"',
          code: 'INVALID_PET_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate apartment_size values
    if (!['studio', '1bhk', '2bhk', '3bhk'].includes(apartmentSize.toLowerCase())) {
      return NextResponse.json(
        { 
          error: 'apartment_size must be one of: "studio", "1bhk", "2bhk", "3bhk"',
          code: 'INVALID_APARTMENT_SIZE' 
        },
        { status: 400 }
      );
    }

    // Query using camelCase field names from Drizzle schema
    const routine = await db.select()
      .from(routines)
      .where(
        and(
          eq(routines.petType, petType.toLowerCase()),
          eq(routines.apartmentSize, apartmentSize.toLowerCase())
        )
      )
      .limit(1);

    // Return empty object if not found, or the routine object
    if (routine.length === 0) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(routine[0], { status: 200 });
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
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if Groq API key is configured
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'Groq API key not configured. Please add GROQ_API_KEY to your environment variables.',
          code: 'MISSING_API_KEY'
        },
        { status: 500 }
      );
    }

    // Call Groq API
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful pet care expert who creates comprehensive, detailed daily routines for pets in apartments. Provide structured, practical advice that pet owners can easily follow.'
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { 
          error: 'Failed to generate routine from Groq API',
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the generated text from Groq response
    const generatedText = data.choices?.[0]?.message?.content;
    
    if (!generatedText) {
      return NextResponse.json(
        { error: 'No content generated from Groq' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { routine: generatedText },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
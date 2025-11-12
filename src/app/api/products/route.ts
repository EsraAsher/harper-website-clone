import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

const VALID_CATEGORIES = ['food', 'toys', 'grooming', 'bedding', 'training', 'health'];
const VALID_PET_TYPES = ['dog', 'cat', 'both'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single product by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(id)))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          { error: 'Product not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(product[0], { status: 200 });
    }

    // List products with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const petType = searchParams.get('pet_type');
    const featured = searchParams.get('featured');

    let query = db.select().from(products);
    const conditions = [];

    // Search filter
    if (search) {
      conditions.push(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      );
    }

    // Category filter
    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return NextResponse.json(
          { error: 'Invalid category', code: 'INVALID_CATEGORY' },
          { status: 400 }
        );
      }
      conditions.push(eq(products.category, category));
    }

    // Pet type filter
    if (petType) {
      if (!VALID_PET_TYPES.includes(petType)) {
        return NextResponse.json(
          { error: 'Invalid pet type', code: 'INVALID_PET_TYPE' },
          { status: 400 }
        );
      }
      conditions.push(eq(products.petType, petType));
    }

    // Featured filter
    if (featured) {
      const featuredValue = featured === 'true';
      conditions.push(eq(products.featured, featuredValue));
    }

    // Apply filters
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(products.createdAt))
      .limit(limit)
      .offset(offset);

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

    // Validate required fields
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!body.affiliateLink || typeof body.affiliateLink !== 'string' || body.affiliateLink.trim() === '') {
      return NextResponse.json(
        { error: 'Affiliate link is required', code: 'MISSING_AFFILIATE_LINK' },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== 'string') {
      return NextResponse.json(
        { error: 'Category is required', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(body.category)) {
      return NextResponse.json(
        { 
          error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`, 
          code: 'INVALID_CATEGORY' 
        },
        { status: 400 }
      );
    }

    if (!body.petType || typeof body.petType !== 'string') {
      return NextResponse.json(
        { error: 'Pet type is required', code: 'MISSING_PET_TYPE' },
        { status: 400 }
      );
    }

    if (!VALID_PET_TYPES.includes(body.petType)) {
      return NextResponse.json(
        { 
          error: `Pet type must be one of: ${VALID_PET_TYPES.join(', ')}`, 
          code: 'INVALID_PET_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate rating if provided
    if (body.rating !== undefined && body.rating !== null) {
      const rating = parseInt(body.rating);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
          { status: 400 }
        );
      }
    }

    // Prepare insert data
    const insertData: any = {
      name: body.name.trim(),
      affiliateLink: body.affiliateLink.trim(),
      category: body.category,
      petType: body.petType,
      featured: body.featured !== undefined ? Boolean(body.featured) : false,
      createdAt: new Date().toISOString(),
    };

    if (body.description) {
      insertData.description = body.description.trim();
    }

    if (body.price) {
      insertData.price = body.price.trim();
    }

    if (body.imageUrl) {
      insertData.imageUrl = body.imageUrl.trim();
    }

    if (body.rating !== undefined && body.rating !== null) {
      insertData.rating = parseInt(body.rating);
    }

    const newProduct = await db.insert(products).values(insertData).returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
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
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and prepare updates
    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || body.name.trim() === '') {
        return NextResponse.json(
          { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = body.name.trim();
    }

    if (body.description !== undefined) {
      updates.description = body.description ? body.description.trim() : null;
    }

    if (body.price !== undefined) {
      updates.price = body.price ? body.price.trim() : null;
    }

    if (body.affiliateLink !== undefined) {
      if (typeof body.affiliateLink !== 'string' || body.affiliateLink.trim() === '') {
        return NextResponse.json(
          { error: 'Affiliate link must be a non-empty string', code: 'INVALID_AFFILIATE_LINK' },
          { status: 400 }
        );
      }
      updates.affiliateLink = body.affiliateLink.trim();
    }

    if (body.imageUrl !== undefined) {
      updates.imageUrl = body.imageUrl ? body.imageUrl.trim() : null;
    }

    if (body.category !== undefined) {
      if (!VALID_CATEGORIES.includes(body.category)) {
        return NextResponse.json(
          { 
            error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`, 
            code: 'INVALID_CATEGORY' 
          },
          { status: 400 }
        );
      }
      updates.category = body.category;
    }

    if (body.petType !== undefined) {
      if (!VALID_PET_TYPES.includes(body.petType)) {
        return NextResponse.json(
          { 
            error: `Pet type must be one of: ${VALID_PET_TYPES.join(', ')}`, 
            code: 'INVALID_PET_TYPE' 
          },
          { status: 400 }
        );
      }
      updates.petType = body.petType;
    }

    if (body.featured !== undefined) {
      updates.featured = Boolean(body.featured);
    }

    if (body.rating !== undefined) {
      if (body.rating === null) {
        updates.rating = null;
      } else {
        const rating = parseInt(body.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
          return NextResponse.json(
            { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
            { status: 400 }
          );
        }
        updates.rating = rating;
      }
    }

    // Check if there are any updates to apply
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingProduct[0], { status: 200 });
    }

    const updatedProduct = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedProduct[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        product: deletedProduct[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
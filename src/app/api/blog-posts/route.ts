import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

const ALLOWED_CATEGORIES = ["care", "training", "health", "lifestyle", "apartment-tips"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const post = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)))
        .limit(1);

      if (post.length === 0) {
        return NextResponse.json({ 
          error: 'Blog post not found',
          code: "NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(post[0], { status: 200 });
    }

    // List with pagination and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const publishedParam = searchParams.get('published');
    const published = publishedParam !== null ? publishedParam === 'true' : true;

    let query = db.select().from(blogPosts);
    const conditions = [];

    // Filter by published status
    conditions.push(eq(blogPosts.published, published));

    // Search in title, excerpt, content
    if (search) {
      const searchCondition = or(
        like(blogPosts.title, `%${search}%`),
        like(blogPosts.excerpt, `%${search}%`),
        like(blogPosts.content, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    // Filter by category
    if (category) {
      conditions.push(eq(blogPosts.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, featuredImage, category, tags, seoTitle, seoDescription, published } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!slug || !slug.trim()) {
      return NextResponse.json({ 
        error: "Slug is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ 
        error: "Content is required",
        code: "MISSING_CONTENT" 
      }, { status: 400 });
    }

    if (!category || !category.trim()) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }

    // Validate category value
    if (!ALLOWED_CATEGORIES.includes(category.trim())) {
      return NextResponse.json({ 
        error: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Check slug uniqueness
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug.trim()))
      .limit(1);

    if (existingPost.length > 0) {
      return NextResponse.json({ 
        error: "A blog post with this slug already exists",
        code: "DUPLICATE_SLUG" 
      }, { status: 400 });
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const isPublished = published === true;
    
    const insertData: any = {
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      category: category.trim(),
      published: isPublished,
      createdAt: now,
      updatedAt: now,
    };

    // Optional fields
    if (excerpt) insertData.excerpt = excerpt.trim();
    if (featuredImage) insertData.featuredImage = featuredImage.trim();
    if (tags) insertData.tags = tags.trim();
    if (seoTitle) insertData.seoTitle = seoTitle.trim();
    if (seoDescription) insertData.seoDescription = seoDescription.trim();
    if (isPublished) insertData.publishedAt = now;

    const newPost = await db.insert(blogPosts)
      .values(insertData)
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if post exists
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, featuredImage, category, tags, seoTitle, seoDescription, published } = body;

    // Validate category if provided
    if (category && !ALLOWED_CATEGORIES.includes(category.trim())) {
      return NextResponse.json({ 
        error: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Check slug uniqueness if slug is being updated
    if (slug && slug.trim() !== existingPost[0].slug) {
      const duplicateSlug = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug.trim()))
        .limit(1);

      if (duplicateSlug.length > 0) {
        return NextResponse.json({ 
          error: "A blog post with this slug already exists",
          code: "DUPLICATE_SLUG" 
        }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (slug !== undefined) updateData.slug = slug.trim();
    if (excerpt !== undefined) updateData.excerpt = excerpt ? excerpt.trim() : null;
    if (content !== undefined) updateData.content = content.trim();
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage ? featuredImage.trim() : null;
    if (category !== undefined) updateData.category = category.trim();
    if (tags !== undefined) updateData.tags = tags ? tags.trim() : null;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle ? seoTitle.trim() : null;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription ? seoDescription.trim() : null;
    
    if (published !== undefined) {
      updateData.published = published;
      // If setting to published and publishedAt is null, set it now
      if (published === true && !existingPost[0].publishedAt) {
        updateData.publishedAt = new Date().toISOString();
      }
    }

    const updatedPost = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPost[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if post exists
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const deletedPost = await db.delete(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      deletedPost: deletedPost[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
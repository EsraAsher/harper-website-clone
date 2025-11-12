import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = context.params;

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid slug is required',
          code: 'INVALID_SLUG'
        },
        { status: 400 }
      );
    }

    const blogPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (blogPost.length === 0) {
      return NextResponse.json(
        { 
          error: 'Blog post not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(blogPost[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}
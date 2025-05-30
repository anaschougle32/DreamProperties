import { NextResponse } from 'next/server';
import { getBlogs, getBlogBySlug } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Test specific blog
      const blog = await getBlogBySlug(slug);
      return NextResponse.json({
        success: true,
        type: 'single_blog',
        slug,
        found: !!blog,
        blog: blog ? {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          is_published: blog.is_published,
          created_at: blog.created_at
        } : null
      });
    } else {
      // Test all blogs
      const blogs = await getBlogs();
      return NextResponse.json({
        success: true,
        type: 'all_blogs',
        count: blogs.length,
        blogs: blogs.map(blog => ({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          is_published: blog.is_published,
          created_at: blog.created_at
        }))
      });
    }
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
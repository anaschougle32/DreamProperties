import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getRelatedBlogs, Blog } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Building2,
  ArrowRight
} from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found | Dream House Properties",
      description: "The requested blog post could not be found. Browse our other Mumbai real estate insights and guides."
    };
  }

  const title = blog.meta_title || `${blog.title} | Dream House Properties Blog`;
  const description = blog.meta_description || blog.excerpt || blog.content.substring(0, 160) + '...';

  return {
    title,
    description,
    keywords: blog.tags?.join(', ') || 'Mumbai real estate, property investment, real estate blog',
    openGraph: {
      title,
      description,
      images: blog.cover_image ? [blog.cover_image] : [],
      type: 'article',
      locale: 'en_IN',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  };
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={blog.cover_image || '/images/blog/placeholder.jpg'}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white">
            {blog.category || 'Real Estate'}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(blog.created_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {blog.excerpt || blog.content.substring(0, 100) + '...'}
        </p>
        
        <Link 
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-3 transition-all"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
}

export default async function BlogDetailsPage({ params }: Props) {
  try {
    console.log('Loading blog page for slug:', params.slug);
    const blog = await getBlogBySlug(params.slug);
    
    if (!blog) {
      console.log('Blog not found for slug:', params.slug);
      notFound();
    }

    console.log('Blog loaded successfully:', blog.title);

    // Get related blogs
    const relatedBlogs = await getRelatedBlogs(blog.slug, blog.category || 'Real Estate', 3);
    console.log('Related blogs loaded:', relatedBlogs.length);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <Button variant="ghost" asChild>
              <Link href="/blogs" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <Badge variant="secondary">
                  {blog.category || 'Real Estate'}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {blog.excerpt}
                </p>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Share:</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="p-2">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blog.cover_image && (
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            )}

            {/* Blog Content */}
            <Card className="p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                {blog.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  
                  // Simple formatting - you can enhance this with a proper markdown parser
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.substring(2)}
                      </h2>
                    );
                  }
                  
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph.substring(3)}
                      </h3>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </Card>

            {/* Author/Company Info */}
            <Card className="p-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Dream House Properties</h3>
                  <p className="text-gray-600 text-sm">
                    Mumbai's trusted real estate partner with 10+ years of experience in luxury properties
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Button size="sm" variant="outline">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Link href="/properties">View Properties</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <Card className="p-8 mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Find Your Dream Property?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get expert guidance from Mumbai's most trusted real estate consultants. 
                  We help you find the perfect property with complete legal assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    <Link href="/contact">Get Consultation</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in BlogDetailsPage:', error);
    notFound();
  }
}

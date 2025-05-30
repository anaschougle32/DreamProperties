import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs, Blog } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search, Calendar, ArrowRight, TrendingUp, MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Mumbai Real Estate Blog | Property Investment Tips & Market Insights | Dream House Properties",
  description: "Discover expert Mumbai real estate insights, property investment tips, market trends, and buying guides. Get the latest updates on Bandra, Juhu, Powai, and Andheri property markets from Dream House Properties experts.",
  keywords: "Mumbai real estate blog, property investment tips Mumbai, Mumbai property market trends, real estate advice Mumbai, Bandra property insights, Juhu real estate news, Powai property guide, Mumbai property buying tips, real estate investment Mumbai, property market analysis Mumbai, Mumbai housing market, real estate blog India",
  openGraph: {
    title: "Mumbai Real Estate Blog | Property Investment Tips & Market Insights",
    description: "Expert Mumbai real estate insights, property investment tips, and market trends from Dream House Properties. Stay updated with the latest property news.",
    url: "https://dreamhouseproperties.com/blogs",
    siteName: "Dream House Properties",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/blog/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Dream House Properties Blog - Mumbai Real Estate Insights"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumbai Real Estate Blog | Property Investment Tips & Market Insights",
    description: "Expert Mumbai real estate insights and property investment tips from Dream House Properties.",
    images: ["/images/blog/twitter-image.jpg"],
  },
};

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={blog.cover_image || '/images/blog/placeholder.jpg'}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {blog.category || 'Real Estate'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'Recent'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
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

export default async function BlogsPage() {
  // Fetch blogs from database
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Mumbai Real Estate Insights</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Expert Real Estate Insights &
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mumbai Property Guides
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest Mumbai real estate trends, investment tips, market analysis, 
              and expert advice from Dream House Properties. Your trusted source for property insights.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{blogs.length}+</div>
              <div className="text-sm text-gray-600">Expert Articles</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-sm text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Weekly</div>
              <div className="text-sm text-gray-600">New Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {blogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
              </div>
              
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image 
                      src={blogs[0].cover_image || '/images/blog/featured-placeholder.jpg'}
                      alt={blogs[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {blogs[0].category || 'Featured'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogs[0].created_at).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      <Link href={`/blogs/${blogs[0].slug}`} className="hover:text-blue-600 transition-colors">
                        {blogs[0].title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {blogs[0].excerpt || blogs[0].content.substring(0, 200) + '...'}
                    </p>
                    
                    <Button asChild>
                      <Link href={`/blogs/${blogs[0].slug}`}>
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Latest Articles
            </h2>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-white border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(1).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                We're working on creating amazing content for you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Mumbai Real Estate
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get weekly insights, market updates, and exclusive property tips delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm mt-4 opacity-75">
              Join 10,000+ property investors and homebuyers who trust our insights.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find articles tailored to your interests and investment goals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Market Analysis', icon: TrendingUp, count: 12 },
              { name: 'Buying Guide', icon: Building2, count: 8 },
              { name: 'Investment Tips', icon: Star, count: 15 },
              { name: 'Location Guide', icon: MapPin, count: 10 }
            ].map((category, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <category.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} articles</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
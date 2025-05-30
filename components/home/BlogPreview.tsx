"use client";

import Link from "next/link";
import { ChevronRight, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/lib/types";
import { useEffect, useState } from "react";

// Fallback blog data for when database is empty
const fallbackBlogs: BlogPost[] = [
  {
    id: "fallback-1",
    title: "Mumbai Real Estate Market Analysis 2024: Investment Opportunities in Prime Locations",
    slug: "mumbai-real-estate-market-analysis-2024",
    description: "Comprehensive analysis of Mumbai's property market trends, price movements, and investment hotspots in Bandra, Juhu, Powai, and other prime areas.",
    content: "# Mumbai Real Estate Market Analysis 2024\n\nMumbai's real estate market continues to show strong growth...",
    cover_image: "/images/blog/mumbai-market-analysis.jpg",
    date: "2024-01-15",
    created_at: "2024-01-15T10:30:00Z",
    author: "Rajesh Sharma",
    category: "Market Analysis",
    reading_time: 8,
    views: 1250
  },
  {
    id: "fallback-2",
    title: "Complete Guide to Buying Your First Property in Mumbai: Legal Process & Documentation",
    slug: "first-property-buying-guide-mumbai",
    description: "Step-by-step guide for first-time property buyers in Mumbai covering RERA compliance, legal documentation, home loans, and registration process.",
    content: "# Complete Guide to Buying Your First Property in Mumbai\n\nBuying your first property in Mumbai can be overwhelming...",
    cover_image: "/images/blog/property-buying-guide.jpg",
    date: "2024-01-10",
    created_at: "2024-01-10T14:15:00Z",
    author: "Priya Patel",
    category: "Buying Guide",
    reading_time: 12,
    views: 2100
  },
  {
    id: "fallback-3",
    title: "Bandra West vs Juhu vs Powai: Which Mumbai Location Offers Best ROI for Property Investment?",
    slug: "mumbai-location-comparison-roi-analysis",
    description: "Detailed comparison of Mumbai's top residential areas - Bandra West, Juhu, and Powai - analyzing investment potential, amenities, and future growth prospects.",
    content: "# Bandra West vs Juhu vs Powai: ROI Analysis\n\nChoosing the right location is crucial for property investment success...",
    cover_image: "/images/blog/location-comparison.jpg",
    date: "2024-01-05",
    created_at: "2024-01-05T09:45:00Z",
    author: "Amit Malhotra",
    category: "Investment",
    reading_time: 10,
    views: 1800
  }
];

const BlogPreview = () => {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Add a small delay to prevent immediate state updates that might cause issues
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const blogs = await getBlogs();
        
        // Only update state if component is still mounted
        if (isMounted) {
          // If no blogs are returned, use fallback static data
          if (blogs && blogs.length > 0) {
            // Get the first 3 blogs to display
            setRecentBlogs(blogs.slice(0, 3));
          } else {
            // Use fallback blogs if no blogs are available from the database
            console.log('No blogs found in database, using fallback data');
            setRecentBlogs(fallbackBlogs);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        if (isMounted) {
          // Use fallback blogs on error
          console.log('Error fetching blogs, using fallback data');
          setRecentBlogs(fallbackBlogs);
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Travel Tips & Guides
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover Goa through our blog. From hidden beaches to driving tips, we've got you covered.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : recentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No blogs available at the moment. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" className="group">
              View All Blog Posts
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

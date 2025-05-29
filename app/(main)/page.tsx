import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";

// Critical sections loaded immediately
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Services from "@/components/home/Services";

// Non-critical sections loaded dynamically
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>,
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>,
});

const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>,
});

const CtaBanner = dynamic(() => import("@/components/home/CtaBanner"), {
  loading: () => <div className="h-40 bg-blue-50 animate-pulse"></div>,
});

const Faqs = dynamic(() => import("@/components/home/Faqs"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>,
});

export const metadata: Metadata = {
  title: "Dream House Properties - Premium Real Estate in Mumbai | Buy, Sell, Rent",
  description:
    "Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in Bandra, Juhu, Powai, and other prime locations. Expert real estate services with 10+ years experience.",
  keywords: "real estate mumbai, property for sale, apartments mumbai, villas mumbai, buy property, rent property, dream house properties, bandra properties, juhu properties, powai properties, andheri properties, worli properties",
  openGraph: {
    title: "Dream House Properties - Premium Real Estate in Mumbai",
    description: "Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in prime locations.",
    images: ['/images/hero-bg.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dream House Properties - Premium Real Estate in Mumbai",
    description: "Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in prime locations.",
    images: ['/images/hero-bg.jpg'],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <Faqs />
      <CtaBanner />
    </div>
  );
}
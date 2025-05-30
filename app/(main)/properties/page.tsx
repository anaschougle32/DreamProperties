import { Metadata } from "next";
import PropertiesGrid from "@/components/property/PropertiesGrid";
import PropertyFilters from "@/components/property/PropertyFilters";
import { Suspense } from "react";
import { Loader2, Building2, MapPin, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Mumbai - Dream House Properties | Apartments, Villas, Houses",
  description: "Find premium properties for sale and rent in Mumbai. Browse luxury apartments, villas, and independent houses in Bandra, Juhu, Powai, Andheri, Lower Parel, and Worli. RERA verified properties with expert guidance.",
  keywords: "properties Mumbai, apartments for sale Mumbai, villas Mumbai, houses for rent Mumbai, real estate Mumbai, property dealers Mumbai, Bandra properties, Juhu properties, Powai properties, Andheri properties, Lower Parel properties, Worli properties, luxury apartments Mumbai, independent houses Mumbai, property investment Mumbai, RERA verified properties",
  openGraph: {
    title: "Premium Properties for Sale & Rent in Mumbai - Dream House Properties",
    description: "Discover luxury apartments, villas, and independent houses in Mumbai's prime locations. Expert real estate services with 10+ years experience.",
    images: ['/images/properties-og.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Properties for Sale & Rent in Mumbai - Dream House Properties",
    description: "Discover luxury apartments, villas, and independent houses in Mumbai's prime locations.",
    images: ['/images/properties-og.jpg'],
  },
};

function LoadingProperties() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
      <p className="text-lg text-gray-600">Loading available properties...</p>
      <p className="text-sm text-gray-500 mt-2">Finding the best properties in Mumbai for you</p>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Premium Mumbai Properties</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Find Your Perfect Property in
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mumbai's Prime Locations
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover luxury apartments, premium villas, and independent houses for sale and rent 
              in Bandra West, Juhu, Powai, Andheri, Lower Parel, Worli, and other sought-after Mumbai neighborhoods. 
              All properties are RERA verified with expert legal assistance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Verified Properties</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">8+</div>
              <div className="text-sm text-gray-600">Prime Locations</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">₹1Cr+</div>
              <div className="text-sm text-gray-600">Starting Price</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Filter Properties
                </h2>
                <PropertyFilters />
              </div>
            </div>
            
            {/* Properties Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    Available Properties in Mumbai
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  Browse through our curated collection of premium properties in Mumbai's most desirable locations. 
                  Each property is verified, legally compliant, and comes with expert guidance.
                </p>
              </div>
              
              <Suspense fallback={<LoadingProperties />}>
                <PropertiesGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Mumbai Properties with Dream House Properties?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  Premium Mumbai Locations
                </h3>
                <p className="text-gray-600 mb-4">
                  Our properties are located in Mumbai's most prestigious neighborhoods including Bandra West, 
                  Juhu, Powai, Andheri West, Lower Parel, and Worli. These areas offer excellent connectivity, 
                  world-class amenities, and high appreciation potential.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Bandra West - The Queen of Suburbs with sea views</li>
                  <li>• Juhu - Beachside luxury living with airport proximity</li>
                  <li>• Powai - IT hub with modern infrastructure</li>
                  <li>• Lower Parel - Business district with premium towers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  Expert Real Estate Services
                </h3>
                <p className="text-gray-600 mb-4">
                  With 10+ years of experience in Mumbai real estate market, we provide comprehensive 
                  services from property search to legal documentation and post-purchase support.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• RERA verified properties with clear titles</li>
                  <li>• Expert market analysis and pricing guidance</li>
                  <li>• Complete legal assistance and documentation</li>
                  <li>• Home loan assistance and investment advice</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 text-center">
                Mumbai Real Estate Market Insights
              </h3>
              <p className="text-gray-600 text-center max-w-3xl mx-auto">
                Mumbai continues to be India's financial capital with strong real estate fundamentals. 
                Areas like Bandra, Juhu, and Lower Parel have shown consistent appreciation over the years. 
                With upcoming infrastructure projects like metro expansion and coastal road, 
                property values in these prime locations are expected to grow further.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
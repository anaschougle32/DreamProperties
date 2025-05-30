import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { getLocations } from "@/lib/supabase";
import { Location } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Mumbai Property Locations - Dream House Properties | Bandra, Juhu, Powai, Andheri",
  description: "Explore premium property locations in Mumbai including Bandra West, Juhu, Powai, Andheri West, Lower Parel, and Worli. Find luxury apartments, villas, and independent houses in Mumbai's most sought-after neighborhoods.",
  keywords: "Mumbai property locations, Bandra West properties, Juhu properties, Powai properties, Andheri West properties, Lower Parel properties, Worli properties, Mumbai real estate locations, premium neighborhoods Mumbai",
  openGraph: {
    title: "Premium Property Locations in Mumbai - Dream House Properties",
    description: "Discover luxury properties in Mumbai's prime locations including Bandra West, Juhu, Powai, and other prestigious neighborhoods.",
    images: ['/images/mumbai-locations-og.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Property Locations in Mumbai - Dream House Properties",
    description: "Discover luxury properties in Mumbai's prime locations including Bandra West, Juhu, Powai, and other prestigious neighborhoods.",
    images: ['/images/mumbai-locations-og.jpg'],
  },
};

export default async function LocationsPage() {
  // Fetch locations from the database
  let locations: Location[] = [];
  try {
    locations = await getLocations();
    console.log('Locations data from DB:', JSON.stringify(locations));
  } catch (error) {
    console.error('Error fetching locations:', error);
  }

  // If no locations from database, show a message
  if (!locations || locations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 md:pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">No Locations Available</h1>
              <p className="text-gray-600 mb-8">
                We're currently updating our location data. Please check back soon or contact us directly.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Sort locations alphabetically
  locations.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              <span>Mumbai Property Locations</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Explore Premium Properties Across
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mumbai's Prime Locations
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover luxury apartments, premium villas, and independent houses in Mumbai's most sought-after neighborhoods. 
              From Bandra West's coastal charm to Powai's modern infrastructure, find your perfect property location.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-sm text-gray-600">Prime Locations</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Properties Available</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">₹2Cr+</div>
              <div className="text-sm text-gray-600">Average Property Value</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{location.name}</h2>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {location.headline}
                  </p>
                  <Link href={`/locations/${location.slug}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      View Properties & Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Mumbai Real Estate Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive property services across all Mumbai locations with expert guidance and support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Property Search</h3>
              <p className="text-gray-600">
                Expert property search across all Mumbai locations with personalized recommendations based on your requirements and budget.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Market Analysis</h3>
              <p className="text-gray-600">
                Detailed market analysis and pricing insights for each Mumbai location to help you make informed investment decisions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Expert Consultation</h3>
              <p className="text-gray-600">
                24/7 expert consultation and support throughout your property journey from search to final documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Dream House Properties for Mumbai Real Estate?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local Mumbai Expertise</h3>
                <p className="text-gray-600 mb-4">
                  Our deep knowledge of Mumbai's neighborhoods helps you choose the right location based on connectivity, 
                  amenities, future development plans, and investment potential.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 10+ years of Mumbai real estate experience</li>
                  <li>• Detailed knowledge of each neighborhood</li>
                  <li>• Understanding of infrastructure developments</li>
                  <li>• Network of local contacts and resources</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Location Services</h3>
                <p className="text-gray-600 mb-4">
                  From property search to legal documentation, we provide end-to-end services across all Mumbai locations 
                  with transparent processes and expert guidance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• RERA verified properties in all locations</li>
                  <li>• Complete legal assistance and documentation</li>
                  <li>• Home loan assistance and investment advice</li>
                  <li>• Post-purchase support and property management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

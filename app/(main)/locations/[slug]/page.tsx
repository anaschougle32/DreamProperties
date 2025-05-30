import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getPropertiesByLocation } from "@/lib/supabase";
import { Property } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, TrendingUp, Users, Phone, MessageCircle } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const location = await getLocationBySlug(params.slug);
    
    if (!location) {
      return {
        title: "Location Not Found | Dream House Properties",
        description: "The requested property location could not be found. Browse our other Mumbai locations for premium real estate opportunities."
      };
    }
    
    // Create a more comprehensive SEO-friendly title and description
    const title = `Properties for Sale & Rent in ${location.name}, Mumbai | Dream House Properties`;
    const description = `Find premium properties for sale and rent in ${location.name}, Mumbai. ${location.headline} RERA verified properties with expert guidance, legal assistance, and best investment opportunities.`;
    
    // Create a rich set of keywords specific to this location
    const keywords = [
      `properties ${location.name} Mumbai`,
      `apartments for sale ${location.name}`,
      `${location.name} real estate`,
      `luxury properties ${location.name}`,
      `Dream House Properties ${location.name}`,
      `independent houses ${location.name}`,
      `property investment ${location.name} Mumbai`,
      `${location.name} property prices`,
      `RERA verified properties ${location.name}`,
      `premium apartments ${location.name}`,
      `${location.name} property dealers`,
      `best properties in ${location.name}`
    ].join(', ');
    
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://dreamhouseproperties.com/locations/${params.slug}`,
        siteName: 'Dream House Properties',
        locale: 'en_IN',
        type: 'website',
        images: [
          {
            url: `/images/locations/${params.slug}-og.jpg`,
            width: 1200,
            height: 630,
            alt: `Properties in ${location.name}, Mumbai`
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Properties in ${location.name}, Mumbai | Dream House Properties`,
        description: location.headline,
        images: [`/images/locations/${params.slug}.jpg`],
      },
      alternates: {
        canonical: `https://dreamhouseproperties.com/locations/${params.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Mumbai Property Locations | Dream House Properties",
      description: "Explore premium property locations across Mumbai. Find luxury apartments, villas, and independent houses with expert guidance.",
    };
  }
}

export default async function LocationPage({ params }: Props) {
  try {
    // Attempt to get location from database
    let location = await getLocationBySlug(params.slug);
    
    // If location not found in database, use a default location
    if (!location) {
      console.log(`Location not found for slug: ${params.slug}, using fallback`);
      
      // Create a fallback location based on the slug
      const fallbackLocations = {
        // Prime Mumbai Locations
        'bandra-west': {
          id: 'default-bandra-west',
          name: 'Bandra West',
          slug: 'bandra-west',
          headline: 'Luxury Properties in Bandra West - The Queen of Suburbs',
          content: 'Discover premium apartments and penthouses in Bandra West with stunning sea views, excellent connectivity, and world-class amenities. Known as the "Queen of Suburbs," Bandra West is Mumbai\'s most prestigious neighborhood, home to Bollywood celebrities and business tycoons. Our curated collection includes luxury 2BHK, 3BHK, and 4BHK apartments with prices ranging from ₹3 Cr to ₹15 Cr. The area offers excellent connectivity via Western Railway, metro, and the iconic Bandra-Worli Sea Link. Key attractions include Bandstand Promenade, Carter Road, and numerous fine dining restaurants and cafes.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'juhu': {
          id: 'default-juhu',
          name: 'Juhu',
          slug: 'juhu',
          headline: 'Beachside Luxury Properties in Juhu, Mumbai',
          content: 'Experience coastal living with luxury villas and apartments in Juhu, Mumbai\'s entertainment hub. Juhu is famous for its beautiful beach, proximity to the airport, and celebrity homes. Our property portfolio includes beachside apartments, luxury villas, and premium penthouses with prices ranging from ₹4 Cr to ₹20 Cr. The area offers excellent connectivity to the airport (10 minutes), business districts, and entertainment venues. Key attractions include Juhu Beach, ISKCON Temple, and numerous five-star hotels and restaurants.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'powai': {
          id: 'default-powai',
          name: 'Powai',
          slug: 'powai',
          headline: 'Modern Properties in Powai - Mumbai\'s IT Hub',
          content: 'Find contemporary apartments and villas in Powai with stunning lake views, modern infrastructure, and proximity to IT companies. Powai is Mumbai\'s planned suburb, known for its IT companies, educational institutions, and beautiful lake. Our properties include modern 1BHK, 2BHK, and 3BHK apartments with prices ranging from ₹1.5 Cr to ₹8 Cr. The area offers excellent connectivity via Eastern Express Highway and upcoming metro lines. Key attractions include Powai Lake, Hiranandani Gardens, and numerous shopping malls and restaurants.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'andheri-west': {
          id: 'default-andheri-west',
          name: 'Andheri West',
          slug: 'andheri-west',
          headline: 'Premium Properties in Andheri West with Excellent Connectivity',
          content: 'Explore luxury apartments in Andheri West with metro connectivity, proximity to airport, and vibrant commercial areas. Andheri West is one of Mumbai\'s most well-connected suburbs, offering the perfect blend of residential comfort and commercial convenience. Our properties include modern apartments and independent houses with prices ranging from ₹1.5 Cr to ₹6 Cr. The area offers excellent connectivity via Western Railway, metro, and proximity to the international airport. Key attractions include Versova Beach, Lokhandwala Market, and numerous entertainment venues.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'lower-parel': {
          id: 'default-lower-parel',
          name: 'Lower Parel',
          slug: 'lower-parel',
          headline: 'High-Rise Luxury Properties in Lower Parel Business District',
          content: 'Discover premium high-rise apartments in Lower Parel, Mumbai\'s business district with corporate offices, shopping malls, and fine dining. Lower Parel has transformed from a mill district to Mumbai\'s new business hub, housing major corporate offices and luxury residential towers. Our properties include premium 2BHK, 3BHK, and 4BHK apartments with prices ranging from ₹4 Cr to ₹20 Cr. The area offers excellent connectivity via Western Railway and upcoming metro lines. Key attractions include Phoenix Mills, Palladium Mall, and numerous corporate offices.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'worli': {
          id: 'default-worli',
          name: 'Worli',
          slug: 'worli',
          headline: 'Ultra-Luxury Properties in Worli with Sea Views',
          content: 'Experience the pinnacle of luxury living in Worli with sea-facing penthouses, premium towers, and proximity to Bandra-Worli Sea Link. Worli is one of Mumbai\'s most prestigious addresses, known for its ultra-luxury residential towers and stunning sea views. Our properties include premium apartments and penthouses with prices ranging from ₹5 Cr to ₹50 Cr. The area offers excellent connectivity via Bandra-Worli Sea Link and upcoming metro lines. Key attractions include Worli Sea Face, Nehru Planetarium, and numerous five-star hotels.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'colaba': {
          id: 'default-colaba',
          name: 'Colaba',
          slug: 'colaba',
          headline: 'Heritage Properties in Colaba - South Mumbai\'s Crown Jewel',
          content: 'Explore heritage apartments and modern penthouses in Colaba with proximity to Gateway of India, Taj Hotel, and Mumbai\'s business district. Colaba is South Mumbai\'s most iconic neighborhood, known for its colonial architecture, heritage buildings, and proximity to the business district. Our properties include heritage apartments and modern penthouses with prices ranging from ₹6 Cr to ₹30 Cr. The area offers excellent connectivity to the business district and major attractions. Key landmarks include Gateway of India, Taj Mahal Palace Hotel, and Colaba Causeway.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      const fallbackLocation = fallbackLocations[params.slug as keyof typeof fallbackLocations];
      
      if (!fallbackLocation) {
        notFound();
      }
      
      location = fallbackLocation;
    }

    // Get properties for this location from database
    const { data: properties } = await getPropertiesByLocation(location.name, 6);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 md:pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                <span>Properties in {location.name}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Premium Properties in
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {location.name}, Mumbai
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                {location.headline}
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  <Building2 className="w-5 h-5 mr-2" />
                  View All Properties
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 90828 88912
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Location Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                About {location.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                {location.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Available Properties in {location.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover premium apartments, villas, and independent houses in {location.name} 
                with expert guidance and RERA compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties && properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Available</h3>
                  <p className="text-gray-600 mb-6">
                    We're currently updating our property listings for {location.name}. 
                    Contact us for the latest available properties.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Load More Button - only show if there are properties */}
            {properties && properties.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  View More Properties in {location.name}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Location Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                {location.name} Property Market Insights
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center bg-gray-50 rounded-2xl p-6">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Properties Available</div>
                </div>
                <div className="text-center bg-gray-50 rounded-2xl p-6">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">₹3Cr+</div>
                  <div className="text-sm text-gray-600">Average Price</div>
                </div>
                <div className="text-center bg-gray-50 rounded-2xl p-6">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">15%</div>
                  <div className="text-sm text-gray-600">Annual Appreciation</div>
                </div>
                <div className="text-center bg-gray-50 rounded-2xl p-6">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">100+</div>
                  <div className="text-sm text-gray-600">Happy Families</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 md:px-6 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Find Your Dream Property in {location.name}?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get expert consultation and personalized property recommendations from our Mumbai real estate specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                  <Building2 className="w-5 h-5 mr-2" />
                  Schedule Site Visit
                </Button>
                <a
                  href="https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20properties%20in%20{location.name},%20Mumbai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error loading location page:", error);
    notFound();
  }
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPropertyBySlug, getFeaturedProperties } from "@/lib/supabase";
import { Property } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Heart,
  Share2,
  Eye,
  Building2,
  Car,
  Wifi,
  Shield,
  Dumbbell,
  Waves,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: property } = await getPropertyBySlug(params.slug);
  
  if (!property) {
    return {
      title: "Property Not Found | Dream House Properties",
      description: "The requested property could not be found. Browse our other premium Mumbai properties."
    };
  }

  const title = `${property.title} | Dream House Properties - Mumbai Real Estate`;
  const description = `${property.description || property.title} Located in ${property.location}, Mumbai. Price: ₹${(property.price / 10000000).toFixed(1)}Cr. ${property.bedrooms}BHK with ${property.bathrooms} bathrooms, ${property.area_sqft} sqft.`;

  return {
    title,
    description,
    keywords: `${property.title}, ${property.location} properties, Mumbai real estate, ${property.property_type} for ${property.listing_type}, Dream House Properties`,
    openGraph: {
      title,
      description,
      images: property.main_image ? [property.main_image] : [],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: property.main_image ? [property.main_image] : [],
    },
  };
}

function PropertyImageGallery({ property }: { property: Property }) {
  const images = property.images && property.images.length > 0 
    ? property.images 
    : property.main_image 
    ? [property.main_image]
    : ['/images/property-placeholder.jpg'];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={images[0]}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white">
            For {property.listing_type === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold">
              ₹{(property.price / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-sm opacity-90">
              ₹{Math.round(property.price / property.area_sqft!).toLocaleString()}/sqft
            </div>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src={image}
                alt={`${property.title} - Image ${index + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </div>
          ))}
          {images.length > 5 && (
            <div className="relative h-24 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-600 font-medium">+{images.length - 4}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PropertyFeatures({ property }: { property: Property }) {
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('parking') || lowerFeature.includes('car')) return Car;
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) return Wifi;
    if (lowerFeature.includes('security') || lowerFeature.includes('guard')) return Shield;
    if (lowerFeature.includes('gym') || lowerFeature.includes('fitness')) return Dumbbell;
    if (lowerFeature.includes('pool') || lowerFeature.includes('swimming')) return Waves;
    return Building2;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {property.features?.map((feature, index) => {
        const IconComponent = getFeatureIcon(feature);
        return (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <IconComponent className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">{feature}</span>
          </div>
        );
      })}
    </div>
  );
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { data: property, error } = await getPropertyBySlug(params.slug);
  
  if (error || !property) {
    notFound();
  }

  // Get related properties
  const { data: relatedProperties } = await getFeaturedProperties(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/properties" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <PropertyImageGallery property={property} />

            {/* Property Info */}
            <Card className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}, Mumbai</span>
                    <span className="ml-auto flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Listed {new Date(property.created_at!).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {property.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{property.area_sqft?.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About This Property</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || `Beautiful ${property.bedrooms}BHK ${property.property_type} located in the prestigious ${property.location} area of Mumbai. This property offers modern amenities and excellent connectivity.`}
                  </p>
                </div>

                <Separator />

                {/* Property Details */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type</span>
                        <span className="font-medium capitalize">{property.property_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Furnishing</span>
                        <span className="font-medium capitalize">{property.furnishing || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor</span>
                        <span className="font-medium">{property.floor_number || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Floors</span>
                        <span className="font-medium">{property.total_floors || 'Not specified'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facing</span>
                        <span className="font-medium capitalize">{property.facing || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year Built</span>
                        <span className="font-medium">{property.year_built || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium capitalize">{property.availability_status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID</span>
                        <span className="font-medium text-blue-600">#{property.id.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features & Amenities */}
                {property.features && property.features.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                      <PropertyFeatures property={property} />
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ₹{(property.price / 10000000).toFixed(1)} Crore
                </div>
                <div className="text-gray-600">
                  ₹{Math.round(property.price / property.area_sqft!).toLocaleString()}/sqft
                </div>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={`tel:+919082888912`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-green-500 text-green-700 hover:bg-green-50"
                >
                  <Link 
                    href={`https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Link>
                </Button>

                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Schedule Visit
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Dream House Properties</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your trusted Mumbai real estate partner with 10+ years of experience
                </p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">500+ Happy Customers</p>
              </div>
            </Card>

            {/* Location Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Location Highlights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{property.location}, Mumbai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Prime residential area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span>Excellent connectivity</span>
                </div>
              </div>
              
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href={`/locations/${property.location.toLowerCase().replace(/\s+/g, '-')}`}>
                  Explore {property.location}
                </Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties && relatedProperties.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Similar Properties
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover other premium properties in Mumbai that might interest you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard key={relatedProperty.id} property={relatedProperty} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/properties">
                  View All Properties
                </Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 
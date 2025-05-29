"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Heart, Eye, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProperties() {
  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury 3BHK Sea View Apartment',
      location: 'Bandra West',
      price: '₹4.5 Crore',
      originalPrice: '₹5.2 Crore',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: '1,800 sqft',
      image: '/images/property-1.jpg',
      featured: true,
      tags: ['Sea View', 'Premium'],
      description: 'Stunning sea-facing apartment with modern amenities and breathtaking Arabian Sea views.',
      slug: 'luxury-3bhk-bandra-west'
    },
    {
      id: 2,
      title: 'Premium 2BHK Near Juhu Beach',
      location: 'Juhu',
      price: '₹3.5 Crore',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sqft',
      image: '/images/property-2.jpg',
      featured: true,
      tags: ['Beach Access', 'Furnished'],
      description: 'Beautiful apartment just 2 minutes walk from Juhu Beach. Perfect for beachside living.',
      slug: 'premium-2bhk-juhu-beach'
    },
    {
      id: 3,
      title: 'Modern 4BHK Villa in Powai',
      location: 'Powai',
      price: '₹5.5 Crore',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 4,
      area: '2,500 sqft',
      image: '/images/property-3.jpg',
      featured: true,
      tags: ['Villa', 'Lake View'],
      description: 'Spacious villa in gated community with lake views and modern amenities.',
      slug: 'modern-4bhk-villa-powai'
    },
    {
      id: 4,
      title: 'Luxury Penthouse Lower Parel',
      location: 'Lower Parel',
      price: '₹8.5 Crore',
      type: 'Penthouse',
      bedrooms: 4,
      bathrooms: 5,
      area: '3,200 sqft',
      image: '/images/property-4.jpg',
      featured: true,
      tags: ['Penthouse', 'City View'],
      description: 'Ultra-luxury penthouse with panoramic city views and premium amenities.',
      slug: 'luxury-penthouse-lower-parel'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            <span>Featured Properties</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Premium Properties in 
            <span className="block text-blue-600">Mumbai's Prime Locations</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury apartments, villas, and penthouses 
            in Mumbai's most sought-after neighborhoods.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              {/* Property Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Property Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {property.tags.map((tag, index) => (
                    <Badge key={index} className="bg-white/90 text-gray-900 hover:bg-white">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold">
                    {property.price}
                  </div>
                  {property.originalPrice && (
                    <div className="text-white/80 text-sm line-through mt-1">
                      {property.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                  <Badge variant="outline" className="ml-auto">
                    {property.type}
                  </Badge>
                </div>

                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                {/* Property Features */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href={`/properties/${property.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Properties CTA */}
        <div className="text-center">
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
          >
            <Link href="/properties" className="flex items-center gap-2">
              View All Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 
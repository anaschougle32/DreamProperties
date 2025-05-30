"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Bed, Bath, Square, Phone, MessageCircle, Eye, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
  showLocation?: boolean;
  variant?: 'default' | 'compact' | 'featured' | 'grid' | 'list';
  className?: string;
}

export default function PropertyCard({ 
  property, 
  showLocation = true, 
  variant = 'default',
  className = '' 
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={`overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${className}`}>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.main_image || '/images/property-placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Property Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700">
            {property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
          </Badge>
          {property.is_featured && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {property.is_premium && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Premium
            </Badge>
          )}
        </div>
        
        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-xl text-lg font-bold shadow-sm">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Location and Date */}
        {showLocation && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{property.location}, Mumbai</span>
            <span className="ml-auto text-xs text-gray-500">
              {formatDate(property.created_at)}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/properties/${property.slug}`}>
            {property.title}
          </Link>
        </h3>
        
        {/* Description */}
        {property.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
        )}
        
        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {property.area_sqft?.toLocaleString()} sqft
          </span>
        </div>
        
        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Link href={`/properties/${property.slug}`}>
              View Details
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 rounded-xl"
            asChild
          >
            <Link href={`tel:+919082888912`}>
              <Phone className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 rounded-xl bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            asChild
          >
            <Link 
              href={`https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`} 
              target="_blank"
            >
              <MessageCircle className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
} 
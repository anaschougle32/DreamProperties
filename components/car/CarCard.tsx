"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/lib/types";
import { Fuel, Users, Settings, Star, Heart, Phone, MessageCircle } from "lucide-react";

interface CarCardProps {
  car: Car;
  showCategory?: boolean;
}

export default function CarCard({ car, showCategory = false }: CarCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}/day`;
  };

  const imageSrc = hasImageError ? "/images/car-placeholder.jpg" : (car.main_image || "/images/car-placeholder.jpg");

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setHasImageError(true)}
        />
        
        {/* Category Badge */}
        {showCategory && car.category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-600 text-white">
              {car.category}
            </Badge>
          </div>
        )}
        
        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-lg text-sm font-semibold shadow-sm">
            {formatPrice(car.price_per_day)}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            <Link href={`/cars/${car.slug}`}>
              {car.brand} {car.name}
            </Link>
          </h3>
          {car.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {car.description}
            </p>
          )}
        </div>
        
        {/* Car Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span className="capitalize">{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          {car.mileage && (
            <div className="flex items-center gap-1">
              <span>{car.mileage} km/l</span>
            </div>
          )}
        </div>
        
        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {car.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature.name}
              </Badge>
            ))}
            {car.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{car.features.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={`/cars/${car.slug}`}>
              View Details
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3"
            asChild
          >
            <Link href="tel:+918888888888">
              <Phone className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            asChild
          >
            <Link href="https://wa.me/918888888888" target="_blank">
              <MessageCircle className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
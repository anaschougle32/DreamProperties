"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Home, TrendingUp, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House', 'Duplex', 'Penthouse'];
const LOCATIONS = ['Whitefield', 'Koramangala', 'HSR Layout', 'Electronic City', 'Indiranagar'];
const PRICE_RANGES = [
  { label: 'Under ₹50L', value: '0-5000000' },
  { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
  { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
  { label: '₹2Cr - ₹5Cr', value: '20000000-50000000' },
  { label: 'Above ₹5Cr', value: '50000000-999999999' },
];

export default function Hero() {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    listingType: 'sale'
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.propertyType) params.set('property_type', searchData.propertyType);
    if (searchData.priceRange) {
      const [min, max] = searchData.priceRange.split('-');
      params.set('min_price', min);
      params.set('max_price', max);
    }
    params.set('listing_type', searchData.listingType);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury properties in Bangalore"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                Dream Home
              </span>
              in Bangalore
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover premium properties with Dream House Properties. From luxury apartments to spacious villas, 
              we help you find the perfect home that matches your lifestyle and budget.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 animate-slide-in-left">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Home className="w-5 h-5 text-primary-400" />
              <span>500+ Properties</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-5 h-5 text-primary-400" />
              <span>1000+ Happy Families</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award className="w-5 h-5 text-primary-400" />
              <span>10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="w-5 h-5 text-primary-400" />
              <span>Best ROI Guaranteed</span>
            </div>
          </div>

          {/* Search Form */}
          <Card className="p-6 md:p-8 bg-white/95 backdrop-blur-sm shadow-2xl animate-slide-in-right">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-2">
                Start Your Property Search
              </h2>
              <p className="font-body text-gray-600">
                Find properties that match your preferences
              </p>
            </div>

            {/* Listing Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6 max-w-xs mx-auto">
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'sale' }))}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  searchData.listingType === 'sale'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'rent' }))}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  searchData.listingType === 'rent'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Property Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, priceRange: value }))}>
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Price Range" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch}
                className="h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Properties
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/properties?is_featured=true" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Featured Properties
              </Link>
              <Link 
                href="/properties?listing_type=rent" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Rental Properties
              </Link>
              <Link 
                href="/properties?property_type=villa" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Luxury Villas
              </Link>
              <Link 
                href="/locations" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Popular Locations
              </Link>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in">
            <Button 
              asChild
              size="lg" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-medium"
            >
              <Link href="/properties">
                Explore All Properties
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium"
            >
              <Link href="/contact">
                Schedule a Visit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Home, TrendingUp, Users, Award, Star, Play, ArrowRight, Building2, Key, Shield, Bed, Bath, Square, Heart, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House', 'Duplex', 'Penthouse'];
const LOCATIONS = ['Bandra West', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel', 'Worli', 'Malad West', 'Thane West'];
const PRICE_RANGES = [
  { label: 'Under ₹1Cr', value: '0-10000000' },
  { label: '₹1Cr - ₹3Cr', value: '10000000-30000000' },
  { label: '₹3Cr - ₹5Cr', value: '30000000-50000000' },
  { label: '₹5Cr - ₹10Cr', value: '50000000-100000000' },
  { label: 'Above ₹10Cr', value: '100000000-999999999' },
];

const BEDROOMS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];

export default function Hero() {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    listingType: 'sale'
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.propertyType) params.set('property_type', searchData.propertyType);
    if (searchData.bedrooms) params.set('bedrooms', searchData.bedrooms.split(' ')[0]);
    if (searchData.priceRange) {
      const [min, max] = searchData.priceRange.split('-');
      params.set('min_price', min);
      params.set('max_price', max);
    }
    params.set('listing_type', searchData.listingType);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5" />
          
          {/* Geometric Shapes */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-20 lg:pt-32 lg:pb-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-10 animate-fade-in">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                  ))}
                </div>
                <span>Rated 4.9/5 by 1000+ Happy Families</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1]">
                  Find Your Perfect
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Dream Home
                  </span>
                  <span className="block text-gray-700 text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    in Mumbai
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover premium apartments, luxury villas, and independent houses 
                  in Mumbai's most prestigious neighborhoods. Your dream property awaits.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, text: 'RERA Verified', color: 'text-green-600' },
                  { icon: Award, text: '10+ Years Experience', color: 'text-blue-600' },
                  { icon: Users, text: '1000+ Happy Clients', color: 'text-purple-600' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/properties" className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Explore Properties
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl flex items-center gap-2 transition-all duration-300"
                >
                  <Link href="tel:+919082888912">
                    <Phone className="w-5 h-5" />
                    Call Expert
                  </Link>
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white shadow-sm" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Join 1000+ Satisfied Customers</div>
                    <div className="text-gray-600">Who found their dream homes with us</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Property Showcase */}
            <div className="relative animate-slide-in-right">
              {/* Main Property Card */}
              <div className="relative">
                <Card className="overflow-hidden shadow-2xl rounded-3xl bg-white border-0">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/images/hero-property.jpg"
                      alt="Luxury 3BHK Sea View Apartment in Bandra West Mumbai"
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    
                    {/* Property Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        Sea View
                      </span>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        Premium
                      </span>
                    </div>
                    
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl text-lg font-bold shadow-sm">
                        ₹4.5 Cr
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>Bandra West, Mumbai</span>
                      <span className="ml-auto bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                        For Sale
                      </span>
                    </div>
                    
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      Luxury 3BHK Sea View Apartment
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        3 Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        3 Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        1,800 sqft
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        View Details
                      </Button>
                      <Button variant="outline" className="px-4 rounded-xl">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Floating Property Cards */}
                <div className="absolute -top-6 -right-6 hidden xl:block animate-float">
                  <Card className="p-4 bg-white shadow-xl rounded-2xl w-56 border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Juhu Beach Villa</div>
                        <div className="text-sm text-gray-600">₹3.5 Crore</div>
                        <div className="text-xs text-green-600 font-medium">Available</div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
                  <Card className="p-4 bg-white shadow-xl rounded-2xl w-56 border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Powai Apartment</div>
                        <div className="text-sm text-gray-600">₹5.5 Crore</div>
                        <div className="text-xs text-blue-600 font-medium">New Launch</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Property Search Section */}
      <section className="relative -mt-20 z-20 pb-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-10 bg-white shadow-2xl rounded-3xl border-0 max-w-6xl mx-auto backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Property in Mumbai
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Search from 500+ verified properties in Mumbai's prime locations with expert guidance
              </p>
            </div>

            {/* Listing Type Toggle */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8 max-w-sm mx-auto">
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'sale' }))}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  searchData.listingType === 'sale'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy Property
              </button>
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'rent' }))}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  searchData.listingType === 'rent'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Rent Property
              </button>
            </div>

            {/* Enhanced Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <SelectValue placeholder="Select Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase().replace(' ', '-')}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-500" />
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

              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, bedrooms: value }))}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <Bed className="w-5 h-5 text-blue-500" />
                    <SelectValue placeholder="Bedrooms" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {BEDROOMS.map((bedroom) => (
                    <SelectItem key={bedroom} value={bedroom}>
                      {bedroom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, priceRange: value }))}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
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
                className="h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Verified Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">₹100Cr+</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex-1 text-center">
                <p className="text-gray-600 mb-3">Need help finding the perfect property?</p>
                <div className="flex gap-3 justify-center">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="tel:+919082888912" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Expert
                    </Link>
                  </Button>
                  <Button asChild className="bg-green-600 hover:bg-green-700 rounded-xl">
                    <Link href="https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20property%20inquiry." target="_blank" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Home, TrendingUp, Users, Award, Star, Play, ArrowRight, Building2, Key, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House', 'Duplex', 'Penthouse'];
const LOCATIONS = ['Bandra West', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel', 'Worli'];
const PRICE_RANGES = [
  { label: 'Under ₹1Cr', value: '0-10000000' },
  { label: '₹1Cr - ₹3Cr', value: '10000000-30000000' },
  { label: '₹3Cr - ₹5Cr', value: '30000000-50000000' },
  { label: '₹5Cr - ₹10Cr', value: '50000000-100000000' },
  { label: 'Above ₹10Cr', value: '100000000-999999999' },
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
    <>
      {/* Main Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>Trusted by 1000+ Happy Families</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  Designing Your
                  <span className="block text-blue-600">Next Chapter.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Where Dreams Become Apartments. Transforming Visions into 
                  Vibrant Living Spaces in Mumbai's most sought-after locations.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/properties" className="flex items-center gap-2">
                    Explore Projects
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Our Process
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-white" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">50k+ Happy Clients</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-gray-600 ml-1">4.8/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Property Showcase */}
            <div className="relative animate-slide-in-right">
              {/* Main Property Card */}
              <div className="relative">
                <Card className="overflow-hidden shadow-2xl rounded-3xl bg-white">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/images/hero-property.jpg"
                      alt="Luxury apartment in Mumbai"
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sea View
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        ₹4.5Cr
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Luxury Apartment Bandra</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        3 Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        3 Bath
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        1,800 sqft
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₹4.5 Crore</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Floating Property Cards */}
                <div className="absolute -top-8 -right-8 hidden lg:block animate-float">
                  <Card className="p-4 bg-white shadow-lg rounded-2xl w-48">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Juhu Beach Villa</div>
                        <div className="text-sm text-gray-600">₹3.5 Crore</div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="absolute -bottom-8 -left-8 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
                  <Card className="p-4 bg-white shadow-lg rounded-2xl w-48">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Powai Apartment</div>
                        <div className="text-sm text-gray-600">₹5.5 Crore</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <Card className="p-6 md:p-8 bg-white shadow-2xl rounded-3xl border-0 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Find Your Dream Property
              </h2>
              <p className="text-gray-600 text-lg">
                At The Best Price in Mumbai
              </p>
            </div>

            {/* Listing Type Toggle */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8 max-w-xs mx-auto">
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'sale' }))}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  searchData.listingType === 'sale'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSearchData(prev => ({ ...prev, listingType: 'rent' }))}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  searchData.listingType === 'rent'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Select onValueChange={(value) => setSearchData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Location" />
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
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-400" />
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
                <SelectTrigger className="h-14 rounded-xl border-gray-200 focus:border-blue-500">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
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
                className="h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Properties Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Property
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We support our clients at every stage of the buying and selling process, ensuring 
              a seamless and stress-free experience from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Key className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Property Valuation</h3>
              <p className="text-gray-600">
                Accurate assessments to determine the true value of your favourite 
                property in Mumbai's prime locations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Legal Assistance</h3>
              <p className="text-gray-600">
                Helping clients navigate the complexities of legal paperwork to 
                ensure a smooth transaction in Maharashtra.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Market Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Mumbai real estate market trends and 
                expert negotiation strategies.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
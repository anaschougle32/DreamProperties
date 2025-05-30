"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Award, TrendingUp, Home, Shield, Clock, MapPin, Star, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const achievements = [
    { icon: Home, number: '500+', label: 'Properties Sold', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Users, number: '1000+', label: 'Happy Families', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Award, number: '10+', label: 'Years Experience', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: TrendingUp, number: '₹100Cr+', label: 'Property Value', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'RERA Verified Properties',
      description: 'All Mumbai properties are legally verified with clear documentation and RERA compliance for buyer protection.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      title: '24/7 Expert Support',
      description: 'Round-the-clock customer support for all your Mumbai real estate queries and property assistance.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Mumbai Market Expertise',
      description: 'Deep understanding of Mumbai real estate market trends, property prices, and investment opportunities.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Dedicated relationship managers to guide you through your Mumbai property buying or selling journey.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const locations = [
    'Bandra West', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel', 'Worli'
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                <span>About Dream House Properties Mumbai</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Mumbai's Most Trusted
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Real Estate Partner
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                With over a decade of experience in Mumbai's dynamic real estate market, 
                Dream House Properties has helped thousands of families find their perfect homes 
                in Bandra, Juhu, Powai, Andheri, and other premium Mumbai locations. We specialize 
                in luxury apartments, independent houses, and commercial properties.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              {[
                'Expert knowledge of Mumbai property market and pricing trends',
                'End-to-end legal assistance and property documentation support',
                'Transparent pricing with no hidden charges or broker fees',
                'Post-purchase support and property management services in Mumbai'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Service Areas */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                Prime Mumbai Locations We Serve
              </h3>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <span key={index} className="inline-flex items-center gap-1 bg-white text-gray-700 px-3 py-1 rounded-lg text-sm font-medium border">
                    <MapPin className="w-3 h-3" />
                    {location}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/about" className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Learn More About Us
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-team.jpg"
                alt="Dream House Properties team - Mumbai real estate experts"
                width={600}
                height={400}
                className="object-cover w-full h-[400px]"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Trust Badge Overlay */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Floating Achievement Cards */}
            <div className="absolute -bottom-8 -left-8 hidden lg:block animate-float">
              <Card className="p-6 bg-white shadow-xl rounded-2xl border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                    <div className="text-xs text-blue-600 font-medium">Mumbai Market</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -top-8 -right-8 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <Card className="p-6 bg-white shadow-xl rounded-2xl border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                    <div className="text-xs text-green-600 font-medium">Satisfied Families</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Mumbai Real Estate Success Story
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of families across Mumbai for property buying, selling, and investment guidance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${achievement.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${achievement.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Dream House Properties for Mumbai Real Estate?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive Mumbai real estate services with a focus on transparency, 
              market expertise, and customer satisfaction. From Bandra to Powai, we know Mumbai inside out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 group">
                  <div className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Award, TrendingUp, Home, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const achievements = [
    { icon: Home, number: '500+', label: 'Properties Sold', color: 'text-blue-600' },
    { icon: Users, number: '1000+', label: 'Happy Families', color: 'text-green-600' },
    { icon: Award, number: '10+', label: 'Years Experience', color: 'text-purple-600' },
    { icon: TrendingUp, number: '₹100Cr+', label: 'Property Value', color: 'text-orange-600' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'All properties are legally verified with clear documentation and RERA compliance.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your property-related queries and assistance.'
    },
    {
      icon: TrendingUp,
      title: 'Market Expertise',
      description: 'Deep understanding of Mumbai real estate market trends and investment opportunities.'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Dedicated relationship managers to guide you through your property journey.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                <span>About Dream House Properties</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Your Trusted Partner in 
                <span className="block text-blue-600">Mumbai Real Estate</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                With over a decade of experience in Mumbai's dynamic real estate market, 
                Dream House Properties has helped thousands of families find their perfect homes. 
                We specialize in premium properties across Mumbai's most sought-after locations.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              {[
                'Expert knowledge of Mumbai property market',
                'End-to-end legal assistance and documentation',
                'Transparent pricing with no hidden charges',
                'Post-purchase support and property management'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/about" className="flex items-center gap-2">
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
                alt="Dream House Properties team"
                width={600}
                height={400}
                className="object-cover w-full h-[400px]"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Achievement Cards */}
            <div className="absolute -bottom-8 -left-8 hidden lg:block">
              <Card className="p-6 bg-white shadow-xl rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -top-8 -right-8 hidden lg:block">
              <Card className="p-6 bg-white shadow-xl rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-50 flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.label}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Dream House Properties?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services with a focus on transparency, 
              expertise, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">
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
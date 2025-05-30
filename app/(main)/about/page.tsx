import { Metadata } from "next";
import Image from "next/image";
import { Check, Users, Award, Clock, Shield, TrendingUp, Building2, MapPin, Star, Home, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dream House Properties | Mumbai's Leading Real Estate Company Since 2014",
  description: "Learn about Dream House Properties, Mumbai's premier real estate service. Discover our story, mission, and commitment to providing exceptional property buying and selling experiences across Mumbai's prime locations including Bandra, Juhu, Powai, and Andheri.",
  keywords: "about Dream House Properties, Mumbai real estate company, property dealers Mumbai, real estate agents Mumbai, Bandra property dealers, Juhu real estate, Powai property consultants, Mumbai property experts, RERA registered agents, luxury property Mumbai, real estate services Mumbai",
  openGraph: {
    title: "About Dream House Properties | Mumbai's Leading Real Estate Company",
    description: "Discover the story behind Mumbai's most trusted real estate service. Learn about our mission, values, and the team that makes your perfect Mumbai property journey possible.",
    url: "https://dreamhouseproperties.com/about",
    siteName: "Dream House Properties",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/about/team-photo.jpg",
      width: 1200,
      height: 630,
      alt: "Dream House Properties Team - Real Estate Experts in Mumbai"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dream House Properties | Mumbai's Leading Real Estate Company",
    description: "Discover the story behind Mumbai's most trusted real estate service.",
    images: ["/images/about/team-photo.jpg"],
  },
  alternates: {
    canonical: "https://dreamhouseproperties.com/about",
  },
};

export default function AboutPage() {
  const achievements = [
    { icon: Building2, number: '500+', label: 'Properties Sold', description: 'Successful transactions across Mumbai' },
    { icon: Users, number: '1000+', label: 'Happy Families', description: 'Satisfied customers who found their dream homes' },
    { icon: Award, number: '10+', label: 'Years Experience', description: 'Decade of expertise in Mumbai real estate' },
    { icon: TrendingUp, number: '₹100Cr+', label: 'Property Value', description: 'Total worth of properties handled' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'RERA Compliance & Legal Safety',
      description: 'All our Mumbai properties are RERA verified with clear legal documentation. We ensure complete transparency and buyer protection in every transaction.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Customer-Centric Approach',
      description: 'Our customers satisfaction is our top priority. We provide personalized service to help you find the perfect property in Mumbai\'s prime locations.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Market Expertise & Analysis',
      description: 'Deep understanding of Mumbai real estate trends, property valuations, and investment opportunities across Bandra, Juhu, Powai, and other prime areas.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Clock,
      title: '24/7 Support & Reliability',
      description: 'Round-the-clock customer support throughout your property journey. From initial search to final documentation, we\'re always available.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Local Mumbai Expertise',
      description: 'As Mumbai locals with 10+ years experience, we provide insider knowledge about neighborhoods, pricing trends, and investment potential in areas like Bandra West, Juhu, and Powai.'
    },
    {
      title: 'End-to-End Property Services',
      description: 'From property search and site visits to legal documentation and home loan assistance, we handle every aspect of your Mumbai property transaction.'
    },
    {
      title: 'Transparent Pricing & No Hidden Charges',
      description: 'Clear, upfront pricing with no hidden fees. Our brokerage is competitive and all costs are discussed transparently before any commitment.'
    },
    {
      title: 'Post-Purchase Support',
      description: 'Our relationship doesn\'t end with the sale. We provide ongoing support for property management, rental assistance, and future investment guidance.'
    },
    {
      title: 'Verified Property Portfolio',
      description: 'Every property in our Mumbai portfolio is personally verified for legal compliance, amenities, and accurate pricing to ensure you get the best value.'
    },
    {
      title: 'Investment Advisory Services',
      description: 'Expert guidance on Mumbai real estate investment opportunities, market timing, and portfolio diversification across different property types and locations.'
    }
  ];

  return (
    <>
      {/* Breadcrumbs for SEO */}
      <nav className="container mx-auto px-4 md:px-6 pt-24 pb-2 text-sm" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">About Us</span>
          </li>
        </ol>
      </nav>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            <span>About Dream House Properties</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Mumbai's Most Trusted
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Estate Partner
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Serving Mumbai's prime locations since 2014 | Specializing in Bandra, Juhu, Powai, Andheri, Lower Parel & Worli
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-600 font-medium">RERA Registered</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="p-6 text-center border-0 shadow-sm">
                  <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.number}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{achievement.label}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white" id="our-story">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mumbai Real Estate Journey</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Dream House Properties was founded in 2014 with a simple mission: to help families find their perfect homes in Mumbai's most desirable neighborhoods. We started with deep local knowledge of areas like Bandra West, Juhu, and Powai, understanding that each location has its unique character and investment potential.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As Mumbai natives who understand every corner of the city, from the bustling commercial districts of Lower Parel and Andheri to the serene coastal areas of Juhu and Bandra, we recognized that finding the right property requires more than just listings – it requires expertise, trust, and personalized guidance.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Today, we've successfully helped over 1000 families find their dream homes across Mumbai, handling properties worth over ₹100 crores. Our core values remain unchanged – providing reliable, transparent, and expert real estate services throughout Mumbai's prime locations.
              </p>

              {/* Service Areas */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                  Prime Mumbai Locations We Specialize In
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Bandra West', 'Juhu', 'Powai', 'Andheri West', 'Lower Parel', 'Worli'].map((location, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/mumbai-skyline.jpg"
                  alt="Dream House Properties team with Mumbai skyline - Real Estate experts in Mumbai"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-900">10+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do at Dream House Properties, ensuring exceptional service for every Mumbai property transaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="p-8 text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/happy-family.jpg"
                  alt="Happy family with keys to their new Mumbai home - Dream House Properties success story"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Why Choose Dream House Properties for Mumbai Real Estate?</h2>
              
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Find Your Dream Home in Mumbai?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our expert team is ready to help you navigate Mumbai's real estate market. 
            From Bandra to Powai, we'll find the perfect property that matches your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link href="/properties" className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Browse Properties
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
              <Link href="/contact" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Our Experts
              </Link>
            </Button>
          </div>

          {/* Quick Contact */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Need immediate assistance? Reach out to our Mumbai property experts</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919082888912" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <Phone className="w-4 h-4" />
                +91 90828 88912
              </a>
              <a href="https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20Mumbai%20properties." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +91 79-77288350
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
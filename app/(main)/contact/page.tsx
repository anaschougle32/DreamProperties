import { Metadata } from "next";
import ContactForm from "@/components/common/ContactForm";
import { MapPin, Phone, Mail, Clock, Building2, MessageCircle, Star, Shield, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Dream House Properties | Mumbai Real Estate Experts | Property Consultation",
  description: "Contact Dream House Properties for expert Mumbai real estate consultation. Get in touch for property buying, selling, and investment guidance in Bandra, Juhu, Powai, Andheri, and other prime Mumbai locations. Available 24/7 for property queries.",
  keywords: "contact Dream House Properties, Mumbai property consultation, real estate experts Mumbai, property dealers contact, Bandra property agents, Juhu real estate contact, Powai property consultants, Mumbai property helpline, real estate consultation Mumbai, property investment advice Mumbai",
  openGraph: {
    title: "Contact Dream House Properties | Mumbai Real Estate Experts",
    description: "Get expert Mumbai real estate consultation. Contact us for property buying, selling, and investment guidance across Mumbai's prime locations.",
    images: ['/images/contact-og.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Dream House Properties | Mumbai Real Estate Experts",
    description: "Get expert Mumbai real estate consultation and property guidance.",
    images: ['/images/contact-og.jpg'],
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Our Property Experts',
      description: 'Speak directly with our Mumbai real estate specialists',
      contact: '+91 90828 88912',
      action: 'tel:+919082888912',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp for Quick Response',
      description: 'Get instant property updates and consultation',
      contact: '+91 79-77288350',
      action: 'https://wa.me/917977288350?text=Hi,%20I\'m%20interested%20in%20Mumbai%20property%20consultation.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'Email for Detailed Queries',
      description: 'Send us your property requirements and investment plans',
      contact: 'info@dreamhouseproperties.com',
      action: 'mailto:info@dreamhouseproperties.com',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const officeLocations = [
    {
      name: 'Bandra West Office',
      address: '123 Business Center, Bandra West, Mumbai, Maharashtra 400050',
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      specialization: 'Bandra, Juhu, Khar properties'
    },
    {
      name: 'Powai Branch',
      address: '456 IT Park, Powai, Mumbai, Maharashtra 400076',
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      specialization: 'Powai, Andheri, Vikhroli properties'
    }
  ];

  const services = [
    'Property Buying Consultation',
    'Property Selling Assistance',
    'Investment Advisory',
    'Legal Documentation Support',
    'Home Loan Assistance',
    'Property Valuation',
    'Rental Property Management',
    'Market Analysis Reports'
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
            <span className="text-gray-500" aria-current="page">Contact Us</span>
          </li>
        </ol>
      </nav>

      {/* Contact Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            <span>Contact Mumbai Property Experts</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Get Expert Mumbai
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Estate Consultation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Connect with our experienced property consultants for personalized guidance on buying, selling, 
            or investing in Mumbai's prime locations including Bandra, Juhu, Powai, and Andheri.
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
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600 font-medium">1000+ Happy Clients</span>
            </div>
          </div>

          {/* Quick Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="p-6 text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  <Button asChild className="w-full">
                    <Link href={method.action} target={method.action.startsWith('http') ? '_blank' : undefined}>
                      {method.contact}
                    </Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                Let's Discuss Your Mumbai Property Goals
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're looking to buy your first home, sell an existing property, or invest in Mumbai real estate, 
                our expert team is here to guide you through every step of the process.
              </p>
              
              {/* Office Locations */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mumbai Offices</h3>
                {officeLocations.map((office, index) => (
                  <Card key={index} className="p-6 border-0 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-gray-900">{office.name}</h4>
                        <p className="text-gray-600 mb-2">{office.address}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            {office.timing}
                          </span>
                        </div>
                        <p className="text-blue-600 text-sm font-medium mt-2">
                          Specializes in: {office.specialization}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Services Offered */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mumbai Real Estate Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <Card className="p-6 mt-6 border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-bold text-lg mb-2 text-gray-900">24/7 Property Assistance</h3>
                <p className="text-gray-600 mb-4">
                  Need urgent property consultation or have questions outside business hours? 
                  Our dedicated team is available round the clock.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href="tel:+919082888912" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Emergency Hotline
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                    <Link href="https://wa.me/917977288350?text=Hi,%20I%20need%20urgent%20property%20assistance." target="_blank" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp 24/7
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="p-8 border-0 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us Your Property Requirements</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our Mumbai property experts will get back to you within 24 hours 
                  with personalized recommendations and market insights.
                </p>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Visit Our Mumbai Offices</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Mumbai's prime business districts for easy accessibility. 
              Schedule a visit to discuss your property requirements in person.
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8267739788!2d72.8261!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c6b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1621000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dream House Properties Mumbai Office Locations"
              className="w-full"
            ></iframe>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <Card className="p-8 max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start Your Mumbai Property Journey?</h3>
              <p className="text-gray-600 mb-6">
                Our expert team is waiting to help you find the perfect property in Mumbai's most desirable locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/properties" className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Browse Properties
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:+919082888912" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
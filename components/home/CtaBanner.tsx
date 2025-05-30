import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Phone, MessageCircle, ArrowRight } from "lucide-react";

const CtaBanner = () => {
  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20Mumbai%20property%20consultation.";

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/mumbai-skyline.jpg')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            <span>Ready to Explore Mumbai Properties?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Find Your Dream Home in
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Mumbai's Prime Locations
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed opacity-90">
            From luxury apartments in Bandra West to premium villas in Juhu, discover your perfect property 
            with Mumbai's most trusted real estate experts.
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm opacity-80">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <Link href="/properties" className="inline-flex items-center gap-2">
                <Building2 size={20} />
                Explore Properties
                <ArrowRight size={20} />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300" 
              asChild
            >
              <Link href="tel:+919082888912" className="inline-flex items-center gap-2">
                <Phone size={20} />
                Call Expert Now
              </Link>
            </Button>
          </div>
          
          {/* WhatsApp CTA */}
          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MessageCircle size={18} />
              WhatsApp for Instant Response
            </a>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 text-sm opacity-80">
            <p>✓ RERA Verified Properties  ✓ Expert Legal Assistance  ✓ No Hidden Charges</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
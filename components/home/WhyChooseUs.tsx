import { Check, Shield, Clock, MapPin, Building2, TrendingUp, Users, Award, FileText, Home } from "lucide-react";

const features = [
  {
    icon: <Building2 className="w-10 h-10 text-blue-600" />,
    title: "Prime Mumbai Locations",
    description: "Exclusive properties in Bandra West, Juhu, Powai, Andheri, Lower Parel, and Worli - Mumbai's most sought-after neighborhoods.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "RERA Verified Properties",
    description: "All properties are RERA compliant with verified legal documentation and clear titles for your complete peace of mind.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
    title: "Expert Market Analysis",
    description: "Deep Mumbai real estate insights with accurate pricing, investment potential, and future growth projections.",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-600" />,
    title: "10+ Years Local Expertise",
    description: "Mumbai natives with decade-long experience in the city's real estate market and neighborhood dynamics.",
  },
  {
    icon: <FileText className="w-10 h-10 text-blue-600" />,
    title: "End-to-End Legal Support",
    description: "Complete assistance from property search to registration with expert legal guidance and documentation support.",
  },
  {
    icon: <Home className="w-10 h-10 text-blue-600" />,
    title: "Home Loan Assistance",
    description: "Pre-approved loan options with best interest rates from leading banks and complete financing support.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Why Choose Dream House Properties</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Mumbai's Most Trusted Real Estate Partner
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With 10+ years of experience and 1000+ satisfied families, we're committed to providing 
            exceptional Mumbai real estate services with transparency, expertise, and personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0"
            >
              <div className="mb-6 p-4 bg-blue-50 rounded-2xl inline-block group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Mumbai's Property Investors
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our track record speaks for itself. Join thousands of satisfied customers who chose us for their Mumbai real estate journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Properties Sold</div>
              <div className="text-xs text-blue-600">Across Mumbai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Families</div>
              <div className="text-xs text-blue-600">Dream Homes Found</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">₹100Cr+</div>
              <div className="text-sm text-gray-600 font-medium">Property Value</div>
              <div className="text-xs text-blue-600">Successfully Handled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              <div className="text-xs text-blue-600">Mumbai Market</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/properties" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Explore Mumbai Properties
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl border-2 border-gray-200 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Get Expert Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
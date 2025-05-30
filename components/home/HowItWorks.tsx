import { Search, Calendar, FileText, Key, Building2, Users } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-12 h-12 text-blue-600" />,
    title: "Search & Discover",
    description:
      "Browse our curated Mumbai property listings or tell us your requirements. We'll match you with properties in Bandra, Juhu, Powai, and other prime locations.",
  },
  {
    icon: <Calendar className="w-12 h-12 text-blue-600" />,
    title: "Schedule Site Visits",
    description:
      "Book property visits at your convenience. Our experts will accompany you to provide insights about the neighborhood, amenities, and investment potential.",
  },
  {
    icon: <FileText className="w-12 h-12 text-blue-600" />,
    title: "Legal Documentation",
    description:
      "Complete legal verification, agreement drafting, and documentation with our expert legal team. We ensure RERA compliance and clear property titles.",
  },
  {
    icon: <Key className="w-12 h-12 text-blue-600" />,
    title: "Get Your Dream Home",
    description:
      "Complete the registration process and receive your property keys. We also provide post-purchase support and property management services.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            How We Help You Find Your Dream Home
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined Mumbai real estate process makes property buying simple, transparent, and stress-free. 
            From search to settlement, we guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="bg-gray-50 hover:bg-white p-8 rounded-2xl pt-12 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 group-hover:border group-hover:border-blue-100">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 group-hover:bg-blue-100 rounded-2xl inline-block transition-colors">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10H30M30 10L20 2M30 10L20 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-blue-300"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Expert Guidance Throughout Your Journey
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our experienced Mumbai real estate team provides personalized support at every step. 
                From understanding your requirements to handling complex legal procedures, we ensure a smooth property buying experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Dedicated property consultant assigned</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Regular updates and transparent communication</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Post-purchase support and assistance</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                <div className="text-lg font-medium text-gray-700 mb-2">Successful Transactions</div>
                <div className="text-sm text-gray-600">Families who found their dream homes through our process</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Property Journey?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our Mumbai real estate experts help you find the perfect property. Get started today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/properties" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Property Search
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl border-2 border-gray-200 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
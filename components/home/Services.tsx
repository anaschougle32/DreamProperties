import React from 'react';
import { Building2, Search, FileText, Shield, Home, TrendingUp } from 'lucide-react';

export default function Services() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            <span>Our Premium Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Complete Mumbai Real Estate Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From property search to final documentation, we provide end-to-end real estate services 
            across Mumbai's prime locations with expert guidance and transparent processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Search & Discovery */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Search className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">Property Search & Discovery</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Expert property search across Mumbai's prime locations including Bandra West, Juhu, Powai, 
                and Andheri. We match your requirements with verified properties that fit your budget and preferences.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Curated property listings in prime Mumbai locations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Virtual tours and detailed property analysis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Market comparison and pricing insights
                </div>
              </div>
            </div>
          </div>
          
          {/* Investment Advisory */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <TrendingUp className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">Investment Advisory</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Strategic investment guidance for Mumbai real estate with market analysis, ROI projections, 
                and growth potential assessment. Make informed decisions with our expert insights.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Market trend analysis and future projections
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  ROI calculations and investment strategies
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Portfolio diversification recommendations
                </div>
              </div>
            </div>
          </div>
          
          {/* Legal Documentation */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <FileText className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">Legal Documentation</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete legal assistance for property transactions including title verification, 
                agreement drafting, and registration support. Ensure secure and compliant property deals.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Title verification and due diligence
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Agreement drafting and review
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Registration and stamp duty assistance
                </div>
              </div>
            </div>
          </div>
          
          {/* RERA Compliance */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <Shield className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">RERA Compliance</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                All our properties are RERA verified with complete compliance checks. We ensure 
                transparent transactions with proper approvals and legal clearances for your peace of mind.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  RERA registration verification
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Compliance documentation support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Buyer protection and rights guidance
                </div>
              </div>
            </div>
          </div>
          
          {/* Home Loan Assistance */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Home className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">Home Loan Assistance</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive home loan support with pre-approved options, best interest rates, 
                and documentation assistance. We partner with leading banks for seamless financing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Pre-approved loan options
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Best interest rate negotiations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Complete documentation support
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Management */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <Building2 className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-900">Property Management</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Post-purchase property management services including rental management, maintenance coordination, 
                and tenant screening for investment properties across Mumbai.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Rental property management
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Tenant screening and verification
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Maintenance and repair coordination
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Your Dream Property in Mumbai?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through every step of your Mumbai real estate journey. 
              From search to settlement, we're with you all the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/properties" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Properties
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl border-2 border-gray-200 transition-colors"
              >
                Get Expert Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

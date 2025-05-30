"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What are the best areas to buy property in Mumbai?",
    answer: "The prime areas for property investment in Mumbai include Bandra West (sea views and connectivity), Juhu (beachside luxury), Powai (IT hub with modern infrastructure), Lower Parel (business district), Andheri West (excellent connectivity), and Worli (premium high-rises). Each area offers unique advantages depending on your lifestyle and investment goals."
  },
  {
    question: "How do you ensure all properties are RERA compliant?",
    answer: "We verify every property's RERA registration status, check all legal documents, ensure clear titles, and validate approvals from relevant authorities. Our legal team conducts thorough due diligence to ensure complete compliance with RERA regulations and buyer protection."
  },
  {
    question: "What is the typical price range for properties in Mumbai?",
    answer: "Property prices in Mumbai vary by location: Bandra West (₹3-8 Cr for 2-3 BHK), Juhu (₹4-10 Cr), Powai (₹2-5 Cr), Lower Parel (₹4-12 Cr), Andheri West (₹1.5-4 Cr), and Worli (₹5-15 Cr). Prices depend on factors like floor, view, amenities, and exact location within the area."
  },
  {
    question: "Do you provide home loan assistance?",
    answer: "Yes, we provide comprehensive home loan assistance including pre-approved loan options, best interest rate negotiations, documentation support, and partnerships with leading banks. Our finance team helps you secure the most favorable loan terms for your Mumbai property purchase."
  },
  {
    question: "What legal services do you provide for property transactions?",
    answer: "We offer complete legal support including title verification, due diligence, agreement drafting, stamp duty calculation, registration assistance, and post-purchase documentation. Our legal experts ensure all transactions are compliant and secure."
  },
  {
    question: "How long does the property buying process take in Mumbai?",
    answer: "The typical property buying process takes 30-60 days from offer acceptance to registration. This includes legal verification (7-14 days), loan approval (15-30 days), agreement execution (3-5 days), and final registration (2-3 days). We expedite the process while ensuring all legal requirements are met."
  },
  {
    question: "Do you provide property management services after purchase?",
    answer: "Yes, we offer comprehensive post-purchase services including rental management, tenant screening, maintenance coordination, property valuation updates, and investment advisory for future purchases. Our relationship continues beyond the sale."
  },
  {
    question: "What are the additional costs involved in buying property in Mumbai?",
    answer: "Additional costs include stamp duty (5-6% of property value), registration charges (1%), legal fees (0.5-1%), home loan processing fees (0.5-1%), and brokerage (1-2%). We provide transparent cost breakdowns upfront with no hidden charges."
  },
  {
    question: "Can you help with property investment analysis and ROI projections?",
    answer: "Absolutely! We provide detailed investment analysis including current market rates, rental yield calculations, capital appreciation projections, area development plans, and comparative market analysis. Our investment advisory helps you make informed decisions for maximum returns."
  }
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Mumbai Real Estate FAQs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about buying property in Mumbai, legal processes, 
            investment opportunities, and our comprehensive real estate services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "mb-4 border-0 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg",
                openIndex === index ? "shadow-lg" : ""
              )}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-blue-600">
                  {openIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
              </button>
              <div 
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden bg-white",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our Mumbai real estate experts are here to help. Get personalized answers 
              to your property questions and investment queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Ask Our Experts
              </a>
              <a 
                href="tel:+919082888912" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl border-2 border-gray-200 transition-colors"
              >
                Call +91 90828 88912
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

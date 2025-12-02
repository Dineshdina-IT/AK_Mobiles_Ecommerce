import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the warranty period for phones?',
      answer: 'All phones come with a standard 1-year manufacturer warranty. Extended warranty options are available at checkout.',
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on orders above ₹5,000. For orders below that, shipping charges apply based on your location.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for unopened products and 30-day exchange for defective items. Please contact our support team for assistance.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available in major cities for an additional charge.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 24 hours of placement. After that, you can proceed with return once the product is delivered.',
    },
    {
      question: 'Do you provide EMI options?',
      answer: 'Yes! We offer EMI options through various credit cards and digital payment methods. Check at checkout for available options.',
    },
    {
      question: 'Are the products original?',
      answer: 'Absolutely! All products are 100% original and sourced directly from authorized distributors. We guarantee authenticity.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order in real-time from your dashboard. We send SMS and email updates at each stage of delivery.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Frequently Asked Questions</h1>
          <p className="text-orange-100">Find answers to common questions about AK Mobiles</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden border border-gray-200 hover:border-primary transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
              >
                <h3 className="font-semibold text-left text-gray-800">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-orange-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg p-8 text-center">
          <h2 className="font-montserrat font-bold text-2xl mb-2">Still have questions?</h2>
          <p className="mb-4">Contact our support team for immediate assistance</p>
          <a
            href="https://wa.me/918940457399?text=Hi%20AK%20Mobiles%2C%20I%20have%20a%20query"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

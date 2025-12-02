import React from 'react';
import { Award, Users, Zap, Heart } from 'lucide-react';
import logo from '../assets/logo.jpg'

export const About = () => {
  const values = [
    {
      icon: <Award size={32} className="text-primary" />,
      title: 'Quality',
      description: 'We guarantee 100% authentic products from authorized distributors',
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority with 24/7 support',
    },
    {
      icon: <Zap size={32} className="text-primary" />,
      title: 'Fast Service',
      description: 'Quick delivery and instant customer support responses',
    },
    {
      icon: <Heart size={32} className="text-primary" />,
      title: 'Trust',
      description: 'Transparent pricing and honest product information',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '24/7', label: 'Customer Support' },
    { number: '100%', label: 'Authentic' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">About AK Mobiles</h1>
          <p className="text-orange-100">Your trusted partner for authentic mobile phones and accessories</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-lg transition-all">
              <p className="font-montserrat font-bold text-3xl text-primary mb-2">{stat.number}</p>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="card p-8 mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AK Mobiles was founded with a simple mission: to make authentic mobile phones and accessories accessible to everyone at the best prices. What started as a small venture has grown into one of the most trusted mobile retailers in India.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe in transparency, quality, and customer satisfaction. Every product we sell is 100% authentic and sourced directly from authorized distributors. We don't compromise on quality, and we never will.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we serve thousands of happy customers across India, and we're committed to expanding our reach while maintaining the same level of service and integrity that our customers trust us for.
          </p>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="font-montserrat font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="card p-8 mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-6">Why Choose AK Mobiles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">100% Authentic Products</h3>
                <p className="text-gray-700">All products are sourced from authorized distributors with warranty</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Best Prices Guaranteed</h3>
                <p className="text-gray-700">Competitive pricing with regular discounts and offers</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Fast Delivery</h3>
                <p className="text-gray-700">Quick shipping across India with real-time tracking</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">24/7 Customer Support</h3>
                <p className="text-gray-700">Dedicated support team ready to help anytime</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
                <p className="text-gray-700">7-day return policy with hassle-free process</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                <p className="text-gray-700">Multiple payment options with SSL encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="card p-8 mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-6">Our Team</h2>
          <p className="text-gray-700 mb-6">
            Our team consists of passionate mobile enthusiasts and customer service experts dedicated to providing you with the best experience. We're constantly learning and improving to serve you better.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Muthu Kumar', role: 'Founder & CEO' },
              { name: 'Suresh', role: 'Operations Manager' },
              { name: 'Dinesh', role: 'Customer Support Lead' },
            ].map((member, index) => (
              <div key={index} className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl">
                  {/* {member.name.charAt(0)} */}
                  <img src={logo} alt="" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg p-8 text-center">
          <h2 className="font-montserrat font-bold text-2xl mb-2">Get in Touch</h2>
          <p className="mb-6">Have questions? We'd love to hear from you!</p>
          <div className="space-y-2">
            <p className="text-orange-100">Email: muthuakmobiles@gmail.com</p>
            <p className="text-orange-100">Phone: +91 9500269379</p>
            <p className="text-orange-100">Address: Sivakasi , TamilNadu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

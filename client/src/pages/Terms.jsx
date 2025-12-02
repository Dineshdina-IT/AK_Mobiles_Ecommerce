import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Terms & Conditions</h1>
          <p className="text-orange-100">Please read these terms carefully before using our service</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <FileText size={28} className="text-primary mr-3" />
              <h2 className="font-montserrat font-bold text-2xl">Terms of Service</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to AK Mobiles. These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services. By accessing or using AK Mobiles, you agree to be bound by these Terms.
            </p>
          </div>

          {/* Use License */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">License to Use</h2>
            <p className="text-gray-700 mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and use our website and services for personal, non-commercial purposes.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg space-y-2 text-gray-700">
              <p><strong>You agree not to:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Reproduce or duplicate any content</li>
                <li>Sell, trade, or exploit our services</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Transmit viruses or malicious code</li>
                <li>Engage in any illegal activity</li>
              </ul>
            </div>
          </div>

          {/* Product Information */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Product Information</h2>
            <p className="text-gray-700 mb-4">
              We strive to provide accurate product descriptions and pricing. However:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Product images are for representation purposes</li>
              <li>✓ Specifications may vary slightly from actual products</li>
              <li>✓ Prices are subject to change without notice</li>
              <li>✓ We reserve the right to limit quantities</li>
            </ul>
          </div>

          {/* Ordering & Payment */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Ordering & Payment</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Acceptance</h3>
                <p className="text-gray-700">
                  We reserve the right to refuse or cancel any order. Orders are subject to acceptance and verification.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Payment</h3>
                <p className="text-gray-700">
                  All payments must be made through our secure payment gateway. We accept credit cards, debit cards, and digital wallets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Pricing</h3>
                <p className="text-gray-700">
                  All prices are in Indian Rupees (₹) and include applicable taxes unless otherwise stated.
                </p>
              </div>
            </div>
          </div>

          {/* Return & Refund */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Return & Refund Policy</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">7-Day Return Policy</h3>
                <p>Unopened products can be returned within 7 days of purchase for a full refund.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">30-Day Exchange</h3>
                <p>Defective products can be exchanged within 30 days of purchase.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Refund Process</h3>
                <p>Refunds will be processed within 5-7 business days after we receive and verify the returned item.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                <AlertCircle size={20} className="text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Return shipping costs are the responsibility of the customer unless the product is defective.
                </p>
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Warranty</h2>
            <p className="text-gray-700 mb-4">
              All products come with manufacturer warranty as per the product specifications. Warranty coverage includes:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Manufacturing defects</li>
              <li>✓ Hardware failures</li>
              <li>✓ Battery issues (as per manufacturer terms)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Warranty does not cover: physical damage, water damage, unauthorized repairs, or misuse.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, AK Mobiles shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg text-gray-700">
              <p>
                Our total liability to you for any claim shall not exceed the amount you paid for the product or service in question.
              </p>
            </div>
          </div>

          {/* User Conduct */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">User Conduct</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Post false, misleading, or defamatory content</li>
              <li>✓ Harass or abuse other users</li>
              <li>✓ Violate any applicable laws or regulations</li>
              <li>✓ Infringe on intellectual property rights</li>
              <li>✓ Attempt to disrupt our services</li>
            </ul>
          </div>

          {/* Modifications */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of the modified Terms.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg p-8 text-center">
            <h2 className="font-montserrat font-bold text-2xl mb-2">Questions About Our Terms?</h2>
            <p className="mb-4">Contact our support team</p>
            <p className="text-orange-100">Email: muthuakmobiles@gmail.com</p>
            <p className="text-orange-100">Phone: +91 95002 69379</p>
          </div>
        </div>
      </div>
    </div>
  );
};

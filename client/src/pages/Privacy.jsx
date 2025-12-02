import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Privacy Policy</h1>
          <p className="text-orange-100">Your privacy is important to us</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <Shield size={28} className="text-primary mr-3" />
              <h2 className="font-montserrat font-bold text-2xl">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              AK Mobiles ("we", "us", "our") operates the AK Mobiles website and mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
            </p>
          </div>

          {/* Information Collection */}
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <Eye size={28} className="text-primary mr-3" />
              <h2 className="font-montserrat font-bold text-2xl">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p className="text-gray-700">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Name and email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information</li>
                  <li>Account preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                <p className="text-gray-700">
                  When you access our website or app, we automatically collect certain information:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Device information (type, OS, browser)</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and time spent</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Use of Information */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To process and fulfill your orders</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To send order confirmations and updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To respond to your inquiries and support requests</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To improve our website and services</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To send promotional emails (with your consent)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>To detect and prevent fraud</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="card p-8">
            <div className="flex items-center mb-4">
              <Lock size={28} className="text-primary mr-3" />
              <h2 className="font-montserrat font-bold text-2xl">Data Security</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Security Measures:</strong> SSL encryption, secure payment gateways, regular security audits, and restricted access to personal data.
              </p>
            </div>
          </div>

          {/* Sharing Information */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Sharing Your Information</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information. We may share your information with:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Service providers (payment processors, shipping partners)</li>
              <li>✓ Legal authorities when required by law</li>
              <li>✓ Business partners with your consent</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Access your personal information</li>
              <li>✓ Correct inaccurate data</li>
              <li>✓ Request deletion of your data</li>
              <li>✓ Opt-out of marketing communications</li>
              <li>✓ Data portability</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg p-8 text-center">
            <h2 className="font-montserrat font-bold text-2xl mb-2">Questions About Privacy?</h2>
            <p className="mb-4">Contact our privacy team</p>
            <p className="text-orange-100">Email: muthuakmobiles@gmail.com</p>
            <p className="text-orange-100">Phone: +91 9500269379</p>
          </div>
        </div>
      </div>
    </div>
  );
};

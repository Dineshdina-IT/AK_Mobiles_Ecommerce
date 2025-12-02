import React from 'react';
import { MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">AK Mobiles</h3>
            <p className="text-gray-400 text-sm">Premium mobile phones at the best prices.</p>
          </div>
          <div>
            <h4 className="font-montserrat font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="/shop" className="hover:text-primary transition">Shop</a></li>
              <li><a href="/about" className="hover:text-primary transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/faq" className="hover:text-primary transition">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-primary transition">Shipping</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact Us</a></li>
              <li><a href="/reviews" className="hover:text-primary transition">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary transition">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 AK Mobiles. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/918940457399?text=Hi%20AK%20Mobiles%2C%20I%20have%20a%20query%20regarding%20mobiles."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
};

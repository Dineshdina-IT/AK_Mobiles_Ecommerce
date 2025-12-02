import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/contact', formData);
      setToast({
        message: 'Message sent successfully! We will get back to you soon.',
        type: 'success',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to send message',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Contact Us</h1>
          <p className="text-orange-100">We'd love to hear from you. Get in touch with us today!</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="card p-6 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <Mail size={32} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600 mb-2">muthuakmobiles@gmail.com</p>
            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <Phone size={32} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 mb-2">+91 95002 69379</p>
            <p className="text-sm text-gray-500">Mon - Fri, 9AM - 10PM IST</p>
          </div>

          <div className="card p-6 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <MapPin size={32} className="text-primary" />
            </div>
            <h3 className="font-montserrat font-bold text-lg mb-2">Location</h3>
            <p className="text-gray-600 mb-2">Sivakasi</p>
            <p className="text-sm text-gray-500">We offer delivery services across all of Tamil Nadu.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <h2 className="font-montserrat font-bold text-2xl mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="input-field"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-montserrat font-bold text-lg mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">
                Our support team typically responds to inquiries within 24 hours during business days.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-montserrat font-bold text-lg mb-2">Business Hours</h3>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Monday - Friday:</strong> 9:00 AM - 10:00 PM IST
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Saturday - Sunday:</strong> 10:00 AM - 10:00 PM IST
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-montserrat font-bold text-lg mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Chat with us on WhatsApp for instant support
              </p>
              <a
                href="https://wa.me/918940457399?text=Hi%20AK%20Mobiles%2C%20I%20have%20a%20query"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="card p-6 bg-gradient-to-br from-orange-50 to-accent">
              <h3 className="font-montserrat font-bold text-lg mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-2">
                For detailed inquiries, email us at:
              </p>
              <p className="font-semibold text-primary">muthuakmobiles@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

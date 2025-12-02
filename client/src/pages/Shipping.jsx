import React from 'react';
import { Truck, MapPin, Clock, Shield } from 'lucide-react';

export const Shipping = () => {
  const shippingOptions = [
    {
      icon: <Truck size={32} className="text-primary" />,
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      price: 'Free above ₹5,000 | ₹99 below',
      description: 'Regular delivery to your doorstep with tracking',
    },
    {
      icon: <Clock size={32} className="text-primary" />,
      title: 'Express Delivery',
      time: '1-2 Business Days',
      price: '₹199 (Major Cities)',
      description: 'Fast delivery for urgent orders',
    },
    {
      icon: <MapPin size={32} className="text-primary" />,
      title: 'Same Day Delivery',
      time: 'Same Day',
      price: '₹299 (Selected Areas)',
      description: 'Available in select metro cities',
    },
    {
      icon: <Shield size={32} className="text-primary" />,
      title: 'Insured Shipping',
      time: 'All Orders',
      price: 'Included',
      description: 'Free insurance coverage on all shipments',
    },
  ];

  const shippingCharges = [
    { range: 'Order Value ₹0 - ₹5,000', standard: '₹99', express: '₹199', sameDay: 'N/A' },
    { range: 'Order Value ₹5,001 - ₹10,000', standard: 'FREE', express: '₹199', sameDay: '₹299' },
    { range: 'Order Value ₹10,001+', standard: 'FREE', express: 'FREE', sameDay: '₹299' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Shipping & Delivery</h1>
          <p className="text-orange-100">Fast, reliable, and secure delivery to your doorstep</p>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-montserrat font-bold text-2xl mb-8">Our Shipping Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {shippingOptions.map((option, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-xl transition-all">
              <div className="flex justify-center mb-4">{option.icon}</div>
              <h3 className="font-montserrat font-bold text-lg mb-2">{option.title}</h3>
              <p className="text-primary font-semibold mb-2">{option.time}</p>
              <p className="text-sm text-gray-600 mb-3">{option.price}</p>
              <p className="text-sm text-gray-700">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Shipping Charges Table */}
        <div className="mb-12">
          <h2 className="font-montserrat font-bold text-2xl mb-6">Shipping Charges</h2>
          <div className="overflow-x-auto">
            <table className="w-full card">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Order Value</th>
                  <th className="px-6 py-3 text-left font-semibold">Standard</th>
                  <th className="px-6 py-3 text-left font-semibold">Express</th>
                  <th className="px-6 py-3 text-left font-semibold">Same Day</th>
                </tr>
              </thead>
              <tbody>
                {shippingCharges.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-orange-50">
                    <td className="px-6 py-4 font-semibold">{row.range}</td>
                    <td className="px-6 py-4">{row.standard}</td>
                    <td className="px-6 py-4">{row.express}</td>
                    <td className="px-6 py-4">{row.sameDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="mb-12">
          <h2 className="font-montserrat font-bold text-2xl mb-6">How Our Delivery Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Order Placed', desc: 'Your order is confirmed' },
              { step: '2', title: 'Processing', desc: 'We prepare your package' },
              { step: '3', title: 'Shipped', desc: 'Package on its way to you' },
              { step: '4', title: 'Delivered', desc: 'Receive at your doorstep' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-gradient-to-r from-orange-50 to-accent rounded-lg p-8 mb-12">
          <h2 className="font-montserrat font-bold text-2xl mb-4">Track Your Order</h2>
          <p className="text-gray-700 mb-4">
            Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package in real-time from your dashboard.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Real-time tracking updates</li>
            <li>✓ SMS & Email notifications</li>
            <li>✓ Estimated delivery date</li>
            <li>✓ Delivery partner contact details</li>
          </ul>
        </div>

        {/* Shipping Areas */}
        <div className="card p-8">
          <h2 className="font-montserrat font-bold text-2xl mb-4">Shipping Coverage</h2>
          <p className="text-gray-700 mb-4">We deliver to all major cities and towns across India:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Delhi NCR',
              'Mumbai',
              'Bangalore',
              'Hyderabad',
              'Chennai',
              'Kolkata',
              'Pune',
              'Ahmedabad',
              'Jaipur',
              'Lucknow',
              'Indore',
              'Surat',
            ].map((city, index) => (
              <div key={index} className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span>{city}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            Don't see your city? Contact us at support@akmobiles.com to arrange delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

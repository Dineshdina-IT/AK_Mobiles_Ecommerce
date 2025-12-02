import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="card p-12">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="font-montserrat font-bold text-3xl mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been confirmed.</p>

          {order && (
            <div className="bg-white rounded-lg p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-montserrat font-bold text-lg">{order._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Order Date</p>
                  <p className="font-montserrat font-bold text-lg">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="font-montserrat font-bold text-lg text-primary capitalize">{order.status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Amount</p>
                  <p className="font-montserrat font-bold text-lg">₹{order.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Shipping Address</h3>
                <p className="text-gray-700">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>

              <div className="border-t mt-6 pt-6">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.productName} x {item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Link to="/dashboard" className="btn-primary block">
              View My Orders
            </Link>
            <Link to="/shop" className="btn-outline block">
              Continue Shopping
            </Link>
          </div>

          <p className="text-gray-600 text-sm mt-8">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

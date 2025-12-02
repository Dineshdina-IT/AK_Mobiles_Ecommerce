import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token, updateProfile } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {},
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/user/my-orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address_')) {
      const key = name.replace('address_', '');
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-montserrat font-bold text-3xl mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-montserrat font-bold text-2xl mb-6">My Orders</h2>

                {loading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="card p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-gray-600 text-sm">Order ID</p>
                            <p className="font-semibold">{order._id.slice(-8)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Date</p>
                            <p className="font-semibold">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Status</p>
                            <p className={`font-semibold capitalize ${
                              order.status === 'delivered' ? 'text-green-600' :
                              order.status === 'shipped' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`}>
                              {order.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Total</p>
                            <p className="font-semibold text-primary">₹{order.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-2">Items:</h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-sm text-gray-700">
                                {item.productName} x {item.quantity}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card p-12 text-center">
                    <p className="text-gray-600">No orders yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="font-montserrat font-bold text-2xl mb-6">Profile Settings</h2>

                <form onSubmit={handleUpdateProfile} className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-4">Address</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="address_street"
                      placeholder="Street"
                      value={formData.address.street || ''}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="address_city"
                      placeholder="City"
                      value={formData.address.city || ''}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      name="address_state"
                      placeholder="State"
                      value={formData.address.state || ''}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="address_zipCode"
                      placeholder="Zip Code"
                      value={formData.address.zipCode || ''}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

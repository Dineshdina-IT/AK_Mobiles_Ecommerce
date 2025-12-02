import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, token]);

  const fetchData = async () => {
    try {
      const [statsRes, salesRes] = await Promise.all([
        axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/sales', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setStats(statsRes.data.stats);
      setSalesData(salesRes.data.salesData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const chartData = {
    labels: salesData?.map((d) => d._id) || [],
    datasets: [
      {
        label: 'Sales',
        data: salesData?.map((d) => d.total) || [],
        borderColor: '#F97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-montserrat font-bold text-3xl mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">Total Users</p>
            <p className="font-montserrat font-bold text-3xl text-primary">{stats.totalUsers}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">Total Products</p>
            <p className="font-montserrat font-bold text-3xl text-primary">{stats.totalProducts}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="font-montserrat font-bold text-3xl text-primary">{stats.totalOrders}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">Total Sales</p>
            <p className="font-montserrat font-bold text-3xl text-primary">₹{stats.totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="card p-6 mb-8">
          <h2 className="font-montserrat font-bold text-xl mb-4">Sales Trend</h2>
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-3xl mb-2">📦</p>
            <h3 className="font-semibold text-lg">Manage Products</h3>
            <p className="text-gray-600 text-sm">Add, edit, delete products</p>
          </button>
          <button
            onClick={() => navigate('/admin/categories')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-3xl mb-2">📚</p>
            <h3 className="font-semibold text-lg">Manage Categories</h3>
            <p className="text-gray-600 text-sm">Add, edit, delete categories</p>
          </button>
          <button
            onClick={() => navigate('/admin/orders')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-3xl mb-2">📋</p>
            <h3 className="font-semibold text-lg">Manage Orders</h3>
            <p className="text-gray-600 text-sm">View and update orders</p>
          </button>
          <button
            onClick={() => navigate('/admin/users')}
            className="card p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-3xl mb-2">👥</p>
            <h3 className="font-semibold text-lg">Manage Users</h3>
            <p className="text-gray-600 text-sm">View and manage users</p>
          </button>
        </div>
      </div>
    </div>
  );
};

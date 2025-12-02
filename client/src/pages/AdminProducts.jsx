import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Trash2, Edit2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const AdminProducts = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, token]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories'),
      ]);
      setProducts(productsRes.data.products);
      setCategories(categoriesRes.data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToast({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await axios.post('/api/products', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToast({ message: 'Product added successfully!', type: 'success' });
      }
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: '',
      });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to save product', type: 'error' });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category._id,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      image: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: 'Product deleted successfully!', type: 'success' });
      fetchData();
    } catch (error) {
      setToast({ message: 'Failed to delete product', type: 'error' });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-montserrat font-bold text-3xl">Manage Products</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="font-montserrat font-bold text-xl mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="input-field"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <input
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-outline flex-1"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-semibold">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.category?.name}</td>
                    <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

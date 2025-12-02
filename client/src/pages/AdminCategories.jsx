import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const AdminCategories = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchCategories();
  }, [user, token]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `/api/categories/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setToast({ message: 'Category updated successfully!', type: 'success' });
      } else {
        await axios.post(
          '/api/categories',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setToast({ message: 'Category created successfully!', type: 'success' });
      }
      setFormData({ name: '', description: '', image: '' });
      setEditingId(null);
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      setToast({ message: 'Failed to save category', type: 'error' });
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setEditingId(category._id);
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`/api/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: 'Category deleted successfully!', type: 'success' });
      fetchCategories();
    } catch (error) {
      setToast({ message: 'Failed to delete category', type: 'error' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', image: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-montserrat font-bold text-3xl">Manage Categories</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) handleCancel();
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Category'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="font-montserrat font-bold text-2xl mb-6">
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="e.g., Smartphones"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-field"
                  rows="4"
                  placeholder="Category description"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Category' : 'Create Category'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="card overflow-hidden hover:shadow-xl transition-all">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && !showForm && (
          <div className="card p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No categories found</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Create First Category
            </button>
          </div>
        )}
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

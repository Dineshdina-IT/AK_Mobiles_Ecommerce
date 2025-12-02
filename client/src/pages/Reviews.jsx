import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Star, ThumbsUp, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const Reviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    rating: 5,
    title: '',
    message: '',
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setToast({ message: 'Please login to submit a review', type: 'error' });
      return;
    }

    try {
      await axios.post('/api/reviews', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setToast({ message: 'Review submitted successfully!', type: 'success' });
      setFormData({ productId: '', rating: 5, title: '', message: '' });
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to submit review',
        type: 'error',
      });
    }
  };

  const handleHelpful = async (reviewId) => {
    try {
      await axios.put(`/api/reviews/${reviewId}/helpful`);
      fetchReviews();
    } catch (error) {
      console.error('Error marking as helpful:', error);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading reviews...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Customer Reviews</h1>
          <p className="text-orange-100">See what our customers have to say about our products</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Submit Review Button */}
        {user && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              {showForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>
        )}

        {/* Review Form */}
        {showForm && user && (
          <div className="card p-8 mb-8">
            <h2 className="font-montserrat font-bold text-2xl mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Select Product *</label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Choose a product...</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Review Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Excellent product, highly recommended"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Your Review *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit Review
              </button>
            </form>
          </div>
        )}

        {!user && (
          <div className="card p-6 mb-8 bg-blue-50 border-l-4 border-blue-500">
            <p className="text-blue-800">
              <strong>Want to share your experience?</strong> Please{' '}
              <a href="/login" className="text-primary font-semibold hover:underline">
                login
              </a>
              {' '}to submit a review.
            </p>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="font-montserrat font-bold text-2xl mb-6">
            All Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-gray-600 text-lg">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{review.userName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>

                <h4 className="font-semibold text-lg mb-2">{review.title}</h4>

                <p className="text-gray-700 mb-4">{review.message}</p>

                {review.productId && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <span className="font-semibold">Product:</span>
                    <span>{review.productId.name}</span>
                  </div>
                )}

                <button
                  onClick={() => handleHelpful(review._id)}
                  className="flex items-center gap-2 text-primary hover:text-orange-600 transition"
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Toast } from '../components/Toast';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    // Scroll to top when product page loads
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.product);
      if (response.data.product.variants?.length > 0) {
        setSelectedVariant(response.data.product.variants[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setToast({ message: 'Product not found', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(id, quantity, selectedVariant);
    if (result.success) {
      setToast({ message: 'Added to cart!', type: 'success' });
      setQuantity(1);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      setToast({ message: 'Please login to add a review', type: 'error' });
      return;
    }

    try {
      const response = await axios.post(
        `/api/products/${id}/reviews`,
        { rating: reviewRating, comment: reviewText },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setProduct(response.data.product);
      setReviewText('');
      setReviewRating(5);
      setToast({ message: 'Review added successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to add review', type: 'error' });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const images = [product.image, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
              <img
                src={images[currentImageIndex] || 'https://via.placeholder.com/500x500'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h1 className="font-montserrat font-bold text-3xl mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating || 0) ? 'fill-primary text-primary' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.numReviews || 0} reviews)</span>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-montserrat font-bold text-primary mb-2">₹{product.price.toLocaleString()}</p>
              <p className="text-green-600 font-semibold">In Stock: {product.stock}</p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select Variant:</h3>
                <select
                  value={JSON.stringify(selectedVariant)}
                  onChange={(e) => setSelectedVariant(JSON.parse(e.target.value))}
                  className="input-field w-full"
                >
                  {product.variants.map((variant, idx) => (
                    <option key={idx} value={JSON.stringify(variant)}>
                      {variant.ram} RAM - {variant.storage} Storage - {variant.color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Features */}
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Free Shipping</li>
                <li>✓ 1 Year Warranty</li>
                <li>✓ 30-Day Return Policy</li>
                <li>✓ Authentic Product</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-8">
          <h2 className="font-montserrat font-bold text-2xl mb-6">Reviews</h2>

          {user && (
            <div className="card p-6 mb-8">
              <h3 className="font-semibold mb-4">Add Your Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Comment</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="input-field"
                  rows="4"
                />
              </div>
              <button onClick={handleAddReview} className="btn-primary">
                Submit Review
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{review.userName}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'fill-primary text-primary' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

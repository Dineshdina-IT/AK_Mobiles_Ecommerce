import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import { Toast } from '../components/Toast';
import { CartContext } from '../context/CartContext';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when shop page loads
    window.scrollTo(0, 0);
    fetchProducts();
    fetchCategories();
  }, [filters]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCategoryOpen && !event.target.closest('.category-dropdown')) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoryOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.sort) params.append('sort', filters.sort);

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (newFilters.search) params.append('search', newFilters.search);
    if (newFilters.category) params.append('category', newFilters.category);
    if (newFilters.sort) params.append('sort', newFilters.sort);
    setSearchParams(params);
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1, {});
    if (result.success) {
      setToast({ message: 'Added to cart!', type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-montserrat font-bold text-4xl mb-8">Shop</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4 lg:p-6 sticky top-4 z-5">
              <h3 className="font-montserrat font-bold text-lg mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field text-sm"
                />
              </div>

              {/* Category */}
              <div className="mb-6 relative category-dropdown">
                <label className="block text-sm font-semibold mb-2">Category</label>
                <div className="relative">
                  <div
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="input-field text-sm cursor-pointer flex justify-between items-center"
                    style={{ position: 'relative', zIndex: 20 }}
                  >
                    <span>
                      {filters.category 
                        ? categories.find(cat => cat._id === filters.category)?.name || 'All Categories'
                        : 'All Categories'
                      }
                    </span>
                    <svg 
                      className={`fill-current h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                  
                  {isCategoryOpen && (
                    <div 
                      className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-40 mt-1 custom-scrollbar"
                      style={{ maxHeight: '120px', overflowY: 'auto' }}
                    >
                      <div
                        onClick={() => {
                          handleFilterChange('category', '');
                          setIsCategoryOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        All Categories
                      </div>
                      {categories.map((cat) => (
                        <div
                          key={cat._id}
                          onClick={() => {
                            handleFilterChange('category', cat._id);
                            setIsCategoryOpen(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {cat.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6 relative">
                <label className="block text-sm font-semibold mb-2">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="input-field text-sm relative z-20"
                  style={{ position: 'relative', zIndex: 20 }}
                >
                  <option value="">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card h-64 sm:h-72 lg:h-80 bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base lg:text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

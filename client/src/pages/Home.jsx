import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { ChevronRight, Smartphone, MessageCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { ProductCarousel } from '../components/ProductCarousel';
import { Toast } from '../components/Toast';
import { CartContext } from '../context/CartContext';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products?sort=popularity'),
        axios.get('/api/categories'),
      ]);
      
      const allProducts = productsRes.data.products || [];
      const allCategories = categoriesRes.data.categories || [];

      console.log('=== DEBUG INFO ===');
      console.log('All Products count:', allProducts.length);
      console.log('All Categories count:', allCategories.length);
      
      // Log first product structure
      if (allProducts.length > 0) {
        console.log('First product:', allProducts[0]);
        console.log('First product category field:', allProducts[0].category);
        console.log('First product category type:', typeof allProducts[0].category);
      }
      
      // Log first category structure  
      if (allCategories.length > 0) {
        console.log('First category:', allCategories[0]);
        console.log('First category _id:', allCategories[0]._id);
        console.log('First category _id type:', typeof allCategories[0]._id);
      }

      // ✅ Trending products: first 5 products globally
      setProducts(allProducts.slice(0, 5));
      setCategories(allCategories);

      // ✅ Group products by category - Handle populated category object
      const grouped = {};
      allCategories.forEach((cat) => {
        console.log(`\n=== Matching Category: ${cat.name} ===`);
        
        // Try matching by category object or string
        const categoryProducts = allProducts.filter((p) => {
          // Handle case where category is populated (object)
          if (typeof p.category === 'object' && p.category !== null) {
            console.log(`Product: ${p.name} | Category object: ${p.category.name} | Looking for: "${cat.name}"`);
            
            // Match by category object's _id
            if (p.category._id === cat._id) {
              console.log(`  ✅ Match by category ID!`);
              return true;
            }
            
            // Match by category object's name
            if (p.category.name.toLowerCase() === cat.name.toLowerCase()) {
              console.log(`  ✅ Match by category name!`);
              return true;
            }
          }
          
          // Handle case where category is string (ObjectId or name)
          if (typeof p.category === 'string') {
            console.log(`Product: ${p.name} | Category string: "${p.category}" | Looking for: "${cat.name}"`);
            
            // Match by ObjectId string
            if (p.category === cat._id) {
              console.log(`  ✅ Match by ObjectId string!`);
              return true;
            }
          }
          
          console.log(`  ❌ No match`);
          return false;
        });
        grouped[cat._id] = categoryProducts;
        console.log(`\n📊 Final: Category "${cat.name}" - Products: ${categoryProducts.length}`);
      });
      setProductsByCategory(grouped);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1, {});
    if (result.success) {
      setToast({ message: 'Added to cart!', type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
                Premium Mobile Phones & Gadgets
              </h1>
              <p className="text-lg mb-6 text-orange-100">
                Discover the latest smartphones, laptops, and accessories with exclusive deals and offers.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                Shop Now <ChevronRight size={20} />
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <Smartphone size={300} className="text-white opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <section className="bg-accent py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-secondary font-semibold">
            🎉 <span className="text-primary">Special Offer:</span> Get up to 30% off on selected items + Free Shipping!
          </p>
        </div>
      </section>

      {/* Shop by Category - Horizontal Scrollable */}
      {categories.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
            <h1 className="font-montserrat font-bold text-2xl lg:text-4xl mb-6 lg:mb-8">Shop by Category</h1>
            <CategoryCarousel categories={categories} />
          </div>
        </section>
      )}

      {/* Trending Products */}
      <section className="py-12 bg-accent">
        <div className="max-w-7xl mx-auto px-4">
          <ProductCarousel
            products={products}
            title="Trending Products"
            categoryId={null}
          />
        </div>
      </section>

      {/* Product Rows by Category - Show only 6 specific categories */}
      {categories
        .filter(cat => {
          const names = ['Smart Phones', 'Accessories', 'Laptops', 'Smart Technology', 'Tablets'];
          return names.some(name => cat.name.toLowerCase().includes(name.toLowerCase()));
        })
        .slice(0, 6)
        .map((category) => {
          const catProducts = productsByCategory[category._id] || [];
          console.log(`Rendering ${category.name}: ${catProducts.length} products`);
          
          return (
            <section key={category._id} className="py-12">
              <div className="max-w-7xl mx-auto px-4">
                <ProductCarousel
                  products={catProducts}
                  title={category.name}
                  categoryId={category._id}
                />
              </div>
            </section>
          );
        })}

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders above ₹500</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918940457399?text=Hi%20AK%20Mobiles%2C%20I%20have%20a%20query%20regarding%20mobiles."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-30"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

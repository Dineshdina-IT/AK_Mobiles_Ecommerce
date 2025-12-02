import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export const ProductCarousel = ({ products = [], title, categoryId }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { addToCart } = useContext(CartContext);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const shouldShowLeft = scrollLeft > 0;
      const shouldShowRight = scrollLeft < scrollWidth - clientWidth - 10;
      
      console.log(`Scroll state: scrollLeft=${scrollLeft}, scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
      console.log(`Show left: ${shouldShowLeft}, Show right: ${shouldShowRight}`);
      
      setShowLeftArrow(shouldShowLeft);
      setShowRightArrow(shouldShowRight);
    }
  };

  const scroll = (direction) => {
    console.log(`Scroll ${direction} clicked`);
    if (scrollRef.current) {
      // Responsive scroll amount based on screen size
      const screenWidth = window.innerWidth;
      let scrollAmount = 400;
      
      if (screenWidth <= 640) {
        scrollAmount = 300; // Mobile
      } else if (screenWidth <= 1024) {
        scrollAmount = 350; // Tablet
      }
      
      console.log(`Scrolling by ${direction === 'left' ? -scrollAmount : scrollAmount}px`);
      console.log('Scroll element:', scrollRef.current);
      
      // Try multiple scroll methods
      try {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
        
        // Fallback method
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
          }
        }, 100);
        
        setTimeout(checkScroll, 300);
      } catch (error) {
        console.error('Scroll error:', error);
      }
    } else {
      console.log('scrollRef.current is null');
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const handleAddToCart = async (productId, e) => {
    e.preventDefault();
    await addToCart(productId, 1, {});
  };

  return (
    <div className="py-8">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-montserrat font-bold text-2xl text-secondary">{title}</h3>

        <div className="flex items-center gap-3">
          <Link
            to={`/shop${categoryId ? `?category=${categoryId}` : ''}`}
            className="text-primary font-semibold hover:underline text-sm"
          >
            View All
          </Link>

          {/* Scroll Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="rounded-full p-2 bg-primary text-white hover:bg-orange-600 transition cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="rounded-full p-2 bg-primary text-white hover:bg-orange-600 transition cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- CAROUSEL ---------------- */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 pb-2 scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth',
            width: '100%',
            maxWidth: '100%', // Responsive width
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {/* Show ALL products, display 5 at a time */}
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex-shrink-0 w-48 sm:w-56 group/card"
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
                {/* IMAGE */}
                <div className="relative bg-gray-100 h-48 overflow-hidden">
                  <img
                    src={product.image || 'https://placehold.co/224x192?text=Product'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />

                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-semibold text-sm text-secondary line-clamp-2 mb-2">
                    {product.name}
                  </h4>

                  {/* Specs if exist */}
                  {product.specs && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                      {product.specs}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3 mt-auto">
                    <span className="font-bold text-lg text-primary">
                      ₹{product.price?.toLocaleString()}
                    </span>

                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => handleAddToCart(product._id, e)}
                    className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

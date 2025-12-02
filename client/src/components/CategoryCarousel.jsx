import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CategoryCarousel = ({ categories }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Responsive scroll amount based on screen size
      const screenWidth = window.innerWidth;
      let scrollAmount = 300;
      
      if (screenWidth <= 640) {
        scrollAmount = 250; // Mobile
      } else if (screenWidth <= 1024) {
        scrollAmount = 280; // Tablet
      }
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const getCategoryInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getCategoryColor = (index) => {
    const colors = [
      'bg-orange-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-red-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition -ml-4"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map((category, index) => (
          <Link
            key={category._id}
            to={`/shop?category=${category._id}`}
            className="flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 group/card"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl ${getCategoryColor(
                index
              )} group-hover/card:scale-110 transition-transform`}
            >
              {getCategoryInitial(category.name)}
            </div>
            <p className="text-sm font-semibold text-center mt-3 text-secondary line-clamp-2 px-2">
              {category.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition -mr-4"
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      )}
    </div>
  );
};

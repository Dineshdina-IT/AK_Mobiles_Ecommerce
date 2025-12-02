import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden group">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
            Sale
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-montserrat font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating || 0) ? 'fill-primary text-primary' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-montserrat font-bold text-primary">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Free Shipping</p>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product._id)}
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

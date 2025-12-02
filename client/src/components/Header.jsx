import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logo.jpg';


export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart?.items?.length || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Replace the path below with your actual logo file */}
          <img 
            src={logo} 
            alt="AK Mobiles" 
            className="h-10 w-auto"
            onError={(e) => {
              // Fallback to original logo if image doesn't load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback logo - will show if image doesn't load */}
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center" style={{display: 'none'}}>
            <span className="text-white font-montserrat font-bold text-lg">AK</span>
          </div>
          <span className="font-montserrat font-bold text-xl hidden sm:inline">AK Mobiles</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-secondary hover:text-primary transition text-sm">Home</Link>
          <Link to="/shop" className="text-secondary hover:text-primary transition text-sm">Shop</Link>
          <Link to="/about" className="text-secondary hover:text-primary transition text-sm">About</Link>
          <Link to="/contact" className="text-secondary hover:text-primary transition text-sm">Contact Us</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-secondary hover:text-primary transition text-sm">Admin</Link>
          )}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-accent rounded-lg px-4 py-2 flex-1 max-w-xs mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-accent outline-none text-sm text-secondary flex-1"
          />
          <button type="submit" className="text-secondary hover:text-primary transition">
            <Search size={18} />
          </button>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-secondary hover:text-primary transition">
                <User size={24} />
              </Link>
              <button
                onClick={logout}
                className="text-secondary hover:text-primary transition text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-secondary hover:text-primary transition text-sm font-semibold">
                Login
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/signup" className="text-primary font-semibold text-sm">
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-secondary hover:text-primary transition" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-secondary hover:text-primary transition">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-secondary hover:text-primary transition">Shop</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-secondary hover:text-primary transition">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-secondary hover:text-primary transition">Contact Us</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-secondary hover:text-primary transition">Admin</Link>
          )}
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-300">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white outline-none text-sm text-secondary flex-1"
            />
            <button type="submit" className="text-secondary hover:text-primary transition">
              <Search size={16} />
            </button>
          </form>
        </nav>
      )}
    </header>
  );
};

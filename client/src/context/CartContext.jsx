import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity, variant) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/cart',
        { productId, quantity, variant },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to cart' };
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update cart' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from cart' };
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to clear cart' };
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

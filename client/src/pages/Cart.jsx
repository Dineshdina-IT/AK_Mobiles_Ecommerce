import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { Toast } from '../components/Toast';

export const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);
  const [toast, setToast] = useState(null);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="font-montserrat font-bold text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateCart(itemId, newQuantity);
    if (!result.success) {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const handleRemove = async (itemId) => {
    const result = await removeFromCart(itemId);
    if (result.success) {
      setToast({ message: 'Item removed from cart', type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-montserrat font-bold text-3xl mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="card p-4 flex gap-4">
                  <img
                    src={item.productId?.image || 'https://via.placeholder.com/100x100'}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.productId?.name}</h3>
                    {item.variant && (
                      <p className="text-sm text-gray-600">
                        {item.variant.ram} RAM • {item.variant.storage} Storage • {item.variant.color}
                      </p>
                    )}
                    <p className="text-primary font-bold mt-2">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-montserrat font-bold text-xl mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-montserrat font-bold text-lg">Total</span>
                <span className="font-montserrat font-bold text-2xl text-primary">₹{total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>

              <Link to="/shop" className="btn-outline w-full text-center block mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

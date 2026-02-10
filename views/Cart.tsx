
import React from 'react';
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onUpdateQty, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
           <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 max-w-sm">Looks like you haven't added anything to your cart yet. Go ahead and explore our products!</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
        >
          Explore Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Your Shopping Cart ({cart.length})</h1>
        
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-white border rounded-2xl p-4 flex gap-4 md:gap-6 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.product.vendorName}</span>
                      <h3 className="font-bold text-gray-800 md:text-lg">{item.product.name}</h3>
                    </div>
                    <button 
                      onClick={() => onRemove(item.product.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg bg-gray-50">
                    <button 
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-lg font-black text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 border-t pt-4">
              <span>Tax Estimate</span>
              <span className="font-bold text-gray-900">$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Checkout Now <ArrowRight className="w-5 h-5" />
            </button>
            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                Your payment is held by OmniMarket Escrow. Funds are only released to the vendor 7 days after delivery confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;

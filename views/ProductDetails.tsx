
import React, { useState } from 'react';
import { Star, ShoppingCart, ShieldCheck, ArrowLeft, Store, Package, CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsViewProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product, onAddToCart, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb / Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-[2.5rem] border-2 border-gray-50 overflow-hidden shadow-2xl group relative">
            <img 
              src={product.imageUrls[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-lg">
              {activeImageIndex + 1} / {product.imageUrls.length}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.imageUrls.map((url, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImageIndex(i)}
                className={`aspect-square rounded-[1.5rem] border-2 transition-all overflow-hidden shadow-sm relative group ${
                  activeImageIndex === i ? 'border-blue-500 scale-95 shadow-blue-500/20' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <img src={url} className="w-full h-full object-cover" />
                {activeImageIndex !== i && (
                  <div className="absolute inset-0 bg-white/40 group-hover:opacity-0 transition-opacity"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-blue-600/20">
                 <Store className="w-3 h-3" /> {product.vendorName}
               </span>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">• Verified AI Marketplace Seller</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center text-yellow-500 gap-1.5 font-black text-lg">
                <Star className="w-5 h-5 fill-current" />
                {product.rating}
                <span className="text-gray-400 font-bold text-sm ml-1">({product.reviewsCount} verified reviews)</span>
              </div>
              <div className="flex items-center text-green-600 gap-1.5 text-sm font-black uppercase tracking-widest">
                <Package className="w-4 h-4" /> Stock: {product.stock}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-3">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest line-through decoration-2 decoration-red-400/50">${(product.price * 1.25).toFixed(2)}</span>
            <div className="flex items-center gap-6">
              <span className="text-5xl font-black text-gray-900 tracking-tighter">${product.price.toFixed(2)}</span>
              <span className="bg-red-500 text-white text-xs font-black px-4 py-2 rounded-2xl shadow-lg shadow-red-500/30 animate-pulse uppercase tracking-widest">Limited Offer</span>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Inclusive of all taxes and 2-day priority shipping.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
               <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Description</h3>
               <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-gray-500 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Premium Quality', 'Eco-Packaging', '2Y Warranty', 'AI Inspected'].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border p-4 rounded-2xl text-xs font-black text-gray-700 uppercase tracking-widest shadow-sm">
                <CheckCircle className="w-4 h-4 text-blue-600" /> {feat}
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-grow py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-600/40 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-sm"
            >
              <ShoppingCart className="w-6 h-6" /> Add to Shopping Cart
            </button>
            <button className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[2rem] font-black hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-widest text-sm">
              Wishlist
            </button>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-6 text-white shadow-xl flex items-start gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <ShieldCheck className="w-10 h-10 text-white shrink-0" />
            <div className="relative z-10">
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">OmniMarket Escrow Protected</h4>
              <p className="text-blue-100 text-[10px] leading-relaxed font-medium">Your funds are securely held and only released to the vendor after you confirm product quality. Complete peace of mind for every transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;

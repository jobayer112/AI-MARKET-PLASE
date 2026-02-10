
import React, { useState, useEffect, useMemo } from 'react';
import { Star, ShoppingCart, ChevronRight, ChevronLeft, Zap, Award, Tag } from 'lucide-react';
import { Product } from '../types';

interface CustomerHomeProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onViewCategory: (catId: string) => void;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ products, onAddToCart, onSelectProduct, onViewCategory }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const popularProducts = useMemo(() => products.filter(p => p.rating >= 4.5).slice(0, 4), [products]);

  const categoryNames: Record<string, string> = {
    'c1': 'Smart Electronics', 'c2': 'Fashion & Apparel', 'c3': 'Home Appliances', 'c4': 'Beauty & Care', 
    'c5': 'Sports & Outdoors', 'c6': 'Books & Stationery', 'c7': 'Toys & Games', 'c8': 'Automotive', 
    'c9': 'Garden & Tools', 'c10': 'Health & Wellness', 'c11': 'Pet Supplies', 'c12': 'Musical Instruments',
    'c13': 'Office Supplies', 'c14': 'Jewelry & Watches', 'c15': 'Baby Products', 'c16': 'Gourmet Food',
    'c17': 'Video Games', 'c18': 'Camera & Optics', 'c19': 'Software', 'c20': 'Collectibles',
    'c21': 'Kitchen Dining', 'c22': 'Furniture', 'c23': 'Lighting', 'c24': 'Art Crafts',
    'c25': 'Travel & Luggage', 'c26': 'Smart Home', 'c27': 'Industrial', 'c28': 'Footwear',
    'c29': 'Security', 'c30': 'Eco-friendly'
  };

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const cat = product.categoryId;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  useEffect(() => {
    if (popularProducts.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % popularProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [popularProducts.length]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Banner */}
      <section className="relative min-h-[400px] md:min-h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#020617] text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00AEEF]/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 p-8 lg:p-20 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[#00AEEF] text-xs font-black uppercase tracking-widest w-fit">
               <Award className="w-4 h-4" /> AI Verified Marketplace
            </div>
            <h1 className="text-3xl lg:text-7xl font-black leading-none tracking-tighter">
              Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-cyan-200">
                AI Precision.
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-md font-medium">
              30+ Premium categories curated with intelligence. Secure escrow held payments for maximum trust.
            </p>
            <div className="pt-4">
              <button className="bg-[#00AEEF] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black shadow-xl shadow-[#00AEEF]/20 hover:-translate-y-1 transition-all">
                EXPLORE NOW
              </button>
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex items-center justify-center">
             <div className="w-full max-w-sm bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Trending Choice</h3>
                   <div className="flex gap-2">
                      <button onClick={() => setActiveSlide((prev) => (prev - 1 + popularProducts.length) % popularProducts.length)} className="p-2 border border-white/10 rounded-full hover:bg-white/10"><ChevronLeft className="w-4 h-4"/></button>
                      <button onClick={() => setActiveSlide((prev) => (prev + 1) % popularProducts.length)} className="p-2 border border-white/10 rounded-full hover:bg-white/10"><ChevronRight className="w-4 h-4"/></button>
                   </div>
                </div>
                <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl">
                   {popularProducts.map((p, i) => (
                      <div key={p.id} className={`absolute inset-0 transition-all duration-700 ${i === activeSlide ? 'opacity-100' : 'opacity-0 translate-x-20'}`}>
                         <img src={p.imageUrls[0]} className="w-full h-full object-cover" />
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md">
                            <p className="font-black text-xs md:text-sm truncate">{p.name}</p>
                            <p className="text-[#00AEEF] font-black">${p.price.toFixed(2)}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation Bar - Now scrollable on mobile */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y py-3 px-4 shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto gap-3 no-scrollbar items-center">
           <div className="flex items-center gap-2 px-3 py-2 bg-[#00AEEF] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shrink-0">
             <Tag className="w-4 h-4" /> Quick Access
           </div>
           {Object.entries(categoryNames).map(([id, name]) => (
             <button 
                key={id} 
                onClick={() => scrollToCategory(id)}
                className="px-4 py-2 rounded-xl text-gray-500 hover:text-[#00AEEF] hover:bg-[#00AEEF]/5 transition-all text-[10px] md:text-xs font-black uppercase tracking-wider whitespace-nowrap shrink-0 border border-transparent hover:border-[#00AEEF]/20"
             >
               {name}
             </button>
           ))}
        </div>
      </section>

      {/* Per Category Sections */}
      <div className="space-y-20">
        {(Object.entries(groupedProducts) as [string, Product[]][]).map(([catId, catProducts]) => (
          <section id={`section-${catId}`} key={catId} className="space-y-8 scroll-mt-36">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 md:border-l-8 border-[#00AEEF] pl-4 md:pl-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
                  {categoryNames[catId] || 'Others'}
                </h2>
                <p className="text-[#00AEEF] font-black text-[10px] uppercase tracking-[0.4em]">AI CURATED SELECTION</p>
              </div>
              <button 
                onClick={() => onViewCategory(catId)}
                className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#00AEEF] transition-colors uppercase tracking-[0.2em]"
              >
                View Entire Collection <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {catProducts.slice(0, 4).map(product => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-2xl md:rounded-[2.5rem] border-2 border-gray-100 hover:border-[#00AEEF] hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col p-2 md:p-3"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="relative aspect-square md:h-64 bg-gray-50 rounded-xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-6">
                    <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-[#00AEEF] text-white p-2 md:p-4 rounded-lg md:rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  <div className="px-1 md:px-3 pb-2 md:pb-3 flex-grow flex flex-col space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] md:text-[10px] font-black text-[#00AEEF] bg-[#00AEEF]/5 px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase truncate max-w-[80px]">{product.vendorName}</span>
                       <div className="flex items-center text-yellow-500 gap-0.5 text-[10px] md:text-xs font-black"><Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current"/> {product.rating.toFixed(1)}</div>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm md:text-lg leading-tight group-hover:text-[#00AEEF] transition-colors line-clamp-2">{product.name}</h3>
                    <div className="mt-auto pt-2 md:pt-4 border-t flex items-center justify-between">
                       <span className="text-lg md:text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                       <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;

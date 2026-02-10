
import React, { useMemo } from 'react';
import { ArrowLeft, ShoppingCart, Star, LayoutGrid } from 'lucide-react';
import { Product } from '../types';

interface CategoryCollectionViewProps {
  categoryId: string;
  products: Product[];
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

const CategoryCollectionView: React.FC<CategoryCollectionViewProps> = ({ 
  categoryId, 
  products, 
  onBack, 
  onSelectProduct, 
  onAddToCart 
}) => {
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

  const filteredProducts = useMemo(() => 
    products.filter(p => p.categoryId === categoryId), 
    [products, categoryId]
  );

  const categoryName = categoryNames[categoryId] || 'Collection';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#00AEEF] font-bold text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase italic">
              {categoryName}
            </h1>
            <p className="text-[#00AEEF] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" /> {filteredProducts.length} Products Available
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="group bg-white rounded-2xl md:rounded-[2.5rem] border-2 border-gray-100 hover:border-[#00AEEF] hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col p-2 md:p-3 cursor-pointer"
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

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-4">
           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
             <LayoutGrid className="w-10 h-10" />
           </div>
           <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No Products Found</h3>
           <p className="text-gray-400 text-sm">We couldn't find any products in this category at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryCollectionView;


import React, { useState } from 'react';
import { Plus, Trash2, DollarSign, Users, Package, TrendingUp, X, Image as ImageIcon, FileText, Hash, Tag, PlusCircle, Search, Globe } from 'lucide-react';
import { Product } from '../types';
import { mockCategories } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '', 
    stock: '',
    imageUrls: [''],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (newProduct.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (newProduct.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) newErrors.price = "Enter a valid positive price.";
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) newErrors.stock = "Stock cannot be negative.";
    if (!newProduct.category) newErrors.category = "Please select a product category.";
    
    const validImages = newProduct.imageUrls.filter(url => url.trim() !== '');
    if (validImages.length === 0) {
      newErrors.imageUrls = "At least one image URL is required.";
    } else {
      validImages.forEach((url, index) => {
        try { new URL(url); } catch (_) { 
          newErrors[`imageUrl_${index}`] = "Please enter a valid URL."; 
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const p: Product = {
      id: 'p-' + Date.now(),
      vendorId: 'admin',
      vendorName: 'Global Marketplace',
      categoryId: newProduct.category,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      imageUrls: newProduct.imageUrls.filter(url => url.trim() !== ''),
      rating: 5.0,
      reviewsCount: 0,
      metaTitle: newProduct.metaTitle,
      metaDescription: newProduct.metaDescription,
      metaKeywords: newProduct.metaKeywords
    };
    
    onAddProduct(p);
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      imageUrls: [''],
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ''
    });
    setErrors({});
  };

  const addImageUrlField = () => {
    setNewProduct({ ...newProduct, imageUrls: [...newProduct.imageUrls, ''] });
  };

  const updateImageUrl = (index: number, value: string) => {
    const updatedUrls = [...newProduct.imageUrls];
    updatedUrls[index] = value;
    setNewProduct({ ...newProduct, imageUrls: updatedUrls });
  };

  const removeImageUrl = (index: number) => {
    const updatedUrls = newProduct.imageUrls.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, imageUrls: updatedUrls.length > 0 ? updatedUrls : [''] });
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Control Center</h1>
          <p className="text-gray-500 font-medium">Platform Management Dashboard</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsAddModalOpen(true); }}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-4 rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> NEW PRODUCT
        </button>
      </header>

      {/* KPI Section - Mobile Scrollable */}
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
        {[
          { label: 'Products', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Sellers', value: '142', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Sales', value: '$84k', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Growth', value: '+24%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((stat, i) => (
          <div key={i} className="min-w-[140px] flex-grow bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-gray-900">{stat.value}</h3>
            </div>
            <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}><stat.icon className="w-5 h-5"/></div>
          </div>
        ))}
      </div>

      {/* Product Management Table */}
      <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
           <h2 className="text-lg font-black text-gray-900">Marketplace Inventory</h2>
           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Status</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.slice(0, 10).map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrls[0]} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm truncate max-w-[120px]">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">SKU: {product.id.split('-').pop()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase whitespace-nowrap">
                      {mockCategories.find(c => c.id === product.categoryId)?.name || 'Misc'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900 text-sm">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6 md:mb-8 sticky top-0 bg-white z-10 pb-4">
              <h2 className="text-2xl font-black text-gray-900">Add New Product</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-6">
              {/* Product Info Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Package className="w-3 h-3" /> Product Name
                  </label>
                  <input 
                    type="text" 
                    value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className={`w-full bg-gray-50 border-2 ${errors.name ? 'border-red-500' : 'border-gray-100'} rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all`}
                    placeholder="e.g., iPhone 15 Pro Max"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Detailed Description
                  </label>
                  <textarea 
                    value={newProduct.description} 
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className={`w-full bg-gray-50 border-2 ${errors.description ? 'border-red-500' : 'border-gray-100'} rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium min-h-[80px] transition-all`}
                    placeholder="Tell customers about your product..."
                  />
                  {errors.description && <p className="text-red-500 text-[10px] font-bold">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={newProduct.price} 
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                      placeholder="999.00"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</label>
                    <input 
                      type="number" 
                      value={newProduct.stock} 
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                  <select 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className={`w-full bg-gray-50 border-2 ${errors.category ? 'border-red-500' : 'border-gray-100'} rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all cursor-pointer`}
                  >
                    <option value="" disabled>Select a category</option>
                    {mockCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-[10px] font-bold">{errors.category}</p>}
                </div>
              </div>

              {/* SEO Section - Enhanced */}
              <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 space-y-4">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Search className="w-3 h-3 text-blue-600" /> SEO Optimization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-2.5 h-2.5" /> Meta Title
                    </label>
                    <input 
                      type="text" 
                      value={newProduct.metaTitle} 
                      onChange={e => setNewProduct({...newProduct, metaTitle: e.target.value})}
                      className="w-full bg-white border border-gray-100 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                      placeholder="Catchy Google title..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Keywords</label>
                    <input 
                      type="text" 
                      value={newProduct.metaKeywords} 
                      onChange={e => setNewProduct({...newProduct, metaKeywords: e.target.value})}
                      className="w-full bg-white border border-gray-100 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                      placeholder="electronics, gadget, sale..."
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Description</label>
                  <textarea 
                    value={newProduct.metaDescription} 
                    onChange={e => setNewProduct({...newProduct, metaDescription: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none text-xs min-h-[50px]"
                    placeholder="Summarize for search engine results..."
                  />
                </div>
              </div>

              {/* Image URLs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" /> Images
                  </label>
                  <button 
                    type="button"
                    onClick={addImageUrlField}
                    className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest"
                  >
                    <PlusCircle className="w-3 h-3" /> ADD MORE
                  </button>
                </div>
                
                <div className="space-y-3">
                  {newProduct.imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <input 
                        type="text" 
                        value={url} 
                        onChange={e => updateImageUrl(index, e.target.value)}
                        className={`w-full bg-gray-50 border-2 ${errors[`imageUrl_${index}`] ? 'border-red-500' : 'border-gray-100'} rounded-xl py-3 px-4 pr-10 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm transition-all`}
                        placeholder="Image URL..."
                      />
                      {newProduct.imageUrls.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeImageUrl(index)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
              >
                PUBLISH PRODUCT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

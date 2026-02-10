
import React, { useState, useEffect } from 'react';
import { Star, Lock, ArrowRight, X } from 'lucide-react';
import { Role, User, Product, CartItem } from './types';
import { mockProducts as initialProducts } from './constants';
import Navbar from './components/Navbar';
import CustomerHome from './views/CustomerHome';
import VendorDashboard from './views/VendorDashboard';
import AdminDashboard from './views/AdminDashboard';
import AffiliateDashboard from './views/AffiliateDashboard';
import CartView from './views/Cart';
import LoginView from './views/Login';
import ProductDetailsView from './views/ProductDetails';
import CategoryCollectionView from './views/CategoryCollection';

type ViewState = 'home' | 'cart' | 'dashboard' | 'login' | 'product-details' | 'admin-panel' | 'category-collection';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('omni_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    const savedProducts = localStorage.getItem('omni_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem('omni_products', JSON.stringify(products));
  }, [products]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('omni_user');
    setCurrentView('home');
  };

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput === '9192') {
      setIsAdminModalOpen(false);
      setAdminPassInput('');
      setPassError(false);
      setCurrentView('admin-panel');
    } else {
      setPassError(true);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const renderView = () => {
    if (currentView === 'admin-panel') {
      return (
        <AdminDashboard 
          products={products} 
          onAddProduct={handleAddProduct} 
          onDeleteProduct={handleDeleteProduct} 
        />
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <CustomerHome 
            products={products} 
            onAddToCart={(p) => setCart([...cart, {product: p, quantity: 1}])} 
            onSelectProduct={(p) => { setSelectedProduct(p); setCurrentView('product-details'); }}
            onViewCategory={(catId) => { setSelectedCategoryId(catId); setCurrentView('category-collection'); }}
          />
        );
      case 'category-collection':
        return (
          <CategoryCollectionView 
            categoryId={selectedCategoryId || ''}
            products={products}
            onBack={() => setCurrentView('home')}
            onSelectProduct={(p) => { setSelectedProduct(p); setCurrentView('product-details'); }}
            onAddToCart={(p) => setCart([...cart, {product: p, quantity: 1}])}
          />
        );
      case 'cart':
        return <CartView cart={cart} onUpdateQty={() => {}} onRemove={() => {}} onCheckout={() => {}} />;
      case 'product-details':
        return selectedProduct ? (
          <ProductDetailsView 
            product={selectedProduct} 
            onAddToCart={(p) => setCart([...cart, {product: p, quantity: 1}])} 
            onBack={() => setCurrentView('home')} 
          />
        ) : null;
      case 'login':
        return <LoginView onLogin={(u) => { setCurrentUser(u); setCurrentView('home'); }} setView={setCurrentView} />;
      case 'dashboard':
        if (!currentUser) return <LoginView onLogin={setCurrentUser} setView={setCurrentView} />;
        if (currentUser.role === Role.ADMIN) return <AdminDashboard products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />;
        if (currentUser.role === Role.VENDOR) return <VendorDashboard vendor={currentUser} />;
        if (currentUser.role === Role.AFFILIATE || currentUser.role === Role.RESELLER) return <AffiliateDashboard affiliate={currentUser} />;
        return <div className="p-20 text-center font-bold">User Profile</div>;
      default:
        return <CustomerHome products={products} onAddToCart={() => {}} onSelectProduct={() => {}} onViewCategory={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      <Navbar 
        user={currentUser} 
        cartCount={cart.length}
        onNavigate={(v) => { setCurrentView(v as ViewState); setIsMenuOpen(false); }} 
        onLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="flex-grow container mx-auto px-4 py-4 md:py-10">
        {renderView()}
      </main>

      {/* Even Smaller Star Button for Mobile Responsive Design */}
      <button 
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group border border-white/50"
        aria-label="Admin"
      >
        <Star className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-700 fill-current" />
      </button>

      {/* Admin Password Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900">Admin Key</h2>
              <button onClick={() => setIsAdminModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAdminAccess} className="space-y-6">
              <div className="space-y-2 text-center">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Password</label>
                <input 
                  type="password" 
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  required
                  autoFocus
                  className={`w-full bg-gray-50 border-2 ${passError ? 'border-red-500 animate-shake' : 'border-gray-100'} rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-black text-xl text-center tracking-[0.4em]`}
                  placeholder="••••"
                />
                {passError && <p className="text-red-500 text-[10px] font-bold">Incorrect Key</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Access System <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center space-y-4">
           <div className="inline-flex items-center gap-2 text-blue-600 font-black">
              <Star className="w-4 h-4 fill-current" /> AI MARKETPLACE
           </div>
           <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto">Safe and secure multi-vendor marketplace platform.</p>
           <div className="pt-4 border-t border-gray-100">
             <div className="text-[10px] text-gray-500 font-black tracking-[0.2em] uppercase">
               Developed by MD ZOBAER HASAN
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

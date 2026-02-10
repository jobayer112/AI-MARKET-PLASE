
import React from 'react';
import { ShoppingCart, LayoutDashboard, LogOut, Menu, X, Search, ShoppingBag } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onNavigate: (view: 'home' | 'cart' | 'dashboard' | 'login') => void;
  onLogout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onNavigate, onLogout, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Requested Circular Logo Design */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="relative w-12 h-12 border-4 border-[#00AEEF] rounded-full flex flex-col items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-[6px] font-black text-black leading-none uppercase tracking-tighter">ONLINE</span>
            <span className="text-[6px] font-black text-black leading-none uppercase tracking-tighter">SHOPPING</span>
            <ShoppingBag className="w-5 h-5 text-[#00AEEF] mt-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900 leading-none">AI MARKET</span>
            <span className="text-[10px] font-bold text-[#00AEEF] uppercase tracking-widest leading-none">PLATFORM</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search within 30 premium categories..." 
            className="w-full bg-gray-100 border-none rounded-2xl py-3 px-12 focus:ring-2 focus:ring-[#00AEEF] transition-all outline-none text-sm font-medium"
          />
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            className="relative p-2 text-gray-600 hover:text-[#00AEEF] transition-colors"
            onClick={() => onNavigate('cart')}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00AEEF] text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00AEEF]/10 text-[#00AEEF] rounded-xl hover:bg-[#00AEEF]/20 transition-all font-black text-sm uppercase tracking-wider"
              >
                <LayoutDashboard className="w-4 h-4" />
                {user.role}
              </button>
              <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500"><LogOut className="w-5 h-5" /></button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="px-8 py-3 bg-[#00AEEF] text-white rounded-xl hover:bg-[#0092c7] transition-all font-black text-sm shadow-lg shadow-[#00AEEF]/30"
            >
              SIGN IN
            </button>
          )}
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

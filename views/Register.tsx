
import React, { useState } from 'react';
import { Role, User } from '../types';
import { mockUsers } from '../constants';
import { Mail, User as UserIcon, Lock, ArrowRight, ShieldCheck, CheckCircle, Globe, Wallet } from 'lucide-react';

interface RegisterViewProps {
  role: Role;
  onLogin: (user: User) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ role, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation
    const newUser: User = {
      id: 'u' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: role,
      walletBalance: 0,
      referralCode: (role === Role.AFFILIATE || role === Role.RESELLER) ? 'REF' + Math.random().toString(36).toUpperCase().substr(2, 5) : undefined
    };
    onLogin(newUser);
    localStorage.setItem('omni_user', JSON.stringify(newUser));
  };

  const isVendor = role === Role.VENDOR;
  const isReseller = role === Role.RESELLER || role === Role.AFFILIATE;

  return (
    <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8 order-2 lg:order-1">
        <div className="space-y-4">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            {isVendor ? 'Launch Your Store' : isReseller ? 'Earn as a Reseller' : 'Join as Customer'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Join <span className="text-blue-600">OmniMarket</span> {isVendor ? 'Vendor' : isReseller ? 'Reseller' : ''} Network.
          </h1>
          <p className="text-gray-500 text-lg">
            {isVendor 
              ? 'Thousands of sellers are growing their businesses with our escrow-backed multi-vendor platform.' 
              : isReseller 
              ? 'Earn lifetime commissions on every customer you bring. Sell products without inventory.'
              : 'Discover premium products with AI-powered curation and safe escrow payments.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: ShieldCheck, title: "Secure Escrow", desc: "Payments are guaranteed." },
            { icon: Globe, title: "Global Reach", desc: "Access millions of buyers." },
            { icon: Wallet, title: "Fast Payouts", desc: "Weekly automatic transfers." },
            { icon: CheckCircle, title: "Verified Badges", desc: "Build trust instantly." }
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 bg-white border rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">Create account</h2>
          <p className="text-gray-500 text-sm">Join the AI Market community today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name / Store Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-gray-300 w-5 h-5" />
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border rounded-xl py-3 px-10 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-300 w-5 h-5" />
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 border rounded-xl py-3 px-10 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-300 w-5 h-5" />
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 border rounded-xl py-3 px-10 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              id="agree" 
              required
              checked={formData.agree}
              onChange={(e) => setFormData({...formData, agree: e.target.checked})}
              className="w-4 h-4 rounded text-blue-600" 
            />
            <label htmlFor="agree" className="text-xs text-gray-500 font-medium">
              I agree to the <span className="text-blue-600 font-bold hover:underline">Terms</span> and <span className="text-blue-600 font-bold hover:underline">Market Policy</span>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 border-t pt-6 font-medium">
          Already have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Login</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;

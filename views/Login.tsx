
import React, { useState } from 'react';
import { Role, User } from '../types';
import { mockUsers } from '../constants';
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  setView: (v: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      onLogin(user);
      localStorage.setItem('omni_user', JSON.stringify(user));
    } else {
      setError('Invalid credentials. Please try demo accounts below.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Marketplace Login</h1>
        <p className="text-gray-500">Access your store, reseller dashboard, or orders.</p>
      </div>

      <div className="bg-white border rounded-3xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-300 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border rounded-xl py-3 px-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex justify-between">
              Password
              <span className="text-blue-600 hover:underline cursor-pointer normal-case font-semibold">Forgot?</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-300 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border rounded-xl py-3 px-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p className="text-gray-500 font-medium">Don't have an account?</p>
          <div className="flex gap-4 justify-center mt-2">
            <button className="text-blue-600 font-bold hover:underline">Vendor</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 font-bold hover:underline">Reseller</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 font-bold hover:underline">Customer</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-blue-800 font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Demo Roles
        </h4>
        <div className="grid grid-cols-2 gap-2">
           <button onClick={() => setEmail('admin@omni.com')} className="text-[10px] bg-white p-2 rounded border text-left hover:bg-blue-100 transition-colors">Admin: admin@omni.com</button>
           <button onClick={() => setEmail('vendor@tech.com')} className="text-[10px] bg-white p-2 rounded border text-left hover:bg-blue-100 transition-colors">Vendor: vendor@tech.com</button>
           <button onClick={() => setEmail('john@example.com')} className="text-[10px] bg-white p-2 rounded border text-left hover:bg-blue-100 transition-colors">Customer: john@example.com</button>
           <button onClick={() => setEmail('aff@pro.com')} className="text-[10px] bg-white p-2 rounded border text-left hover:bg-blue-100 transition-colors">Reseller: aff@pro.com</button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;


import React, { useState } from 'react';
import { User } from '../types';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', refCode: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit an API. Here we mock it.
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'নতুন ইউজার',
      email: formData.email,
      points: formData.refCode ? 50 : 0, // Bonus for ref changed from 500 to 50
      referralCode: Math.floor(10000 + Math.random() * 90000).toString(),
      joinedDate: new Date().toLocaleDateString('bn-BD'),
      notificationSettings: {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true
      }
    };
    onAuthSuccess(newUser);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-emerald-600 p-6 flex flex-col justify-center">
      <div className="bg-white rounded-[40px] p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Daily Muslim</h1>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">পূর্ণ নাম</label>
              <input
                required
                type="text"
                placeholder="আপনার নাম লিখুন"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ইমেইল</label>
            <input
              required
              type="email"
              placeholder="example@mail.com"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">পাসওয়ার্ড</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">রেফারেল কোড (ঐচ্ছিক)</label>
              <input
                type="text"
                placeholder="যেমন: ৫৬৮৪৪"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                value={formData.refCode}
                onChange={e => setFormData({ ...formData, refCode: e.target.value })}
              />
            </div>
          )}

          <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98] mt-4">
            {isLogin ? 'লগইন করুন' : 'একাউন্ট খুলুন'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 font-bold hover:text-emerald-600 transition-colors"
          >
            {isLogin ? 'নতুন অ্যাকাউন্ট খুলতে চান? সাইন আপ' : 'আগে থেকেই একাউন্ট আছে? লগইন'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;

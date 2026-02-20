
import React, { useState, useEffect } from 'react';
import { User, AppView, PrayerTimes } from '../types';
import { getDailyInspiration } from '../services/geminiService';
import { Clock, Sun, Moon, MapPin, Gift, CheckCircle, Book, Heart } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (view: AppView) => void;
  prayerTimes: PrayerTimes;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, prayerTimes }) => {
  const [inspiration, setInspiration] = useState(() => {
    // Immediate load from cache if available
    const cached = localStorage.getItem('ni_daily_inspiration_cache');
    if (cached) {
      try {
        return JSON.parse(cached).text;
      } catch (e) {
        return "লোড হচ্ছে...";
      }
    }
    return "লোড হচ্ছে...";
  });

  useEffect(() => {
    // Only fetch if we don't have a valid inspiration or it's old
    getDailyInspiration().then(setInspiration);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-emerald-100 text-sm">আসসালামু আলাইকুম,</p>
            <h2 className="text-2xl font-bold">{user.name}</h2>
          </div>
          <button onClick={() => onNavigate('store')} className="bg-amber-400 text-slate-900 px-4 py-2 rounded-2xl flex items-center space-x-2 font-bold text-sm shadow-md hover:scale-105 transition-transform">
            <Gift size={16} />
            <span>উপহার নিন</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none">
          <Moon size={100} className="text-emerald-500 rotate-12" />
        </div>
        <div className="z-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">রমজান মোবারক</p>
          <h3 className="text-lg font-bold">আজকের সাহরী ও ইফতার</h3>
          <div className="mt-4 flex space-x-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 uppercase">সাহরী শেষ</p>
              <p className="text-xl font-black text-amber-400">{prayerTimes.sahari}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-400 uppercase">ইফতার সময়</p>
              <p className="text-xl font-black text-emerald-400">{prayerTimes.iftar}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onNavigate('tasks')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center space-y-2 hover:bg-emerald-50 transition-colors">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600"><CheckCircle size={24} /></div>
          <span className="font-bold text-slate-700">ডেইলি টাস্ক</span>
        </button>
        <button onClick={() => onNavigate('quran')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center space-y-2 hover:bg-amber-50 transition-colors">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600"><Book size={24} /></div>
          <span className="font-bold text-slate-700">কুরআন ও গজল</span>
        </button>
        <button onClick={() => onNavigate('duas')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center space-y-2 hover:bg-blue-50 transition-colors col-span-2">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><Heart size={24} /></div>
          <span className="font-bold text-slate-700">প্রয়োজনীয় দোয়া সমূহ</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2 mb-3">
          <Sun size={14} className="text-amber-500" /> আজকের অনুপ্রেরণা
        </h4>
        <p className="text-slate-700 leading-relaxed italic font-medium">"{inspiration}"</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-emerald-600" /> সালাত এর সময়সূচী
          </h4>
          <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12} /> ঢাকা, বাংলাদেশ</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(prayerTimes).slice(0, 5).map(([name, time]) => (
            <div key={name} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-slate-50 shadow-sm">
              <span className="capitalize text-slate-500 font-medium text-sm">{name}</span>
              <span className="font-bold text-slate-800">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

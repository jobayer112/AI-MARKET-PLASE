
import React, { useState, useRef } from 'react';
import { User as UserType } from '../types';
import { LogOut, Copy, Share2, Award, Calendar, Users, Camera, Bell, BellOff, Edit2, Save, X, Upload } from 'lucide-react';

interface ProfileViewProps {
  user: UserType;
  setUser: (user: UserType) => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const referralLink = `https://dailymuslim.app/ref/${user.referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('সফলভাবে কপি করা হয়েছে!');
  };

  const toggleNotification = (prayer: keyof typeof user.notificationSettings) => {
    setUser({
      ...user,
      notificationSettings: {
        ...user.notificationSettings,
        [prayer]: !user.notificationSettings[prayer]
      }
    });
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: tempName });
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex flex-col items-center py-6 bg-white rounded-[40px] shadow-sm border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-emerald-600/5"></div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          capture="user" 
          className="hidden" 
        />

        <div className="relative mb-4 group cursor-pointer" onClick={triggerUpload}>
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-emerald-600 flex items-center justify-center text-white relative">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black">{user.name[0].toUpperCase()}</span>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
               <Upload size={20} className="text-white" />
            </div>
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-emerald-600 p-2 rounded-full text-white border-2 border-white shadow-lg hover:scale-110 transition-all"
          >
            <Camera size={14} />
          </button>
        </div>

        {isEditing ? (
          <div className="flex flex-col items-center space-y-3 w-full px-8">
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              className="w-full bg-slate-50 border-2 border-emerald-100 rounded-2xl py-3 px-4 text-center font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <div className="flex gap-2 w-full">
              <button 
                onClick={handleSaveProfile}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Save size={18} /> সেভ
              </button>
              <button 
                onClick={() => { setIsEditing(false); setTempName(user.name); }}
                className="bg-slate-100 text-slate-500 p-3 rounded-2xl"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center group">
            <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              {user.name}
              <button onClick={() => setIsEditing(true)} className="text-slate-300 hover:text-emerald-600 transition-colors">
                <Edit2 size={16} />
              </button>
            </h2>
            <p className="text-slate-500 text-sm font-medium">{user.email}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Bell size={18} className="text-emerald-600" /> সালাত নোটিফিকেশন সেটিংস
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(user.notificationSettings).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="capitalize text-sm font-bold text-slate-700">{key}</span>
              <button 
                onClick={() => toggleNotification(key as any)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}
              >
                {enabled ? <Bell size={14} /> : <BellOff size={14} />}
                {enabled ? 'অন' : 'অফ'}
              </button>
            </div>
          ))}
          <p className="text-[10px] text-slate-400 mt-2 italic">* সালাতের ৫ মিনিট আগে আপনাকে জানানো হবে।</p>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-5 -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-700">
          <Users size={160} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">বন্ধুদের রেফার করুন</h3>
          </div>
          
          <p className="text-slate-400 text-xs mb-6 leading-relaxed">
            আপনার ইউনিক রেফারেল কোড ব্যবহার করে বন্ধুদের ইনভাইট করুন। বন্ধু সাইন আপ করলেই আপনি পাবেন <span className="text-emerald-400 font-bold">৫০ পয়েন্ট</span> বোনাস!
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-500 ml-1">আপনার কোড</p>
              <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700 group/item">
                <span className="text-emerald-400 font-mono text-lg tracking-widest font-bold">{user.referralCode}</span>
                <button 
                  onClick={() => copyToClipboard(user.referralCode)} 
                  className="text-slate-500 hover:text-white p-2 hover:bg-slate-700 rounded-xl transition-all"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-500 ml-1">শেয়ারিং লিঙ্ক</p>
              <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-between border border-slate-700 border-dashed">
                <span className="text-slate-400 font-medium text-xs truncate max-w-[200px]">{referralLink}</span>
                <button 
                  onClick={() => copyToClipboard(referralLink)}
                  className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onLogout} 
        className="w-full bg-rose-50 text-rose-600 py-5 rounded-[30px] font-black flex items-center justify-center space-x-3 hover:bg-rose-100 transition-all active:scale-[0.98] border border-rose-100"
      >
        <LogOut size={20} />
        <span>লগ আউট করুন</span>
      </button>
    </div>
  );
};

export default ProfileView;

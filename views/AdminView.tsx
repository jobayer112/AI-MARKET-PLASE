
import React, { useState } from 'react';
import { 
  Lock, LogOut, LayoutDashboard, ShieldCheck, 
  Clock, Globe, Users, Trash2, Plus, 
  CheckCircle, Gift, Heart, Music, Save, User as UserIcon, ExternalLink
} from 'lucide-react';
import { PrayerTimes, AdTask, User, DhikrTask, RewardItem, Dua, Gojol } from '../types';

interface AdminViewProps {
  onExit: () => void;
  prayerTimes: PrayerTimes;
  setPrayerTimes: (times: PrayerTimes) => void;
  ads: AdTask[];
  setAds: (ads: AdTask[]) => void;
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
  tasks: DhikrTask[];
  setTasks: (tasks: DhikrTask[]) => void;
  rewards: RewardItem[];
  setRewards: (rewards: RewardItem[]) => void;
  duas: Dua[];
  setDuas: (duas: Dua[]) => void;
  gojols: Gojol[];
  setGojols: (gojols: Gojol[]) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
  onExit, prayerTimes, setPrayerTimes, ads, setAds, allUsers, setAllUsers, 
  tasks, setTasks, rewards, setRewards, duas, setDuas, gojols, setGojols
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'prayer' | 'tasks' | 'rewards' | 'duas' | 'gojols' | 'ads'>('stats');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Local Form States for adding new items
  const [tempPrayer, setTempPrayer] = useState<PrayerTimes>(prayerTimes);
  const [newAd, setNewAd] = useState({ url: '', rewardPoints: 2 });
  const [newDua, setNewDua] = useState({ title: '', arabic: '', pronunciation: '', meaning: '' });
  const [newGojol, setNewGojol] = useState({ title: '', lyrics: '' });
  const [newTask, setNewTask] = useState({ title: '', arabic: '', target: 100, points: 10 });
  const [newReward, setNewReward] = useState({ name: '', pointsRequired: 5000, image: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'zobaerhasan431@gmail.com' && password === '1q2w3e4r5t') setIsLoggedIn(true);
    else setError('ভুল ইমেইল অথবা পাসওয়ার্ড!');
  };

  const deleteItem = (id: string, type: 'dua' | 'gojol' | 'task' | 'reward' | 'ad' | 'user') => {
    if (!confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
    if (type === 'dua') setDuas(duas.filter(i => i.id !== id));
    if (type === 'gojol') setGojols(gojols.filter(i => i.id !== id));
    if (type === 'task') setTasks(tasks.filter(i => i.id !== id));
    if (type === 'reward') setRewards(rewards.filter(i => i.id !== id));
    if (type === 'ad') setAds(ads.filter(i => i.id !== id));
    if (type === 'user') setAllUsers(allUsers.filter(i => i.id !== id));
  };

  const addItem = (type: 'dua' | 'gojol' | 'task' | 'reward' | 'ad') => {
    const id = Date.now().toString();
    if (type === 'dua') setDuas([...duas, { ...newDua, id }]);
    if (type === 'gojol') setGojols([...gojols, { ...newGojol, id }]);
    if (type === 'task') setTasks([...tasks, { ...newTask, id, count: 0, completed: false }]);
    if (type === 'reward') setRewards([...rewards, { ...newReward, id }]);
    if (type === 'ad') setAds([...ads, { ...newAd, id, visited: false }]);
    
    // Clear forms
    setNewDua({ title: '', arabic: '', pronunciation: '', meaning: '' });
    setNewGojol({ title: '', lyrics: '' });
    setNewTask({ title: '', arabic: '', target: 100, points: 10 });
    setNewReward({ name: '', pointsRequired: 5000, image: '' });
    setNewAd({ url: '', rewardPoints: 2 });
    
    alert('সফলভাবে যোগ করা হয়েছে!');
  };

  if (!isLoggedIn) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-8 animate-in zoom-in">
      <div className="bg-slate-900 w-20 h-20 rounded-3xl flex items-center justify-center text-amber-400 shadow-2xl animate-pulse"><ShieldCheck size={40} /></div>
      <div className="w-full bg-white p-8 rounded-[40px] shadow-xl border">
        <h2 className="text-2xl font-black text-center mb-6">এডমিন প্যানেল</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input required type="email" placeholder="ইমেইল" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" value={email} onChange={e => setEmail(e.target.value)} />
          <input required type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-600 transition-all">লগইন করুন</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border shadow-sm">
        <h2 className="text-lg font-black flex items-center gap-2"><LayoutDashboard className="text-emerald-500" size={20} /> এডমিন ড্যাশবোর্ড</h2>
        <button onClick={onExit} className="text-slate-400 hover:text-red-500 p-2 transition-colors"><LogOut size={20} /></button>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar shadow-inner">
        {[
          { id: 'stats', label: 'ওভারভিউ', icon: ShieldCheck },
          { id: 'users', label: 'ইউজার', icon: Users },
          { id: 'prayer', label: 'সালাত', icon: Clock },
          { id: 'tasks', label: 'টাস্ক', icon: CheckCircle },
          { id: 'rewards', label: 'গিফট', icon: Gift },
          { id: 'duas', label: 'দোয়া', icon: Heart },
          { id: 'gojols', label: 'গজল', icon: Music },
          { id: 'ads', label: 'ভিজিট', icon: Globe }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex-none px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon size={14} />
            <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border shadow-sm text-center">
              <p className="text-3xl font-black text-emerald-600">{allUsers.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">মোট ইউজার</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border shadow-sm text-center">
              <p className="text-3xl font-black text-blue-600">{duas.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">মোট দোয়া</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border shadow-sm text-center">
              <p className="text-3xl font-black text-rose-600">{gojols.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">মোট গজল</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border shadow-sm text-center">
              <p className="text-3xl font-black text-amber-600">{tasks.length}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">জিকির টাস্ক</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 ml-2">ইউজার লিস্ট ({allUsers.length})</h3>
            {allUsers.map(u => (
              <div key={u.id} className="bg-white p-4 rounded-3xl border shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold uppercase">{u.name[0]}</div>
                  <div>
                    <p className="font-bold text-sm">{u.name}</p>
                    <p className="text-[10px] text-slate-400">{u.points} ★ পয়েন্ট</p>
                  </div>
                </div>
                <button onClick={() => deleteItem(u.id, 'user')} className="p-2 text-red-100 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prayer' && (
          <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 text-lg">সালাতের সময়সূচী পরিবর্তন</h3>
            <div className="space-y-4">
              {Object.entries(tempPrayer).map(([name, time]) => (
                <div key={name} className="flex items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="capitalize text-xs font-black text-slate-500 w-20">{name}</span>
                  <input className="flex-grow p-2 bg-white rounded-xl text-sm font-bold text-right outline-none focus:ring-2 focus:ring-emerald-500" value={time} onChange={e => setTempPrayer({...tempPrayer, [name]: e.target.value})} />
                </div>
              ))}
            </div>
            <button onClick={() => { setPrayerTimes(tempPrayer); alert('সাফল্যজনকভাবে আপডেট হয়েছে!'); }} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2">
              <Save size={20} /> আপডেট করুন
            </button>
          </div>
        )}

        {activeTab === 'duas' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[30px] border shadow-sm space-y-4">
              <h3 className="font-black text-emerald-600">নতুন দোয়া যুক্ত করুন</h3>
              <input placeholder="দোয়ার নাম" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={newDua.title} onChange={e => setNewDua({...newDua, title: e.target.value})} />
              <textarea placeholder="আরবি লেখা" className="w-full p-4 bg-slate-50 rounded-2xl outline-none arabic text-right" value={newDua.arabic} onChange={e => setNewDua({...newDua, arabic: e.target.value})} />
              <input placeholder="উচ্চারণ" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={newDua.pronunciation} onChange={e => setNewDua({...newDua, pronunciation: e.target.value})} />
              <textarea placeholder="বাংলা অর্থ" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={newDua.meaning} onChange={e => setNewDua({...newDua, meaning: e.target.value})} />
              <button onClick={() => addItem('dua')} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2"><Plus size={20}/> যোগ করুন</button>
            </div>
            <div className="space-y-2">
              {duas.map(d => (
                <div key={d.id} className="bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between group">
                  <span className="font-bold text-sm text-slate-700">{d.title}</span>
                  <button onClick={() => deleteItem(d.id, 'dua')} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gojols' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[30px] border shadow-sm space-y-4">
              <h3 className="font-black text-rose-600">নতুন গজল যুক্ত করুন</h3>
              <input placeholder="গজলের শিরোনাম" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={newGojol.title} onChange={e => setNewGojol({...newGojol, title: e.target.value})} />
              <textarea placeholder="লিরিক্স (লিরিক্স সব গুলো লিখে দিন)" rows={6} className="w-full p-4 bg-slate-50 rounded-2xl outline-none leading-relaxed" value={newGojol.lyrics} onChange={e => setNewGojol({...newGojol, lyrics: e.target.value})} />
              <button onClick={() => addItem('gojol')} className="w-full bg-rose-600 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2"><Plus size={20}/> যোগ করুন</button>
            </div>
            <div className="space-y-2">
              {gojols.map(g => (
                <div key={g.id} className="bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between group">
                  <span className="font-bold text-sm text-slate-700">{g.title}</span>
                  <button onClick={() => deleteItem(g.id, 'gojol')} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[30px] border shadow-sm space-y-4">
              <h3 className="font-black text-amber-600">নতুন জিকির টাস্ক</h3>
              <input placeholder="টাস্ক নাম (যেমন: ১০০ বার সুবহানআল্লাহ)" className="w-full p-4 bg-slate-50 rounded-2xl" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
              <input placeholder="আরবি লেখা" className="w-full p-4 bg-slate-50 rounded-2xl arabic text-right" value={newTask.arabic} onChange={e => setNewTask({...newTask, arabic: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="লক্ষ্য (Target)" className="p-4 bg-slate-50 rounded-2xl" value={newTask.target} onChange={e => setNewTask({...newTask, target: parseInt(e.target.value)})} />
                <input type="number" placeholder="পয়েন্ট" className="p-4 bg-slate-50 rounded-2xl" value={newTask.points} onChange={e => setNewTask({...newTask, points: parseInt(e.target.value)})} />
              </div>
              <button onClick={() => addItem('task')} className="w-full bg-amber-500 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2"><Plus size={20}/> টাস্ক যোগ করুন</button>
            </div>
            <div className="space-y-2">
              {tasks.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-2xl border flex justify-between group">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t.title}</span>
                    <span className="text-[10px] text-slate-400">{t.target} বার | {t.points} পয়েন্ট</span>
                  </div>
                  <button onClick={() => deleteItem(t.id, 'task')} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[30px] border shadow-sm space-y-4">
              <h3 className="font-black text-emerald-600">নতুন গিফট আইটেম</h3>
              <input placeholder="পণ্যের নাম" className="w-full p-4 bg-slate-50 rounded-2xl" value={newReward.name} onChange={e => setNewReward({...newReward, name: e.target.value})} />
              <input placeholder="পয়েন্ট প্রয়োজন" type="number" className="w-full p-4 bg-slate-50 rounded-2xl" value={newReward.pointsRequired} onChange={e => setNewReward({...newReward, pointsRequired: parseInt(e.target.value)})} />
              <input placeholder="ছবির ইউআরএল (ঐচ্ছিক)" className="w-full p-4 bg-slate-50 rounded-2xl" value={newReward.image} onChange={e => setNewReward({...newReward, image: e.target.value})} />
              <button onClick={() => addItem('reward')} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2"><Plus size={20}/> গিফট যোগ করুন</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {rewards.map(r => (
                <div key={r.id} className="bg-white p-3 rounded-2xl border shadow-sm relative group">
                  <button onClick={() => deleteItem(r.id, 'reward')} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12}/></button>
                  <img src={r.image || 'https://via.placeholder.com/150'} className="w-full h-20 object-cover rounded-xl mb-2" />
                  <p className="font-bold text-[10px] text-slate-700 truncate">{r.name}</p>
                  <p className="text-[9px] text-amber-600 font-black">{r.pointsRequired} ★</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[30px] border shadow-sm space-y-4">
              <h3 className="font-black text-sky-600">নতুন অ্যাড লিংক</h3>
              <input placeholder="ওয়েবসাইট ইউআরএল (https://...)" className="w-full p-4 bg-slate-50 rounded-2xl" value={newAd.url} onChange={e => setNewAd({...newAd, url: e.target.value})} />
              <input type="number" placeholder="রিওয়ার্ড পয়েন্ট" className="w-full p-4 bg-slate-50 rounded-2xl" value={newAd.rewardPoints} onChange={e => setNewAd({...newAd, rewardPoints: parseInt(e.target.value)})} />
              <button onClick={() => addItem('ad')} className="w-full bg-sky-600 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2"><Plus size={20}/> অ্যাড যোগ করুন</button>
            </div>
            <div className="space-y-2">
              {ads.map((a, idx) => (
                <div key={a.id} className="bg-white p-4 rounded-2xl border flex items-center justify-between group">
                  <div className="flex flex-col max-w-[70%]">
                    <span className="text-xs font-bold text-slate-700 truncate">Link #{idx + 1}: {a.url}</span>
                    <span className="text-[9px] text-sky-500 font-black uppercase">{a.rewardPoints} পয়েন্ট</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={a.url} target="_blank" className="p-2 text-slate-300 hover:text-sky-500"><ExternalLink size={16}/></a>
                    <button onClick={() => deleteItem(a.id, 'ad')} className="p-2 text-red-100 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;

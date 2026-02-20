
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView, User, DhikrTask, AdTask, PrayerTimes, Dua, Gojol, RewardItem } from './types';
import { INITIAL_DHIKR_TASKS, INITIAL_PRAYER_TIMES, REWARDS } from './constants';
import Dashboard from './views/Dashboard';
import TasksView from './views/TasksView';
import RewardsView from './views/RewardsView';
import ProfileView from './views/ProfileView';
import AuthView from './views/AuthView';
import QuranHadithView from './views/QuranHadithView';
import AdsView from './views/AdsView';
import DonateView from './views/DonateView';
import AdminView from './views/AdminView';
import DuaView from './views/DuaView';
import Notification from './components/Notification';
import Onboarding from './components/Onboarding';
import { 
  Home, 
  CheckCircle, 
  Book, 
  Gift, 
  User as UserIcon, 
  Bell, 
  Heart,
  Globe,
  Settings
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [tasks, setTasks] = useState<DhikrTask[]>([]);
  const [ads, setAds] = useState<AdTask[]>([]);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [gojols, setGojols] = useState<Gojol[]>([]);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(INITIAL_PRAYER_TIMES);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const notifiedRefs = useRef<Record<string, boolean>>({});

  useEffect(() => {
    // Load User
    const savedUser = localStorage.getItem('ni_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Load All Users
    const savedUsers = localStorage.getItem('ni_all_users');
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    // Load Prayer Times
    const savedPrayerTimes = localStorage.getItem('ni_prayer_times');
    if (savedPrayerTimes) setPrayerTimes(JSON.parse(savedPrayerTimes));

    // Load Tasks
    const savedTasks = localStorage.getItem('ni_tasks');
    setTasks(savedTasks ? JSON.parse(savedTasks) : INITIAL_DHIKR_TASKS);

    // Load Rewards
    const savedRewards = localStorage.getItem('ni_rewards');
    setRewards(savedRewards ? JSON.parse(savedRewards) : REWARDS);

    // Load Duas
    const savedDuas = localStorage.getItem('ni_duas');
    if (savedDuas) {
      setDuas(JSON.parse(savedDuas));
    } else {
      const initialDuas: Dua[] = [
        { id: 'd1', title: 'ঘুমানোর দোয়া', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', pronunciation: 'বিসমিকাল্লাহুম্মা আমুতু ওয়া আহ্ইয়া', meaning: 'হে আল্লাহ! আপনারই নামে আমি মৃত্যুবরণ করি (ঘুমাই) এবং আপনারই নামে জীবিত হই (জাগি)।' },
        { id: 'd2', title: 'ঘুম থেকে জাগার দোয়া', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', pronunciation: 'আলহামদুলিল্লাহিল্লাজি আহ্ইয়ানা বা’দা মা আমাতানা ওয়া ইলাইহিন নুশুর', meaning: 'সমস্ত প্রশংসা সেই আল্লাহর জন্য, যিনি আমাদের মারার পর জীবিত করলেন। আর তাঁর দিকেই সকলের প্রত্যাবর্তন।' }
      ];
      setDuas(initialDuas);
      localStorage.setItem('ni_duas', JSON.stringify(initialDuas));
    }

    // Load Gojols
    const savedGojols = localStorage.getItem('ni_gojols');
    if (savedGojols) {
      setGojols(JSON.parse(savedGojols));
    } else {
      const initialGojols: Gojol[] = [
        { id: 'g1', title: 'আল্লাহু আল্লাহু', lyrics: 'আল্লাহু আল্লাহু তুমি জাল্লে জালালুহু\nশেষ করা তো যায় না গেয়ে তোমার গুনগান।\n\nতুমি কাদের তুমি গাফফার তুমি রহিম তুমি রহমান\nতোমার নূরের জ্যুতি দিয়ে গড়া এই আসমান।' },
        { id: 'g2', title: 'সালাত ও সালাম', lyrics: 'ইয়া নবী সালাম আলাইকা\nইয়া রাসুল সালাম আলাইকা\nইয়া হাবিব সালাম আলাইকা\nসালাওয়াতুল্লাহ আলাইকা।' }
      ];
      setGojols(initialGojols);
      localStorage.setItem('ni_gojols', JSON.stringify(initialGojols));
    }

    // Load Ads
    const savedAds = localStorage.getItem('ni_ads');
    if (savedAds) {
      setAds(JSON.parse(savedAds));
    } else {
      const initialAds: AdTask[] = Array.from({ length: 20 }).map((_, i) => ({
        id: `ad-${i}`,
        url: `https://google.com/search?q=islamic+site+${i}`,
        rewardPoints: 2,
        visited: false
      }));
      setAds(initialAds);
    }

    const hasSeenOnboarding = localStorage.getItem('ni_onboarding_seen');
    if (!hasSeenOnboarding && savedUser) setShowOnboarding(true);
  }, []);

  // Prayer notification check
  useEffect(() => {
    const checkPrayers = () => {
      if (!user) return;
      const now = new Date();
      const currentDay = now.toDateString();

      Object.entries(prayerTimes).forEach(([name, timeStr]) => {
        if (!['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(name)) return;
        if (!user.notificationSettings[name as keyof typeof user.notificationSettings]) return;

        try {
          const [time, modifier] = timeStr.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (modifier === 'PM' && hours < 12) hours += 12;
          if (modifier === 'AM' && hours === 12) hours = 0;

          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0, 0);

          const notifyTime = new Date(prayerDate.getTime() - 5 * 60000);
          
          const key = `${currentDay}-${name}`;
          if (now >= notifyTime && now < prayerDate && !notifiedRefs.current[key]) {
            setNotificationMsg(`${name.charAt(0).toUpperCase() + name.slice(1)} সালাতের ৫ মিনিট বাকি।`);
            setShowNotification(true);
            playSound('alarm');
            notifiedRefs.current[key] = true;
          }
        } catch (e) {
          console.error("Error parsing prayer time", e);
        }
      });
    };

    const interval = setInterval(checkPrayers, 30000);
    return () => clearInterval(interval);
  }, [user, prayerTimes]);

  const playSound = (type: 'taskDone' | 'allDone' | 'alarm') => {
    const urls = {
      taskDone: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
      allDone: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
      alarm: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.5;
    audio.play().catch((e) => console.log('Audio play blocked', e));
  };

  useEffect(() => {
    if (user) localStorage.setItem('ni_user', JSON.stringify(user));
  }, [user]);

  const handleIncrementDhikr = (id: string) => {
    setTasks(prev => {
      let taskJustFinished = false;
      let finishedTaskTitle = '';
      const updatedTasks = prev.map(t => {
        if (t.id === id && !t.completed) {
          const newCount = t.count + 1;
          if (newCount === t.target) {
            taskJustFinished = true;
            finishedTaskTitle = t.title;
            return { ...t, count: newCount, completed: true };
          }
          return { ...t, count: newCount };
        }
        return t;
      });
      if (taskJustFinished) {
        playSound(updatedTasks.every(t => t.completed) ? 'allDone' : 'taskDone');
        setNotificationMsg(`${finishedTaskTitle} সম্পন্ন! +১০ পয়েন্ট`);
        setShowNotification(true);
        if (user) setUser({ ...user, points: user.points + 10 });
        localStorage.setItem('ni_tasks', JSON.stringify(updatedTasks));
      }
      return updatedTasks;
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard user={user!} onNavigate={setCurrentView} prayerTimes={prayerTimes} />;
      case 'tasks': return <TasksView tasks={tasks} onIncrement={handleIncrementDhikr} />;
      case 'quran': return <QuranHadithView gojols={gojols} />;
      case 'duas': return <DuaView duas={duas} />;
      case 'store': return <RewardsView userPoints={user!.points} rewards={rewards} />;
      case 'ads': return <AdsView ads={ads} onVisit={(id) => {
        setAds(prev => prev.map(a => a.id === id && !a.visited ? (setUser({ ...user!, points: user!.points + a.rewardPoints }), { ...a, visited: true }) : a));
      }} onAdminTrigger={() => setCurrentView('admin')} />;
      case 'profile': return <ProfileView user={user!} setUser={setUser} onLogout={() => { localStorage.removeItem('ni_user'); setUser(null); }} />;
      case 'donate': return <DonateView />;
      case 'admin': return <AdminView 
        onExit={() => setCurrentView('home')} 
        prayerTimes={prayerTimes} 
        setPrayerTimes={(t) => { setPrayerTimes(t); localStorage.setItem('ni_prayer_times', JSON.stringify(t)); }} 
        ads={ads} setAds={(a) => { setAds(a); localStorage.setItem('ni_ads', JSON.stringify(a)); }}
        allUsers={users} setAllUsers={(u) => { setUsers(u); localStorage.setItem('ni_all_users', JSON.stringify(u)); }}
        tasks={tasks} setTasks={(t) => { setTasks(t); localStorage.setItem('ni_tasks', JSON.stringify(t)); }}
        rewards={rewards} setRewards={(r) => { setRewards(r); localStorage.setItem('ni_rewards', JSON.stringify(r)); }}
        duas={duas} setDuas={(d) => { setDuas(d); localStorage.setItem('ni_duas', JSON.stringify(d)); }}
        gojols={gojols} setGojols={(g) => { setGojols(g); localStorage.setItem('ni_gojols', JSON.stringify(g)); }}
      />;
      default: return <Dashboard user={user!} onNavigate={setCurrentView} prayerTimes={prayerTimes} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 relative overflow-x-hidden">
      <header className="bg-emerald-600 text-white p-6 rounded-b-[40px] shadow-lg sticky top-0 z-40 flex justify-between items-center">
        <div><h1 className="text-xl font-black">Daily Muslim</h1><p className="text-xs opacity-80">ঈমানের পথে নতুন যাত্রা</p></div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('donate')} className="bg-rose-500 hover:bg-rose-400 px-4 py-2 rounded-2xl transition-all flex items-center gap-2 border border-white/20 shadow-lg group active:scale-95">
            <Heart size={16} className="text-white fill-white group-hover:scale-125 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-wider text-white">দান করুন</span>
          </button>
          <div className="bg-white/20 px-3 py-1 rounded-full flex items-center space-x-2"><span className="text-amber-300 text-lg">★</span><span className="font-bold text-sm">{user?.points || 0}</span></div>
        </div>
      </header>
      <main className="px-5 py-6">{user ? renderView() : <AuthView onAuthSuccess={setUser} />}</main>
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 flex justify-around items-center h-20 px-4 rounded-t-3xl shadow-2xl z-50">
        {[ { id: 'home', icon: Home, label: 'হোম' }, { id: 'tasks', icon: CheckCircle, label: 'টাস্ক' }, { id: 'quran', icon: Book, label: 'কুরআন' }, { id: 'ads', icon: Globe, label: 'ভিজিট' }, { id: 'profile', icon: UserIcon, label: 'প্রোফাইল' } ].map(item => (
          <button key={item.id} onClick={() => setCurrentView(item.id as AppView)} className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 w-16 h-16 rounded-2xl ${currentView === item.id ? 'bg-emerald-600 text-white shadow-lg -translate-y-2' : 'text-slate-400'}`}>
            <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
      <Notification isVisible={showNotification} message={notificationMsg} onClose={() => setShowNotification(false)} />
      {showOnboarding && <Onboarding onComplete={() => { setShowOnboarding(false); localStorage.setItem('ni_onboarding_seen', 'true'); }} />}
    </div>
  );
};

export default App;

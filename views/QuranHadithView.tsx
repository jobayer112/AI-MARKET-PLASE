
import React, { useState } from 'react';
import { getSurahDetails, getHadithDetails } from '../services/geminiService';
import { Gojol } from '../types';
import { Search, Loader2, ChevronLeft, BookOpen, ScrollText, Quote, Music } from 'lucide-react';

interface QuranHadithViewProps {
  gojols: Gojol[];
}

const QuranHadithView: React.FC<QuranHadithViewProps> = ({ gojols }) => {
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith' | 'gojol'>('quran');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<{name: string, index: number} | null>(null);
  const [selectedHadithCategory, setSelectedHadithCategory] = useState<string | null>(null);
  const [selectedGojol, setSelectedGojol] = useState<Gojol | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const surahs = [ "Al-Fatiha", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas" ];
  const hadithCategories = [ "ঈমান", "সালাত", "যাকাত", "সাওম", "হজ্জ", "আখলাক", "বিবাহ", "জিহাদ", "রিযিক", "কিয়ামত", "জান্নাত", "জাহান্নাম", "পিতা-মাতা", "সবর", "তাকওয়া" ];

  const filteredSurahs = surahs.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredHadith = hadithCategories.filter(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredGojols = gojols.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelectSurah = async (name: string, index: number) => {
    setSelectedSurah({name, index: index + 1});
    setLoading(true);
    const data = await getSurahDetails(name);
    setResult(data);
    setLoading(false);
  };

  const handleSelectHadith = async (category: string) => {
    setSelectedHadithCategory(category);
    setLoading(true);
    const data = await getHadithDetails(category);
    setResult(data);
    setLoading(false);
  };

  const resetSelection = () => {
    setSelectedSurah(null);
    setSelectedHadithCategory(null);
    setSelectedGojol(null);
    setResult(null);
  };

  if (selectedSurah || selectedHadithCategory || selectedGojol) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Full Screen Detail Header */}
        <div className="bg-emerald-600 text-white p-6 shadow-lg flex items-center gap-4">
          <button onClick={resetSelection} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-black truncate">{selectedSurah?.name || selectedHadithCategory || selectedGojol?.title}</h2>
            <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
              {selectedSurah ? `পবিত্র কুরআন (${selectedSurah.index})` : selectedHadithCategory ? 'আল-হাদীস' : 'ইসলামিক গজল'}
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl">
             {selectedSurah ? <ScrollText size={20} /> : selectedHadithCategory ? <Quote size={20} /> : <Music size={20} />}
          </div>
        </div>

        {/* Full Page Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 leading-relaxed custom-scroll">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="animate-spin text-emerald-600" size={40} />
              <p className="text-slate-400 font-bold italic text-sm">তথ্য লোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="prose prose-emerald max-w-none">
                {(result || selectedGojol?.lyrics || "তথ্য পাওয়া যায়নি।").split('\n').map((line, i) => {
                  const isArabic = /[\u0600-\u06FF]/.test(line);
                  return (
                    <p 
                      key={i} 
                      className={`${isArabic 
                        ? 'arabic text-right text-3xl md:text-4xl text-emerald-900 leading-[2] mt-6 mb-4 bg-emerald-50/50 p-4 rounded-2xl' 
                        : 'text-slate-800 text-base md:text-lg leading-relaxed mb-4 font-medium'}`}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="text-emerald-600" size={24} />
          কুরআন ও গজল
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('quran')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'quran' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            পবিত্র কুরআন
          </button>
          <button 
            onClick={() => setActiveTab('hadith')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'hadith' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            আল-হাদীস
          </button>
          <button 
            onClick={() => setActiveTab('gojol')}
            className={`flex-none px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${activeTab === 'gojol' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            ইসলামিক গজল
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="খুঁজুন..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-6 pr-14 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-medium text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-3 text-slate-300">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* List items with '10x2' thin style */}
      <div className="grid grid-cols-1 gap-1 px-1">
        {activeTab === 'quran' && filteredSurahs.map((s, idx) => (
          <button
            key={s}
            onClick={() => handleSelectSurah(s, surahs.indexOf(s))}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-emerald-50 rounded-md flex items-center justify-center text-emerald-600 font-black text-[8px] group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {surahs.indexOf(s) + 1}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{s}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-emerald-500 transition-colors" size={12} />
          </button>
        ))}

        {activeTab === 'hadith' && filteredHadith.map((h, idx) => (
          <button
            key={h}
            onClick={() => handleSelectHadith(h)}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-amber-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-amber-50 rounded-md flex items-center justify-center text-amber-600 font-black text-[8px] group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Quote size={10} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{h}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-amber-500 transition-colors" size={12} />
          </button>
        ))}

        {activeTab === 'gojol' && filteredGojols.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => setSelectedGojol(g)}
            className="group bg-white py-1.5 px-4 rounded-xl border border-slate-50 shadow-sm hover:border-rose-500 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 bg-rose-50 rounded-md flex items-center justify-center text-rose-600 font-black text-[8px] group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Music size={10} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-[11px] leading-none">{g.title}</p>
              </div>
            </div>
            <ChevronLeft className="text-slate-200 rotate-180 group-hover:text-rose-500 transition-colors" size={12} />
          </button>
        ))}

        {(activeTab === 'quran' ? filteredSurahs : activeTab === 'hadith' ? filteredHadith : filteredGojols).length === 0 && (
          <div className="text-center py-10 text-slate-400 text-[10px] font-bold italic">কোনো ফলাফল পাওয়া যায়নি।</div>
        )}
      </div>
    </div>
  );
};

export default QuranHadithView;

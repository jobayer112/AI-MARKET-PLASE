
import React from 'react';
import { Dua } from '../types';
import { Heart, ChevronLeft } from 'lucide-react';

interface DuaViewProps {
  duas: Dua[];
}

const DuaView: React.FC<DuaViewProps> = ({ duas }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
        <Heart className="text-rose-500 fill-rose-500" size={24} />
        প্রয়োজনীয় দোয়া সমূহ
      </h2>
      
      <div className="space-y-4">
        {duas.map((dua) => (
          <div key={dua.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-emerald-600 border-b pb-2">{dua.title}</h3>
            <p className="arabic text-2xl font-bold text-right text-slate-800 leading-[1.8]">{dua.arabic}</p>
            <div className="space-y-2 pt-2">
              <p className="text-sm font-bold text-slate-700">উচ্চারণ: <span className="font-medium text-slate-600">{dua.pronunciation}</span></p>
              <p className="text-sm font-bold text-slate-700">অর্থ: <span className="font-medium text-slate-600 italic">"{dua.meaning}"</span></p>
            </div>
          </div>
        ))}
        {duas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200 text-slate-400">
            কোনো দোয়া যুক্ত করা হয়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default DuaView;

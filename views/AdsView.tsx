
import React from 'react';
import { AdTask } from '../types';
import { ExternalLink, Globe, Lock } from 'lucide-react';

interface AdsViewProps {
  ads: AdTask[];
  onVisit: (id: string) => void;
  onAdminTrigger: () => void;
}

const AdsView: React.FC<AdsViewProps> = ({ ads, onVisit, onAdminTrigger }) => {
  const visibleAds = ads.filter(a => !a.visited).slice(0, 15);

  return (
    <div className="space-y-6">
      <div className="bg-sky-50 p-6 rounded-[40px] border border-sky-100 flex items-center space-x-4">
        <div className="bg-sky-500 p-3 rounded-2xl text-white">
          <Globe size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">অ্যাড ভিজিট করুন</h3>
          <p className="text-xs text-slate-500">প্রতিটি ভিজিটে পাবেন ২ পয়েন্ট</p>
        </div>
      </div>

      <div className="space-y-3">
        {visibleAds.map((ad, idx) => {
          const isSecretButton = idx + 1 === 10;
          return (
            <div key={ad.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-between group hover:border-emerald-100 transition-all">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => isSecretButton && onAdminTrigger()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${isSecretButton ? 'bg-amber-100 text-amber-600 hover:bg-slate-900 hover:text-white cursor-help' : 'bg-slate-50 text-slate-400'}`}
                >
                  {idx + 1}
                </button>
                <div className="text-left">
                  <span className="text-sm font-bold text-slate-700 block">ওয়েবসাইট ভিজিট #{idx + 1}</span>
                  {isSecretButton && <span className="text-[9px] text-amber-500 font-bold uppercase">Secret Admin Entry</span>}
                </div>
              </div>
              <button
                onClick={() => {
                  window.open(ad.url, '_blank');
                  onVisit(ad.id);
                }}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 hover:bg-slate-900 transition-all shadow-md active:scale-95"
              >
                <span>ভিজিট</span>
                <ExternalLink size={14} />
              </button>
            </div>
          );
        })}
        
        {visibleAds.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">সব অ্যাড ভিজিট করা হয়েছে! কাল আবার আসুন।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsView;

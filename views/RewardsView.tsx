
import React from 'react';
import { RewardItem } from '../types';

interface RewardsViewProps {
  userPoints: number;
  rewards: RewardItem[];
}

const RewardsView: React.FC<RewardsViewProps> = ({ userPoints, rewards }) => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-2 border-dashed border-amber-300 p-6 rounded-3xl text-center">
        <p className="text-slate-600 text-sm font-medium mb-1">আপনার বর্তমান পয়েন্ট</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-4xl font-black text-slate-900">{userPoints}</span>
          <span className="text-amber-500 text-2xl">★</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800">পয়েন্ট দিয়ে গিফট নিন</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {rewards.map((item) => {
          const canAfford = userPoints >= item.pointsRequired;
          return (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
              <img src={item.image || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop'} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-slate-800 text-sm mb-2 leading-tight">{item.name}</h3>
                <div className="mt-auto flex flex-col space-y-3">
                  <div className="flex items-center space-x-1 text-amber-600 font-bold text-xs">
                    <span>{item.pointsRequired} পয়েন্ট</span>
                  </div>
                  <button 
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-xl text-[10px] font-black transition-colors ${canAfford ? 'bg-slate-900 text-white hover:bg-emerald-600' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    {canAfford ? 'অর্ডার দিন' : 'আরও পয়েন্ট চাই'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {rewards.length === 0 && <div className="col-span-2 text-center py-20 text-slate-400">কোনো গিফট আইটেম নেই।</div>}
      </div>
    </div>
  );
};

export default RewardsView;

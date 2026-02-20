
import React from 'react';
import { DhikrTask } from '../types';

interface DhikrCardProps {
  task: DhikrTask;
  onIncrement: (id: string) => void;
}

const DhikrCard: React.FC<DhikrCardProps> = ({ task, onIncrement }) => {
  const progress = (task.count / task.target) * 100;

  const playTick = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {}); // Catch browser policy errors
  };

  const handleClick = () => {
    if (!task.completed) {
      playTick();
      onIncrement(task.id);
    }
  };

  return (
    <div 
      className={`p-5 rounded-3xl transition-all duration-300 transform active:scale-95 cursor-pointer flex flex-col items-center space-y-4 shadow-lg border-2 ${task.completed ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-transparent'}`}
      onClick={handleClick}
    >
      
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-800">{task.title}</h3>
        <p className="arabic text-2xl font-bold text-emerald-700 mt-1">{task.arabic}</p>
      </div>

      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={351.8}
            strokeDashoffset={351.8 - (351.8 * progress) / 100}
            strokeLinecap="round"
            className={`${task.completed ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-300`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-800">{task.count}</span>
          <span className="text-xs text-slate-400 font-medium">/ {task.target}</span>
        </div>
      </div>

      {task.completed ? (
        <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1 animate-pulse">
          <span>✓</span> <span>সম্পন্ন +১০ পয়েন্ট</span>
        </div>
      ) : (
        <button className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-colors">
          গণনা করুন
        </button>
      )}
    </div>
  );
};

export default DhikrCard;


import React, { useState } from 'react';
import { Home, CheckCircle, BookOpen, Gift, Globe, ChevronRight, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Daily Muslim-এ স্বাগতম!",
      desc: "ঈমানের পথে আপনার আধ্যাত্মিক যাত্রাকে আরও সহজ করতে আমরা এই অ্যাপটি তৈরি করেছি। চলুন এক নজরে দেখে নেই এর ফিচারগুলো।",
      icon: <div className="bg-emerald-100 p-6 rounded-full text-emerald-600 mb-6"><Home size={48} /></div>,
      color: "emerald"
    },
    {
      title: "প্রতিদিনের জিকির",
      desc: "১০০ বার দরুদ, সুবহানআল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার এবং আসতাগফিরুল্লাহ পড়ার ডেইলি টাস্ক। প্রতিটি টাস্ক সম্পূর্ণ করলে পাবেন ১০ পয়েন্ট!",
      icon: <div className="bg-amber-100 p-6 rounded-full text-amber-600 mb-6"><CheckCircle size={48} /></div>,
      color: "amber"
    },
    {
      title: "পবিত্র কুরআন ও হাদীস",
      desc: "সূরার তিলাওয়াত শুনুন এবং অর্থ পড়ুন। সাথে রয়েছে জেমিনাই এআই চালিত বিস্তারিত ব্যাখ্যা এবং গুরুত্ব।",
      icon: <div className="bg-blue-100 p-6 rounded-full text-blue-600 mb-6"><BookOpen size={48} /></div>,
      color: "blue"
    },
    {
      title: "পয়েন্ট ও উপহার",
      desc: "জিকির করে এবং ওয়েবসাইট ভিজিট করে পয়েন্ট অর্জন করুন। এই পয়েন্ট দিয়ে টুপি, পাঞ্জাবি এবং কুরআন শরীফ অর্ডার দিন একদম বিনামূল্যে!",
      icon: <div className="bg-rose-100 p-6 rounded-full text-rose-600 mb-6"><Gift size={48} /></div>,
      color: "rose"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
        <button 
          onClick={onComplete}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
        >
          <X size={24} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          {steps[step].icon}
          
          <h2 className="text-2xl font-black text-slate-900 mb-4">{steps[step].title}</h2>
          <p className="text-slate-500 leading-relaxed font-medium mb-10">
            {steps[step].desc}
          </p>

          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-100'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextStep}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200"
          >
            {step === steps.length - 1 ? "শুরু করুন" : "পরবর্তী"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

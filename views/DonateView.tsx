
import React from 'react';
import { PAYMENT_NUMBERS } from '../constants';
import { Copy, Heart, Info } from 'lucide-react';

const DonateView: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('নম্বরটি কপি করা হয়েছে। এবার আপনার পেমেন্ট অ্যাপ থেকে সেন্ট মানি করুন।');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 rounded-[40px] text-white shadow-xl text-center">
        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart size={32} fill="white" />
        </div>
        <h2 className="text-2xl font-black mb-2">আল্লাহর পথে দান করুন</h2>
        <p className="text-rose-100 text-sm opacity-90 leading-relaxed">
          আপনার সামান্য দান আমাদের এই প্রজেক্টটি আরও বড় করতে সাহায্য করবে। মিনিমাম ১০ টাকা থেকে দান শুরু করতে পারেন।
        </p>
      </div>

      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Info size={18} className="text-emerald-600" />
          পেমেন্ট গেটওয়ে
        </h3>

        <div className="space-y-4">
          {/* Bkash */}
          <div className="bg-pink-50 p-5 rounded-3xl flex justify-between items-center border border-pink-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white font-black">
                b
              </div>
              <div>
                <p className="text-pink-600 font-black text-lg">বিকাশ</p>
                <p className="text-slate-600 font-mono text-sm">{PAYMENT_NUMBERS.bkash}</p>
              </div>
            </div>
            <button onClick={() => copyToClipboard(PAYMENT_NUMBERS.bkash)} className="bg-pink-600 text-white p-3 rounded-2xl shadow-lg shadow-pink-200">
              <Copy size={20} />
            </button>
          </div>

          {/* Nagad */}
          <div className="bg-orange-50 p-5 rounded-3xl flex justify-between items-center border border-orange-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black">
                n
              </div>
              <div>
                <p className="text-orange-600 font-black text-lg">নগদ</p>
                <p className="text-slate-600 font-mono text-sm">{PAYMENT_NUMBERS.nagad}</p>
              </div>
            </div>
            <button onClick={() => copyToClipboard(PAYMENT_NUMBERS.nagad)} className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-200">
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
          <p className="text-[10px] text-amber-700 font-bold uppercase mb-1">নির্দেশনা:</p>
          <p className="text-xs text-amber-800 leading-relaxed">
            ১. নম্বর কপি বাটনে ক্লিক করুন।<br/>
            ২. আপনার পেমেন্ট অ্যাপে যান।<br/>
            ৩. সেন্ট মানি অপশন সিলেক্ট করুন।<br/>
            ৪. নম্বরটি পেস্ট করে পেমেন্ট করুন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateView;


import React from 'react';
import { Users, TrendingUp, DollarSign, ExternalLink, Copy, Check } from 'lucide-react';
import { User } from '../types';

interface AffiliateDashboardProps {
  affiliate: User;
}

const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ affiliate }) => {
  const [copied, setCopied] = React.useState(false);
  const referralLink = `https://omnimarket.io/register?ref=${affiliate.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-900">Partner Hub</h1>
        <p className="text-gray-500">Earn lifetime commissions on every referral.</p>
      </header>

      {/* Referral Link Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold opacity-80 mb-4">Your Referral Link</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl flex-grow font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {referralLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Link'}
            </button>
          </div>
          <p className="mt-4 text-xs opacity-70 italic text-center sm:text-left">* Every user that joins through this link becomes your lifetime sub-user.</p>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Referrals</p>
          <h2 className="text-3xl font-black">124</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border text-center space-y-2">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Conversion Rate</p>
          <h2 className="text-3xl font-black">8.4%</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border text-center space-y-2">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lifetime Earnings</p>
          <h2 className="text-3xl font-black">${affiliate.walletBalance.toFixed(2)}</h2>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">Latest Commissions</h2>
          <button className="text-sm font-bold text-blue-600 hover:underline">Download Statement</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500">Date</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500">User</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500">Action</th>
                <th className="px-6 py-4 text-right font-bold text-gray-500">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { date: 'Oct 24, 2023', user: 'Mark R.', action: 'Order #8821', amount: '$12.00' },
                { date: 'Oct 23, 2023', user: 'Sarah L.', action: 'Registration', amount: '$0.00' },
                { date: 'Oct 22, 2023', user: 'David W.', action: 'Order #8815', amount: '$4.50' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 font-bold">{row.user}</td>
                  <td className="px-6 py-4 text-gray-500">{row.action}</td>
                  <td className="px-6 py-4 text-right font-black text-blue-600">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;

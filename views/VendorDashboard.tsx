
import React from 'react';
import { 
  Package, 
  ShoppingBag, 
  Wallet, 
  TrendingUp, 
  Plus, 
  Settings, 
  AlertTriangle 
} from 'lucide-react';
import { User } from '../types';

interface VendorDashboardProps {
  vendor: User;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ vendor }) => {
  const isSubExpired = false; // Mock subscription status check

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500">Manage your store, orders and payouts</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Store Settings
          </button>
          <button 
            disabled={isSubExpired}
            className={`px-6 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all ${isSubExpired ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </header>

      {isSubExpired && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-4">
          <AlertTriangle className="text-red-500 w-6 h-6" />
          <div>
            <h4 className="text-red-800 font-bold">Subscription Expired</h4>
            <p className="text-red-700 text-sm">Your premium selling plan has expired. Renew to continue listing new products.</p>
          </div>
          <button className="ml-auto bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold">Renew Now</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Available Balance</p>
            <Wallet className="text-blue-500 w-6 h-6" />
          </div>
          <h2 className="text-4xl font-black text-gray-900">${vendor.walletBalance.toFixed(2)}</h2>
          <button className="mt-6 w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors">
            Request Withdrawal
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Orders</p>
            <ShoppingBag className="text-green-500 w-6 h-6" />
          </div>
          <h2 className="text-4xl font-black text-gray-900">12</h2>
          <div className="mt-6 flex items-center gap-2 text-green-600 text-sm font-bold">
            <TrendingUp className="w-4 h-4" /> +15% from last week
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Listed Products</p>
            <Package className="text-purple-500 w-6 h-6" />
          </div>
          <h2 className="text-4xl font-black text-gray-900">42 <span className="text-lg text-gray-300 font-normal">/ 50</span></h2>
          <div className="mt-6 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[84%]"></div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Recent Store Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Items</th>
                <th className="px-6 py-4 text-left">Earnings</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {[
                { id: '#ORD-8821', customer: 'Alice Smith', items: '2x Wireless Buds', earning: '$120.00', status: 'Paid' },
                { id: '#ORD-8822', customer: 'Bob Jones', items: '1x Keyboard', earning: '$45.50', status: 'Shipped' },
                { id: '#ORD-8823', customer: 'Charlie Brown', items: '1x USB Hub', earning: '$12.00', status: 'Delivered' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{order.earning}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1 bg-gray-100 rounded text-gray-600 font-bold hover:bg-gray-200">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

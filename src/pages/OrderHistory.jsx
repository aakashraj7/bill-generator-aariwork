import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../context/OrderContext';
import { Card, Input } from '../components/UI';
import { StatusBadge } from '../components/Navigation';
import { Search, Filter, IndianRupee, ChevronRight, PackageOpen } from 'lucide-react';

const OrderHistory = ({ onViewOrder }) => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed, delivered

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm);
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pb-32 px-5 pt-8 animate-in">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Order History</h1>

      {/* Search and Filter */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'pending', 'completed', 'delivered'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                filter === f
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20'
                  : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-20 bg-slate-50/50 border-dashed border-2 border-slate-200">
            <PackageOpen className="text-slate-300 mx-auto mb-4" size={48} />
            <p className="text-slate-500 font-medium">No matching orders found.</p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                onClick={() => onViewOrder(order.id)}
                className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                  {order.customerName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{order.customerName}</h3>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-primary-600">₹{order.total}</span>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

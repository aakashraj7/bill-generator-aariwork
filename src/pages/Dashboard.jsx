import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../components/UI';
import { Scissors, Receipt, MapPin, Plus, Star, Heart } from 'lucide-react';
import { cn } from '../utils/cn';

const Dashboard = ({ onCreateOrder }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 px-5 pt-12 flex flex-col items-center text-center"
    >
      {/* High-Impact Header */}
      <div className="mb-10 relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-400 blur-3xl opacity-20 scale-150 rounded-full"></div>
          <div className="w-32 h-32 rounded-[3rem] bg-white shadow-[0_20px_50px_rgba(124,58,237,0.2)] overflow-hidden border-4 border-white mx-auto mb-6 p-1 relative z-10 rotate-3">
            <img src="/src/assets/logo-rounded.jpg.jpg" alt="Logo" className="w-full h-full object-cover rounded-[2.5rem]" />
          </div>
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-2xl shadow-xl border-4 border-white z-20 animate-bounce">
            <Heart size={24} className="fill-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase font-serif italic">
          Subha's <span className="text-primary-600">Aariworks</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary-900 text-white rounded-full shadow-lg border-2 border-primary-800">
          <MapPin size={16} className="text-yellow-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Tiruvannamalai</span>
        </div>
      </div>

      {/* Main Attraction Card */}
      <Card className="w-full py-12 px-8 mb-8 bg-white relative overflow-hidden border-[6px] border-double border-primary-50 shadow-2xl rounded-[4rem]">
        {/* Decorative Corner Thread */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Scissors size={100} className="rotate-45" />
        </div>
        
        <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_15px_30px_rgba(124,58,237,0.3)] rotate-6">
          <Receipt size={48} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase font-serif">Instant Billing</h2>
        <p className="text-slate-500 mb-10 text-lg leading-tight font-bold italic">
          Professional Aari Studio Bills in one tap!
        </p>
        
        <Button 
          onClick={onCreateOrder}
          className="w-full py-6 text-2xl font-black shadow-[0_15px_40px_rgba(124,58,237,0.4)] rounded-[2.5rem] uppercase tracking-widest active:scale-95 bg-primary-600 border-none"
        >
          <Plus size={32} strokeWidth={4} />
          <span>New Bill</span>
        </Button>
      </Card>

      {/* Catchy Feature Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-6 bg-gradient-to-br from-white to-primary-50 rounded-[3rem] border-2 border-primary-50 shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-inner">
            <Star size={30} className="fill-yellow-600" />
          </div>
          <p className="text-[10px] font-black uppercase text-primary-900 tracking-widest">Premium Art</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-white to-primary-50 rounded-[3rem] border-2 border-primary-50 shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center shadow-inner">
            <Scissors size={30} className="rotate-90" />
          </div>
          <p className="text-[10px] font-black uppercase text-primary-900 tracking-widest">Aari Design</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

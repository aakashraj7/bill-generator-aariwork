import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../components/UI';
import { Sparkles, Receipt, MapPin, Plus, Star, Award } from 'lucide-react';
import { cn } from '../utils/cn';

const Dashboard = ({ onCreateOrder }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 px-5 pt-12 flex flex-col items-center text-center"
    >
      {/* Branding */}
      <div className="mb-10 relative">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-white shadow-2xl overflow-hidden border-4 border-white mx-auto mb-6 relative z-10">
            <img src="/src/assets/logo-rounded.jpg.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2.5 rounded-full shadow-lg border-2 border-white z-20">
            <Award size={20} className="fill-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-primary-950 tracking-tighter mb-2 uppercase font-serif italic">
          Subha's <span className="text-primary-600">Aariworks</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary-50 rounded-full border border-primary-100">
          <MapPin size={16} className="text-primary-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-700">Tiruvannamalai</span>
        </div>
      </div>

      {/* Main Attraction Card */}
      <Card className="w-full py-12 px-8 mb-8 bg-white relative overflow-hidden border-2 border-primary-50 shadow-2xl rounded-[3rem]">
        {/* Stitch Border */}
        <div className="absolute inset-2 border-2 border-dashed border-primary-100/50 rounded-[2.5rem] pointer-events-none"></div>
        
        <div className="w-20 h-20 bg-primary-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
          <Receipt size={40} />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase font-serif tracking-tight">Instant Billing</h2>
        <p className="text-primary-600 font-serif italic text-lg mb-8">
          "Wear your elegance."
        </p>
        
        <Button 
          onClick={onCreateOrder}
          className="w-full py-6 text-xl font-black shadow-xl shadow-primary-500/30 rounded-[2.5rem] uppercase tracking-[0.2em] bg-primary-600 border-none"
        >
          <Plus size={28} strokeWidth={3} />
          <span>New Bill</span>
        </Button>
      </Card>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 w-full px-4">
        <div className="flex flex-col items-center gap-2">
           <Star size={24} className="text-yellow-400 fill-yellow-400" />
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Premium Quality</p>
        </div>
        <div className="flex flex-col items-center gap-2">
           <Sparkles size={24} className="text-primary-300" />
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Boutique Design</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from './UI';
import { IndianRupee, Download, Share2, Printer, Heart, User, Calendar, Phone, Sparkles, Award, Star } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../assets/logo-rounded.jpg.jpg';

const InvoiceView = ({ order, onBack }) => {
  const invoiceRef = useRef();

  const handleDownloadImage = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Bill-${order.customerName}.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    
    // Improved PDF generation with better scaling
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with the same aspect ratio as the canvas
    const imgWidth = 210; // A4 Width in mm
    const pageHeight = 297; // A4 Height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight > pageHeight ? imgHeight : pageHeight]);
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Bill-${order.customerName}.pdf`);
  };

  const handleWhatsAppShare = () => {
    const text = `✨ *SUBHA'S AARIWORKS* ✨\n📍 Tiruvannamalai\n📞 8489764879\n\n*Customer:* ${order.customerName}\n*Total Value:* ₹${order.total}\n*Balance:* ₹${order.remainingBalance}\n\n*Wear Your Elegance. Visit Us Again!* 🌸`;
    const url = `https://wa.me/${order.phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const quotes = [
    "Elegance in every stitch.",
    "Designed to make you shine.",
    "Quality is our tradition.",
    "Wear your masterpiece.",
    "Visit again for your next unique design!"
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="pb-32 px-5 pt-8 animate-in">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-premium border border-primary-100">
          <Sparkles size={20} className="text-primary-600" />
        </button>
        <h1 className="text-2xl font-bold text-primary-900 font-serif uppercase tracking-tighter italic">Designer Bill</h1>
      </div>

      {/* Ornate Stitched Receipt */}
      <div className="overflow-hidden mb-8 shadow-2xl rounded-[3rem] p-4 bg-white relative border-2 border-primary-50">
        
        {/* ORANGE Stitched Border Effect */}
        <div className="absolute inset-2 border-[4px] border-dashed border-orange-500/50 rounded-[2.5rem] pointer-events-none"></div>
        <div className="absolute inset-4 border-[2px] border-dotted border-orange-600/40 rounded-[2.2rem] pointer-events-none"></div>

        <div 
          ref={invoiceRef} 
          className="bg-white rounded-[2rem] p-8 font-sans text-slate-900 min-h-[850px] flex flex-col relative overflow-hidden"
        >
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-10 relative z-10">
            <div className="relative mb-6">
               <div className="w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-primary-100 p-1 shadow-xl relative z-10">
                 <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
               </div>
            </div>
            
            <h1 className="text-3xl font-black text-primary-950 tracking-tighter uppercase mb-1 font-serif">Subha's Aariworks</h1>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-6 bg-primary-200"></div>
                <p className="text-primary-400 text-[10px] font-black uppercase tracking-[0.4em]">Tiruvannamalai</p>
                <div className="h-[1px] w-6 bg-primary-200"></div>
              </div>
              <p className="text-slate-500 text-xs font-bold tracking-widest flex items-center justify-center gap-1.5">
                <Phone size={12} className="text-primary-300" />
                8489764879
              </p>
            </div>
          </div>

          {/* Centered Customer Section */}
          <div className="mb-10 relative z-10 space-y-6">
            <div className="bg-slate-50/80 backdrop-blur-sm p-8 rounded-[2.5rem] border-2 border-orange-200/50 shadow-sm relative overflow-hidden text-center flex flex-col items-center">
               <div className="flex items-center gap-3 mb-3 text-primary-400">
                 <User size={20} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Customer Name</span>
               </div>
               <h2 className="text-3xl font-black text-slate-900 leading-tight font-serif italic tracking-tight uppercase mb-4">
                 {order.customerName}
               </h2>
               <div className="flex items-center gap-2 text-primary-600 font-bold bg-white px-6 py-2 rounded-full border border-orange-100">
                 <Phone size={18} />
                 <span className="text-xl tracking-[0.1em]">{order.phoneNumber}</span>
               </div>
            </div>
            
            {/* Legend Style Date & Time Card */}
            <fieldset className="border-2 border-orange-200/50 rounded-3xl p-5 relative z-10 bg-primary-50/20">
              <legend className="px-4 ml-6 text-[11px] font-black uppercase tracking-[0.25em] text-primary-500 bg-white">
                GENERATED ON
              </legend>
              <div className="flex items-center justify-center gap-4">
                <Calendar size={22} className="text-primary-400 shrink-0" />
                <div className="flex items-baseline gap-3 flex-wrap justify-center">
                  <span className="text-xl font-black text-slate-900 whitespace-nowrap">
                    {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="w-1.5 h-1.5 bg-primary-300 rounded-full"></span>
                  <span className="text-xl font-black text-primary-600 tracking-tight whitespace-nowrap uppercase">
                    {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Items Section */}
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Sparkles size={16} className="text-primary-300" />
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Order Details</h3>
              <div className="flex-1 h-[1px] bg-slate-100 ml-2"></div>
            </div>
            
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-orange-100/50 shadow-sm">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{item.name || 'Custom Work'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 tracking-[0.02em]">₹ {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Quote */}
          <div className="mt-8 mb-8 text-center px-6 relative z-10">
             <p className="text-primary-700 font-serif italic text-xl leading-relaxed">
               "{randomQuote}"
             </p>
          </div>

          {/* High-Contrast Balance Card */}
          <div className="mt-auto relative z-10">
            <div className="bg-primary-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-2 border border-dashed border-white/10 rounded-[2.5rem] pointer-events-none"></div>
              
              <div className="space-y-5 relative z-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                  <span>Total Work Value</span>
                  <span className="tracking-[0.02em]">₹ {order.total}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                  <span>Advance Paid</span>
                  <span className="text-green-400 tracking-[0.02em]">₹ {order.advancePaid || 0}</span>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-400 mb-2 text-center">Final Balance Amount</p>
                  <p className="text-5xl font-black italic tracking-[0.02em] text-white text-center">₹ {order.remainingBalance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center pb-4 relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
               <Heart size={20} className="text-red-400 fill-red-400" />
               <p className="text-primary-900 font-serif italic text-2xl">Subha's Aariworks</p>
               <Star size={20} className="text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Wear Your Elegance • Visit Us Again</p>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleDownloadImage} variant="secondary" className="bg-white rounded-[2rem] h-16 border-2 border-slate-100 text-primary-600 font-black shadow-sm">
            <Download size={22} />
            IMAGE
          </Button>
          <Button onClick={handleDownloadPDF} variant="secondary" className="bg-white rounded-[2rem] h-16 border-2 border-slate-100 text-primary-600 font-black shadow-sm">
            <Printer size={22} />
            PDF
          </Button>
        </div>
        <Button onClick={handleWhatsAppShare} className="w-full h-20 bg-[#25D366] rounded-[2.5rem] shadow-xl border-none text-xl font-black active:scale-[0.98] transition-transform">
          <Share2 size={28} />
          SHARE ON WHATSAPP
        </Button>
      </div>
    </div>
  );
};

export default InvoiceView;

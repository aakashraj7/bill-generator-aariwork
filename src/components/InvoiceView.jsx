import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from './UI';
import { IndianRupee, Download, Share2, Printer, Scissors, User, Phone, Calendar, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceView = ({ order, onBack }) => {
  const invoiceRef = useRef();

  const handleDownloadImage = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Bill-${order.customerName}.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Bill-${order.customerName}.pdf`);
  };

  const handleWhatsAppShare = () => {
    const text = `✨ *SUBHA'S AARIWORKS* ✨\n📍 Tiruvannamalai\n\n*Customer:* ${order.customerName}\n*Total Value:* ₹${order.total}\n*Balance:* ₹${order.remainingBalance}\n\n*Beautifully Handcrafted for You!*`;
    const url = `https://wa.me/${order.phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pb-32 px-5 pt-8 animate-in">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-premium border border-primary-100">
          <Scissors size={20} className="text-primary-600" />
        </button>
        <h1 className="text-2xl font-black text-primary-900 font-serif uppercase tracking-tighter italic">Royal Bill</h1>
      </div>

      {/* High-Impact Catchy Receipt */}
      <div className="overflow-hidden mb-8 shadow-[0_20px_50px_rgba(124,58,237,0.3)] rounded-[3rem] p-3 bg-gradient-to-br from-primary-600 to-purple-800 relative">
        
        {/* Main Content Area */}
        <div 
          ref={invoiceRef} 
          className="bg-white rounded-[2.5rem] p-8 font-sans text-slate-900 min-h-[750px] flex flex-col relative overflow-hidden"
        >
          {/* Gold Zari Border Frame */}
          <div className="absolute inset-2 border-[6px] border-double border-yellow-400/30 rounded-[2rem] pointer-events-none"></div>
          <div className="absolute inset-4 border border-dashed border-primary-200/50 rounded-[1.8rem] pointer-events-none"></div>
          
          {/* Large Floral Embroidery Motifs (SVGs) */}
          <div className="absolute top-0 right-0 opacity-[0.08] pointer-events-none -mr-10 -mt-10">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <path d="M50 0 Q60 40 100 50 Q60 60 50 100 Q40 60 0 50 Q40 40 50 0" fill="currentColor" className="text-primary-600" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 opacity-[0.08] pointer-events-none -ml-10 -mb-10">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <path d="M50 0 Q60 40 100 50 Q60 60 50 100 Q40 60 0 50 Q40 40 50 0" fill="currentColor" className="text-primary-600" />
            </svg>
          </div>

          {/* Header with Silk Texture Overlay */}
          <div className="flex flex-col items-center text-center mb-10 relative z-10">
            <div className="relative mb-6">
               <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
               <div className="w-24 h-24 bg-white rounded-[2.5rem] overflow-hidden border-4 border-yellow-400/50 p-1 shadow-2xl relative z-10 rotate-3">
                 <img src="/src/assets/logo-rounded.jpg.jpg" alt="Logo" className="w-full h-full object-cover rounded-[2rem]" />
               </div>
               {/* Floating Needle with Thread */}
               <div className="absolute -right-8 top-0 animate-bounce">
                 <div className="relative">
                    <Scissors size={28} className="text-primary-400 rotate-12" />
                    <svg className="absolute top-4 left-4 w-20 h-20 text-yellow-400 opacity-40" viewBox="0 0 100 100">
                      <path d="M 0 0 C 40 0 60 40 100 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                    </svg>
                 </div>
               </div>
            </div>
            
            <h1 className="text-4xl font-black text-primary-900 tracking-tighter uppercase mb-1 font-serif">Subha's Aariworks</h1>
            <div className="bg-primary-50 px-6 py-1.5 rounded-full border-2 border-primary-100/50 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
              <p className="text-primary-700 text-xs font-black uppercase tracking-[0.3em]">Tiruvannamalai</p>
            </div>
          </div>

          {/* Catchy Details Section */}
          <div className="grid grid-cols-1 gap-4 mb-8 relative z-10">
            <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-[2rem] border-l-8 border-primary-500 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                <User size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-primary-300 tracking-[0.2em] mb-1">Customer Name</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{order.customerName}</h2>
                <p className="text-sm text-slate-500 font-bold mt-1 flex items-center gap-1.5">
                  <Phone size={14} /> {order.phoneNumber}
                </p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-[1.5rem] border border-slate-100 flex justify-between items-center px-8">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-300" size={20} />
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Bill Date</span>
              </div>
              <p className="text-sm font-black text-slate-800">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Bold Items Section */}
          <div className="flex-1 relative z-10 px-2">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center shadow-lg">
                 <IndianRupee size={16} />
               </div>
               <h3 className="text-sm font-black uppercase text-slate-900 tracking-[0.2em]">Design Charges</h3>
               <div className="flex-1 h-[2px] bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
            </div>
            
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 bg-white rounded-[2rem] border-2 border-slate-50 shadow-sm hover:border-primary-100 transition-colors">
                  <div>
                    <p className="font-black text-slate-800 text-lg">{item.name || 'Custom Aari Design'}</p>
                    <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Handmade with precision</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 italic tracking-tighter">₹{item.price || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "Handcrafted" Statement Footer - Before Total */}
          <div className="mt-8 mb-6 text-center">
             <div className="inline-flex items-center gap-3 py-2 px-6 bg-primary-50 rounded-full border border-primary-100 text-primary-600 font-bold italic text-sm">
                <Heart size={16} className="fill-primary-600" />
                Hand-Embroidered Original Designs
             </div>
          </div>

          {/* High-Contrast Total Card */}
          <div className="mt-auto relative z-10">
            <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              {/* Internal Stitch Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L40 40 M0 0 L20 20' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")` }}></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center opacity-80 text-xs font-bold uppercase tracking-[0.3em]">
                  <span>Work Value</span>
                  <span>₹{order.total}</span>
                </div>
                <div className="flex justify-between items-center opacity-80 text-xs font-bold uppercase tracking-[0.3em]">
                  <span>Advance Paid</span>
                  <span className="text-green-300">- ₹{order.advancePaid || 0}</span>
                </div>
                
                <div className="pt-6 border-t border-white/20 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-300 mb-1">Balance Amount</p>
                    <p className="text-5xl font-black italic tracking-tighter text-yellow-400 drop-shadow-lg">₹{order.remainingBalance}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <Scissors size={32} className="text-white -rotate-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Brand Stamp */}
          <div className="mt-8 text-center pb-4 relative z-10">
            <h2 className="text-2xl font-black text-primary-800 uppercase tracking-tighter italic">Thank You!</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Visit Again for Elegant Designs</p>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleDownloadImage} variant="secondary" className="bg-white rounded-[2rem] h-16 border-2 border-slate-100 text-primary-600 shadow-sm active:scale-95">
            <Download size={22} />
            <span className="font-black">SAVE IMAGE</span>
          </Button>
          <Button onClick={handleDownloadPDF} variant="secondary" className="bg-white rounded-[2rem] h-16 border-2 border-slate-100 text-primary-600 shadow-sm active:scale-95">
            <Printer size={22} />
            <span className="font-black">GET PDF</span>
          </Button>
        </div>
        <Button onClick={handleWhatsAppShare} className="w-full h-20 bg-[#25D366] rounded-[2.5rem] shadow-[0_10px_30px_rgba(37,211,102,0.4)] border-none text-xl font-black tracking-widest active:scale-[0.98]">
          <Share2 size={28} />
          <span>SHARE TO WHATSAPP</span>
        </Button>
      </div>
    </div>
  );
};

export default InvoiceView;

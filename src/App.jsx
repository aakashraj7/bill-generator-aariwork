import React, { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import { BottomNav } from './components/Navigation';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/CreateOrder';
import InvoiceView from './components/InvoiceView';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleCreateOrder = () => {
    setActiveTab('create');
    setCurrentOrder(null);
  };

  const handleOrderCreated = (order) => {
    setCurrentOrder(order);
    setActiveTab('invoice');
  };

  const renderPage = () => {
    if (activeTab === 'invoice' && currentOrder) {
      return <InvoiceView order={currentOrder} onBack={() => setActiveTab('dashboard')} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onCreateOrder={handleCreateOrder} />;
      case 'create':
        return <CreateOrder onBack={() => setActiveTab('dashboard')} onSuccess={handleOrderCreated} />;
      case 'settings':
        return (
          <div className="p-8 text-center text-slate-500 font-medium pt-20">
            <h1 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Business Info</h1>
            <p className="mb-8">Customize your business details for the invoice.</p>
            <div className="p-6 bg-white rounded-3xl border border-slate-100 text-left space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Location</p>
                <p className="font-bold text-slate-900">Tiruvannamalai</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Business Name</p>
                <p className="font-bold text-slate-900 italic font-serif">Subha's Aariworks</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onCreateOrder={handleCreateOrder} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + (currentOrder ? 'inv' : 'page')}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Simplified Bottom Nav */}
      <BottomNav activeTab={activeTab === 'invoice' ? 'create' : activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        if (tab !== 'invoice') setCurrentOrder(null);
      }} />
    </div>
  );
}

function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}

export default App;

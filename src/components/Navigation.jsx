import React from 'react';
import { cn } from '../utils/cn';
import { Home, PlusCircle, History, Settings } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-orange-50 text-orange-600 border-orange-100',
    completed: 'bg-green-50 text-green-600 border-green-100',
    delivered: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  return (
    <span className={cn(
      'px-3 py-1 rounded-full text-xs font-semibold border capitalize',
      styles[status] || styles.pending
    )}>
      {status}
    </span>
  );
};

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'create', icon: PlusCircle, label: 'New Bill' },
    { id: 'settings', icon: Settings, label: 'Info' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 pb-8 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex flex-col items-center gap-1 transition-all duration-300',
              isActive ? 'text-primary-600 scale-110' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            <div className={cn(
              'p-2 rounded-xl transition-all',
              isActive && 'bg-primary-50 shadow-sm'
            )}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

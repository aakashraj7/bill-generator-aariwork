import React from 'react';
import { cn } from '../utils/cn';

export const Button = ({ className, variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'bg-primary-600 text-white shadow-lg shadow-primary-500/25 active:scale-95 hover:bg-primary-700',
    secondary: 'bg-white text-primary-600 border border-primary-100 shadow-sm active:scale-95 hover:bg-primary-50',
    ghost: 'bg-transparent text-primary-600 active:scale-95 hover:bg-primary-50',
    danger: 'bg-red-500 text-white active:scale-95 hover:bg-red-600',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ className, children, ...props }) => (
  <div className={cn('bg-white rounded-[2rem] p-6 shadow-premium border border-white/50', className)} {...props}>
    {children}
  </div>
);

export const Input = ({ label, error, className, ...props }) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>}
    <input
      className={cn(
        'w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200 text-slate-900 placeholder:text-slate-400',
        error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
  </div>
);

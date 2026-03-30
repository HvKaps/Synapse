import React from 'react';

export const SoftButton = ({ children, variant = 'yellow', className = '', onClick, disabled = false, type = "button" }) => {
  const variants = {
    yellow: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_2px_10px_-3px_rgba(79,70,229,0.5)] border border-transparent', // Mapped to primary Corporate Indigo
    orange: 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm border border-transparent',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm border border-transparent',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm border border-transparent',
    green: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-transparent',
    white: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
    black: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-transparent',
  };

  return (
    <button 
      type={type} onClick={onClick} disabled={disabled}
      className={`rounded-lg transition-all duration-200 font-medium px-5 py-2.5 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${variants[variant] || variants.yellow} ${className}`}
    >
      {children}
    </button>
  );
};

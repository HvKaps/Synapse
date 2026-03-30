import React from 'react';

export const SoftButton = ({ children, variant = 'yellow', className = '', onClick, disabled = false, type = "button" }) => {
  const variants = {
    yellow: 'bg-[#FFEB3B] hover:bg-[#FDD835]',
    orange: 'bg-[#FFCC80] hover:bg-[#FFB74D]',
    purple: 'bg-[#CE93D8] hover:bg-[#BA68C8]',
    blue: 'bg-[#90CAF9] hover:bg-[#64B5F6]',
    green: 'bg-[#81C784] hover:bg-[#66BB6A]',
    white: 'bg-white hover:bg-gray-100',
    black: 'bg-black text-white hover:bg-zinc-800',
  };

  return (
    <button 
      type={type} onClick={onClick} disabled={disabled}
      className={`border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-200 font-black uppercase tracking-wide px-8 py-4 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant] || variants.yellow} ${className}`}
    >
      {children}
    </button>
  );
};

import React from 'react';

export const SoftButton = ({ children, variant = 'yellow', className = '', onClick, disabled = false, type = "button" }) => {
  const variants = {
    yellow: 'bg-[#FFEB3B] hover:bg-[#FDD835] text-black border-black',
    orange: 'bg-[#FFCC80] hover:bg-[#FFB74D] text-black border-black',
    purple: 'bg-[#CE93D8] hover:bg-[#BA68C8] text-black border-black',
    blue: 'bg-[#90CAF9] hover:bg-[#64B5F6] text-black border-black',
    green: 'bg-[#81C784] hover:bg-[#66BB6A] text-black border-black',
    white: 'bg-white hover:bg-gray-50 text-black border-gray-200 shadow-sm active:shadow-none hover:border-gray-300',
    black: 'bg-black text-white hover:bg-zinc-800 border-black',
  };

  const isWhite = variant === 'white';

  return (
    <button 
      type={type} onClick={onClick} disabled={disabled}
      className={`border-[1.5px] rounded-xl transition-all duration-200 font-semibold px-6 py-3 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed ${
        !isWhite ? 'shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]' : ''
      } ${variants[variant] || variants.yellow} ${className}`}
    >
      {children}
    </button>
  );
};

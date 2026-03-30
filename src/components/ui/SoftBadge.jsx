import React from 'react';

export const SoftBadge = ({ children, color = "yellow" }) => {
  const colors = {
    yellow: 'bg-[#FFEB3B]',
    orange: 'bg-[#FFCC80]',
    purple: 'bg-[#CE93D8]',
    blue: 'bg-[#90CAF9]',
    green: 'bg-[#81C784]',
  };
  return (
    <span className={`border-[2px] border-black px-4 py-1.5 rounded-full text-[12px] font-black uppercase ${colors[color]} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
      {children}
    </span>
  );
};

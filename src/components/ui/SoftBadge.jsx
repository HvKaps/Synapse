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
    <span className={`border-[1.5px] border-black px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${colors[color]}`}>
      {children}
    </span>
  );
};

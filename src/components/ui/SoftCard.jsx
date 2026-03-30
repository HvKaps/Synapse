import React from 'react';

export const SoftCard = ({ children, title, icon: Icon, color = "white", className = "", ...props }) => {
  const colors = {
    white: 'bg-white',
    yellow: 'bg-[#FFF9C4]',
    orange: 'bg-[#FFE0B2]',
    purple: 'bg-[#F3E5F5]',
    blue: 'bg-[#E3F2FD]',
    green: 'bg-[#E8F5E9]',
  };

  return (
    <div className={`border-[3px] border-black rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 ${colors[color]} ${className}`} {...props}>
      {title && (
        <div className="flex items-center justify-between mb-8 border-b-[3px] border-black pb-5">
          <h3 className="text-2xl font-black uppercase flex items-center gap-3">
            {Icon && <Icon size={28} strokeWidth={3} />}
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

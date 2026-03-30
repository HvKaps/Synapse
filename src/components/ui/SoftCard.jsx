import React from 'react';

export const SoftCard = ({ children, title, icon: Icon, color = "white", className = "", ...props }) => {
  const borderColors = {
    white: 'border-l-gray-300',
    yellow: 'border-l-[#FFEB3B]',
    orange: 'border-l-[#FFCC80]',
    purple: 'border-l-[#CE93D8]',
    blue: 'border-l-[#90CAF9]',
    green: 'border-l-[#81C784]',
  };

  return (
    <div className={`bg-white border-[1.5px] border-gray-100 border-l-[3px] ${borderColors[color] || borderColors.white} rounded-2xl shadow-sm p-8 ${className}`} {...props}>
      {title && (
        <div className="flex items-center justify-between mb-6 border-b-[1.5px] border-gray-100 pb-4">
          <h3 className="text-xl font-bold flex items-center gap-3">
            {Icon && <Icon size={22} strokeWidth={2.5} className="text-gray-700" />}
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

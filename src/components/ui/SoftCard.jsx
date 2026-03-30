import React from 'react';

export const SoftCard = ({ children, title, icon: Icon, color = "white", className = "", ...props }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 p-8 ${className}`} {...props}>
      {title && (
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-semibold flex items-center gap-3 text-slate-800">
            {Icon && <Icon size={22} strokeWidth={2} className="text-indigo-600" />}
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

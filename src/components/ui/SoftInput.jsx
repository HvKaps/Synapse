import React from 'react';

export const SoftInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, required = false, rows = 1 }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 ml-1">
      {Icon && <Icon size={16} strokeWidth={2.5} className="text-gray-500" />} {label} {required && <span className="text-red-500">*</span>}
    </label>
    {rows > 1 ? (
      <textarea 
        required={required} rows={rows} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border-[1.5px] border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 resize-none bg-white"
      />
    ) : (
      <input 
        required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border-[1.5px] border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 bg-white"
      />
    )}
  </div>
);

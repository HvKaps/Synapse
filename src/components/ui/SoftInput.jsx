import React from 'react';

export const SoftInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, required = false, rows = 1 }) => (
  <div className="space-y-3">
    <label className="text-sm font-black uppercase flex items-center gap-2 ml-2">
      {Icon && <Icon size={18} strokeWidth={3} />} {label} {required && <span className="text-red-500">*</span>}
    </label>
    {rows > 1 ? (
      <textarea 
        required={required} rows={rows} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border-[3px] border-black rounded-[20px] p-4 font-bold text-lg focus:outline-none focus:bg-[#FFF9C4] transition-colors placeholder:text-gray-400 resize-none"
      />
    ) : (
      <input 
        required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border-[3px] border-black rounded-[20px] p-4 font-bold text-lg focus:outline-none focus:bg-[#FFF9C4] transition-colors placeholder:text-gray-400"
      />
    )}
  </div>
);

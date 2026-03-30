import React from 'react';

export const SoftInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, required = false, rows = 1 }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
      {Icon && <Icon size={16} strokeWidth={2} className="text-slate-400" />} 
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {rows > 1 ? (
      <textarea 
        required={required} rows={rows} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow placeholder:text-slate-400 resize-none bg-white shadow-sm"
      />
    ) : (
      <input 
        required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow placeholder:text-slate-400 bg-white shadow-sm"
      />
    )}
  </div>
);

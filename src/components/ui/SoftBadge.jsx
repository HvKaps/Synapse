import React from 'react';

export const SoftBadge = ({ children, color = "yellow" }) => {
  const colors = {
    yellow: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20', // Mapped to primary Corporate Indigo
    orange: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
    purple: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20',
    blue: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide shadow-sm ${colors[color] || colors.yellow}`}>
      {children}
    </span>
  );
};

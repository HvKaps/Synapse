import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Bell } from 'lucide-react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setAlerts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 5s
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  }, []);

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`
              animate-in slide-in-from-right-8 fade-in duration-300
              pointer-events-auto flex items-start gap-4 p-5 rounded-2xl border shadow-md
              ${alert.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : ''}
              ${alert.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : ''}
              ${alert.type === 'info' ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : ''}
            `}
          >
            <div className="shrink-0 mt-0.5">
              {alert.type === 'success' && <CheckCircle size={24} strokeWidth={2} className="text-emerald-600" />}
              {alert.type === 'error' && <AlertTriangle size={24} strokeWidth={2} className="text-rose-600" />}
              {alert.type === 'info' && <Bell size={24} strokeWidth={2} className="text-indigo-600" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm leading-snug">{alert.message}</p>
            </div>
            <button 
              onClick={() => removeAlert(alert.id)}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-all rounded-full"
            >
              <X size={16} strokeWidth={2} className="opacity-70" />
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

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
              pointer-events-auto flex items-start gap-4 p-5 rounded-[20px] border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              ${alert.type === 'success' ? 'bg-[#E8F5E9] text-black' : ''}
              ${alert.type === 'error' ? 'bg-[#FFEBEE] text-black' : ''}
              ${alert.type === 'info' ? 'bg-[#FFEB3B] text-black' : ''}
            `}
          >
            <div className="shrink-0 mt-0.5">
              {alert.type === 'success' && <CheckCircle size={28} strokeWidth={3} className="text-green-600" />}
              {alert.type === 'error' && <AlertTriangle size={28} strokeWidth={3} className="text-red-500" />}
              {alert.type === 'info' && <Bell size={28} strokeWidth={3} className="text-black" />}
            </div>
            <div className="flex-1">
              <p className="font-bold text-[14px] leading-snug">{alert.message}</p>
            </div>
            <button 
              onClick={() => removeAlert(alert.id)}
              className="shrink-0 w-8 h-8 flex items-center justify-center hover:scale-110 hover:bg-red-50 transition-all bg-white border-[3px] border-black rounded-full"
            >
              <X size={16} strokeWidth={4} />
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

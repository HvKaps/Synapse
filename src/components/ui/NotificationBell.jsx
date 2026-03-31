import React, { useState } from 'react';
import { Bell, CheckCircle, ShieldAlert, MessageSquare, X } from 'lucide-react';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Fonds Sécurisés', desc: 'Une entreprise a bloqué 2300€ sur Escrow pour votre mission.', type: 'success', time: 'Il y a 10 min', read: false },
    { id: 2, title: 'Nouvelle Invitation', desc: 'Un apporteur vous a transféré un contrat.', type: 'info', time: 'Il y a 1 heure', read: false },
    { id: 3, title: 'Litige Escrow', desc: 'Votre mission est gelée. L\'administrateur Synapse est sur le coup.', type: 'error', time: 'Hier', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="fixed top-6 right-6 md:top-10 md:right-10 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-slate-50 hover:-translate-y-0.5 transition-all relative text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <Bell size={22} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute 0 top-0 right-0 bg-rose-500 text-white text-[10px] font-bold border-2 border-white rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2"><Bell size={18} className="text-indigo-600"/> Notifications</h4>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Tout marquer comme lu</button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-1 rounded-full"><X size={16} /></button>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-10 text-center bg-white flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100 text-slate-300">
                   <Bell size={20} strokeWidth={2} />
                </div>
                <p className="font-medium text-slate-500 text-sm">Vous êtes à jour.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors flex gap-4 items-start ${!n.read ? 'bg-indigo-50/30' : 'opacity-80'}`}>
                  <div className="shrink-0 mt-0.5">
                    {n.type === 'success' && <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle size={16} strokeWidth={2}/></div>}
                    {n.type === 'info' && <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center"><MessageSquare size={16} strokeWidth={2}/></div>}
                    {n.type === 'error' && <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center"><ShieldAlert size={16} strokeWidth={2}/></div>}
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-semibold text-sm mb-1 ${!n.read ? 'text-slate-900' : 'text-slate-700'}`}>{n.title}</h5>
                    <p className="font-medium text-slate-500 mb-2 leading-snug text-sm">{n.desc}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{n.time}</span>
                  </div>
                  {!n.read && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0 shadow-sm mt-1.5 ml-2"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
        className="w-14 h-14 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all relative"
      >
        <Bell size={24} strokeWidth={2} className="text-black" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black border-[2px] border-black rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-80 md:w-96 bg-white border-[4px] border-black rounded-[25px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h4 className="font-black uppercase italic text-lg">Notifications</h4>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-[10px] uppercase font-bold text-gray-400 hover:text-white underline">Tout lire</button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center bg-gray-50">
                <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="font-bold text-gray-500 text-sm">Aucune notification.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-4 border-b-[3px] border-black cursor-pointer hover:bg-gray-50 transition-colors flex gap-4 items-start ${!n.read ? 'bg-blue-50/50' : 'opacity-70'}`}>
                  <div className="shrink-0 mt-1">
                    {n.type === 'success' && <CheckCircle className="text-green-500" size={20}/>}
                    {n.type === 'info' && <MessageSquare className="text-blue-500" size={20}/>}
                    {n.type === 'error' && <ShieldAlert className="text-red-500" size={20}/>}
                  </div>
                  <div>
                    <h5 className="font-black uppercase text-sm">{n.title}</h5>
                    <p className="font-bold text-gray-600 mb-1 text-sm">{n.desc}</p>
                    <span className="text-[10px] font-black uppercase text-gray-400">{n.time}</span>
                  </div>
                  {!n.read && <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0 border-[2px] border-black ml-auto"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

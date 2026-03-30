import React from 'react';
import { Zap, LayoutDashboard, Users, MessageSquare, Wallet, LogOut, Briefcase, Bell } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const GenericDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-80 bg-white border-b-[4px] md:border-b-0 md:border-r-[4px] border-black p-8 flex flex-col space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1" />
          </div>
          <span className="font-black text-2xl tracking-tighter">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-5 font-black uppercase italic text-sm">
           <button className="flex items-center gap-5 w-full p-5 bg-[#FFEB3B] border-[3px] border-black rounded-[25px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"><LayoutDashboard size={24} /> Accueil</button>
           <button className="flex items-center gap-5 w-full p-5 hover:bg-gray-50 border-[3px] border-transparent hover:border-black rounded-[25px] transition-all"><Users size={24} /> Mon Réseau</button>
           <button className="flex items-center gap-5 w-full p-5 hover:bg-gray-50 border-[3px] border-transparent hover:border-black rounded-[25px] transition-all"><MessageSquare size={24} /> Messagerie</button>
           <button className="flex items-center gap-5 w-full p-5 hover:bg-gray-50 border-[3px] border-transparent hover:border-black rounded-[25px] transition-all"><Wallet size={24} /> Finance</button>
        </nav>

        <div className="pt-8 border-t-[3px] border-black space-y-6">
           <div className="p-5 bg-[#E3F2FD] border-[3px] border-black rounded-[30px] flex items-center gap-5">
              <div className="w-14 h-14 bg-white border-[2px] border-black rounded-full flex items-center justify-center font-black overflow-hidden shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`} alt="avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate uppercase italic leading-tight">{user?.firstName} {user?.lastName}</p>
                <SoftBadge color="yellow">{user?.role}</SoftBadge>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-black uppercase text-[12px] text-red-500 flex items-center justify-center gap-2 py-2 hover:bg-red-50 rounded-xl transition-all">
             <LogOut size={18} /> Déconnexion
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-16">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-[6px] border-black pb-12">
              <div className="space-y-2">
                 <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Hello, <span className="text-[#90CAF9] underline decoration-8">{user?.firstName}</span> !</h2>
                 <p className="font-bold text-gray-500 uppercase text-sm tracking-widest italic">Dashboard {user?.role}.</p>
              </div>
              <SoftButton variant="black" className="rounded-full px-10 py-4 shadow-[8px_8px_0px_0px_#90CAF9]">Action Rapide</SoftButton>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <SoftCard title="Solde" color="yellow" icon={Wallet}>
                 <p className="text-5xl font-black italic">45 000,00 €</p>
              </SoftCard>
              <SoftCard title="Projets" color="orange" icon={Briefcase}>
                 <p className="text-5xl font-black italic">08</p>
              </SoftCard>
              <SoftCard title="Alertes" color="purple" icon={Bell}>
                 <p className="text-5xl font-black italic">02</p>
              </SoftCard>
           </div>
        </div>
      </main>
    </div>
  );
};

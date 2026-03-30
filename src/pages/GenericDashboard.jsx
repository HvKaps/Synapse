import React from 'react';
import { Zap, LayoutDashboard, Users, MessageSquare, Wallet, LogOut, Briefcase, Bell } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const GenericDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-8 flex flex-col space-y-10 z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1.5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-2 font-medium text-sm">
           <button className="flex items-center gap-4 w-full p-4 bg-indigo-50 text-indigo-700 rounded-xl shadow-sm transition-all"><LayoutDashboard size={20} strokeWidth={2} className="text-indigo-600" /> Accueil</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-all"><Users size={20} strokeWidth={2} /> Mon Réseau</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-all"><MessageSquare size={20} strokeWidth={2} /> Messagerie</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-all"><Wallet size={20} strokeWidth={2} /> Finance</button>
        </nav>

        <div className="pt-8 border-t border-slate-100 space-y-6">
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 truncate leading-tight mb-1">{user?.firstName} {user?.lastName}</p>
                <SoftBadge color="yellow" className="text-[10px] py-0.5 px-2 bg-indigo-100 text-indigo-800 border border-indigo-200">{user?.role}</SoftBadge>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-semibold uppercase tracking-wide text-xs text-rose-600 flex items-center justify-center gap-2 py-3 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100">
             <LogOut size={16} strokeWidth={2} /> Déconnexion
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-10">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-none">Hello, <span className="text-indigo-600">{user?.firstName}</span> !</h2>
                 <p className="font-medium text-slate-500 uppercase text-[11px] tracking-wider mt-3">Dashboard {user?.role}.</p>
              </div>
              <SoftButton variant="yellow" className="rounded-lg px-6 py-2.5 shadow-sm text-sm">Action Rapide</SoftButton>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SoftCard title="Solde" color="green" icon={Wallet} className="bg-emerald-50/30 border-emerald-100">
                 <p className="text-4xl font-bold text-emerald-950">45 000,00 €</p>
              </SoftCard>
              <SoftCard title="Projets" color="blue" icon={Briefcase} className="bg-blue-50/30 border-blue-100">
                 <p className="text-4xl font-bold text-blue-950">08</p>
              </SoftCard>
              <SoftCard title="Alertes" color="orange" icon={Bell} className="bg-orange-50/30 border-orange-100">
                 <p className="text-4xl font-bold text-orange-950">02</p>
              </SoftCard>
           </div>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { Zap, LayoutDashboard, Users, MessageSquare, Wallet, LogOut, Briefcase, Bell } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const GenericDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-80 bg-white border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-gray-200 p-8 flex flex-col space-y-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white border-[1.5px] border-gray-200 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1.5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-2 font-semibold text-sm">
           <button className="flex items-center gap-4 w-full p-4 bg-blue-50 text-blue-700 rounded-2xl shadow-sm transition-all"><LayoutDashboard size={20} /> Accueil</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-2xl transition-all"><Users size={20} /> Mon Réseau</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-2xl transition-all"><MessageSquare size={20} /> Messagerie</button>
           <button className="flex items-center gap-4 w-full p-4 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-2xl transition-all"><Wallet size={20} /> Finance</button>
        </nav>

        <div className="pt-8 border-t-[1.5px] border-gray-100 space-y-6">
           <div className="p-4 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-[1.5px] border-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate leading-tight mb-1">{user?.firstName} {user?.lastName}</p>
                <SoftBadge color="yellow" className="text-[10px] py-0.5 px-2 bg-yellow-50 text-yellow-700 border-yellow-200">{user?.role}</SoftBadge>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-semibold uppercase tracking-wide text-[11px] text-red-600 flex items-center justify-center gap-2 py-3 hover:bg-red-50 rounded-xl transition-all border-[1.5px] border-transparent hover:border-red-100">
             <LogOut size={16} /> Déconnexion
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-[1.5px] border-gray-200 pb-10">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-none">Hello, <span className="text-blue-600 decoration-blue-300 underline decoration-4 underline-offset-4">{user?.firstName}</span> !</h2>
                 <p className="font-semibold text-gray-500 uppercase text-[11px] tracking-wide mt-3">Dashboard {user?.role}.</p>
              </div>
              <SoftButton variant="black" className="rounded-xl px-8 py-3.5 shadow-sm text-sm">Action Rapide</SoftButton>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SoftCard title="Solde" color="yellow" icon={Wallet} className="bg-yellow-50/50 border-[1.5px] border-yellow-200">
                 <p className="text-4xl font-bold text-gray-900">45 000,00 €</p>
              </SoftCard>
              <SoftCard title="Projets" color="orange" icon={Briefcase} className="bg-orange-50/50 border-[1.5px] border-orange-200">
                 <p className="text-4xl font-bold text-gray-900">08</p>
              </SoftCard>
              <SoftCard title="Alertes" color="purple" icon={Bell} className="bg-purple-50/50 border-[1.5px] border-purple-200">
                 <p className="text-4xl font-bold text-gray-900">02</p>
              </SoftCard>
           </div>
        </div>
      </main>
    </div>
  );
};

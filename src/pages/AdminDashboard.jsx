import React, { useState } from 'react';
import { ShieldAlert, Users, Activity, FileText, CheckCircle, XCircle, LogOut, ChevronRight, Gavel, FileLock2 } from 'lucide-react';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftButton } from '../components/ui/SoftButton';
import { useAlert } from '../context/AlertContext';

export const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('escrow');
  const { showAlert } = useAlert();

  // Mock data for Admin
  const [disputedContracts, setDisputedContracts] = useState([
    { id: 1, title: 'Refonte Site e-Commerce', amount: 8400, apporteur: 'Marc D.', freelance: 'Lucas M.', status: 'blocked', reason: 'Désaccord sur le périmètre du jalon 2' },
    { id: 2, title: 'Application Mobile React Native', amount: 12000, apporteur: 'Julie L.', freelance: 'Sophie T.', status: 'blocked', reason: 'Retard de livraison (4 semaines)' }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 101, name: 'Lucas M.', role: 'freelance', status: 'active', reports: 0 },
    { id: 102, name: 'Marc D.', role: 'apporteur', status: 'active', reports: 1 },
    { id: 103, name: 'TechnoCorp', role: 'entreprise', status: 'active', reports: 0 }
  ]);

  const handleResolveDispute = (id, resolution) => {
    setDisputedContracts(disputedContracts.filter(c => c.id !== id));
    showAlert(`Litige résolu : ${resolution}. Les fonds ont été distribués en conséquence.`, 'success');
  };

  const handleBanUser = (id) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: 'banned' } : u));
    showAlert('Utilisateur suspendu de la plateforme Synapse.', 'error');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative font-sans text-slate-900">
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-8 flex flex-col shrink-0 md:h-screen md:sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 flex items-center justify-center shadow-sm">
            <Gavel size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">SYNAPSE</h1>
            <p className="text-indigo-600 font-semibold text-[10px] uppercase tracking-wide mt-1">Médiateur Global</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1 font-medium text-sm">
          <button onClick={() => setActiveTab('escrow')} className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all ${activeTab === 'escrow' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><FileLock2 size={20} strokeWidth={2} /> Litiges & Escrow</button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Users size={20} strokeWidth={2} /> Modération Profils</button>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Activity size={20} strokeWidth={2} /> Kpi & Flux API</button>
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center justify-center gap-3 text-rose-600 hover:bg-rose-50 font-semibold text-sm w-full p-4 rounded-xl transition-colors"><LogOut size={18} /> Déconnexion sécurisée</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 h-screen overflow-y-auto w-full relative">
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
          
          {activeTab === 'escrow' && (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                Médiation Escrow
              </h3>
              <p className="font-medium text-slate-500 text-sm mb-8">En tant qu'administrateur, vous avez l'autorité finale pour débloquer ou annuler les fonds gelés par un litige.</p>
              
              <div className="space-y-6">
                {disputedContracts.map(contract => (
                  <SoftCard key={contract.id} color="red" className="border border-rose-200 bg-rose-50/30">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldAlert className="text-rose-600" size={24} />
                          <h4 className="text-2xl font-bold text-slate-900">{contract.title}</h4>
                        </div>
                        <p className="font-medium text-slate-600 text-sm mb-6 flex items-center gap-2">Litige : <span className="bg-white border border-rose-200 text-rose-700 px-3 py-1.5 rounded-md text-xs font-semibold">{contract.reason}</span></p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
                            <p className="text-[10px] font-semibold uppercase text-slate-400 mb-1">Apporteur</p>
                            <p className="font-semibold text-slate-900">{contract.apporteur}</p>
                          </div>
                          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
                            <p className="text-[10px] font-semibold uppercase text-slate-400 mb-1">Freelance</p>
                            <p className="font-semibold text-slate-900">{contract.freelance}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-80 shrink-0 bg-white border border-rose-200 rounded-2xl p-6 md:p-8 text-center flex flex-col justify-center shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-800 mb-2">Fonds Gelés sur Escrow</p>
                        <p className="text-4xl font-bold text-slate-900 mb-8">{contract.amount} €</p>
                        <div className="space-y-3">
                          <SoftButton variant="black" className="w-full text-xs py-3 max-h-12 shadow-sm" onClick={() => handleResolveDispute(contract.id, 'Fonds libérés à l\'Apporteur')}>Forcer le Paiement</SoftButton>
                          <SoftButton variant="white" className="w-full text-xs text-rose-600 border-rose-200 hover:bg-rose-50 max-h-12 shadow-sm py-3" onClick={() => handleResolveDispute(contract.id, 'Remboursement Client')}>Rembourser Client</SoftButton>
                        </div>
                      </div>
                    </div>
                  </SoftCard>
                ))}
                {disputedContracts.length === 0 && (
                  <SoftCard color="green" className="text-center py-16 border border-emerald-200 bg-emerald-50/50">
                    <div className="w-20 h-20 bg-white border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                       <CheckCircle size={32} strokeWidth={2} className="text-emerald-500" />
                    </div>
                    <p className="font-bold text-2xl text-slate-900 mb-2">Aucun litige en cours</p>
                    <p className="font-medium text-slate-500">Tous les contrats sont sur les rails.</p>
                  </SoftCard>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">Modération Utilisateurs</h3>
              
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-5 border-b border-slate-200">Utilisateur</th>
                      <th className="p-5 border-b border-slate-200">Rôle</th>
                      <th className="p-5 border-b border-slate-200 text-center">Signalements</th>
                      <th className="p-5 border-b border-slate-200">Statut</th>
                      <th className="p-5 border-b border-slate-200">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-slate-700">
                    {usersList.map((u, i) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 border-b border-slate-100 font-bold text-slate-900">{u.name}</td>
                        <td className="p-5 border-b border-slate-100 capitalize">
                           <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${u.role === 'apporteur' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20' : u.role === 'entreprise' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'}`}>
                             {u.role}
                           </span>
                        </td>
                        <td className="p-5 border-b border-slate-100 text-center">
                           {u.reports > 0 ? <span className="inline-flex items-center justify-center w-6 h-6 bg-rose-50 ring-1 ring-inset ring-rose-600/20 text-rose-700 rounded-full text-xs font-bold">{u.reports}</span> : <span className="text-slate-400">0</span>}
                        </td>
                        <td className="p-5 border-b border-slate-100">
                          {u.status === 'active' ? <span className="text-emerald-600 flex items-center gap-1.5 font-semibold text-xs"><CheckCircle size={14}/> Actif</span> : <span className="text-rose-600 flex items-center gap-1.5 font-semibold text-xs"><XCircle size={14}/> Banni</span>}
                        </td>
                        <td className="p-5 border-b border-slate-100">
                          {u.status === 'active' ? (
                            <button className="text-rose-600 hover:text-rose-700 text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors shadow-sm" onClick={() => handleBanUser(u.id)}>Bannir</button>
                          ) : (
                            <span className="text-slate-400 text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 bg-slate-100 rounded-lg">Suspendu</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900">Flux Financiers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SoftCard title="Total Escrow Actuel" color="yellow" className="bg-indigo-50/30 border border-indigo-100">
                   <p className="text-4xl font-bold text-slate-900 mt-2">148 500 €</p>
                </SoftCard>
                <SoftCard title="Transactions Mensuelles" color="blue" className="bg-emerald-50/30 border border-emerald-100">
                   <p className="text-4xl font-bold text-slate-900 mt-2">420 K€</p>
                </SoftCard>
                <SoftCard title="Litiges Déclarés" color="red" className="bg-rose-50/30 border border-rose-100">
                   <p className="text-4xl font-bold text-slate-900 mt-2">2</p>
                </SoftCard>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

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
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row relative">
      <aside className="w-full md:w-72 bg-black text-white p-8 flex flex-col shrink-0 md:h-screen md:sticky top-0 z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-red-500 rounded-xl border-[3px] border-white flex items-center justify-center">
            <Gavel size={24} className="text-white" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Synapse</h1>
            <p className="text-red-400 font-bold text-xs uppercase tracking-widest">Médiateur Global</p>
          </div>
        </div>

        <nav className="space-y-4 flex-1">
          <button onClick={() => setActiveTab('escrow')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'escrow' ? 'bg-red-500 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-white' : 'hover:bg-gray-900 border-transparent text-gray-400'}`}><FileLock2 size={24} strokeWidth={3} /> Litiges & Escrow</button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'users' ? 'bg-red-500 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-white' : 'hover:bg-gray-900 border-transparent text-gray-400'}`}><Users size={24} strokeWidth={3} /> Modération Profils</button>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'stats' ? 'bg-red-500 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-white' : 'hover:bg-gray-900 border-transparent text-gray-400'}`}><Activity size={24} strokeWidth={3} /> Kpi & Flux API</button>
        </nav>

        <div className="mt-8 pt-8 border-t-[3px] border-gray-800">
          <button onClick={onLogout} className="flex items-center gap-4 text-gray-400 hover:text-white font-black uppercase text-sm w-full"><LogOut size={20} /> Déconnexion sécurisée</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 h-screen overflow-y-auto w-full relative">
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
          
          {activeTab === 'escrow' && (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-red-600">Médiation Escrow</h3>
              <p className="font-bold text-gray-500 mb-8">En tant qu'administrateur, vous avez l'autorité finale pour débloquer ou annuler les fonds gelés par un litige.</p>
              
              <div className="space-y-6">
                {disputedContracts.map(contract => (
                  <SoftCard key={contract.id} color="white" className="border-red-500 border-[4px] shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldAlert className="text-red-500" size={24} />
                          <h4 className="text-2xl font-black uppercase italic">{contract.title}</h4>
                        </div>
                        <p className="font-bold text-gray-600 text-sm mb-4">Litige : <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{contract.reason}</span></p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-gray-100 p-4 border-[3px] border-black rounded-[20px]">
                            <p className="text-[10px] font-black uppercase text-gray-500">Apporteur</p>
                            <p className="font-bold">{contract.apporteur}</p>
                          </div>
                          <div className="bg-gray-100 p-4 border-[3px] border-black rounded-[20px]">
                            <p className="text-[10px] font-black uppercase text-gray-500">Freelance</p>
                            <p className="font-bold">{contract.freelance}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-72 shrink-0 bg-[#FFF9C4] border-[3px] border-black rounded-[20px] p-6 text-center">
                        <p className="text-xs font-black uppercase mb-2">Fonds Gelés</p>
                        <p className="text-4xl font-black text-yellow-600 mb-6">{contract.amount} €</p>
                        <div className="space-y-3">
                          <SoftButton variant="black" className="w-full text-xs" onClick={() => handleResolveDispute(contract.id, 'Fonds libérés à l\'Apporteur')}>Forcer le Paiement</SoftButton>
                          <SoftButton variant="white" className="w-full text-xs text-red-500 border-red-500" onClick={() => handleResolveDispute(contract.id, 'Remboursement Client')}>Rembourser Client</SoftButton>
                        </div>
                      </div>
                    </div>
                  </SoftCard>
                ))}
                {disputedContracts.length === 0 && (
                  <SoftCard color="green" className="text-center py-12">
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                    <p className="font-black text-xl uppercase italic">Aucun litige en cours</p>
                    <p className="font-bold text-gray-600">Tous les contrats sont sur les rails.</p>
                  </SoftCard>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Modération Utilisateurs</h3>
              
              <div className="bg-white border-[4px] border-black rounded-[30px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-black text-white font-black uppercase italic text-sm">
                    <tr>
                      <th className="p-4 border-b-[3px] border-black border-r-[3px]">Utilisateur</th>
                      <th className="p-4 border-b-[3px] border-black border-r-[3px]">Rôle</th>
                      <th className="p-4 border-b-[3px] border-black border-r-[3px]">Signalements</th>
                      <th className="p-4 border-b-[3px] border-black border-r-[3px]">Statut</th>
                      <th className="p-4 border-b-[3px] border-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-sm">
                    {usersList.map((u, i) => (
                      <tr key={u.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-4 border-b-[3px] border-gray-200 border-r-[3px] border-black">{u.name}</td>
                        <td className="p-4 border-b-[3px] border-gray-200 border-r-[3px] border-black capitalize">{u.role}</td>
                        <td className="p-4 border-b-[3px] border-gray-200 border-r-[3px] border-black text-center">{u.reports > 0 ? <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full">{u.reports}</span> : '0'}</td>
                        <td className="p-4 border-b-[3px] border-gray-200 border-r-[3px] border-black">
                          {u.status === 'active' ? <span className="text-green-600 flex items-center gap-1"><CheckCircle size={14}/> Actif</span> : <span className="text-red-600 flex items-center gap-1"><XCircle size={14}/> Banni</span>}
                        </td>
                        <td className="p-4 border-b-[3px] border-gray-200">
                          {u.status === 'active' ? (
                            <button className="text-red-500 hover:underline uppercase text-xs font-black" onClick={() => handleBanUser(u.id)}>Bannir</button>
                          ) : (
                            <span className="text-gray-400 uppercase text-xs font-black">Suspendu</span>
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
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Flux Financiers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SoftCard title="Total Escrow Actuel" color="yellow" className="!bg-[#FFF9C4]">
                   <p className="text-4xl font-black italic">148 500 €</p>
                </SoftCard>
                <SoftCard title="Transactions Mensuelles" color="blue" className="!bg-[#E3F2FD]">
                   <p className="text-4xl font-black italic">420 K€</p>
                </SoftCard>
                <SoftCard title="Litiges Déclarés" color="red">
                   <p className="text-4xl font-black italic">2</p>
                </SoftCard>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

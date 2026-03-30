import React, { useState } from 'react';
import { Zap, LayoutDashboard, MessageSquare, Wallet, LogOut, CheckCircle, Component, ChevronRight, Send, X, Check, Star, ShieldCheck, Clock, Plus, Inbox, Target, Search } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const FreelanceDashboard = ({ onLogout }) => {
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState('home');
  const [invitations, setInvitations] = useState([
    {
      id: 99,
      title: 'Création Landing Page E-commerce',
      client: 'Beta Finance',
      agent: 'Marc D.',
      budget: '1 000 €',
      status: 'active',
      escrow: true,
      duration: 2,
      desc: "Développement d'une landing page responsive avec intégration Stripe."
    },
    {
       id: 100,
       title: 'Refonte App Client MERN',
       client: 'Alpha Solutions',
       agent: 'Julie L.',
       budget: '4 500 €',
       status: 'active',
       escrow: true,
       duration: 10,
       desc: "Création de la base React Native pour le nouveau portail."
    }
  ]);
  
  const handleAcceptContract = (invitationId) => {
    const inv = invitations.find(i => i.id === invitationId);
    if(inv) {
       setTasks([{ ...inv, hoursTracked: 0 }, ...tasks]);
       setInvitations(invitations.filter(i => i.id !== invitationId));
       
       const newProjectChat = {
         id: `proj_${inv.id}_${Date.now()}`,
         type: 'project',
         sender: `${inv.agent} & ${inv.client}`,
         role: 'Groupe de Suivi',
         title: inv.title,
         messages: [
           { 
             text: `Bonjour ! Bienvenue dans le groupe de suivi. L'Entreprise a sécurisé les fonds Escalade, vous pouvez commencer votre mission.`, 
             sender: inv.agent, 
             time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) 
           }
         ]
       };
       setInbox([newProjectChat, ...inbox]);
       
       showAlert("🚀 Mission acceptée ! Elle a été ajoutée à vos tâches et le groupe de discussion a été créé !", "success");
    }
  };
  
  const handleDeclineContract = (invitationId) => {
     setInvitations(invitations.filter(i => i.id !== invitationId));
     showAlert("Offre déclinée. L'apporteur a été notifié.", "info");
  };
  const [user, setUser] = useState({ firstName: 'Paul', lastName: 'M.', role: 'Expert Frontend' });
  const [isAvailable, setIsAvailable] = useState(true);

  const [inbox, setInbox] = useState([
    {
      id: 'dm_1',
      type: 'dm',
      sender: 'Marc D.',
      role: 'Apporteur d\'Affaires',
      title: 'Création Landing Page E-commerce',
      messages: [
        { text: "Salut Paul ! J'ai un client (Beta Finance) qui cherche un Dév Front pour une landing page e-commerce. Ça te dit ? TJM de 500€ sur 2 jours.", sender: 'Marc D.', time: '09:12' }
      ]
    }
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [reviewModal, setReviewModal] = useState(null);

  const [apporteurs, setApporteurs] = useState([
    { id: 201, name: 'Marc D.', role: 'Apporteur Senior', rating: 4.8, initial: 'MD', avatar: 12, bio: "Spécialisé dans le staffing Tech (React/Node) avec de grands comptes E-commerce. J'aime l'efficacité et les talents francs.", clients: "Beta Finance, E-shopper", pipelineSize: "15 talents actifs" },
    { id: 202, name: 'Julie L.', role: 'Agent de Talents', rating: 4.9, initial: 'JL', avatar: 15, bio: "Secteur bancaire et Retail. Je vous obtiens les TJM les plus élevés du marché, mais je suis intraitable sur les deadlines.", clients: "Gamma Retail, BNP", pipelineSize: "8 talents d'élite" }
  ]);
  const [selectedApporteur, setSelectedApporteur] = useState(null);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Intégration API de Paiement', client: 'Alpha Solutions', agent: 'Marc D.', budget: '1 200 €', status: 'active', escrow: true, duration: 3, hoursTracked: 4, desc: "Connexion du backend Node à l'API Stripe Connect." },
    { id: 2, title: 'Refonte UI Mobile', client: 'Gamma Retail', agent: 'Julie L.', budget: '2 300 €', status: 'completed', rating: 5, review: 'Super développeur, très pro !', duration: 5, hoursTracked: 35, desc: "Refonte complète de l'interface utilisateur mobile." },
    { id: 3, title: 'Correction Bugs React', client: 'StartUp Paris', agent: 'Julie L.', budget: '800 €', status: 'pending_verification', escrow: true, duration: 2, hoursTracked: 14, desc: "Fix des problèmes de state management." }
  ]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans relative">
      <aside className="w-full md:w-80 bg-white border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-gray-200 p-8 flex flex-col space-y-10 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white border-[1.5px] border-gray-200 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1.5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-2 font-semibold text-sm">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'home' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><LayoutDashboard size={20} /> Accueil</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'messagerie' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Inbox size={20} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'finance' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Wallet size={20} /> Finance</button>
           <button onClick={() => setActiveTab('missions')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'missions' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><CheckCircle size={20} /> Mes Missions</button>
           <button onClick={() => setActiveTab('reseau')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'reseau' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Target size={20} /> Réseau Synapse</button>
           
           <div className="h-px bg-gray-200 my-4" />
           <button onClick={onLogout} className="flex items-center justify-center gap-2 w-full p-4 hover:bg-red-50 text-red-600 rounded-2xl transition-all"><LogOut size={18} /> Déconnexion</button>
        </nav>

        <div className="pt-8 border-t-[1.5px] border-gray-100 space-y-4">
           <div className="p-5 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl flex flex-col gap-4">
             <div className="flex items-center justify-between gap-4">
               <div className="font-semibold text-sm text-gray-700 flex-1">Statut:</div>
               <button onClick={() => setIsAvailable(!isAvailable)} className={`relative w-12 h-6 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-300'} flex items-center px-1`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </button>
             </div>
             <p className="text-[11px] font-medium text-gray-500 text-center bg-white py-1.5 rounded-lg border-[1.5px] border-gray-100">{isAvailable ? 'Disponible pour missions' : 'Actuellement Indisponible'}</p>
           </div>
        </div>
      </aside>

      {/* Apporteur Profile Modal */}
      {selectedApporteur && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="max-w-2xl w-full animate-in zoom-in-95 duration-300">
             <SoftCard title="Profil du Représentant" className="relative shadow-2xl border-[1.5px] border-gray-200">
               <button 
                 onClick={() => setSelectedApporteur(null)}
                 className="absolute top-6 right-6 w-10 h-10 border-[1.5px] border-gray-200 rounded-full flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
               >
                 <X size={20} strokeWidth={2} />
               </button>
               
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="w-24 h-24 border-[1.5px] border-gray-200 rounded-2xl bg-yellow-50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedApporteur.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                 </div>
                 <div className="text-center md:text-left">
                   <h3 className="text-3xl font-bold text-gray-900">{selectedApporteur.name}</h3>
                   <p className="font-semibold text-blue-600 text-sm tracking-wide mt-1">{selectedApporteur.role}</p>
                   <p className="font-bold text-yellow-500 text-lg flex items-center gap-2 justify-center md:justify-start mt-2"><Star fill="currentColor" size={20} /> {selectedApporteur.rating}/5 Avis</p>
                 </div>
               </div>
               <div className="bg-gray-50 border-[1.5px] border-gray-200 p-6 rounded-2xl mb-8 text-left">
                 <p className="font-medium text-gray-700 italic">"{selectedApporteur.bio}"</p>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-8">
                 <SoftBadge color="blue" className="text-center font-semibold bg-blue-50 text-blue-700 border-blue-200">Clients: {selectedApporteur.clients}</SoftBadge>
                 <SoftBadge color="purple" className="text-center font-semibold bg-purple-50 text-purple-700 border-purple-200">{selectedApporteur.pipelineSize}</SoftBadge>
               </div>
               
               <SoftButton variant="yellow" className="w-full text-lg py-4 shadow-sm border-yellow-300" onClick={() => {
                 const newConversation = {
                    id: `dm_${Date.now()}`,
                    type: 'dm_demande',
                    sender: selectedApporteur.name,
                    role: selectedApporteur.role,
                    title: 'Demande de représentation',
                    messages: [
                      { text: `Bonjour ${selectedApporteur.name}, je suis à la recherche de nouvelles opportunités. Seriez-vous intéressé par mon profil pour l'intégrer à votre vivier Synapse ?`, sender: 'Moi', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) }
                    ]
                 };
                 const updatedApporteurs = apporteurs.filter(a => a.id !== selectedApporteur.id);
                 setApporteurs(updatedApporteurs);
                 setInbox([newConversation, ...inbox]);
                 setActiveChat(newConversation);
                 setActiveTab('messagerie');
                 showAlert(`📨 Demande envoyée ! L'apporteur ${selectedApporteur.name} vient d'être contacté.`, "success");
                 setSelectedApporteur(null);
               }}><Send size={18} className="inline mr-2" /> Demander une représentation (DM)</SoftButton>
             </SoftCard>
           </div>
         </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="max-w-xl w-full animate-in zoom-in-95 duration-300">
            <SoftCard title={`Évaluer l'Apporteur : ${reviewModal.agent}`} color="purple" className="relative shadow-2xl border-[1.5px] border-gray-200">
              <div className="space-y-6">
                 <p className="font-medium text-gray-700">Félicitations pour cette mission terminée ! Partagez votre avis sur l'accompagnement de cet Apporteur d'Affaires.</p>
                 <div className="space-y-2">
                   <div className="flex gap-3 text-yellow-400 justify-center mb-4">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`rev_star_${star}`} fill={star <= reviewModal.rating ? 'currentColor' : 'none'} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setReviewModal({...reviewModal, rating: star})} size={40} />
                     ))}
                   </div>
                 </div>
                 <div className="space-y-2">
                   <textarea rows={3} value={reviewModal.comment} onChange={(e) => setReviewModal({...reviewModal, comment: e.target.value})} className="w-full border-[1.5px] border-gray-200 rounded-xl p-4 font-medium text-gray-900 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 ring-purple-50 transition-all placeholder:text-gray-400" placeholder="Excellent suivi commercial, TJM respecté..." />
                 </div>
                 <div className="flex gap-3 pt-6 border-t-[1.5px] border-gray-100">
                    <SoftButton variant="white" className="flex-1 shadow-sm rounded-xl py-3" onClick={() => setReviewModal(null)}>Ignorer</SoftButton>
                    <SoftButton variant="purple" className="flex-1 shadow-sm rounded-xl py-3 border-purple-300" onClick={() => {
                        setTasks(tasks.map(t => t.id === reviewModal.id ? {...t, hasReviewedApporteur: true} : t));
                        setReviewModal(null);
                        showAlert("✅ Merci ! Votre avis public a été ajouté au profil de l'Apporteur.", "success");
                    }}>Publier l'Avis</SoftButton>
                 </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 md:p-12 h-screen overflow-y-auto w-full relative">
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
           {activeTab === 'home' && (
             <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-[1.5px] border-gray-200 pb-12 relative">
                 <div className="space-y-2">
                   <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-none">Hello, <span className="text-purple-600 decoration-purple-300 underline decoration-4 underline-offset-4">{user?.firstName || 'Paul'}</span> !</h2>
                   <p className="font-semibold text-gray-500 uppercase text-[11px] tracking-wide mt-4">Freelance Expert • Profil complété à 100%</p>
                 </div>
               </div>

               {invitations.length > 0 && (
                 <div className="space-y-6">
                   <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
                     <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse border-[1.5px] border-red-200" />
                     Propositions de l'équipe Synapse ({invitations.length})
                   </h3>
                   {invitations.map(inv => (
                     <div key={inv.id} className="bg-gray-900 text-white border-[1.5px] border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                       <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-6 xl:gap-8 relative z-10 w-full">
                         <div className="space-y-2 flex-1 min-w-0">
                           <SoftBadge color="purple" className="border-purple-400/50 bg-white/10 text-white backdrop-blur-sm">Nouvelle Opportunité</SoftBadge>
                           <h3 className="text-2xl md:text-3xl font-bold mt-3 md:truncate whitespace-normal leading-tight text-white">{inv.title}</h3>
                           <p className="font-medium text-gray-400 text-sm truncate mt-1">Apporteur : {inv.agent} • Client : {inv.client}</p>
                           <div className="flex items-center gap-4 pt-3">
                             <span className="text-3xl font-bold text-purple-300">{inv.budget}</span>
                             <span className="text-xs font-semibold text-gray-400 uppercase hidden sm:inline px-3 py-1 bg-white/5 rounded-full backdrop-blur-md">TJM sécurisé sur Escrow</span>
                           </div>
                         </div>
                         <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto shrink-0 mt-4 xl:mt-0">
                           <SoftButton variant="white" className="flex-1 sm:flex-none py-3.5 px-6 text-gray-900 font-semibold" onClick={() => handleDeclineContract(inv.id)}>Décliner</SoftButton>
                           <SoftButton variant="purple" className="flex-1 sm:flex-none py-3.5 px-6 shadow-sm border-purple-400" onClick={() => handleAcceptContract(inv.id)}><Check size={16} className="inline mr-2 shrink-0" /> <span className="truncate">Accepter & Sécuriser</span></SoftButton>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <SoftCard title="Revenus Générés" color="yellow" icon={Wallet} className="bg-yellow-50/50 border-[1.5px] border-yellow-200">
                   <p className="text-4xl font-bold text-gray-900">14 200 €</p>
                 </SoftCard>
                 <SoftCard title="Sécurisé (Escrow)" color="green" icon={ShieldCheck} className="bg-green-50/50 border-[1.5px] border-green-200">
                   <p className="text-4xl font-bold text-gray-900">1 000 €</p>
                   <p className="text-[10px] font-semibold uppercase mt-3 tracking-wide text-green-700 bg-green-100/50 inline-block px-2 py-1 rounded-md">Mission Active</p>
                 </SoftCard>
                 <SoftCard title="Ma Note" color="purple" icon={Star} className="bg-purple-50/50 border-[1.5px] border-purple-200">
                   <div className="flex items-center gap-2">
                     <p className="text-4xl font-bold text-gray-900">4.9</p>
                     <Star fill="currentColor" size={28} className="text-purple-600 mb-1"/>
                   </div>
                   <p className="text-[10px] font-semibold uppercase mt-3 tracking-wide text-purple-700 bg-purple-100/50 inline-block px-2 py-1 rounded-md">Basé sur 12 avis</p>
                 </SoftCard>
               </div>

               <div className="mt-16">
                  <h4 className="text-xl font-bold text-gray-900 border-b-[1.5px] border-gray-200 pb-4 mb-8">Mon Portfolio Synapse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SoftCard className="p-0 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform border-[1.5px] border-gray-200 hover:border-gray-300 hover:shadow-md">
                      <div className="h-32 bg-yellow-50 border-b-[1.5px] border-gray-200 flex items-center justify-center">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Ecommerce" alt="M" className="w-16 h-16 opacity-80" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-gray-900 text-lg mb-1">Dashboard Admin</h5>
                        <p className="text-sm font-medium text-gray-500">React • TailwindCSS</p>
                      </div>
                    </SoftCard>
                    <SoftCard className="p-0 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform border-[1.5px] border-gray-200 hover:border-gray-300 hover:shadow-md">
                      <div className="h-32 bg-blue-50 border-b-[1.5px] border-gray-200 flex items-center justify-center">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=MobileApp" alt="M" className="w-16 h-16 opacity-80" />
                      </div>
                      <div className="p-5">
                        <h5 className="font-bold text-gray-900 text-lg mb-1">App Mobile Santé</h5>
                        <p className="text-sm font-medium text-gray-500">React Native • Expo</p>
                      </div>
                    </SoftCard>
                    <SoftCard className="p-0 overflow-hidden flex items-center justify-center bg-gray-50 border-dashed border-[1.5px] border-gray-200 hover:bg-white transition-colors cursor-pointer text-gray-400 hover:text-gray-600 min-h-[190px]">
                       <div className="text-center">
                         <Plus size={32} className="mx-auto mb-3" />
                         <span className="font-semibold text-sm">Ajouter Projet</span>
                       </div>
                    </SoftCard>
                  </div>
                </div>
             </div>
           )}

           {activeTab === 'reseau' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-[1.5px] border-gray-200 pb-8">
                 <div className="space-y-2">
                   <h3 className="text-3xl font-bold tracking-tight text-gray-900">Annuaire Apporteurs</h3>
                   <p className="font-medium text-gray-500 text-sm">Trouvez un agent pour vous placer sur des missions d'exception.</p>
                 </div>
                 <SoftButton variant="black" className="rounded-xl px-6 py-2.5 shadow-sm"><Search size={16} className="mr-2 inline" /> Filtrer</SoftButton>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {apporteurs.map(ag => (
                     <SoftCard key={ag.id} className="cursor-pointer hover:-translate-y-1 transition-transform group hover:border-purple-200 hover:shadow-md border-[1.5px]" onClick={() => setSelectedApporteur(ag)}>
                        <div className="flex gap-5 items-center mb-6 border-b-[1.5px] border-gray-100 pb-5">
                           <div className="w-16 h-16 border-[1.5px] border-gray-200 rounded-2xl bg-yellow-50 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ag.avatar}`} className="w-full h-full object-cover" />
                           </div>
                           <div className="overflow-hidden flex-1">
                              <h4 className="font-bold text-xl text-gray-900 group-hover:text-purple-700 transition-colors truncate">{ag.name}</h4>
                              <p className="font-semibold text-xs text-purple-600 tracking-wide mt-1">{ag.role}</p>
                           </div>
                        </div>
                        <p className="font-medium text-sm text-gray-600 line-clamp-3 mb-6 bg-gray-50 p-4 rounded-xl border-[1.5px] border-gray-100 italic">"{ag.bio}"</p>
                        <SoftButton variant="white" className="w-full text-sm shadow-sm hover:bg-gray-50 transition-colors border-[1.5px]"><Star size={16} fill="currentColor" className="text-yellow-500 mr-2 inline" /> {ag.rating}/5 • Voir Profil</SoftButton>
                     </SoftCard>
                  ))}
               </div>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300 h-full">
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm border-b-[1.5px] border-gray-200 pb-2 text-orange-600">⏳ Demandes Envoyées</h4>
                    {inbox.filter(chat => chat.type === 'dm_demande').length > 0 ? inbox.filter(chat => chat.type === 'dm_demande').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[1.5px] border-gray-200 rounded-2xl cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-white hover:border-orange-200 hover:shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-bold text-gray-900 text-sm truncate">{chat.sender}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wide">En attente de réponse</p>
                      </div>
                    )) : <p className="text-xs font-medium text-gray-400 italic">Aucune demande en attente.</p>}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm border-b-[1.5px] border-gray-200 pb-2 text-purple-600">🤝 Mes Représentants (Apporteurs)</h4>
                    {inbox.filter(chat => chat.type === 'dm').length > 0 ? inbox.filter(chat => chat.type === 'dm').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[1.5px] border-gray-200 rounded-2xl cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-purple-50 border-purple-200 shadow-sm' : 'bg-white hover:border-purple-200 hover:shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-bold text-gray-900 text-sm">{chat.sender}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-1">{chat.role}</p>
                        <p className="text-xs font-medium text-gray-500 truncate">{chat.title}</p>
                      </div>
                    )) : <p className="text-xs font-medium text-gray-400 italic">Aucun représentant actif.</p>}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm border-b-[1.5px] border-gray-200 pb-2 text-green-600">🛠 Groupes Projets Actifs</h4>
                    {inbox.filter(chat => chat.type === 'project').length > 0 ? inbox.filter(chat => chat.type === 'project').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[1.5px] border-gray-200 rounded-2xl cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white hover:border-green-200 hover:shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-gray-900 text-sm">{chat.title}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">{chat.sender}</p>
                      </div>
                    )) : <p className="text-xs font-medium text-gray-400 italic">Aucun projet en cours.</p>}
                  </div>

                </div>

                <div className="w-full md:w-2/3 h-[600px] xl:h-[700px] flex flex-col">
                  {!activeChat ? (
                    <SoftCard className="flex-1 flex flex-col items-center justify-center text-center border-[1.5px]">
                       <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                          <MessageSquare size={32} />
                       </div>
                       <p className="font-semibold text-lg text-gray-400">Sélectionnez une discussion</p>
                    </SoftCard>
                  ) : (
                    <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
                       <header className="bg-white border-b-[1.5px] border-gray-200 px-6 py-4 flex justify-between items-center z-10 shrink-0">
                         <div>
                           <h3 className="text-xl font-bold text-gray-900 truncate">{activeChat.title}</h3>
                           <p className="font-medium text-gray-500 truncate text-sm mt-0.5">Avec {activeChat.sender} ({activeChat.role})</p>
                         </div>
                       </header>
                       <div className="bg-purple-50/50 py-2.5 text-center border-b-[1.5px] border-purple-100 font-medium text-xs text-purple-700 shrink-0">
                         Espace sécurisé Synapse
                       </div>
                       <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 relative">
                         {activeChat.messages.map((msg, idx) => (
                           <div key={idx} className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'Paul' || msg.sender === 'Moi' ? 'ml-auto' : ''}`}>
                             <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 px-2 ${msg.sender === 'Paul' || msg.sender === 'Moi' ? 'text-right text-gray-400' : 'text-gray-400'}`}>{msg.sender === 'Moi' ? 'Vous' : msg.sender} • {msg.time}</p>
                             <div className={`p-4 rounded-2xl font-medium shadow-sm text-sm leading-relaxed ${msg.sender === 'Paul' || msg.sender === 'Moi' ? 'bg-purple-600 text-white rounded-br-sm' : 'bg-white border-[1.5px] border-gray-200 text-gray-800 rounded-bl-sm'}`}>
                               {msg.text}
                             </div>
                           </div>
                         ))}
                       </div>
                       <div className="p-5 bg-white border-t-[1.5px] border-gray-200 flex gap-3 items-center shrink-0">
                         <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && chatInput.trim()) {
                             const newMsg = { text: chatInput, sender: 'Moi', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
                             setActiveChat({...activeChat, messages: [...activeChat.messages, newMsg]});
                             setChatInput('');
                           } }} placeholder="Écrire un message..." className="flex-1 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl px-5 py-3.5 font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 ring-purple-50 transition-all" />
                         <SoftButton variant="purple" className="px-6 py-3.5 rounded-xl shadow-sm" onClick={() => {
                           if(chatInput.trim()) {
                             const newMsg = { text: chatInput, sender: 'Moi', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
                             setActiveChat({...activeChat, messages: [...activeChat.messages, newMsg]});
                             setChatInput('');
                           }
                         }}><Send size={18} /></SoftButton>
                       </div>
                    </div>
                  )}
                </div>
             </div>
           )}

           {activeTab === 'missions' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Mes Missions</h3>
               
               <div className="space-y-6">
                 {tasks.map(mission => (
                   <SoftCard key={mission.id} color={mission.status === 'active' ? 'purple' : 'white'} className={mission.status === 'active' ? 'bg-purple-50/50 border-purple-200' : ''}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                          <div className="flex gap-2 items-center">
                            {mission.status === 'active' && <SoftBadge color="yellow">En cours</SoftBadge>}
                            {mission.status === 'completed' && <SoftBadge color="green">Mission Terminée</SoftBadge>}
                            <SoftBadge color="blue" className="bg-blue-50 text-blue-700 border-blue-200">{mission.type || 'Web / Mobile'}</SoftBadge>
                          </div>
                          <h4 className="font-bold text-2xl text-gray-900">{mission.title}</h4>
                          <p className="font-medium text-gray-500 text-sm">Apporteur : {mission.agent} • Client Final : {mission.client}</p>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end">
                          <p className="font-bold text-3xl text-gray-900 mb-2">{mission.budget}</p>
                          <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1 uppercase tracking-wide">
                            <ShieldCheck size={14}/> {mission.escrow ? 'Sécurisé Escrow' : 'Paiement Direct'}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-600 max-w-2xl mt-4 border-l-[3px] border-purple-200 pl-4 py-1 mb-6 text-sm">
                        "{mission.desc}"
                      </p>
                      
                      {mission.status === 'active' && (
                        <div className="bg-green-50/50 border-[1.5px] border-green-200 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-sm text-green-800">Time Tracking Synapse</span>
                              <span className="font-bold text-green-700">{mission.hoursTracked || 0}h / {mission.duration * 7}h max</span>
                            </div>
                            <div className="h-3 bg-white border-[1.5px] border-green-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-400 transition-all rounded-full" style={{ width: `${Math.min(100, ((mission.hoursTracked || 0) / (mission.duration * 7)) * 100)}%` }}></div>
                            </div>
                          </div>
                          <SoftButton variant="black" className="shrink-0 px-6 py-2.5 max-h-12 shadow-sm" onClick={() => {
                            const newH = (mission.hoursTracked || 0) + 4;
                            setTasks(tasks.map(t => t.id === mission.id ? {...t, hoursTracked: newH} : t));
                             if (newH >= mission.duration * 7) showAlert("Objectif de facturation atteint ! L'Apporteur vient d'être notifié pour débloquer le jalon.", "info");
                           }}>
                            <Clock size={16} className="mr-2 inline" /> Pointer 4h
                          </SoftButton>
                        </div>
                      )}

                      {mission.status === 'active' && (
                         <div className="flex flex-col md:flex-row gap-4 mt-6 pt-6 border-t-[1.5px] border-gray-100 border-dashed">
                            <SoftButton variant="white" className="flex-1 text-red-600 hover:bg-red-50 text-sm shadow-sm border-red-200" onClick={() => {
                              setTasks(tasks.map(t => t.id === mission.id ? {...t, status: 'disputed'} : t));
                              showAlert("⚠️ Contrat gelé informatiquement. Un médiateur Synapse va rentrer dans la boucle pour vous protéger.", "error");
                            }}>
                              <ShieldCheck size={16} className="mr-2 inline" /> Signaler Un Problème
                            </SoftButton>
                            <SoftButton variant="purple" className="flex-1 text-sm shadow-sm border-purple-300" onClick={() => {
                              setTasks(tasks.map(t => t.id === mission.id ? {...t, status: 'pending_verification'} : t));
                              showAlert("✅ Fin de mission annoncée à l'apporteur ! Demande de libération des fonds Escrow envoyée.", "success");
                            }}>
                              <CheckCircle size={16} className="mr-2 inline" /> Annoncer Fin de Tâche
                            </SoftButton>
                         </div>
                       )}

                       {mission.status === 'disputed' && (
                         <div className="bg-red-50 border-[1.5px] border-red-200 rounded-2xl p-6 mt-6">
                           <h4 className="font-bold text-red-600 flex items-center gap-2 mb-2"><X size={20} /> Mission Gelée (Surexploitation/Abus)</h4>
                           <p className="font-medium text-red-700 text-sm opacity-90">Vous avez émis un signalement, le système a bloqué les actions sur l'Escrow de l'Entreprise. Un agent du support Synapse prend le relais très rapidement.</p>
                         </div>
                       )}

                       {mission.status === 'pending_verification' && (
                         <div className="bg-yellow-50 border-[1.5px] border-yellow-200 rounded-2xl p-6 mt-6 shadow-sm">
                           <h4 className="font-bold text-yellow-700 flex items-center gap-2 mb-2"><CheckCircle size={20} /> Vérification en cours</h4>
                           <p className="font-medium text-yellow-800 text-sm opacity-90">Fin de mission annoncée. En attente du feu vert du client final pour le virement vers votre compte !</p>
                         </div>
                       )}

                      {mission.status === 'completed' && (
                        <div className="mt-6 pt-6 border-t-[1.5px] border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div className="flex items-center gap-2 text-yellow-400 mb-1">
                              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < mission.rating ? 'currentColor' : 'none'} strokeWidth={2} />)}
                            </div>
                            <p className="font-medium italic text-gray-500 text-sm">Avis Client : "{mission.review}"</p>
                          </div>
                          {!mission.hasReviewedApporteur ? (
                             <SoftButton variant="yellow" className="w-full text-sm shadow-sm bg-yellow-400/20 text-yellow-800 border-yellow-300 hover:bg-yellow-400/30 font-semibold" onClick={() => setReviewModal({...mission, rating: 5, comment: ''})}>
                               <Star size={16} fill="currentColor" className="mr-2 inline" /> Évaluer {mission.agent} (Apporteur)
                             </SoftButton>
                          ) : (
                             <p className="w-full text-center text-sm font-semibold text-green-700 bg-green-50 py-3 rounded-xl border-[1.5px] border-green-200">✅ Vous avez recommandé {mission.agent}</p>
                          )}
                        </div>
                      )}
                    </SoftCard>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'finance' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Mon Portefeuille</h3>
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Sécurisé en Escrow (TJM)" color="yellow" className="bg-yellow-50/50 border-[1.5px] border-yellow-200">
                   <p className="text-4xl font-bold text-gray-900">{tasks.filter(t => ['active', 'pending_verification', 'disputed'].includes(t.status)).reduce((acc, t) => acc + parseInt(t.budget.replace(/\D/g, '') || 0), 0).toLocaleString('fr-FR')} €</p>
                   <p className="text-sm font-semibold mt-2 text-yellow-700">Revenus des missions actives (À débloquer)</p>
                 </SoftCard>
                 <SoftCard title="Revenus Débloqués (Viré)" color="green" className="bg-green-50/50 border-[1.5px] border-green-200">
                   <p className="text-4xl font-bold text-gray-900">{(14200 + tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + parseInt(t.budget.replace(/\D/g, '') || 0), 0)).toLocaleString('fr-FR')} €</p>
                   <p className="text-sm font-semibold mt-2 text-green-700">Historique cumulé des virements Synapse</p>
                 </SoftCard>
               </div>

               <SoftCard title="Derniers Mouvements Actifs du Portefeuille">
                 <div className="space-y-4">
                   {tasks.map(t => (
                     <div key={`fin_${t.id}`} className="border-[1.5px] border-gray-200 rounded-2xl p-5 bg-white flex flex-col md:flex-row justify-between items-center md:items-start gap-4 hover:shadow-sm transition-all hover:border-gray-300">
                       <div>
                         <h4 className="font-bold text-lg text-gray-900 mb-1">{t.title}</h4>
                         <p className="text-sm font-medium text-gray-500">Apporteur : {t.agent}</p>
                       </div>
                       <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-end items-center md:items-end gap-2">
                         <p className={`font-bold text-2xl ${t.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{t.budget}</p>
                         <p className={`text-[10px] uppercase font-semibold text-${t.status === 'completed' ? 'green' : 'yellow'}-700 bg-${t.status === 'completed' ? 'green' : 'yellow'}-50 px-2 py-1 rounded-md border-[1.5px] border-${t.status === 'completed' ? 'green' : 'yellow'}-200`}>
                           {t.status === 'completed' ? 'Fonds Libérés (Payé)' : 'Verrouillé (Escrow)'}
                         </p>
                       </div>
                     </div>
                   ))}
                   {tasks.length === 0 && <p className="text-sm font-medium text-gray-400 italic p-6 text-center border-[1.5px] border-gray-100 border-dashed rounded-xl">Aucune transaction répertoriée.</p>}
                 </div>
               </SoftCard>
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

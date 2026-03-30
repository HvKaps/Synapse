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
      <aside className="w-full md:w-80 bg-white border-b-[4px] md:border-b-0 md:border-r-[4px] border-black p-8 flex flex-col space-y-12 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1" />
          </div>
          <span className="font-black text-2xl tracking-tighter">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-4 font-black uppercase italic text-sm">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'home' ? 'bg-[#CE93D8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><LayoutDashboard size={20} /> Accueil</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'messagerie' ? 'bg-[#CE93D8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Inbox size={20} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'finance' ? 'bg-[#CE93D8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Wallet size={20} /> Finance</button>
           <button onClick={() => setActiveTab('missions')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'missions' ? 'bg-[#CE93D8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><CheckCircle size={20} /> Mes Missions</button>
           <button onClick={() => setActiveTab('reseau')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'reseau' ? 'bg-[#CE93D8] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Target size={20} /> Réseau Synapse</button>
           
           <div className="h-px bg-black opacity-10 my-4" />
           <button onClick={onLogout} className="flex items-center gap-5 w-full p-4 hover:bg-red-50 text-red-500 border-[3px] border-transparent hover:border-red-500 rounded-[25px] transition-all"><LogOut size={20} /> Déconnexion</button>
        </nav>

        <div className="pt-8 border-t-[3px] border-black space-y-6">
           <div className="p-5 bg-white border-[3px] border-black rounded-[30px] flex flex-col gap-4">
             <div className="flex items-center gap-4">
               <div className="font-black text-sm uppercase tracking-widest flex-1">Statut:</div>
               <button onClick={() => setIsAvailable(!isAvailable)} className={`relative w-16 h-8 rounded-full border-[3px] border-black transition-colors ${isAvailable ? 'bg-green-400' : 'bg-red-400'} flex items-center px-1`}>
                  <div className={`w-5 h-5 bg-white border-[2px] border-black rounded-full transition-transform ${isAvailable ? 'translate-x-8' : 'translate-x-0'}`}></div>
               </button>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase text-center">{isAvailable ? 'Disponible pour missions' : 'Actuellement Indisponible'}</p>
           </div>
        </div>
      </aside>

      {/* Apporteur Profile Modal */}
      {selectedApporteur && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
           <div className="max-w-2xl w-full">
             <SoftCard title="Profil de l'Apporteur" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px]">
               <button 
                 onClick={() => setSelectedApporteur(null)}
                 className="absolute top-8 right-8 w-12 h-12 border-[3px] border-black rounded-full flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 transition-colors"
               >
                 <X size={24} strokeWidth={3} />
               </button>
               
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <div className="w-24 h-24 border-[3px] border-black rounded-2xl bg-[#FFEB3B] flex items-center justify-center overflow-hidden shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedApporteur.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                 </div>
                 <div className="text-center md:text-left">
                   <h3 className="text-4xl font-black uppercase italic">{selectedApporteur.name}</h3>
                   <p className="font-bold text-gray-500 uppercase tracking-widest">{selectedApporteur.role}</p>
                   <p className="font-black text-yellow-500 text-xl flex items-center gap-2 justify-center md:justify-start mt-2"><Star fill="currentColor" size={20} /> {selectedApporteur.rating}/5 Avis</p>
                 </div>
               </div>
               <div className="bg-[#FAFAFA] border-[3px] border-black p-6 rounded-[20px] mb-8 text-left">
                 <p className="font-bold text-lg italic tracking-tight">"{selectedApporteur.bio}"</p>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-8">
                 <SoftBadge color="blue" className="text-center">Clients: {selectedApporteur.clients}</SoftBadge>
                 <SoftBadge color="purple" className="text-center">{selectedApporteur.pipelineSize}</SoftBadge>
               </div>
               
               <SoftButton variant="yellow" className="w-full text-xl py-6 tracking-tighter shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" onClick={() => {
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
               }}><Send size={20} className="inline mr-2" /> Demander une représentation (DM)</SoftButton>
             </SoftCard>
           </div>
         </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
          <div className="max-w-xl w-full animate-in zoom-in duration-300">
            <SoftCard title={`Évaluer l'Apporteur : ${reviewModal.agent}`} color="purple" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px]">
              <div className="space-y-6">
                 <p className="font-bold text-gray-700">Félicitations pour cette mission terminée ! Partagez votre avis sur l'accompagnement de cet Apporteur d'Affaires.</p>
                 <div className="space-y-2">
                   <div className="flex gap-2 text-yellow-500 justify-center mb-4">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`rev_star_${star}`} fill={star <= reviewModal.rating ? 'currentColor' : 'none'} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setReviewModal({...reviewModal, rating: star})} size={48} />
                     ))}
                   </div>
                 </div>
                 <div className="space-y-2">
                   <textarea rows={3} value={reviewModal.comment} onChange={(e) => setReviewModal({...reviewModal, comment: e.target.value})} className="w-full border-[3px] border-black rounded-[20px] p-4 font-bold text-lg resize-none placeholder:font-normal" placeholder="Excellent suivi commercial, TJM respecté..." />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <SoftButton variant="white" className="flex-1" onClick={() => setReviewModal(null)}>Ignorer</SoftButton>
                    <SoftButton variant="black" className="flex-1" onClick={() => {
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
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-[6px] border-black pb-12 relative">
                 <div className="space-y-2">
                   <h2 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Hello, <span className="text-[#CE93D8] underline decoration-8">{user?.firstName || 'Paul'}</span> !</h2>
                   <p className="font-bold text-gray-500 uppercase text-sm tracking-widest italic mt-4">Freelance Expert • Profil complété à 100%</p>
                 </div>
               </div>

               {invitations.length > 0 && (
                 <div className="space-y-6">
                   <h3 className="font-black text-2xl uppercase italic tracking-tighter flex items-center gap-3">
                     <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse border-[2px] border-black" />
                     Propositions de l'équipe Synapse ({invitations.length})
                   </h3>
                   {invitations.map(inv => (
                     <div key={inv.id} className="bg-black text-white border-[4px] border-[#CE93D8] rounded-[40px] p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                       <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-6 xl:gap-8 relative z-10 w-full">
                         <div className="space-y-2 flex-1 min-w-0">
                           <SoftBadge color="purple">Nouvelle Opportunité</SoftBadge>
                           <h3 className="text-2xl md:text-3xl font-black uppercase italic mt-2 md:truncate whitespace-normal leading-tight">{inv.title}</h3>
                           <p className="font-bold text-gray-300 tracking-widest uppercase text-xs truncate">Apporteur : {inv.agent} • Client : {inv.client}</p>
                           <div className="flex items-center gap-4 pt-2">
                             <span className="text-3xl font-black text-[#CE93D8]">{inv.budget}</span>
                             <span className="text-xs font-bold text-gray-400 uppercase hidden sm:inline">TJM sécurisé sur Escrow</span>
                           </div>
                         </div>
                         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto shrink-0 mt-2 xl:mt-0">
                           <SoftButton variant="white" className="flex-1 sm:flex-none py-4 px-6 text-black text-sm" onClick={() => handleDeclineContract(inv.id)}>Décliner</SoftButton>
                           <SoftButton variant="purple" className="flex-1 sm:flex-none py-4 px-6 text-sm shadow-[4px_4px_0px_0px_#AB47BC] text-black border-white" onClick={() => handleAcceptContract(inv.id)}><Check size={16} className="inline mr-2 shrink-0" /> <span className="truncate">Accepter & Sécuriser</span></SoftButton>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 <SoftCard title="Revenus Générés" color="yellow" icon={Wallet}>
                   <p className="text-5xl font-black italic">14 200 €</p>
                 </SoftCard>
                 <SoftCard title="Sécurisé (Escrow)" color="green" icon={ShieldCheck}>
                   <p className="text-5xl font-black italic">1 000 €</p>
                   <p className="text-xs font-black uppercase mt-3 tracking-widest text-gray-600">Mission Active</p>
                 </SoftCard>
                 <SoftCard title="Ma Note" color="purple" icon={Star}>
                   <div className="flex items-center gap-2">
                     <p className="text-5xl font-black italic">4.9</p>
                     <Star fill="currentColor" size={32} className="text-purple-600 mb-2"/>
                   </div>
                   <p className="text-xs font-black uppercase mt-3 tracking-widest text-gray-600">Basé sur 12 avis</p>
                 </SoftCard>
               </div>

               <div className="mt-16">
                  <h4 className="text-2xl font-black uppercase italic border-b-[4px] border-black pb-4 mb-8">Mon Portfolio Synapse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SoftCard className="p-0 overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform">
                      <div className="h-32 bg-[#FFEB3B] border-b-[3px] border-black flex items-center justify-center">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Ecommerce" alt="M" className="w-16 h-16 opacity-80" />
                      </div>
                      <div className="p-4">
                        <h5 className="font-black uppercase italic">Dashboard Admin</h5>
                        <p className="text-xs font-bold text-gray-500">React • TailwindCSS</p>
                      </div>
                    </SoftCard>
                    <SoftCard className="p-0 overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform">
                      <div className="h-32 bg-[#E3F2FD] border-b-[3px] border-black flex items-center justify-center">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=MobileApp" alt="M" className="w-16 h-16 opacity-80" />
                      </div>
                      <div className="p-4">
                        <h5 className="font-black uppercase italic">App Mobile Santé</h5>
                        <p className="text-xs font-bold text-gray-500">React Native • Expo</p>
                      </div>
                    </SoftCard>
                    <SoftCard className="p-0 overflow-hidden flex items-center justify-center bg-gray-50 border-dashed border-[3px] hover:bg-white transition-colors cursor-pointer text-gray-400 hover:text-black">
                       <div className="text-center">
                         <Plus size={32} className="mx-auto mb-2" />
                         <span className="font-black uppercase text-sm">Ajouter Projet</span>
                       </div>
                    </SoftCard>
                  </div>
                </div>
             </div>
           )}

           {activeTab === 'reseau' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-[6px] border-black pb-8">
                 <div className="space-y-2">
                   <h3 className="text-5xl font-black uppercase italic tracking-tighter">Annuaire Apporteurs</h3>
                   <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">Trouvez un agent pour vous placer sur des missions d'exception.</p>
                 </div>
                 <SoftButton variant="black" className="rounded-full px-8 py-3"><Search size={16} className="mr-2 inline" /> Filtrer</SoftButton>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {apporteurs.map(ag => (
                     <SoftCard key={ag.id} className="cursor-pointer hover:-translate-y-2 transition-transform group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-[4px]" onClick={() => setSelectedApporteur(ag)}>
                        <div className="flex gap-6 items-center mb-6 border-b-[3px] border-black pb-6">
                           <div className="w-20 h-20 border-[3px] border-black rounded-[20px] bg-[#FFEB3B] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ag.avatar}`} className="w-full h-full object-cover" />
                           </div>
                           <div className="overflow-hidden">
                              <h4 className="font-black text-2xl uppercase italic group-hover:underline truncate">{ag.name}</h4>
                              <p className="font-bold text-xs uppercase tracking-widest text-[#CE93D8]">{ag.role}</p>
                           </div>
                        </div>
                        <p className="font-bold text-sm text-gray-600 line-clamp-3 mb-6 bg-gray-50 p-4 rounded-xl border-[2px] border-black border-dashed">"{ag.bio}"</p>
                        <SoftButton variant="white" className="w-full text-sm shadow-none hover:bg-black hover:text-white border-[3px] transition-colors"><Star size={16} fill="currentColor" className="text-yellow-500 mr-2 inline" /> {ag.rating}/5 • Voir Profil</SoftButton>
                     </SoftCard>
                  ))}
               </div>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300">
                <div className="w-full md:w-1/3 flex flex-col gap-8">
                  
                  <div className="space-y-4">
                    <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-orange-600">⏳ Demandes Envoyées</h4>
                    {inbox.filter(chat => chat.type === 'dm_demande').length > 0 ? inbox.filter(chat => chat.type === 'dm_demande').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[3px] border-black rounded-[20px] cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-[#CE93D8] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-[#FFF3E0] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-black uppercase text-sm">{chat.sender}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">En attente de réponse</p>
                      </div>
                    )) : <p className="text-[10px] font-black uppercase text-gray-400 italic">Aucune demande en attente.</p>}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-purple-600">🤝 Mes Représentants (Apporteurs)</h4>
                    {inbox.filter(chat => chat.type === 'dm').length > 0 ? inbox.filter(chat => chat.type === 'dm').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[3px] border-black rounded-[20px] cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-[#CE93D8] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-[#FFF9C4] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-black uppercase text-sm">{chat.sender}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">{chat.role}</p>
                        <p className="text-xs font-bold truncate italic opacity-80">{chat.title}</p>
                      </div>
                    )) : <p className="text-[10px] font-black uppercase text-gray-400 italic">Aucun représentant actif.</p>}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-green-600">🛠 Groupes Projets Actifs</h4>
                    {inbox.filter(chat => chat.type === 'project').length > 0 ? inbox.filter(chat => chat.type === 'project').map(chat => (
                      <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 border-[3px] border-black rounded-[20px] cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-[#CE93D8] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-black uppercase text-sm">{chat.title}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{chat.sender}</p>
                      </div>
                    )) : <p className="text-xs font-bold text-gray-400 italic">Aucun projet en cours.</p>}
                  </div>

                </div>

                <div className="w-full md:w-2/3">
                  {!activeChat ? (
                    <SoftCard className="h-[600px] flex items-center justify-center text-center">
                       <MessageSquare size={64} className="mx-auto mb-6 text-gray-300" />
                       <p className="font-black text-2xl uppercase italic text-gray-400">Sélectionnez une discussion</p>
                    </SoftCard>
                  ) : (
                    <div className="bg-white border-[4px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[600px]">
                       <header className="bg-black text-white p-6 flex justify-between items-center z-10">
                         <div>
                           <h3 className="text-2xl font-black uppercase italic truncate">{activeChat.title}</h3>
                           <p className="font-bold text-gray-400 truncate w-full text-sm">Avec {activeChat.sender} ({activeChat.role})</p>
                         </div>
                       </header>
                       <div className="bg-[#F3E5F5] p-3 text-center border-b-[3px] border-black font-black uppercase text-xs italic tracking-widest text-[#6A1B9A]">
                         Espace sécurisé Synapse
                       </div>
                       <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 relative">
                         {activeChat.messages.map((msg, idx) => (
                           <div key={idx} className={`max-w-[80%] ${msg.sender === 'Paul' || msg.sender === 'Moi' ? 'ml-auto' : ''}`}>
                             <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-2">{msg.sender} • {msg.time}</p>
                             <div className={`p-5 rounded-[20px] font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg ${msg.sender === 'Paul' || msg.sender === 'Moi' ? 'bg-[#CE93D8]' : 'bg-white'}`}>
                               {msg.text}
                             </div>
                           </div>
                         ))}
                       </div>
                       <div className="p-6 bg-white border-t-[4px] border-black flex gap-4 items-center">
                         <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Écrivez votre message..." className="flex-1 bg-gray-50 border-[3px] border-black rounded-[20px] px-6 py-4 font-bold focus:outline-none focus:bg-white transition-colors text-lg" />
                         <SoftButton variant="black" className="p-4" onClick={() => {
                           if(chatInput.trim()) {
                             const newMsg = { text: chatInput, sender: 'Moi', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
                             setActiveChat({...activeChat, messages: [...activeChat.messages, newMsg]});
                             setChatInput('');
                           }
                         }}><Send size={24} /></SoftButton>
                       </div>
                    </div>
                  )}
                </div>
             </div>
           )}

           {activeTab === 'missions' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Mes Missions</h3>
               
               <div className="space-y-6">
                 {tasks.map(mission => (
                   <SoftCard key={mission.id} color={mission.status === 'active' ? 'purple' : 'white'} className={mission.status === 'active' ? '!bg-[#F3E5F5]' : ''}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                          <div className="flex gap-2 items-center">
                            {mission.status === 'active' && <SoftBadge color="yellow">En cours</SoftBadge>}
                            {mission.status === 'completed' && <SoftBadge color="green">Mission Terminée</SoftBadge>}
                            <SoftBadge color="blue">{mission.type || 'Web / Mobile'}</SoftBadge>
                          </div>
                          <h4 className="font-black text-2xl uppercase italic">{mission.title}</h4>
                          <p className="font-bold text-gray-500">Apporteur : {mission.agent} • Client Final : {mission.client}</p>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end">
                          <p className="font-black text-3xl text-gray-900 mb-2">{mission.budget}</p>
                          <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <ShieldCheck size={12}/> {mission.escrow ? 'Sécurisé Escrow' : 'Paiement Direct'}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-600 max-w-2xl mt-4 border-l-[4px] border-black pl-4 mb-6">
                        "{mission.desc}"
                      </p>
                      
                      {mission.status === 'active' && (
                        <div className="bg-[#E8F5E9] border-[3px] border-black rounded-[20px] p-4 flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-black uppercase text-sm">Time Tracking Synapse</span>
                              <span className="font-black text-green-700">{mission.hoursTracked || 0}h / {mission.duration * 7}h max</span>
                            </div>
                            <div className="h-4 bg-white border-[2px] border-black rounded-full overflow-hidden">
                              <div className="h-full bg-green-400 transition-all" style={{ width: `${Math.min(100, ((mission.hoursTracked || 0) / (mission.duration * 7)) * 100)}%` }}></div>
                            </div>
                          </div>
                          <SoftButton variant="black" className="shrink-0 px-6 py-3 max-h-12" onClick={() => {
                            const newH = (mission.hoursTracked || 0) + 4;
                            setTasks(tasks.map(t => t.id === mission.id ? {...t, hoursTracked: newH} : t));
                             if (newH >= mission.duration * 7) showAlert("Objectif de facturation atteint ! L'Apporteur vient d'être notifié pour débloquer le jalon.", "info");
                           }}>
                            <Clock size={16} className="mr-2 inline" /> Pointer 4h
                          </SoftButton>
                        </div>
                      )}

                      {mission.status === 'active' && (
                         <div className="flex flex-col md:flex-row gap-4 mt-6 pt-6 border-t-[3px] border-black border-dashed">
                            <SoftButton variant="white" className="flex-1 text-red-600 shadow-none hover:bg-red-50 text-sm border-[3px] border-red-200" onClick={() => {
                              setTasks(tasks.map(t => t.id === mission.id ? {...t, status: 'disputed'} : t));
                              showAlert("⚠️ Contrat gelé informatiquement. Un médiateur Synapse va rentrer dans la boucle pour vous protéger.", "error");
                            }}>
                              <ShieldCheck size={16} className="mr-2 inline" /> Signaler Un Problème
                            </SoftButton>
                            <SoftButton variant="yellow" className="flex-1 text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" onClick={() => {
                              setTasks(tasks.map(t => t.id === mission.id ? {...t, status: 'pending_verification'} : t));
                              showAlert("✅ Fin de mission annoncée à l'apporteur ! Demande de libération des fonds Escrow envoyée.", "success");
                            }}>
                              <CheckCircle size={16} className="mr-2 inline" /> Annoncer Fin de Tâche
                            </SoftButton>
                         </div>
                       )}

                       {mission.status === 'disputed' && (
                         <div className="bg-red-50 border-[3px] border-red-600 rounded-[20px] p-6 mt-6">
                           <h4 className="font-black text-red-600 uppercase italic flex items-center gap-3 mb-3"><X size={28} /> Mission Gelée (Surexploitation/Abus)</h4>
                           <p className="font-bold text-gray-700 text-sm">Vous avez émis un signalement, le système a bloqué les actions sur l'Escrow de l'Entreprise. Un agent du support Synapse prend le relais très rapidement.</p>
                         </div>
                       )}

                       {mission.status === 'pending_verification' && (
                         <div className="bg-[#FFF9C4] border-[3px] border-yellow-500 rounded-[20px] p-6 mt-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                           <h4 className="font-black text-yellow-600 uppercase italic flex items-center gap-3 mb-2"><CheckCircle size={28} /> Vérification en cours</h4>
                           <p className="font-bold text-gray-800 text-sm">Fin de mission annoncée. En attente du feu vert du client final pour le virement vers votre compte !</p>
                         </div>
                       )}

                      {mission.status === 'completed' && (
                        <div className="mt-6 pt-6 border-t-[3px] border-black">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div className="flex items-center gap-4 text-yellow-500 mb-1">
                              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill={i < mission.rating ? 'currentColor' : 'none'} strokeWidth={3} />)}
                            </div>
                            <p className="font-bold italic text-gray-600 text-sm">Avis Client : "{mission.review}"</p>
                          </div>
                          {!mission.hasReviewedApporteur ? (
                             <SoftButton variant="yellow" className="w-full text-sm shadow-none border-[3px] hover:bg-[#FFF9C4]" onClick={() => setReviewModal({...mission, rating: 5, comment: ''})}>
                               <Star size={16} fill="currentColor" className="mr-2 inline" /> Évaluer {mission.agent} (Apporteur)
                             </SoftButton>
                          ) : (
                             <SoftBadge color="green" className="w-full justify-center !py-3 bg-[#E8F5E9] border-black text-black">✅ Vous avez recommandé {mission.agent}</SoftBadge>
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
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Mon Portefeuille</h3>
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Sécurisé en Escrow (TJM)" color="yellow" className="!bg-[#FFF9C4]">
                   <p className="text-4xl font-black italic">{tasks.filter(t => ['active', 'pending_verification', 'disputed'].includes(t.status)).reduce((acc, t) => acc + parseInt(t.budget.replace(/\D/g, '') || 0), 0).toLocaleString('fr-FR')} €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Revenus des missions actives (À débloquer)</p>
                 </SoftCard>
                 <SoftCard title="Revenus Débloqués (Viré)" color="green" className="!bg-[#E8F5E9]">
                   <p className="text-4xl font-black italic">{(14200 + tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + parseInt(t.budget.replace(/\D/g, '') || 0), 0)).toLocaleString('fr-FR')} €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Historique cumulé des virements Synapse</p>
                 </SoftCard>
               </div>

               <SoftCard title="Derniers Mouvements Actifs du Portefeuille">
                 <div className="space-y-4">
                   {tasks.map(t => (
                     <div key={`fin_${t.id}`} className="border-[3px] border-black rounded-[20px] p-6 bg-white flex flex-col md:flex-row justify-between items-center md:items-start gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                       <div>
                         <h4 className="font-black uppercase italic text-lg">{t.title}</h4>
                         <p className="text-xs font-bold text-gray-500 uppercase">Apporteur : {t.agent}</p>
                       </div>
                       <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end">
                         <p className={`font-black text-2xl ${t.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{t.budget}</p>
                         <p className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-300 mt-1 shadow-sm">
                           {t.status === 'completed' ? 'Fonds Libérés (Payé)' : 'Verrouillé (Escrow)'}
                         </p>
                       </div>
                     </div>
                   ))}
                   {tasks.length === 0 && <p className="text-xs font-bold text-gray-400 italic">Aucune transaction répertoriée.</p>}
                 </div>
               </SoftCard>
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

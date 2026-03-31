import React, { useState } from 'react';
import { Zap, LayoutDashboard, Component, Users, FileText, Wallet, LogOut, Target, Briefcase, ChevronRight, Calculator, Send, Search, Building, Star, CheckCircle, X, MessageSquare, Globe, GitBranch, FileUp, Inbox, Link, BarChart, Activity, ShieldCheck, Plus, Minus, ChevronDown, Check } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';
import { SoftInput } from '../components/ui/SoftInput';

export const ApporteurDashboard = ({ user, onLogout }) => {
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState('home');

  // State for team builder
  const [teamBuilder, setTeamBuilder] = useState({ 
    active: false, 
    opportunityId: null, 
    totalBudget: 5000, 
    requiredFreelances: 1,
    assignedFreelances: [] 
  });

  // State for profile modals & chat
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // Inbox State: Stores all active conversations
  const [inbox, setInbox] = useState([
    {
      id: 'dm_free_intro',
      type: 'dm_freelance',
      freelance: 'Lucas T.',
      role: 'Développeur React.js',
      avatar: 22,
      bio: "Développeur Front-End orienté UI/UX. Je cherche un apporteur de confiance pour gérer mon pipeline commercial et ma facturation via BNI.",
      portfolio: "lucas-t.dev",
      github: "lucast-dev",
      skills: ["React", "Next.js", "TailwindCSS"],
      exp: "3 ans",
      education: "Le Wagon",
      cost: 400,
      note: 4.8,
      messages: [
        { text: "Bonjour Marc ! Je suis extrêmement impressionné par votre réseau. Je suis dispo immédiatement, prenez-vous de nouveaux profils dans votre vivier ?", sender: 'Lucas T.', time: '08:30', isFreelance: true, avatar: 22 }
      ]
    }
  ]);

  // Mock Data
  const [freelances, setFreelances] = useState([
    { id: 101, name: 'Paul M.', role: 'Dév Fullstack', cost: 450, note: 4.8, initial: 'PM', pipeline: 'contact', avatar: 12, bio: "Expert React.js passionné par le front-end et le Soft Brutalism.", portfolio: "paulmartin.dev", github: "paulmrtn", cvUrl: "link", skills: ["React", "TypeScript", "TailwindCSS"], education: "Master Epitech", availability: 'available' },
    { id: 102, name: 'Clara S.', role: 'UX/UI Designer', cost: 350, note: 4.9, initial: 'CS', pipeline: 'nego', avatar: 15, bio: "Design thinking, Figma, et création de parcours utilisateurs fluides.", portfolio: "juliedesign.com", github: "", cvUrl: "link", skills: ["Figma", "Webflow", "User Testing"], education: "Gobelins Paris", availability: 'available' },
    { id: 103, name: 'Kevin B.', role: 'Data Engineer', cost: 600, note: 4.5, initial: 'KB', pipeline: 'placed', avatar: 8, bio: "Spécialise en intégration continue et déploiement cloud (AWS, Docker).", portfolio: "sam-cloud.io", github: "sambdevops", cvUrl: "link", skills: ["AWS", "Docker", "Kubernetes"], education: "Ingénieur Télécom", availability: 'busy' },
  ]);

  const companies = [
    { id: 101, name: 'Alpha Solutions', sector: 'Logiciels SaaS', avatar: 50, bio: "Éditeur de logiciels métiers pour les professionnels de la santé.", rating: 4.7, creationYear: 2012, size: '50-100 employés', website: 'alphasolutions.com' },
    { id: 102, name: 'Beta Finance', sector: 'FinTech', avatar: 51, bio: "Start-up spécialisée dans l'automatisation des paiements B2B.", rating: 4.2, creationYear: 2020, size: '10-50 employés', website: 'betafinance.io' },
    { id: 103, name: 'Gamma Retail', sector: 'E-commerce', avatar: 52, bio: "Chaîne de magasins de vêtements avec une forte présence en ligne.", rating: 4.6, creationYear: 1998, size: '500+ employés', website: 'gammaretail.fr' },
  ];

  const [genericFreelances, setGenericFreelances] = useState([
    { id: 11, name: 'Alex D.', role: 'Développeur Mobile', exp: '2 ans', avatar: 30, bio: "Spécialiste React Native et applications iOS/Android.", cost: 1500, rating: 4.2, portfolio: "alexapp.com", github: "alexdev", cvUrl: "link", skills: ["React Native", "Flutter", "Swift"], education: "EEMI", availability: 'available' },
    { id: 12, name: 'Sarah B.', role: 'Data Scientist', exp: '4 ans', avatar: 31, bio: "Modélisation des données, Machine learning et Python.", cost: 2000, rating: 4.8, portfolio: "sarahdata.io", github: "sarahb_data", cvUrl: "link", skills: ["Python", "TensorFlow", "SQL"], education: "Polytechnique", availability: 'available' },
    { id: 13, name: 'Tom C.', role: 'Cybersécurité', exp: '6 ans', avatar: 32, bio: "Audits de sécurité, pentesting et infrastructure réseau.", cost: 3000, rating: 4.9, portfolio: "tomsec.info", github: "tom_cyber", cvUrl: "link", skills: ["Kali Linux", "Pentesting", "Réseaux"], education: "Master Cybersécurité", availability: 'available' },
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 201, title: 'Refonte de notre app client', company: 'Alpha Solutions', budget: 5000, resources: '2 Freelances Tech', requiredFreelances: 2, status: 'open' },
    { id: 202, title: 'Logo et Landing Page', company: 'Gamma Retail', budget: 2500, resources: '1 Designer, 1 Dév', requiredFreelances: 2, status: 'open' },
    { id: 203, title: 'Création Landing Page E-commerce', company: 'Beta Finance', budget: 1500, resources: '1 Développeur Front', requiredFreelances: 1, status: 'matched', assignedFreelances: [{ id: 1, name: 'Paul M.', cost: 1000 }] },
  ]);

  const [finishedContracts] = useState([
    { 
      id: 301, 
      title: 'Dashboard Admin E-commerce', 
      company: 'Gamma Retail', 
      budget: '3 000 €', 
      freelances: ['Paul M.', 'Sam B.'], 
      companyReview: { rating: 5, comment: "Équipe très réactive et travail d'excellente qualité. Parfait !" },
      freelanceReview: { rating: 4, comment: "Client sympa, specs claires, mais délais un peu serrés." }
    },
    { 
      id: 302, 
      title: 'Audit de Sécurité Plateforme', 
      company: 'Beta Finance', 
      budget: '4 500 €', 
      freelances: ['Tom C.'], 
      companyReview: { rating: 4, comment: "Audit très professionnel. Documentation très longue à lire." },
      freelanceReview: { rating: 5, comment: "Très bonne communication et accès rapide aux datas. Mission parfaite." }
    }
  ]);

  // Handlers
  const openTeamBuilder = (opp) => {
    setTeamBuilder({
      ...teamBuilder,
      opportunityId: opp.id,
      totalBudget: opp.budget,
      requiredFreelances: opp.requiredFreelances || 1,
      assignedFreelances: []
    });
    setActiveTab('team_builder');
  };

  const addToTeam = (f) => {
    if (f.availability === 'busy') {
      showAlert("Ce talent est déjà en mission et n'est pas disponible pour le moment.", "error");
      return;
    }
    if (teamBuilder.assignedFreelances.length >= teamBuilder.requiredFreelances) {
      showAlert(`Ce contrat ne requiert que ${teamBuilder.requiredFreelances} talent(s). L'équipe est déjà au complet !`, "info");
      return;
    }
    if(!teamBuilder.assignedFreelances.find(x => x.id === f.id)) {
      setTeamBuilder({...teamBuilder, assignedFreelances: [...teamBuilder.assignedFreelances, f]});
    }
  };

  const removeFromTeam = (fId) => {
    setTeamBuilder({...teamBuilder, assignedFreelances: teamBuilder.assignedFreelances.filter(x => x.id !== fId)});
  };

  const calculateCommission = () => {
    const totalCost = teamBuilder.assignedFreelances.reduce((acc, f) => acc + (f.cost || 0), 0);
    return teamBuilder.totalBudget - totalCost;
  };

  const handleSendContracts = () => {
    const matchedOpp = opportunities.find(o => o.id === teamBuilder.opportunityId);
    
    // Status update
    setOpportunities(opportunities.map(opp => 
      opp.id === teamBuilder.opportunityId ? { ...opp, status: 'matched', assignedFreelances: teamBuilder.assignedFreelances } : opp
    ));
    
    // Move to Placed in Kanban & Status Busy
    const assignedIds = teamBuilder.assignedFreelances.map(f => f.id);
    setFreelances(freelances.map(f => assignedIds.includes(f.id) ? { ...f, availability: 'busy', pipeline: 'placed' } : f));

    // Create a new Project Chat inside Inbox
    const newProjectChat = {
        id: `proj_${Date.now()}`,
        type: 'project',
        opportunityId: matchedOpp.id,
        title: matchedOpp.title,
        company: matchedOpp.company,
        assignedFreelances: teamBuilder.assignedFreelances,
        avatar: 50, // mock company avatar
        messages: [
          { text: "✨ Bonjour à tous ! Les contrats ont été acceptés par les freelances, je déclare la mission officiellement ouverte. On valide les maquettes ASAP ?", sender: 'Moi (Apporteur)', time: '09:12' },
          { text: "Top ! Marc, l'argent a bien été sécurisé de notre côté dans le système Escrow. On a hâte de voir les premières maquettes de l'app.", sender: matchedOpp.company, time: '09:45', avatar: '50' },
          { text: "Super ! As-tu la charte graphique sous la main ? Je vais pouvoir démarrer la structuration React d'ici midi.", sender: teamBuilder.assignedFreelances?.[0]?.name || 'Freelance', time: '09:50', avatar: teamBuilder.assignedFreelances?.[0]?.avatar || 12, isFreelance: true }
        ]
    };
    setInbox(prev => [newProjectChat, ...prev]);

    showAlert("✅ Contrats non-négociables envoyés ! Les freelances sont désormais en statut 'En Mission'. Un groupe de discussion a été créé dans la Messagerie.", "success");
    setActiveTab('opportunites');
  };

  const handleAddGenericToVivier = (f) => {
    setFreelances([...freelances, { ...f, pipeline: 'contact', initial: f.name.substring(0,2).toUpperCase(), note: f.rating, cost: f.cost }]);
    setGenericFreelances(genericFreelances.filter(gf => gf.id !== f.id));
    showAlert(`✅ ${f.name} a été retiré de la recherche et ajouté à votre vivier privé !`, "success");
  };

  const handleRequestVerification = (id) => {
    setOpportunities(opportunities.map(opp => opp.id === id ? { ...opp, status: 'pending_verification' } : opp));
    showAlert("🚀 Vous avez signalé à l'entreprise que la mission est terminée. En attente de leur vérification pour le déblocage final de l'Escrow !", "info");
  };

  // Chat Actions
  const openChatFromOpp = (opp) => {
    // Find the chat in the inbox
    let chat = inbox.find(c => c.type === 'project' && c.opportunityId === opp.id);
    if (!chat) return; // Should not happen since we create it in handleSendContracts
    openChatFromInbox(chat);
  };

  const openChatFromInbox = (chat) => {
    setChatInput('');
    setActiveChat(chat);
    setActiveTab('chat');
  };

  const directMessageCompany = (opp) => {
    setSelectedProfile(null);
    const existingDm = inbox.find(c => c.type === 'dm_company' && c.company === opp.company && c.title === opp.title);
    
    if (existingDm) {
      openChatFromInbox(existingDm);
    } else {
      const newDmChat = {
        id: `dm_comp_${Date.now()}`,
        type: 'dm_company',
        company: opp.company,
        title: opp.title,
        avatar: opp.avatar || 50,
        messages: []
      };
      setInbox(prev => [newDmChat, ...prev]);
      setActiveChat(newDmChat);
      setChatInput(`Bonjour équipe ${opp.company} ! J'ai une équipe parfaitement qualifiée et disponible dans mon vivier pour votre contrat "${opp.title}". Pouvons-nous en discuter ?`);
      setActiveTab('chat');
    }
  };

  const directMessageFreelance = (f) => {
    setSelectedProfile(null);
    const existingDm = inbox.find(c => c.type === 'dm_freelance' && c.freelance === f.name);
    
    if (existingDm) {
      openChatFromInbox(existingDm);
    } else {
      const newDmChat = {
        id: `dm_free_${Date.now()}`,
        type: 'dm_freelance',
        freelance: f.name,
        role: f.role,
        avatar: f.avatar,
        messages: []
      };
      setInbox(prev => [newDmChat, ...prev]);
      setActiveChat(newDmChat);
      setChatInput(`Salut ${f.name}, j'ai une superbe mission pour toi sur un profil ${f.role}. Es-tu disponible cette semaine ?`);
      setActiveTab('chat');
    }
  };

  const handleSendMessage = () => {
    if(chatInput.trim() !== '') {
      const newMessage = { 
        text: chatInput, 
        sender: 'Moi (Apporteur)', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      
      const updatedChat = { ...activeChat, messages: [...(activeChat.messages || []), newMessage] };
      setActiveChat(updatedChat);
      setInbox(inbox.map(c => c.id === activeChat.id ? updatedChat : c)); // Persist in inbox
      setChatInput('');
    }
  };

  const getCompanyOpportunities = (companyName) => {
    return opportunities.filter(o => o.company === companyName && o.status === 'open');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans relative">
      
      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto pt-24 pb-12">
          <div className="max-w-2xl w-full animate-in zoom-in-95 duration-300 my-auto">
            <SoftCard title={`Fiche : ${selectedProfile.name}`} className="relative shadow-xl border border-slate-200 bg-white">
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                title="Fermer"
              >
                <X size={20} strokeWidth={2} className="text-slate-500" />
              </button>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 shrink-0 border border-indigo-100 rounded-2xl overflow-hidden shadow-sm bg-indigo-50/50 p-2">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-white">
                      {selectedProfile.type === 'company' ? (
                         <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900">{selectedProfile.name}</h3>
                    <p className="font-semibold text-indigo-600 tracking-wider text-sm mt-1">{selectedProfile.sector || selectedProfile.role}</p>
                    <div className="flex justify-center md:justify-start items-center gap-2 font-bold text-xl text-amber-500 mt-3">
                      <Star fill="currentColor" size={20} /> {selectedProfile.rating || selectedProfile.note} / 5
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left">
                  <p className="font-medium text-slate-700 whitespace-pre-line leading-relaxed">"{selectedProfile.bio}"</p>
                </div>

                {selectedProfile.type === 'freelance' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedProfile.skills?.map(skill => (
                        <SoftBadge key={skill} color="purple" className="bg-indigo-50 text-indigo-700 border-indigo-200">{skill}</SoftBadge>
                      ))}
                      <SoftBadge color="blue" className="bg-sky-50 text-sky-700 border-sky-200">{selectedProfile.exp || 'Expérience'}</SoftBadge>
                      <SoftBadge color="green" className="bg-emerald-50 text-emerald-700 border-emerald-200">{selectedProfile.education || 'Formation'}</SoftBadge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {selectedProfile.portfolio && (
                         <a href={`https://${selectedProfile.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-200 transition-all text-sm group shadow-sm">
                           <Globe size={18} className="text-indigo-500 group-hover:scale-110 transition-transform" /> {selectedProfile.portfolio}
                         </a>
                       )}
                       {selectedProfile.github && (
                         <a href={`https://github.com/${selectedProfile.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm group shadow-sm">
                           <GitBranch size={18} className="text-slate-500 group-hover:scale-110 transition-transform" /> {selectedProfile.github}
                         </a>
                       )}
                       {selectedProfile.cvUrl && (
                         <div className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl font-medium text-emerald-700 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all text-sm group shadow-sm">
                           <FileUp size={18} className="group-hover:-translate-y-1 transition-transform" /> Télécharger CV & Lettre
                         </div>
                       )}
                    </div>
                    
                    <SoftButton variant="blue" className="w-full text-base py-3.5 shadow-sm rounded-xl" onClick={() => directMessageFreelance(selectedProfile)}>
                      <MessageSquare size={18} className="inline mr-2" strokeWidth={2} /> Contacter (DM)
                    </SoftButton>
                  </div>
                )}

                {selectedProfile.type === 'company' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {selectedProfile.creationYear && <SoftBadge color="yellow" className="bg-amber-50 text-amber-700 border-amber-200">Créée en {selectedProfile.creationYear}</SoftBadge>}
                      {selectedProfile.size && <SoftBadge color="blue" className="bg-sky-50 text-sky-700 border-sky-200">{selectedProfile.size}</SoftBadge>}
                    </div>
                    {selectedProfile.website && (
                       <a href={`https://${selectedProfile.website}`} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-200 transition-all text-sm w-full md:w-auto mt-2 shadow-sm group">
                         <Globe size={18} className="text-indigo-500 group-hover:scale-110 transition-transform" /> {selectedProfile.website}
                       </a>
                    )}
                    <h4 className="font-bold text-lg text-slate-900 border-t border-slate-200 pt-6">Contrats Ouverts</h4>
                    {getCompanyOpportunities(selectedProfile.name).length > 0 ? (
                      getCompanyOpportunities(selectedProfile.name).map(opp => (
                        <div key={opp.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm hover:border-indigo-200 transition-all group">
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{opp.title}</p>
                            <p className="font-medium text-slate-500 text-sm mt-1">{opp.budget} € • {opp.resources}</p>
                          </div>
                          <SoftButton variant="blue" className="w-full md:w-auto text-xs py-2.5 rounded-lg shadow-sm" onClick={() => directMessageCompany({ ...opp, avatar: selectedProfile.avatar })}>
                            <MessageSquare size={14} className="inline mr-2" strokeWidth={2} /> DM L'entreprise
                          </SoftButton>
                        </div>
                      ))
                    ) : (
                      <p className="font-medium text-slate-500 italic p-6 border border-slate-200 border-dashed rounded-xl bg-slate-50/50 text-center">Aucun contrat en cours pour cette entreprise.</p>
                    )}
                  </div>
                )}

                <SoftButton className="w-full text-base py-3.5 rounded-xl shadow-sm" variant="white" onClick={() => setSelectedProfile(null)}>
                  Fermer la Fiche
                </SoftButton>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 lg:p-8 flex flex-col space-y-10 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
            <Zap className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">Synapse</span>
        </div>

        <nav className="flex-1 space-y-1.5 font-medium text-sm text-slate-600">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><LayoutDashboard size={18} strokeWidth={activeTab === 'home' ? 2.5 : 2} /> Accueil</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'messagerie' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Inbox size={18} strokeWidth={activeTab === 'messagerie' ? 2.5 : 2} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'finance' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Wallet size={18} strokeWidth={activeTab === 'finance' ? 2.5 : 2} /> Finance</button>
           <button onClick={() => setActiveTab('vivier')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'vivier' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Component size={18} strokeWidth={activeTab === 'vivier' ? 2.5 : 2} /> Kanban Vivier</button>
           <button onClick={() => setActiveTab('analytique')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'analytique' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><BarChart size={18} strokeWidth={activeTab === 'analytique' ? 2.5 : 2} /> Analytique (KPI)</button>
           <button onClick={() => setActiveTab('opportunites')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'opportunites' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Target size={18} strokeWidth={activeTab === 'opportunites' ? 2.5 : 2} /> Opportunités</button>
           <button onClick={() => setActiveTab('contrats_finis')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'contrats_finis' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><CheckCircle size={18} strokeWidth={activeTab === 'contrats_finis' ? 2.5 : 2} /> Contrats Finis</button>
           
           <div className="h-px bg-slate-200 my-6" />
           <p className="text-[11px] font-bold text-slate-400 tracking-wider pl-3 mb-3 uppercase">Recherches</p>
           <button onClick={() => setActiveTab('search_freelances')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'search_freelances' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Search size={18} strokeWidth={activeTab === 'search_freelances' ? 2.5 : 2} /> Freelances</button>
           <button onClick={() => setActiveTab('search_companies')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === 'search_companies' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}><Building size={18} strokeWidth={activeTab === 'search_companies' ? 2.5 : 2} /> Entreprises</button>
        </nav>

        <div className="pt-6 border-t border-slate-200 space-y-4">
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || 'Marc'}`} alt="avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-slate-900">{user?.firstName || 'Marc'} {user?.lastName}</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">Apporteur d'Affaires</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-medium text-sm text-slate-500 flex items-center justify-center gap-2 py-3 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors">
             <LogOut size={16} strokeWidth={2} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto w-full bg-slate-50/50">
        <div className="max-w-6xl mx-auto space-y-12">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-none">Hello, <span className="text-indigo-600">{user?.firstName || 'Marc'}</span></h2>
                 <p className="font-medium text-slate-500 text-sm">Dashboard Apporteur d'Affaires • Connecteur de Talents</p>
              </div>
              <div className="flex gap-4">
                <SoftButton variant="white" className="rounded-xl shadow-sm px-5 py-2.5 border-slate-200" onClick={() => setActiveTab('search_companies')}><Building size={18} className="mr-2 inline" strokeWidth={2} /> Entreprises</SoftButton>
                <SoftButton variant="blue" className="rounded-xl px-6 py-2.5 shadow-sm" onClick={() => setActiveTab('search_freelances')}><Search size={18} className="mr-2 inline" strokeWidth={2} /> Chercher des talents</SoftButton>
              </div>
           </header>

           {activeTab === 'home' && (
             <div className="space-y-10 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SoftCard title="Vivier" color="purple" icon={Users} className="bg-indigo-50/50 border border-indigo-100">
                     <p className="text-4xl font-bold text-slate-900">{freelances.length}</p>
                     <p className="text-sm font-medium text-slate-500 mt-2">Talents qualifiés</p>
                  </SoftCard>
                  <SoftCard title="Commissions Futures" color="yellow" icon={Wallet} className="bg-emerald-50/50 border border-emerald-100">
                     <p className="text-4xl font-bold text-slate-900">14 500 €</p>
                     <p className="text-sm font-medium text-emerald-700 mt-2">Escrow Sécurisé en attente</p>
                  </SoftCard>
                  <SoftCard title="Messages En Attente" color="blue" icon={MessageSquare} className="bg-sky-50/50 border border-sky-100">
                     <p className="text-4xl font-bold text-slate-900">{inbox.length}</p>
                     <p className="text-sm font-medium text-slate-500 mt-2">Discussions actives</p>
                  </SoftCard>
               </div>
               
               <SoftCard title="Opportunité Récente" color="white" className="border border-slate-200">
                 {opportunities.filter(o => o.status === 'open').length > 0 ? (
                   opportunities.filter(o => o.status === 'open').slice(0, 1).map(opp => (
                     <div key={opp.id} className="border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50 hover:border-indigo-200 cursor-pointer shadow-sm transition-all group">
                        <div className="flex gap-6 items-center flex-1">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                            <Zap size={24} className="text-indigo-600" strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">{opp.title}</h4>
                            <p className="font-medium text-slate-500 text-sm mt-1">{opp.company} • Budget: <span className="text-slate-700 font-semibold">{opp.budget} €</span> • {opp.resources}</p>
                          </div>
                        </div>
                        <SoftButton variant="blue" className="px-6 rounded-xl shadow-sm" onClick={() => openTeamBuilder(opp)}>Team Builder <Zap size={16} className="ml-1 inline" strokeWidth={2} /></SoftButton>
                     </div>
                   ))
                 ) : (
                   <div className="p-8 text-center border border-slate-200 border-dashed rounded-2xl bg-slate-50/50">
                     <p className="font-medium text-slate-500 italic">Aucune nouvelle opportunité ouverte.</p>
                   </div>
                 )}
               </SoftCard>
             </div>
           )}

           {activeTab === 'analytique' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">Analytique & KPIs</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <SoftCard title="Taux de Conversion" color="blue" icon={Activity} className="border border-slate-200">
                   <p className="text-4xl font-bold text-slate-900">68%</p>
                 </SoftCard>
                 <SoftCard title="Missions Actives" color="green" icon={Briefcase} className="border border-slate-200">
                   <p className="text-4xl font-bold text-slate-900">12</p>
                 </SoftCard>
                 <SoftCard title="Commissions" color="yellow" icon={Wallet} className="border border-slate-200">
                   <p className="text-4xl font-bold text-slate-900">14.5k€</p>
                 </SoftCard>
                 <SoftCard title="Vivier" color="purple" icon={Users} className="border border-slate-200">
                   <p className="text-4xl font-bold text-slate-900">{freelances.length}</p>
                 </SoftCard>
               </div>
               <SoftCard title="Performance Mensuelle" className="border border-slate-200">
                 <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 rounded-2xl bg-slate-50/50">
                   <p className="font-semibold text-slate-400">Graphique de performance (Mockup)</p>
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">Messagerie (Inbox)</h3>
               <p className="font-medium text-slate-500 mb-8">Retrouvez toutes vos conversations de prospection et de chantiers en cours.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* DMs Entreprises */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-sm border-b border-slate-200 pb-2 text-indigo-600">🏢 Prospection Entreprises</h4>
                   {inbox.filter(c => c.type === 'dm_company').length > 0 ? inbox.filter(c => c.type === 'dm_company').map(c => (
                     <div key={c.id} className="bg-white border border-slate-200 p-4 rounded-xl cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border border-slate-200 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform"><img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${c.avatar}`} alt="Avatar" /></div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-slate-900 truncate text-sm">{c.company}</p>
                           <p className="text-xs font-medium text-slate-500 truncate">{c.title}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-medium text-slate-400 italic p-4 text-center border border-slate-200 border-dashed rounded-xl bg-slate-50">Aucun DM envoyé.</p>}
                 </div>

                 {/* Demandes de représentation (Nouvelles) */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-sm border-b border-slate-200 pb-2 text-rose-600">⏳ Nouvelles Demandes</h4>
                   {inbox.filter(c => c.type === 'dm_freelance' && !freelances.find(f => f.name === c.freelance)).length > 0 ? inbox.filter(c => c.type === 'dm_freelance' && !freelances.find(f => f.name === c.freelance)).map(c => (
                     <div key={c.id} className="bg-rose-50/50 border border-rose-200 p-4 rounded-xl cursor-pointer hover:bg-rose-50 hover:border-rose-300 hover:shadow-sm transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border border-rose-200 rounded-full overflow-hidden shrink-0 bg-white flex items-center justify-center font-bold text-rose-600 group-hover:scale-105 transition-transform">!</div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-slate-900 truncate text-sm">{c.freelance}</p>
                           <p className="text-[10px] font-semibold text-rose-600 uppercase truncate">Contact Entrant</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-[10px] font-semibold text-slate-400 italic p-4 text-center border border-slate-200 border-dashed rounded-xl bg-slate-50">Aucune demande en attente.</p>}
                 </div>

                 {/* DMs Freelances (Validés) */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-sm border-b border-slate-200 pb-2 text-purple-600">⚡️ Échanges Vivier</h4>
                   {inbox.filter(c => c.type === 'dm_freelance' && freelances.find(f => f.name === c.freelance)).length > 0 ? inbox.filter(c => c.type === 'dm_freelance' && freelances.find(f => f.name === c.freelance)).map(c => (
                     <div key={c.id} className="bg-white border border-slate-200 p-4 rounded-xl cursor-pointer hover:border-purple-200 hover:shadow-sm transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`} alt="Avatar" /></div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-slate-900 truncate text-sm">{c.freelance}</p>
                           <p className="text-[10px] font-medium text-slate-500 uppercase truncate">{c.role}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-[10px] font-medium text-slate-400 italic p-4 text-center border border-slate-200 border-dashed rounded-xl bg-slate-50">Aucun DM avec votre vivier.</p>}
                 </div>

                 {/* Project Chats */}
                 <div className="space-y-4 md:col-span-3 lg:col-span-1">
                   <h4 className="font-semibold text-sm border-b border-slate-200 pb-2 text-emerald-600">🛠 Chantiers en cours</h4>
                   {inbox.filter(c => c.type === 'project').length > 0 ? inbox.filter(c => c.type === 'project').map(c => (
                     <div key={c.id} className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-xl cursor-pointer hover:bg-emerald-50 hover:shadow-sm transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border border-slate-200 bg-white rounded-full overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"><MessageSquare size={16} className="text-slate-500" /></div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-slate-900 truncate text-sm">{c.title}</p>
                           <p className="text-xs font-medium text-slate-500 truncate">{c.company} • Équipe matchée</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-medium text-slate-400 italic p-4 text-center border border-slate-200 border-dashed rounded-xl bg-slate-50">Aucun chantier en cours.</p>}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'opportunites' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">Opportunités (Marché & Acceptées)</h3>
                
                <div className="space-y-6">
                  {opportunities.map(opp => (
                    <SoftCard key={opp.id} className={`transition-all border ${opp.status === 'matched' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-sm'} rounded-2xl`}>
                      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-6 items-center flex-1 min-w-[300px]">
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${opp.status === 'matched' ? 'bg-emerald-100 border-emerald-300' : 'bg-indigo-50 border-indigo-100'}`}>
                            {opp.status === 'matched' ? <CheckCircle size={28} className="text-emerald-600" /> : <Briefcase size={28} className="text-indigo-600" />}
                          </div>
                          <div className="truncate">
                            <h4 className="font-bold text-xl text-slate-900 truncate">{opp.title}</h4>
                            <p className="font-medium text-slate-500 text-sm truncate">{opp.company} • Budget: <span className="font-semibold text-slate-700">{opp.budget} €</span> • {opp.resources}</p>
                          </div>
                        </div>
                        {opp.status === 'matched' ? (
                          <div className="flex flex-wrap gap-4 w-full md:w-auto mt-4 md:mt-0 items-center justify-end">
                            <SoftBadge color="green" className="bg-emerald-50 text-emerald-700 border-emerald-200">Contrats Entamés</SoftBadge>
                            <SoftButton variant="black" className="rounded-xl px-5 py-2.5 text-sm shadow-sm" onClick={() => openChatFromOpp(opp)}><MessageSquare size={16} strokeWidth={2} className="mr-2 inline" /> Ouvrir Chat</SoftButton>
                            <SoftButton variant="white" className="rounded-xl px-5 py-2.5 text-sm shadow-sm border-slate-200" onClick={() => handleRequestVerification(opp.id)}><Check size={16} strokeWidth={2} className="mr-2 inline" /> Annoncer Fin de Mission</SoftButton>
                          </div>
                        ) : opp.status === 'pending_verification' ? (
                          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0 items-center">
                            <SoftBadge color="yellow" className="bg-amber-50 text-amber-700 border-amber-200">⏳ En cours de vérification par l'Entreprise</SoftBadge>
                            <SoftButton variant="black" className="rounded-xl px-4 py-2 text-sm shadow-sm" onClick={() => openChatFromOpp(opp)}><MessageSquare size={16} strokeWidth={2} className="mr-2 inline" /> Ouvrir Chat</SoftButton>
                          </div>
                        ) : opp.status === 'completed_by_company' ? (
                          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0 items-center">
                            <SoftBadge color="blue" className="bg-indigo-50 text-indigo-700 border-indigo-200">✅ Validé et Payé (Fonds Débloqués)</SoftBadge>
                          </div>
                        ) : (
                          <SoftButton variant="blue" className="px-6 py-3 rounded-xl shadow-sm" onClick={() => openTeamBuilder(opp)}>Matcher ce besoin</SoftButton>
                        )}
                      </div>
                    </SoftCard>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'chat' && activeChat && (
             <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setActiveTab('messagerie')} className="font-semibold text-sm text-slate-500 hover:text-slate-900 mb-4 flex items-center gap-2 transition-colors"><ChevronRight className="rotate-180" size={18}/> Retour à la messagerie</button>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px] xl:h-[700px]">
                   <header className="bg-white border-b border-slate-200 px-6 py-4 md:px-8 flex justify-between items-center z-10 shrink-0">
                     <div className="overflow-hidden flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                          {activeChat.type === 'project' ? <MessageSquare size={20} className="text-slate-400" /> : <img src={`https://api.dicebear.com/7.x/${activeChat.type === 'dm_company' ? 'shapes' : 'avataaars'}/svg?seed=${activeChat.avatar || 12}`} alt="avatar" className="w-full h-full object-cover" />}
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-slate-900 truncate flex items-center gap-2">
                           {activeChat.title || activeChat.freelance}
                         </h3>
                         <p className="font-medium text-slate-500 text-sm truncate">
                           {activeChat.type === 'dm_company' && 'Prospection Entreprise'}
                           {activeChat.type === 'dm_freelance' && 'Direct Message Talent'}
                           {activeChat.type === 'project' && 'Communication de Chantier'}
                           {activeChat.company ? ` • ${activeChat.company}` : ''}
                         </p>
                       </div>
                     </div>
                   </header>
                   
                   <div className="bg-slate-50 py-2.5 text-center border-b border-slate-100 font-medium text-xs text-slate-500 tracking-wide uppercase shrink-0">
                     Participants: Vous (Marc)
                     {activeChat.type === 'dm_company' || activeChat.type === 'project' ? `, ${activeChat.company}` : ''}
                     {activeChat.type === 'dm_freelance' ? `, ${activeChat.freelance}` : ''}
                     {activeChat.type === 'project' && activeChat.assignedFreelances ? `, ${activeChat.assignedFreelances.map(f => f.name).join(', ')}` : ''}
                   </div>

                   <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-50">
                      {/* Banner that pops up if an unknown freelance sends a DM asking for representation */}
                      {activeChat.type === 'dm_freelance' && !freelances.find(f => f.name === activeChat.freelance) && (
                        <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-6 mb-6 shadow-sm animate-in slide-in-from-top-4">
                          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 text-lg"><Users size={20} /> Nouvelle demande de représentation</h4>
                          <p className="font-medium text-slate-700 text-sm mb-6">Ce talent vous a contacté depuis l'annuaire de la plateforme et souhaite intégrer votre Kanban Trello.</p>
                          <div className="flex flex-wrap gap-3">
                            <SoftButton variant="white" className="py-2.5 text-xs rounded-xl shadow-sm border-slate-200" onClick={() => setSelectedProfile({ ...activeChat, type: 'freelance', name: activeChat.freelance })}><Search size={14} className="mr-2 inline" /> Voir la Fiche Synapse</SoftButton>
                            <SoftButton variant="black" className="py-2.5 text-xs rounded-xl shadow-sm" onClick={() => {
                              const newTalent = {
                                id: Date.now(),
                                name: activeChat.freelance,
                                role: activeChat.role,
                                cost: activeChat.cost || 300,
                                note: activeChat.note || 5,
                                initial: activeChat.freelance.substring(0,2).toUpperCase(),
                                pipeline: 'contact',
                                avatar: activeChat.avatar,
                                bio: activeChat.bio || "Nouveau talent du réseau",
                                portfolio: activeChat.portfolio,
                                github: activeChat.github,
                                skills: activeChat.skills,
                                education: activeChat.education,
                                availability: 'available'
                              };
                              setFreelances([...freelances, newTalent]);
                              const msg = { text: "✅ Bonne nouvelle Lucas ! J'ai bien reçu votre demande et vous ai ajouté à mon vivier (Catégorie : Contact). Je vous proposerai des missions très vite !", sender: 'Moi (Apporteur)', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                              const updatedChat = { ...activeChat, messages: [...activeChat.messages, msg] };
                              setActiveChat(updatedChat);
                              setInbox(inbox.map(c => c.id === activeChat.id ? updatedChat : c));
                              showAlert("🎉 Talent accepté ! Il se trouve désormais dans votre colonne 'À Contacter' du Kanban.", "success");
                            }}><Check size={14} className="mr-2 inline" /> Accepter le Profil</SoftButton>
                            <button className="py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors flex items-center" onClick={() => {
                              const msg = { text: "❌ Bonjour. Malheureusement, mon emploi du temps est plein et je ne peux plus prendre de suivi. Bonne continuation !", sender: 'Moi (Apporteur)', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                              const updatedChat = { ...activeChat, messages: [...activeChat.messages, msg] };
                              setActiveChat(updatedChat);
                              setInbox(inbox.map(c => c.id === activeChat.id ? updatedChat : c));
                            }}><X size={14} className="mr-2 inline" /> Refuser</button>
                          </div>
                        </div>
                      )}

                      {activeChat.messages && activeChat.messages.length > 0 ? (
                         <div className="space-y-6">
                           {activeChat.messages.map((msg, i) => (
                             <div key={i} className={`flex gap-4 ${msg.sender === 'Moi (Apporteur)' ? 'justify-end' : ''}`}>
                               {msg.sender !== 'Moi (Apporteur)' && (
                                 <div className={`w-10 h-10 border border-slate-200 rounded-full overflow-hidden shrink-0 bg-white shadow-sm`}>
                                   <img src={`https://api.dicebear.com/7.x/${msg.isFreelance ? 'avataaars' : 'shapes'}/svg?seed=${msg.avatar || 50}`} alt={msg.sender} className="w-full h-full object-cover" />
                                 </div>
                               )}
                               <div className={`${msg.sender === 'Moi (Apporteur)' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'} p-4 rounded-2xl ${msg.sender === 'Moi (Apporteur)' ? 'rounded-br-sm' : 'rounded-bl-sm'} max-w-[85%] md:max-w-[75%] shadow-sm`}>
                                 <p className={`font-medium whitespace-pre-line leading-relaxed ${msg.sender === 'Moi (Apporteur)' ? 'text-white' : 'text-slate-800'}`}>{msg.text}</p>
                                 <span className={`text-[10px] font-semibold uppercase mt-2 block ${msg.sender === 'Moi (Apporteur)' ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.sender} • {msg.time}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                      ) : (
                        <div className="h-full flex items-center justify-center flex-col text-center opacity-70">
                          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                            <MessageSquare size={32} />
                          </div>
                          <p className="font-bold text-slate-500 text-lg">Nouvelle discussion</p>
                          <p className="text-sm font-medium text-slate-400 mt-2">Envoyez le message pré-rempli pour entamer la discussion.</p>
                        </div>
                      )}
                   </div>

                   <footer className="p-5 border-t border-slate-200 bg-white flex gap-3 shrink-0 items-center">
                      <input 
                         placeholder="Écrire un message..." 
                         className="w-full flex-1 border border-slate-200 rounded-xl px-5 py-3.5 font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 ring-indigo-100 transition-all bg-slate-50 hover:bg-white" 
                         value={chatInput} 
                         onChange={(e) => setChatInput(e.target.value)}
                         onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      />
                      <SoftButton 
                         variant="blue" 
                         className="px-6 py-3.5 rounded-xl shadow-sm h-full flex items-center justify-center" 
                         onClick={handleSendMessage}
                      >
                         <Send size={18} />
                      </SoftButton>
                   </footer>
                </div>
             </div>
           )}

           {activeTab === 'finance' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">Finance & Escrow</h3>
               <p className="font-medium text-slate-500 mb-8">Consultez les fonds bloqués pour vos équipes et vos commissions perçues.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Fonds Tiers (En Escrow)" color="yellow" className="bg-amber-50/50 border border-amber-200">
                   <p className="text-4xl font-bold text-slate-900">6 500 €</p>
                   <p className="text-sm font-semibold mt-2 text-amber-700">Sécurisés en attente de clôture (Entreprise)</p>
                 </SoftCard>
                 <SoftCard title="Commissions Net (Débloquées)" color="green" className="bg-emerald-50/50 border border-emerald-200">
                   <p className="text-4xl font-bold text-slate-900">14 500 €</p>
                   <p className="text-sm font-semibold mt-2 text-emerald-700">Revenus générés via Synapse</p>
                 </SoftCard>
               </div>

               <SoftCard title="Historique récent des Fonds Actifs" className="border border-slate-200">
                 <div className="space-y-4">
                   <div className="border border-slate-200 rounded-2xl p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm hover:border-indigo-200 transition-all group">
                     <div>
                       <h4 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">Création Landing Page E-commerce</h4>
                       <p className="font-medium text-slate-500 mt-1 text-sm">Validation Entreprise effectuée. Équipe technique en mission.</p>
                     </div>
                     <div className="text-right flex flex-col items-end">
                       <p className="font-bold text-2xl text-amber-600 mb-2">1 500 €</p>
                       <SoftBadge color="yellow" className="bg-amber-50 text-amber-700 border-amber-200">Fonds Sécurisés</SoftBadge>
                     </div>
                   </div>
                   {finishedContracts.map(c => (
                     <div key={c.id} className="border border-slate-200 border-dashed rounded-2xl p-5 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 opacity-75 hover:opacity-100 transition-opacity">
                       <div>
                         <p className="font-bold text-slate-900">{c.title}</p>
                         <p className="text-sm font-medium text-slate-500 mt-1">Contrat terminé et avalisé par l'Entreprise ({c.company})</p>
                       </div>
                       <div className="text-right flex flex-col items-end">
                         <p className="font-bold text-emerald-600 mb-2 text-xl">{c.budget}</p>
                         <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-1.5 rounded-md">Commission perçue</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'vivier' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <div className="flex justify-between items-end flex-wrap gap-4">
                 <div>
                   <h3 className="text-3xl font-bold tracking-tight text-slate-900">Pipelines du Vivier</h3>
                   <p className="font-medium text-slate-500 mt-1">Gérez vos talents qualifiés dans un espace Kanban.</p>
                 </div>
                 <SoftButton variant="blue" className="px-6 py-2.5 shrink-0 rounded-xl shadow-sm" onClick={() => showAlert("Lien de recrutement copié : https://synapse.digital/join/apporteur_marcd", "success")}><Link size={18} className="mr-2 inline" strokeWidth={2} /> Inviter Talent (Affiliation)</SoftButton>
               </div>
               
               <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-8">
                 {['contact', 'nego', 'placed'].map(col => (
                   <div key={col} className="flex-1 min-w-[320px] bg-slate-50/80 border border-slate-200 rounded-2xl flex flex-col max-h-[70vh]">
                     <div className="p-4 border-b border-slate-200 bg-white rounded-t-2xl shrink-0">
                       <h4 className="font-bold text-lg flex items-center gap-2 text-slate-900">
                         {col === 'contact' && <span className="w-3 h-3 bg-sky-500 rounded-full shadow-sm"/>}
                         {col === 'nego' && <span className="w-3 h-3 bg-amber-400 rounded-full shadow-sm"/>}
                         {col === 'placed' && <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"/>}
                         {col === 'contact' ? 'À Contacter' : col === 'nego' ? 'En Négociation' : 'Mission Placé'} 
                         <span className="ml-auto text-sm font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{freelances.filter(f => f.pipeline === col).length}</span>
                       </h4>
                     </div>
                     <div 
                         className="p-4 overflow-y-auto space-y-4 flex-1 transition-colors hover:bg-slate-100/50 rounded-b-2xl"
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => {
                           e.preventDefault();
                           const fId = e.dataTransfer.getData('fId');
                           if(fId) {
                             setFreelances(freelances.map(fr => fr.id === parseInt(fId) ? { ...fr, pipeline: col } : fr));
                           }
                         }}
                      >
                        {freelances.filter(f => f.pipeline === col).map(f => (
                          <div 
                             key={f.id} 
                             draggable
                             onDragStart={(e) => e.dataTransfer.setData('fId', f.id)}
                             className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-200 hover:shadow hover:-translate-y-0.5 transition-all group"
                          >
                           <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold shrink-0">{f.initial || f.name.substring(0,2).toUpperCase()}</div>
                               <div className="overflow-hidden">
                                 <h5 className="font-bold text-slate-900 leading-tight truncate group-hover:text-indigo-600 transition-colors">{f.name}</h5>
                                 <p className="text-xs font-medium text-slate-500 truncate">{f.role}</p>
                               </div>
                             </div>
                             <SoftBadge color="blue" className="text-xs bg-sky-50 text-sky-700 border-sky-200 shrink-0">{f.rate || f.cost}€/j</SoftBadge>
                           </div>
                           <div className="flex justify-between items-center">
                             <div className="flex gap-1 text-amber-500">
                               {[1,2,3,4,5].map(star => <Star key={star} size={14} fill={star <= (f.note || f.rating) ? "currentColor" : "none"} strokeWidth={1.5} />)}
                             </div>
                             <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors" onClick={() => setSelectedProfile({ ...f, type: 'freelance' })}>Voir Profil</button>
                           </div>
                         </div>
                       ))}
                       {freelances.filter(f => f.pipeline === col).length === 0 && <div className="text-center p-6 border border-slate-200 border-dashed rounded-xl bg-white/50"><p className="text-sm font-medium text-slate-400">Glissez des profils ici</p></div>}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'contrats_finis' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">Contrats Terminés (Historique)</h3>
                <div className="space-y-6">
                  {finishedContracts.map(fc => (
                    <SoftCard key={fc.id} className="bg-white border border-slate-200 shadow-sm">
                      <div className="border-b border-slate-200 pb-6 mb-6">
                         <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                               <h4 className="text-2xl font-bold text-slate-900">{fc.title}</h4>
                               <p className="font-medium text-slate-500 mt-1">{fc.company} • Budget: <span className="font-bold text-slate-700">{fc.budget}</span></p>
                            </div>
                            <SoftBadge color="blue" className="bg-indigo-50 text-indigo-700 border-indigo-200">Terminé le 12 Mars 2026</SoftBadge>
                         </div>
                         <div className="mt-4 flex gap-2 flex-wrap">
                           {fc.freelances.map(name => (
                             <SoftBadge key={name} color="purple" className="bg-purple-50 text-purple-700 border-purple-200">{name} (Freelance)</SoftBadge>
                           ))}
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Review */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                           <div className="flex justify-between items-center mb-4">
                             <p className="font-bold text-sm text-slate-700">Avis de l'Entreprise</p>
                             <div className="flex gap-1 text-amber-500">
                               {[...Array(5)].map((_, i) => <Star key={i} fill={i < fc.companyReview.rating ? 'currentColor' : 'none'} size={16} />)}
                             </div>
                           </div>
                           <p className="font-medium text-slate-600 italic">"{fc.companyReview.comment}"</p>
                        </div>
                        
                        {/* Freelance Review */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                           <div className="flex justify-between items-center mb-4">
                             <p className="font-bold text-sm text-slate-700">Avis des Freelances</p>
                             <div className="flex gap-1 text-amber-500">
                               {[...Array(5)].map((_, i) => <Star key={i} fill={i < fc.freelanceReview.rating ? 'currentColor' : 'none'} size={16} />)}
                             </div>
                           </div>
                           <p className="font-medium text-slate-600 italic">"{fc.freelanceReview.comment}"</p>
                        </div>
                      </div>
                    </SoftCard>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'search_freelances' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">Rechercher des Talents</h3>
               <SoftInput placeholder="Nom, métier, techno..." icon={Search} />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                 {genericFreelances.length > 0 ? genericFreelances.map(f => (
                   <SoftCard key={f.id} className="text-center group overflow-hidden border border-slate-200 hover:border-indigo-200 transition-all shadow-sm">
                     <div 
                        className="cursor-pointer group-hover:bg-slate-50 -mx-6 -mt-6 p-6 transition-colors" 
                        onClick={() => setSelectedProfile({ ...f, type: 'freelance' })}
                     >
                       <div className="w-16 h-16 mx-auto border border-slate-200 rounded-full overflow-hidden bg-slate-50 mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.avatar}`} alt={f.name} className="w-full h-full object-cover" />
                       </div>
                       <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{f.name}</h4>
                       <p className="font-medium text-slate-500 text-xs mt-1">Clic pour voir profil</p>
                     </div>
                     <SoftButton className="w-full mt-4 py-2.5 text-xs rounded-lg border-slate-200" variant="white" onClick={() => handleAddGenericToVivier(f)}>
                       <Plus size={14} className="mr-2 inline" strokeWidth={2} /> Ajouter au vivier
                     </SoftButton>
                   </SoftCard>
                 )) : (
                   <p className="font-medium text-slate-500 italic col-span-3 text-center bg-slate-50 border border-slate-200 border-dashed rounded-xl p-8">Aucun nouveau talent ne correspond à la recherche.</p>
                 )}
               </div>
             </div>
           )}

           {activeTab === 'search_companies' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">Annuaire des Entreprises</h3>
               <SoftInput placeholder="Rechercher partenaires (nom, secteur)..." icon={Search} />
               <div className="space-y-6 pt-4">
                 {companies.map(c => {
                   const opps = getCompanyOpportunities(c.name).length;
                   return (
                     <SoftCard key={c.id} className="cursor-pointer hover:border-indigo-200 hover:shadow-sm border border-slate-200 bg-white transition-all group" onClick={() => setSelectedProfile({ ...c, type: 'company', matches: opps })}>
                       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                         <div className="flex items-center gap-6 w-full md:w-auto">
                           <div className="w-16 h-16 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-sm shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                             <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${c.avatar}`} alt={c.name} />
                           </div>
                           <div>
                             <h4 className="font-bold text-2xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{c.name}</h4>
                             <p className="font-medium text-slate-500 text-sm mt-1">{c.sector}</p>
                           </div>
                         </div>
                         <SoftBadge color="blue" className="bg-sky-50 text-sky-700 border-sky-200 shrink-0">{opps} Offre{opps > 1 ? 's' : ''} en cours (Clic pour voir)</SoftBadge>
                       </div>
                     </SoftCard>
                   );
                 })}
               </div>
             </div>
           )}

           {activeTab === 'team_builder' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
               <div className="flex justify-between items-center bg-indigo-950 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden shrink-0">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 mix-blend-multiply pointer-events-none" />
                 <div className="relative z-10 w-full">
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Team Builder 🛠</h3>
                   <div className="flex justify-between w-full mt-4 items-end flex-wrap gap-4">
                     <p className="font-medium text-indigo-200 text-sm md:text-base">Budget Alloué : <span className="text-white font-bold tracking-wide text-lg">{teamBuilder.totalBudget} €</span></p>
                     <p className="font-semibold text-amber-500 bg-amber-500/10 px-4 py-2 rounded-xl text-sm border border-amber-500/30 shadow-sm shrink-0">
                       Talents requis : {teamBuilder.assignedFreelances.length} / {teamBuilder.requiredFreelances}
                     </p>
                   </div>
                 </div>
                 <Calculator size={100} className="absolute right-10 opacity-[0.05] hidden md:block text-indigo-100" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <SoftCard title="Sélection depuis le Vivier" color="purple" className="bg-slate-50 border border-slate-200 h-full flex flex-col">
                   <div className="space-y-4 overflow-y-auto max-h-[500px] flex-1">
                     {freelances.map(f => {
                       const isAdded = teamBuilder.assignedFreelances.find(x => x.id === f.id);
                       const isBusy = f.availability === 'busy';
                       return (
                         <div key={f.id} className={`border border-slate-200 rounded-2xl p-4 flex justify-between items-center transition-all ${isAdded ? 'bg-indigo-50/50 opacity-60 border-indigo-200' : 'bg-white hover:border-indigo-300 hover:shadow-sm'} ${isBusy ? 'bg-slate-50 opacity-50 grayscale' : ''}`}>
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 border border-slate-200 rounded-full overflow-hidden shrink-0 bg-white flex items-center justify-center font-bold text-slate-500 shadow-sm"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.avatar}`} /></div>
                             <div className="overflow-hidden">
                               <p className={`font-bold truncate max-w-[120px] md:max-w-[200px] ${isAdded ? 'text-indigo-900' : 'text-slate-900'}`}>{f.name}</p>
                               <p className="text-[11px] font-medium text-slate-500 truncate">{f.role} • <span className="text-slate-700 font-bold">{f.cost}€</span></p>
                               {isBusy && <p className="text-[10px] text-rose-500 font-semibold uppercase mt-0.5 tracking-wide">En Mission</p>}
                             </div>
                           </div>
                           {!isAdded ? (
                             <button onClick={() => addToTeam(f)} className="bg-white text-indigo-600 border border-slate-200 w-9 h-9 flex items-center justify-center rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-200 shadow-sm transition-all shrink-0 active:scale-95" disabled={isBusy}><Plus size={16} strokeWidth={2.5}/></button>
                           ) : (
                             <button onClick={() => removeFromTeam(f.id)} className="bg-rose-50 text-rose-600 border border-rose-200 w-9 h-9 flex items-center justify-center rounded-xl font-bold hover:bg-rose-100 shadow-sm transition-all shrink-0 active:scale-95"><Minus size={16} strokeWidth={2.5} /></button>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 </SoftCard>

                 <SoftCard title="Équipe Constituée & Deal" color="yellow" className="bg-slate-50 border border-slate-200 flex flex-col h-full">
                   <div className="space-y-6 h-full flex flex-col">
                     {teamBuilder.assignedFreelances.length === 0 ? (
                       <div className="flex-1 flex items-center justify-center p-8 bg-white border border-slate-200 border-dashed rounded-2xl text-center">
                          <p className="font-medium text-slate-400">Ajoutez des freelances à l'équipe depuis votre vivier pour commencer la simulation de commission.</p>
                       </div>
                     ) : (
                       <div className="space-y-4 flex-1 overflow-y-auto max-h-[350px]">
                         {teamBuilder.assignedFreelances.map(f => (
                           <div key={`team-${f.id}`} className="flex justify-between items-center border border-indigo-100 bg-white p-4 rounded-xl shadow-sm">
                             <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.avatar}`} /></div>
                                <span className="font-semibold text-slate-900 truncate pr-4">{f.name}</span>
                             </div>
                             <span className="font-bold text-slate-700 shrink-0">{f.cost} € <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Net/j</span></span>
                           </div>
                         ))}
                       </div>
                     )}

                     <div className="pt-6 border-t border-slate-200 mt-auto shrink-0 bg-slate-50 pb-2">
                       <div className="flex justify-between items-center mb-6">
                         <span className="font-semibold text-slate-600">Marge Prévue (Commission)</span>
                         <span className={`font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors text-lg tracking-wide ${calculateCommission() >= 0 ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'}`}>
                           {calculateCommission() > 0 ? '+' : ''}{calculateCommission()} €
                         </span>
                       </div>

                       <SoftButton 
                          className="w-full text-base py-4 rounded-xl shadow-sm" 
                          variant={teamBuilder.assignedFreelances.length !== teamBuilder.requiredFreelances || calculateCommission() < 0 ? 'white' : 'blue'} 
                          disabled={teamBuilder.assignedFreelances.length !== teamBuilder.requiredFreelances || calculateCommission() < 0} 
                          onClick={handleSendContracts}
                        >
                         <Send size={18} className="mr-2 inline" strokeWidth={2} /> Valider l'équipe et envoyer les contrats
                       </SoftButton>
                     </div>
                   </div>
                 </SoftCard>
               </div>
             </div>
           )}


        </div>
      </main>
    </div>
  );
};

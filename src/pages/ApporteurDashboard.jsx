import React, { useState } from 'react';
import { Zap, LayoutDashboard, Component, Users, FileText, Wallet, LogOut, Target, Briefcase, ChevronRight, Calculator, Send, Search, Building, Star, CheckCircle, X, MessageSquare, Globe, GitBranch, FileUp, Inbox, Link, BarChart, Activity, ShieldCheck, Plus, ChevronDown, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans relative">
      
      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300 overflow-y-auto pt-24 pb-12">
          <div className="max-w-2xl w-full animate-in zoom-in duration-300 my-auto">
            <SoftCard title={`Fiche : ${selectedProfile.name}`} color="white" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px]">
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-8 right-8 w-12 h-12 border-[3px] border-black rounded-full flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Fermer"
              >
                <X size={24} strokeWidth={3} />
              </button>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 shrink-0 border-[4px] border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFEB3B]">
                    {selectedProfile.type === 'company' ? (
                       <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-black uppercase italic">{selectedProfile.name}</h3>
                    <p className="font-bold text-gray-500 uppercase tracking-widest text-lg">{selectedProfile.sector || selectedProfile.role}</p>
                    <div className="flex justify-center md:justify-start items-center gap-2 font-black text-2xl text-yellow-500 mt-2">
                      <Star fill="currentColor" size={24} /> {selectedProfile.rating || selectedProfile.note} / 5
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-6 rounded-[20px] border-[3px] border-black text-left">
                  <p className="font-bold text-lg whitespace-pre-line">"{selectedProfile.bio}"</p>
                </div>

                {selectedProfile.type === 'freelance' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {selectedProfile.skills?.map(skill => (
                        <SoftBadge key={skill} color="purple">{skill}</SoftBadge>
                      ))}
                      <SoftBadge color="blue">{selectedProfile.exp || 'Expérience'}</SoftBadge>
                      <SoftBadge color="green">{selectedProfile.education || 'Formation'}</SoftBadge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {selectedProfile.portfolio && (
                         <a href={`https://${selectedProfile.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white border-[3px] border-black rounded-2xl font-black hover:bg-gray-50 transition-colors uppercase text-sm">
                           <Globe size={20} className="text-blue-500" /> Portfolio: {selectedProfile.portfolio}
                         </a>
                       )}
                       {selectedProfile.github && (
                         <a href={`https://github.com/${selectedProfile.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white border-[3px] border-black rounded-2xl font-black hover:bg-gray-50 transition-colors uppercase text-sm">
                           <GitBranch size={20} /> Github: {selectedProfile.github}
                         </a>
                       )}
                       {selectedProfile.cvUrl && (
                         <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] border-[3px] border-black rounded-2xl font-black cursor-pointer hover:bg-[#C8E6C9] transition-colors uppercase text-sm">
                           <FileUp size={20} className="text-green-600" /> Télécharger CV & Lettre
                         </div>
                       )}
                    </div>
                    
                    <SoftButton variant="yellow" className="w-full text-lg py-4 shadow-sm" onClick={() => directMessageFreelance(selectedProfile)}>
                      <MessageSquare size={18} className="inline mr-2" /> Contacter (DM)
                    </SoftButton>
                  </div>
                )}

                {selectedProfile.type === 'company' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {selectedProfile.creationYear && <SoftBadge color="yellow">Créée en {selectedProfile.creationYear}</SoftBadge>}
                      {selectedProfile.size && <SoftBadge color="blue">{selectedProfile.size}</SoftBadge>}
                    </div>
                    {selectedProfile.website && (
                       <a href={`https://${selectedProfile.website}`} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-3 p-4 bg-white border-[3px] border-black rounded-2xl font-black hover:bg-gray-50 transition-colors uppercase text-sm w-full md:w-auto mt-2">
                         <Globe size={20} className="text-blue-500" /> Site Web: {selectedProfile.website}
                       </a>
                    )}
                    <h4 className="font-black text-xl uppercase italic border-t-[3px] border-black pt-6">Contrats Ouverts</h4>
                    {getCompanyOpportunities(selectedProfile.name).length > 0 ? (
                      getCompanyOpportunities(selectedProfile.name).map(opp => (
                        <div key={opp.id} className="bg-white border-[3px] border-black rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                          <div>
                            <p className="font-black uppercase">{opp.title}</p>
                            <p className="font-bold text-gray-500 text-xs uppercase tracking-widest">{opp.budget} € • {opp.resources}</p>
                          </div>
                          <SoftButton variant="yellow" className="w-full md:w-auto text-xs py-2 shadow-sm rounded-xl" onClick={() => directMessageCompany({ ...opp, avatar: selectedProfile.avatar })}>
                            <MessageSquare size={14} className="inline mr-2" /> DM L'entreprise
                          </SoftButton>
                        </div>
                      ))
                    ) : (
                      <p className="font-bold text-gray-400 italic">Aucun contrat en cours pour cette entreprise.</p>
                    )}
                  </div>
                )}

                <SoftButton className="w-full text-xl py-6" variant="black" onClick={() => setSelectedProfile(null)}>
                  Fermer la Fiche
                </SoftButton>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-b-[4px] md:border-b-0 md:border-r-[4px] border-black p-8 flex flex-col space-y-12 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1" />
          </div>
          <span className="font-black text-2xl tracking-tighter">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-4 font-black uppercase italic text-sm">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'home' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><LayoutDashboard size={20} /> Accueil</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'messagerie' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Inbox size={20} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'finance' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Wallet size={20} /> Finance</button>
           <button onClick={() => setActiveTab('vivier')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'vivier' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Component size={20} /> Kanban Vivier</button>
           <button onClick={() => setActiveTab('analytique')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'analytique' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><BarChart size={20} /> Analytique (KPI)</button>
           <button onClick={() => setActiveTab('opportunites')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'opportunites' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Target size={20} /> Opportunités</button>
           <button onClick={() => setActiveTab('contrats_finis')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'contrats_finis' ? 'bg-[#FFCC80] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><CheckCircle size={20} /> Contrats Finis</button>
           
           <div className="h-px bg-black opacity-10 my-4" />
           <p className="text-[10px] text-gray-400 tracking-widest pl-2">Recherches</p>
           <button onClick={() => setActiveTab('search_freelances')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'search_freelances' ? 'bg-[#E3F2FD] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Search size={20} /> Freelances</button>
           <button onClick={() => setActiveTab('search_companies')} className={`flex items-center gap-5 w-full p-4 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'search_companies' ? 'bg-[#E3F2FD] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Building size={20} /> Entreprises</button>
        </nav>

        <div className="pt-8 border-t-[3px] border-black space-y-6">
           <div className="p-5 bg-[#FFE0B2] border-[3px] border-black rounded-[30px] flex items-center gap-5">
              <div className="w-14 h-14 bg-white border-[2px] border-black rounded-full flex items-center justify-center font-black overflow-hidden shadow-sm shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || 'Marc'}`} alt="avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate uppercase italic leading-tight">{user?.firstName || 'Marc'} {user?.lastName}</p>
                <SoftBadge color="orange">Apporteur</SoftBadge>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-black uppercase text-[12px] text-red-500 flex items-center justify-center gap-2 py-2 hover:bg-red-50 rounded-xl transition-all">
             <LogOut size={18} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto space-y-16">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-[6px] border-black pb-12">
              <div className="space-y-2">
                 <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Hello, <span className="text-[#FFCC80] underline decoration-8">{user?.firstName || 'Marc'}</span> !</h2>
                 <p className="font-bold text-gray-500 uppercase text-sm tracking-widest italic">Dashboard Apporteur d'Affaires • Connecteur de Talents.</p>
              </div>
              <div className="flex gap-4">
                <SoftButton variant="blue" className="rounded-full shadow-[6px_6px_0px_0px_#90CAF9] px-6 py-4" onClick={() => setActiveTab('search_companies')}><Building size={20} /></SoftButton>
                <SoftButton variant="black" className="rounded-full px-10 py-4 shadow-[8px_8px_0px_0px_#FFCC80]" onClick={() => setActiveTab('search_freelances')}>Chercher des talents</SoftButton>
              </div>
           </header>

           {activeTab === 'home' && (
             <div className="space-y-12 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <SoftCard title="Vivier" color="purple" icon={Users}>
                     <p className="text-5xl font-black italic">{freelances.length}</p>
                  </SoftCard>
                  <SoftCard title="Commissions Futures" color="yellow" icon={Wallet}>
                     <p className="text-5xl font-black italic">14 500 €</p>
                     <p className="text-xs font-bold text-gray-500 uppercase mt-2 text-right">Escrow Sécurisé</p>
                  </SoftCard>
                  <SoftCard title="Messages En Attente" color="blue" icon={MessageSquare}>
                     <p className="text-5xl font-black italic">{inbox.length}</p>
                  </SoftCard>
               </div>
               
               <SoftCard title="Opportunité Récente" color="white">
                 {opportunities.filter(o => o.status === 'open').length > 0 ? (
                   opportunities.filter(o => o.status === 'open').slice(0, 1).map(opp => (
                     <div key={opp.id} className="border-[3px] border-black rounded-[30px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex gap-6 items-center flex-1">
                          <div className="w-16 h-16 rounded-[20px] bg-[#E3F2FD] border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Zap size={32} strokeWidth={3} className="text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-black text-2xl uppercase italic">{opp.title}</h4>
                            <p className="font-bold text-gray-500 text-sm">{opp.company} • Budget: {opp.budget} € • {opp.resources}</p>
                          </div>
                        </div>
                        <SoftButton variant="yellow" onClick={() => openTeamBuilder(opp)}>Team Builder ⚡️</SoftButton>
                     </div>
                   ))
                 ) : (
                   <p className="font-bold italic text-gray-500 text-center">Aucune nouvelle opportunité ouverte.</p>
                 )}
               </SoftCard>
             </div>
           )}

           {activeTab === 'analytique' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Analytique & KPIs</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <SoftCard title="Taux de Conversion" color="blue" icon={Activity}>
                   <p className="text-4xl font-black italic">68%</p>
                 </SoftCard>
                 <SoftCard title="Missions Actives" color="green" icon={Briefcase}>
                   <p className="text-4xl font-black italic">12</p>
                 </SoftCard>
                 <SoftCard title="Commissions" color="yellow" icon={Wallet}>
                   <p className="text-4xl font-black italic">14.5k€</p>
                 </SoftCard>
                 <SoftCard title="Vivier" color="purple" icon={Users}>
                   <p className="text-4xl font-black italic">{freelances.length}</p>
                 </SoftCard>
               </div>
               <SoftCard title="Performance Mensuelle">
                 <div className="h-64 flex items-center justify-center border-[3px] border-dashed border-black rounded-[20px] bg-gray-50">
                   <p className="font-black text-gray-400 uppercase italic">Graphique de performance (Mockup)</p>
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Messagerie (Inbox)</h3>
               <p className="font-bold text-gray-500 mb-8">Retrouvez toutes vos conversations de prospection et de chantiers en cours.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* DMs Entreprises */}
                 <div className="space-y-4">
                   <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-blue-500">🏢 Prospection Entreprises</h4>
                   {inbox.filter(c => c.type === 'dm_company').length > 0 ? inbox.filter(c => c.type === 'dm_company').map(c => (
                     <div key={c.id} className="bg-white border-[3px] border-black p-4 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border-[2px] border-black rounded-full overflow-hidden shrink-0"><img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${c.avatar}`} /></div>
                         <div className="overflow-hidden">
                           <p className="font-black uppercase truncate text-sm">{c.company}</p>
                           <p className="text-xs font-bold text-gray-500 truncate">{c.title}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-bold text-gray-400 italic">Aucun DM envoyé.</p>}
                 </div>

                 {/* Demandes de représentation (Nouvelles) */}
                 <div className="space-y-4">
                   <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-orange-500">⏳ Nouvelles Demandes (Talents)</h4>
                   {inbox.filter(c => c.type === 'dm_freelance' && !freelances.find(f => f.name === c.freelance)).length > 0 ? inbox.filter(c => c.type === 'dm_freelance' && !freelances.find(f => f.name === c.freelance)).map(c => (
                     <div key={c.id} className="bg-[#FFF3E0] border-[3px] border-black p-4 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border-[2px] border-black rounded-full overflow-hidden shrink-0 bg-orange-100 flex items-center justify-center font-black">!</div>
                         <div className="overflow-hidden">
                           <p className="font-black uppercase truncate text-sm">{c.freelance}</p>
                           <p className="text-[10px] font-black text-gray-700 uppercase truncate">Contact Entrant</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-[10px] font-black uppercase text-gray-400 italic">Aucune demande en attente.</p>}
                 </div>

                 {/* DMs Freelances (Validés) */}
                 <div className="space-y-4">
                   <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-purple-500">⚡️ Échanges avec le Vivier</h4>
                   {inbox.filter(c => c.type === 'dm_freelance' && freelances.find(f => f.name === c.freelance)).length > 0 ? inbox.filter(c => c.type === 'dm_freelance' && freelances.find(f => f.name === c.freelance)).map(c => (
                     <div key={c.id} className="bg-white border-[3px] border-black p-4 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#E8F5E9] border-[2px] border-black rounded-full overflow-hidden shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`} /></div>
                         <div className="overflow-hidden">
                           <p className="font-black uppercase truncate text-sm">{c.freelance}</p>
                           <p className="text-[10px] font-black text-gray-500 uppercase truncate">{c.role}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-[10px] font-black uppercase text-gray-400 italic">Aucun DM avec votre vivier.</p>}
                 </div>

                 {/* Project Chats */}
                 <div className="space-y-4">
                   <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-green-500">🛠 Communication Chantiers</h4>
                   {inbox.filter(c => c.type === 'project').length > 0 ? inbox.filter(c => c.type === 'project').map(c => (
                     <div key={c.id} className="bg-[#E8F5E9] border-[3px] border-black p-4 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 border-[2px] border-black bg-white rounded-full overflow-hidden flex items-center justify-center shrink-0"><MessageSquare size={16} /></div>
                         <div className="overflow-hidden">
                           <p className="font-black uppercase truncate text-sm">{c.title}</p>
                           <p className="text-xs font-bold text-gray-500 truncate">{c.company} • Équipe matchée</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-bold text-gray-400 italic">Aucun chantier en cours.</p>}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'opportunites' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Opportunités (Marché & Acceptées)</h3>
                
                <div className="space-y-6">
                  {opportunities.map(opp => (
                    <SoftCard key={opp.id} className={`transition-colors ${opp.status === 'matched' ? 'bg-[#E8F5E9] border-dashed text-gray-600' : 'hover:bg-gray-50'}`}>
                      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-6 items-center flex-1 min-w-[300px]">
                          <div className={`w-16 h-16 rounded-[20px] border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 ${opp.status === 'matched' ? 'bg-[#81C784]' : 'bg-[#E3F2FD]'}`}>
                            {opp.status === 'matched' ? <CheckCircle size={32} strokeWidth={3} className="text-white" /> : <Briefcase size={32} strokeWidth={3} className="text-blue-500" />}
                          </div>
                          <div className="truncate">
                            <h4 className="font-black text-2xl uppercase italic truncate">{opp.title}</h4>
                            <p className="font-bold text-gray-500 text-sm truncate">{opp.company} • Budget: {opp.budget} € • {opp.resources}</p>
                          </div>
                        </div>
                        {opp.status === 'matched' ? (
                          <div className="flex flex-wrap gap-4 w-full md:w-auto mt-4 md:mt-0 items-center justify-end">
                            <SoftBadge color="green">Contrats Entamés</SoftBadge>
                            <SoftButton variant="black" className="rounded-xl px-4 py-2 text-sm shadow-none" onClick={() => openChatFromOpp(opp)}><MessageSquare size={16} /> Ouvrir Chat</SoftButton>
                            <SoftButton variant="yellow" className="rounded-xl px-4 py-2 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => handleRequestVerification(opp.id)}><Check size={16} className="mr-1 inline" /> Annoncer Fin de Mission</SoftButton>
                          </div>
                        ) : opp.status === 'pending_verification' ? (
                          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0 items-center">
                            <SoftBadge color="yellow">⏳ En cours de vérification par l'Entreprise</SoftBadge>
                            <SoftButton variant="black" className="rounded-xl px-4 py-2 text-sm shadow-none" onClick={() => openChatFromOpp(opp)}><MessageSquare size={16} /> Ouvrir Chat</SoftButton>
                          </div>
                        ) : opp.status === 'completed_by_company' ? (
                          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0 items-center">
                            <SoftBadge color="blue">✅ Validé et Payé (Fonds Débloqués)</SoftBadge>
                          </div>
                        ) : (
                          <SoftButton variant="yellow" onClick={() => openTeamBuilder(opp)}>Matcher ce besoin</SoftButton>
                        )}
                      </div>
                    </SoftCard>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'chat' && activeChat && (
             <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setActiveTab('messagerie')} className="font-black uppercase italic text-sm text-gray-500 hover:text-black mb-4 flex items-center gap-2"><ChevronRight className="rotate-180"/> Retour à la messagerie</button>
                <div className="bg-white border-[4px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[600px]">
                   <header className="bg-black text-white p-6 md:p-8 flex justify-between items-center z-10">
                     <div className="overflow-hidden">
                       <h3 className="text-2xl md:text-3xl font-black uppercase italic truncate">{activeChat.title || activeChat.freelance}</h3>
                       <p className="font-bold text-gray-400 truncate">
                         {activeChat.type === 'dm_company' && 'Prospection Entreprise'}
                         {activeChat.type === 'dm_freelance' && 'Direct Message Talent'}
                         {activeChat.type === 'project' && 'Communication de Chantier'}
                         {activeChat.company ? ` • ${activeChat.company}` : ''}
                       </p>
                     </div>
                     <MessageSquare size={40} className="text-blue-400 shrink-0 ml-4" />
                   </header>
                   
                   <div className="bg-[#E3F2FD] p-3 text-center border-b-[3px] border-black font-black uppercase text-xs italic tracking-widest text-[#1565C0]">
                     Participants : Vous (Marc)
                     {activeChat.type === 'dm_company' || activeChat.type === 'project' ? `, ${activeChat.company}` : ''}
                     {activeChat.type === 'dm_freelance' ? `, ${activeChat.freelance}` : ''}
                     {activeChat.type === 'project' && activeChat.assignedFreelances ? `, ${activeChat.assignedFreelances.map(f => f.name).join(', ')}` : ''}
                   </div>

                   <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 bg-[#F5F5F5]">
                      {/* Banner that pops up if an unknown freelance sends a DM asking for representation */}
                      {activeChat.type === 'dm_freelance' && !freelances.find(f => f.name === activeChat.freelance) && (
                        <div className="bg-[#E3F2FD] border-[4px] border-blue-500 rounded-[20px] p-6 mb-6 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] animate-in slide-in-from-top-4">
                          <h4 className="font-black text-blue-600 uppercase italic mb-2 flex items-center gap-2"><Users size={20} /> Nouvelle demande de représentation</h4>
                          <p className="font-bold text-gray-700 text-sm mb-6">Ce talent vous a contacté depuis l'annuaire de la plateforme et souhaite intégrer votre Kanban Trello.</p>
                          <div className="flex flex-wrap gap-4">
                            <SoftButton variant="black" className="py-2 text-xs" onClick={() => setSelectedProfile({ ...activeChat, type: 'freelance', name: activeChat.freelance })}><Search size={14} className="mr-2 inline" /> Voir la Fiche Synapse</SoftButton>
                            <SoftButton variant="green" className="py-2 text-xs" onClick={() => {
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
                            <SoftButton variant="white" className="py-2 text-xs shadow-none border-gray-300 text-gray-400 hover:text-red-500 hover:border-red-500" onClick={() => {
                              const msg = { text: "❌ Bonjour. Malheureusement, mon emploi du temps est plein et je ne peux plus prendre de suivi. Bonne continuation !", sender: 'Moi (Apporteur)', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                              const updatedChat = { ...activeChat, messages: [...activeChat.messages, msg] };
                              setActiveChat(updatedChat);
                              setInbox(inbox.map(c => c.id === activeChat.id ? updatedChat : c));
                            }}><X size={14} className="mr-2 inline" /> Refuser</SoftButton>
                          </div>
                        </div>
                      )}

                      {activeChat.messages && activeChat.messages.length > 0 ? (
                         <div className="space-y-4">
                           {activeChat.messages.map((msg, i) => (
                             <div key={i} className={`flex gap-4 ${msg.sender === 'Moi (Apporteur)' ? 'justify-end' : ''}`}>
                               {msg.sender !== 'Moi (Apporteur)' && (
                                 <div className={`w-10 h-10 border-[2px] border-black rounded-full overflow-hidden shrink-0 ${msg.isFreelance ? 'bg-[#E8F5E9]' : 'bg-white'}`}>
                                   <img src={`https://api.dicebear.com/7.x/${msg.isFreelance ? 'avataaars' : 'shapes'}/svg?seed=${msg.avatar || 50}`} alt={msg.sender} />
                                 </div>
                               )}
                               <div className={`${msg.sender === 'Moi (Apporteur)' ? 'bg-[#FFEB3B]' : (msg.isFreelance ? 'bg-[#CE93D8]' : 'bg-white')} border-[3px] border-black p-4 rounded-t-[20px] ${msg.sender === 'Moi (Apporteur)' ? 'rounded-l-[20px] rounded-br-sm' : 'rounded-r-[20px] rounded-bl-sm'} max-w-[80%] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                                 <p className="font-bold whitespace-pre-line">{msg.text}</p>
                                 <span className={`text-[10px] font-black uppercase mt-2 block ${msg.sender === 'Moi (Apporteur)' ? 'text-gray-500' : (msg.isFreelance ? 'text-gray-900' : 'text-gray-500')}`}>{msg.sender} • {msg.time}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                      ) : (
                        <div className="h-full flex items-center justify-center flex-col text-center opacity-70">
                          <MessageSquare size={48} className="mb-4 text-gray-400" />
                          <p className="font-bold italic uppercase tracking-widest text-lg">Nouvelle discussion</p>
                          <p className="text-sm font-bold text-gray-500 mt-2">Envoyez le message pré-rempli pour entamer la discussion.</p>
                        </div>
                      )}
                   </div>

                   <footer className="p-4 border-t-[4px] border-black bg-white flex gap-4">
                      <input 
                         placeholder="Écrire un message..." 
                         className="w-full flex-1 border-[3px] border-black rounded-[20px] px-6 py-4 font-bold outline-none focus:ring-4 ring-[#FFEB3B] transition-all bg-[#FAFAFA]" 
                         value={chatInput} 
                         onChange={(e) => setChatInput(e.target.value)}
                         onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      />
                      <SoftButton 
                         variant="blue" 
                         className="px-8 shadow-none border-[3px] active:translate-y-0" 
                         onClick={handleSendMessage}
                      >
                         <Send size={20} />
                      </SoftButton>
                   </footer>
                </div>
             </div>
           )}

           {activeTab === 'finance' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Finance & Escrow</h3>
               <p className="font-bold text-gray-500 mb-8">Consultez les fonds bloqués pour vos équipes et vos commissions perçues.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Fonds Tiers (En Escrow)" color="yellow" className="!bg-[#FFF9C4]">
                   <p className="text-4xl font-black italic">6 500 €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Sécurisés en attente de clôture (Entreprise)</p>
                 </SoftCard>
                 <SoftCard title="Commissions Net (Débloquées)" color="green" className="!bg-[#E8F5E9]">
                   <p className="text-4xl font-black italic">14 500 €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Revenus générés via Synapse</p>
                 </SoftCard>
               </div>

               <SoftCard title="Historique récent des Fonds Actifs">
                 <div className="space-y-4">
                   <div className="border-[3px] border-black rounded-[20px] p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                     <div>
                       <h4 className="font-black text-xl uppercase italic">Création Landing Page E-commerce</h4>
                       <p className="font-bold text-gray-500">Validation Entreprise effectuée. Équipe technique en mission.</p>
                     </div>
                     <div className="text-right flex flex-col items-end">
                       <p className="font-black text-2xl text-yellow-600 mb-2">1 500 €</p>
                       <SoftBadge color="yellow">Fonds Sécurisés</SoftBadge>
                     </div>
                   </div>
                   {finishedContracts.map(c => (
                     <div key={c.id} className="border-[3px] border-black border-dashed rounded-[20px] p-4 bg-gray-50 flex justify-between items-center opacity-70">
                       <div>
                         <p className="font-black uppercase">{c.title}</p>
                         <p className="text-xs font-bold text-gray-500">Contrat terminé et avalisé par l'Entreprise ({c.company})</p>
                       </div>
                       <div className="text-right flex flex-col items-end">
                         <p className="font-black text-green-600 mb-2">{c.budget}</p>
                         <p className="text-[10px] uppercase font-bold text-gray-400 bg-white border border-gray-300 px-2 py-1 rounded">Commission perçue</p>
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
                   <h3 className="text-4xl font-black uppercase italic tracking-tighter">Pipelines du Vivier</h3>
                   <p className="font-bold text-gray-500">Gérez vos talents qualifiés dans un espace Kanban (Trello-like).</p>
                 </div>
                 <SoftButton variant="yellow" className="px-6 py-3 shrink-0" onClick={() => showAlert("Lien de recrutement copié : https://bni.digital/join/apporteur_marcd", "success")}><Link size={18} className="mr-2 inline" /> Inviter Talent (Affiliation)</SoftButton>
               </div>
               
               <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-8">
                 {['contact', 'nego', 'placed'].map(col => (
                   <div key={col} className="flex-1 min-w-[320px] bg-gray-100 border-[4px] border-black rounded-[25px] flex flex-col max-h-[70vh]">
                     <div className="p-4 border-b-[4px] border-black bg-white rounded-t-[20px] shrink-0">
                       <h4 className="font-black uppercase italic text-xl flex items-center gap-2">
                         {col === 'contact' && <span className="w-4 h-4 bg-blue-400 border-[2px] border-black rounded-full"/>}
                         {col === 'nego' && <span className="w-4 h-4 bg-yellow-400 border-[2px] border-black rounded-full"/>}
                         {col === 'placed' && <span className="w-4 h-4 bg-green-400 border-[2px] border-black rounded-full"/>}
                         {col === 'contact' ? 'À Contacter' : col === 'nego' ? 'En Négociation' : 'Mission Placé'} 
                         <span className="ml-auto text-sm text-gray-500">({freelances.filter(f => f.pipeline === col).length})</span>
                       </h4>
                     </div>
                     <div 
                         className="p-4 overflow-y-auto space-y-4 flex-1 transition-colors hover:bg-black/5"
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
                             className="bg-white border-[3px] border-black rounded-[20px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-all"
                          >
                           <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                               <div className="w-12 h-12 bg-[#E3F2FD] border-[2px] border-black rounded-xl flex items-center justify-center font-black">{f.initial || f.name.substring(0,2).toUpperCase()}</div>
                               <div>
                                 <h5 className="font-black uppercase italic text-lg leading-tight">{f.name}</h5>
                                 <p className="text-xs font-bold text-gray-500 uppercase">{f.role}</p>
                               </div>
                             </div>
                             <SoftBadge color="blue" className="text-xs">{f.rate || f.cost}€/j</SoftBadge>
                           </div>
                           <div className="flex justify-between items-center">
                             <div className="flex gap-1 text-yellow-500">
                               {[1,2,3,4,5].map(star => <Star key={star} size={12} fill={star <= (f.note || f.rating) ? "currentColor" : "none"} strokeWidth={2} />)}
                             </div>
                             <button className="text-xs font-black uppercase italic underline hover:text-blue-500" onClick={() => setSelectedProfile({ ...f, type: 'freelance' })}>Voir Profil</button>
                           </div>
                         </div>
                       ))}
                       {freelances.filter(f => f.pipeline === col).length === 0 && <p className="text-center text-sm font-bold text-gray-400 p-4 border-[2px] border-black border-dashed rounded-[10px]">Glissez des profils ici</p>}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'contrats_finis' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Contrats Terminés (Historique)</h3>
                <div className="space-y-8">
                  {finishedContracts.map(fc => (
                    <SoftCard key={fc.id} color="white">
                      <div className="border-b-[3px] border-black pb-6 mb-6">
                         <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                               <h4 className="text-3xl font-black uppercase italic">{fc.title}</h4>
                               <p className="font-bold text-gray-500">{fc.company} • Budget: {fc.budget}</p>
                            </div>
                            <SoftBadge color="blue">Terminé le 12 Mars 2026</SoftBadge>
                         </div>
                         <div className="mt-4 flex gap-2 flex-wrap">
                           {fc.freelances.map(name => (
                             <SoftBadge key={name} color="purple">{name} (Freelance)</SoftBadge>
                           ))}
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Company Review */}
                        <div className="bg-[#E8F5E9] p-6 rounded-[20px] border-[3px] border-black">
                           <div className="flex justify-between items-center mb-4">
                             <p className="font-black uppercase text-sm">Avis de l'Entreprise</p>
                             <div className="flex gap-1 text-yellow-500">
                               {[...Array(5)].map((_, i) => <Star key={i} fill={i < fc.companyReview.rating ? 'currentColor' : 'none'} size={18} />)}
                             </div>
                           </div>
                           <p className="font-bold italic opacity-80 decoration-black">"{fc.companyReview.comment}"</p>
                        </div>
                        
                        {/* Freelance Review */}
                        <div className="bg-[#F3E5F5] p-6 rounded-[20px] border-[3px] border-black">
                           <div className="flex justify-between items-center mb-4">
                             <p className="font-black uppercase text-sm">Avis des Freelances</p>
                             <div className="flex gap-1 text-yellow-500">
                               {[...Array(5)].map((_, i) => <Star key={i} fill={i < fc.freelanceReview.rating ? 'currentColor' : 'none'} size={18} />)}
                             </div>
                           </div>
                           <p className="font-bold italic opacity-80">"{fc.freelanceReview.comment}"</p>
                        </div>
                      </div>
                    </SoftCard>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'search_freelances' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Rechercher des Talents</h3>
               <SoftInput placeholder="Nom, métier, techno..." icon={Search} />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                 {genericFreelances.length > 0 ? genericFreelances.map(f => (
                   <SoftCard key={f.id} className="text-center group overflow-hidden">
                     <div 
                        className="cursor-pointer group-hover:scale-105 transition-transform" 
                        onClick={() => setSelectedProfile({ ...f, type: 'freelance' })}
                     >
                       <div className="w-20 h-20 mx-auto border-[3px] border-black rounded-full overflow-hidden bg-[#FFEB3B] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.avatar}`} alt={f.name} />
                       </div>
                       <h4 className="font-black text-xl uppercase italic">{f.name}</h4>
                       <p className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-4">Clic pour voir profil</p>
                     </div>
                     <SoftButton className="w-full mt-2 py-3 text-[10px] rounded-xl" variant="white" onClick={() => handleAddGenericToVivier(f)}>
                       + Ajouter au vivier
                     </SoftButton>
                   </SoftCard>
                 )) : (
                   <p className="font-bold text-gray-500 italic col-span-3 text-center">Aucun nouveau talent ne correspond à la recherche.</p>
                 )}
               </div>
             </div>
           )}

           {activeTab === 'search_companies' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Annuaire des Entreprises</h3>
               <SoftInput placeholder="Rechercher partenaires (nom, secteur)..." icon={Search} />
               <div className="space-y-6 pt-4">
                 {companies.map(c => {
                   const opps = getCompanyOpportunities(c.name).length;
                   return (
                     <SoftCard key={c.id} className="cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => setSelectedProfile({ ...c, type: 'company', matches: opps })}>
                       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                         <div className="flex items-center gap-6 w-full md:w-auto">
                           <div className="w-16 h-16 border-[3px] border-black rounded-[15px] overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
                             <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${c.avatar}`} alt={c.name} />
                           </div>
                           <div>
                             <h4 className="font-black text-2xl uppercase italic leading-tight">{c.name}</h4>
                             <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">{c.sector}</p>
                           </div>
                         </div>
                         <SoftBadge color="blue">{opps} Offre{opps > 1 ? 's' : ''} en cours (Clic pour voir)</SoftBadge>
                       </div>
                     </SoftCard>
                   );
                 })}
               </div>
             </div>
           )}

           {activeTab === 'team_builder' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
               <div className="flex justify-between items-center bg-black text-white p-6 md:p-8 rounded-[40px] border-[4px] border-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                 <div className="relative z-10 w-full">
                   <h3 className="text-3xl md:text-4xl font-black uppercase italic">Team Builder 🛠</h3>
                   <div className="flex justify-between w-full mt-2 items-end">
                     <p className="font-bold text-gray-300 text-sm md:text-base">Budget Alloué : {teamBuilder.totalBudget} €</p>
                     <p className="font-bold text-yellow-500 bg-white/10 px-4 py-2 rounded-xl text-sm border-[2px] border-yellow-500/50">
                       Talents requis : {teamBuilder.assignedFreelances.length} / {teamBuilder.requiredFreelances}
                     </p>
                   </div>
                 </div>
                 <Calculator size={100} className="absolute right-10 opacity-20 hidden md:block" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <SoftCard title="Sélection depuis le Vivier" color="purple">
                   <div className="space-y-4">
                     {freelances.map(f => {
                       const isAdded = teamBuilder.assignedFreelances.find(x => x.id === f.id);
                       const isBusy = f.availability === 'busy';
                       return (
                         <div key={f.id} className={`border-[3px] border-black rounded-[20px] p-4 flex justify-between items-center transition-colors ${isAdded ? 'bg-gray-100 opacity-60' : 'bg-white'} ${isBusy ? 'bg-red-50 opacity-50 grayscale' : ''}`}>
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 border-[2px] border-black rounded-full overflow-hidden shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.avatar}`} /></div>
                             <div>
                               <p className="font-black uppercase truncate max-w-[120px] md:max-w-none">{f.name}</p>
                               <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase truncate">{f.role} • {f.cost}€</p>
                               {isBusy && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">En Mission</p>}
                             </div>
                           </div>
                           {!isAdded ? (
                             <button onClick={() => addToTeam(f)} className="bg-[#CE93D8] border-[2px] border-black px-4 py-2 rounded-xl font-black uppercase text-xs hover:bg-[#BA68C8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none shrink-0" disabled={isBusy}>+</button>
                           ) : (
                             <button onClick={() => removeFromTeam(f.id)} className="bg-red-400 border-[2px] border-black px-4 py-2 rounded-xl font-black uppercase text-xs hover:bg-red-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none shrink-0">-</button>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 </SoftCard>

                 <SoftCard title="Équipe Constituée & Deal" color="yellow">
                   <div className="space-y-6">
                     {teamBuilder.assignedFreelances.length === 0 ? (
                       <p className="font-bold italic text-gray-500 p-6 text-center border-[3px] border-black border-dashed rounded-[20px]">Ajoutez des freelances à l'équipe.</p>
                     ) : (
                       teamBuilder.assignedFreelances.map(f => (
                         <div key={`team-${f.id}`} className="flex justify-between items-center border-b-[3px] border-black pb-4">
                           <span className="font-black uppercase text-lg truncate pr-4">{f.name}</span>
                           <span className="font-black shrink-0">{f.cost} € <span className="text-xs text-gray-400">Net</span></span>
                         </div>
                       ))
                     )}

                     <div className="pt-6 border-t-[3px] border-black mt-auto">
                       <div className="flex justify-between items-center text-xl">
                         <span className="font-black uppercase italic text-gray-500">Votre Com.</span>
                         <span className={`font-black px-4 py-2 rounded-xl border-[2px] border-black transition-colors ${calculateCommission() >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                           {calculateCommission()} €
                         </span>
                       </div>
                     </div>

                     <SoftButton 
                        className="w-full text-lg md:text-xl py-6 rounded-[30px]" 
                        variant="black" 
                        disabled={teamBuilder.assignedFreelances.length !== teamBuilder.requiredFreelances || calculateCommission() < 0} 
                        onClick={handleSendContracts}
                      >
                       <Send size={20} /> Envoyer les contrats
                     </SoftButton>
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

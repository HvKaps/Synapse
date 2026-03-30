import React, { useState } from 'react';
import { Zap, LayoutDashboard, FileText, MessageSquare, Wallet, LogOut, Mic, Plus, CheckCircle, ShieldCheck, Users, Inbox, ChevronRight, Send, Star, X, Check, Download, AlertTriangle, Scale } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftInput } from '../components/ui/SoftInput';
import { SoftBadge } from '../components/ui/SoftBadge';

export const EntrepriseDashboard = ({ user, onLogout }) => {
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState('home');
  
  // Project Creation State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectText, setProjectText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [projectBudget, setProjectBudget] = useState('5000');
  const [projectDomain, setProjectDomain] = useState('📱 Application Mobile');

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 'proj_init_1',
      title: 'Refonte App Client',
      description: "Refonte de notre app client sous React Native avec 2 freelances pour le mois prochain.",
      budget: '5000',
      domain: '📱 Application Mobile',
      status: 'active', // 'searching', 'active', 'completed', 'litige'
      apporteur: 'Marc D.',
      milestones: [{name: 'Cadrage & UX', amount: 1000, status: 'paid'}, {name: 'Développement', amount: 2500, status: 'pending'}]
    },
    {
      id: 'proj_init_2',
      title: 'Audit de Cybersécurité',
      description: "Audit complet de notre infrastructure réseau et de notre base de données client avec rapport détaillé.",
      budget: '3500',
      domain: '🔒 Audit Cybersécurité',
      status: 'completed',
      apporteur: 'Julie L.'
    },
    {
      id: 'proj_init_3',
      title: 'Création Landing Page E-commerce',
      description: "Réalisation d'une landing page promotionnelle pour notre nouveau produit phare. Très urgent !",
      budget: '1500',
      domain: '💻 Site Web E-commerce',
      status: 'searching',
      apporteur: null
    },
    {
      id: 'proj_init_4',
      title: 'Audit SEO & Sécurité',
      description: "Amélioration globale des performances web et sécurisation des API publiques. L'équipe vient de me signaler la fin de la mission.",
      budget: '3200',
      domain: '🔒 Audit Cybersécurité',
      status: 'pending_verification',
      apporteur: 'Marc D.',
      milestones: [{name: 'Analyse Front & Back', amount: 1500, status: 'paid'}, {name: 'Corrections & Livrables Final', amount: 1700, status: 'pending'}]
    }
  ]);

  const [inbox, setInbox] = useState([
    {
      id: 'dm_app_1',
      type: 'dm_apporteur',
      apporteur: 'Marc D.',
      title: 'Création Landing Page E-commerce',
      projectId: 'proj_init_3',
      avatar: 12,
      status: 'pending',
      messages: [
        { text: "Bonjour équipe ! J'ai une équipe parfaitement qualifiée et disponible dans mon vivier pour votre contrat 'Création Landing Page E-commerce'. Pouvons-nous en discuter ?", sender: 'Marc D.', time: '09:12' }
      ]
    },
    {
      id: 'proj_1',
      type: 'project',
      title: 'Refonte App Client',
      apporteur: 'Marc D.',
      avatar: 12,
      messages: [
        { text: "✨ Bonjour à tous ! Les contrats ont été acceptés par les freelances, je déclare la mission officiellement ouverte. On valide les maquettes ASAP ?", sender: 'Marc D.', time: '09:12' },
        { text: "Top ! Marc, l'argent a bien été sécurisé de notre côté dans le système Escrow. On a hâte de voir les premières maquettes de l'app.", sender: 'Moi (Entreprise)', time: '09:45' }
      ]
    }
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // UI Modals
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [reviewModal, setReviewModal] = useState(null);
  const [litigeModal, setLitigeModal] = useState(null);

  const apporteurs = [
    { id: 1, name: 'Marc D.', role: 'Apporteur Digital', exp: '4 ans', avatar: 12, bio: "Spécialiste du matching MERN Stack et React Native. Je source les meilleurs talents Tech.", rating: 4.8, contracts: 34 },
    { id: 2, name: 'Julie L.', role: 'Apporteur Data', exp: '2 ans', avatar: 15, bio: "Audit et Data Science. Je connecte les entreprises avec des data engineers d'élite.", rating: 4.9, contracts: 12 }
  ];

  const handleOpenApporteurProfile = (apporteurName) => {
    const found = apporteurs.find(a => a.name === apporteurName);
    if(found) setSelectedProfile(found);
    else setSelectedProfile({ name: apporteurName, role: 'Apporteur d\'Affaires', bio: 'Profil non détaillé.', avatar: 10, rating: 4.5, contracts: 5 });
  };

  const handleAcceptOffer = (chat) => {
    const project = projects.find(p => p.id === chat.projectId);
    if(project) {
       setProjects(projects.map(p => p.id === project.id ? { ...p, status: 'active', apporteur: chat.apporteur } : p));
       const newMessage = { text: "✅ L'Entreprise a accepté votre offre. Le contrat est officiellement actif ! Les fonds ont été bloqués sur Escrow.", sender: 'Système', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
       const updatedChat = { ...chat, status: 'accepted', messages: [...(chat.messages || []), newMessage] };
       setActiveChat(updatedChat);
       setInbox(inbox.map(c => c.id === chat.id ? updatedChat : c));
       showAlert("Offre acceptée ! Le projet passe en statut Actif.", "success");
    }
  };

  const handleRefuseOffer = (chat) => {
     const newMessage = { text: "❌ L'Entreprise a décliné votre proposition d'équipe pour le moment.", sender: 'Système', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
     const updatedChat = { ...chat, status: 'refused', messages: [...(chat.messages || []), newMessage] };
     setActiveChat(updatedChat);
     setInbox(inbox.map(c => c.id === chat.id ? updatedChat : c));
     showAlert("Offre refusée.", "info");
  };

  const handleFinishContract = (project) => {
    setReviewModal({
       projectId: project.id,
       title: project.title,
       apporteur: project.apporteur,
       ratingApporteur: 5,
       ratingTeam: 5,
       comment: ''
    });
  };

  const handleSubmitReview = () => {
    setProjects(projects.map(p => p.id === reviewModal.projectId ? { ...p, status: 'completed', invoice: 'FA-' + Math.floor(Math.random() * 100000) } : p));
    setReviewModal(null);
    showAlert("Projet terminé ! Les fonds ont été débloqués vers l'apporteur d'affaires et vos avis qualifiés ont été publiés.", "success");
  };

  const handleDeclareLitige = () => {
    if(litigeModal) {
      setProjects(projects.map(p => p.id === litigeModal.id ? { ...p, status: 'litige' } : p));
      setLitigeModal(null);
      showAlert("Demande de médiation envoyée au support Synapse. L'Escrow est maintenant gelé temporairement.", "error");
    }
  };

  const generatePDF = (project) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("SYNAPSE", 14, 25);
    
    doc.setFontSize(10);
    doc.text("CONFIRMATION ESCROW - VERSEMENT LIBÉRÉ", 140, 25);
    
    // Body Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Détails du Déblocage de Fonds", 14, 55);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const date = new Date().toLocaleDateString('fr-FR');
    doc.text(`Date d'émission : ${date}`, 14, 65);
    doc.text(`Réf Transaction : ESC-${Math.floor(Math.random() * 1000000)}`, 14, 72);
    doc.text(`Client (Émetteur) : ${user?.companyName || 'Mon Entreprise S.A.S'}`, 14, 79);
    doc.text(`Payé à : ${project.apporteur} (Réseau d'Apporteur Synapse)`, 14, 86);
    
    // Table
    doc.autoTable({
      startY: 100,
      head: [['Désignation de la Mission', 'Statut', 'Prix Net']],
      body: [
        [project.title, 'Livrables Validés', `${project.budget} €`],
        ['Frais de service Escrow (Inclus)', '-', '0 €'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: 255, fontStyle: 'bold' },
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 8 }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`MONTANT DÉBLOQUÉ : ${project.budget} €`, 140, finalY);

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Document généré automatiquement par la plateforme sécurisée Synapse.", 14, 280);

    doc.save(`Recu_Escrow_${project.title.substring(0,10).toUpperCase()}_${date}.pdf`);
    showAlert("Génération du reçu d'Escrow (PDF) réussie.", "success");
  };

  const openChatFromInbox = (chat) => {
    setChatInput('');
    setActiveChat(chat);
    setActiveTab('chat');
  };

  const handleSendMessage = () => {
    if(chatInput.trim() !== '') {
      const newMessage = { 
        text: chatInput, 
        sender: 'Moi (Entreprise)', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      
      const updatedChat = { ...activeChat, messages: [...(activeChat.messages || []), newMessage] };
      setActiveChat(updatedChat);
      setInbox(inbox.map(c => c.id === activeChat.id ? updatedChat : c));
      setChatInput('');
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setProjectText("Lancement de notre nouveau MVP e-commerce avec intégration API Stripe et gestion des paniers complexes.");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handlePublishProject = () => {
    if (!projectTitle.trim() || !projectText.trim()) {
      showAlert("Veuillez renseigner un titre et une description détaillée pour publier votre besoin.", "error");
      return;
    }
    const newProject = {
      id: `proj_${Date.now()}`,
      title: projectTitle,
      description: projectText,
      budget: projectBudget,
      domain: projectDomain,
      status: 'searching',
      apporteur: null
    };
    setProjects([newProject, ...projects]);
    showAlert("🚀 Votre besoin a été publié avec succès et est désormais visible par nos Apporteurs d'Affaires !", "success");
    setActiveTab('mes_besoins');
    
    // Reset form
    setProjectTitle('');
    setProjectText('');
    setProjectBudget('5000');
    setProjectDomain('📱 Application Mobile');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-sans relative">
      
      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full animate-in zoom-in duration-300">
            <SoftCard title={`Fiche Apporteur : ${selectedProfile.name}`} color="white" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px]">
              <button onClick={() => setSelectedProfile(null)} className="absolute top-8 right-8 w-12 h-12 border-[3px] border-black rounded-full flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 transition-colors">
                <X size={24} strokeWidth={3} />
              </button>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 shrink-0 border-[4px] border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFEB3B]">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-black uppercase italic">{selectedProfile.name}</h3>
                    <p className="font-bold text-gray-500 uppercase tracking-widest text-lg">{selectedProfile.role}</p>
                    <div className="flex justify-center md:justify-start items-center gap-2 font-black text-2xl text-yellow-500 mt-2">
                       <Star fill="currentColor" size={24} /> {selectedProfile.rating} / 5
                    </div>
                  </div>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-[20px] border-[3px] border-black text-left">
                  <p className="font-bold text-lg">"{selectedProfile.bio}"</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-black px-4 py-2 bg-blue-100 text-blue-800 border-[2px] border-black rounded-xl text-sm">{selectedProfile.exp} d'expérience</span>
                  <span className="font-black px-4 py-2 bg-green-100 text-green-800 border-[2px] border-black rounded-xl text-sm">{selectedProfile.contracts} contrats gérés</span>
                </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full animate-in zoom-in duration-300">
            <SoftCard title={`Clôture : ${reviewModal.title}`} color="yellow" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px]">
              <div className="space-y-6">
                 <p className="font-bold text-gray-700">Vous êtes sur le point de terminer ce contrat et de déclencher le paiement final via Escrow.</p>
                 
                 <div className="space-y-2">
                   <label className="font-black uppercase text-sm">Évaluation de l'Apporteur ({reviewModal.apporteur})</label>
                   <div className="flex gap-2 text-yellow-500">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`app_star_${star}`} fill={star <= reviewModal.ratingApporteur ? 'currentColor' : 'none'} className="cursor-pointer" onClick={() => setReviewModal({...reviewModal, ratingApporteur: star})} size={32} />
                     ))}
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="font-black uppercase text-sm">Évaluation de l'Équipe Tech / Freelances</label>
                   <div className="flex gap-2 text-yellow-500">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`team_star_${star}`} fill={star <= reviewModal.ratingTeam ? 'currentColor' : 'none'} className="cursor-pointer" onClick={() => setReviewModal({...reviewModal, ratingTeam: star})} size={32} />
                     ))}
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="font-black uppercase text-sm">Avis Public sur la mission</label>
                   <textarea rows={3} value={reviewModal.comment} onChange={(e) => setReviewModal({...reviewModal, comment: e.target.value})} className="w-full border-[3px] border-black rounded-[20px] p-4 font-bold text-lg resize-none" placeholder="L'équipe était fantastique..." />
                 </div>

                 <div className="flex gap-4 pt-4">
                    <SoftButton variant="white" className="flex-1" onClick={() => setReviewModal(null)}>Annuler</SoftButton>
                    <SoftButton variant="black" className="flex-1" onClick={handleSubmitReview}>Payer & Publier Avis</SoftButton>
                 </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Litige Modal */}
      {litigeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 animate-in fade-in duration-300">
          <div className="max-w-xl w-full animate-in zoom-in duration-300">
            <SoftCard title="Signaler un problème" color="white" className="relative shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] border-[4px] border-red-500">
              <div className="space-y-6 text-center">
                 <AlertTriangle size={64} className="mx-auto text-red-500" />
                 <p className="font-bold text-gray-700 text-lg">En activant la médiation, l'ensemble des fonds liés à ce contrat seront gelés dans Escrow sur Synapse et une discussion d'arbitrage s'ouvrira avec l'équipe support.</p>
                 <div className="flex gap-4 pt-4">
                    <SoftButton variant="white" className="flex-1" onClick={() => setLitigeModal(null)}>Annuler</SoftButton>
                    <SoftButton variant="black" className="flex-1 bg-red-500 text-white hover:bg-red-600 outline-none" onClick={handleDeclareLitige}>Geler ce contrat</SoftButton>
                 </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      <aside className="w-full md:w-80 bg-white border-b-[4px] md:border-b-0 md:border-r-[4px] border-black p-8 flex flex-col space-y-12 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1" />
          </div>
          <span className="font-black text-2xl tracking-tighter">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-5 font-black uppercase italic text-sm">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-5 w-full p-5 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'home' ? 'bg-[#90CAF9] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><LayoutDashboard size={24} /> Accueil</button>
           <button onClick={() => setActiveTab('new_project')} className={`flex items-center gap-5 w-full p-5 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'new_project' ? 'bg-[#90CAF9] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Plus size={24} /> Créer Besoin</button>
           <button onClick={() => setActiveTab('mes_besoins')} className={`flex items-center gap-5 w-full p-5 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'mes_besoins' ? 'bg-[#90CAF9] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><FileText size={24} /> Mes Besoins</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-5 w-full p-5 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'messagerie' ? 'bg-[#90CAF9] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Inbox size={24} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-5 w-full p-5 border-[3px] border-transparent rounded-[25px] transition-all ${activeTab === 'finance' ? 'bg-[#90CAF9] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50 hover:border-black'}`}><Wallet size={24} /> Finance</button>
        </nav>

        <div className="pt-8 border-t-[3px] border-black space-y-6">
           <div className="p-5 bg-[#E3F2FD] border-[3px] border-black rounded-[30px] flex items-center gap-5">
              <div className="w-14 h-14 bg-white border-[2px] border-black rounded-full flex items-center justify-center font-black overflow-hidden shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || 'Sophie'}`} alt="avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate uppercase italic leading-tight">{user?.firstName || 'Sophie'} {user?.lastName}</p>
                <SoftBadge color="blue">Entreprise</SoftBadge>
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
                 <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Hello, <span className="text-[#90CAF9] underline decoration-8">{user?.firstName || 'Sophie'}</span> !</h2>
                 <p className="font-bold text-gray-500 uppercase text-sm tracking-widest italic">Dashboard Entreprise • Créatrice de projets.</p>
              </div>
              <SoftButton variant="blue" className="rounded-full px-10 py-4" onClick={() => setActiveTab('new_project')}>
                 <Plus strokeWidth={3} /> Créer un besoin
              </SoftButton>
           </header>

           {activeTab === 'home' && (
             <div className="space-y-12 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <SoftCard title="Projets Actifs" color="blue" icon={FileText}>
                     <p className="text-5xl font-black italic">
                        {projects.filter(p => p.status === 'active').length < 10 ? `0${projects.filter(p => p.status === 'active').length}` : projects.filter(p => p.status === 'active').length}
                     </p>
                  </SoftCard>
                  <SoftCard title="Fonds Escrow" color="green" icon={ShieldCheck}>
                     <p className="text-5xl font-black italic">
                        {projects.filter(p => p.status === 'active').reduce((acc, p) => acc + parseInt(p.budget), 0)} €
                     </p>
                  </SoftCard>
                  <SoftCard title="En Recherche" color="purple" icon={Users}>
                     <p className="text-5xl font-black italic">
                        {projects.filter(p => p.status === 'searching').length < 10 ? `0${projects.filter(p => p.status === 'searching').length}` : projects.filter(p => p.status === 'searching').length}
                     </p>
                  </SoftCard>
               </div>
               
               <SoftCard title="Derniers Projets Actifs">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'active').map(p => (
                     <div key={p.id} className="border-[3px] border-black rounded-[30px] p-6 bg-[#FAFAFA] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <SoftBadge color="yellow">En cours</SoftBadge>
                            <h4 className="font-black text-2xl uppercase italic">{p.title}</h4>
                          </div>
                          <p className="font-bold text-gray-500 text-sm uppercase tracking-widest">Équipe gérée par {p.apporteur || 'un apporteur'}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-black text-2xl">{p.budget} €</p>
                           <p className="text-xs font-bold text-green-600 flex items-center gap-1 justify-end mt-1"><ShieldCheck size={14}/> Sécurisé Escrow</p>
                        </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'active').length === 0 && (
                     <p className="text-gray-500 italic font-bold">Aucun projet actif en ce moment.</p>
                   )}
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'new_project' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Publier un nouveau besoin</h3>
               <SoftCard color="blue" className="relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
                   <Mic size={200} />
                 </div>
                 <div className="space-y-8 relative z-10">
                   
                   <SoftInput 
                     label="Titre du besoin" 
                     placeholder="Ex: Création d'un site vitrine avec animations..." 
                     value={projectTitle}
                     onChange={(e) => setProjectTitle(e.target.value)}
                   />

                   <div>
                     <label className="text-sm font-black uppercase flex items-center gap-2 mb-4 ml-2">
                       Décrivez le projet (ou Saisie Vocale IA)
                     </label>
                     <div className="relative">
                       <textarea 
                         rows={4} 
                         value={projectText}
                         onChange={(e) => setProjectText(e.target.value)}
                         placeholder="Ex: Je cherche une équipe experte en React et UI Design pour..."
                         className="w-full border-[3px] border-black rounded-[20px] p-6 font-bold text-lg focus:outline-none focus:bg-white transition-colors placeholder:text-gray-400 resize-none"
                       />
                       <button 
                         onClick={handleMicClick}
                         className={`absolute bottom-6 right-6 p-4 rounded-full border-[3px] border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#FFEB3B] hover:bg-[#FDD835]'}`}
                       >
                         <Mic size={24} strokeWidth={3} />
                       </button>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <SoftInput 
                       label="Budget Global Alloué (€)" 
                       type="number" 
                       value={projectBudget}
                       onChange={(e) => setProjectBudget(e.target.value)}
                     />
                     <div className="space-y-3">
                       <label className="text-sm font-black uppercase flex items-center gap-2 ml-2">Domaine Prédéfini</label>
                       <select 
                         value={projectDomain}
                         onChange={(e) => setProjectDomain(e.target.value)}
                         className="w-full border-[3px] border-black rounded-[20px] p-4 font-bold text-lg focus:outline-none appearance-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                       >
                         <option>📱 Application Mobile</option>
                         <option>💻 Site Web E-commerce</option>
                         <option>🎨 Design UI/UX</option>
                         <option>🔒 Audit Cybersécurité</option>
                         <option>🤖 Data & Intelligence Artificielle</option>
                       </select>
                     </div>
                   </div>

                   <SoftButton className="w-full py-6 text-2xl" variant="black" onClick={handlePublishProject}>
                     Publier pour les Apporteurs 🚀
                   </SoftButton>
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'mes_besoins' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Mes Besoins (Projets)</h3>
               <p className="font-bold text-gray-500 mb-8">Consultez et suivez l'avancement de vos demandes d'équipes et vos projets actuels.</p>
               
               <div className="space-y-12">
                 
                 {/* Recherche d'équipe */}
                 <div className="space-y-6">
                   <h4 className="font-black uppercase text-xl border-b-[4px] border-black pb-4 flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-purple-500 border-2 border-black animate-pulse" /> 
                      En cours de recherche d'équipe (<span className="text-purple-500 px-2 bg-purple-100 rounded-xl">{projects.filter(p => p.status === 'searching').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'searching').length > 0 ? projects.filter(p => p.status === 'searching').map(p => (
                     <SoftCard key={p.id} className="hover:bg-purple-50 transition-colors">
                       <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                         <div>
                           <div className="flex items-center gap-4 mb-2">
                             <h5 className="font-black text-2xl uppercase italic">{p.title}</h5>
                             <SoftBadge color="purple">En recherche</SoftBadge>
                           </div>
                           <p className="font-bold text-gray-600 mb-2 truncate max-w-xl">{p.description}</p>
                           <p className="text-xs font-black uppercase tracking-widest text-gray-400">{p.domain} • Visible par tous les Apporteurs</p>
                         </div>
                         <div className="text-right shrink-0">
                            <p className="font-black text-2xl mb-1 text-purple-600">{p.budget} €</p>
                            <p className="text-xs font-bold text-gray-500 uppercase">Budget Proposé</p>
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-bold italic text-gray-400">Aucun besoin publié en cours de recherche.</p>
                   )}
                 </div>

                 {/* Avec une équipe (Actifs) */}
                 <div className="space-y-6">
                   <h4 className="font-black uppercase text-xl border-b-[4px] border-black pb-4 flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" /> 
                      En cours avec une équipe (<span className="text-yellow-600 px-2 bg-yellow-100 rounded-xl">{projects.filter(p => p.status === 'active' || p.status === 'litige').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'active' || p.status === 'litige' || p.status === 'pending_verification').length > 0 ? projects.filter(p => p.status === 'active' || p.status === 'litige' || p.status === 'pending_verification').map(p => (
                     <SoftCard key={p.id} color={p.status === 'litige' ? 'white' : 'yellow'} className={p.status === 'litige' ? '!bg-[#FFEBEE] border-red-500 hover:bg-[#FFEBEE]' : p.status === 'pending_verification' ? '!bg-[#E3F2FD] border-blue-500 hover:bg-[#E3F2FD]' : '!bg-[#FFF9C4] hover:bg-[#FFF9C4]'}>
                       <div className="flex flex-col md:flex-row justify-between gap-4 w-full h-full">
                         <div className="flex-1">
                           <div className="flex items-center gap-3 mb-4">
                             <SoftBadge color={p.status === 'litige' ? 'black' : p.status === 'pending_verification' ? 'blue' : 'yellow'}>{p.status === 'litige' ? 'Médiation Synapse' : p.status === 'pending_verification' ? 'Vérification Requise' : 'En cours (Actif)'}</SoftBadge>
                             <h4 className="font-black text-2xl uppercase italic">{p.title}</h4>
                           </div>
                           <p className="text-xs font-black uppercase tracking-widest text-gray-700 mb-4">Géré par : {p.apporteur}</p>
                           
                           {p.status === 'pending_verification' && (
                             <div className="border-[3px] border-black bg-white rounded-[20px] p-5 my-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -ml-2 -rotate-1">
                               <p className="font-black text-xl uppercase italic text-blue-600 mb-2">L'équipe annonce la fin de mission !</p>
                               <p className="font-bold text-gray-600 text-sm mb-6">Veuillez vérifier les livrables du dernier jalon avant de débloquer le paiement Escrow. L'équipe est en attente de votre retour.</p>
                               <div className="flex flex-wrap gap-4">
                                 <SoftButton variant="white" className="border-[2px] !shadow-none" onClick={() => {
                                    setProjects(projects.map(proj => proj.id === p.id ? {...proj, status: 'active'} : proj));
                                    showAlert("L'équipe a été notifiée de continuer les retouches.", "info");
                                 }}>❌ Refuser (Continuer)</SoftButton>
                                 <SoftButton variant="black" onClick={() => handleFinishContract(p)}>✅ Accepter & Clôturer</SoftButton>
                               </div>
                             </div>
                           )}

                           {/* Milestones tracking */}
                           <div className="space-y-2 mt-2 border-[2px] border-black rounded-[15px] p-4 bg-white/50 w-full md:w-3/4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Suivi des Jalons (Milestones)</p>
                             {p.milestones && p.milestones.map((ms, i) => (
                               <div key={i} className="flex justify-between items-center text-sm font-bold">
                                 <div className="flex items-center gap-2">
                                   <div className={`w-4 h-4 rounded-full border-[2px] border-black flex items-center justify-center ${ms.status === 'paid' ? 'bg-green-400' : 'bg-white'}`}>
                                      {ms.status === 'paid' && <Check size={10} strokeWidth={4} className="text-black"/>}
                                   </div>
                                   <span className={ms.status === 'paid' ? 'line-through text-gray-400' : ''}>{ms.name}</span>
                                 </div>
                                 <span className="italic">{ms.amount} €</span>
                               </div>
                             ))}
                             {!p.milestones && <p className="text-sm font-bold italic text-gray-400">Aucun jalon défini. Paiement global.</p>}
                           </div>
                         </div>

                         <div className="text-right shrink-0 flex flex-col items-end gap-2 mt-4 md:mt-0">
                            <p className="font-black text-3xl text-yellow-600 mb-1">{p.budget} €</p>
                            <p className="text-xs font-bold text-green-600 flex items-center justify-end gap-1 mb-2">
                              <ShieldCheck size={14}/> {p.status === 'litige' ? 'Fonds Gelés' : 'Sécurisé Escrow'}
                            </p>
                            
                            {p.status === 'active' && (
                              <div className="flex flex-col gap-2 w-full mt-2">
                                <SoftButton variant="blue" className="px-4 py-2 text-xs border-[2px]" onClick={() => setActiveTab('messagerie')}>Ouvrir le Chat</SoftButton>
                                <SoftButton variant="white" className="px-4 py-2 text-xs border-[2px] text-red-500 hover:bg-red-50 hover:border-red-500" onClick={() => setLitigeModal(p)}><AlertTriangle size={14} className="mr-1 inline"/> Litige</SoftButton>
                                <SoftButton variant="black" className="px-4 py-2 text-xs shadow-[1px_1px_0px_#000] mt-2 justify-center italic opacity-60 hover:opacity-100 transition-opacity" onClick={() => handleFinishContract(p)}>Forcer Terminaison</SoftButton>
                              </div>
                            )}

                            {p.status === 'pending_verification' && (
                              <div className="flex flex-col gap-2 w-full mt-2">
                                <SoftButton variant="blue" className="px-4 py-2 text-xs border-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black" onClick={() => setActiveTab('messagerie')}><MessageSquare size={14} className="mr-2 inline" /> Discuter avec l'équipe</SoftButton>
                                <SoftButton variant="white" className="px-4 py-2 text-xs border-[2px] text-red-500 hover:bg-red-50 hover:border-red-500" onClick={() => setLitigeModal(p)}><AlertTriangle size={14} className="mr-1 inline"/> Litige BNI</SoftButton>
                              </div>
                            )}

                            {p.status === 'litige' && (
                              <div className="flex flex-col gap-2 w-full mt-2">
                                <SoftBadge color="white" className="border-red-500 text-red-500 py-2"><Scale size={14} className="mr-2 inline"/> Support Informé</SoftBadge>
                                <SoftButton variant="white" className="px-4 py-2 mt-2 text-xs hover:bg-gray-100" onClick={() => setActiveTab('messagerie')}>Discuter avec Synapse</SoftButton>
                              </div>
                            )}
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-bold italic text-gray-400">Aucun projet avec une équipe actuellement.</p>
                   )}
                 </div>

                 {/* Terminés */}
                 <div className="space-y-6 opacity-70">
                   <h4 className="font-black uppercase text-xl border-b-[4px] border-black pb-4 flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-gray-400 border-2 border-black" /> 
                      Projets Terminés (<span className="text-gray-600 px-2 bg-gray-200 rounded-xl">{projects.filter(p => p.status === 'completed').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'completed').length > 0 ? projects.filter(p => p.status === 'completed').map(p => (
                     <SoftCard key={p.id} color="white" className="grayscale hover:grayscale-0 transition-all cursor-pointer">
                       <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                         <div>
                           <div className="flex items-center gap-4 mb-2">
                             <h5 className="font-black text-2xl uppercase italic text-gray-500">{p.title}</h5>
                             <SoftBadge color="blue">Terminé</SoftBadge>
                           </div>
                           <p className="text-xs font-black uppercase tracking-widest text-gray-500">Apporteur : {p.apporteur} • Approuvé par l'Entreprise</p>
                         </div>
                         <div className="text-right shrink-0">
                            <p className="font-black text-2xl text-gray-400 mb-1">{p.budget} €</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Clôturé & Payé</p>
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-bold italic text-gray-400">Vous n'avez pas encore de projets terminés.</p>
                   )}
                 </div>

               </div>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Messagerie (Inbox)</h3>
               <p className="font-bold text-gray-500 mb-8">Retrouvez toutes vos conversations avec les Apporteurs d'Affaires et équipes de projet.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* DMs Apporteurs */}
                 <div className="space-y-4">
                   <h4 className="font-black uppercase text-sm border-b-[3px] border-black pb-2 text-blue-500">🤝 Propositions d'Apporteurs</h4>
                   {inbox.filter(c => c.type === 'dm_apporteur').length > 0 ? inbox.filter(c => c.type === 'dm_apporteur').map(c => (
                     <div key={c.id} className="bg-white border-[3px] border-black p-4 rounded-2xl cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#FFF9C4] border-[2px] border-black rounded-full overflow-hidden shrink-0"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`} alt="avatar" /></div>
                         <div className="overflow-hidden">
                           <p className="font-black uppercase truncate text-sm">{c.apporteur}</p>
                           <p className="text-xs font-bold text-gray-500 truncate">{c.title}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-bold text-gray-400 italic">Aucun DM reçu.</p>}
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
                           <p className="text-xs font-bold text-gray-500 truncate">Géré par {c.apporteur}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-xs font-bold text-gray-400 italic">Aucun chantier en cours.</p>}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'chat' && activeChat && (
             <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setActiveTab('messagerie')} className="font-black uppercase italic text-sm text-gray-500 hover:text-black mb-4 flex items-center gap-2"><ChevronRight className="rotate-180"/> Retour à la messagerie</button>
                <div className="bg-white border-[4px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[600px]">
                   <header className="bg-black text-white p-6 md:p-8 flex justify-between items-center z-10">
                     <div className="overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onClick={() => activeChat.type === 'dm_apporteur' && handleOpenApporteurProfile(activeChat.apporteur)}>
                       <h3 className="text-2xl md:text-3xl font-black uppercase italic truncate flex items-center gap-2">
                         {activeChat.title || activeChat.apporteur}
                         {activeChat.type === 'dm_apporteur' && <span className="text-sm font-bold bg-[#FFEB3B] text-black px-2 py-1 rounded-lg border-[2px] border-black shrink-0">Voir Profil Apporteur</span>}
                       </h3>
                       <p className="font-bold text-gray-400 truncate">
                         {activeChat.type === 'dm_apporteur' && `Discussion avec l'Apporteur ${activeChat.apporteur}`}
                         {activeChat.type === 'project' && 'Communication de Chantier'}
                       </p>
                     </div>
                     <MessageSquare size={40} className="text-blue-400 shrink-0 ml-4 hidden md:block" />
                   </header>
                   
                   {activeChat.type === 'dm_apporteur' && activeChat.status === 'pending' && (
                     <div className="bg-yellow-50 p-4 border-b-[3px] border-black flex flex-wrap gap-4 items-center justify-between">
                       <p className="font-bold text-sm italic">L'Apporteur vous propose une équipe pour <strong>{activeChat.title}</strong>.</p>
                       <div className="flex flex-wrap gap-3">
                         <SoftButton variant="black" className="py-2 text-xs px-4" onClick={() => handleRefuseOffer(activeChat)}><X size={14} className="mr-1" /> Refuser</SoftButton>
                         <SoftButton variant="green" className="py-2 text-xs px-4" onClick={() => handleAcceptOffer(activeChat)}><Check size={14} className="mr-1" /> Accepter & Sécuriser Fonds</SoftButton>
                       </div>
                     </div>
                   )}

                   <div className="bg-[#E3F2FD] p-3 text-center border-b-[3px] border-black font-black uppercase text-xs italic tracking-widest text-[#1565C0]">
                     Participants : Vous (Entreprise), {activeChat.apporteur}
                   </div>

                   <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 bg-[#F5F5F5]">
                      {activeChat.messages && activeChat.messages.length > 0 ? (
                         <div className="space-y-4">
                           {activeChat.messages.map((msg, i) => (
                             <div key={i} className={`flex gap-4 ${msg.sender === 'Moi (Entreprise)' ? 'justify-end' : ''}`}>
                               {msg.sender !== 'Moi (Entreprise)' && (
                                 <div className="w-10 h-10 border-[2px] border-black rounded-full overflow-hidden shrink-0 bg-[#FFF9C4]">
                                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.avatar || 12}`} alt={msg.sender} />
                                 </div>
                               )}
                               <div className={`${msg.sender === 'Moi (Entreprise)' ? 'bg-[#90CAF9]' : 'bg-white'} border-[3px] border-black p-4 rounded-t-[20px] ${msg.sender === 'Moi (Entreprise)' ? 'rounded-l-[20px] rounded-br-sm' : 'rounded-r-[20px] rounded-bl-sm'} max-w-[80%] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                                 <p className="font-bold whitespace-pre-line">{msg.text}</p>
                                 <span className={`text-[10px] font-black uppercase mt-2 block ${msg.sender === 'Moi (Entreprise)' ? 'text-gray-600' : 'text-gray-500'}`}>{msg.sender} • {msg.time}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                      ) : (
                        <div className="h-full flex items-center justify-center flex-col text-center opacity-70">
                          <MessageSquare size={48} className="mb-4 text-gray-400" />
                          <p className="font-bold italic uppercase tracking-widest text-lg">Nouvelle discussion</p>
                        </div>
                      )}
                   </div>

                   <footer className="p-4 border-t-[4px] border-black bg-white flex gap-4">
                      <input 
                         placeholder="Écrire un message..." 
                         className="w-full flex-1 border-[3px] border-black rounded-[20px] px-6 py-4 font-bold outline-none focus:ring-4 ring-[#90CAF9] transition-all bg-[#FAFAFA]" 
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
               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Gestion Financière (Escrow)</h3>
               <p className="font-bold text-gray-500 mb-8">Consultez vos fonds sécurisés pour les contrats en cours et vos historiques de paiement.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Fonds Bloqués (En Cours)" color="yellow" className="!bg-[#FFF9C4]">
                   <p className="text-4xl font-black italic">{projects.filter(p => p.status === 'active').reduce((sum, p) => sum + parseInt(p.budget), 0)} €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Sécurisés sur Escrow Synapse</p>
                 </SoftCard>
                 <SoftCard title="Fonds Libérés (Terminés)" color="green" className="!bg-[#E8F5E9]">
                   <p className="text-4xl font-black italic">{projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseInt(p.budget), 0)} €</p>
                   <p className="text-sm font-bold mt-2 text-gray-600">Payés aux Apporteurs d'Affaires</p>
                 </SoftCard>
               </div>

               <SoftCard title="Contrats Actifs (Fonds Sécurisés)">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'active').map(p => (
                     <div key={p.id} className="border-[3px] border-black rounded-[20px] p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                       <div>
                         <h4 className="font-black text-xl uppercase italic">{p.title}</h4>
                         <p className="font-bold text-gray-500">Géré par l'Apporteur : {p.apporteur}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-black text-2xl text-yellow-600 mb-2">{p.budget} €</p>
                         <SoftBadge color="yellow">Fonds Bloqués</SoftBadge>
                       </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'active').length === 0 && <p className="font-bold italic text-gray-400">Aucun contrat actif impliquant des fonds bloqués.</p>}
                 </div>
               </SoftCard>
               
               <SoftCard title="Historique des Paiements">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'completed').map(p => (
                     <div key={p.id} className="border-[3px] border-black border-dashed rounded-[20px] p-4 bg-gray-50 flex justify-between items-center group transition-all hover:bg-white hover:opacity-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                       <div>
                         <p className="font-black uppercase">{p.title}</p>
                         <p className="text-xs font-bold text-gray-500">Apporteur : {p.apporteur} {p.invoice ? `• Réf: ${p.invoice}` : ''}</p>
                       </div>
                       <div className="flex items-center gap-6">
                         <div className="text-right">
                           <p className="font-black text-green-600 text-xl">{p.budget} €</p>
                           <p className="text-[10px] uppercase font-bold text-gray-400">Libéré au prestataire</p>
                         </div>
                         <button 
                             onClick={() => generatePDF(p)}
                             className="hidden md:flex flex-col items-center justify-center p-3 border-[2px] border-black rounded-xl hover:bg-[#E3F2FD] transition-colors bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-1px] active:translate-y-[1px]" title="Télécharger le document d'Escrow (PDF)">
                           <FileText size={20} />
                           <span className="text-[9px] font-black uppercase mt-1">Reçu</span>
                         </button>
                       </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'completed').length === 0 && <p className="font-bold italic text-gray-400">Aucun historique de paiement pour le moment.</p>}
                 </div>
               </SoftCard>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

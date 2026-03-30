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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="max-w-2xl w-full animate-in zoom-in-95 duration-300">
            <SoftCard title={`Fiche Apporteur : ${selectedProfile.name}`} color="white" className="relative shadow-2xl border-[1.5px] border-gray-200">
              <button onClick={() => setSelectedProfile(null)} className="absolute top-6 right-6 w-10 h-10 border-[1.5px] border-gray-200 rounded-full flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                <X size={20} strokeWidth={2} />
              </button>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-28 h-28 shrink-0 border-[1.5px] border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-yellow-50/50">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedProfile.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-900">{selectedProfile.name}</h3>
                    <p className="font-semibold text-blue-600 text-sm tracking-wide mt-1">{selectedProfile.role}</p>
                    <div className="flex justify-center md:justify-start items-center gap-2 font-bold text-lg text-yellow-500 mt-2">
                       <Star fill="currentColor" size={20} /> {selectedProfile.rating} / 5
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border-[1.5px] border-gray-200 text-left">
                  <p className="font-medium text-gray-700 italic">"{selectedProfile.bio}"</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold px-4 py-2 bg-blue-50 text-blue-700 border-[1.5px] border-blue-200 rounded-xl text-sm">{selectedProfile.exp} d'expérience</span>
                  <span className="font-semibold px-4 py-2 bg-green-50 text-green-700 border-[1.5px] border-green-200 rounded-xl text-sm">{selectedProfile.contracts} contrats gérés</span>
                </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="max-w-2xl w-full animate-in zoom-in-95 duration-300">
            <SoftCard title={`Clôture : ${reviewModal.title}`} color="yellow" className="relative shadow-2xl border-[1.5px] border-gray-200">
              <div className="space-y-6">
                 <p className="font-medium text-gray-700">Vous êtes sur le point de terminer ce contrat et de déclencher le paiement final via Escrow.</p>
                 
                 <div className="space-y-3">
                   <label className="font-bold text-gray-900 text-sm">Évaluation de l'Apporteur ({reviewModal.apporteur})</label>
                   <div className="flex gap-2 text-yellow-400">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`app_star_${star}`} fill={star <= reviewModal.ratingApporteur ? 'currentColor' : 'none'} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setReviewModal({...reviewModal, ratingApporteur: star})} size={28} />
                     ))}
                   </div>
                 </div>

                 <div className="space-y-3">
                   <label className="font-bold text-gray-900 text-sm">Évaluation de l'Équipe Tech / Freelances</label>
                   <div className="flex gap-2 text-yellow-400">
                     {[1,2,3,4,5].map(star => (
                        <Star key={`team_star_${star}`} fill={star <= reviewModal.ratingTeam ? 'currentColor' : 'none'} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setReviewModal({...reviewModal, ratingTeam: star})} size={28} />
                     ))}
                   </div>
                 </div>

                 <div className="space-y-3">
                   <label className="font-bold text-gray-900 text-sm">Avis Public sur la mission</label>
                   <textarea rows={3} value={reviewModal.comment} onChange={(e) => setReviewModal({...reviewModal, comment: e.target.value})} className="w-full border-[1.5px] border-gray-200 rounded-xl p-4 font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-50 transition-all resize-none" placeholder="L'équipe a fait un excellent travail..." />
                 </div>

                 <div className="flex gap-3 pt-4 border-t-[1.5px] border-gray-100 mt-6">
                    <SoftButton variant="white" className="flex-1 shadow-sm rounded-xl py-3" onClick={() => setReviewModal(null)}>Annuler</SoftButton>
                    <SoftButton variant="black" className="flex-1 shadow-sm rounded-xl py-3" onClick={handleSubmitReview}>Payer & Publier Avis</SoftButton>
                 </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      {/* Litige Modal */}
      {litigeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="max-w-xl w-full animate-in zoom-in-95 duration-300">
            <SoftCard title="Signaler un problème" color="white" className="relative shadow-2xl border-[1.5px] border-red-200">
              <div className="space-y-6 text-center">
                 <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl mb-4">
                   <AlertTriangle size={32} />
                 </div>
                 <p className="font-medium text-gray-700 text-base leading-relaxed">
                   En activant la médiation, l'ensemble des fonds liés à ce contrat seront gelés dans Escrow sur Synapse et une discussion d'arbitrage s'ouvrira avec l'équipe support.
                 </p>
                 <div className="flex gap-3 pt-6 border-t-[1.5px] border-gray-100">
                    <SoftButton variant="white" className="flex-1 py-3 rounded-xl shadow-sm" onClick={() => setLitigeModal(null)}>Annuler</SoftButton>
                    <SoftButton variant="black" className="flex-1 py-3 rounded-xl shadow-sm bg-red-600 text-white hover:bg-red-700 border-red-600 outline-none hover:border-red-700" onClick={handleDeclareLitige}>Geler ce contrat</SoftButton>
                 </div>
              </div>
            </SoftCard>
          </div>
        </div>
      )}

      <aside className="w-full md:w-80 bg-white border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-gray-200 p-8 flex flex-col space-y-10 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white border-[1.5px] border-gray-200 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse" className="w-full h-full object-contain p-1.5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">SYNAPSE</span>
        </div>

        <nav className="flex-1 space-y-2 font-semibold text-sm">
           <button onClick={() => setActiveTab('home')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'home' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><LayoutDashboard size={20} /> Accueil</button>
           <button onClick={() => setActiveTab('new_project')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'new_project' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Plus size={20} /> Créer Besoin</button>
           <button onClick={() => setActiveTab('mes_besoins')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'mes_besoins' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><FileText size={20} /> Mes Besoins</button>
           <button onClick={() => setActiveTab('messagerie')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'messagerie' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Inbox size={20} /> Messagerie</button>
           <button onClick={() => setActiveTab('finance')} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === 'finance' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><Wallet size={20} /> Finance</button>
        </nav>

        <div className="pt-8 border-t-[1.5px] border-gray-100 space-y-4">
           <div className="p-4 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white border-[1.5px] border-gray-200 rounded-full flex items-center justify-center font-bold overflow-hidden shadow-sm shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || 'Sophie'}`} alt="avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate leading-tight text-gray-900">{user?.firstName || 'Sophie'} {user?.lastName}</p>
                <p className="text-[11px] font-medium text-gray-500 mt-0.5">Entreprise</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full font-semibold text-sm text-red-600 flex items-center justify-center gap-2 py-3 hover:bg-red-50 rounded-xl transition-all">
             <LogOut size={16} /> Déconnexion
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-16">
           <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-[1.5px] border-gray-200 pb-8">
              <div className="space-y-1">
                 <h2 className="text-4xl font-bold tracking-tight text-gray-900 leading-none">Hello, <span className="text-blue-600">{user?.firstName || 'Sophie'}</span> !</h2>
                 <p className="font-medium text-gray-500 text-sm">Dashboard Entreprise • Créatrice de projets</p>
              </div>
              <SoftButton variant="blue" className="rounded-xl px-6 py-3 shadow-sm border-[1.5px] border-blue-600" onClick={() => setActiveTab('new_project')}>
                 <Plus strokeWidth={2.5} size={18} className="mr-2 inline" /> Créer un besoin
              </SoftButton>
           </header>

           {activeTab === 'home' && (
             <div className="space-y-10 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SoftCard title="Projets Actifs" color="blue" icon={FileText}>
                     <p className="text-4xl font-bold text-gray-900">
                        {projects.filter(p => p.status === 'active').length < 10 ? `0${projects.filter(p => p.status === 'active').length}` : projects.filter(p => p.status === 'active').length}
                     </p>
                  </SoftCard>
                  <SoftCard title="Fonds Escrow Securisés" color="green" icon={ShieldCheck}>
                     <p className="text-4xl font-bold text-gray-900">
                        {projects.filter(p => p.status === 'active').reduce((acc, p) => acc + parseInt(p.budget), 0)} €
                     </p>
                  </SoftCard>
                  <SoftCard title="En Recherche" color="purple" icon={Users}>
                     <p className="text-4xl font-bold text-gray-900">
                        {projects.filter(p => p.status === 'searching').length < 10 ? `0${projects.filter(p => p.status === 'searching').length}` : projects.filter(p => p.status === 'searching').length}
                     </p>
                  </SoftCard>
               </div>
               
               <SoftCard title="Derniers Projets Actifs">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'active').map(p => (
                     <div key={p.id} className="border-[1.5px] border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-sm transition-all">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <SoftBadge color="yellow">En cours</SoftBadge>
                            <h4 className="font-bold text-xl text-gray-900 leading-tight">{p.title}</h4>
                          </div>
                          <p className="font-medium text-gray-500 text-sm">Équipe gérée par <span className="text-gray-900">{p.apporteur || 'un apporteur'}</span></p>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto flex md:flex-col justify-between items-center md:items-end">
                           <p className="font-bold text-2xl text-gray-900">{p.budget} €</p>
                           <p className="text-xs font-semibold text-green-700 flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border-[1.5px] border-green-200 mt-2"><ShieldCheck size={14}/> Sécurisé Escrow</p>
                        </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'active').length === 0 && (
                     <p className="text-gray-500 font-medium p-4 text-center border-[1.5px] border-gray-200 border-dashed rounded-xl">Aucun projet actif en ce moment.</p>
                   )}
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'new_project' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Publier un nouveau besoin</h3>
               <SoftCard color="blue" className="relative overflow-hidden">
                 <div className="absolute -right-8 -top-8 text-blue-100 pointer-events-none opacity-50">
                   <Mic size={180} />
                 </div>
                 <div className="space-y-8 relative z-10 w-full md:w-5/6 lg:w-3/4">
                   
                   <SoftInput 
                     label="Titre du besoin" 
                     placeholder="Ex: Création d'un site vitrine avec animations..." 
                     value={projectTitle}
                     onChange={(e) => setProjectTitle(e.target.value)}
                   />

                   <div>
                     <label className="text-sm font-semibold flex items-center gap-2 mb-3 text-gray-700 ml-1">
                       Décrivez le projet (ou Saisie Vocale IA)
                     </label>
                     <div className="relative">
                       <textarea 
                         rows={5} 
                         value={projectText}
                         onChange={(e) => setProjectText(e.target.value)}
                         placeholder="Ex: Je cherche une équipe experte en React et UI Design pour la conception de notre MVP. Le délai est de 3 mois..."
                         className="w-full border-[1.5px] border-gray-200 rounded-2xl p-5 font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-50 transition-colors placeholder:text-gray-400 resize-none hover:border-gray-300"
                       />
                       <button 
                         onClick={handleMicClick}
                         className={`absolute bottom-5 right-5 p-3.5 rounded-full transition-all shadow-sm flex items-center justify-center ${isRecording ? 'bg-red-50 text-red-500 border-[1.5px] border-red-200 animate-pulse' : 'bg-blue-50 text-blue-600 border-[1.5px] border-blue-200 hover:bg-blue-100 hover:scale-105'}`}
                         title="Dicter avec l'IA"
                       >
                         <Mic size={20} className={isRecording ? 'animate-bounce' : ''} />
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
                     <div className="space-y-2">
                       <label className="text-sm font-semibold flex items-center gap-2 ml-1 text-gray-700">Domaine Prédéfini</label>
                       <select 
                         value={projectDomain}
                         onChange={(e) => setProjectDomain(e.target.value)}
                         className="w-full border-[1.5px] border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-900 focus:outline-none focus:border-blue-500 appearance-none bg-gray-50 cursor-pointer hover:bg-white transition-colors"
                       >
                         <option>📱 Application Mobile</option>
                         <option>💻 Site Web E-commerce</option>
                         <option>🎨 Design UI/UX</option>
                         <option>🔒 Audit Cybersécurité</option>
                         <option>🤖 Data & Intelligence Artificielle</option>
                       </select>
                     </div>
                   </div>

                   <SoftButton className="w-full py-4 text-lg shadow-sm font-bold mt-4" variant="blue" onClick={handlePublishProject}>
                     Publier pour les Apporteurs <Send size={18} className="ml-2 inline" />
                   </SoftButton>
                 </div>
               </SoftCard>
             </div>
           )}

           {activeTab === 'mes_besoins' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Mes Besoins (Projets)</h3>
               <p className="font-medium text-gray-500 mb-8">Consultez et suivez l'avancement de vos demandes d'équipes et vos projets actuels.</p>
               
               <div className="space-y-12">
                 
                 {/* Recherche d'équipe */}
                 <div className="space-y-6">
                   <h4 className="font-bold text-xl border-b-[1.5px] border-gray-200 pb-4 flex items-center gap-3 text-gray-900">
                      <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" /> 
                      En cours de recherche (<span className="text-purple-600 px-2.5 py-0.5 bg-purple-50 rounded-lg text-sm">{projects.filter(p => p.status === 'searching').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'searching').length > 0 ? projects.filter(p => p.status === 'searching').map(p => (
                     <SoftCard key={p.id} className="hover:bg-purple-50/30 transition-colors border-[1.5px] border-gray-200">
                       <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                         <div>
                           <div className="flex items-center gap-4 mb-2">
                             <h5 className="font-bold text-xl text-gray-900 leading-tight">{p.title}</h5>
                             <SoftBadge color="purple">En recherche</SoftBadge>
                           </div>
                           <p className="font-medium text-gray-600 mb-2 truncate max-w-xl">{p.description}</p>
                           <p className="text-xs font-semibold text-gray-400">{p.domain} • Visible par tous les Apporteurs</p>
                         </div>
                         <div className="text-left md:text-right shrink-0">
                            <p className="font-bold text-2xl mb-1 text-purple-600">{p.budget} €</p>
                            <p className="text-xs font-medium text-gray-500">Budget Proposé</p>
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-medium italic text-gray-400 p-6 text-center border-[1.5px] border-gray-200 border-dashed rounded-xl">Aucun besoin publié en cours de recherche.</p>
                   )}
                 </div>

                 {/* Avec une équipe (Actifs) */}
                 <div className="space-y-6">
                   <h4 className="font-bold text-xl border-b-[1.5px] border-gray-200 pb-4 flex items-center gap-3 text-gray-900">
                      <span className="w-3 h-3 rounded-full bg-yellow-400" /> 
                      En cours avec une équipe (<span className="text-yellow-700 px-2.5 py-0.5 bg-yellow-50 rounded-lg text-sm">{projects.filter(p => p.status === 'active' || p.status === 'litige').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'active' || p.status === 'litige' || p.status === 'pending_verification').length > 0 ? projects.filter(p => p.status === 'active' || p.status === 'litige' || p.status === 'pending_verification').map(p => (
                     <SoftCard key={p.id} color={p.status === 'litige' ? 'white' : 'yellow'} className={p.status === 'litige' ? 'border-[1.5px] border-red-200 bg-red-50/30' : p.status === 'pending_verification' ? 'border-[1.5px] border-blue-200 bg-blue-50/30' : 'border-[1.5px] border-yellow-200 bg-yellow-50/30'}>
                       <div className="flex flex-col md:flex-row justify-between gap-4 w-full h-full">
                         <div className="flex-1">
                           <div className="flex items-center gap-3 mb-4">
                             <SoftBadge color={p.status === 'litige' ? 'black' : p.status === 'pending_verification' ? 'blue' : 'yellow'}>{p.status === 'litige' ? 'Médiation Synapse' : p.status === 'pending_verification' ? 'Vérification Requise' : 'En cours (Actif)'}</SoftBadge>
                             <h4 className="font-bold text-xl text-gray-900 leading-tight">{p.title}</h4>
                           </div>
                           <p className="text-sm font-semibold text-gray-700 mb-4">Géré par : <span className="font-medium text-gray-600">{p.apporteur}</span></p>
                           
                           {p.status === 'pending_verification' && (
                             <div className="border-[1.5px] border-blue-200 bg-white rounded-xl p-5 my-6 shadow-sm">
                               <p className="font-bold text-lg text-blue-700 mb-2">L'équipe annonce la fin de mission !</p>
                               <p className="font-medium text-gray-600 text-sm mb-6">Veuillez vérifier les livrables du dernier jalon avant de débloquer le paiement Escrow. L'équipe est en attente de votre retour.</p>
                               <div className="flex flex-wrap gap-3">
                                 <SoftButton variant="white" className="border-gray-200 text-gray-600 hover:bg-gray-50" onClick={() => {
                                    setProjects(projects.map(proj => proj.id === p.id ? {...proj, status: 'active'} : proj));
                                    showAlert("L'équipe a été notifiée de continuer les retouches.", "info");
                                 }}><X size={16} className="mr-2 inline" /> Refuser (Continuer)</SoftButton>
                                 <SoftButton variant="black" onClick={() => handleFinishContract(p)}><Check size={16} className="mr-2 inline" /> Accepter & Clôturer</SoftButton>
                               </div>
                             </div>
                           )}

                           {/* Milestones tracking */}
                           <div className="space-y-2 mt-2 border-[1.5px] border-gray-200 rounded-xl p-4 bg-white/50 w-full md:w-3/4">
                             <p className="text-xs font-semibold text-gray-500 mb-3">Suivi des Jalons (Milestones)</p>
                             {p.milestones && p.milestones.map((ms, i) => (
                               <div key={i} className="flex justify-between items-center text-sm font-medium">
                                 <div className="flex items-center gap-2.5">
                                   <div className={`w-4 h-4 rounded-full border-[1.5px] ${ms.status === 'paid' ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
                                      {ms.status === 'paid' && <Check size={10} strokeWidth={3} className="text-white"/>}
                                   </div>
                                   <span className={ms.status === 'paid' ? 'text-gray-400' : 'text-gray-700'}>{ms.name}</span>
                                 </div>
                                 <span className="text-gray-600">{ms.amount} €</span>
                               </div>
                             ))}
                             {!p.milestones && <p className="text-sm font-medium italic text-gray-400">Aucun jalon défini. Paiement global.</p>}
                           </div>
                         </div>

                         <div className="text-left md:text-right shrink-0 flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                            <p className="font-bold text-3xl text-yellow-600 mb-1">{p.budget} €</p>
                            <p className="text-xs font-semibold text-green-700 flex items-center gap-1.5 mb-2 bg-green-50 px-3 py-1.5 rounded-lg border-[1.5px] border-green-200 w-fit">
                              <ShieldCheck size={14}/> {p.status === 'litige' ? 'Fonds Gelés' : 'Sécurisé Escrow'}
                            </p>
                            
                            {p.status === 'active' && (
                              <div className="flex flex-col md:items-end gap-2 w-full mt-2">
                                <SoftButton variant="blue" className="px-5 py-2.5 text-sm w-full md:w-auto text-center justify-center border-blue-200 shadow-sm" onClick={() => setActiveTab('messagerie')}>Ouvrir le Chat</SoftButton>
                                <button className="px-5 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center md:justify-end gap-1.5 w-full md:w-auto" onClick={() => setLitigeModal(p)}><AlertTriangle size={14} /> Litige</button>
                                <button className="px-5 py-1 text-xs text-gray-400 hover:text-gray-700 transition-colors w-full md:w-auto text-center md:text-right" onClick={() => handleFinishContract(p)}>Forcer Terminaison (Dev)</button>
                              </div>
                            )}

                            {p.status === 'pending_verification' && (
                              <div className="flex flex-col gap-2 w-full mt-2">
                                <SoftButton variant="blue" className="px-4 py-2.5 text-sm justify-center shadow-sm" onClick={() => setActiveTab('messagerie')}><MessageSquare size={16} className="mr-2 inline" /> Discuter avec l'équipe</SoftButton>
                                <button className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center gap-1.5" onClick={() => setLitigeModal(p)}><AlertTriangle size={14} /> Litige</button>
                              </div>
                            )}

                            {p.status === 'litige' && (
                              <div className="flex flex-col items-end gap-2 w-full mt-2">
                                <SoftBadge color="white" className="border-red-500 text-red-500"><Scale size={14} className="mr-1.5 inline"/> Support Informé</SoftBadge>
                                <SoftButton variant="white" className="px-4 py-2 mt-2 text-sm text-gray-600 w-full justify-center" onClick={() => setActiveTab('messagerie')}>Discuter avec Synapse</SoftButton>
                              </div>
                            )}
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-medium italic text-gray-400 p-6 text-center border-[1.5px] border-gray-200 border-dashed rounded-xl">Aucun projet avec une équipe actuellement.</p>
                   )}
                 </div>

                 {/* Terminés */}
                 <div className="space-y-6 opacity-80">
                   <h4 className="font-bold text-xl border-b-[1.5px] border-gray-200 pb-4 flex items-center gap-3 text-gray-900">
                      <span className="w-3 h-3 rounded-full bg-gray-400" /> 
                      Projets Terminés (<span className="text-gray-600 px-2.5 py-0.5 bg-gray-100 rounded-lg text-sm">{projects.filter(p => p.status === 'completed').length}</span>)
                   </h4>
                   {projects.filter(p => p.status === 'completed').length > 0 ? projects.filter(p => p.status === 'completed').map(p => (
                     <SoftCard key={p.id} color="white" className="hover:border-gray-300 transition-colors cursor-pointer bg-gray-50/50">
                       <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                         <div>
                           <div className="flex items-center gap-4 mb-2">
                             <h5 className="font-bold text-xl text-gray-500">{p.title}</h5>
                             <SoftBadge color="blue">Terminé</SoftBadge>
                           </div>
                           <p className="text-sm font-medium text-gray-500">Apporteur : {p.apporteur} • Approuvé par l'Entreprise</p>
                         </div>
                         <div className="text-left md:text-right shrink-0">
                            <p className="font-bold text-2xl text-gray-500 mb-1">{p.budget} €</p>
                            <p className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded w-fit md:ml-auto">Clôturé & Payé</p>
                         </div>
                       </div>
                     </SoftCard>
                   )) : (
                     <p className="font-medium italic text-gray-400 p-6 text-center border-[1.5px] border-gray-200 border-dashed rounded-xl">Vous n'avez pas encore de projets terminés.</p>
                   )}
                 </div>

               </div>
             </div>
           )}

           {activeTab === 'messagerie' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Messagerie (Inbox)</h3>
               <p className="font-medium text-gray-500 mb-8">Retrouvez toutes vos conversations avec les Apporteurs d'Affaires et équipes de projet.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* DMs Apporteurs */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-base border-b-[1.5px] border-gray-200 pb-3 text-blue-600">🤝 Propositions d'Apporteurs</h4>
                   {inbox.filter(c => c.type === 'dm_apporteur').length > 0 ? inbox.filter(c => c.type === 'dm_apporteur').map(c => (
                     <div key={c.id} className="bg-white border-[1.5px] border-gray-200 p-4 xl:p-5 rounded-2xl cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-yellow-50 border-[1.5px] border-yellow-200 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`} alt="avatar" className="w-full h-full object-cover" /></div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-gray-900 truncate">{c.apporteur}</p>
                           <p className="text-sm font-medium text-gray-500 truncate">{c.title}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-sm font-medium text-gray-400 italic p-4 text-center border-[1.5px] border-gray-100 border-dashed rounded-xl">Aucun message reçu.</p>}
                 </div>

                 {/* Project Chats */}
                 <div className="space-y-4">
                   <h4 className="font-semibold text-base border-b-[1.5px] border-gray-200 pb-3 text-green-600">🛠 Communication Chantiers</h4>
                   {inbox.filter(c => c.type === 'project').length > 0 ? inbox.filter(c => c.type === 'project').map(c => (
                     <div key={c.id} className="bg-green-50/30 border-[1.5px] border-green-200 p-4 xl:p-5 rounded-2xl cursor-pointer hover:bg-green-50 transition-all group" onClick={() => openChatFromInbox(c)}>
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 border-[1.5px] border-green-200 text-green-600 bg-white rounded-full overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"><MessageSquare size={20} /></div>
                         <div className="overflow-hidden">
                           <p className="font-bold text-gray-900 truncate">{c.title}</p>
                           <p className="text-sm font-medium text-gray-500 truncate">Géré par {c.apporteur}</p>
                         </div>
                       </div>
                     </div>
                   )) : <p className="text-sm font-medium text-gray-400 italic p-4 text-center border-[1.5px] border-gray-100 border-dashed rounded-xl">Aucun chantier en cours.</p>}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'chat' && activeChat && (
             <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setActiveTab('messagerie')} className="font-medium text-sm text-gray-500 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"><ChevronRight className="rotate-180" size={16}/> Retour à la messagerie</button>
                <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[600px] xl:h-[700px]">
                   <header className="bg-white border-b-[1.5px] border-gray-200 px-6 py-4 md:px-8 py-5 flex justify-between items-center z-10 shrink-0">
                     <div className="overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-4" onClick={() => activeChat.type === 'dm_apporteur' && handleOpenApporteurProfile(activeChat.apporteur)}>
                       <div className="w-12 h-12 bg-gray-100 border-[1.5px] border-gray-200 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                          {activeChat.type === 'dm_apporteur' ? <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.avatar || 12}`} alt="avatar" className="w-full h-full object-cover" /> : <MessageSquare size={20} className="text-gray-500" />}
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-gray-900 truncate flex items-center gap-2">
                           {activeChat.title || activeChat.apporteur}
                           {activeChat.type === 'dm_apporteur' && <span className="text-[10px] font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md border-[1.5px] border-yellow-200 shrink-0 uppercase tracking-wide ml-2 hidden sm:inline-block">Voir Profil</span>}
                         </h3>
                         <p className="font-medium text-gray-500 text-sm truncate">
                           {activeChat.type === 'dm_apporteur' && `Discussion avec l'Apporteur ${activeChat.apporteur}`}
                           {activeChat.type === 'project' && 'Communication de Chantier'}
                         </p>
                       </div>
                     </div>
                   </header>
                   
                   {activeChat.type === 'dm_apporteur' && activeChat.status === 'pending' && (
                     <div className="bg-yellow-50 p-4 border-b-[1.5px] border-yellow-200 flex flex-wrap gap-4 items-center justify-between shrink-0">
                       <p className="font-medium text-sm text-yellow-800">L'Apporteur vous propose une équipe pour <strong>{activeChat.title}</strong>.</p>
                       <div className="flex flex-wrap gap-3">
                         <SoftButton variant="white" className="py-2 text-xs px-4" onClick={() => handleRefuseOffer(activeChat)}><X size={14} className="mr-1" /> Refuser</SoftButton>
                         <SoftButton variant="black" className="py-2 text-xs px-4 border-yellow-500" onClick={() => handleAcceptOffer(activeChat)}><Check size={14} className="mr-1" /> Accepter & Sécuriser Fonds</SoftButton>
                       </div>
                     </div>
                   )}

                   <div className="bg-blue-50/50 py-2.5 text-center border-b-[1.5px] border-blue-100 font-medium text-xs text-blue-600 shrink-0">
                     Participants : Vous (Entreprise), {activeChat.apporteur}
                   </div>

                   <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 bg-gray-50/50">
                      {activeChat.messages && activeChat.messages.length > 0 ? (
                         <div className="space-y-6">
                           {activeChat.messages.map((msg, i) => (
                             <div key={i} className={`flex gap-4 ${msg.sender === 'Moi (Entreprise)' ? 'justify-end' : ''}`}>
                               {msg.sender !== 'Moi (Entreprise)' && (
                                 <div className="w-10 h-10 border-[1.5px] border-gray-200 rounded-full overflow-hidden shrink-0 bg-white">
                                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.avatar || 12}`} alt={msg.sender} className="w-full h-full object-cover" />
                                 </div>
                               )}
                               <div className={`${msg.sender === 'Moi (Entreprise)' ? 'bg-blue-600 text-white' : 'bg-white border-[1.5px] border-gray-200'} p-4 rounded-2xl ${msg.sender === 'Moi (Entreprise)' ? 'rounded-br-sm' : 'rounded-bl-sm'} max-w-[85%] md:max-w-[75%] shadow-sm`}>
                                 <p className={`font-medium whitespace-pre-line leading-relaxed ${msg.sender === 'Moi (Entreprise)' ? 'text-white' : 'text-gray-800'}`}>{msg.text}</p>
                                 <span className={`text-[10px] font-semibold uppercase mt-2 block ${msg.sender === 'Moi (Entreprise)' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.sender === 'Moi (Entreprise)' ? 'Vous' : msg.sender} • {msg.time}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                      ) : (
                        <div className="h-full flex items-center justify-center flex-col text-center opacity-70">
                          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={32} />
                          </div>
                          <p className="font-bold text-gray-500 text-lg">Nouvelle discussion</p>
                        </div>
                      )}
                   </div>

                   <footer className="p-5 border-t-[1.5px] border-gray-200 bg-white flex gap-3 shrink-0">
                      <input 
                         placeholder="Écrire un message..." 
                         className="w-full flex-1 border-[1.5px] border-gray-200 rounded-xl px-5 py-3.5 font-medium placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 ring-blue-50 transition-all bg-gray-50 hover:bg-white" 
                         value={chatInput} 
                         onChange={(e) => setChatInput(e.target.value)}
                         onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      />
                      <SoftButton 
                         variant="blue" 
                         className="px-6 py-3.5 rounded-xl shadow-sm" 
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
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">Gestion Financière (Escrow)</h3>
               <p className="font-medium text-gray-500 mb-8">Consultez vos fonds sécurisés pour les contrats en cours et vos historiques de paiement.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <SoftCard title="Fonds Bloqués (En Cours)" color="yellow" className="bg-yellow-50/50 border-[1.5px] border-yellow-200">
                   <p className="text-4xl font-bold text-gray-900">{projects.filter(p => p.status === 'active').reduce((sum, p) => sum + parseInt(p.budget), 0)} €</p>
                   <p className="text-sm font-semibold mt-2 text-yellow-700">Sécurisés sur Escrow Synapse</p>
                 </SoftCard>
                 <SoftCard title="Fonds Libérés (Terminés)" color="green" className="bg-green-50/50 border-[1.5px] border-green-200">
                   <p className="text-4xl font-bold text-gray-900">{projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseInt(p.budget), 0)} €</p>
                   <p className="text-sm font-semibold mt-2 text-green-700">Payés aux Apporteurs d'Affaires</p>
                 </SoftCard>
               </div>

               <SoftCard title="Contrats Actifs (Fonds Sécurisés)">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'active').map(p => (
                     <div key={p.id} className="border-[1.5px] border-gray-200 rounded-2xl p-6 bg-white flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-sm transition-all">
                       <div>
                         <h4 className="font-bold text-xl text-gray-900 mb-1">{p.title}</h4>
                         <p className="font-medium text-sm text-gray-500">Géré par l'Apporteur : <span className="text-gray-900">{p.apporteur}</span></p>
                       </div>
                       <div className="text-left md:text-right flex md:flex-col justify-between items-center md:items-end w-full md:w-auto mt-2 md:mt-0">
                         <p className="font-bold text-2xl text-yellow-600 mb-2">{p.budget} €</p>
                         <SoftBadge color="yellow">Fonds Bloqués</SoftBadge>
                       </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'active').length === 0 && <p className="font-medium italic text-gray-400 p-6 text-center border-[1.5px] border-gray-100 border-dashed rounded-xl">Aucun contrat actif impliquant des fonds bloqués.</p>}
                 </div>
               </SoftCard>
               
               <SoftCard title="Historique des Paiements">
                 <div className="space-y-4">
                   {projects.filter(p => p.status === 'completed').map(p => (
                     <div key={p.id} className="border-[1.5px] border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4 group transition-all hover:bg-white hover:border-blue-200 hover:shadow-sm">
                       <div>
                         <p className="font-bold text-lg text-gray-900 mb-1">{p.title}</p>
                         <p className="text-sm font-medium text-gray-500">Apporteur : {p.apporteur} {p.invoice ? <span className="text-gray-400 font-normal">| Réf: {p.invoice}</span> : ''}</p>
                       </div>
                       <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                         <div className="text-left md:text-right">
                           <p className="font-bold text-green-600 text-xl">{p.budget} €</p>
                           <p className="text-xs font-semibold text-gray-400">Libéré au prestataire</p>
                         </div>
                         <button 
                             onClick={() => generatePDF(p)}
                             className="hidden md:flex flex-col items-center justify-center w-12 h-12 border-[1.5px] border-gray-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors bg-white shadow-sm" title="Télécharger le document d'Escrow (PDF)">
                           <FileText size={20} />
                         </button>
                       </div>
                     </div>
                   ))}
                   {projects.filter(p => p.status === 'completed').length === 0 && <p className="font-medium italic text-gray-400 p-6 text-center border-[1.5px] border-gray-100 border-dashed rounded-xl">Aucun historique de paiement pour le moment.</p>}
                 </div>
               </SoftCard>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

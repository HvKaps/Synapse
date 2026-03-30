import React, { useState } from 'react';
import { Zap, Plus, ArrowRight, Globe, Mail, LogIn, UserPlus } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftInput } from '../components/ui/SoftInput';

export const AuthPage = ({ onBack, onCompleteAuth }) => {
  const [authMode, setAuthMode] = useState('login'); 
  const [step, setStep] = useState(1); 
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { id: 'entreprise', label: 'Entreprise', color: 'blue', desc: 'Recruter les meilleurs talents' },
    { id: 'apporteur', label: 'Apporteur', color: 'yellow', desc: 'Générer des commissions' },
    { id: 'freelance', label: 'Freelance', color: 'purple', desc: 'Recevoir des missions clés en main' },
    { id: 'admin', label: 'Médiateur Synapse', color: 'red', desc: 'Supervision & Litiges Escrow' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedRole && email && password) {
      onCompleteAuth(selectedRole, authMode === 'login');
    }
  };

  const handleTabChange = (mode) => {
    setAuthMode(mode);
    setStep(1);
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden overflow-y-auto bg-slate-50">
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <SoftButton onClick={onBack} variant="white" className="rounded-full px-5 py-2 text-xs md:text-sm">Accueil</SoftButton>
      </div>

      <div className="max-w-md w-full animate-in zoom-in duration-500 mt-16 md:mt-0 relative z-10">
        <div className="text-center mb-10 space-y-4">
           <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl mx-auto flex items-center justify-center shadow-sm">
              <Zap size={28} strokeWidth={2} className="text-indigo-600" />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Bienvenue !</h1>
        </div>

        <div className="flex gap-4 mb-6">
           <button 
             onClick={() => handleTabChange('login')}
             className={`flex-1 py-3 md:py-4 border border-slate-200 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${authMode === 'login' ? 'bg-slate-900 text-white shadow-none border-slate-900' : 'bg-white hover:bg-slate-50 shadow-sm text-slate-700'}`}
           >
             <LogIn size={18} strokeWidth={2} /> Se Connecter
           </button>
           <button 
             onClick={() => handleTabChange('register')}
             className={`flex-1 py-3 md:py-4 border border-slate-200 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${authMode === 'register' ? 'bg-slate-900 text-white shadow-none border-slate-900' : 'bg-white hover:bg-slate-50 shadow-sm text-slate-700'}`}
           >
             <UserPlus size={18} strokeWidth={2} /> S'inscrire
           </button>
        </div>

        <SoftCard title={step === 1 ? "Quel rôle voulez-vous tester ?" : (authMode === 'login' ? "Identifiants de test" : "Création de compte")} className="relative">
          {step === 1 ? (
            <div className="space-y-4">
              {roles.map(r => (
                <button 
                  key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                  className={`w-full border p-5 rounded-2xl flex items-center justify-between transition-all group ${selectedRole === r.id ? 'bg-indigo-50/50 border-indigo-500 ring-1 ring-indigo-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'}`}
                >
                  <div className="text-left">
                    <span className={`font-semibold text-base block ${selectedRole === r.id ? 'text-indigo-900' : 'text-slate-900'}`}>{r.label}</span>
                    <p className={`text-sm font-medium mt-1 ${selectedRole === r.id ? 'text-indigo-700' : 'text-slate-500'}`}>{r.desc}</p>
                  </div>
                  <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all ${selectedRole === r.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-50'}`}>
                    <Plus size={16} strokeWidth={2} />
                  </div>
                </button>
              ))}
              <SoftButton 
                disabled={!selectedRole} className="w-full py-4 text-lg mt-6 rounded-xl" variant="black"
                onClick={() => setStep(2)}
              >
                Suivant <ArrowRight strokeWidth={2.5} className="ml-2 inline w-5 h-5" />
              </SoftButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
               <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl mb-4 text-center">
                 <p className="text-sm font-medium text-indigo-800">Rôle sélectionné : <span className="font-bold text-indigo-900">{selectedRole}</span></p>
               </div>
               
               <SoftInput required label="Email" type="email" placeholder="demo@synapse.io" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
               <SoftInput required label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
               
               <SoftButton type="submit" variant="yellow" className="w-full py-3.5 rounded-xl text-base mt-4">
                 {authMode === 'login' ? 'Accéder au Dashboard' : 'Commencer le Profil'}
               </SoftButton>
               
               <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4 mt-6">Retour au choix du rôle</button>
            </form>
          )}
        </SoftCard>
      </div>
    </div>
  );
};

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
    <div className="min-h-[100dvh] bg-[#FFF9C4]/40 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden overflow-y-auto">
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <SoftButton onClick={onBack} variant="white" className="rounded-full px-6 py-2 text-xs md:text-sm">Accueil</SoftButton>
      </div>

      <div className="max-w-md w-full animate-in zoom-in duration-500 mt-16 md:mt-0 relative z-10">
        <div className="text-center mb-8 space-y-4">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FFEB3B] border-[4px] border-black rounded-[25px] md:rounded-[30px] mx-auto flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Zap size={32} strokeWidth={4} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Bienvenue !</h1>
        </div>

        <div className="flex gap-4 mb-6">
           <button 
             onClick={() => handleTabChange('login')}
             className={`flex-1 py-3 md:py-4 border-[3px] border-black rounded-[20px] font-black uppercase text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${authMode === 'login' ? 'bg-black text-white shadow-none translate-y-1' : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
           >
             <LogIn size={18} /> Se Connecter
           </button>
           <button 
             onClick={() => handleTabChange('register')}
             className={`flex-1 py-3 md:py-4 border-[3px] border-black rounded-[20px] font-black uppercase text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${authMode === 'register' ? 'bg-black text-white shadow-none translate-y-1' : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
           >
             <UserPlus size={18} /> S'inscrire
           </button>
        </div>

        <SoftCard title={step === 1 ? "Quel rôle voulez-vous tester ?" : (authMode === 'login' ? "Identifiants de test" : "Création de compte")} className="relative">
          {step === 1 ? (
            <div className="space-y-4 md:space-y-6">
              {roles.map(r => (
                <button 
                  key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                  className={`w-full border-[3px] border-black p-4 md:p-6 rounded-[20px] md:rounded-[30px] flex items-center justify-between transition-all group ${selectedRole === r.id ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  <div className="text-left">
                    <span className="font-black uppercase text-xl md:text-2xl italic tracking-tighter">{r.label}</span>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${selectedRole === r.id ? 'text-gray-400' : 'text-gray-500'}`}>{r.desc}</p>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl border-[2px] border-black flex items-center justify-center transition-transform ${selectedRole === r.id ? 'bg-white text-black rotate-12' : 'bg-gray-100 group-hover:rotate-12'}`}>
                    <Plus size={20} strokeWidth={3} />
                  </div>
                </button>
              ))}
              <SoftButton 
                disabled={!selectedRole} className="w-full py-4 md:py-6 text-xl md:text-2xl mt-4 md:mt-8 rounded-[20px] md:rounded-[30px]"
                onClick={() => setStep(2)}
              >
                Suivant <ArrowRight strokeWidth={4} className="ml-2 inline w-5 h-5 md:w-6 md:h-6" />
              </SoftButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="bg-blue-50 border-[2px] border-black p-4 rounded-xl mb-4">
                 <p className="text-xs font-bold text-center">Rôle sélectionné : <span className="uppercase font-black text-blue-600">{selectedRole}</span></p>
               </div>
               
               <SoftInput required label="Email" type="email" placeholder="demo@synapse.io" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
               <SoftInput required label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
               
               <SoftButton type="submit" variant="yellow" className="w-full py-4 md:py-6 rounded-[20px] md:rounded-[30px] text-lg md:text-xl mt-4">
                 {authMode === 'login' ? 'Accéder au Dashboard' : 'Commencer le Profil'}
               </SoftButton>
               
               <button type="button" onClick={() => setStep(1)} className="w-full text-center text-[10px] font-black uppercase underline decoration-4 underline-offset-4 tracking-widest mt-4">Retour au choix du rôle</button>
            </form>
          )}
        </SoftCard>
      </div>
    </div>
  );
};

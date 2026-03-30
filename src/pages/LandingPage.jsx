import React from 'react';
import { Zap, Rocket, ShieldCheck, Star, Heart, Briefcase, Users, UserCheck, CheckCircle, Mic, GitBranch, Mail } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const LandingPage = ({ onStart }) => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans">
      <nav className="p-6 md:p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white border-[3px] border-black rounded-[20px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse Logo" className="w-full h-full object-contain p-1" />
          </div>
          <span className="font-black text-3xl tracking-tighter">SYNAPSE</span>
        </div>
        <div className="hidden lg:flex gap-10 font-black uppercase text-sm italic">
          <a href="#vision" className="hover:underline decoration-4">La Vision</a>
          <a href="#roles" className="hover:underline decoration-4">Les Rôles</a>
          <a href="#secu" className="hover:underline decoration-4">Sécurité</a>
        </div>
        <SoftButton onClick={() => onStart('login')} variant="black" className="px-8 py-3 rounded-full text-sm">
          Se Connecter
        </SoftButton>
      </nav>

      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <SoftBadge color="purple">Plateforme B2B N°1 en France</SoftBadge>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.85] uppercase italic text-black">
            L'Elite <br/> <span className="bg-[#FFEB3B] px-6 rounded-[40px] inline-block -rotate-1 border-[4px] border-black">Du Biz</span> <br/> Enfin Réunie.
          </h1>
          <p className="text-2xl font-bold text-gray-800 leading-relaxed max-w-2xl">
            Oubliez les plateformes froides et impersonnelles. Synapse connecte les <span className="bg-[#90CAF9] px-2 rounded-lg">Entreprises</span> ambitieuses, les <span className="bg-[#FFCC80] px-2 rounded-lg">Agents</span> redoutables et les <span className="bg-[#CE93D8] px-2 rounded-lg">Freelances</span> d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <SoftButton onClick={() => onStart('login')} variant="yellow" className="text-2xl px-14 py-8 rounded-[40px]">
              Rejoindre le Réseau <Rocket strokeWidth={3} />
            </SoftButton>
          </div>
          <div className="flex items-center gap-6 pt-4">
             <div className="flex -space-x-5">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-[3px] border-black bg-white overflow-hidden shadow-lg">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="user" />
                 </div>
               ))}
             </div>
             <p className="font-black text-sm uppercase tracking-widest">+5 000 Pros nous font confiance</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[#FFCC80] border-[4px] border-black rounded-[50px] translate-x-6 translate-y-6 -z-10" />
          <SoftCard className="hover:-rotate-2 transition-transform duration-500">
             <div className="space-y-8">
                <div className="flex justify-between items-center bg-[#FFEB3B] -mx-8 -mt-8 p-6 border-b-[3px] border-black">
                   <span className="font-black text-xl uppercase tracking-tight">Mission en Direct</span>
                   <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
                      <div className="w-3 h-3 bg-black rounded-full" />
                   </div>
                </div>
                <div className="p-6 border-[3px] border-black rounded-[30px] bg-[#FAFAFA] space-y-4">
                   <div className="flex justify-between items-center">
                      <h4 className="font-black text-xl uppercase">SaaS FinTech AI</h4>
                      <SoftBadge color="green">12 500 €</SoftBadge>
                   </div>
                   <p className="font-bold text-gray-500 text-sm">Équipe constituée par Agent "Marc D."</p>
                   <div className="flex gap-2">
                      <div className="h-2 bg-black flex-1 rounded-full" />
                      <div className="h-2 bg-black flex-1 rounded-full" />
                      <div className="h-2 bg-black/10 flex-1 rounded-full" />
                   </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                   <div className="flex gap-3 items-center">
                      <ShieldCheck className="text-green-600" size={28} strokeWidth={3} />
                      <span className="font-black uppercase text-sm italic">Fonds Bloqués (Escrow)</span>
                   </div>
                   <Zap className="text-[#FFEB3B]" size={32} strokeWidth={3} fill="currentColor" />
                </div>
             </div>
          </SoftCard>
        </div>
      </section>

      <div className="bg-black py-16 rotate-1 w-[110%] -ml-[5%] border-y-[6px] border-[#FFEB3B] overflow-hidden flex items-center">
         <div className="flex gap-16 animate-marquee whitespace-nowrap text-white font-black text-4xl uppercase italic">
            {[1,2,3,4].map(i => (
              <span key={i} className="flex items-center gap-12">
                <span>Matching IA Instantané</span>
                <Star className="text-[#FFEB3B]" size={40} fill="currentColor" />
                <span>Paiements Garantie 100%</span>
                <Heart className="text-[#CE93D8]" size={40} fill="currentColor" />
                <span>Réseau d'Elite</span>
                <Zap className="text-[#90CAF9]" size={40} fill="currentColor" />
              </span>
            ))}
         </div>
      </div>

      <section className="px-6 py-32 max-w-7xl mx-auto space-y-32">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <SoftCard title="L'Entreprise" icon={Briefcase} color="blue">
               <p className="font-bold text-lg leading-relaxed mb-6">Trouvez l'équipe de vos rêves sans perdre de temps. Notre IA scanne notre vivier pour vous proposer les meilleurs profils gérés par nos agents.</p>
               <SoftBadge color="blue">Porteur de Projet</SoftBadge>
            </SoftCard>
            <SoftCard title="L'Agent" icon={Users} color="yellow">
               <p className="font-bold text-lg leading-relaxed mb-6">Le cerveau du matching. Utilisez notre Team Builder pour composer des équipes, gérer les contrats et toucher vos commissions automatiquement.</p>
               <SoftBadge color="yellow">Apporteur d'Affaires</SoftBadge>
            </SoftCard>
            <SoftCard title="Le Freelance" icon={UserCheck} color="purple">
               <p className="font-bold text-lg leading-relaxed mb-6">Ne cherchez plus de clients. Recevez des propositions clés en main avec budget sécurisé par notre système Escrow.</p>
               <SoftBadge color="purple">Talent Expert</SoftBadge>
            </SoftCard>
         </div>

         <div className="space-y-12">
            <h3 className="text-5xl md:text-7xl font-black uppercase italic text-center tracking-tighter">Fini les plateformes <br/><span className="text-red-500">toxiques</span>.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <SoftCard color="white" className="border-red-500 bg-red-50 hover:-rotate-1 transition-transform">
                  <h4 className="font-black text-2xl uppercase italic mb-6 flex items-center gap-3"><span className="text-red-500">❌</span> Classique (Malt, Upwork)</h4>
                  <ul className="space-y-6 font-bold text-gray-700 text-lg">
                     <li className="flex gap-3"><span className="text-red-500">💀</span> Appels d'offres à l'aveugle et "Ghosting" constant de la part des clients.</li>
                     <li className="flex gap-3"><span className="text-red-500">📉</span> Indépendants noyés dans la concurrence et la guerre des prix bas.</li>
                     <li className="flex gap-3"><span className="text-red-500">👤</span> Aucune médiation humaine, support client robotisé, vous êtes seul.</li>
                     <li className="flex gap-3"><span className="text-red-500">⏳</span> Factures en retard de paiement de plus de 60 jours.</li>
                  </ul>
               </SoftCard>
               <SoftCard color="green" className="!bg-[#E8F5E9] border-black hover:rotate-1 transition-transform">
                  <h4 className="font-black text-2xl uppercase italic mb-6 flex items-center gap-3"><span className="text-green-600">✅</span> Synapse</h4>
                  <ul className="space-y-6 font-bold text-black text-lg">
                     <li className="flex gap-3"><span className="text-green-600">🤝</span> <span className="underline decoration-4 decoration-green-400">Zéro prospection.</span> Les Apporteurs trouvent les deals, vous n'avez qu'à valider.</li>
                     <li className="flex gap-3"><span className="text-green-600">💎</span> Marché fermé et ultra-qualitatif, tarifs de niche maintenus, pas de soldeurs.</li>
                     <li className="flex gap-3"><span className="text-green-600">🧠</span> Des Apporteurs humains filtrent et cadrent parfaitement le besoin du client à votre place.</li>
                     <li className="flex gap-3"><span className="text-green-600">🔒</span> L'argent vous attend déjà au chaud grâce au séquestre Synapse.</li>
                  </ul>
               </SoftCard>
            </div>
         </div>

         <div className="bg-black text-white border-[6px] border-[#FFEB3B] rounded-[40px] p-12 md:p-20 shadow-[15px_15px_0px_0px_#FFEB3B] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFEB3B] rounded-full blur-[140px] opacity-20 pointer-events-none" />
            <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-8 flex items-center gap-4">
               <ShieldCheck className="text-[#81C784]" size={60} strokeWidth={3} />
               La Confiance : L'Escrow.
            </h3>
            <p className="text-xl md:text-2xl font-bold leading-relaxed mb-12 max-w-4xl text-gray-300">
               Le système "Escrow" est notre <span className="text-[#FFEB3B] border-b-[4px] border-[#FFEB3B] text-white">Séquestre Numérique Intelligent</span>. Fini les factures impayées pour les freelances ou les abandons de poste pour les clients. 
               La sérénité financière est <span className="text-white underline decoration-wavy decoration-[#81C784]">garantie à 100% pour les trois parties</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white/10 border-[3px] border-white/20 p-8 rounded-[30px] backdrop-blur-md hover:-translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-[#90CAF9] border-[3px] border-black rounded-full flex items-center justify-center font-black text-2xl mb-6 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">1</div>
                  <h4 className="font-black text-2xl uppercase italic mb-4">Dépôt Sécurisé</h4>
                  <p className="font-bold text-gray-200">L'entreprise verse la totalité du budget du contrat sur un compte inviolable hébergé par Synapse avant le début du premier Jalon.</p>
               </div>
               <div className="bg-white/10 border-[3px] border-white/20 p-8 rounded-[30px] backdrop-blur-md hover:-translate-y-2 transition-transform delay-75">
                  <div className="w-12 h-12 bg-[#FFEB3B] border-[3px] border-black rounded-full flex items-center justify-center font-black text-2xl mb-6 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">2</div>
                  <h4 className="font-black text-2xl uppercase italic mb-4">Création Sérène</h4>
                  <p className="font-bold text-gray-200">L'équipe travaille l'esprit léger. L'entreprise ne peut pas fuir avec la caisse, et l'équipe ne peut pas encaisser sans avoir livré la valeur.</p>
               </div>
               <div className="bg-white/10 border-[3px] border-white/20 p-8 rounded-[30px] backdrop-blur-md hover:-translate-y-2 transition-transform delay-150">
                  <div className="w-12 h-12 bg-[#81C784] border-[3px] border-black rounded-full flex items-center justify-center font-black text-2xl mb-6 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">3</div>
                  <h4 className="font-black text-2xl uppercase italic mb-4">Virement Auto</h4>
                  <p className="font-bold text-gray-200">L'Apporteur indique la fin de mission. Dès validation en un clic par le client, l'argent est instantanément routé vers l'Apporteur et ses Talents.</p>
               </div>
            </div>
         </div>

         <div className="bg-[#FFF9C4] border-[4px] border-black rounded-[60px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex-1 space-y-8">
               <h3 className="text-5xl md:text-7xl font-black uppercase italic leading-none tracking-tighter">Ergonomie <br/> Pour Tous.</h3>
               <p className="text-xl font-bold text-gray-800">Nous avons conçu une interface inclusive. Pas de menu caché, pas de jargon complexe. Tout est à portée de main, visuel et intuitif.</p>
               <ul className="space-y-4 font-black uppercase text-sm italic">
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-600" /> Saisie Vocale Intégrée</li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-600" /> Contrastes de lecture élevés</li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-600" /> Navigation sans friction</li>
               </ul>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white border-[4px] border-black rounded-[40px] flex items-center justify-center p-10 rotate-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:rotate-6 transition-transform">
               <Mic size={120} strokeWidth={3} className="text-[#FFEB3B]" />
            </div>
         </div>
      </section>

      <section className="px-6 py-40 text-center space-y-12">
         <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Prêt à <span className="bg-[#90CAF9] px-4 rounded-3xl">Digitaliser</span> <br/> Votre Réseau ?</h2>
         <SoftButton onClick={() => onStart('login')} className="mx-auto py-10 px-20 text-3xl rounded-full">Démarrer Gratuitement 🚀</SoftButton>
      </section>

      <footer className="bg-white border-t-[4px] border-black p-12 md:p-24 text-center">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                 <img src="/synapse_logo.png" alt="Synapse Logo" className="w-full h-full object-contain p-1" />
               </div>
               <span className="font-black text-3xl tracking-tighter">SYNAPSE</span>
            </div>
            <div className="flex gap-10 font-black uppercase text-xs italic underline decoration-4">
               <a href="#confidentialite">Confidentialité</a>
               <a href="#mentions">Mentions Légales</a>
               <a href="#support">Support</a>
            </div>
            <div className="flex gap-6">
               <div className="w-12 h-12 bg-black text-white border-[3px] border-black rounded-full flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer"><GitBranch /></div>
               <div className="w-12 h-12 bg-[#CE93D8] border-[3px] border-black rounded-full flex items-center justify-center hover:-rotate-12 transition-transform cursor-pointer"><Mail /></div>
            </div>
         </div>
         <p className="font-black text-[10px] uppercase tracking-widest text-gray-400 mt-20">© 2026 SYNAPSE - L'alliance des Audacieux.</p>
      </footer>
    </div>
  );
};

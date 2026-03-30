import React from 'react';
import { Zap, Rocket, ShieldCheck, Star, Heart, Briefcase, Users, UserCheck, CheckCircle, Mic, GitBranch, Mail } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftBadge } from '../components/ui/SoftBadge';

export const LandingPage = ({ onStart }) => {
  return (
    <div className="font-sans text-gray-900">
      <nav className="p-6 md:p-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-[1.5px] border-gray-200 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/synapse_logo.png" alt="Synapse Logo" className="w-full h-full object-contain p-1.5" />
          </div>
          <span className="font-bold text-2xl tracking-tight">Synapse</span>
        </div>
        <div className="hidden lg:flex gap-10 font-medium text-sm text-gray-500">
          <a href="#vision" className="hover:text-black transition-colors">La Vision</a>
          <a href="#roles" className="hover:text-black transition-colors">Les Rôles</a>
          <a href="#secu" className="hover:text-black transition-colors">Sécurité</a>
        </div>
        <SoftButton onClick={() => onStart('login')} variant="black" className="px-6 py-2.5 rounded-full text-sm">
          Se Connecter
        </SoftButton>
      </nav>

      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <SoftBadge color="purple">Plateforme B2B N°1 en France</SoftBadge>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-gray-900 tracking-tight">
            L'Elite <br/> <span className="bg-[#FFEB3B]/40 px-4 rounded-xl inline-block mt-2">Du Biz</span> <br/> Enfin Réunie.
          </h1>
          <p className="text-xl font-medium text-gray-600 leading-relaxed max-w-2xl">
            Oubliez les plateformes froides et impersonnelles. Synapse connecte les <span className="bg-[#90CAF9]/20 px-2 rounded-md font-semibold text-blue-800">Entreprises</span> ambitieuses, les <span className="bg-[#FFCC80]/20 px-2 rounded-md font-semibold text-orange-800">Agents</span> redoutables et les <span className="bg-[#CE93D8]/20 px-2 rounded-md font-semibold text-purple-800">Freelances</span> d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <SoftButton onClick={() => onStart('login')} variant="yellow" className="text-lg px-8 py-4 rounded-full">
              Rejoindre le Réseau <Rocket size={20} />
            </SoftButton>
          </div>
          <div className="flex items-center gap-5 pt-8">
             <div className="flex -space-x-3">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F8F7F5] bg-gray-100 overflow-hidden shadow-sm">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="user" className="w-full h-full object-cover" />
                 </div>
               ))}
             </div>
             <p className="font-semibold text-sm text-gray-500">+5 000 Pros nous font confiance</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[#FFCC80]/20 rounded-[32px] translate-x-4 translate-y-4 -z-10" />
          <SoftCard className="hover:-translate-y-1 transition-transform duration-300">
             <div className="space-y-8">
                <div className="flex justify-between items-center bg-[#FFEB3B]/10 -mx-8 -mt-8 p-6 border-b-[1.5px] border-gray-100 rounded-t-2xl">
                   <span className="font-bold text-lg text-gray-800 flex items-center gap-2">Mission en Direct</span>
                   <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                   </div>
                </div>
                <div className="p-6 border-[1.5px] border-gray-100 rounded-xl bg-white space-y-4 shadow-sm">
                   <div className="flex justify-between items-center">
                      <h4 className="font-bold text-lg text-gray-900">SaaS FinTech AI</h4>
                      <SoftBadge color="green">12 500 €</SoftBadge>
                   </div>
                   <p className="font-medium text-gray-500 text-sm">Équipe constituée par Agent "Marc D."</p>
                   <div className="flex gap-2">
                      <div className="h-1.5 bg-green-500 flex-1 rounded-full" />
                      <div className="h-1.5 bg-green-500 flex-1 rounded-full" />
                      <div className="h-1.5 bg-gray-100 flex-1 rounded-full" />
                   </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                   <div className="flex gap-3 items-center">
                      <ShieldCheck className="text-green-500" size={24} strokeWidth={2.5} />
                      <span className="font-medium text-sm text-gray-600">Fonds Bloqués (Escrow)</span>
                   </div>
                   <Zap className="text-[#FBC02D]" size={24} strokeWidth={2.5} fill="currentColor" />
                </div>
             </div>
          </SoftCard>
        </div>
      </section>

      <div className="bg-gray-900 py-10 border-y border-gray-800 overflow-hidden flex items-center">
         <div className="flex gap-16 animate-marquee whitespace-nowrap text-white font-bold text-3xl tracking-wide">
            {[1,2,3,4].map(i => (
              <span key={i} className="flex items-center gap-12">
                <span>Matching IA Instantané</span>
                <Star className="text-[#FBC02D]" size={32} fill="currentColor" />
                <span>Paiements Garantie 100%</span>
                <Heart className="text-[#AB47BC]" size={32} fill="currentColor" />
                <span>Réseau d'Elite</span>
                <Zap className="text-[#42A5F5]" size={32} fill="currentColor" />
              </span>
            ))}
         </div>
      </div>

      <section className="px-6 py-24 max-w-7xl mx-auto space-y-24">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <SoftCard title="L'Entreprise" icon={Briefcase} color="blue">
               <p className="font-medium text-gray-600 text-lg leading-relaxed mb-8">Trouvez l'équipe de vos rêves sans perdre de temps. Notre IA scanne notre vivier pour vous proposer les meilleurs profils gérés par nos agents.</p>
               <SoftBadge color="blue">Porteur de Projet</SoftBadge>
            </SoftCard>
            <SoftCard title="L'Agent" icon={Users} color="yellow">
               <p className="font-medium text-gray-600 text-lg leading-relaxed mb-8">Le cerveau du matching. Utilisez notre Team Builder pour composer des équipes, gérer les contrats et toucher vos commissions automatiquement.</p>
               <SoftBadge color="yellow">Apporteur d'Affaires</SoftBadge>
            </SoftCard>
            <SoftCard title="Le Freelance" icon={UserCheck} color="purple">
               <p className="font-medium text-gray-600 text-lg leading-relaxed mb-8">Ne cherchez plus de clients. Recevez des propositions clés en main avec budget sécurisé par notre système Escrow.</p>
               <SoftBadge color="purple">Talent Expert</SoftBadge>
            </SoftCard>
         </div>

         <div className="space-y-12">
            <h3 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-gray-900">Fini les plateformes <br/><span className="text-red-500">toxiques</span>.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="bg-red-50/50 border-[1.5px] border-red-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <h4 className="font-bold text-xl text-red-900 mb-6 flex items-center gap-3"><span className="text-red-500">❌</span> Classique (Malt, Upwork)</h4>
                  <ul className="space-y-5 font-medium text-gray-700">
                     <li className="flex gap-3 items-start"><span className="text-red-500 mt-0.5">💀</span> Appels d'offres à l'aveugle et "Ghosting" constant de la part des clients.</li>
                     <li className="flex gap-3 items-start"><span className="text-red-500 mt-0.5">📉</span> Indépendants noyés dans la concurrence et la guerre des prix bas.</li>
                     <li className="flex gap-3 items-start"><span className="text-red-500 mt-0.5">👤</span> Aucune médiation humaine, support client robotisé, vous êtes seul.</li>
                     <li className="flex gap-3 items-start"><span className="text-red-500 mt-0.5">⏳</span> Factures en retard de paiement de plus de 60 jours.</li>
                  </ul>
               </div>
               <div className="bg-green-50/50 border-[1.5px] border-green-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-green-400" />
                  <h4 className="font-bold text-xl text-green-900 mb-6 flex items-center gap-3"><span className="text-green-500">✅</span> Synapse</h4>
                  <ul className="space-y-5 font-medium text-gray-800">
                     <li className="flex gap-3 items-start"><span className="text-green-500 mt-0.5">🤝</span> <span><span className="font-semibold text-green-700">Zéro prospection.</span> Les Apporteurs trouvent les deals, vous n'avez qu'à valider.</span></li>
                     <li className="flex gap-3 items-start"><span className="text-green-500 mt-0.5">💎</span> Marché fermé et ultra-qualitatif, tarifs de niche maintenus, pas de soldeurs.</li>
                     <li className="flex gap-3 items-start"><span className="text-green-500 mt-0.5">🧠</span> Des Apporteurs humains filtrent et cadrent parfaitement le besoin du client.</li>
                     <li className="flex gap-3 items-start"><span className="text-green-500 mt-0.5">🔒</span> L'argent vous attend déjà au chaud grâce au séquestre Synapse.</li>
                  </ul>
               </div>
            </div>
         </div>

         <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFEB3B] rounded-full blur-[140px] opacity-10 pointer-events-none" />
            <h3 className="text-3xl md:text-5xl font-bold mb-8 flex items-center gap-4 tracking-tight">
               <ShieldCheck className="text-green-400" size={50} strokeWidth={2.5} />
               La Confiance : L'Escrow.
            </h3>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl text-gray-300">
               Le système "Escrow" est notre <span className="text-yellow-400 font-semibold">Séquestre Numérique Intelligent</span>. Fini les factures impayées pour les freelances ou les abandons de poste pour les clients. 
               La sérénité financière est garantie à 100% pour les trois parties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white/5 border-[1.5px] border-white/10 p-8 rounded-2xl backdrop-blur-md hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center font-bold text-lg mb-6 text-gray-900">1</div>
                  <h4 className="font-bold text-xl mb-3 text-white">Dépôt Sécurisé</h4>
                  <p className="font-medium text-gray-400 leading-relaxed">L'entreprise verse la totalité du budget du contrat sur un compte inviolable hébergé par Synapse avant le début du premier Jalon.</p>
               </div>
               <div className="bg-white/5 border-[1.5px] border-white/10 p-8 rounded-2xl backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 delay-75">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-lg mb-6 text-gray-900">2</div>
                  <h4 className="font-bold text-xl mb-3 text-white">Création Sereine</h4>
                  <p className="font-medium text-gray-400 leading-relaxed">L'équipe travaille l'esprit léger. L'entreprise ne peut pas fuir avec la caisse, et l'équipe ne peut pas encaisser sans avoir livré la valeur.</p>
               </div>
               <div className="bg-white/5 border-[1.5px] border-white/10 p-8 rounded-2xl backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 delay-150">
                  <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center font-bold text-lg mb-6 text-gray-900">3</div>
                  <h4 className="font-bold text-xl mb-3 text-white">Virement Auto</h4>
                  <p className="font-medium text-gray-400 leading-relaxed">L'Apporteur indique la fin de mission. Dès validation par le client, l'argent est instantanément routé vers l'Apporteur et ses Talents.</p>
               </div>
            </div>
         </div>

         <div className="bg-[#FFEB3B]/10 border-[1.5px] border-yellow-200 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
               <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Ergonomie <br/> Pour Tous.</h3>
               <p className="text-lg font-medium text-gray-600">Nous avons conçu une interface inclusive. Pas de menu caché, pas de jargon complexe. Tout est à portée de main, visuel et intuitif.</p>
               <ul className="space-y-4 font-semibold text-gray-800">
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-500" size={20} /> Saisie Vocale Intégrée</li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-500" size={20} /> Contrastes de lecture élevés</li>
                  <li className="flex items-center gap-4"><CheckCircle className="text-green-500" size={20} /> Navigation sans friction</li>
               </ul>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white border-[1.5px] border-yellow-200 rounded-3xl flex items-center justify-center p-10 shadow-sm hover:scale-105 transition-transform duration-300">
               <Mic size={100} strokeWidth={2} className="text-[#FBC02D]" />
            </div>
         </div>
      </section>

      <section className="px-6 py-24 text-center space-y-10">
         <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">Prêt à <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-2xl">Digitaliser</span> <br/> Votre Réseau ?</h2>
         <SoftButton onClick={() => onStart('login')} className="mx-auto py-6 px-12 text-xl rounded-full">Démarrer Gratuitement 🚀</SoftButton>
      </section>

      <footer className="bg-white border-t-[1.5px] border-gray-200 p-10 md:p-20 text-center">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white border-[1.5px] border-gray-200 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                 <img src="/synapse_logo.png" alt="Synapse Logo" className="w-full h-full object-contain p-1" />
               </div>
               <span className="font-bold text-2xl tracking-tight text-gray-900">Synapse</span>
            </div>
            <div className="flex gap-8 font-medium text-sm text-gray-500">
               <a href="#confidentialite" className="hover:text-black transition-colors">Confidentialité</a>
               <a href="#mentions" className="hover:text-black transition-colors">Mentions Légales</a>
               <a href="#support" className="hover:text-black transition-colors">Support</a>
            </div>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"><GitBranch size={20} /></div>
               <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors cursor-pointer"><Mail size={20} /></div>
            </div>
         </div>
         <p className="font-medium text-[11px] uppercase tracking-wider text-gray-400 mt-16">© 2026 SYNAPSE - L'alliance des Audacieux.</p>
      </footer>
    </div>
  );
};

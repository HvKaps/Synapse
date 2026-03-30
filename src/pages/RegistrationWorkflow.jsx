import React, { useState } from 'react';
import { Zap, UserCheck, Target, Award, BookOpen, Globe, GitBranch, FileUp, FileText, X } from 'lucide-react';
import { SoftButton } from '../components/ui/SoftButton';
import { SoftCard } from '../components/ui/SoftCard';
import { SoftInput } from '../components/ui/SoftInput';

const FREELANCE_DOMAINS = ["Développement Web", "Mobile iOS/Android", "Design UI/UX", "Data & IA", "Marketing Digital", "Cybersécurité", "Blockchain", "No-Code"];
const SKILLS_LIST = ["React", "TypeScript", "Node.js", "Figma", "Python", "AWS", "Tailwind", "Docker", "Solidity", "Framermotion"];

export const RegistrationWorkflow = ({ selectedRole, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    role: selectedRole, // Initialize with the prop
    firstName: '',
    lastName: '',
    bio: '',
    birthDate: '',
    github: '',
    portfolio: '',
    expTotal: '',
    education: '',
    selectedDomains: [],
    skills: [],
    profession: '', // For individual (freelance)
    domain: '', // For individual (apporteur)
    companyBio: '', // For company
    companySector: '', // For company
    companyCreationYear: '', // For company
    companySize: '', // For company
    companyWebsite: '', // For company
    iban: '' // For freelancers & apporteurs payments
  });

  const toggleDomain = (d) => {
    setFormData(prev => ({
      ...prev,
      selectedDomains: prev.selectedDomains.includes(d) 
        ? prev.selectedDomains.filter(x => x !== d) 
        : [...prev.selectedDomains, d]
    }));
  };

  const addSkill = (s) => {
    if (!formData.skills.find(sk => sk.name === s)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, { name: s, years: 1 }] }));
    }
  };

  const updateSkillYears = (name, years) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(sk => sk.name === name ? { ...sk, years: parseInt(years) || 1 } : sk)
    }));
  };

  const removeSkill = (name) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(sk => sk.name !== name) }));
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] p-6 pb-40 font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-20 duration-700">
        
        <header className="flex justify-between items-center bg-white border-[4px] border-black rounded-[35px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
           <button type="button" onClick={onCancel} className="font-black uppercase text-sm italic hover:underline decoration-4">Annuler</button>
           <div className="text-center">
             <h2 className="text-2xl font-black uppercase italic tracking-tighter">Onboarding {selectedRole}</h2>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Profil professionnel 2026</p>
           </div>
           <div className="w-12 h-12 bg-[#FFEB3B] border-[3px] border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Zap size={24} strokeWidth={3} /></div>
        </header>

        <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); onComplete({...formData, role: selectedRole}); }}>
          <div className="space-y-6 animate-in slide-in-from-right">
            <h2 className="text-3xl font-black uppercase italic mb-6">Vos Informations</h2>
            
            {formData.role === 'entreprise' ? (
              <>
                <SoftInput
                  required
                  label="Nom de l'entreprise"
                  placeholder="Ex: TechCorp Solutions"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <SoftInput
                  required
                  label="Informations sur l'entreprise (Bio brève)"
                  placeholder="Ex: Éditeur de logiciels SaaS leader sur le marché européen..."
                  value={formData.companyBio}
                  onChange={(e) => setFormData({...formData, companyBio: e.target.value})}
                />
                <SoftInput
                  required
                  label="Domaine / Secteur d'activité"
                  placeholder="Ex: FinTech, E-commerce, Santé..."
                  value={formData.companySector}
                  onChange={(e) => setFormData({...formData, companySector: e.target.value})}
                />
                <SoftInput
                  label="Date de création (Année)"
                  placeholder="Ex: 2018"
                  type="number"
                  value={formData.companyCreationYear}
                  onChange={(e) => setFormData({...formData, companyCreationYear: e.target.value})}
                />
                <SoftInput
                  label="Taille de l'entreprise"
                  placeholder="Ex: 10-50 employés"
                  value={formData.companySize}
                  onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                />
                <SoftInput
                  label="Site Web (Optionnel)"
                  placeholder="Ex: www.entreprise.fr"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                />
              </>
            ) : (
              <>
                <SoftInput
                  required
                  label="Prénom"
                  placeholder="Ex: Marc"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <SoftInput
                  required
                  label="Nom"
                  placeholder="Ex: Dupont"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
                
                {formData.role === 'freelance' && (
                  <SoftInput
                    required
                    label="Métier / Spécialité"
                    placeholder="Ex: Développeur React"
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                  />
                )}

                {formData.role === 'apporteur' && (
                  <SoftInput
                    label="Domaine d'expertise (Optionnel)"
                    placeholder="Ex: Tech, BTP, Marketing..."
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  />
                )}
                <SoftInput required label="Date de Naissance" type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} />
                <SoftInput required label="Années d'Expérience (Total)" type="number" placeholder="5" value={formData.expTotal} onChange={e => setFormData({...formData, expTotal: e.target.value})} />
                
                <div className="pt-6">
                   <div className="bg-[#FFF9C4] border-[3px] border-black p-6 rounded-[25px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <p className="font-black uppercase text-xl mb-4 italic">Paiements Sécurisés (Escrow)</p>
                     <p className="font-bold text-gray-700 text-sm mb-6">Afin de garantir le paiement de vos prestations et commissions par le système Synapse, le renseignement de vos coordonnées bancaires est exigé.</p>
                     <SoftInput required label="IBAN Bancaire" placeholder="FR76..." value={formData.iban} onChange={e => setFormData({...formData, iban: e.target.value})} />
                   </div>
                </div>
              </>
            )}
          </div>

          {(selectedRole === 'freelance' || selectedRole === 'apporteur') && (
              <SoftCard title="Tes Domaines" icon={Target} color="yellow">
                 <p className="font-black uppercase text-xs mb-6 text-gray-500 tracking-widest">Choisis tes étiquettes de prédilection :</p>
                 <div className="flex flex-wrap gap-4">
                    {FREELANCE_DOMAINS.map(d => (
                      <button 
                        key={d} type="button" onClick={() => toggleDomain(d)}
                        className={`border-[3px] border-black px-6 py-3 rounded-full font-black uppercase text-sm transition-all duration-300 ${formData.selectedDomains.includes(d) ? 'bg-black text-white translate-y-1 shadow-none' : 'bg-white hover:bg-gray-50 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        {d}
                      </button>
                    ))}
                 </div>
              </SoftCard>
          )}

          {selectedRole === 'freelance' && (
            <>
              <SoftCard title="Skills & Bio" icon={Award} color="purple">
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <p className="font-black uppercase text-xs text-gray-500 tracking-widest">Sélectionne tes compétences techniques :</p>
                       <div className="flex flex-wrap gap-3">
                          {SKILLS_LIST.map(s => (
                            <button 
                              key={s} type="button" onClick={() => addSkill(s)}
                              className="px-4 py-2 bg-[#BFDBFE] border-[2px] border-black rounded-xl font-black text-xs hover:bg-[#90CAF9] transition-all"
                            >
                              + {s}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {formData.skills.map(skill => (
                         <div key={skill.name} className="bg-white border-[3px] border-black p-5 rounded-[25px] flex items-center justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in">
                            <div>
                               <p className="font-black uppercase italic text-lg">{skill.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                               <input 
                                 type="number" value={skill.years} 
                                 onChange={(e) => updateSkillYears(skill.name, e.target.value)}
                                 className="w-16 border-[2px] border-black p-2 rounded-xl text-center font-black"
                               />
                               <span className="text-[10px] font-black uppercase">Ans</span>
                               <button type="button" onClick={() => removeSkill(skill.name)} className="text-red-500"><X size={20} /></button>
                            </div>
                         </div>
                       ))}
                    </div>

                    <SoftInput label="Ta Bio Professionnelle" rows={4} placeholder="Décris ton expertise, ton style de travail..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                 </div>
              </SoftCard>

              <SoftCard title="Carrière & Liens" icon={BookOpen} color="blue">
                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <SoftInput label="Dernier Diplôme / Education" placeholder="Master, Certif..." value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />
                       <SoftInput label="Lien Portfolio" icon={Globe} placeholder="portfolio.com" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                       <SoftInput label="GitHub" icon={GitBranch} placeholder="github.com/pseudo" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-10 border-[3px] border-black border-dashed rounded-[30px] bg-[#FAFAFA] text-center space-y-4 hover:border-black transition-colors cursor-pointer group">
                          <FileUp className="mx-auto text-gray-400 group-hover:text-black" size={40} />
                          <p className="font-black uppercase text-sm italic">Uploader ton CV (PDF)</p>
                       </div>
                       <div className="p-10 border-[3px] border-black border-dashed rounded-[30px] bg-[#FAFAFA] text-center space-y-4 hover:border-black transition-colors cursor-pointer group">
                          <FileText className="mx-auto text-gray-400 group-hover:text-black" size={40} />
                          <p className="font-black uppercase text-sm italic">Lettre de Motivation</p>
                       </div>
                    </div>
                 </div>
              </SoftCard>
            </>
          )}

          <div className="pt-10">
             <SoftButton type="submit" className="w-full py-8 text-3xl rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                Finaliser l'Inscription 🚀
             </SoftButton>
          </div>
        </form>
      </div>
    </div>
  );
};

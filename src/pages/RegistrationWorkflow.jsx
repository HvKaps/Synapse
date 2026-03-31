import React, { useState } from 'react';
import { Zap, UserCheck, Target, Award, BookOpen, Globe, GitBranch, FileUp, FileText, X, Briefcase } from 'lucide-react';
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
    <div className="min-h-screen p-6 pb-40 font-sans overflow-x-hidden bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-20 duration-700 mt-6">
        
        <header className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <button type="button" onClick={onCancel} className="font-semibold text-sm text-slate-500 hover:text-slate-900 transition-colors">Annuler</button>
           <div className="text-center">
             <h2 className="text-xl font-bold tracking-tight text-slate-900">Onboarding {selectedRole}</h2>
             <p className="text-xs font-semibold tracking-wider text-slate-500 mt-1 uppercase">Profil professionnel 2026</p>
           </div>
           <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center shadow-sm"><Zap size={20} strokeWidth={2} className="text-indigo-600" /></div>
        </header>

        <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onComplete({...formData, role: selectedRole}); }}>
          <div className="space-y-6 animate-in slide-in-from-right">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Vos Informations</h2>
            
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
                
                <div className="pt-4">
                   <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
                     <p className="font-bold text-lg mb-2 text-emerald-900 flex items-center gap-2"><Briefcase size={20} className="text-emerald-600" /> Paiements Sécurisés (Escrow)</p>
                     <p className="font-medium text-slate-700 text-sm mb-5">Afin de garantir le paiement de vos prestations et commissions par le système Synapse, le renseignement de vos coordonnées bancaires est exigé.</p>
                     <SoftInput required label="IBAN Bancaire" placeholder="FR76..." value={formData.iban} onChange={e => setFormData({...formData, iban: e.target.value})} />
                   </div>
                </div>
              </>
            )}
          </div>

          {(selectedRole === 'freelance' || selectedRole === 'apporteur') && (
              <SoftCard title="Vos Domaines" icon={Target} color="yellow">
                 <p className="font-medium text-sm mb-5 text-slate-500">Sélectionnez vos domaines d'expertise :</p>
                 <div className="flex flex-wrap gap-3">
                    {FREELANCE_DOMAINS.map(d => (
                      <button 
                        key={d} type="button" onClick={() => toggleDomain(d)}
                        className={`border px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${formData.selectedDomains.includes(d) ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
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
                 <div className="space-y-8">
                    <div className="space-y-4">
                       <p className="font-medium text-sm text-slate-500">Sélectionnez vos compétences techniques :</p>
                       <div className="flex flex-wrap gap-2">
                          {SKILLS_LIST.map(s => (
                            <button 
                              key={s} type="button" onClick={() => addSkill(s)}
                              className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md font-medium text-sm hover:bg-indigo-100 transition-colors"
                            >
                              + {s}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {formData.skills.map(skill => (
                         <div key={skill.name} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm animate-in zoom-in">
                            <div>
                               <p className="font-semibold text-slate-900">{skill.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                               <input 
                                 type="number" value={skill.years} 
                                 onChange={(e) => updateSkillYears(skill.name, e.target.value)}
                                 className="w-16 border border-slate-200 p-1.5 rounded-lg text-center font-medium focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                               />
                               <span className="text-xs font-semibold text-slate-400 uppercase">Ans</span>
                               <button type="button" onClick={() => removeSkill(skill.name)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={18} strokeWidth={2} /></button>
                            </div>
                         </div>
                       ))}
                    </div>

                    <SoftInput label="Votre Bio Professionnelle" rows={4} placeholder="Décrivez votre expertise, votre style de travail..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                 </div>
              </SoftCard>

              <SoftCard title="Carrière & Liens" icon={BookOpen} color="blue">
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <SoftInput label="Dernier Diplôme / Éducation" placeholder="Master, Certif..." value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />
                       <SoftInput label="Lien Portfolio" icon={Globe} placeholder="portfolio.com" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                       <SoftInput label="GitHub" icon={GitBranch} placeholder="github.com/pseudo" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-8 border border-slate-300 border-dashed rounded-xl bg-slate-50 text-center space-y-3 hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
                          <FileUp className="mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors" size={32} strokeWidth={1.5} />
                          <p className="font-medium text-sm text-slate-600 group-hover:text-indigo-700">Uploader votre CV (PDF)</p>
                       </div>
                       <div className="p-8 border border-slate-300 border-dashed rounded-xl bg-slate-50 text-center space-y-3 hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer group">
                          <FileText className="mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors" size={32} strokeWidth={1.5} />
                          <p className="font-medium text-sm text-slate-600 group-hover:text-indigo-700">Lettre de Motivation</p>
                       </div>
                    </div>
                 </div>
              </SoftCard>
            </>
          )}

          <div className="pt-8 w-full flex justify-end">
             <SoftButton 
               type="button" 
               variant="yellow" 
               className="py-3.5 px-8 text-base"
               onClick={(e) => {
                 e.preventDefault();
                 onComplete({...formData, role: selectedRole});
               }}
             >
                Finaliser l'Inscription <Zap size={18} className="ml-1" fill="currentColor" strokeWidth={0} />
             </SoftButton>
          </div>
        </form>
      </div>
    </div>
  );
};

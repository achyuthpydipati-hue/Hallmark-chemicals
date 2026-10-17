import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Award, Microscope, ShieldCheck, Linkedin, CheckCircle2, X } from 'lucide-react';
import { LEADERSHIP } from '../../data/companyData';
import { ExecutiveLeader } from '../../types/pharma';

export const AboutSection: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<ExecutiveLeader | null>(null);

  return (
    <section id="leadership" className="py-24 bg-[#F5FAFC] text-slate-800 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top Story Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20 shadow-sm">
            About Hallmark Chemicals
          </span>
        </div>

        {/* Executive Leadership Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl font-bold text-slate-900">Executive Leadership Team</h3>
            <p className="text-xs text-slate-500 font-medium">Guided by world-renowned clinical scientists, pharmacologists, and regulatory auditors.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((leader, idx) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-[#00B894]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative mb-5 rounded-2xl overflow-hidden h-56 bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold text-white bg-slate-900/80 border border-white/20 px-2.5 py-0.5 rounded-md backdrop-blur-md shadow-sm">
                      {leader.experienceYears}+ Yrs Industry Exp
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#00B894] transition-colors">
                    {leader.name}
                  </h4>
                  <p className="text-xs font-bold text-[#00B894] mt-0.5">{leader.role}</p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 font-normal">{leader.qualifications}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="text-xs font-bold text-[#00B894] hover:text-[#008f73] transition-colors"
                  >
                    Read Full Bio
                  </button>
                  <Linkedin className="w-4 h-4 text-slate-400 hover:text-[#00B894] transition-colors cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2026-2030 R&D Strategic Roadmap */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 border border-slate-200/80 shadow-xl space-y-8 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto space-y-2 z-10 relative">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20">
              Future Readiness
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Strategic Growth Roadmap (2026-2030)
            </h3>
            <p className="text-xs text-slate-600 font-normal">
              Positioning Hallmark Chemicals as the primary partner for contract development & manufacturing (CDMO) and novel formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs z-10 relative">
            <div className="p-6 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-3">
              <span className="font-mono font-bold text-[#00B894] text-sm block">2026 - 2027</span>
              <h4 className="font-bold text-slate-900 text-base">Biologics & Sublingual Expansion</h4>
              <p className="text-slate-600 font-normal leading-relaxed">
                Commercializing 5 new sublingual fast-disintegrating formulations and scaling our 20mL sterile vial aseptic lines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-3">
              <span className="font-mono font-bold text-[#00B894] text-sm block">2027 - 2028</span>
              <h4 className="font-bold text-slate-900 text-base">AI-Driven Formulation Discovery</h4>
              <p className="text-slate-600 font-normal leading-relaxed">
                Deploying deep neural networks to model oral peptide absorption and optimize lipid nanoparticle delivery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-3">
              <span className="font-mono font-bold text-[#00B894] text-sm block">2029 - 2030</span>
              <h4 className="font-bold text-slate-900 text-base">Net-Zero Carbon cGMP Operations</h4>
              <p className="text-slate-600 font-normal leading-relaxed">
                Achieving 100% solar and geothermal energy self-sufficiency across all global manufacturing facilities.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Leader Bio Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-slate-900 space-y-4"
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">{selectedLeader.name}</h3>
                  <p className="text-xs font-bold text-[#00B894]">{selectedLeader.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{selectedLeader.qualifications}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
                {selectedLeader.bio}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-emerald-300/80">
                <span>Experience: {selectedLeader.experienceYears}+ Years</span>
                <span className="text-lime-300 font-bold">Hallmark Board Member</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

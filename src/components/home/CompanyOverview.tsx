import React from 'react';
import { motion } from 'motion/react';
import { Dna, Globe2, Sparkles, Clock } from 'lucide-react';

interface CompanyOverviewProps {
  onNavigateSection: (id: string) => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ onNavigateSection }) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#F5FAFC] text-slate-800 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20 shadow-sm">
            About Hallmark Chemicals
          </span>
        </div>

        {/* Full-width Corporate Introduction / Our Journey Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[28px] border border-slate-200/80 p-8 sm:p-12 lg:p-14 shadow-md max-w-[960px] mx-auto relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00B894]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Centered Heading with Emerald Green Accent Line */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00B894] mb-2">
              <Clock className="w-4 h-4" />
              <span>Company History</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Journey
            </h2>
            <div className="w-16 h-1 bg-[#00B894] rounded-full mx-auto mt-3" />
          </div>

          {/* Timeline Visual & Verbatim Content Container */}
          <div className="space-y-8">

            {/* Verbatim Narrative Text Box */}
            <div className="bg-[#FAFDFD] rounded-2xl border border-[#00B894]/20 p-6 sm:p-8 text-slate-700 text-base sm:text-lg leading-[1.85] font-normal shadow-sm">
              <p>
                In <span className="text-[#00B894] font-bold">1982</span> hallmark has come into existence in with its own highly sophisticated manufacturing facility. hallmark has introduced and marketed many novel products in AP MP & Kerala. hallmark is the first company to introduce Erythromycin 500 mg Tablets into the Indian market under the brand name <span className="text-[#00B894] font-bold tracking-wide">ERYTHROSTAT</span>. Unexpectedly the journey has come to an end in <span className="text-[#00B894] font-bold">1986</span>. Again in <span className="text-[#00B894] font-bold">1996</span> hallmark took its rebirth and started its journey. From <span className="text-[#00B894] font-bold">2000</span> onwards it took its maiden flight and started expanding with a good pace. Now hallmark has many formulations exclusively in paediatrics, Gynaeac and GP segments.
              </p>
            </div>

            {/* Interactive Milestone Cards highlighting exact sentences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#00B894]/40 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">1982</span>
                  <span className="text-xs font-bold text-slate-900">Inception & Innovation</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  In 1982 hallmark has come into existence in with its own highly sophisticated manufacturing facility. hallmark has introduced and marketed many novel products in AP MP & Kerala.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#00B894]/40 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">ERYTHROSTAT</span>
                  <span className="text-xs font-bold text-slate-900">Industry First</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  hallmark is the first company to introduce Erythromycin 500 mg Tablets into the Indian market under the brand name ERYTHROSTAT.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#00B894]/40 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">1986 – 1996</span>
                  <span className="text-xs font-bold text-slate-900">Rebirth & Renewal</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Unexpectedly the journey has come to an end in 1986. Again in 1996 hallmark took its rebirth and started its journey.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#00B894]/40 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">2000 – Present</span>
                  <span className="text-xs font-bold text-slate-900">Expansion & Leadership</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  From 2000 onwards it took its maiden flight and started expanding with a good pace. Now hallmark has many formulations exclusively in paediatrics, Gynaeac and GP segments.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-[#00B894]/40 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#EAFBF7] text-[#00B894] flex items-center justify-center mb-6 group-hover:bg-[#00B894] group-hover:text-white transition-all shadow-sm">
              <Dna className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-black text-slate-900 mb-3">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              To discover, manufacture, and distribute zero-defect pharmaceutical formulations that dramatically improve clinical outcomes and extend human longevity across developing and developed nations alike.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-[#00B894]/40 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#EAFBF7] text-[#00B894] flex items-center justify-center mb-6 group-hover:bg-[#00B894] group-hover:text-white transition-all shadow-sm">
              <Globe2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-black text-slate-900 mb-3">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              To be the global benchmark in pharmaceutical innovation, delivering transformative therapies that redefine clinical outcomes and elevate patient care across 85+ international markets.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};




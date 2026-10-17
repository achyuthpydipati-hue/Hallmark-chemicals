import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_STATS } from '../../data/companyData';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#EAFBF7] via-[#F5FAFC] to-white text-slate-800 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {COMPANY_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="space-y-1.5 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#00B894]/40 shadow-sm hover:shadow-md transition-all group"
            >
              <span className="font-display text-3xl sm:text-4xl font-black text-[#012E22] block group-hover:text-[#00B894] transition-colors">
                {stat.value}
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">{stat.label}</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};


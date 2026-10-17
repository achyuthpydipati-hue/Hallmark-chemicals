import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MolecularCanvas } from '../common/MolecularCanvas';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onNavigateSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onNavigateSection
}) => {
  return (
    <section id="home" className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between overflow-hidden pt-28 pb-12">
      {/* Dark left gradient mask to keep left side text area dark & crisp while 3D molecules dance on center-right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent pointer-events-none z-0 w-full sm:w-3/4 lg:w-3/5" />
      
      {/* Subtle Volumetric Cyan & Electric Blue Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[36rem] h-[36rem] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Interactive 3D Molecular Particle Canvas */}
      <MolecularCanvas className="z-0" />

      {/* Main Hero Content - Left Aligned / Crisp Readability */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto w-full">
        <div className="max-w-2xl space-y-8 text-left">
          
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-microgramma">HALLMARK CHEMICALS</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white"
          >
            Innovating For A
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400 mt-2">
              Healthier Tomorrow
            </span>
          </motion.h1>

          {/* Tagline & Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
          >
            Precision-engineered pharmaceuticals designed with uncompromising scientific rigor to elevate global healthcare standards.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary CTA: Explore Products */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreProducts}
              className="group relative overflow-hidden rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 text-sm font-black tracking-wider uppercase shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Secondary CTA: About Us */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateSection('about')}
              className="group relative overflow-hidden rounded-xl px-8 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white text-sm font-bold tracking-wider uppercase hover:border-cyan-400/60 hover:bg-slate-800/90 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <span>ABOUT US</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 transition-all group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 text-center pt-8">
        <button
          onClick={() => onNavigateSection('about')}
          className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors group"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
};

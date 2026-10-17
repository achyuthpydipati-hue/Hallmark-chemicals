import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onNavigateSection?: (id: string) => void;
  onOpenSearch?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#032015]/90 backdrop-blur-md shadow-2xl border-b border-emerald-500/20 py-3 text-emerald-50'
          : 'bg-gradient-to-b from-[#021810]/90 via-[#021810]/40 to-transparent py-5 text-emerald-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group"
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-emerald-500/15 backdrop-blur-md text-emerald-400 border border-emerald-400/30'
              }`}
            >
              <Activity className="w-6 h-6 animate-pulse-subtle" />
            </motion.div>
            <div className="flex items-center">
              <span className="font-microgramma text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white transition-colors whitespace-nowrap">
                Hallmark Chemicals
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

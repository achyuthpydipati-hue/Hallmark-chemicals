import React, { useState } from 'react';
import { Activity, ArrowUp, Mail, Phone, MapPin, ShieldCheck, ExternalLink, Heart, Send } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onSelectCategory?: (category: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectCategory,
  onShowToast
}) => {
  const [emailInput, setEmailInput] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      onShowToast('Invalid Email', 'Please enter a valid business email address.', 'info');
      return;
    }
    onShowToast(
      'Subscribed to Hallmark Chemical Briefs',
      'You will receive monthly formulation updates, chemical pipeline papers, and regulatory notices.',
      'success'
    );
    setEmailInput('');
  };

  return (
    <footer className="bg-[#012E22] text-slate-200 pt-16 pb-12 border-t border-emerald-800/40 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B894]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/40">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#00B894] text-white shadow-lg shadow-[#00B894]/20">
                <Activity className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <span className="font-microgramma text-lg sm:text-xl font-bold text-white whitespace-nowrap">
                  Hallmark Chemicals
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-sm font-normal">
              Hallmark Chemicals is a global chemical and biopharmaceutical leader dedicated to discovering, developing, and delivering zero-defect precision formulations that advance human health across 85+ countries.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-200 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-emerald-950/80 border border-[#00B894]/30 px-3 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B894]" /> US-FDA & EU-GMP Certified
              </span>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-mono">
                Subscribe to Clinical & Regulatory Briefs
              </h4>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your professional email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-700/50 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#00B894] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#00B894] hover:bg-[#00a383] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-md"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3 text-white" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Navigation Jumps */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#00B894] pl-2">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80 font-normal">
              {['Home', 'About Us', 'Products'].map((item) => {
                const idMap: Record<string, string> = {
                  'Home': 'home',
                  'About Us': 'about',
                  'Products': 'products'
                };
                return (
                  <li key={item}>
                    <button
                      onClick={() => onNavigateSection(idMap[item] || 'home')}
                      className="hover:text-[#00B894] transition-colors flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Therapeutic Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#00B894] pl-2">
              Therapeutic Areas
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80 font-normal">
              {['Oncology', 'Cardiology', 'Neurology', 'Respiratory', 'Anti-Infectives', 'Metabolic', 'Immunology'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onNavigateSection('products');
                      if (onSelectCategory) onSelectCategory(cat);
                    }}
                    className="hover:text-[#00B894] transition-colors"
                  >
                    {cat} Formulations
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Headquarters Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#00B894] pl-2">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/80 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B894] shrink-0 mt-0.5" />
                <span>Headquarters</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00B894] shrink-0" />
                <a href="tel:+919966855551" className="hover:text-white transition-colors">
                  +91 9966855551
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B894] shrink-0" />
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hallmarkchemicals@gmail.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  hallmarkchemicals@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70 font-normal">
          <p>© 2026 Hallmark Chemicals Inc. All Rights Reserved. Proprietary cGMP Formulations.</p>
          
          <div className="flex items-center gap-6">
            <button onClick={() => onShowToast('Privacy Policy', 'Hallmark Chemicals adheres to global HIPAA and GDPR data privacy standards.', 'info')} className="hover:text-[#00B894] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onShowToast('Terms of Use', 'All medical information is strictly intended for licensed health professionals.', 'info')} className="hover:text-[#00B894] transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onShowToast('Regulatory Compliance', 'cGMP certified manufacturing by US FDA and EMA.', 'info')} className="hover:text-[#00B894] transition-colors">
              Regulatory Disclosures
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-[#00B894] border border-[#00B894]/30 transition-all flex items-center gap-1 text-xs font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

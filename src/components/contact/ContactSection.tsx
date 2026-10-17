import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check } from 'lucide-react';
import { PharmaProduct } from '../../types/pharma';

interface ContactSectionProps {
  prefilledProduct?: PharmaProduct | null;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onShowToast
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onShowToast(`Copied ${label}`, `${text} copied to clipboard.`, 'info');
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F9FB] text-slate-800 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20 shadow-sm">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Contact Us
          </h2>
        </div>

        {/* Headquarters Contact Card */}
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-xl border border-slate-200/80 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900">Headquarters</h3>
                <p className="text-xs text-slate-500 mt-1">Hallmark Chemicals Direct Contact</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">
                Official Contact
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile Number Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-[#00B894]/40 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAFBF7] text-[#00B894] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Mobile Number</span>
                      <a 
                        href="tel:+919966855551" 
                        className="text-base font-bold text-slate-900 hover:text-[#00B894] transition-colors"
                      >
                        +91 9966855551
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-2">
                  <a
                    href="tel:+919966855551"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#00B894] text-white text-xs font-bold shadow-sm hover:bg-[#00a383] transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                  <button
                    onClick={() => handleCopy('+91 9966855551', 'Mobile Number')}
                    title="Copy phone number"
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                  >
                    {copiedField === 'Mobile Number' ? (
                      <Check className="w-4 h-4 text-[#00B894]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* BD Email Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-[#00B894]/40 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAFBF7] text-[#00B894] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">BD Email</span>
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=hallmarkchemicals@gmail.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-slate-900 hover:text-[#00B894] transition-colors break-all"
                      >
                        hallmarkchemicals@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-2">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hallmarkchemicals@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#00B894] text-white text-xs font-bold shadow-sm hover:bg-[#00a383] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send Email
                  </a>
                  <button
                    onClick={() => handleCopy('hallmarkchemicals@gmail.com', 'BD Email')}
                    title="Copy email address"
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                  >
                    {copiedField === 'BD Email' ? (
                      <Check className="w-4 h-4 text-[#00B894]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Headquarters Location */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAFBF7] text-[#00B894] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Headquarters</span>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Headquarters
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

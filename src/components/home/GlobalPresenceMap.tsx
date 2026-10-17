import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { FACILITY_LOCATIONS } from '../../data/companyData';

export const GlobalPresenceMap: React.FC = () => {
  const [activeLocIndex, setActiveLocIndex] = useState(0);

  const selectedLoc = FACILITY_LOCATIONS[activeLocIndex];

  return (
    <section className="py-24 bg-[#F5FAFC] text-slate-800 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20 shadow-sm">
            Global Footprint
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Strategic Infrastructure Worldwide
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Connecting discovery labs in Boston with cGMP manufacturing in Switzerland and regional distribution hubs in Asia and South America.
          </p>
        </div>

        {/* Location Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Location Buttons Left */}
          <div className="lg:col-span-5 space-y-3">
            {FACILITY_LOCATIONS.map((loc, idx) => {
              const isSelected = activeLocIndex === idx;
              return (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocIndex(idx)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#00B894] text-white border-[#00B894] shadow-lg font-bold scale-[1.01]'
                      : 'bg-white border-slate-200/90 hover:border-[#00B894]/50 text-slate-800 hover:bg-[#EAFBF7]/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#EAFBF7] text-[#00B894]'
                    }`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm truncate">{loc.name}</h4>
                      <p className={`text-xs mt-0.5 truncate font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {loc.city}, {loc.country} • {loc.type}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Selected Location Card Right */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedLoc.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#00B894] uppercase tracking-widest block">
                    {selectedLoc.type}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
                    {selectedLoc.name}
                  </h3>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20 text-xs font-bold font-mono shadow-sm">
                  Active Facility
                </span>
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
                <div className="space-y-3 font-normal">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00B894] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 mb-0.5">Address:</strong>
                      <span>{selectedLoc.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#00B894] shrink-0" />
                    <div>
                      <strong className="text-slate-900 mr-1">Phone:</strong>
                      <span>{selectedLoc.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#00B894] shrink-0" />
                    <div>
                      <strong className="text-slate-900 mr-1">Email:</strong>
                      <span>{selectedLoc.email}</span>
                    </div>
                  </div>
                </div>

                {/* Accreditations */}
                <div className="p-4 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00B894]" />
                    <span>Facility Certifications</span>
                  </h4>
                  <div className="space-y-1.5 pt-1">
                    {selectedLoc.certifications.map(c => (
                      <div key={c} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B894]" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulated Map Visualizer Banner */}
              <div className="p-4 rounded-2xl bg-[#EAFBF7] border border-[#00B894]/20 flex items-center justify-between text-xs text-slate-700 font-mono">
                <span>GPS Coordinates: {selectedLoc.lat.toFixed(4)}° N, {selectedLoc.lng.toFixed(4)}° E</span>
                <span className="text-[#00B894] font-bold">24/7 Telemetry Active</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

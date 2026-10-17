import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pill, ShieldCheck, CheckCircle2, FileText, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { PharmaProduct } from '../../types/pharma';
import { PHARMA_PRODUCTS } from '../../data/productsData';

interface ProductDetailModalProps {
  product: PharmaProduct | null;
  onClose: () => void;
  onViewLeaflet: (product: PharmaProduct) => void;
  onSelectProduct: (product: PharmaProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onViewLeaflet,
  onSelectProduct
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'composition' | 'dosage' | 'packaging'>('overview');

  // Related Products in same category or dosage form
  const relatedProducts = PHARMA_PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.dosageForm === product.dosageForm))
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col text-slate-800"
        >
          {/* Top Bar Header */}
          <div className="p-6 bg-[#F5FAFC] text-slate-900 flex items-center justify-between border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-slate-900">{product.name}</h2>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">
                    {product.category}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#00B894] mt-0.5 font-bold">{product.genericName} • {product.strength}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Tab Navigation */}
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto shrink-0">
            {[
              { id: 'overview', label: 'Overview & Benefits' },
              { id: 'composition', label: 'Composition & Excipients' },
              { id: 'dosage', label: 'Dosage & Administration' },
              { id: 'packaging', label: 'Packaging & Storage' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#00B894] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00B894] mb-2 font-mono">
                    Therapeutic Overview
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-[#F5FAFC] p-4 rounded-2xl border border-slate-200 font-normal">
                    {product.fullOverview}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00B894] mb-3 font-mono">
                    Key Clinical Highlights & Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.keyBenefits.map((b, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/90 flex items-start gap-2.5 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#00B894] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-normal leading-normal">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory seals banner */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00B894] mb-2 font-mono">
                    Regulatory Authorizations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.regulatoryApprovals.map(reg => (
                      <span key={reg} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00B894]" />
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COMPOSITION */}
            {activeTab === 'composition' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-3 font-normal">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Active Pharmaceutical Ingredient (API):</span>
                    <span className="font-bold text-slate-900 text-sm">{product.composition.activeIngredient}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-xs text-slate-500 font-bold block">Declared Potency & Strength:</span>
                    <span className="font-mono font-bold text-[#00B894] text-sm">{product.composition.concentration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00B894] mb-2 font-mono">
                    Pharmacopoeial Excipients Matrix
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.composition.excipients.map((exc, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#F5FAFC] border border-slate-200 text-xs font-normal text-slate-700">
                        • {exc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DOSAGE & ADMIN */}
            {activeTab === 'dosage' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-2">
                  <h4 className="font-bold text-[#00B894] text-sm">Recommended Dosage Instructions</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {product.dosageAndAdministration}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#EAFBF7] border border-[#00B894]/30 text-xs text-slate-800 space-y-1">
                  <strong className="block font-bold text-[#00B894]">Prescriptive Notice (Rx Required):</strong>
                  <p className="font-normal">This formulation is restricted to authorized medical practitioners, clinical trial investigators, and licensed healthcare distributors.</p>
                </div>
              </div>
            )}

            {/* TAB 4: PACKAGING & STORAGE */}
            {activeTab === 'packaging' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">Primary Packaging Type</span>
                    <p className="text-xs font-semibold text-slate-900">{product.packagingInfo}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">Recommended Storage</span>
                    <p className="text-xs font-semibold text-slate-900">{product.storageConditions}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">Shelf Life Stability</span>
                    <p className="text-xs font-semibold text-slate-900">{product.shelfLife}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAFC] border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">Product Information Code</span>
                    <p className="text-xs font-mono font-bold text-[#00B894]">{product.leafletCode}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Products Carousel */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#00B894] mb-3 font-mono">
                  Related Formulations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedProducts.map(rel => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-[#00B894] bg-[#F5FAFC] hover:bg-[#EAFBF7]/50 text-left transition-all group"
                    >
                      <span className="text-[10px] font-bold text-[#00B894] block">{rel.category}</span>
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#00B894] truncate">{rel.name}</h5>
                      <span className="text-[11px] text-slate-500 truncate block mt-0.5">{rel.strength}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-[#F5FAFC] border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => onViewLeaflet(product)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#00B894]" />
              <span>View Product Leaflet (PIL)</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

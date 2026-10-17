import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Pill, ArrowRight, ShieldCheck, Microscope, Building2 } from 'lucide-react';
import { PHARMA_PRODUCTS } from '../../data/productsData';
import { PharmaProduct } from '../../types/pharma';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: PharmaProduct) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? PHARMA_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.genericName.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.indication.toLowerCase().includes(query.toLowerCase())
      )
    : PHARMA_PRODUCTS.slice(0, 5); // Show top 5 when empty

  const quickSections = [
    { id: 'about', label: 'About Us & Leadership', icon: Building2 },
    { id: 'products', label: `Full Product Catalogue (${PHARMA_PRODUCTS.length} Formulations)`, icon: Pill },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
              <Search className="w-5 h-5 text-sky-600 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search products, APIs, therapeutic categories (e.g. Oncology, Ace 1000, Metoprolol)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {/* Quick Navigation Section Shortcuts */}
              {!query && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                    Quick Jumps
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSections.map(sec => {
                      const Icon = sec.icon;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            onNavigateSection(sec.id);
                            onClose();
                          }}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-sky-50 hover:border-sky-200 text-left transition-all group"
                        >
                          <div className="p-1.5 rounded-lg bg-white shadow-xs text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-900">
                            {sec.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Product Results */}
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {query ? `Search Results (${filteredProducts.length})` : 'Popular Therapeutics'}
                  </h4>
                  <span className="text-[11px] text-slate-400">{PHARMA_PRODUCTS.length} Formulations Available</span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 px-4 text-slate-500">
                    <Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-medium">No matching pharmaceutical formulations found.</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching by category like "Cardiology", "Injectable", or generic name.</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 group-hover:text-sky-700 truncate">
                                {product.name}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                                {product.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {product.genericName} • {product.strength}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-slate-400 group-hover:text-sky-600 transition-colors ml-3 shrink-0">
                          <span className="text-xs font-medium mr-1 hidden sm:inline">View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard Footer */}
            <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono">Esc</kbd> to close</span>
              <span>Hallmark Chemicals Formulation Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

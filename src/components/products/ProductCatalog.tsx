import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, X, Pill, RefreshCw, Sparkles } from 'lucide-react';
import { PHARMA_PRODUCTS } from '../../data/productsData';
import { PharmaProduct, CategoryType } from '../../types/pharma';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  onSelectProduct: (product: PharmaProduct) => void;
  onViewLeaflet: (product: PharmaProduct) => void;
  initialCategory?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onViewLeaflet,
  initialCategory = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDosage, setSelectedDosage] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'a-z' | 'z-a' | 'default'>('default');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const categories: CategoryType[] = [
    'All',
    'Oncology',
    'Cardiology',
    'Neurology',
    'Respiratory',
    'Anti-Infectives',
    'Metabolic',
    'Immunology',
    'Gastroenterology'
  ];

  const dosageForms = ['All', 'Tablets', 'Capsules', 'Injectables', 'Inhalers', 'Oral Suspension', 'Topicals'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PHARMA_PRODUCTS];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.indication.toLowerCase().includes(q) ||
        p.strength.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Dosage filter
    if (selectedDosage !== 'All') {
      result = result.filter(p => p.dosageForm === selectedDosage);
    }

    // Sorting
    if (sortOrder === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'z-a') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedDosage, sortOrder]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDosage('All');
    setSortOrder('default');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedDosage !== 'All' || sortOrder !== 'default';

  return (
    <section id="products" className="pt-20 pb-24 bg-white text-slate-800 relative min-h-screen border-b border-slate-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B894] bg-[#EAFBF7] px-4 py-1.5 rounded-full border border-[#00B894]/20 shadow-sm">
            Product Portfolio & Formulations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Explore Our Comprehensive Formulations
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Browse through our portfolio of {PHARMA_PRODUCTS.length}+ formulations across specialized therapeutic categories with real-time search.
          </p>
        </div>

        {/* PROMINENT TOP REAL-TIME SEARCH BAR */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-emerald-600 transition-colors group-focus-within:text-[#00B894]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by brand name (e.g. Ace 1000), generic API, or category..."
              className="w-full pl-12 sm:pl-13 pr-24 py-4 rounded-2xl bg-white border-2 border-slate-200 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00B894] focus:ring-4 focus:ring-[#00B894]/15 transition-all shadow-lg shadow-slate-100"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-500">
                <span>{filteredProducts.length}</span>
                <span>results</span>
              </div>
            )}
          </div>

          {/* Quick Category Chips right under Search Bar for instant filter click */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 font-semibold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#00B894]" /> Quick filter:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#00B894] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F5FAFC] border border-slate-200/80 shadow-sm space-y-4 mb-10">
          
          {/* Controls Row: Dosage Filter + Sorting + Layout Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 w-full sm:w-auto">
              <span>Showing <strong className="text-[#00B894] font-bold">{filteredProducts.length}</strong> of {PHARMA_PRODUCTS.length} products</span>
              {searchQuery && (
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[11px] font-medium">
                  for "{searchQuery}"
                </span>
              )}
            </div>

            {/* Sorting & Layout Toggle */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Dosage Filter Dropdown */}
              <select
                value={selectedDosage}
                onChange={(e) => setSelectedDosage(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] cursor-pointer shadow-sm"
              >
                {dosageForms.map(d => (
                  <option key={d} value={d} className="bg-white text-slate-900">Dosage: {d}</option>
                ))}
              </select>

              {/* Sort dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00B894] cursor-pointer shadow-sm"
              >
                <option value="default" className="bg-white text-slate-900">Sort: Default</option>
                <option value="a-z" className="bg-white text-slate-900">Name (A to Z)</option>
                <option value="z-a" className="bg-white text-slate-900">Name (Z to A)</option>
              </select>

              {/* Layout Mode Toggle */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 shadow-sm">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    layoutMode === 'grid' ? 'bg-[#00B894] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    layoutMode === 'list' ? 'bg-[#00B894] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Active Filter Clear Bar */}
          {hasActiveFilters && (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200/80 font-medium">
              <span>Active filters applied</span>
              <button
                onClick={resetFilters}
                className="text-[#00B894] hover:text-[#008f73] font-bold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Product Cards Listing */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F5FAFC] rounded-3xl border border-slate-200/80 p-8">
            <Pill className="w-12 h-12 text-[#00B894] mx-auto mb-3 animate-bounce" />
            <h3 className="font-bold text-lg text-slate-900">No products match your filter criteria</h3>
            <p className="text-xs text-slate-600 mt-1 mb-4">Try adjusting your search query or category filters.</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#00B894] text-white font-bold text-xs shadow-md hover:bg-[#00a383] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={
              layoutMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-4'
            }
          >
            <AnimatePresence>
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  onViewLeaflet={onViewLeaflet}
                  layoutMode={layoutMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, FileText } from 'lucide-react';
import { PharmaProduct } from '../../types/pharma';

interface ProductCardProps {
  product: PharmaProduct;
  onSelectProduct: (product: PharmaProduct) => void;
  onViewLeaflet: (product: PharmaProduct) => void;
  layoutMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onViewLeaflet,
  layoutMode = 'grid'
}) => {
  if (layoutMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        whileHover={{ x: 4 }}
        className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#00B894]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-[#00B894] transition-colors truncate">
                {product.name}
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00B894] text-white">
                {product.category}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/20">
                {product.dosageForm}
              </span>
            </div>

            <p className="text-xs font-semibold text-emerald-800 truncate">
              {product.genericName} • <strong className="text-[#00B894]">{product.strength}</strong>
            </p>

            <p className="text-xs text-slate-600 line-clamp-1 max-w-xl font-normal">
              {product.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => onViewLeaflet(product)}
            title="View Product Information Leaflet"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors text-xs font-bold flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-[#00B894]" />
            <span className="hidden sm:inline">PIL</span>
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="px-5 py-2.5 rounded-xl bg-[#00B894] hover:bg-[#00a383] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl bg-white border border-slate-200/80 hover:border-[#00B894]/40 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      <div>
        {/* Product Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

          {/* Category & Form Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00B894] text-white shadow-sm">
              {product.category}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#EAFBF7] text-[#00B894] border border-[#00B894]/30 shadow-sm">
              {product.dosageForm}
            </span>
          </div>

          {/* Strength Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="font-mono font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/20 text-emerald-300 backdrop-blur-md shadow-sm">
              {product.strength}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewLeaflet(product);
              }}
              title="View Product Leaflet"
              className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md text-[11px] font-bold flex items-center gap-1 border border-slate-200 shadow-sm transition-colors"
            >
              <FileText className="w-3 h-3 text-[#00B894]" /> Leaflet
            </button>
          </div>
        </div>

        {/* Product Body Text */}
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-[#00B894] transition-colors">
                {product.name}
              </h3>
              <p className="text-xs font-medium text-emerald-800 mt-0.5 line-clamp-1">
                {product.genericName}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Indication pill */}
          <div className="pt-1">
            <span className="text-[11px] font-medium text-slate-700 bg-[#F5FAFC] border border-slate-200 px-2.5 py-1.5 rounded-lg line-clamp-1 block">
              <strong className="text-[#00B894]">Indication:</strong> {product.indication}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#00B894] hover:text-white text-slate-800 border border-slate-200 hover:border-[#00B894] font-bold text-xs transition-all flex items-center justify-center gap-1.5 group/btn"
        >
          <span>View Details & Specifications</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

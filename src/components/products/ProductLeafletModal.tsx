import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { PharmaProduct } from '../../types/pharma';

interface ProductLeafletModalProps {
  product: PharmaProduct | null;
  onClose: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info') => void;
}

export const ProductLeafletModal: React.FC<ProductLeafletModalProps> = ({
  product,
  onClose,
  onShowToast
}) => {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    onShowToast(
      'Leaflet Download Started',
      `Downloading official ${product.leafletCode}.pdf for ${product.name}.`,
      'success'
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#01110b]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl glass-dark-green rounded-2xl shadow-2xl border border-emerald-500/40 overflow-hidden z-10 max-h-[92vh] flex flex-col text-emerald-50"
        >
          {/* Top Bar Action Header */}
          <div className="p-4 bg-[#021810] text-white flex items-center justify-between border-b border-emerald-500/30 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono">
              <FileText className="w-4 h-4 text-lime-300" />
              <span>Official Patient Information Leaflet ({product.leafletCode})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="p-2 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5 text-lime-300" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-lg bg-gradient-to-r from-emerald-400 to-lime-300 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-md"
                title="Print Leaflet"
              >
                <Printer className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors border border-emerald-500/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-xs leading-relaxed font-sans bg-[#021810]/90 text-emerald-100" id="printable-leaflet">
            
            {/* Header Document Seal */}
            <div className="border-b-2 border-emerald-500/40 pb-4 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-lime-300 font-mono">
                  Hallmark Chemicals • Regulatory Dossier
                </span>
                <h1 className="text-2xl font-black text-white mt-0.5">{product.name}</h1>
                <p className="text-xs font-mono text-emerald-300/80">{product.genericName} ({product.strength})</p>
              </div>

              <div className="text-right text-[10px] text-emerald-300/80 font-mono space-y-0.5">
                <div>Document ID: <strong className="text-lime-300">{product.leafletCode}</strong></div>
                <div>Formulation: {product.dosageForm}</div>
                <div>Approval Status: Rx Prescriptive</div>
              </div>
            </div>

            {/* Document Section 1: What is this medicine */}
            <div className="space-y-1.5 font-medium">
              <h2 className="font-bold text-sm text-lime-300 uppercase tracking-wider border-b border-emerald-500/30 pb-1 font-mono">
                1. What {product.name} is and what it is used for
              </h2>
              <p className="text-emerald-100/90">{product.fullOverview}</p>
              <div className="pt-1">
                <strong className="text-white">Approved Indications:</strong> {product.indication}
              </div>
            </div>

            {/* Document Section 2: Composition */}
            <div className="space-y-1.5 font-medium">
              <h2 className="font-bold text-sm text-lime-300 uppercase tracking-wider border-b border-emerald-500/30 pb-1 font-mono">
                2. What you need to know before taking {product.name}
              </h2>
              <p className="text-emerald-100/90">
                Active Ingredient: <strong className="text-white">{product.composition.activeIngredient}</strong> ({product.composition.concentration}).
              </p>
              <p className="text-emerald-300/80">
                Non-active pharmacopoeial excipients: {product.composition.excipients.join(', ')}.
              </p>
            </div>

            {/* Document Section 3: How to take */}
            <div className="space-y-1.5 font-medium">
              <h2 className="font-bold text-sm text-lime-300 uppercase tracking-wider border-b border-emerald-500/30 pb-1 font-mono">
                3. How to take {product.name}
              </h2>
              <p className="text-emerald-100/90">{product.dosageAndAdministration}</p>
              <p className="text-emerald-300/70 italic">Always follow the exact instructions of your prescribing physician or pharmacist.</p>
            </div>

            {/* Document Section 4: Packaging & Storage */}
            <div className="space-y-1.5 font-medium">
              <h2 className="font-bold text-sm text-lime-300 uppercase tracking-wider border-b border-emerald-500/30 pb-1 font-mono">
                4. How to store {product.name}
              </h2>
              <ul className="list-disc list-inside space-y-0.5 text-emerald-100/90">
                <li>{product.storageConditions}</li>
                <li>Packaging Specification: {product.packagingInfo}</li>
                <li>Shelf Life Stability: {product.shelfLife}</li>
                <li>Keep out of reach and sight of children.</li>
              </ul>
            </div>

            {/* Document Footer Verification Stamp */}
            <div className="pt-6 border-t-2 border-emerald-500/40 text-[10px] text-emerald-300/80 flex items-center justify-between font-mono">
              <div>
                <span>Manufacturer: Hallmark Chemicals cGMP Plant, Basel / Boston</span>
                <span className="block">Regulatory Clearances: {product.regulatoryApprovals.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1 text-lime-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-lime-300" />
                <span>Digitally Verified cGMP Dossier</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

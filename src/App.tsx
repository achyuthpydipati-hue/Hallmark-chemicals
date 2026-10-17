/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Toast, ToastMessage } from './components/common/Toast';

import { HeroSection } from './components/home/HeroSection';
import { CompanyOverview } from './components/home/CompanyOverview';

import { ProductCatalog } from './components/products/ProductCatalog';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { ProductLeafletModal } from './components/products/ProductLeafletModal';
import { ContactSection } from './components/contact/ContactSection';

import { PharmaProduct } from './types/pharma';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Modals
  const [selectedProductDetail, setSelectedProductDetail] = useState<PharmaProduct | null>(null);
  const [selectedProductLeaflet, setSelectedProductLeaflet] = useState<PharmaProduct | null>(null);
  const [catalogInitialCategory] = useState<string>('All');

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const productsEl = document.getElementById('products');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPos >= contactEl.offsetTop - 100) {
        setActiveTab('contact');
      } else if (productsEl && scrollPos >= productsEl.offsetTop - 100) {
        setActiveTab('products');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop - 100) {
        setActiveTab('about');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#021810] text-emerald-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Animated Gen Z Ambient Green Blobs in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-float-blob" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-lime-500/15 rounded-full blur-[150px] animate-float-blob-reverse" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-teal-500/20 rounded-full blur-[140px] animate-pulse-glow" />
      </div>

      {/* Sticky Navigation */}
      <div className="relative z-50">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNavigateSection={handleNavigateSection}
        />
      </div>

      {/* Main Page Layout */}
      <main className="flex-1 relative z-10">
        {/* HERO SECTION */}
        <HeroSection
          onExploreProducts={() => handleNavigateSection('products')}
          onNavigateSection={handleNavigateSection}
        />

        {/* COMPANY OVERVIEW */}
        <CompanyOverview onNavigateSection={handleNavigateSection} />

        {/* FULL PRODUCTS CATALOGUE */}
        <ProductCatalog
          onSelectProduct={(p) => setSelectedProductDetail(p)}
          onViewLeaflet={(p) => setSelectedProductLeaflet(p)}
          initialCategory={catalogInitialCategory}
        />

        {/* GLOBAL BUSINESS DEVELOPMENT & CONTACT INQUIRIES */}
        <ContactSection onShowToast={showToast} />
      </main>

      {/* MODALS & OVERLAYS */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onViewLeaflet={(p) => {
          setSelectedProductDetail(null);
          setSelectedProductLeaflet(p);
        }}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      {/* Product Information Leaflet (PIL) Simulator Modal */}
      <ProductLeafletModal
        product={selectedProductLeaflet}
        onClose={() => setSelectedProductLeaflet(null)}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

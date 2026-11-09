import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToSection: (id: string, tab: 'home' | 'standards' | 'portfolio' | 'field-report') => void;
  onOpenConfigurator: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  onScrollToSection,
  onOpenConfigurator,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed top-20 left-0 right-0 z-40 lg:hidden bg-[#FAF8F1] text-tie-ink border-b border-[#E8E4DC] px-6 py-6 space-y-4 shadow-tie-float"
        >
          <div className="space-y-2">
            <button
              onClick={() => onScrollToSection('solutions-section', 'home')}
              className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
            >
              Housing Solutions (8)
            </button>
            <button
              onClick={() => onScrollToSection('standards-section', 'standards')}
              className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
            >
              The Standards (8 Models)
            </button>
            <button
              onClick={() => onScrollToSection('process-section', 'home')}
              className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => onScrollToSection('portfolio-section', 'portfolio')}
              className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
            >
              Portfolio
            </button>
            <button
              onClick={() => onScrollToSection('field-report-section', 'field-report')}
              className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
            >
              Field Report Portal
            </button>
          </div>

          <div className="pt-4 border-t border-tie-border">
            <button
              onClick={() => {
                onClose();
                onOpenConfigurator();
              }}
              className="w-full py-3 rounded-full bg-[#567D42] text-white text-sm font-semibold shadow-sm"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

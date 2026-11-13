import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MenuType,
  STANDARDS_COLUMNS,
  SOLUTIONS_COLUMNS,
  HOW_IT_WORKS_ITEMS,
  RESOURCES_MENU_ITEMS,
} from './navbarData';
import { AVAILABLE_ILLUSTRATIONS } from '../../home/usecase/CharacterIllustrations';

interface MegaMenuPanelsProps {
  activeMenu: MenuType;
  onStandardClick: (slug: string) => void;
  onSolutionSelect: (slug: string) => void;
  onScrollToSection: (id: string, tab: 'home' | 'standards' | 'portfolio' | 'field-report') => void;
  onOpenConfigurator: () => void;
}

export const MegaMenuPanels: React.FC<MegaMenuPanelsProps> = ({
  activeMenu,
  onStandardClick,
  onSolutionSelect,
  onScrollToSection,
  onOpenConfigurator,
}) => {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* 1. HOUSING SOLUTIONS: 3 Columns x 8 Archetypes (Image 8) */}
        {activeMenu === 'solutions' && (
          <motion.div
            key="solutions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6"
          >
            {SOLUTIONS_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-6">
                {col.map((sol) => (
                  <div
                    key={sol.slug}
                    onClick={() => onSolutionSelect(sol.slug)}
                    className="flex items-start space-x-4 p-2.5 rounded-[16px] hover:bg-[#F2EFE4]/50 cursor-pointer transition-colors duration-150 group"
                  >
                    {/* Square thumbnail with rounded-[16px] bg-[#FAF8F1] matching Image 8 */}
                    <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF8F1] shrink-0 flex items-center justify-center p-2.5 overflow-hidden border border-[#E2DDD5]/80 group-hover:border-[#664A42]/30 transition-colors">
                      {AVAILABLE_ILLUSTRATIONS[sol.slug] ? (
                        <img
                          src={AVAILABLE_ILLUSTRATIONS[sol.slug]}
                          alt={sol.title}
                          className="w-full h-full object-contain select-none pointer-events-none group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#CBE282]/40" />
                      )}
                    </div>

                    {/* Right: Title & 2-3 line description */}
                    <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                      <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                        {sol.title}
                      </h4>
                      <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                        {sol.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* 2. STANDARDS: 3x3 Grid in 3 Columns (Image 9) */}
        {activeMenu === 'standards' && (
          <motion.div
            key="standards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6"
          >
            {STANDARDS_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-6">
                {col.map((item) => (
                  <div
                    key={item.slug}
                    onClick={() => onStandardClick(item.slug)}
                    className="flex items-start space-x-4 p-2.5 rounded-[16px] hover:bg-[#F2EFE4]/50 cursor-pointer transition-colors duration-150 group"
                  >
                    {/* Square thumbnail with rounded-[16px] bg-[#FAF8F1] matching Image 9 */}
                    <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF8F1] shrink-0 overflow-hidden border border-[#E2DDD5]/80 group-hover:border-[#664A42]/30 transition-colors">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Right: Title & description */}
                    <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                      <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* 3. HOW IT WORKS: 2 Columns Grid (Image 3) */}
        {activeMenu === 'how-it-works' && (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-2"
          >
            {HOW_IT_WORKS_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => onScrollToSection('process-section', 'home')}
                className="flex items-start space-x-4 p-3 rounded-[16px] hover:bg-[#F2EFE4]/50 cursor-pointer transition-colors duration-150 group"
              >
                <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF8F1] shrink-0 flex items-center justify-center p-2.5 border border-[#E2DDD5]/80 group-hover:border-[#664A42]/30 transition-colors">
                  {item.type === 'approach' ? (
                    <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="16" r="7.5" stroke="#365327" strokeWidth="1.8" />
                      <path d="M15 24h6M16 27h4" stroke="#365327" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M18 5V2M9 8L6 5M27 8l3-3" stroke="#87B04D" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="18" cy="16" r="3" fill="#D2EF72" />
                    </svg>
                  ) : (
                    <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                      <path d="M8 28L28 8" stroke="#365327" strokeWidth="2" strokeLinecap="round" />
                      <path d="M14 6l16 16M6 14l16 16" stroke="#87B04D" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="3" fill="#D2EF72" stroke="#365327" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>

                <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                  <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* 4. RESOURCES: 3 Columns Grid */}
        {activeMenu === 'resources' && (
          <motion.div
            key="resources"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-2"
          >
            {RESOURCES_MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.action === 'calculator') {
                    onOpenConfigurator();
                  } else if (item.targetTab === 'standards') {
                    onScrollToSection('standards-section', 'home');
                  } else {
                    onScrollToSection('field-report-section', 'field-report');
                  }
                }}
                className="p-4 rounded-[14px] bg-[#F2EFE4]/60 hover:bg-[#F2EFE4] border border-[#E2DDD5]/60 hover:border-[#CBE282] transition-all cursor-pointer group"
              >
                <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-1.5">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenuPanels;

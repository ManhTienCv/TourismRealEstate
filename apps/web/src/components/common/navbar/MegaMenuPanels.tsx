import React from 'react';
import { motion } from 'framer-motion';
import { MenuType, STANDARDS_MENU_ITEMS, SOLUTIONS_MENU_ITEMS } from './navbarData';

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
      {/* 1. STANDARDS MEGAMENU: 3x3 Grid */}
      {activeMenu === 'standards' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
        >
          {STANDARDS_MENU_ITEMS.map((item) => (
            <div
              key={item.slug}
              onClick={() => onStandardClick(item.slug)}
              className="flex items-start space-x-4 p-2 rounded-2xl hover:bg-[#F3EFE6] border border-transparent hover:border-[#E8E4DC] cursor-pointer transition-all duration-200 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-[#FAF8F1] border border-[#E8E4DC] shadow-xs">
                {item.isInfo ? (
                  <div className="w-full h-full bg-[#FAF8F1] flex items-center justify-center p-2 text-tie-pine group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-9 h-9 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-serif text-base sm:text-[17px] font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors leading-snug truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-[#666258] font-sans leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* 2. HOW IT WORKS MEGAMENU: 2 Large Cards */}
      {activeMenu === 'how-it-works' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto py-3"
        >
          {/* Card 1: The TIE Approach */}
          <div
            onClick={() => onScrollToSection('process-section', 'home')}
            className="flex items-start space-x-5 p-6 rounded-2xl bg-[#FAF8F1] border border-[#E2DFD3] shadow-sm hover:border-[#567D42]/40 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F4F1EA] group-hover:bg-[#E8F0DC] border border-[#E4DFD5] flex items-center justify-center transition-colors">
              <svg className="w-8 h-8 text-[#567D42] stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2v1" />
                <path d="M12 17a5 5 0 1 0-5-5c0 2 1.5 3 2 4h6c.5-1 2-2 2-4a5 5 0 0 0-5-5" />
                <circle cx="12" cy="11" r="1.5" strokeDasharray="1 1" />
                <path d="M5 5l1.5 1.5M19 5l-1.5 1.5" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
                The TIE Approach
              </h3>
              <p className="text-xs sm:text-sm text-[#666258] font-sans leading-relaxed">
                We combine our experience in architecture, development, and placemaking to make the home design and building process better.
              </p>
            </div>
          </div>

          {/* Card 2: Our Services */}
          <div
            onClick={() => onScrollToSection('process-section', 'home')}
            className="flex items-start space-x-5 p-6 rounded-2xl bg-[#FAF8F1] border border-[#E2DFD3] shadow-sm hover:border-[#567D42]/40 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F4F1EA] group-hover:bg-[#E8F0DC] border border-[#E4DFD5] flex items-center justify-center transition-colors">
              <svg className="w-8 h-8 text-[#567D42] stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                <path d="m3 21 3-3" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
                Our Services
              </h3>
              <p className="text-xs sm:text-sm text-[#666258] font-sans leading-relaxed">
                We simplify and streamline the home design and development process at every step of the way.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. HOUSING SOLUTIONS MEGAMENU: 3 Columns x 8 Archetypes */}
      {activeMenu === 'solutions' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
        >
          {SOLUTIONS_MENU_ITEMS.map((sol) => (
            <div
              key={sol.slug}
              onClick={() => onSolutionSelect(sol.slug)}
              className="flex items-start space-x-4 p-2 rounded-2xl hover:bg-[#F3EFE6] border border-transparent hover:border-[#E8E4DC] cursor-pointer transition-all duration-200 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-[#FAF8F1] group-hover:bg-[#E8F0DC] border border-[#E8E4DC] group-hover:border-[#A8C86D] flex items-center justify-center p-2.5 transition-colors">
                <svg className="w-9 h-9 text-[#567D42] stroke-current fill-none stroke-[1.4]" viewBox="0 0 32 32">
                  <polygon points="6 26, 16 10, 26 26" />
                  <rect x="13" y="19" width="6" height="7" fill="#E8F0DC" />
                  <circle cx="16" cy="8" r="2" fill="#D2E2B0" />
                </svg>
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors leading-snug">
                  {sol.title}
                </h4>
                <p className="text-xs text-[#666258] font-sans leading-relaxed line-clamp-2">
                  {sol.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* 4. RESOURCES MEGAMENU */}
      {activeMenu === 'resources' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-3"
        >
          <div
            onClick={() => onScrollToSection('standards-section', 'home')}
            className="p-5 rounded-2xl bg-[#FAF8F1] border border-[#E2DFD3] hover:border-[#567D42]/40 transition-all cursor-pointer group"
          >
            <h4 className="font-serif text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
              Architectural Standards Guide
            </h4>
            <p className="text-xs text-[#666258] font-sans mt-1.5 leading-relaxed">
              Explore technical specifications, module dimensions, and structural options for all 8 base plans.
            </p>
          </div>

          <div
            onClick={() => onScrollToSection('field-report-section', 'field-report')}
            className="p-5 rounded-2xl bg-[#FAF8F1] border border-[#E2DFD3] hover:border-[#567D42]/40 transition-all cursor-pointer group"
          >
            <h4 className="font-serif text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
              Active Field Reports
            </h4>
            <p className="text-xs text-[#666258] font-sans mt-1.5 leading-relaxed">
              Track live construction stages, foundation pours, and factory delivery logs from real rural build sites.
            </p>
          </div>

          <div
            onClick={() => onOpenConfigurator()}
            className="p-5 rounded-2xl bg-[#FAF8F1] border border-[#E2DFD3] hover:border-[#567D42]/40 transition-all cursor-pointer group"
          >
            <h4 className="font-serif text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
              Interactive Pro-Forma Calculator
            </h4>
            <p className="text-xs text-[#666258] font-sans mt-1.5 leading-relaxed">
              Estimate total turn-key project costs, terrain adjustments, and finish tiers in real-time.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

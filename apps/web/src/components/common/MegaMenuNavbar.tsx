import React, { useState, useRef, useEffect } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuType } from './navbar/navbarData';
import { PlusCrossIcon } from './navbar/PlusCrossIcon';
import { MegaMenuPanels } from './navbar/MegaMenuPanels';
import { MobileMenuDrawer } from './navbar/MobileMenuDrawer';

export const MegaMenuNavbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openConfigurator,
    openPlanDetail,
    openSolutionDetail,
    closeSolutionDetail,
    selectedSolutionSlug,
  } = useConfiguratorStore();

  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener: transparent at very top, solid warm cream (#FAF7ED) when scrolled (Always pinned like HUTS)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderMouseEnter = () => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    setIsHeaderHovered(true);
  };

  const handleHeaderMouseLeave = () => {
    if (menuCloseTimeoutRef.current) clearTimeout(menuCloseTimeoutRef.current);
    menuCloseTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsHeaderHovered(false);
    }, 180);
  };

  const handleItemMouseEnter = (menu: MenuType) => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    setIsHeaderHovered(true);
    setActiveMenu(menu);
  };

  const handleStandardItemClick = (slug: string) => {
    setActiveMenu(null);
    setIsHeaderHovered(false);
    if (slug === 'what-is-a-standard') {
      closeSolutionDetail();
      setActiveTab('standards');
      smoothScrollTo(0, { duration: 0.8 });
      return;
    }

    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    } else {
      closeSolutionDetail();
      setActiveTab('home');
      smoothScrollTo('standards-section', { offset: -24, duration: 1.0 });
    }
  };

  const handleSolutionSelect = (slug: string) => {
    setActiveMenu(null);
    setIsHeaderHovered(false);
    openSolutionDetail(slug);
  };

  const scrollToSection = (id: string, tab: 'home' | 'standards' | 'portfolio' | 'field-report') => {
    closeSolutionDetail();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setIsHeaderHovered(false);
    if (id) {
      smoothScrollTo(id, { offset: -70, duration: 1.0 });
    } else {
      smoothScrollTo(0, { duration: 1.0 });
    }
  };

  const isMenuOpen = activeMenu !== null;
  const isSolid = isScrolled || isHeaderHovered || isMenuOpen || activeTab !== 'home' || selectedSolutionSlug !== null;

  return (
    <>
      <header
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        style={{
          transition:
            'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1), border-radius 0.4s cubic-bezier(0.33, 1, 0.68, 1), background-color 0.2s cubic-bezier(0.33, 1, 0.68, 1), color 0.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 translate-y-0 ${
          isSolid
            ? 'bg-[#FAF7ED] text-[#1E1414]'
            : 'bg-transparent text-[#FAF7ED]'
        } ${isMenuOpen ? 'rounded-b-[24px] shadow-xl' : 'rounded-b-0 shadow-none'}`}
      >
        {/* Top Navbar Row (HUTS height: 86px) */}
        <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 h-[86px] flex items-center justify-between">
          
          {/* Brand Wordmark (Bold HUTS-inspired Sans: "TIE") */}
          <div
            onClick={() => scrollToSection('', 'home')}
            className="cursor-pointer flex items-center space-x-2 group shrink-0"
          >
            <span
              className={`font-sans text-[26px] md:text-[28px] font-black tracking-[-0.03em] leading-none transition-colors duration-200 select-none ${
                isSolid ? 'text-[#1E1414]' : 'text-[#FAF7ED]'
              }`}
            >
              TIE
            </span>
          </div>

          {/* Right Group: Navigation Links & CTA Button gathered together */}
          <div className="flex items-center gap-6 lg:gap-7 ml-auto">

            {/* Desktop Navigation Links (HUTS typography: 14px leading-none font-normal) */}
            <nav className="hidden lg:flex items-center gap-6 lg:gap-7 font-sans text-[14px] leading-none font-normal">
              
              {/* 1. Housing Solutions + */}
              <div
                className="relative"
                onMouseEnter={() => handleItemMouseEnter('solutions')}
              >
                <button
                  onClick={() => scrollToSection('solutions-section', 'home')}
                  className={`py-2 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  }`}
                >
                  <span>Housing Solutions</span>
                  <PlusCrossIcon
                    isOpen={activeMenu === 'solutions'}
                    colorClass={isSolid ? 'text-[#1E1414]' : 'text-[#FAF7ED]'}
                  />
                </button>
              </div>

              {/* 2. Standards + */}
              <div
                className="relative"
                onMouseEnter={() => handleItemMouseEnter('standards')}
              >
                <button
                  onClick={() => scrollToSection('standards-section', 'standards')}
                  className={`py-2 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  }`}
                >
                  <span>Standards</span>
                  <PlusCrossIcon
                    isOpen={activeMenu === 'standards'}
                    colorClass={isSolid ? 'text-[#1E1414]' : 'text-[#FAF7ED]'}
                  />
                </button>
              </div>

              {/* 3. How It Works + */}
              <div
                className="relative"
                onMouseEnter={() => handleItemMouseEnter('how-it-works')}
              >
                <button
                  onClick={() => scrollToSection('process-section', 'home')}
                  className={`py-2 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  }`}
                >
                  <span>How It Works</span>
                  <PlusCrossIcon
                    isOpen={activeMenu === 'how-it-works'}
                    colorClass={isSolid ? 'text-[#1E1414]' : 'text-[#FAF7ED]'}
                  />
                </button>
              </div>

              {/* 4. Portfolio */}
              <button
                onClick={() => scrollToSection('portfolio-section', 'portfolio')}
                className={`py-2 transition-colors duration-200 cursor-pointer ${
                  isSolid
                    ? 'text-[#1E1414] hover:text-[#0C310A]'
                    : 'text-[#FAF7ED] hover:text-white'
                }`}
              >
                <span>Portfolio</span>
              </button>

              {/* 5. Resources + */}
              <div
                className="relative"
                onMouseEnter={() => handleItemMouseEnter('resources')}
              >
                <button
                  onClick={() => scrollToSection('process-section', 'home')}
                  className={`py-2 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  }`}
                >
                  <span>Resources</span>
                  <PlusCrossIcon
                    isOpen={activeMenu === 'resources'}
                    colorClass={isSolid ? 'text-[#1E1414]' : 'text-[#FAF7ED]'}
                  />
                </button>
              </div>

            </nav>

            {/* Right CTA Button: Signature Soft Lime Pill Button (HUTS: #CBE282 / #0C310A / rounded-[104px]) */}
            <button
              onClick={() => openConfigurator()}
              className="px-5 py-2.5 rounded-[104px] bg-[#CBE282] hover:bg-[#b8d867] text-[#0C310A] text-[14px] leading-none font-normal transition-colors active:scale-95 shrink-0 shadow-xs cursor-pointer"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden transition-colors ${
                isSolid
                  ? 'text-[#1E1414] hover:bg-[#F2EFE4]'
                  : 'text-[#FAF7ED] hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Full-width MegaMenu Dropdown Panels (0.4s cubic-bezier(0.33, 1, 0.68, 1)) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-hidden"
            >
              <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 pt-4 pb-10">
                <MegaMenuPanels
                  activeMenu={activeMenu}
                  onStandardClick={handleStandardItemClick}
                  onSolutionSelect={handleSolutionSelect}
                  onScrollToSection={scrollToSection}
                  onOpenConfigurator={openConfigurator}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dimmed backdrop overlay when MegaMenu is active */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
            onClick={() => {
              setActiveMenu(null);
              setIsHeaderHovered(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onScrollToSection={scrollToSection}
        onOpenConfigurator={openConfigurator}
      />
    </>
  );
};

export default MegaMenuNavbar;

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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener: transparent/solid background + smart auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 40);

          if (activeMenu !== null || mobileMenuOpen) {
            setIsVisible(true);
          } else if (currentScrollY <= 60) {
            setIsVisible(true);
          } else {
            const diff = currentScrollY - lastScrollYRef.current;
            if (diff > 6) {
              setIsVisible(false);
            } else if (diff < -6) {
              setIsVisible(true);
            }
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu, mobileMenuOpen]);

  const handleMouseEnter = (menu: MenuType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const handleStandardItemClick = (slug: string) => {
    setActiveMenu(null);
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
    openSolutionDetail(slug);
  };

  const scrollToSection = (id: string, tab: 'home' | 'standards' | 'portfolio' | 'field-report') => {
    closeSolutionDetail();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setActiveMenu(null);
    if (id) {
      smoothScrollTo(id, { offset: -70, duration: 1.2 });
    } else {
      smoothScrollTo(0, { duration: 1.2 });
    }
  };

  const isMenuOpen = activeMenu !== null;
  const isSolid = isScrolled || activeTab !== 'home' || isMenuOpen || selectedSolutionSlug !== null;
  const isTransparent = !isSolid;

  return (
    <>
      <header
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none shadow-none'
        } ${
          isSolid
            ? 'bg-[#FAF8F1] text-[#182215] shadow-none border-none'
            : 'bg-transparent text-white'
        } ${isMenuOpen ? 'rounded-b-[36px] sm:rounded-b-[44px]' : ''}`}
      >
        {/* Top Navbar Row */}
        <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark (Clean HUTS-inspired Sans: "TIE") */}
          <div
            onClick={() => scrollToSection('', 'home')}
            className="cursor-pointer flex items-center space-x-2 group shrink-0"
          >
            <span
              className={`font-sans text-3xl md:text-[34px] font-black tracking-tight leading-none transition-colors ${
                isTransparent ? 'text-white' : 'text-tie-ink'
              }`}
            >
              TIE
            </span>
          </div>

          {/* Right Group: Navigation Links & CTA Button gathered together */}
          <div className="flex items-center gap-6 lg:gap-7 ml-auto">

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 lg:gap-7 font-sans text-[14px] md:text-[15px] font-medium tracking-tight">
              
              {/* 1. Housing Solutions */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
              >
                <button
                  onClick={() => scrollToSection('solutions-section', 'home')}
                  className={`py-2 transition-colors flex items-center gap-1.5 ${
                    activeMenu === 'solutions'
                      ? isTransparent ? 'text-white font-semibold' : 'text-tie-ink font-semibold'
                      : isTransparent
                      ? 'text-white hover:text-white/80'
                      : 'text-tie-ink hover:text-[#567D42]'
                  }`}
                >
                  <span>Housing Solutions</span>
                  <PlusCrossIcon isOpen={activeMenu === 'solutions'} isTransparent={isTransparent} />
                </button>
              </div>

              {/* 2. Standards */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('standards')}
              >
                <button
                  onClick={() => scrollToSection('standards-section', 'standards')}
                  className={`py-2 transition-colors flex items-center gap-1.5 ${
                    activeMenu === 'standards'
                      ? isTransparent ? 'text-white font-semibold' : 'text-tie-ink font-semibold'
                      : isTransparent
                      ? 'text-white hover:text-white/80'
                      : 'text-tie-ink hover:text-[#567D42]'
                  }`}
                >
                  <span>Standards</span>
                  <PlusCrossIcon isOpen={activeMenu === 'standards'} isTransparent={isTransparent} />
                </button>
              </div>

              {/* 3. How It Works */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('how-it-works')}
              >
                <button
                  onClick={() => scrollToSection('process-section', 'home')}
                  className={`py-2 transition-colors flex items-center gap-1.5 ${
                    activeMenu === 'how-it-works'
                      ? isTransparent ? 'text-white font-semibold' : 'text-tie-ink font-semibold'
                      : isTransparent
                      ? 'text-white hover:text-white/80'
                      : 'text-tie-ink hover:text-[#567D42]'
                  }`}
                >
                  <span>How It Works</span>
                  <PlusCrossIcon isOpen={activeMenu === 'how-it-works'} isTransparent={isTransparent} />
                </button>
              </div>

              {/* 4. Portfolio / Realized Projects */}
              <button
                onClick={() => scrollToSection('portfolio-section', 'portfolio')}
                className={`py-2 transition-colors ${
                  isTransparent
                    ? 'text-white hover:text-white/80'
                    : 'text-tie-ink hover:text-[#567D42]'
                }`}
              >
                <span>Portfolio</span>
              </button>

              {/* 5. Resources */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
              >
                <button
                  onClick={() => scrollToSection('process-section', 'home')}
                  className={`py-2 transition-colors flex items-center gap-1.5 ${
                    activeMenu === 'resources'
                      ? isTransparent ? 'text-white font-semibold' : 'text-tie-ink font-semibold'
                      : isTransparent
                      ? 'text-white hover:text-white/80'
                      : 'text-tie-ink hover:text-[#567D42]'
                  }`}
                >
                  <span>Resources</span>
                  <PlusCrossIcon isOpen={activeMenu === 'resources'} isTransparent={isTransparent} />
                </button>
              </div>

            </nav>

            {/* Right CTA Button: Signature Vibrant Lime Pill Button */}
            <button
              onClick={() => openConfigurator()}
              className="px-6 py-2.5 md:py-3 rounded-full bg-[#d2ef72] hover:bg-[#c5e859] text-[#182215] text-[14px] md:text-[15px] font-medium transition-colors active:scale-95 shadow-xs shrink-0"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden transition-colors ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-tie-ink hover:bg-tie-surface'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Full-width MegaMenu Dropdown Panels */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-[#E8E4DC]/60"
            >
              <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 pb-12">
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
            className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-40"
            onClick={() => setActiveMenu(null)}
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

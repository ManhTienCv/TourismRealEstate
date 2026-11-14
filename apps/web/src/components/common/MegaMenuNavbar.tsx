import React, { useState, useRef, useEffect } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { Menu, X } from 'lucide-react';
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
  const lastActiveMenuRef = useRef<MenuType>('solutions');
  if (activeMenu !== null) {
    lastActiveMenuRef.current = activeMenu;
  }
  const currentMenu = activeMenu || lastActiveMenuRef.current;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);

  // Scroll listener: Tự động ẩn navbar khi lướt xuống, hiện lại khi cuộn ngược lên hoặc ở đầu trang
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const prevScrollY = lastScrollYRef.current;
          const diff = currentScrollY - prevScrollY;

          setIsScrolled(currentScrollY > 40);

          // Chỉ ẩn navbar khi cuộn xuống quá 80px, cuộn ngược lên (-5px) hoặc ở đầu trang thì hiện lại
          if (currentScrollY > 80 && diff > 5) {
            setIsScrollingDown(true);
          } else if (diff < -5 || currentScrollY <= 80) {
            setIsScrollingDown(false);
          }

          lastScrollYRef.current = currentScrollY;
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
    // Short 100ms debounce (80-120ms) to close cleanly without hanging for 2-3s
    menuCloseTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsHeaderHovered(false);
    }, 100);
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

  // Navbar chỉ ẩn khi đang lướt xuống VÀ người dùng KHÔNG rê chuột lên navbar / KHÔNG mở menu
  const shouldHideNavbar = isScrollingDown && !isHeaderHovered && !isMenuOpen && !mobileMenuOpen;

  // Sibling dimming helper: dim other nav items to 50% opacity when a menu is open
  const getItemOpacityClass = (itemKey: MenuType | 'portfolio') => {
    if (!isMenuOpen) return 'opacity-100 transition-opacity duration-150';
    return activeMenu === itemKey
      ? 'opacity-100 transition-opacity duration-150'
      : 'opacity-50 hover:opacity-100 transition-opacity duration-150';
  };

  return (
    <>
      <header
        id="header"
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        style={{
          transition:
            'transform 0.45s cubic-bezier(0.33, 1, 0.68, 1), border-radius 0.3s cubic-bezier(0.33, 1, 0.68, 1), background-color 0.2s cubic-bezier(0.33, 1, 0.68, 1), color 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform ${
          shouldHideNavbar ? '-translate-y-full pointer-events-none' : 'translate-y-0 pointer-events-auto'
        } ${
          isSolid
            ? 'bg-[#FAF7ED] text-[#1E1414]'
            : 'bg-transparent text-[#FAF7ED]'
        } ${isMenuOpen ? 'rounded-b-[24px] border-b border-[#E2DDD5]/70' : 'rounded-b-0 border-b-transparent'}`}
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
                  className={`py-2 flex items-center gap-1 cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  } ${getItemOpacityClass('solutions')}`}
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
                  className={`py-2 flex items-center gap-1 cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  } ${getItemOpacityClass('standards')}`}
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
                  className={`py-2 flex items-center gap-1 cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  } ${getItemOpacityClass('how-it-works')}`}
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
                className={`py-2 cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                  isSolid
                    ? 'text-[#1E1414] hover:text-[#0C310A]'
                    : 'text-[#FAF7ED] hover:text-white'
                } ${getItemOpacityClass('portfolio')}`}
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
                  className={`py-2 flex items-center gap-1 cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isSolid
                      ? 'text-[#1E1414] hover:text-[#0C310A]'
                      : 'text-[#FAF7ED] hover:text-white'
                  } ${getItemOpacityClass('resources')}`}
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

        {/* Full-width MegaMenu Dropdown Panels with GPU-friendly CSS Grid 0fr -> 1fr transition */}
        <div
          className="dropdown-menu grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[grid-template-rows,opacity]"
          style={{
            gridTemplateRows: isMenuOpen ? '1fr' : '0fr',
            opacity: isMenuOpen ? 1 : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 pt-4 pb-10">
              <MegaMenuPanels
                activeMenu={currentMenu}
                onStandardClick={handleStandardItemClick}
                onSolutionSelect={handleSolutionSelect}
                onScrollToSection={scrollToSection}
                onOpenConfigurator={openConfigurator}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dimmed backdrop overlay when MegaMenu is active */}
      <div
        className={`fixed inset-0 bg-[#1E1414]/50 z-40 transition-opacity duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-opacity ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setActiveMenu(null);
          setIsHeaderHovered(false);
        }}
      />

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

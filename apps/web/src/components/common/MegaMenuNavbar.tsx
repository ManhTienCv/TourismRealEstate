import React, { useState, useRef, useEffect } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import {
  Menu,
  X,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MenuType = 'solutions' | 'standards' | 'how-it-works' | 'resources' | null;

// Standards 3x3 items matching exact frame_11.0s.jpg from Banghi.mp4
const STANDARDS_MENU_ITEMS = [
  {
    slug: 'what-is-a-standard',
    title: 'What is a Standard?',
    description: 'HUTS base plans that can be modified for your home site and unique lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    isInfo: true,
  },
  {
    slug: 'adu',
    title: 'ADU',
    description: 'Small-scale structures designed for extra space, homesteading your lot, or generating revenue.',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'small-l',
    title: 'Small L',
    description: 'An elegant assembly of two gable-roofed forms that combines function with grandeur.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'small-bar',
    title: 'Small Bar',
    description: 'The swiss-army knife of our Standards collection. All the essentials in a beautiful, affordable package.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'medium-bar',
    title: 'Medium Bar',
    description: 'An efficient 2.5 bedroom home that packs big functionality into a small footprint.',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'big-l',
    title: 'Big L',
    description: 'The largest Standard plan that combines the efficiency of the Small L with a grand primary suite.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'dogtrot',
    title: 'Dogtrot',
    description: "2 bedroom design that's marked by a clean separation of public and private functions.",
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'village',
    title: 'Village',
    description: "A 3-bedroom village scheme designed for sites where there's more than just one view or home experience.",
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'big-bar',
    title: 'Big Bar',
    description: 'Organized in wings with bedrooms on either side of the public spaces with a single, long roof line.',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80',
  },
];

// Housing Solutions items matching exact frame_24s.jpg
const SOLUTIONS_MENU_ITEMS = [
  {
    slug: 'starter-home',
    title: 'Starter Home',
    description: 'An affordable, thoughtfully designed home that gets you out of your rental and into an asset',
    iconType: 'plant',
  },
  {
    slug: 'forever-home',
    title: 'Forever Home',
    description: 'A deeply personal, multi-functional home built to last—and to host every future holiday photo',
    iconType: 'family',
  },
  {
    slug: 'second-home',
    title: 'Second Home',
    description: "A retreat that recharges you, earns for you, and grows with you—whether it's just for you or part of a rental strategy",
    iconType: 'relax',
  },
  {
    slug: 'hybrid-home',
    title: 'Hybrid Home',
    description: "A flexible home you can enjoy personally and rent when you're not there—built to fit your lifestyle",
    iconType: 'hybrid',
  },
  {
    slug: 'adu',
    title: 'ADU',
    description: 'A versatile addition to your property that works as a rental, guest suite, or workspace—and makes your land work harder for you',
    iconType: 'cabin',
  },
  {
    slug: 'investment-property',
    title: 'Investment Property',
    description: 'A purpose-built property designed to deliver long-term returns through smart design, sharp budgeting, and strategic development',
    iconType: 'chart',
  },
  {
    slug: 'micro-hospitality',
    title: 'Micro-Hospitality',
    description: 'A high-design, low-footprint destination where great land meets unforgettable stays—built with both guests and ROI in mind',
    iconType: 'nature',
  },
  {
    slug: 'multi-generation-compound',
    title: 'Multi-Generation Compound',
    description: "This isn't about one house. It's about designing land, relationships, and legacy.",
    iconType: 'compound',
  },
];

// Dynamic Plus to Cross icon morphing on hover
const PlusCrossIcon: React.FC<{ isOpen: boolean; isTransparent: boolean }> = ({ isOpen, isTransparent }) => (
  <span className="inline-flex items-center justify-center w-3 h-3 transition-transform duration-200">
    <Plus
      className={`w-3 h-3 transition-transform duration-200 ease-in-out ${
        isOpen ? 'rotate-45' : 'rotate-0'
      } ${isOpen ? 'text-tie-ink' : isTransparent ? 'text-white/80' : 'text-tie-ink/70'}`}
    />
  </span>
);

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll listener: transparent/solid background + smart auto-hide on scroll down, reveal on scroll up (Matching Banghi1.mp4 30s-45s)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 40);

          // If a dropdown or mobile menu is active, keep navbar visible
          if (activeMenu !== null || mobileMenuOpen) {
            setIsVisible(true);
          } else if (currentScrollY <= 60) {
            // Near the top of the page: always visible
            setIsVisible(true);
          } else {
            const diff = currentScrollY - lastScrollYRef.current;
            // 6px threshold to avoid micro-scroll jitter
            if (diff > 6) {
              // Scrolling down (reading content) -> slide navbar UP out of view
              setIsVisible(false);
            } else if (diff < -6) {
              // Scrolling up (returning to top) -> slide navbar DOWN into view
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
      setActiveTab('home');
      const el = document.getElementById('standards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    } else {
      setActiveTab('home');
      const el = document.getElementById('standards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Header background is solid cream when scrolled, on non-home tabs, when in solution detail view, or whenever a MegaMenu is active
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
            ? 'bg-[#FAF8F5] text-tie-ink shadow-2xl border-b border-[#E8E4DC]'
            : 'bg-transparent text-white'
        } ${isMenuOpen ? 'rounded-b-[36px] sm:rounded-b-[44px]' : ''}`}
      >
        {/* Top Navbar Row */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark (Exact Huts Bold Typography: Clean "TIE") */}
          <div
            onClick={() => scrollToSection('', 'home')}
            className="cursor-pointer flex items-center space-x-2 group"
          >
            <span
              className={`font-serif text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
                isTransparent ? 'text-white' : 'text-tie-ink'
              }`}
            >
              TIE
            </span>
          </div>

          {/* Desktop Navigation Links with dynamic "+" to "×" transition (Matching Banghi.mp4) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans text-sm font-medium">
            
            {/* 1. Housing Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
            >
              <button
                onClick={() => scrollToSection('solutions-section', 'home')}
                className={`py-2 transition-colors flex items-center space-x-1.5 ${
                  activeMenu === 'solutions'
                    ? 'text-tie-ink font-semibold'
                    : isTransparent
                    ? 'text-white hover:text-[#D2E2B0]'
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
                className={`py-2 transition-colors flex items-center space-x-1.5 ${
                  activeMenu === 'standards'
                    ? 'text-tie-ink font-semibold'
                    : isTransparent
                    ? 'text-white hover:text-[#D2E2B0]'
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
                className={`py-2 transition-colors flex items-center space-x-1.5 ${
                  activeMenu === 'how-it-works'
                    ? 'text-tie-ink font-semibold'
                    : isTransparent
                    ? 'text-white hover:text-[#D2E2B0]'
                    : 'text-tie-ink hover:text-[#567D42]'
                }`}
              >
                <span>How it Works</span>
                <PlusCrossIcon isOpen={activeMenu === 'how-it-works'} isTransparent={isTransparent} />
              </button>
            </div>

            {/* 4. Portfolio / Realized Projects */}
            <button
              onClick={() => scrollToSection('portfolio-section', 'portfolio')}
              className={`py-2 transition-colors ${
                isTransparent
                  ? 'text-white hover:text-[#D2E2B0]'
                  : 'text-tie-ink hover:text-[#567D42]'
              }`}
            >
              <span>Portfolio</span>
            </button>

            {/* 5. Field Report Client Portal */}
            <button
              onClick={() => scrollToSection('field-report-section', 'field-report')}
              className={`py-2 transition-colors flex items-center space-x-1.5 ${
                isTransparent
                  ? 'text-white hover:text-[#D2E2B0]'
                  : 'text-tie-ink hover:text-[#567D42]'
              }`}
            >
              <span>Field Report</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8C86D] animate-pulse" />
            </button>

            {/* 6. Resources */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
            >
              <button
                onClick={() => scrollToSection('process-section', 'home')}
                className={`py-2 transition-colors flex items-center space-x-1.5 ${
                  activeMenu === 'resources'
                    ? 'text-tie-ink font-semibold'
                    : isTransparent
                    ? 'text-white hover:text-[#D2E2B0]'
                    : 'text-tie-ink hover:text-[#567D42]'
                }`}
              >
                <span>Resources</span>
                <PlusCrossIcon isOpen={activeMenu === 'resources'} isTransparent={isTransparent} />
              </button>
            </div>
          </nav>

          {/* Right CTA Button: Signature Huts Light Pistachio / Lime Pill Button (Matching Banghi.mp4) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openConfigurator()}
              className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#1C1B18] bg-[#D2E2B0] hover:bg-[#C4D9A0] shadow-sm transition-all duration-200 active:scale-95"
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

        {/* FULL-WIDTH MEGAMENU EXPANSION PANELS (Matching Banghi.mp4 00:10 - 00:28) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-[#E8E4DC]/60"
            >
              <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 pb-12">
                
                {/* 1. STANDARDS MEGAMENU: 3x3 Grid with Thumbnails (Banghi.mp4 frame_11.0s) */}
                {activeMenu === 'standards' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7"
                  >
                    {STANDARDS_MENU_ITEMS.map((item) => (
                      <div
                        key={item.slug}
                        onClick={() => handleStandardItemClick(item.slug)}
                        className="flex items-start space-x-4 p-2 rounded-2xl hover:bg-white/90 border border-transparent hover:border-[#E8E4DC] cursor-pointer transition-all duration-200 group"
                      >
                        {/* Rounded-xl/2xl Thumbnail matching video */}
                        <div className="w-[84px] h-[64px] sm:w-[96px] sm:h-[72px] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#E8E4DC] shadow-xs">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Title and Description */}
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

                {/* 2. HOW IT WORKS MEGAMENU: 2 Large Cards (Banghi.mp4 frame_16s) */}
                {activeMenu === 'how-it-works' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto py-3"
                  >
                    {/* Card 1: The TIE Approach */}
                    <div
                      onClick={() => scrollToSection('process-section', 'home')}
                      className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#E8E4DC] shadow-sm hover:border-[#567D42]/40 hover:shadow-md transition-all cursor-pointer group"
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
                      onClick={() => scrollToSection('process-section', 'home')}
                      className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#E8E4DC] shadow-sm hover:border-[#567D42]/40 hover:shadow-md transition-all cursor-pointer group"
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

                {/* 3. HOUSING SOLUTIONS MEGAMENU: 3 Columns x 8 Archetypes (Banghi.mp4 frame_24s) */}
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
                        onClick={() => handleSolutionSelect(sol.slug)}
                        className="flex items-start space-x-4 p-2 rounded-2xl hover:bg-white/90 border border-transparent hover:border-[#E8E4DC] cursor-pointer transition-all duration-200 group"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-white group-hover:bg-[#E8F0DC] border border-[#E8E4DC] group-hover:border-[#A8C86D] flex items-center justify-center p-2.5 transition-colors">
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

                {/* 4. RESOURCES MEGAMENU: Informational Guides (Safe In-Page anchors) */}
                {activeMenu === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-3"
                  >
                    <div
                      onClick={() => scrollToSection('standards-section', 'home')}
                      className="p-5 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#567D42]/40 transition-all cursor-pointer group"
                    >
                      <h4 className="font-serif text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
                        Architectural Standards Guide
                      </h4>
                      <p className="text-xs text-[#666258] font-sans mt-1.5 leading-relaxed">
                        Explore technical specifications, module dimensions, and structural options for all 8 base plans.
                      </p>
                    </div>

                    <div
                      onClick={() => scrollToSection('field-report-section', 'field-report')}
                      className="p-5 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#567D42]/40 transition-all cursor-pointer group"
                    >
                      <h4 className="font-serif text-lg font-bold text-[#1C1B18] group-hover:text-[#567D42] transition-colors">
                        Active Field Reports
                      </h4>
                      <p className="text-xs text-[#666258] font-sans mt-1.5 leading-relaxed">
                        Track live construction stages, foundation pours, and factory delivery logs from real rural build sites.
                      </p>
                    </div>

                    <div
                      onClick={() => openConfigurator()}
                      className="p-5 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#567D42]/40 transition-all cursor-pointer group"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden bg-[#FAF8F5] text-tie-ink border-b border-[#E8E4DC] px-6 py-6 space-y-4 shadow-tie-float"
          >
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('solutions-section', 'home')}
                className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
              >
                Housing Solutions (8)
              </button>
              <button
                onClick={() => scrollToSection('standards-section', 'standards')}
                className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
              >
                The Standards (8 Models)
              </button>
              <button
                onClick={() => scrollToSection('process-section', 'home')}
                className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('portfolio-section', 'portfolio')}
                className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('field-report-section', 'field-report')}
                className="w-full text-left py-2 text-tie-ink font-serif font-bold text-lg"
              >
                Field Report Portal
              </button>
            </div>

            <div className="pt-4 border-t border-tie-border">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConfigurator();
                }}
                className="w-full py-3 rounded-full bg-[#567D42] text-white text-sm font-semibold shadow-sm"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

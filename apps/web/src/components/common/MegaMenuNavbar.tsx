import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { Menu, X } from 'lucide-react';
import { MenuType } from './navbar/navbarData';
import { PlusCrossIcon } from './navbar/PlusCrossIcon';
import { MobileMenuDrawer } from './navbar/MobileMenuDrawer';
import { HutsButton } from './HutsButton';

interface MegaMenuItem {
  slug: string;
  title: string;
  byline: string;
  image: string;
  isCover?: boolean;
}

const HOUSING_SOLUTIONS_ITEMS: MegaMenuItem[] = [
  {
    slug: 'starter-home',
    title: 'Starter Home',
    byline: 'An affordable, thoughtfully designed home that gets you out of your rental and into an asset',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a0ccbe6d79faab2281bc8839f92faf3f7869f9f7-120x120.svg',
  },
  {
    slug: 'forever-home',
    title: 'Forever Home',
    byline: 'A deeply personal, multi-functional home built to last—and to host every future holiday photo',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/04f505d271689be3485b9196d07c3778cf6ae6cc-120x120.svg',
  },
  {
    slug: 'second-home',
    title: 'Second Home',
    byline: 'A retreat that recharges you, earns for you, and grows with you—whether it’s just for you or part of a rental strategy',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/562af5c7e19af3961fa43255da57792b646c0cf6-120x120.svg',
  },
  {
    slug: 'hybrid-home',
    title: 'Hybrid Home',
    byline: "A flexible home you can enjoy personally and rent when you're not there—built to fit your lifestyle",
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/507ae04cddbe0d5d50216593dd85be21ffe4135e-120x120.svg',
  },
  {
    slug: 'adu',
    title: 'ADU',
    byline: 'A versatile addition to your property that works as a rental, guest suite, or workspace—and makes your land work harder for you',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/42dcdb8469fa2e33e6a0b614be753dde8269d807-120x120.svg',
  },
  {
    slug: 'investment-property',
    title: 'Investment Property',
    byline: 'A purpose-built property designed to deliver long-term returns through smart design, sharp budgeting, and strategic development',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ac483de1edc2945823170002b1c30ed9583e8d82-120x120.svg',
  },
  {
    slug: 'micro-hospitality',
    title: 'Micro-Hospitality',
    byline: 'A high-design, low-footprint destination where great land meets unforgettable stays—built with both guests and ROI in mind',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c5340ae58c788a53a90232eb55d0b241fdd93478-120x120.svg',
  },
  {
    slug: 'multi-gen-compound',
    title: 'Multi-Generation Compound',
    byline: 'This isn’t about one house. It’s about designing land, relationships, and legacy.',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/510deebfe5ef8b59dc3bc901a75d659acd21f929-120x120.svg',
  },
];

const STANDARDS_ITEMS: MegaMenuItem[] = [
  {
    slug: 'what-is-a-standard',
    title: 'What is a Standard?',
    byline: 'TIE base plans that can be modified for your home site and unique lifestyle',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/34fd9ee2836af6151ba6c0b074af234f8866d5dc-1330x1330.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'adu',
    title: 'ADU',
    byline: 'Small-scale structures designed for extra space, homesteading your lot, or generating revenue',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/12b724bfd8e075d0f39a1351f31264a32328f433-1467x1410.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'small-l',
    title: 'Small L',
    byline: 'An elegant assembly of two gable-roofed forms that combines function with grandeur',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a7b6ffca0d4814f1354cd42e4563a1f43d03e4fd-2061x1932.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'small-bar',
    title: 'Small Bar',
    byline: 'The swiss-army knife of our Standards collection. All the essentials in a beautiful, affordable package',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/49b12a1c850a40727ce6b5d105d21a8459c35389-858x858.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'medium-bar',
    title: 'Medium Bar',
    byline: 'An efficient 2.5 bedroom home that packs big functionality into a small footprint',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3efc198a66bf6be8c3878cb1e9169689e8f974e9-564x383.png?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'big-l',
    title: 'Big L',
    byline: 'The largest Standard plan that combines the efficiency of the Small L with a grand primary suite',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/94475e5020164a6f8ab9320e043f250b2000eb0d-772x703.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'dogtrot',
    title: 'Dogtrot',
    byline: '2 bedroom design that’s marked by a clean separation of public and private functions',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/df0586016b50f5b5e25d3ac82486c15d3c68c501-1733x1733.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'village',
    title: 'Village',
    byline: 'A 3-bedroom village scheme designed for sites where there’s more than just one view or home experience',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/9ee66c5354de48ceb7b2c5e456303301ef947fbe-2367x2160.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
  {
    slug: 'big-bar',
    title: 'Big Bar',
    byline: 'Organized in wings with bedrooms on either side of the public spaces with a single, long roof line',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7d481791d6139e5f98a1455da75f6e3d63abf1d9-2233x2105.jpg?w=320&q=80&auto=format',
    isCover: true,
  },
];

const HOW_IT_WORKS_ITEMS: MegaMenuItem[] = [
  {
    slug: 'the-tie-approach',
    title: 'The TIE Approach',
    byline: 'We combine our experience in architecture, development, and placemaking to make the home design and building process better',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1ebb28dcfaa394e36f73bf58f618a500ce9e3471-73x73.svg',
  },
  {
    slug: 'our-services',
    title: 'Our Services',
    byline: 'We simplify and streamline the home design and development process at every step of the way',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1e6bf92926a1af6998e6faf13da24cb52902a262-73x73.svg',
  },
];

const RESOURCES_ITEMS: MegaMenuItem[] = [
  {
    slug: 'the-field-report',
    title: 'The Field Report',
    byline: 'Our living report on the status of all TIE design and development projects.',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4a83dfcf853f60f5f49439bf329d873f3e1a9fc5-111x106.svg',
  },
  {
    slug: 'the-land-report',
    title: 'The Land Report',
    byline: 'Curated listings, insights, and ideas on developable land delivered to you each week',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b282609b7a1e2b383887fdd80ccc790f30e3fd2b-117x106.svg',
  },
  {
    slug: 'tie-guides',
    title: 'TIE Guides',
    byline: 'Learn about all things home development from land, and construction to design and financing.',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/51c01aa58e8bf9861b5afc4958530278b7302324-103x106.svg',
  },
  {
    slug: 'development-opportunities',
    title: 'Development Opportunities',
    byline: 'Step-by-step breakdowns on bringing a property to life.',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/997745ca8c10354d1cb553c5b8c2d1b5892e0b7a-103x106.svg',
  },
  {
    slug: 'tools',
    title: 'Tools',
    byline: 'The tools behind every TIE project.',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e7de0f76d667f37d82a0e3656302cdd18cbfce82-340x340.svg',
  },
  {
    slug: 'space-planner',
    title: 'Space Planner',
    byline: "Start from a proven layout, then tell us what you'd change.",
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/fcd324e9a54a7e8a1beed53e685a65c69c8dcea2-340x340.png?w=320&q=80&auto=format',
    isCover: true,
  },
];

export const MegaMenuNavbar: React.FC = () => {
  // Dùng selector cụ thể để tránh re-render toàn bộ Navbar khi store thay đổi
  const activeTab = useConfiguratorStore((s) => s.activeTab);
  const setActiveTab = useConfiguratorStore((s) => s.setActiveTab);
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);
  const openPlanDetail = useConfiguratorStore((s) => s.openPlanDetail);
  const openSolutionDetail = useConfiguratorStore((s) => s.openSolutionDetail);
  const closeSolutionDetail = useConfiguratorStore((s) => s.closeSolutionDetail);
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);
  const closeStandardDetail = useConfiguratorStore((s) => s.closeStandardDetail);
  const openWhatIsAStandard = useConfiguratorStore((s) => s.openWhatIsAStandard);
  const closeWhatIsAStandard = useConfiguratorStore((s) => s.closeWhatIsAStandard);
  const selectedSolutionSlug = useConfiguratorStore((s) => s.selectedSolutionSlug);

  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const lastActiveMenuRef = useRef<MenuType>('solutions');
  if (activeMenu !== null) {
    lastActiveMenuRef.current = activeMenu;
  }
  const currentMenu = activeMenu || lastActiveMenuRef.current;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener theo cơ chế tích lũy ngưỡng (KHÔNG reset lastAnchorY khi chưa vượt ngưỡng)
  useEffect(() => {
    let lastAnchorY = window.scrollY || document.documentElement.scrollTop || 0;

    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      const diff = currentY - lastAnchorY;

      setIsScrolled(currentY > 40);

      // Luôn hiện khi ở sát đỉnh trang hoặc đang mở Mega Menu
      if (currentY <= 80 || activeMenu !== null) {
        setIsHidden(false);
        lastAnchorY = currentY;
        return;
      }

      // Chỉ đổi trạng thái và cập nhật mốc khi đã cuộn tích lũy đủ >= 12px
      if (diff >= 12 && !isHeaderHovered) {
        setIsHidden(true);
        lastAnchorY = currentY;
      } else if (diff <= -12) {
        setIsHidden(false);
        lastAnchorY = currentY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu, isHeaderHovered]);

  const handleHeaderMouseEnter = () => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    setIsHeaderHovered(true);
    setIsHidden(false);
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
    setIsHidden(false);
    setActiveMenu(menu);
  };

  const handleStandardItemClick = useCallback(
    (slug: string) => {
      setActiveMenu(null);
      setIsHeaderHovered(false);
      if (slug === 'what-is-a-standard') {
        openWhatIsAStandard();
        return;
      }

      const targetSlug = slug === 'adu' ? 'adus' : slug;
      openStandardDetail(targetSlug);
    },
    [openStandardDetail, openWhatIsAStandard]
  );

  const handleSolutionSelect = useCallback(
    (slug: string) => {
      setActiveMenu(null);
      setIsHeaderHovered(false);
      openSolutionDetail(slug);
    },
    [openSolutionDetail]
  );

  const scrollToSection = useCallback(
    (id: string, tab: 'home' | 'standards' | 'portfolio' | 'field-report') => {
      closeSolutionDetail();
      closeStandardDetail();
      closeWhatIsAStandard();
      setActiveTab(tab);
      setMobileMenuOpen(false);
      setActiveMenu(null);
      setIsHeaderHovered(false);
      if (id) {
        smoothScrollTo(id, { offset: -70, duration: 1.0 });
      } else {
        smoothScrollTo(0, { duration: 1.0 });
      }
    },
    [closeSolutionDetail, setActiveTab]
  );

  const isMenuOpen = activeMenu !== null;
  const isSolid = isScrolled || isHeaderHovered || isMenuOpen || activeTab !== 'home' || selectedSolutionSlug !== null;

  // Navbar chỉ ẩn khi isHidden === true VÀ người dùng KHÔNG mở menu / KHÔNG hover trên navbar / KHÔNG mở mobile drawer
  const shouldHideNavbar = isHidden && !isMenuOpen && !isHeaderHovered && !mobileMenuOpen;

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
        data-lenis-prevent
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        style={{
          transitionProperty: 'transform, border-radius, background-color',
          transitionDuration: '550ms, 250ms, 200ms',
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-transform duration-[550ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
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
                onMouseEnter={() => handleItemMouseEnter(null)}
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

            {/* Right CTA Button: Signature Soft Lime Pill Button with Scribble Fill Hover */}
            <HutsButton
              variant="nav"
              withArrow={false}
              onMouseEnter={() => handleItemMouseEnter(null)}
              onClick={() => openConfigurator()}
              className="shrink-0"
            >
              Get Started
            </HutsButton>

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

        {/* Full-width MegaMenu Dropdown Panels: 100% GPU Opacity & Transform transition */}
        <div
          data-lenis-prevent
          className={`dropdown-menu grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
            isMenuOpen
              ? 'grid-rows-[1fr] opacity-100 pointer-events-auto visible'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none invisible'
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-12 pt-2 pb-6 sm:pb-7">
              <div className="relative w-full">
                {/* 1. HOUSING SOLUTIONS: 3 Columns x 8 Archetypes */}
                <div
                  className={
                    currentMenu === 'solutions'
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                      : 'opacity-0 pointer-events-none absolute inset-0 invisible z-0 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                    {HOUSING_SOLUTIONS_ITEMS.map((item) => (
                      <a
                        key={item.slug}
                        href={`/housing-solutions/${item.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSolutionSelect(item.slug);
                        }}
                        className="flex items-start space-x-4 p-2.5 rounded-[16px] hover:bg-[#F2EFE4]/60 cursor-pointer transition-colors duration-100 group"
                      >
                        <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF7ED] shrink-0 flex items-center justify-center p-2.5 overflow-hidden border border-[#E2DDD5]/80 [contain:strict] [transform:translateZ(0)]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain select-none pointer-events-none [transform:translateZ(0)]"
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                          <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                            {item.byline}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 2. STANDARDS: 3x3 Grid in 3 Columns */}
                <div
                  className={
                    currentMenu === 'standards'
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                      : 'opacity-0 pointer-events-none absolute inset-0 invisible z-0 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                    {STANDARDS_ITEMS.map((item) => {
                      const itemHref =
                        item.slug === 'what-is-a-standard'
                          ? '/what-is-a-standard'
                          : `/standards/${item.slug === 'adu' ? 'adus' : item.slug}`;
                      return (
                        <a
                          key={item.slug}
                          href={itemHref}
                          onClick={(e) => {
                            e.preventDefault();
                            handleStandardItemClick(item.slug);
                          }}
                          className="flex items-start space-x-4 p-2.5 rounded-[16px] hover:bg-[#F2EFE4]/60 cursor-pointer transition-colors duration-100 group"
                        >
                          <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF7ED] shrink-0 overflow-hidden border border-[#E2DDD5]/80 [contain:strict] [transform:translateZ(0)]">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover select-none pointer-events-none [transform:translateZ(0)]"
                              loading="eager"
                              decoding="async"
                            />
                          </div>
                          <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                            <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                              {item.byline}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* 3. HOW IT WORKS: 2 Columns Grid */}
                <div
                  className={
                    currentMenu === 'how-it-works'
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                      : 'opacity-0 pointer-events-none absolute inset-0 invisible z-0 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-2">
                    {HOW_IT_WORKS_ITEMS.map((item) => (
                      <div
                        key={item.slug}
                        onClick={() => {
                          const targetPath =
                            item.slug === 'our-services' ? '/our-services' : '/the-tie-approach';
                          setActiveMenu(null);
                          setIsHeaderHovered(false);
                          setMobileMenuOpen(false);
                          if (typeof window !== 'undefined') {
                            window.history.pushState({}, '', targetPath);
                            window.dispatchEvent(new PopStateEvent('popstate'));
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                          }
                        }}
                        className="flex items-start space-x-4 p-3 rounded-[16px] hover:bg-[#F2EFE4]/60 cursor-pointer transition-colors duration-100 group"
                      >
                        <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF7ED] shrink-0 flex items-center justify-center p-2.5 overflow-hidden border border-[#E2DDD5]/80 [contain:strict] [transform:translateZ(0)]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain select-none pointer-events-none [transform:translateZ(0)]"
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                          <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                            {item.byline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. RESOURCES: 3 Columns Grid (6 items) */}
                <div
                  className={
                    currentMenu === 'resources'
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                      : 'opacity-0 pointer-events-none absolute inset-0 invisible z-0 transition-opacity duration-150 ease-[cubic-bezier(0.33,1,0.68,1)]'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                    {RESOURCES_ITEMS.map((item) => (
                      <div
                        key={item.slug}
                        onClick={() => {
                          if (item.slug === 'the-field-report') {
                            scrollToSection('field-report-section', 'field-report');
                          } else if (item.slug === 'tools' || item.slug === 'space-planner') {
                            setActiveMenu(null);
                            setIsHeaderHovered(false);
                            openConfigurator();
                          } else {
                            scrollToSection('standards-section', 'home');
                          }
                        }}
                        className="flex items-start space-x-4 p-2.5 rounded-[16px] hover:bg-[#F2EFE4]/60 cursor-pointer transition-colors duration-100 group"
                      >
                        <div className="w-[70px] h-[70px] rounded-[16px] bg-[#FAF7ED] shrink-0 flex items-center justify-center p-2.5 overflow-hidden border border-[#E2DDD5]/80 [contain:strict] [transform:translateZ(0)]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full ${
                              item.isCover ? 'object-cover' : 'object-contain'
                            } select-none pointer-events-none [transform:translateZ(0)]`}
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="space-y-0.5 min-w-0 flex-1 pt-0.5">
                          <h4 className="font-serif text-[18px] text-[#0C310A] group-hover:text-[#2D4C23] leading-snug transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[13.5px] leading-[1.4] text-[#664A42] font-sans mt-0.5">
                            {item.byline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dimmed backdrop overlay when MegaMenu is active */}
      <div
        className={`fixed inset-0 bg-[#1E1414]/55 z-40 transition-opacity duration-[350ms] ease-[cubic-bezier(0.33,1,0.68,1)] [transform:translateZ(0)] ${
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

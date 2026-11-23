import React, { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from './utils/smoothScroll';
import { useConfiguratorStore } from './store/useConfiguratorStore';
import { MegaMenuNavbar } from './components/common/MegaMenuNavbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { UseCaseSelector } from './components/home/UseCaseSelector';
import { NarrativeJourneySection } from './components/home/NarrativeJourneySection';
import { StandardsCatalogGrid } from './components/home/StandardsCatalogGrid';
import { RealizedPortfolioSection } from './components/home/RealizedPortfolioSection';
import { TrustMetricsSection } from './components/home/TrustMetricsSection';
import { PreFooterBanner } from './components/home/PreFooterBanner';

// Lazy-loaded sub-pages & interactive modals for optimal initial Home bundle
const PlanDetailModal = lazy(() =>
  import('./components/standards/PlanDetailModal').then((m) => ({ default: m.PlanDetailModal }))
);
const GetStartedWizard = lazy(() =>
  import('./components/configurator/GetStartedWizard').then((m) => ({ default: m.GetStartedWizard }))
);
const FieldReportPortal = lazy(() =>
  import('./components/field-report/FieldReportPortal').then((m) => ({ default: m.FieldReportPortal }))
);
const PortfolioGalleryModal = lazy(() =>
  import('./components/portfolio/PortfolioGalleryModal').then((m) => ({ default: m.PortfolioGalleryModal }))
);
const HousingSolutionPage = lazy(() =>
  import('./components/solutions/HousingSolutionPage').then((m) => ({ default: m.HousingSolutionPage }))
);
const StandardDetailPage = lazy(() =>
  import('./components/standards/StandardDetailPage').then((m) => ({ default: m.StandardDetailPage }))
);
const WhatIsAStandardPage = lazy(() =>
  import('./components/standards/WhatIsAStandardPage').then((m) => ({ default: m.WhatIsAStandardPage }))
);

export const App: React.FC = () => {
  const activeTab = useConfiguratorStore((s) => s.activeTab);
  const selectedSolutionSlug = useConfiguratorStore((s) => s.selectedSolutionSlug);
  const selectedStandardSlug = useConfiguratorStore((s) => s.selectedStandardSlug);
  const isWhatIsAStandard = useConfiguratorStore((s) => s.isWhatIsAStandard);
  const isConfiguratorOpen = useConfiguratorStore((s) => s.isConfiguratorOpen);
  const selectedPlanForDetail = useConfiguratorStore((s) => s.selectedPlanForDetail);
  const selectedProjectSlug = useConfiguratorStore((s) => s.selectedProjectSlug);
  const setActiveTab = useConfiguratorStore((s) => s.setActiveTab);
  const openSolutionDetail = useConfiguratorStore((s) => s.openSolutionDetail);
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);
  const openWhatIsAStandard = useConfiguratorStore((s) => s.openWhatIsAStandard);
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);

  const [pathname, setPathname] = React.useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const isGetStarted = pathname.startsWith('/get-started');

  // Sync route /housing-solutions/:slug, /standards/:slug, /what-is-a-standard, /field-report, and /get-started with browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setPathname(path);
      if (path.startsWith('/housing-solutions/')) {
        const slug = path.replace('/housing-solutions/', '').replace(/\/$/, '');
        if (slug) {
          openSolutionDetail(slug);
        }
      } else if (path === '/what-is-a-standard' || path === '/what-is-a-standard/') {
        openWhatIsAStandard();
      } else if (path.startsWith('/standards/')) {
        let slug = path.replace('/standards/', '').replace(/\/$/, '');
        if (slug === 'adu') slug = 'adus';
        if (slug) {
          openStandardDetail(slug);
        }
      } else if (path === '/field-report' || path === '/field-report/') {
        setActiveTab('field-report');
      } else if (path.startsWith('/get-started')) {
        openConfigurator();
      } else if (path === '/' || path === '') {
        setActiveTab('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    setActiveTab,
    openSolutionDetail,
    openStandardDetail,
    openWhatIsAStandard,
    openConfigurator,
  ]);

  // Keep pathname updated with internal store changes
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [activeTab, selectedSolutionSlug, selectedStandardSlug, isWhatIsAStandard]);

  // Initialize Lenis Momentum / Inertia Scrolling (Matches Huts.com smooth luxury scroll physics)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Anti-jitter: Add .lenis-scrolling to <html> while scrolling to disable card 3D hover-flip
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      document.documentElement.classList.add('lenis-scrolling');
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('lenis-scrolling');
      }, 150);
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      document.documentElement.classList.remove('lenis-scrolling');
    };
  }, []);

  return (
    <div className="min-h-screen bg-tie-bg text-tie-ink flex flex-col font-sans selection:bg-tie-pine selection:text-tie-bg">
      {/* 1. Global MegaMenu Sticky Navigation Bar */}
      <MegaMenuNavbar />

      {/* 2. Main Page Content (Matching exact Huts.com narrative flow) */}
      <main className="flex-1">
        {activeTab === 'field-report' ? (
          <Suspense fallback={<div className="min-h-screen bg-[#FAF7ED]" />}>
            <FieldReportPortal />
          </Suspense>
        ) : isWhatIsAStandard || activeTab === 'standards' ? (
          <Suspense fallback={<div className="min-h-screen bg-[#FAF7ED]" />}>
            <WhatIsAStandardPage />
          </Suspense>
        ) : selectedStandardSlug ? (
          <Suspense fallback={<div className="min-h-screen bg-[#FAF7ED]" />}>
            <StandardDetailPage slug={selectedStandardSlug} />
          </Suspense>
        ) : selectedSolutionSlug ? (
          <Suspense fallback={<div className="min-h-screen bg-[#FAF7ED]" />}>
            <HousingSolutionPage slug={selectedSolutionSlug} />
          </Suspense>
        ) : (
          <>
            {/* 01. Hero with wide cinematic photography, headline & pro-forma teaser */}
            <HeroSection />

            {/* 02. "Whatever type of place you have in mind" (8 Botanical white cards) */}
            <UseCaseSelector />

            {/* 03. "We do it across the country" & "Using a process built around you" (Exact Match to User Image 1) */}
            <NarrativeJourneySection />

            {/* 04. "It all starts with our Standards" (Modular 3D Axonometric cards) */}
            <StandardsCatalogGrid />

            {/* 06. "And we can build it for you on your land" (Realized Projects Photography stack) */}
            <RealizedPortfolioSection />

            {/* 07. Client Testimonial & 4 Massive Stat Counters (200K+, 18, ±5.0%, 5,000+) */}
            <TrustMetricsSection />
          </>
        )}
      </main>

      {/* Interactive Drawers & Modals (Mounted & chunk-loaded only when opened) */}
      <Suspense fallback={null}>
        {selectedPlanForDetail && <PlanDetailModal />}
        {isConfiguratorOpen && <GetStartedWizard />}
        {selectedProjectSlug && <PortfolioGalleryModal />}
      </Suspense>

      {/* PreFooterBanner & Footer Group (Always stacked above sticky sections with z-20) */}
      <div className="relative z-20">
        {!isGetStarted && <PreFooterBanner />}
        <Footer hasPreFooter={!isGetStarted} />
      </div>
    </div>
  );
};

export default App;

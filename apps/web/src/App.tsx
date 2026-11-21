import React, { useEffect } from 'react';
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
import { PlanDetailModal } from './components/standards/PlanDetailModal';
import { GetStartedWizard } from './components/configurator/GetStartedWizard';
import { FieldReportPortal } from './components/field-report/FieldReportPortal';
import { PortfolioGalleryModal } from './components/portfolio/PortfolioGalleryModal';
import { HousingSolutionPage } from './components/solutions/HousingSolutionPage';
import { StandardDetailPage } from './components/standards/StandardDetailPage';
import { WhatIsAStandardPage } from './components/standards/WhatIsAStandardPage';

export const App: React.FC = () => {
  const activeTab = useConfiguratorStore((s) => s.activeTab);
  const selectedSolutionSlug = useConfiguratorStore((s) => s.selectedSolutionSlug);
  const selectedStandardSlug = useConfiguratorStore((s) => s.selectedStandardSlug);
  const isWhatIsAStandard = useConfiguratorStore((s) => s.isWhatIsAStandard);
  const openSolutionDetail = useConfiguratorStore((s) => s.openSolutionDetail);
  const closeSolutionDetail = useConfiguratorStore((s) => s.closeSolutionDetail);
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);
  const closeStandardDetail = useConfiguratorStore((s) => s.closeStandardDetail);
  const openWhatIsAStandard = useConfiguratorStore((s) => s.openWhatIsAStandard);
  const closeWhatIsAStandard = useConfiguratorStore((s) => s.closeWhatIsAStandard);

  // Sync route /housing-solutions/:slug, /standards/:slug, and /what-is-a-standard with browser address bar and history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
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
      } else if (path === '/' || path === '') {
        closeSolutionDetail();
        closeStandardDetail();
        closeWhatIsAStandard();
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    openSolutionDetail,
    closeSolutionDetail,
    openStandardDetail,
    closeStandardDetail,
    openWhatIsAStandard,
    closeWhatIsAStandard,
  ]);

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
          <FieldReportPortal />
        ) : isWhatIsAStandard || activeTab === 'standards' ? (
          <WhatIsAStandardPage />
        ) : selectedStandardSlug ? (
          <StandardDetailPage slug={selectedStandardSlug} />
        ) : selectedSolutionSlug ? (
          <HousingSolutionPage slug={selectedSolutionSlug} />
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

            {/* 08. Pistachio Pre-Footer Banner ("Let’s find that place you’ve been dreaming about") */}
            <PreFooterBanner />
          </>
        )}
      </main>

      {/* Interactive Drawers & Modals */}
      <PlanDetailModal />
      <GetStartedWizard />
      <PortfolioGalleryModal />

      {/* Deep Forest Pine Footer */}
      <Footer />
    </div>
  );
};

export default App;

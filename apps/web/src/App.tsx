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
import { SolutionDetailView } from './components/solutions/SolutionDetailView';

export const App: React.FC = () => {
  const { activeTab, selectedSolutionSlug } = useConfiguratorStore();

  // Initialize Lenis Momentum / Inertia Scrolling (Matches Huts.com smooth luxury scroll physics)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // 0.08 = Silky smooth luxury momentum scroll
      wheelMultiplier: 1.0,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
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
        ) : selectedSolutionSlug ? (
          <SolutionDetailView />
        ) : (
          <>
            {/* 01. Hero with wide cinematic photography, headline & pro-forma teaser */}
            <HeroSection />

            {/* 02. "Whatever type of place you have in mind" (8 Botanical white cards) */}
            <UseCaseSelector />

            {/* 03. The signature Green Wavy Line Journey ("Start with what you know" & "Turnkey process") */}
            <NarrativeJourneySection />

            {/* 04. "It all starts with our Standards" (Modular 3D Axonometric cards) */}
            <StandardsCatalogGrid />

            {/* 05. "And we can build it for you on your land" (Realized Projects Photography stack) */}
            <RealizedPortfolioSection />

            {/* 06. Client Testimonial & 4 Massive Stat Counters (200K+, 18, ±5.0%, 5,000+) */}
            <TrustMetricsSection />

            {/* 07. Pistachio Pre-Footer Banner ("Let’s find that place you’ve been dreaming about") */}
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

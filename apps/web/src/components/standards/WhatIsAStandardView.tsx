import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { WhatIsAStandardSection } from './WhatIsAStandardSection';
import { StepByStepProcessSection } from './StepByStepProcessSection';
import { StandardsCatalogGrid } from '../home/StandardsCatalogGrid';
import { PreFooterBanner } from '../home/PreFooterBanner';
import { smoothScrollTo } from '../../utils/smoothScroll';

export const WhatIsAStandardView: React.FC = () => {
  const { setActiveTab } = useConfiguratorStore();

  useEffect(() => {
    smoothScrollTo(0, { duration: 0.8 });
  }, []);

  return (
    <div className="w-full bg-[#FAF8F5] text-tie-ink">
      {/* Top Breadcrumb & Return to Home */}
      <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-14 pt-28 pb-4">
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            smoothScrollTo(0, { duration: 0.8 });
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-tie-muted hover:text-tie-pine transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* 1. What is a Standard? (Header, Scribble Underline, Overview, Phased Construction, Existing Standards) */}
      <WhatIsAStandardSection />

      {/* 2. The Step-by-Step (Satellite Parcel Map with pulsing Survey Hotspots + 5-Stage Accordion) */}
      <StepByStepProcessSection />

      {/* 3. Our Standards Catalog (8 Architectural Models with Horizontal Scroll) */}
      <StandardsCatalogGrid />

      {/* 4. PreFooter Pistachio Call-to-Action */}
      <PreFooterBanner />
    </div>
  );
};

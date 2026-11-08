import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PillArrowButton } from '../common/PillArrowButton';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';

export const WhatIsAStandardSection: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  const handleFindHomeClick = () => {
    // Try to scroll to standards catalog if present on page, else open configurator
    const el = document.getElementById('standards-section');
    if (el) {
      smoothScrollTo('standards-section', { offset: -60, duration: 1.0 });
    } else {
      openConfigurator();
    }
  };

  return (
    <section id="what-is-a-standard" className="w-full bg-[#FAF8F1] text-tie-ink pt-20 sm:pt-28 pb-16 sm:pb-24 border-b border-[#E2DDD5]/70">
      <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* ========================================================= */}
        {/* 1. HERO HEADER: "What is a Standard?" + Scribble Underline */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8 mb-20 sm:mb-28">
          
          {/* Small Top Badge (Matching Frame 460s) */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-sans font-medium text-[#4B6B38] tracking-wider uppercase">
              What is a Standard?
            </span>
          </div>

          {/* Large Serif Headline with Lime-Green Hand-Drawn Scribble Underline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.12] tracking-tight text-[#1C1B18]">
            Designed to{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">balance high design</span>
              {/* Hand-Drawn Lime-Green Highlighter Scribble SVG (Exact Match to Frame 460s) */}
              <svg
                className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-5 text-[#B2D679] -z-0 overflow-visible select-none pointer-events-none"
                viewBox="0 0 380 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* 1st Stroke: broad foundation sweep */}
                <path
                  d="M 4 10 C 65 6, 175 14, 376 9"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeOpacity="0.45"
                />
                {/* 2nd Stroke: loose back-and-forth highlighter accent */}
                <path
                  d="M 12 12 C 90 7, 240 13, 368 11 C 330 14, 210 15, 60 14"
                  stroke="#A5C869"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                />
              </svg>
            </span>
            <br />
            with ease of construction
          </h1>

          {/* Reusable Unified Pill Arrow Button */}
          <div className="pt-2 flex justify-center">
            <PillArrowButton
              label="Find Your Home"
              onClick={handleFindHomeClick}
              variant="dark"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. OVERVIEW BLOCK: 16' Modular Grid Philosophy            */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto mb-24 sm:mb-32">
          <div className="border-t border-[#E2DDD5] pt-10 sm:pt-14 space-y-5">
            <p className="text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-[#4B6B38]">
              Overview
            </p>
            <p className="font-serif text-2xl sm:text-3xl md:text-[34px] leading-[1.32] text-[#1C1B18] tracking-tight font-normal">
              Standards are a collection of plans that put you in the editor's seat. Based on a 16’ grid, they work with much of the existing standardization of the American construction trade — minimizing waste and utilizing details that most any contractor could successfully execute.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. PHASED CONSTRUCTION: Left Photo, Right Text (Frame 465s) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 sm:mb-36">
          
          {/* Left Column: Wood Framing Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm border border-[#E2DDD5]/80 bg-[#EFECE6] aspect-[4/3] sm:aspect-[1.15/1]">
              <img
                src="/standards/phased_construction_framing.jpg"
                alt="Exposed 16-inch on center wood stud framing under construction"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-white/90 border border-white/20">
                16" O.C. Framing • Modular Structural Bays
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Phasing Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] leading-tight text-[#1C3B24]">
              Phased Construction
            </h2>
            
            <p className="font-sans text-base sm:text-lg text-tie-muted leading-relaxed">
              Many of our clients have big ambitions, but smaller budgets. Our system was created with growth in mind. Tack on a bedroom add-on when you're ready. Plug in a guest cottage when the time is right. We can plan for a decade down the line and deliver for tomorrow's build.
            </p>

            {/* Checklist / Key Architectural Guarantees */}
            <div className="pt-2 space-y-3 font-sans text-sm sm:text-base text-[#2C2A26]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#567D42] shrink-0 mt-0.5" />
                <span><strong>Pre-engineered Add-ons:</strong> Add future sleeping wings or studios with zero structural rework.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#567D42] shrink-0 mt-0.5" />
                <span><strong>Utility Rough-ins:</strong> Electric, septic, and domestic water pre-stubbed for seamless phase 2 tie-in.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#567D42] shrink-0 mt-0.5" />
                <span><strong>Lower Initial CapEx:</strong> Build what fits your budget today without sacrificing your long-term vision.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. EXISTING STANDARDS: Left Text, Right Drone Photo (Frame 508s) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Constructability Principles */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] leading-tight text-[#1C3B24]">
              Existing Standards
            </h2>
            
            <p className="font-sans text-base sm:text-lg text-tie-muted leading-relaxed">
              Our standards are designed with constructability in mind. The American construction trade has some existing patterns in place - 16" on center framing, 4'x8' sheets of plywood and drywall, regular 2' material increments. We don't work against those measurements, but instead work with them to minimize waste and increase the number of builders who can successfully deliver on HUTS projects, anywhere in the country.
            </p>

            {/* 4 Spec Pills in Warm Paper */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#2C2A26]">
              <div className="p-3.5 rounded-xl bg-[#EFECE6]/80 border border-[#E2DDD5] space-y-1">
                <div className="font-bold text-[#1C1B18] text-sm">16" O.C. Studs</div>
                <div className="text-tie-muted font-sans text-xs">Zero custom rip cuts on wall studs</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EFECE6]/80 border border-[#E2DDD5] space-y-1">
                <div className="font-bold text-[#1C1B18] text-sm">4' × 8' Modular Sheathing</div>
                <div className="text-tie-muted font-sans text-xs">Engineered to standard plywood sheets</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EFECE6]/80 border border-[#E2DDD5] space-y-1">
                <div className="font-bold text-[#1C1B18] text-sm">Zero Waste Increments</div>
                <div className="text-tie-muted font-sans text-xs">Dimensional 2-foot dimensional spans</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EFECE6]/80 border border-[#E2DDD5] space-y-1">
                <div className="font-bold text-[#1C1B18] text-sm">Nationwide Labor</div>
                <div className="text-tie-muted font-sans text-xs">Standard trades execute without specialized training</div>
              </div>
            </div>
          </div>

          {/* Right Column: Drone Photo of Black Gabled Home with Pond */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm border border-[#E2DDD5]/80 bg-[#EFECE6] aspect-[4/3] sm:aspect-[1.15/1]">
              <img
                src="/standards/existing_standards_drone.jpg"
                alt="Black gabled modular house delivered in rural acreage by a natural pond"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-white/90 border border-white/20">
                Delivered in Catskills, NY • 1,450 Sqft
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

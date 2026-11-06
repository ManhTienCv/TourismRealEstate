import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustMetricsSection: React.FC = () => {
  const { openProjectDetail } = useConfiguratorStore();

  return (
    <section className="py-20 sm:py-28 bg-tie-bg border-b border-tie-border/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-24">
        
        {/* 1. CLIENT TESTIMONIAL BLOCK (Banghi.mp4 p6_63s) */}
        <div className="space-y-10">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#1A2E20] leading-tight">
            But, don’t take it from us...
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E4DC] shadow-sm">
            {/* Left: Giant Olive Green Quotation & Review */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-serif text-7xl sm:text-8xl text-[#567D42] leading-none block -mb-6 select-none font-bold">
                “
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-tie-ink italic leading-relaxed font-normal">
                As a couple with no experience in this field or idea on where to begin, TIE made something like building a home feel possible, organized, and deeply intentional.
              </p>
              <div className="pt-4 border-t border-[#E8E4DC]">
                <div className="font-sans font-bold text-base text-[#1C1B18]">
                  Marcus &amp; Elena Vance
                </div>
                <div className="text-xs font-mono text-[#6E695F] mt-0.5">
                  Creative Directors &bull; The Overlook Dogtrot, Woodstock, NY
                </div>
              </div>
            </div>

            {/* Right: Actual Photo of Completed Build with Category Badge */}
            <div className="lg:col-span-5">
              <div
                onClick={() => openProjectDetail('catskills-dogtrot-retreat')}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-md cursor-pointer group select-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                  alt="Completed Overlook Dogtrot with outdoor patio"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Second Home Category Badge (Top Right as in p6_63s) */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-full border border-white/20">
                  Second Home
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span>DOGTROT 1850</span>
                  <span className="text-[#D2E2B0] font-semibold flex items-center space-x-1 group-hover:underline">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 4 MASSIVE STAT COUNTERS WITH HAIRLINE DIVIDERS (Banghi.mp4 p6_640ms & p6_655ms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6">
          
          {/* LEFT COLUMN: Stat 1 (Top) & Stat 3 (Bottom) */}
          <div className="md:pr-12 lg:pr-16 md:border-r border-[#E2DDD5] space-y-12 sm:space-y-16">
            
            {/* CELL 1: 200K+ */}
            <div className="border-b border-[#E2DDD5] pb-12 sm:pb-16 space-y-6">
              <span className="text-sm font-sans font-medium text-[#567D42] block">
                Still don't believe it?
              </span>

              <div className="font-serif text-7xl sm:text-8xl lg:text-[110px] font-normal tracking-tight text-[#1A2E20] leading-none select-none">
                200K+
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#6E695F] leading-relaxed">
                square feet currently under construction
              </p>
            </div>

            {/* CELL 3: 5.0% */}
            <div className="space-y-6 pb-6 md:pb-0">
              <div className="font-serif text-7xl sm:text-8xl lg:text-[110px] font-normal tracking-tight text-[#1A2E20] leading-none select-none">
                5.0%
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#6E695F] leading-relaxed">
                Average build costs are within 5% of our pre-design estimates
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Stat 2 (Top) & Stat 4 (Bottom) */}
          <div className="md:pl-12 lg:pl-16 space-y-12 sm:space-y-16 pt-12 md:pt-0">
            
            {/* CELL 2: 18 with Two Hand-drawn Sparkle Stars ✨ */}
            <div className="border-b border-[#E2DDD5] pb-12 sm:pb-16 space-y-6">
              {/* Spacer matching "Still don't believe it?" height */}
              <div className="h-5 hidden md:block" />

              <div className="relative inline-flex items-baseline">
                <span className="font-serif text-7xl sm:text-8xl lg:text-[110px] font-normal tracking-tight text-[#1A2E20] leading-none select-none">
                  18
                </span>

                {/* Hand-drawn Green Sparkle Stars SVG (Exact Match to p6_640ms) */}
                <svg
                  className="absolute -top-6 -right-12 sm:-right-14 w-12 h-12 text-[#567D42] overflow-visible"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  {/* Star 1 (larger top star) */}
                  <path
                    d="M 16 0 C 16 7, 21 12, 28 12 C 21 12, 16 17, 16 24 C 16 17, 11 12, 4 12 C 11 12, 16 7, 16 0 Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  {/* Star 2 (smaller bottom star) */}
                  <path
                    d="M 30 18 C 30 22, 33 25, 37 25 C 33 25, 30 28, 30 32 C 30 28, 27 25, 23 25 C 27 25, 30 22, 30 18 Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#6E695F] leading-relaxed">
                States with active home design &amp; development projects
              </p>
            </div>

            {/* CELL 4: 5,000+ with Hand-drawn Radiance Rays 彡 */}
            <div className="space-y-6">
              <div className="relative inline-flex items-baseline">
                <span className="font-serif text-7xl sm:text-8xl lg:text-[110px] font-normal tracking-tight text-[#1A2E20] leading-none select-none">
                  5,000+
                </span>

                {/* Hand-drawn Green Radiance Rays SVG (Exact Match to p6_640ms) */}
                <svg
                  className="absolute -top-3 -right-10 w-9 h-9 text-[#567D42] overflow-visible"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path d="M 4 20 L 16 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M 4 27 L 18 27" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M 2 13 L 9 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#6E695F] leading-relaxed">
                Rural land parcels evaluated
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default TrustMetricsSection;

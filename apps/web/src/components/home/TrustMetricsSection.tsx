import React from 'react';
import { TestimonialsCarousel } from '../common/TestimonialsCarousel';
import { SERVICES_DATA } from '../how-it-works/howItWorksData';

// Sắp thứ tự đúng bản HUTS cho Trang chủ: [Lauren W., Steven D., Dan S.]
const [danTestimonial, laurenTestimonial, stevenTestimonial] =
  SERVICES_DATA.testimonials;
const HOME_TESTIMONIALS = [
  laurenTestimonial,
  stevenTestimonial,
  danTestimonial,
];

export const TrustMetricsSection: React.FC = () => {
  return (
    <section className="pt-6 pb-20 sm:pb-28 bg-[#FAF7ED] overflow-hidden select-none">
      {/* 1 & 2. Shared HUTS Testimonials Carousel with left-aligned header */}
      <TestimonialsCarousel
        title="But, don’t take it from us..."
        items={HOME_TESTIMONIALS}
        className="mb-20 sm:mb-24"
      />

      {/* 3. 4 MASSIVE STAT COUNTERS WITH HAIRLINE DIVIDERS (Banghi.mp4 p6_640ms & p6_655ms) */}
      <div className="max-w-[1584px] mx-auto px-8 md:px-16 lg:px-24">
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

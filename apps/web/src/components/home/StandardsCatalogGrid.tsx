import React, { useState, useRef, useMemo } from 'react';
import { SEED_STANDARD_PLANS, SEED_HOUSING_SOLUTIONS, StandardPlan } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ChevronLeft, ChevronRight, ArrowRight, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Authentic wide architectural photography matching Banghi.mp4 p4_54s & p5_55s
const STANDARDS_GALLERY = [
  {
    slug: 'small-bar',
    cleanName: 'Small Bar',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'medium-bar',
    cleanName: 'Medium Bar',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'big-bar',
    cleanName: 'Big Bar',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'dogtrot',
    cleanName: 'Dogtrot',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'small-l',
    cleanName: 'Small L',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'big-l',
    cleanName: 'Big L',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'village',
    cleanName: 'Village',
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'adu',
    cleanName: 'ADU',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85',
  },
];

export const StandardsCatalogGrid: React.FC = () => {
  const {
    filterSolutionSlug,
    setFilterSolutionSlug,
    openPlanDetail,
  } = useConfiguratorStore();

  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse Drag-to-Scroll support
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const activeSolution = useMemo(() => {
    return SEED_HOUSING_SOLUTIONS.find((s) => s.slug === filterSolutionSlug);
  }, [filterSolutionSlug]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = startScrollLeft - walk;
  };

  const handlePlanClick = (slug: string) => {
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    }
  };

  return (
    <section id="standards-section" className="py-24 bg-tie-bg border-b border-tie-border/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header (Exact Match to Banghi.mp4 p4_54s & p5_55s) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#1A2E20] leading-tight">
            It all starts with our Standards...
          </h2>
          <p className="text-base sm:text-lg text-[#555148] font-sans leading-relaxed max-w-2xl mx-auto">
            They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
          </p>
        </div>

        {/* Filter Indicator & Carousel Arrow Controls */}
        <div className="flex items-center justify-between mb-6 px-2">
          {/* Active Solution Filter Badge */}
          {activeSolution ? (
            <div className="inline-flex items-center space-x-2 text-xs font-mono bg-white px-3 py-1.5 rounded-full border border-tie-border shadow-xs">
              <span className="text-[#555148]">Filtered by Program:</span>
              <span className="font-semibold text-tie-pine">{activeSolution.title}</span>
              <button
                onClick={() => setFilterSolutionSlug(null)}
                className="hover:text-tie-terracotta text-[#555148] ml-1"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs font-mono text-[#555148] uppercase tracking-wider">
              8 Architectural Standards
            </div>
          )}

          {/* Left / Right Chevron Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF8F5] border border-tie-border shadow-xs flex items-center justify-center text-tie-ink transition-colors active:scale-95"
              title="Scroll Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF8F5] border border-tie-border shadow-xs flex items-center justify-center text-tie-ink transition-colors active:scale-95"
              title="Scroll Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CINEMATIC HORIZONTAL SCROLLING CARDS (Matching Banghi.mp4 p4_54s & p5_55s) */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex space-x-6 sm:space-x-8 overflow-x-auto pb-10 pt-2 px-2 scrollbar-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {STANDARDS_GALLERY.map((item) => {
            const plan = SEED_STANDARD_PLANS.find((p) => p.slug === item.slug);
            const isMatch = !filterSolutionSlug || (plan && plan.idealSolutions.includes(filterSolutionSlug));

            return (
              <div
                key={item.slug}
                onClick={() => handlePlanClick(item.slug)}
                className={`shrink-0 snap-start w-[360px] sm:w-[440px] md:w-[480px] lg:w-[500px] cursor-pointer group transition-opacity duration-300 ${
                  isMatch ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                }`}
              >
                {/* Large Horizontal Photo Card with Soft Curves (rounded-3xl / rounded-[28px]) */}
                <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-white border border-[#E8E4DC] shadow-md group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.imageUrl}
                    alt={item.cleanName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Subtle Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Specs Badge on Hover */}
                  {plan && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <span>{plan.sqft} SQFT &bull; {plan.bedrooms} BED / {plan.bathrooms} BATH</span>
                      <span className="text-[#D2E2B0] font-semibold flex items-center space-x-1">
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Elegant Serif Title Below Card (Matching video p4_54s & p5_55s) */}
                <div className="mt-4 px-1 flex items-center justify-between">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A2E20] group-hover:text-[#567D42] transition-colors tracking-tight">
                    {item.cleanName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default StandardsCatalogGrid;

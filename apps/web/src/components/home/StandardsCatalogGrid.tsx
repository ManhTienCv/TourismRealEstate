import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { SEED_STANDARD_PLANS, SEED_HOUSING_SOLUTIONS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Authentic wide architectural photography matching HUTS
const STANDARDS_GALLERY = [
  {
    slug: 'small-bar',
    cleanName: 'Small Bar',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
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
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85',
  },
];

export const StandardsCatalogGrid: React.FC = () => {
  const {
    filterSolutionSlug,
    setFilterSolutionSlug,
    openPlanDetail,
  } = useConfiguratorStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll state
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const activeSolution = useMemo(() => {
    return SEED_HOUSING_SOLUTIONS.find((s) => s.slug === filterSolutionSlug);
  }, [filterSolutionSlug]);

  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);

    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 520;
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
      hasDraggedRef.current = false;
    }, 50);
  };

  const handlePointerLeave = () => {
    if (isPointerDownRef.current) {
      isPointerDownRef.current = false;
      setIsDragging(false);
      hasDraggedRef.current = false;
    }
  };

  const handlePlanClick = (slug: string) => {
    if (hasDraggedRef.current) return;
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    }
  };

  return (
    <section
      id="standards-section"
      className="relative pt-2 sm:pt-4 md:pt-6 pb-16 sm:pb-20 md:pb-24 bg-[#FAF8F1] overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-normal tracking-tight text-[#1A2E20] leading-tight">
          It all starts with our Standards...
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#555148] font-sans leading-relaxed max-w-2xl mx-auto">
          They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
        </p>
      </div>

      {/* Subtitle / Filter Indicator */}
      <div className="max-w-[1584px] w-full mx-auto px-6 sm:px-12 lg:px-20 mb-6 flex items-center justify-between">
        {activeSolution ? (
          <div className="inline-flex items-center space-x-2 text-xs font-mono bg-[#FAF8F1] px-3.5 py-1.5 rounded-full border border-[#E2DFD3] shadow-xs">
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
      </div>

      {/* Horizontal Cards Track with Floating Arrows */}
      <div className="relative w-full group">
        
        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#FAF8F1]/90 backdrop-blur-md border border-[#182215]/20 flex items-center justify-center text-[#182215] shadow-md transition-all duration-200 hover:bg-[#FAF8F1] hover:scale-105 active:scale-95 ${
            canScrollLeft ? 'opacity-90 hover:opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#FAF8F1]/90 backdrop-blur-md border border-[#182215]/20 flex items-center justify-center text-[#182215] shadow-md transition-all duration-200 hover:bg-[#FAF8F1] hover:scale-105 active:scale-95 ${
            canScrollRight ? 'opacity-90 hover:opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex gap-6 sm:gap-8 pl-6 sm:pl-12 lg:px-20 cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {STANDARDS_GALLERY.map((item) => {
            const plan = SEED_STANDARD_PLANS.find((p) => p.slug === item.slug);
            const isMatch = !filterSolutionSlug || (plan && plan.idealSolutions.includes(filterSolutionSlug));

            return (
              <div
                key={item.slug}
                onClick={() => handlePlanClick(item.slug)}
                className={`shrink-0 w-[340px] sm:w-[420px] md:w-[480px] lg:w-[500px] cursor-pointer group transition-opacity duration-300 select-none ${
                  isMatch ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                }`}
              >
                {/* Large Horizontal Photo Card with Soft Curves */}
                <div className="relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF8F1] border border-[#E2DFD3] shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={item.imageUrl}
                    alt={item.cleanName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    draggable={false}
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

                {/* Elegant Serif Title Below Card */}
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

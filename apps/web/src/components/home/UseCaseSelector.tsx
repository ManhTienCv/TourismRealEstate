import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll state
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Update arrow button visibility based on scroll position
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

  // Smooth scroll left / right by card width + gap (~450px)
  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 450;
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  // Pointer drag to scroll support
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with primary mouse button
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

  return (
    <section
      id="solutions-section"
      className="relative py-16 sm:py-20 md:py-24 bg-[#FAF8F1] overflow-hidden select-none"
    >
      {/* Section Header: Centered Editorial Headline */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4">
        <h2 className="font-serif text-[42px] sm:text-[52px] lg:text-[62px] font-normal tracking-tight text-[#182215] leading-[1.1]">
          Whatever type of place you have
          <br />
          in mind
        </h2>
      </div>

      {/* Horizontal Carousel Container with Navigation Arrows */}
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

        {/* Scrollable Track (no scrollbar, smooth touch/mouse drag) */}
        <div
          ref={scrollContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex gap-5 md:gap-6 px-6 sm:px-12 lg:px-20 cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
            <Archetype3DCard
              key={sol.id}
              sol={sol}
              onLearnMore={(slug) => {
                if (!hasDraggedRef.current) {
                  openSolutionDetail(slug);
                }
              }}
              isScrolling={isDragging}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default UseCaseSelector;

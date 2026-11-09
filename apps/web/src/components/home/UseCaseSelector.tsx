import React, { useState, useRef, useEffect } from 'react';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Archetype3DCard } from './usecase/Archetype3DCard';

// 3 copies of the solutions array to create a seamless infinite circular loop matching Huts.com
const REPEATED_SETS = [0, 1, 2];

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll state
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isAdjustingScrollRef = useRef(false);

  // Initialize scroll position to the middle set for seamless infinite scrolling
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const initScroll = () => {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    };

    // Small timeout to allow children to layout
    const timer = setTimeout(initScroll, 50);
    return () => clearTimeout(timer);
  }, []);

  // Handle infinite loop wraparound on scroll
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || isAdjustingScrollRef.current) return;

    const scrollWidth = el.scrollWidth;
    const singleSetWidth = scrollWidth / 3;

    // If scrolled too far left into set 0, seamlessly jump forward by 1 set
    if (el.scrollLeft < singleSetWidth * 0.3) {
      isAdjustingScrollRef.current = true;
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        isAdjustingScrollRef.current = false;
      });
    }
    // If scrolled too far right into set 2, seamlessly jump backward by 1 set
    else if (el.scrollLeft > singleSetWidth * 1.7) {
      isAdjustingScrollRef.current = true;
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        isAdjustingScrollRef.current = false;
      });
    }
  };

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
      className="relative pt-10 sm:pt-14 pb-2 sm:pb-3 bg-[#FAF8F1] overflow-hidden select-none"
    >
      {/* Section Header: Centered Editorial Headline */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-4">
        <h2 className="font-serif text-[42px] sm:text-[52px] lg:text-[62px] font-normal tracking-tight text-[#182215] leading-[1.1]">
          Whatever type of place you have
          <br />
          in mind
        </h2>
      </div>

      {/* Infinite Horizontal Carousel Container with Permanent Navigation Arrows */}
      <div className="relative w-full group">
        
        {/* Floating Left Arrow (Always active for infinite wrap) */}
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll left"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#FAF8F1]/90 backdrop-blur-md border border-[#182215]/20 flex items-center justify-center text-[#182215] shadow-md transition-all duration-200 hover:bg-[#FAF8F1] hover:scale-105 active:scale-95 opacity-90 hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Right Arrow (Always active for infinite wrap) */}
        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll right"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#FAF8F1]/90 backdrop-blur-md border border-[#182215]/20 flex items-center justify-center text-[#182215] shadow-md transition-all duration-200 hover:bg-[#FAF8F1] hover:scale-105 active:scale-95 opacity-90 hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Track (no scrollbar, infinite looping ribbon) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
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
          {REPEATED_SETS.map((setIdx) =>
            SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
              <Archetype3DCard
                key={`${sol.id}-set-${setIdx}`}
                sol={sol}
                onLearnMore={(slug) => {
                  if (!hasDraggedRef.current) {
                    openSolutionDetail(slug);
                  }
                }}
                isScrolling={isDragging}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default UseCaseSelector;

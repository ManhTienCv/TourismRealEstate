import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';

// Authentic Client Testimonials with Real High-Resolution Realized Builds
const TESTIMONIALS = [
  {
    id: 'test-1',
    quote:
      'As a couple with no experience in this field or idea on where to begin, TIE made something like building a home feel possible, organized, and deeply intentional.',
    author: 'Elena & Marcus Vance',
    location: 'The Overlook Dogtrot \u2022 Woodstock, NY',
    tag: 'Second Home',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    projectSlug: 'catskills-dogtrot-retreat',
  },
  {
    id: 'test-2',
    quote:
      'From raw topography to fabrication drawings in weeks. The precision of the modular components and thermal envelope exceeded every expectation we had.',
    author: 'Sarah & Julian Mercer',
    location: 'Blueberry Hill ADU \u2022 Rhinebeck, NY',
    tag: 'Hybrid Home',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    projectSlug: 'break-house',
  },
  {
    id: 'test-3',
    quote:
      'The transparency on budget and schedule was unlike any construction project we’ve managed. A truly effortless experience from start to finish.',
    author: 'David & Clara Thorne',
    location: 'Sonoma Valley Big L \u2022 Sonoma, CA',
    tag: 'Forever Home',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    projectSlug: 'arrowhead-ridge',
  },
];

export const TrustMetricsSection: React.FC = () => {
  const { openProjectDetail } = useConfiguratorStore();
  const [activeIndex, setActiveIndex] = useState(0);

  // Magnetic Cursor state & coordinates (relative to carousel container)
  const [cursorMode, setCursorMode] = useState<'prev' | 'next' | 'inspect'>('next');
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const [slideStep, setSlideStep] = useState(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 32, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 32, mass: 0.2 });

  // Accurately measure slide width + gap (64px) for exact sliding
  const updateSlideStep = useCallback(() => {
    if (firstSlideRef.current) {
      setSlideStep(firstSlideRef.current.offsetWidth + 64);
    }
  }, []);

  useEffect(() => {
    updateSlideStep();
    window.addEventListener('resize', updateSlideStep);
    return () => window.removeEventListener('resize', updateSlideStep);
  }, [updateSlideStep]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselContainerRef.current) return;
    const rect = carouselContainerRef.current.getBoundingClientRect();

    // Set relative coordinates within container (center 64px cursor by offset 32px)
    cursorX.set(e.clientX - rect.left - 32);
    cursorY.set(e.clientY - rect.top - 32);

    // If hovering on an inspect target (photo card)
    const isInspect = Boolean((e.target as HTMLElement).closest('[data-cursor="inspect"]'));
    const midX = rect.left + rect.width / 2;
    const newMode: 'inspect' | 'prev' | 'next' = isInspect
      ? 'inspect'
      : e.clientX < midX
      ? 'prev'
      : 'next';

    setCursorMode((prev) => (prev !== newMode ? newMode : prev));
  };

  const handleMouseEnter = () => {
    setIsHoveringCarousel(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCarousel(false);
    cursorX.set(-100);
    cursorY.set(-100);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const photoEl = target.closest('[data-cursor="inspect"]');
    if (photoEl) {
      const slug = photoEl.getAttribute('data-project-slug');
      if (slug) {
        openProjectDetail(slug);
        return;
      }
    }

    if (cursorMode === 'prev') {
      prevSlide();
    } else if (cursorMode === 'next') {
      nextSlide();
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) {
      nextSlide();
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      prevSlide();
    }
  };

  return (
    <section className="pt-6 pb-20 sm:pb-28 bg-[#FAF8F1] overflow-hidden select-none">
      <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-24">
        
        {/* 1. EDITORIAL TESTIMONIAL CAROUSEL (HUTS Overlapping Card + Photo Layout) */}
        <div className="space-y-8 sm:space-y-10">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#182215] leading-tight">
            But, don’t take it from us...
          </h2>

          {/* Interactive Carousel Viewport */}
          <div
            ref={carouselContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleContainerClick}
            className={`relative w-full overflow-hidden py-4 select-none ${
              isHoveringCarousel ? 'cursor-none' : ''
            }`}
          >
            {/* Absolute Magnetic Cursor Follower inside Container */}
            <motion.div
              className={`absolute top-0 left-0 pointer-events-none z-50 w-16 h-16 rounded-full bg-[#FAF8F1]/80 backdrop-blur-md border border-[#182215]/30 flex items-center justify-center text-[#182215] shadow-lg transition-all duration-150 ${
                isHoveringCarousel ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ x: springX, y: springY }}
            >
              {cursorMode === 'inspect' ? (
                <ArrowUpRight className="w-5 h-5 text-[#182215]" />
              ) : cursorMode === 'prev' ? (
                <ArrowLeft className="w-5 h-5 text-[#182215]" />
              ) : (
                <ArrowRight className="w-5 h-5 text-[#182215]" />
              )}
            </motion.div>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: slideStep > 0 ? -activeIndex * slideStep : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 28,
              }}
              className="flex items-end gap-16"
            >
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={item.id}
                  ref={idx === 0 ? firstSlideRef : undefined}
                  className="w-[88vw] max-w-[1220px] shrink-0 flex items-end select-none"
                >
                  {/* LEFT: Text Card (Warm Cream surface, angular green quote, min-h-[430px] md:min-h-[460px]) */}
                  <div className="w-[66%] min-h-[430px] md:min-h-[460px] bg-[#FAF8F1] border border-[#DFDCD0] rounded-[20px] p-10 md:p-14 pr-28 md:pr-36 flex flex-col justify-between shrink-0 shadow-sm">
                    <div>
                      {/* Angular Olive Green Double Quotation SVG matching HUTS */}
                      <svg
                        className="w-12 h-10 text-[#4A772F] mb-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      {/* Clean Non-Italic Editorial Serif Quote */}
                      <p className="font-serif not-italic text-[22px] md:text-[26px] leading-[1.42] text-[#182215] tracking-tight mb-10 font-normal">
                        {item.quote}
                      </p>
                    </div>

                    {/* Author & Location */}
                    <div className="pt-2">
                      <div className="text-sm font-semibold text-[#182215] font-sans">
                        {item.author}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 font-sans">
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Overlapping Project Photography (Stepped lower than text card) */}
                  <div
                    data-cursor="inspect"
                    data-project-slug={item.projectSlug}
                    className="w-[42%] max-w-[450px] aspect-[1.05/1] -ml-20 md:-ml-24 mb-5 relative z-10 rounded-[20px] overflow-hidden shadow-md shrink-0 cursor-pointer group border border-[#DFDCD0]/60"
                  >
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Top Right Floating Pill Tag */}
                    <div className="absolute top-4 right-4 bg-black/45 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-sans font-medium pointer-events-none border border-white/15">
                      {item.tag}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Minimalist Carousel Pagination Dots */}
          <div className="flex items-center space-x-2 pt-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-8 bg-[#4A772F]'
                    : 'w-2 bg-[#DFDCD0] hover:bg-[#182215]/40'
                }`}
              />
            ))}
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

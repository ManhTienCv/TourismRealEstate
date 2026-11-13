import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo, getLenis } from '../../utils/smoothScroll';
import { PillArrowButton } from '../common/PillArrowButton';
import { DoubleLoopArrow } from './narrative/DoubleLoopArrow';

// Featured Realized Projects matching exact Huts.com portfolio specification (3 curated projects)
const FEATURED_REALIZED_PROJECTS = [
  {
    id: 'break-house',
    slug: 'break-house',
    title: 'Break House',
    exteriorImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    pills: ['Big Bar', '3 Bed', '2 Bath', '1,000–1,500 Sqft', 'Hybrid Home'],
  },
  {
    id: 'mountain-view-meadow',
    slug: 'arrowhead-ridge',
    title: 'Mountain\nView Meadow',
    exteriorImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    pills: ['Medium L', '2 Bed', '2 Bath', '1,200–1,600 Sqft', 'Second Home'],
  },
  {
    id: 'the-overlook-dogtrot',
    slug: 'catskills-dogtrot-retreat',
    title: 'The Overlook\nDogtrot',
    exteriorImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
    pills: ['Dogtrot', '2 Bed', '2 Bath', '1,500–2,000 Sqft', 'Second Home'],
  },
];

export const RealizedPortfolioSection: React.FC = () => {
  const { openProjectDetail } = useConfiguratorStore();

  const firstProjectRef = useRef<HTMLDivElement>(null);
  const lastProjectRef = useRef<HTMLDivElement>(null);
  const firstContentRef = useRef<HTMLDivElement>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  const [isFirstEntering, setIsFirstEntering] = useState(true);
  const [isLastExiting, setIsLastExiting] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkBounds = () => {
      // 1. First Project Entry Check
      if (firstProjectRef.current) {
        const rect0 = firstProjectRef.current.getBoundingClientRect();
        const entering = rect0.top > 0;
        setIsFirstEntering(entering);
        if (firstContentRef.current) {
          if (entering) {
            firstContentRef.current.classList.remove('fixed');
            firstContentRef.current.classList.add('absolute');
          } else {
            firstContentRef.current.classList.remove('absolute');
            firstContentRef.current.classList.add('fixed');
          }
        }
      }

      // 2. Last Project Exit Check
      if (lastProjectRef.current) {
        const rectLast = lastProjectRef.current.getBoundingClientRect();
        // When the last project reaches top <= 0, it has locked into view and begins scrolling up into "See More Projects"
        const exiting = rectLast.top <= 0;
        setIsLastExiting(exiting);
        if (lastContentRef.current) {
          if (exiting) {
            lastContentRef.current.classList.remove('fixed');
            lastContentRef.current.classList.add('absolute');
          } else {
            lastContentRef.current.classList.remove('absolute');
            lastContentRef.current.classList.add('fixed');
          }
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkBounds);
        ticking = true;
      }
    };

    checkBounds();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Also attach to Lenis scroll if active
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="portfolio-section" className="relative w-full bg-[#FAF8F1]">
      
      {/* 1. Intro Editorial Header on Cream Background */}
      <div className="pt-0 pb-16 md:pb-20 max-w-[1584px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hand-drawn Green 2-Loop Arrow matching HUTS */}
        <div className="flex justify-center -mt-20 sm:-mt-28 md:-mt-36 mb-6 sm:mb-8 pointer-events-none bg-transparent">
          <DoubleLoopArrow />
        </div>

        <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[50px] lg:text-[54px] font-normal tracking-[-0.01em] text-[#0C310A] leading-[1.1] max-w-[726px] mx-auto text-center">
          ...and we work with you to make <br className="hidden sm:inline" />it yours.
        </h2>
      </div>

      {/* 2. Clip-path Wipe Transition with Fixed/Absolute Hybrid Content (Exact HUTS behavior) */}
      <div className="relative w-full">
        {FEATURED_REALIZED_PROJECTS.map((project, index) => {
          const isFirst = index === 0;
          const isLast = index === FEATURED_REALIZED_PROJECTS.length - 1;

          // Initial class before hydration / scroll events
          let initialPosClass = 'fixed inset-0';
          if (isFirst && isFirstEntering) {
            initialPosClass = 'absolute inset-0';
          } else if (isLast && isLastExiting) {
            initialPosClass = 'absolute inset-0';
          }

          return (
            <div
              key={project.id}
              ref={isFirst ? firstProjectRef : isLast ? lastProjectRef : undefined}
              onClick={() => openProjectDetail(project.slug)}
              className="relative w-full h-screen overflow-hidden [clip-path:inset(0)] select-none cursor-pointer"
              style={{
                zIndex: index + 10,
                clipPath: 'inset(0)',
                WebkitClipPath: 'inset(0)',
              }}
            >
              {/* Background Layer: Full-bleed exterior photography (NO hover scale) */}
              <img
                src={project.exteriorImage}
                alt={project.title.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Content Layer: Switches seamlessly between fixed (curtain wipe) and absolute (clean float-up with card) */}
              <div
                ref={isFirst ? firstContentRef : isLast ? lastContentRef : undefined}
                className={`${initialPosClass} pointer-events-none flex items-center justify-between w-[82vw] max-w-[1260px] mx-auto z-10`}
              >
                {/* Left Column: Title & 1-line Glassmorphism Pill Tags (NO hover effects) */}
                <div className="w-[50%] lg:w-[560px] pointer-events-auto text-[#FAF7ED]">
                  <h3 className="font-serif text-[42px] sm:text-[48px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-tight whitespace-pre-line mb-6 drop-shadow-md font-normal text-[#FAF7ED]">
                    {project.title}
                  </h3>
                  <div className="flex items-center flex-nowrap gap-2 whitespace-nowrap overflow-hidden">
                    {project.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 text-[11px] md:text-xs rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white font-medium shrink-0 shadow-sm"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Inset Image with w-[46%] lg:w-[550px] xl:w-[580px] shrink-0, aspect-[16/10], rounded-[14px] (NO hover effects) */}
                <div className="w-[46%] lg:w-[550px] xl:w-[580px] shrink-0 pointer-events-auto">
                  <div className="w-full aspect-[16/10] rounded-[14px] overflow-hidden shadow-2xl bg-neutral-900 border border-white/10">
                    <img
                      src={project.interiorImage}
                      alt={`${project.title.replace('\n', ' ')} interior`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Outro CTA: Reusable Unified Pill Arrow Button (Relative z-20) */}
      <div className="relative z-20 pt-16 pb-12 bg-[#FAF8F1] flex items-center justify-center">
        <PillArrowButton
          label="See More Projects"
          onClick={() => smoothScrollTo('portfolio-section', { offset: -40, duration: 1.2 })}
          variant="dark"
        />
      </div>

    </section>
  );
};

export default RealizedPortfolioSection;

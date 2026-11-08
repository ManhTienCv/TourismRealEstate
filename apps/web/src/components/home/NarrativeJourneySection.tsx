import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, PanInfo } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { PillArrowButton } from '../common/PillArrowButton';

// 4 High-fidelity realized architectural project photos (HUTS style clean borderless deck)
const INITIAL_CARDS = [
  {
    id: 'card-1',
    image: '/projects/dogtrot_full.jpg',
    alt: 'The Catskills Dogtrot',
    baseRotate: -4,
  },
  {
    id: 'card-2',
    image: '/projects/blueberry_hill_full.jpg',
    alt: 'Blueberry Hill ADU',
    baseRotate: 5,
  },
  {
    id: 'card-3',
    image: '/projects/break_house_full.jpg',
    alt: 'The Break House Retreat',
    baseRotate: -7,
  },
  {
    id: 'card-4',
    image: '/projects/arrowhead_full.jpg',
    alt: 'The Arrowhead Studio',
    baseRotate: 3,
  },
];

export const NarrativeJourneySection: React.FC = () => {
  const { setActiveTab, openConfigurator } = useConfiguratorStore();
  const [cards, setCards] = useState(INITIAL_CARDS);
  const isDraggingRef = useRef(false);

  // Scroll tracking refs for SVG path drawing
  const topArrowRef = useRef<HTMLDivElement>(null);
  const connectorArrowRef = useRef<HTMLDivElement>(null);

  // 1. Top Whimsical Arrow: Scroll-triggered SVG path length
  const { scrollYProgress: topProgress } = useScroll({
    target: topArrowRef,
    offset: ['start 90%', 'center 50%'],
  });
  const topPathLength = useTransform(topProgress, [0, 1], [0, 1]);
  const topHeadOpacity = useTransform(topProgress, [0.8, 1], [0, 1]);

  // 2. Middle Connector Arrow: Scroll-triggered SVG path length
  const { scrollYProgress: connectorProgress } = useScroll({
    target: connectorArrowRef,
    offset: ['start 90%', 'center 55%'],
  });
  const connectorPathLength = useTransform(connectorProgress, [0, 1], [0, 1]);
  const connectorHeadOpacity = useTransform(connectorProgress, [0.8, 1], [0, 1]);

  // Move top photo to back of stack
  const moveTopCardToBack = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (distance > 60) {
      moveTopCardToBack();
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleClick = () => {
    if (!isDraggingRef.current) {
      moveTopCardToBack();
    }
  };

  const handleSeeProjects = () => {
    setActiveTab('portfolio');
    const el = document.getElementById('portfolio-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHowItWorksClick = () => {
    openConfigurator();
  };

  return (
    <section id="narrative-section" className="relative py-16 sm:py-24 bg-tie-bg overflow-hidden border-b border-tie-border/60">
      <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* ========================================================= */}
        {/* 1. TOP GREEN SCROLL-TRIGGERED DOODLE ARROW                */}
        {/* ========================================================= */}
        <div ref={topArrowRef} className="flex justify-center -mt-6 sm:-mt-10 mb-8 sm:mb-12">
          <svg
            className="w-28 sm:w-36 md:w-44 h-auto text-[#4a7c38] overflow-visible select-none pointer-events-none"
            viewBox="0 0 170 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Scroll-animated stem path */}
            <motion.path
              d="M 10.0 10.0 C 10.3 11.3, 10.2 15.3, 12.0 18.0 C 13.8 20.7, 16.2 23.0, 21.0 26.0 C 25.8 29.0, 31.5 32.0, 40.5 36.0 C 49.5 40.0, 69.8 46.7, 75.0 50.0 C 80.2 53.3, 72.1 54.3, 71.5 56.0 C 70.9 57.7, 70.8 58.3, 71.5 60.0 C 72.2 61.7, 74.6 64.7, 76.0 66.0 C 77.4 67.3, 78.7 68.0, 80.0 68.0 C 81.3 68.0, 83.1 67.0, 84.0 66.0 C 84.9 65.0, 86.0 64.0, 85.5 62.0 C 85.0 60.0, 80.8 55.7, 81.0 54.0 C 81.2 52.3, 84.4 52.0, 86.7 52.0 C 89.0 52.0, 92.0 52.3, 95.0 54.0 C 98.0 55.7, 101.9 59.0, 104.5 62.0 C 107.1 65.0, 108.8 68.0, 110.5 72.0 C 112.2 76.0, 113.7 78.3, 114.5 86.0 C 115.3 93.7, 116.0 112.3, 115.5 118.0 C 115.0 123.7, 111.7 119.0, 111.5 120.0 C 111.3 121.0, 114.5 121.3, 114.5 124.0 C 114.5 126.7, 112.6 133.0, 111.5 136.0 C 110.4 139.0, 109.6 140.7, 108.0 142.0 C 106.4 143.3, 104.6 145.0, 102.0 144.0 C 99.4 143.0, 93.8 139.0, 92.5 136.0 C 91.2 133.0, 92.8 128.7, 94.5 126.0 C 96.2 123.3, 98.7 121.0, 103.0 120.0 C 107.3 119.0, 115.2 118.7, 120.5 120.0 C 125.8 121.3, 131.3 125.3, 135.0 128.0 C 138.7 130.7, 140.4 133.0, 142.5 136.0 C 144.6 139.0, 146.0 141.0, 147.5 146.0 C 149.0 151.0, 151.1 159.2, 151.5 166.0 C 151.9 172.8, 150.2 183.5, 150.0 187.0"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{ pathLength: topPathLength }}
            />
            {/* Arrowhead */}
            <motion.path
              d="M 142 174 L 150 187 L 159 174"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: topHeadOpacity }}
            />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 2. SECTION: "WE DO IT ACROSS THE COUNTRY"                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          
          {/* LEFT: DRAGGABLE PHYSICS PHOTO STACK (Interactive Card Stack Shuffle) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[340px] sm:w-[380px] md:w-[440px] aspect-square flex items-center justify-center select-none">
              {cards.map((card, index) => {
                const isTop = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    drag={isTop}
                    dragSnapToOrigin={true}
                    dragElastic={0.6}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={isTop ? handleClick : undefined}
                    animate={{
                      x: 0,
                      y: 0,
                      rotate: card.baseRotate,
                      scale: 1 - index * 0.03,
                      zIndex: cards.length - index,
                    }}
                    whileDrag={{
                      scale: 1.05,
                      zIndex: 50,
                      cursor: 'grabbing',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    style={{
                      zIndex: cards.length - index,
                    }}
                    className={`absolute inset-0 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-xl bg-tie-surface origin-center select-none ${
                      isTop ? 'cursor-grab active:cursor-grabbing shadow-2xl' : 'pointer-events-none'
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                      loading={isTop ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: EDITORIAL COPY & SYNCHRONIZED PILL ARROW BUTTON */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-tight text-tie-ink leading-[1.12]">
              We do it across the country
            </h2>

            <p className="text-base sm:text-lg text-[#555148] font-sans leading-relaxed max-w-xl">
              We focused exclusively on delivering in rural locations. Coast-to-coast, TIE crafts beautiful properties through guidance, intent, and care. Have a specific area or state in mind? We've either built there, or are currently designing there.
            </p>

            {/* Reusable Unified Pill Arrow Button */}
            <div className="pt-2">
              <PillArrowButton
                label="See Our Projects"
                onClick={handleSeeProjects}
                variant="dark"
              />
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. MIDDLE CONNECTOR ARROW: SCROLL-TRIGGERED PATH DRAWING */}
        {/* ========================================================= */}
        <div ref={connectorArrowRef} className="flex justify-center -mt-6 sm:-mt-10 mb-8 sm:mb-12">
          <svg className="w-28 sm:w-36 md:w-44 h-auto text-[#4a7c38] overflow-visible select-none pointer-events-none" viewBox="0 0 100 120" fill="none">
            <motion.path
              d="M 85 0 C 85 35, 45 35, 30 75 C 24 90, 22 105, 22 112"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{ pathLength: connectorPathLength }}
            />
            <motion.path
              d="M 15 104 L 22 114 L 29 104"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: connectorHeadOpacity }}
            />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 4. "USING A PROCESS BUILT AROUND YOU" (Sherpa Fireplace) */}
        {/* ========================================================= */}
        <div id="process-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-2 pb-12 sm:pb-16">
          
          {/* Left Column: Headline, Narrative & Reusable Pill Arrow Button */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal text-tie-ink leading-[1.15] tracking-tight">
              Using a process built
              <br />
              around you
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-[#555148] leading-relaxed max-w-lg">
              We deliver properties differently think of us as your sherpa on the path to your perfect property. Our people-first process goes far beyond floor plans—we coordinate every player needed to take you from a spark of an idea to raw land to a finished home. It's a start-to-finish approach that's proven, vetted, and simply the best way to build.
            </p>

            {/* Reusable Unified Pill Arrow Button */}
            <div className="pt-2">
              <PillArrowButton
                label="How It Works"
                onClick={handleHowItWorksClick}
                variant="dark"
              />
            </div>
          </div>

          {/* Right Column: Hand-drawn Sherpa Drinking Tea by Stone Fireplace */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <img
              src="/sherpa_fireplace_transparent.png"
              alt="Architectural sherpa enjoying tea by a stone fireplace"
              className="w-72 sm:w-80 md:w-96 lg:w-[460px] h-auto object-contain select-none pointer-events-none drop-shadow-xs"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default NarrativeJourneySection;

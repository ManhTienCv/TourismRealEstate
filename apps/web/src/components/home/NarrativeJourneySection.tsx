import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, PanInfo } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { PillArrowButton } from '../common/PillArrowButton';

// 4 High-fidelity realized architectural project photos (HUTS style clean borderless deck)
const INITIAL_CARDS = [
  {
    id: 'card-1',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Catskills Forest Compound',
  },
  {
    id: 'card-2',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
    alt: 'Birchwood Hill ADU',
  },
  {
    id: 'card-3',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    alt: 'The Overlook Dogtrot',
  },
  {
    id: 'card-4',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sonoma Valley Big L',
  },
];

// Physical fan-out stacking offsets matching HUTS
const STACK_POSITIONS = [
  { rotate: 4, x: 0, y: 0, scale: 1 },
  { rotate: -6, x: -16, y: 12, scale: 0.98 },
  { rotate: 7, x: 14, y: -12, scale: 0.96 },
  { rotate: -3, x: -10, y: 18, scale: 0.95 },
];

export const NarrativeJourneySection: React.FC = () => {
  const { setActiveTab, openConfigurator } = useConfiguratorStore();
  const [cards, setCards] = useState(INITIAL_CARDS);
  const isDraggingRef = useRef(false);

  // Scroll tracking refs for SVG path drawing
  const topArrowRef = useRef<HTMLDivElement>(null);
  const connectorArrowRef = useRef<HTMLDivElement>(null);

  // 1. Top Whimsical Looping Arrow: Scroll-triggered SVG path length
  const { scrollYProgress: topProgress } = useScroll({
    target: topArrowRef,
    offset: ['start 90%', 'center 50%'],
  });
  const topPathLength = useTransform(topProgress, [0, 1], [0, 1]);
  const topHeadOpacity = useTransform(topProgress, [0.8, 1], [0, 1]);

  // 2. Middle Connector Arrow: Scroll-triggered SVG path length
  const { scrollYProgress: connectorProgress } = useScroll({
    target: connectorArrowRef,
    offset: ['start 90%', 'start 50%'],
  });
  const connectorPathLength = useTransform(connectorProgress, [0, 1], [0, 1]);
  const connectorHeadOpacity = useTransform(connectorProgress, [0.75, 0.95], [0, 1]);

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
    if (distance > 50) {
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
    <section id="narrative-section" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF8F1] overflow-visible select-none">
      
      {/* ========================================================= */}
      {/* 1. TOP GREEN LOOP-DE-LOOP ARROW (Exact Match to Image 6) */}
      {/* ========================================================= */}
      <div ref={topArrowRef} className="flex justify-center -mt-2 sm:-mt-4 mb-4 sm:mb-6 pointer-events-none">
        <svg
          className="w-24 sm:w-32 md:w-36 h-auto text-[#4A772F] overflow-visible select-none pointer-events-none"
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scroll-animated loopy doodle path */}
          <motion.path
            d="M 25 15 C 65 38, 110 52, 118 85 C 126 112, 100 126, 88 112 C 75 96, 92 68, 116 75 C 135 82, 140 125, 142 165"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ pathLength: topPathLength }}
          />
          {/* Downward pointing arrowhead */}
          <motion.path
            d="M 132 150 L 142 165 L 152 150"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: topHeadOpacity }}
          />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 2. SECTION: "WE DO IT ACROSS THE COUNTRY" (Matching HUTS) */}
      {/* ========================================================= */}
      <div className="max-w-[1060px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 mb-4 sm:mb-6">
          
          {/* LEFT: DRAGGABLE PHYSICS PHOTO STACK */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[340px] sm:w-[390px] md:w-[430px] lg:w-[450px] aspect-square flex items-center justify-center select-none">
              {cards.map((card, index) => {
                const isTop = index === 0;
                const pos = STACK_POSITIONS[index] || { rotate: 0, x: 0, y: 0, scale: 0.95 };

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
                      x: pos.x,
                      y: pos.y,
                      rotate: pos.rotate,
                      scale: pos.scale,
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
                    className={`absolute inset-0 rounded-[22px] overflow-hidden shadow-xl bg-[#FAF8F1] origin-center select-none ${
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
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-[38px] md:text-[44px] lg:text-[46px] text-[#182215] tracking-tight leading-[1.12] mb-5 font-normal lg:whitespace-nowrap">
              We do it across the country
            </h2>

            <p className="max-w-[430px] text-[16px] md:text-[17px] leading-[1.65] text-[#2c3527] font-normal mb-8">
              We focused exclusively on delivering in rural locations. Coast-to-coast, TIE crafts beautiful properties through guidance, intent, and care. Have a specific area or state in mind? We've either built there, or will soon.
            </p>

            {/* Reusable Unified Pill Arrow Button */}
            <div className="pt-1">
              <PillArrowButton
                label="See Our Projects"
                onClick={handleSeeProjects}
                variant="dark"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE CONNECTOR ARROW: SEAMLESS S-CURVE CONNECTING SECTIONS (IMAGE 1) */}
      {/* Curves gracefully from under 'See Our Projects' -> plunges above 'built' */}
      {/* ========================================================================= */}
      <div
        ref={connectorArrowRef}
        className="relative w-full max-w-[1060px] mx-auto px-6 md:px-12 h-[120px] sm:h-[140px] pointer-events-none z-20 overflow-visible my-2"
      >
        <svg
          viewBox="0 0 1060 140"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          {/* Grand elegant calligraphy arch sweeping from under 'See Our Projects' -> gracefully plunging downward above 'built' */}
          <motion.path
            d="M 640 10 C 560 -10, 440 15, 395 115"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ pathLength: connectorPathLength }}
          />
          {/* Downward pointing crisp arrowhead (\/) pointing directly down at 'built' */}
          <motion.path
            d="M 384 94 L 395 115 L 406 94"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: connectorHeadOpacity }}
          />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 4. "USING A PROCESS BUILT AROUND YOU" (Target Image 1)   */}
      {/* ========================================================= */}
      <div
        id="process-section"
        className="max-w-[1060px] mx-auto px-6 md:px-12 pt-2 md:pt-4 pb-16 md:pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 lg:gap-14">
          
          {/* Left Column: Headline, Narrative & Reusable Pill Arrow Button */}
          <div className="md:col-span-6 space-y-6">
            <h3 className="font-serif text-[40px] md:text-[46px] lg:text-[48px] text-[#182215] leading-[1.12] tracking-tight mb-6 max-w-[420px] font-normal">
              Using a process built
              <br />
              around you
            </h3>
            
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#2c3527] font-normal mb-8 max-w-[420px]">
              We deliver properties differently think of us as your sherpa on the path to your perfect property. Our people-first process goes far beyond floor plans—we coordinate every player needed to take you from a spark of an idea to raw land to a finished home. It's a start-to-finish approach that's proven, vetted, and simply the best way to build.
            </p>

            {/* Reusable Unified Pill Arrow Button */}
            <div className="pt-1">
              <PillArrowButton
                label="How It Works"
                onClick={handleHowItWorksClick}
                variant="dark"
              />
            </div>
          </div>

          {/* Right Column: Hand-drawn Sherpa Drinking Tea by Stone Fireplace */}
          <div className="md:col-span-6 flex justify-center md:justify-end">
            <img
              src="/sherpa_fireplace_transparent.png"
              alt="Architectural sherpa enjoying tea by a stone fireplace"
              className="w-full max-w-[420px] md:max-w-[460px] h-auto object-contain select-none pointer-events-none drop-shadow-xs"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default NarrativeJourneySection;

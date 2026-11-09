import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
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
    <section id="narrative-section" className="relative pt-6 sm:pt-8 pb-4 sm:pb-6 bg-[#FAF8F1] overflow-visible select-none">
      
      {/* ========================================================= */}
      {/* 1. SECTION: "WE DO IT ACROSS THE COUNTRY" (Matching HUTS Image 5) */}
      {/* ========================================================= */}
      <div className="max-w-[1060px] mx-auto px-6 md:px-12 relative">

        {/* TOP WHIMSICAL LOOPY ARROW (Exact Match to HUTS Sample Image 5) */}
        {/* Positioned gracefully above the right column headline, pointing down into the section */}
        <div className="hidden md:flex justify-end pr-28 lg:pr-36 -mb-6 pointer-events-none relative z-10">
          <svg
            className="w-24 sm:w-28 md:w-32 h-auto text-[#4A772F] overflow-visible select-none pointer-events-none"
            viewBox="0 0 160 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Whimsical double-loop doodle matching HUTS Image 5 */}
            <motion.path
              d="M 25 18 C 50 32, 85 45, 96 30 C 108 14, 95 2, 78 12 C 60 22, 68 50, 88 56 C 105 62, 114 96, 115 142"
              stroke="#4A772F"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0.9, opacity: 0.85 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {/* Crisp downward pointing arrowhead */}
            <path
              d="M 106 128 L 115 142 L 125 128"
              stroke="#4A772F"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 mb-2 sm:mb-4">
          
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
      {/* 2. MIDDLE CONNECTOR ARROW: SEAMLESS ARCH CONNECTING SECTIONS (HUTS Image 4) */}
      {/* Sweeps gracefully from under 'See Our Projects' -> plunges above 'Using a process built...' */}
      {/* ========================================================================= */}
      <div
        className="relative w-full max-w-[1060px] mx-auto px-6 md:px-12 h-[90px] sm:h-[110px] pointer-events-none z-20 overflow-visible my-1"
      >
        <svg
          viewBox="0 0 1060 110"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          {/* Grand elegant calligraphy arch sweeping from under 'See Our Projects' -> plunging downward above the left column */}
          <motion.path
            d="M 620 8 C 540 18, 450 48, 415 92"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0.95, opacity: 0.9 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Downward pointing crisp symmetric arrowhead (\/) pointing down-left at the title below */}
          <path
            d="M 405 76 L 415 92 L 426 78"
            stroke="#4A772F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 3. "USING A PROCESS BUILT AROUND YOU" (Target HUTS Image 4) */}
      {/* ========================================================= */}
      <div
        id="process-section"
        className="max-w-[1060px] mx-auto px-6 md:px-12 pt-0 pb-4 md:pb-6"
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

import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { PillArrowButton } from '../common/PillArrowButton';
import { DoubleLoopArrow } from './narrative/DoubleLoopArrow';

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
    <section id="narrative-section" className="relative pt-0 pb-4 sm:pb-6 bg-[#FAF8F1] overflow-visible select-none">
      
      {/* ========================================================= */}
      {/* 1. SECTION: "WE DO IT ACROSS THE COUNTRY" (Matching HUTS Image 5) */}
      {/* ========================================================= */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-12 relative">

        {/* Hand-drawn Double-Loop Arrow (Transition from Archetype cards above) */}
        <div className="flex justify-center items-center w-full pt-10 sm:pt-14 mb-4 sm:mb-6 bg-transparent pointer-events-none">
          <DoubleLoopArrow />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 max-w-[1140px] mx-auto py-8 lg:py-12">
          
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
          <div className="lg:col-span-6 space-y-5 relative">
            <h2 className="font-serif text-[38px] md:text-[44px] text-[#0C310A] tracking-[-0.01em] leading-[1.0] mb-5 font-normal lg:whitespace-nowrap">
              We do it across the country
            </h2>

            <p className="max-w-[430px] text-[15px] md:text-[16px] leading-[1.6] text-[#664A42] font-normal mb-8">
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
      {/* 2. MIDDLE CONNECTOR ARROW: ELEGANT SWEEPING S-CURVE (Matches HUTS Image 3) */}
      {/* Sweeps gracefully from under 'See Our Projects' -> plunges above 'Using a process built...' */}
      {/* ========================================================================= */}
      <div
        className="relative w-full max-w-[1140px] mx-auto px-6 md:px-12 h-[190px] sm:h-[220px] md:h-[240px] pointer-events-none z-20 overflow-visible my-2 sm:my-4"
      >
        <svg
          viewBox="0 0 1140 240"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          {/* Authentic sweeping S-curve matching exact HUTS geometry */}
          <motion.path
            d="M 710 15 C 712 70, 680 115, 570 140 C 470 162, 425 185, 420 215"
            stroke="#365327"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0.9, opacity: 0.85 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          {/* Downward pointing crisp hand-drawn arrowhead */}
          <path
            d="M 408 198 L 420 215 L 433 202"
            stroke="#365327"
            strokeWidth="2.4"
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
        className="max-w-[1140px] mx-auto px-6 md:px-12 pt-0 pb-4 md:pb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 lg:gap-14">
          
          {/* Left Column: Headline, Narrative & Reusable Pill Arrow Button */}
          <div className="md:col-span-6 space-y-6">
            <h3 className="font-serif text-[38px] md:text-[44px] text-[#0C310A] leading-[1.0] tracking-[-0.01em] mb-6 max-w-[420px] font-normal">
              Using a process built
              <br />
              around you
            </h3>
            
            <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#664A42] font-normal mb-8 max-w-[420px]">
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

          {/* Right Column: Authentic HUTS line-art Sherpa by the fireplace (Matches Photo 2) */}
          <div className="md:col-span-6 flex justify-center md:justify-end">
            <img
              src="https://cdn.sanity.io/images/xi1ruvdt/production/83d65d8d10536624a3d03751a07d91fe2782e5f4-340x340.svg?w=1920&q=85&auto=format"
              onError={(e) => {
                e.currentTarget.src = '/illustrations/process-sherpa-fireplace.svg';
              }}
              alt="Architectural sherpa enjoying tea by a cozy fireplace"
              className="w-full max-w-[440px] md:max-w-[480px] h-auto object-contain select-none pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default NarrativeJourneySection;

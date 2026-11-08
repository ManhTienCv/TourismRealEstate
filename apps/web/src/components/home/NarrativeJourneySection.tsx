import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { PillArrowButton } from '../common/PillArrowButton';

// 4 High-fidelity realized architectural project photos (Banghi.mp4 p4_46s & p4_50s)
const STACKED_PROJECT_PHOTOS = [
  {
    id: 'deck-1',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85',
    title: 'Catskills Forest Compound',
    location: 'Woodstock, NY',
    plan: 'Big Bar + Studio',
  },
  {
    id: 'deck-2',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=85',
    title: 'Birchwood Hill ADU',
    location: 'Rhinebeck, NY',
    plan: 'ADU 480',
  },
  {
    id: 'deck-3',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    title: 'The Overlook Dogtrot',
    location: 'High Falls, NY',
    plan: 'Dogtrot 1850',
  },
  {
    id: 'deck-4',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85',
    title: 'Sonoma Valley Big L',
    location: 'Sonoma, CA',
    plan: 'Big L 2200',
  },
];

// Natural staggered rotation & scale values for 4 stacked cards
const CARD_TRANSFORMS = [
  { rotate: -3, scale: 1.0, zIndex: 40 },
  { rotate: 5, scale: 0.96, zIndex: 30 },
  { rotate: -7, scale: 0.92, zIndex: 20 },
  { rotate: 3, scale: 0.88, zIndex: 10 },
];

export const NarrativeJourneySection: React.FC = () => {
  const { setActiveTab, openConfigurator } = useConfiguratorStore();
  const [deck, setDeck] = useState(STACKED_PROJECT_PHOTOS);

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

  // Shuffle Deck motion (move top photo to back with spring physics)
  const shuffleDeck = () => {
    setDeck((prev) => [...prev.slice(1), prev[0]]);
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
            <div className="relative w-[340px] sm:w-[380px] md:w-[440px] aspect-square select-none">
              {deck.map((photo, index) => {
                const isTop = index === 0;
                const transform = CARD_TRANSFORMS[index] || CARD_TRANSFORMS[CARD_TRANSFORMS.length - 1];

                return (
                  <motion.div
                    key={photo.id}
                    layout
                    drag={isTop}
                    dragElastic={0.7}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      if (!isTop) return;
                      const distance = Math.hypot(info.offset.x, info.offset.y);
                      if (distance > 80) {
                        shuffleDeck();
                      }
                    }}
                    onClick={() => {
                      if (isTop) shuffleDeck();
                    }}
                    animate={{
                      scale: transform.scale,
                      rotate: transform.rotate,
                      zIndex: transform.zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    style={{ zIndex: transform.zIndex }}
                    className={`absolute inset-0 rounded-3xl shadow-xl overflow-hidden border-4 border-white bg-tie-surface origin-center ${
                      isTop ? 'cursor-grab active:cursor-grabbing shadow-2xl' : 'pointer-events-none'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading={isTop ? 'eager' : 'lazy'}
                    />
                    
                    {/* Atmospheric Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                    {/* Meta Info Bar at Bottom of Photo */}
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white pointer-events-none">
                      <div>
                        <p className="font-serif text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">
                          {photo.title}
                        </p>
                        <p className="font-mono text-xs text-white/85 drop-shadow-xs">
                          {photo.location} &bull; {photo.plan}
                        </p>
                      </div>
                      <span className="font-mono text-[11px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/30">
                        {index + 1}/{deck.length}
                      </span>
                    </div>
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

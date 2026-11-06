import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight, Compass, ShieldCheck, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Realized architectural photography matching Banghi.mp4 p4_46s & p4_50s
const STACKED_PROJECT_PHOTOS = [
  {
    id: 'deck-1',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    title: 'Catskills Forest Compound',
    location: 'Woodstock, NY',
    plan: 'Big Bar + Studio',
  },
  {
    id: 'deck-2',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
    title: 'Birchwood Hill ADU',
    location: 'Rhinebeck, NY',
    plan: 'ADU 480',
  },
  {
    id: 'deck-3',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    title: 'The Overlook Dogtrot',
    location: 'High Falls, NY',
    plan: 'Dogtrot 1850',
  },
  {
    id: 'deck-4',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    title: 'Sonoma Valley Big L',
    location: 'Sonoma, CA',
    plan: 'Big L 2200',
  },
];

export const NarrativeJourneySection: React.FC = () => {
  const { openConfigurator, setActiveTab } = useConfiguratorStore();
  const [deck, setDeck] = useState(STACKED_PROJECT_PHOTOS);
  const [isShuffling, setIsShuffling] = useState(false);

  // Shuffle Deck motion (Clicking the stack moves top photo to back)
  const shuffleDeck = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setTimeout(() => setIsShuffling(false), 400);
  };

  const handleSeeProjects = () => {
    setActiveTab('portfolio');
    const el = document.getElementById('portfolio-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnHow = () => {
    const el = document.getElementById('process-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="narrative-section" className="relative py-16 sm:py-24 bg-tie-bg overflow-hidden border-b border-tie-border/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* 1. TOP GREEN HAND-DRAWN ARROW pointing down (Banghi.mp4 p4_46s) */}
        <div className="flex justify-center -mt-6 mb-12 sm:mb-16">
          <svg className="w-7 h-14 text-[#567D42] overflow-visible" viewBox="0 0 28 52" fill="none">
            <path
              d="M 14 0 C 11 16, 17 28, 14 44"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M 7 36 L 14 45 L 21 36"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 2. SECTION: "WE DO IT ACROSS THE COUNTRY" (Banghi.mp4 00:44 - 00:54) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          
          {/* LEFT: INTERACTIVE STACKED PHOTO DECK (Fan/Deck of photos with natural rotations) */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="relative w-full max-w-[480px] h-[340px] sm:h-[400px] cursor-pointer select-none group"
              onClick={shuffleDeck}
              title="Click photo to shuffle"
            >
              {/* Stack of Cards rendered back to front */}
              {deck.map((photo, index) => {
                // Natural organic rotation angles & offsets matching video
                let rotate = 0;
                let xOffset = 0;
                let yOffset = 0;
                let scale = 1;
                let zIndex = 30 - index * 10;

                if (index === 0) {
                  rotate = -1.5;
                  scale = 1;
                } else if (index === 1) {
                  rotate = 3.5;
                  xOffset = 18;
                  yOffset = -10;
                  scale = 0.96;
                } else if (index === 2) {
                  rotate = -4.5;
                  xOffset = -14;
                  yOffset = 12;
                  scale = 0.92;
                } else {
                  rotate = 2;
                  xOffset = 10;
                  yOffset = -16;
                  scale = 0.88;
                }

                return (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={false}
                    animate={{
                      rotate,
                      x: xOffset,
                      y: yOffset,
                      scale,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    style={{ zIndex }}
                    className="absolute inset-0 rounded-3xl overflow-hidden bg-white border border-[#E8E4DC] shadow-xl group-hover:shadow-2xl transition-shadow"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient vignette for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Minimal Frosted Bottom Caption */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono drop-shadow bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <span className="font-medium">{photo.title}</span>
                      <span className="text-[#D2E2B0] font-semibold">{photo.location}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating Shuffle Hint Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-80 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 text-xs font-mono text-[#555148] bg-white/90 px-3 py-1 rounded-full border border-tie-border shadow-xs">
                <RotateCw className="w-3 h-3 text-tie-pine" />
                <span>Click to shuffle ({deck[0].location})</span>
              </div>
            </div>
          </div>

          {/* RIGHT: EDITORIAL COPY & SIGNATURE HUTS DUAL BUTTON (p4_46s) */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#1C1B18] leading-[1.12]">
              We do it across the country
            </h2>

            <p className="text-base sm:text-lg text-[#555148] font-sans leading-relaxed">
              We focused exclusively on delivering in rural locations. Coast-to-coast, TIE crafts beautiful properties through guidance, intent, and care. Have a specific area or state in mind? We've either built there, or will soon.
            </p>

            {/* Signature Huts Dual Button: Pill + Separate Circle Arrow */}
            <div className="pt-2 flex items-center space-x-2.5">
              <button
                onClick={handleSeeProjects}
                className="px-7 py-3 rounded-full bg-white hover:bg-[#FAF8F5] text-sm font-semibold text-[#1C1B18] border border-[#1C1B18] shadow-xs transition-all active:scale-95"
              >
                See Our Projects
              </button>

              <button
                onClick={handleSeeProjects}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1C1B18] border border-[#1C1B18] shadow-xs flex items-center justify-center transition-all active:scale-95 group"
                title="See Our Projects"
              >
                <ArrowRight className="w-4 h-4 text-[#1C1B18] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. GREEN HAND-DRAWN S-CURVE CONNECTOR ARROW (Banghi.mp4 p4_50s) */}
        <div className="flex justify-center my-12">
          <svg className="w-48 h-32 text-[#567D42] overflow-visible" viewBox="0 0 160 100" fill="none">
            <path
              d="M 140 0 C 130 50, 45 40, 22 88"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="5 5"
            />
            <path
              d="M 15 78 L 22 90 L 29 78"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 4. "USING A PROCESS BUILT AROUND YOU" NARRATIVE JOURNEY (p4_50s) */}
        <div id="process-section" className="max-w-5xl mx-auto space-y-16">
          
          {/* Narrative Journey Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-tie-ink leading-tight">
              Using a process built around you
            </h3>
            <p className="text-base text-[#555148] font-sans leading-relaxed">
              We deliver properties differently—think of us as your sherpa on the path to your perfect mountain, lakeside, or countryside home.
            </p>
          </div>

          {/* Block A: "Start with what you know" + Sherpa by Fireplace Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Monoline Sherpa Drinking Tea by Stone Fireplace (p4_50s) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 flex justify-center md:justify-end"
            >
              <div className="w-64 sm:w-72 aspect-square rounded-3xl bg-white border border-[#E8E4DC] p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <svg className="w-44 h-44 text-[#4D6D3A] stroke-current fill-none stroke-[1.3]" viewBox="0 0 160 160">
                  {/* Stone Fireplace */}
                  <rect x="75" y="45" width="70" height="75" rx="3" strokeWidth="1.4" fill="#FFFFFF" />
                  <path d="M 85 120 L 85 80 Q 110 65, 135 80 L 135 120 Z" fill="#E8F0DC" />
                  {/* Fire & Logs */}
                  <path d="M 98 114 L 122 114 M 100 110 L 120 110" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 105 106 Q 110 92, 112 104 Q 115 90, 118 106" strokeWidth="1.5" fill="#D2E2B0" />
                  {/* Hearth Mantel */}
                  <line x1="70" y1="45" x2="150" y2="45" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="106" y="32" width="8" height="13" rx="1" />
                  {/* Steam */}
                  <path d="M 54 85 Q 52 75, 56 68" strokeDasharray="1.5 2" />
                  {/* Cozy armchair */}
                  <path d="M 20 90 Q 20 125, 45 128 L 72 128 Q 74 95, 52 90 Z" fill="#E8F0DC" />
                  {/* Character figure */}
                  <circle cx="48" cy="65" r="9" />
                  <circle cx="45" cy="64" r="2.5" />
                  <circle cx="51" cy="64" r="2.5" />
                  <line x1="47.5" y1="64" x2="48.5" y2="64" />
                  <path d="M 44 70 Q 48 72, 52 70" strokeWidth="1.2" />
                  <path d="M 38 78 Q 48 84, 58 78 L 56 115 L 34 115 Z" fill="#FFFFFF" />
                  <path d="M 46 88 L 56 88 L 54 100 L 48 100 Z" fill="#4D6D3A" />
                  <path d="M 56 90 Q 60 92, 56 96" />
                </svg>
                <span className="font-mono text-[11px] text-tie-pine font-semibold uppercase tracking-wider mt-2">
                  Guidance &amp; Care
                </span>
              </div>
            </motion.div>

            {/* Right: Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-7 space-y-4 max-w-lg"
            >
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
                <Compass className="w-3.5 h-3.5 text-tie-terracotta" />
                <span>01 &bull; THE INITIAL CONVERSATION</span>
              </div>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-tie-ink leading-tight">
                Start with what you know.
              </h4>
              <p className="text-base text-[#555148] font-sans leading-relaxed">
                Tell us your goals, your land, and your budget. We help you figure out the rest — from municipal zoning, soil feasibility, and environmental setbacks to solar siting and turnkey offsite construction.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleLearnHow}
                  className="inline-flex items-center space-x-1.5 text-sm font-sans font-semibold text-tie-pine hover:text-tie-pine-hover transition-colors group"
                >
                  <span>Learn how it works</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* Block B: "A transparent, turnkey process" */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
            
            {/* Left: Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 md:order-1 order-2 space-y-4 max-w-lg md:ml-auto"
            >
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
                <ShieldCheck className="w-3.5 h-3.5 text-tie-terracotta" />
                <span>02 &bull; OFFSITE PREFABRICATION</span>
              </div>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-tie-ink leading-tight">
                A transparent, turnkey process.
              </h4>
              <p className="text-base text-[#555148] font-sans leading-relaxed">
                We manage the entire project lifecycle from initial land evaluation through keys in hand. Fixed pricing, pre-engineered structural stamps, guaranteed factory schedules, and zero rural contractor surprises.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openConfigurator()}
                  className="inline-flex items-center space-x-1.5 text-sm font-sans font-semibold text-tie-pine hover:text-tie-pine-hover transition-colors group"
                >
                  <span>Explore our pro-forma engine</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right: Modular Prefab Assembly Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-5 md:order-2 order-1 flex justify-center md:justify-start"
            >
              <div className="w-64 sm:w-72 aspect-square rounded-3xl bg-white border border-[#E8E4DC] p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <svg className="w-36 h-36 text-tie-pine stroke-current fill-none stroke-[1.25]" viewBox="0 0 100 100">
                  <line x1="10" y1="85" x2="90" y2="85" strokeDasharray="3 3" />
                  <rect x="25" y="48" width="50" height="36" rx="2" />
                  <line x1="25" y1="62" x2="75" y2="62" />
                  <line x1="48" y1="48" x2="48" y2="84" />
                  <polyline points="22 48, 50 20, 78 48" />
                  <polyline points="32 48, 50 30, 68 48" />
                  <line x1="50" y1="0" x2="50" y2="18" strokeDasharray="2 2" />
                  <circle cx="50" cy="19" r="2" />
                  <path d="M 16 84 C 14 74, 18 68, 16 62 C 14 68, 18 74, 16 84" />
                  <path d="M 84 84 C 82 72, 86 65, 84 58 C 82 65, 86 72, 84 84" />
                </svg>
                <span className="font-mono text-[11px] text-tie-pine font-semibold uppercase tracking-wider mt-2">
                  Precision Modular Framing
                </span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default NarrativeJourneySection;

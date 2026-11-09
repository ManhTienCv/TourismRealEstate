import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

// Authentic wide architectural photography matching HUTS
const STANDARDS_GALLERY = [
  {
    slug: 'small-bar',
    cleanName: 'Small Bar',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'medium-bar',
    cleanName: 'Medium Bar',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'big-bar',
    cleanName: 'Big Bar',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'dogtrot',
    cleanName: 'Dogtrot',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'small-l',
    cleanName: 'Small L',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'big-l',
    cleanName: 'Big L',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'village',
    cleanName: 'Village',
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=85',
  },
  {
    slug: 'adu',
    cleanName: 'ADU',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85',
  },
];

export const StandardsCatalogGrid: React.FC = () => {
  const { openPlanDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 240vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);

  const handlePlanClick = (slug: string) => {
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    }
  };

  return (
    <section
      ref={containerRef}
      id="standards-section"
      className="relative w-full h-[240vh] bg-[#FAF8F1]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center select-none pt-8 sm:pt-12 pb-4">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-4 shrink-0">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-tight text-[#182215] leading-tight">
            It all starts with our Standards...
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#555148] font-sans leading-relaxed max-w-2xl mx-auto">
            They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
          </p>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-8 pl-8 sm:pl-16 lg:pl-24 pr-8 sm:pr-16 lg:pr-24 items-center shrink-0 w-max"
          >
            {STANDARDS_GALLERY.map((item) => (
              <div
                key={item.slug}
                onClick={() => handlePlanClick(item.slug)}
                className="shrink-0 w-[460px] sm:w-[500px] md:w-[530px] cursor-pointer group select-none"
              >
                {/* Rounded Rectangular Photo Frame (Expanded dimensions with rounded-[22px]) */}
                <div className="w-full aspect-[16/10] rounded-[22px] overflow-hidden mb-4 bg-[#FAF8F1] border border-[#DFDCD0] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <img
                    src={item.imageUrl}
                    alt={item.cleanName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Elegant Serif Title Below Card */}
                <h3 className="font-serif text-[28px] md:text-[30px] font-normal text-[#182215] tracking-tight group-hover:text-[#4A772F] transition-colors">
                  {item.cleanName}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default StandardsCatalogGrid;

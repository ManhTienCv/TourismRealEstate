import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 260vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);

  return (
    <section
      ref={containerRef}
      id="solutions-section"
      className="relative w-full h-[260vh] bg-[#FAF8F1]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center select-none">
        {/* Section Header: Centered Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-4 shrink-0">
          <h2 className="font-serif text-[42px] sm:text-[52px] lg:text-[62px] font-normal tracking-tight text-[#182215] leading-[1.1]">
            Whatever type of place you have
            <br />
            in mind
          </h2>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-5 md:gap-6 pl-8 sm:pl-16 lg:pl-24 pr-8 sm:pr-16 lg:pr-24 items-center shrink-0 w-max"
          >
            {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
              <Archetype3DCard
                key={sol.id}
                sol={sol}
                onLearnMore={(slug) => {
                  openSolutionDetail(slug);
                }}
                isScrolling={false}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSelector;

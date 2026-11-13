import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 250vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hoàn tất trượt ngang ở 85% hành trình cuộn, 15% còn lại giữ yên tạo khoảng nghỉ mượt mà
  const x = useTransform(scrollYProgress, [0, 0.85, 1], ['0%', '-60%', '-60%']);

  return (
    <section
      ref={containerRef}
      id="solutions-section"
      className="relative w-full h-[250vh] bg-[#FAF8F1]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center pt-10 md:pt-14 pb-8 z-10 select-none">
        {/* Section Header: Centered Editorial Headline matching HUTS 1:1 */}
        <div className="text-center max-w-[730px] mx-auto mb-7 md:mb-8 px-4 shrink-0">
          <h2 className="font-serif text-[36px] md:text-[50px] leading-[1.1] tracking-[-0.02em] text-[#0C310A] font-normal max-w-[730px] mx-auto text-center">
            Whatever type of place you have in mind
          </h2>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x, willChange: 'transform', transition: 'none' }}
            className="flex gap-[18px] px-[31.4px] items-center shrink-0 w-max h-scroll-content"
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

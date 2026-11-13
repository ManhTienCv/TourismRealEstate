import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  // Tính động quãng đường trượt ngang maxTranslateX bằng ResizeObserver trên trackRef
  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const updateDistance = () => {
      const dist = Math.max(0, trackEl.scrollWidth - window.innerWidth + 64);
      setMaxTranslateX(dist);
    };

    updateDistance();

    const ro = new ResizeObserver(updateDistance);
    ro.observe(trackEl);
    window.addEventListener('resize', updateDistance);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 320vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ánh xạ scrollYProgress với khoảng nghỉ đầu (0.08) và cuối (0.92) để không bị trôi hụt thẻ
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -maxTranslateX]);

  return (
    <section
      ref={containerRef}
      id="solutions-section"
      className="relative h-[320vh] bg-[#FAF7ED]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center select-none pt-10 md:pt-14 pb-8 z-10">
        {/* Section Header: Centered Editorial Headline matching HUTS 1:1 */}
        <div className="text-center max-w-[730px] mx-auto mb-7 md:mb-8 px-4 shrink-0">
          <h2 className="font-serif text-[36px] md:text-[50px] leading-[1.1] tracking-[-0.02em] text-[#0C310A] font-normal max-w-[730px] mx-auto text-center">
            Whatever type of place you have in mind
          </h2>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-[18px] px-[31.4px] items-center shrink-0 w-max h-scroll-content transition-none will-change-transform"
          >
            {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
              <Archetype3DCard
                key={sol.id}
                sol={sol}
                onLearnMore={(slug) => {
                  openSolutionDetail(slug);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSelector;

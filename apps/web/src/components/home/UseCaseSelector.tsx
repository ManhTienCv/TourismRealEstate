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
      className="card-slider relative h-[320vh] bg-[#FAF7ED]"
    >
      {/* 100dvh sticky container with grid-template-rows: auto 1fr (matching HUTS) */}
      <div className="scroll-content select-none">
        {/* Section Header within grid row 1 */}
        <div className="heading-wrapper">
          <div className="block-text">
            <div className="block-text-col">
              <h3>Whatever type of place you have in mind</h3>
            </div>
          </div>
        </div>

        {/* Sticky Horizontal Track within grid row 2 */}
        <div className="h-scroll-container">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="h-scroll-content"
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

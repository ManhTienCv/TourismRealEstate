import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  // Tính động quãng đường trượt ngang maxTranslateX chuẩn xác tuyệt đối đến từng pixel
  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const updateDistance = () => {
      const children = Array.from(trackEl.children) as HTMLElement[];
      if (children.length === 0) return;

      const style = window.getComputedStyle(trackEl);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const gap = parseFloat(style.columnGap) || 0;

      let totalContentWidth = paddingLeft + paddingRight;
      children.forEach((child, idx) => {
        totalContentWidth += child.offsetWidth;
        if (idx < children.length - 1) {
          totalContentWidth += gap;
        }
      });

      // Quãng đường trượt ngang để thẻ cuối cùng nằm khớp lề phải (window.innerWidth - paddingRight), triệt tiêu khoảng trống thừa
      const dist = Math.max(0, Math.max(totalContentWidth, trackEl.scrollWidth) - window.innerWidth);
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

  // Lọc scrollYProgress qua useSpring độ phản hồi cao để triệt tiêu bước nhảy con lăn chuột
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Ánh xạ smoothProgress với khoảng nghỉ đầu (0.05) và cuối (0.95) để thẻ cuối dừng vững ở lề phải
  const x = useTransform(smoothProgress, [0.05, 0.95], [0, -maxTranslateX]);

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

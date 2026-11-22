import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { HutsButton } from '../common/HutsButton';

export const PreFooterBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openConfigurator } = useConfiguratorStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.45,
    restDelta: 0.001,
  });

  // Dải xanh cốm trồi lên mềm theo nhịp cuộn (nhấp nhô êm, không nảy lố gây hở khe)
  const cardY = useTransform(smoothProgress, [0, 1], [38, 0]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.988, 1]);
  // Nội dung (hình minh họa, chữ h3, nút Get Started) trượt parallax nhẹ bên trong
  const innerY = useTransform(smoothProgress, [0, 1], [18, 0]);

  return (
    <div ref={containerRef} className="relative z-10 w-full [overflow-x:clip]">
      <motion.div
        style={{ y: cardY, scale: cardScale }}
        className="relative w-full bg-[#D5E798] rounded-t-[24px] px-6 md:px-16 pt-8 md:pt-11 pb-[76px] md:pb-[88px] -mb-[44px] origin-bottom will-change-transform"
      >
        <motion.div
          style={{ y: innerY }}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 will-change-transform"
        >
          {/* Hình minh họa SVG bên trái (figure.illo) */}
          <figure className="illo w-[140px] md:w-[175px] aspect-square shrink-0 object-contain flex items-center justify-center m-0">
            <img
              src="https://cdn.sanity.io/images/xi1ruvdt/production/5950b2b3cc53f79646218dad8be5132223257be8-164x164.svg"
              alt="Dreaming of a country home"
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </figure>

          {/* Tiêu đề h3 */}
          <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] text-center lg:text-left max-w-[600px]">
            Let’s find that place you’ve been dreaming about
          </h3>

          {/* Nút CTA bên phải */}
          <HutsButton
            variant="sock"
            withArrow
            to="/get-started"
            onClick={() => openConfigurator()}
            className="lg:ml-auto shrink-0"
          >
            Get Started
          </HutsButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PreFooterBanner;

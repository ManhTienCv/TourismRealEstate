import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { HutsButton } from '../common/HutsButton';

export const PreFooterBanner: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { openConfigurator } = useConfiguratorStore();

  // Scroll-linked spring parallax: banner bounces gently behind footer top edge
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end 70%'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [50, -10]);
  const y = useSpring(rawY, { stiffness: 130, damping: 20, mass: 0.6 });

  return (
    <section ref={containerRef} className="relative w-full z-10">
      <motion.div
        style={{ y }}
        className="w-full bg-[#CBE282] text-[#182215] rounded-t-[28px] pt-10 pb-24 md:pt-12 md:pb-28 px-8 md:px-16 overflow-hidden select-none"
      >
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Whimsical Daydreaming Character + Editorial Headline */}
        <div className="flex items-center gap-8 md:gap-10 text-center md:text-left">
          {/* Hand-drawn Character Illustration from Sanity CDN */}
          <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/xi1ruvdt/production/5950b2b3cc53f79646218dad8be5132223257be8-164x164.svg"
              alt="Dreaming of a country home"
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>

          {/* Editorial Headline */}
          <h3 className="font-serif font-normal text-[34px] md:text-[42px] leading-[1.08] tracking-[-0.02em] text-[#0C310A]">
            Let’s find that place
            <br />
            you’ve been dreaming
            <br />
            about
          </h3>
        </div>

        {/* Right: Signature HUTS Dual Button ("Get Started" Scribble Fill Hover) */}
        <HutsButton
          variant="secondary"
          withArrow={true}
          onClick={() => openConfigurator()}
          className="shrink-0"
        >
          Get Started
        </HutsButton>

        </div>
      </motion.div>
    </section>
  );
};

export default PreFooterBanner;

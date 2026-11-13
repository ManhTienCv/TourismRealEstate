import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

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

        {/* Right: Signature HUTS Dual Button ("Get Started" Pill + Arrow Circle) */}
        <div
          onClick={() => openConfigurator()}
          className="group inline-flex items-center gap-1.5 cursor-pointer select-none shrink-0"
        >
          {/* Pill text */}
          <div className="relative overflow-hidden h-[44px] px-7 rounded-[104px] bg-[#FAF8F1] text-[#0C310A] text-[14px] leading-[1.4] font-normal flex items-center justify-center transition-colors duration-300">
            <span className="absolute inset-0 bg-[#3F6628] translate-y-full -translate-x-1/4 rotate-12 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-0 scale-150 transition-transform duration-300 ease-out rounded-[104px] pointer-events-none" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FAF8F1]">
              Get Started
            </span>
          </div>

          {/* Circle arrow */}
          <div className="relative overflow-hidden w-[44px] h-[44px] rounded-[104px] bg-[#FAF8F1] text-[#0C310A] flex items-center justify-center transition-colors duration-300">
            <span className="absolute inset-0 bg-[#3F6628] translate-y-full -translate-x-1/4 rotate-12 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-0 scale-150 transition-transform duration-300 ease-out rounded-[104px] pointer-events-none" />
            <svg
              className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:text-[#FAF8F1] group-hover:-rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        </div>
      </motion.div>
    </section>
  );
};

export default PreFooterBanner;

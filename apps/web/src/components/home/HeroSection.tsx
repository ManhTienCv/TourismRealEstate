import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Authentic high-res ambient background video from HUTS Sanity CDN with static image fallback
const HERO_VIDEO_URL =
  'https://cdn.sanity.io/files/xi1ruvdt/production/7452165f3b253894b0bbdd820d06a25a7dd71839.mp4';
const HERO_FALLBACK_IMAGE =
  'https://cdn.sanity.io/images/xi1ruvdt/production/adec57220fd43008ea6d5e08e95bf76e0b84c0d2-3200x2133.jpg?w=1920&q=85&auto=format';

export const HeroSection: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* FULL-BLEED HERO BACKGROUND VIDEO WITH STATIC POSTER FALLBACK */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_FALLBACK_IMAGE}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
          <img
            src={HERO_FALLBACK_IMAGE}
            alt="Modern timber country home in scenic rural landscape"
            className="w-full h-full object-cover object-center"
          />
        </video>
      </div>

      {/* Cinematic Vignette Overlay (Darker at top for navbar readability, subtle in center) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/55 pointer-events-none" />

      {/* CENTERED HERO CONTENT (Exact composition, line breaks, and underline from Banghi.mp4) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16 flex flex-col items-center justify-center">
        
        {/* Editorial Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight text-[#FAF7ED] leading-[1.12] drop-shadow-md max-w-4xl"
        >
          The best{' '}
          <span className="relative inline-block">
            way to design
            {/* Hand-drawn Green Underline SVGs matching Image 1 & 2 */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-5 text-[#A8C86D] overflow-visible"
              viewBox="0 0 240 16"
              fill="none"
            >
              <path
                d="M 2 8 Q 60 2, 120 7 T 238 6"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 12 13 Q 70 7, 130 12 T 226 11"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </span>
          <br />
          and develop a property in
          <br />
          the country
        </motion.h1>

        {/* Clean, Confident Olive Green Pill CTA (Exact Match to Banghi.mp4: [ Get Started (→) ]) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 sm:mt-12"
        >
          <button
            onClick={() => openConfigurator()}
            className="group inline-flex items-center space-x-3 px-8 py-3.5 rounded-[104px] text-[14px] leading-[1.4] font-normal text-[#FAF7ED] bg-[#567D42] hover:bg-[#466635] shadow-tie-card transition-all duration-300 active:scale-95 border border-[#6B9A53]/50"
          >
            <span>Get Started</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-white/30 transition-all">
              <ArrowRight className="w-3.5 h-3.5 text-[#FAF7ED]" />
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

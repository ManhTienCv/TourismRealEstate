import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

export const PreFooterBanner: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section className="w-full bg-[#CFE87B] text-[#182215] rounded-t-[28px] pt-10 pb-16 md:pt-12 md:pb-20 px-8 md:px-16 overflow-hidden select-none">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Whimsical Daydreaming Character + Editorial Headline */}
        <div className="flex items-center gap-8 md:gap-10 text-center md:text-left">
          {/* Hand-drawn Character Illustration */}
          <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
            <svg
              className="w-full h-full text-[#182215] stroke-current fill-none stroke-[1.4]"
              viewBox="0 0 120 120"
            >
              {/* Dark Green Ground Base Oval */}
              <ellipse cx="80" cy="112" rx="24" ry="4.5" fill="#183D24" stroke="none" />

              {/* Rising Thought Puffs */}
              <circle cx="56" cy="80" r="2.5" fill="#183D24" stroke="none" />
              <circle cx="50" cy="68" r="4" fill="#183D24" stroke="none" />
              <circle cx="42" cy="56" r="6" fill="#183D24" stroke="none" />

              {/* Main Thought Cloud Bubble */}
              <path
                d="M 16 42 Q 8 28, 22 22 Q 28 12, 44 18 Q 56 12, 60 26 Q 68 34, 58 46 Q 48 54, 36 50 Q 24 56, 16 42 Z"
                fill="#8BA85F"
                stroke="#182215"
                strokeWidth="1.5"
              />

              {/* Little Cabin inside Thought Cloud */}
              <polygon points="26 38, 36 26, 46 38" fill="#FFFFFF" stroke="#182215" strokeWidth="1.2" />
              <rect x="29" y="38" width="14" height="10" fill="#FFFFFF" stroke="#182215" strokeWidth="1.2" />
              <rect x="34" y="41" width="4" height="7" fill="#182215" />
              
              {/* Radiating Rays from Cabin in Cloud */}
              <line x1="20" y1="24" x2="14" y2="18" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="36" y1="18" x2="36" y2="10" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="52" y1="24" x2="58" y2="18" stroke="#FFFFFF" strokeWidth="1.4" />

              {/* Daydreaming Character (Woman looking upward with delight) */}
              <line x1="68" y1="52" x2="64" y2="46" strokeWidth="1.4" />
              <line x1="82" y1="46" x2="82" y2="38" strokeWidth="1.4" />
              <line x1="94" y1="50" x2="100" y2="44" strokeWidth="1.4" />

              {/* Head & Ponytail */}
              <circle cx="82" cy="64" r="11" />
              <path d="M 91 58 Q 102 54, 98 68 Q 96 76, 90 70" fill="#182215" />
              
              {/* Face features */}
              <path d="M 76 61 Q 78 58, 80 61" strokeWidth="1.5" />
              <path d="M 83 61 Q 85 58, 87 61" strokeWidth="1.5" />
              <path d="M 78 68 Q 82 72, 85 68" strokeWidth="1.4" />
              
              {/* Hands cupped together at chest in joy */}
              <path d="M 72 75 Q 76 80, 80 80 Q 84 80, 88 75" strokeWidth="1.8" />
              <ellipse cx="80" cy="78" rx="5" ry="3" fill="#E8F0DC" />

              {/* Body & Dotted Shirt */}
              <path d="M 68 83 Q 80 81, 92 83 L 95 110 L 65 110 Z" fill="#FFFFFF" strokeWidth="1.5" />
              <circle cx="73" cy="90" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="82" cy="88" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="89" cy="92" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="76" cy="98" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="85" cy="100" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="74" cy="106" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="88" cy="106" r="1.5" fill="#183D24" stroke="none" />
            </svg>
          </div>

          {/* Editorial Headline */}
          <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.1] tracking-tight text-[#182215] font-normal">
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
          <div className="px-7 py-3.5 rounded-full bg-[#FAF8F1] text-[#182215] text-xs md:text-sm font-medium transition-colors duration-300 group-hover:bg-[#3B6624] group-hover:text-[#FAF8F1]">
            Get Started
          </div>

          {/* Circle arrow */}
          <div className="w-11 h-11 rounded-full bg-[#FAF8F1] text-[#182215] flex items-center justify-center transition-all duration-300">
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45"
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
    </section>
  );
};

export default PreFooterBanner;

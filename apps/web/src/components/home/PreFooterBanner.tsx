import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';

export const PreFooterBanner: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section className="bg-[#D2E2B0] text-[#1A2E20] py-14 sm:py-20 px-4 sm:px-8 lg:px-12 border-t border-b border-[#BED49A] overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left: Whimsical Daydreaming Character + Thought Bubble (Banghi.mp4 p6_655ms) */}
        <div className="flex items-center space-x-6 sm:space-x-8 text-center md:text-left">
          
          {/* Hand-drawn Character Illustration matching Banghi1.mp4 480s */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 hidden sm:flex items-center justify-center">
            <svg
              className="w-full h-full text-[#1A2E20] stroke-current fill-none stroke-[1.4]"
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
                stroke="#1A2E20"
                strokeWidth="1.5"
              />

              {/* Little Cabin inside Thought Cloud */}
              <polygon points="26 38, 36 26, 46 38" fill="#FFFFFF" stroke="#1A2E20" strokeWidth="1.2" />
              <rect x="29" y="38" width="14" height="10" fill="#FFFFFF" stroke="#1A2E20" strokeWidth="1.2" />
              <rect x="34" y="41" width="4" height="7" fill="#1A2E20" />
              {/* Radiating Rays from Cabin in Cloud */}
              <line x1="20" y1="24" x2="14" y2="18" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="36" y1="18" x2="36" y2="10" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="52" y1="24" x2="58" y2="18" stroke="#FFFFFF" strokeWidth="1.4" />

              {/* Daydreaming Character (Woman looking upward with delight) */}
              {/* Radiance marks around head */}
              <line x1="68" y1="52" x2="64" y2="46" strokeWidth="1.4" />
              <line x1="82" y1="46" x2="82" y2="38" strokeWidth="1.4" />
              <line x1="94" y1="50" x2="100" y2="44" strokeWidth="1.4" />

              {/* Head & Ponytail */}
              <circle cx="82" cy="64" r="11" />
              <path d="M 91 58 Q 102 54, 98 68 Q 96 76, 90 70" fill="#1A2E20" /> {/* Ponytail */}
              {/* Face features (eyes looking up, joyful smile) */}
              <path d="M 76 61 Q 78 58, 80 61" strokeWidth="1.5" />
              <path d="M 83 61 Q 85 58, 87 61" strokeWidth="1.5" />
              <path d="M 78 68 Q 82 72, 85 68" strokeWidth="1.4" />
              {/* Hands cupped together at chest in joy */}
              <path d="M 72 75 Q 76 80, 80 80 Q 84 80, 88 75" strokeWidth="1.8" />
              <ellipse cx="80" cy="78" rx="5" ry="3" fill="#E8F0DC" />

              {/* Body & Dotted Shirt */}
              <path d="M 68 83 Q 80 81, 92 83 L 95 110 L 65 110 Z" fill="#FFFFFF" strokeWidth="1.5" />
              {/* Polka Dots */}
              <circle cx="73" cy="90" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="82" cy="88" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="89" cy="92" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="76" cy="98" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="85" cy="100" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="74" cy="106" r="1.5" fill="#183D24" stroke="none" />
              <circle cx="88" cy="106" r="1.5" fill="#183D24" stroke="none" />
            </svg>
          </div>

          {/* Editorial Serif Headline matching Banghi1.mp4 480s (3-line balance) */}
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1A2E20] tracking-tight leading-[1.15]">
              Let’s find that place
              <br />
              you’ve been dreaming
              <br />
              about
            </h3>
          </div>
        </div>

        {/* Right: Signature HUTS Dual Button (Pill + Circle Arrow Button) */}
        <div className="shrink-0 flex items-center space-x-2.5">
          <button
            onClick={() => openConfigurator()}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-[#1A2E20] bg-white hover:bg-[#FAF8F5] shadow-xs transition-all duration-200 active:scale-95"
          >
            Get Started
          </button>
          
          <button
            onClick={() => openConfigurator()}
            className="w-12 h-12 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1A2E20] shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 group"
            title="Get Started"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

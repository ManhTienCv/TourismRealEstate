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
          
          {/* Hand-drawn Character Illustration */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 hidden sm:flex items-center justify-center">
            <svg
              className="w-full h-full text-[#2C4A3E] stroke-current fill-none stroke-[1.4]"
              viewBox="0 0 100 100"
            >
              {/* Thought cloud bubble */}
              <path
                d="M 14 36 Q 10 24, 22 20 Q 28 14, 40 18 Q 50 16, 52 26 Q 58 32, 52 42 Q 44 48, 36 44 Q 24 50, 16 42 Z"
                fill="#E8F0DC"
              />
              {/* Miniature cabin in cloud */}
              <polygon points="26 34, 34 24, 42 34" fill="#FFFFFF" />
              <rect x="29" y="34" width="10" height="8" fill="#FFFFFF" />
              <rect x="33" y="36" width="3" height="6" fill="#2C4A3E" />
              <line x1="22" y1="38" x2="22" y2="30" />
              <line x1="20" y1="34" x2="24" y2="34" />
              {/* Thought dots */}
              <circle cx="48" cy="50" r="2" fill="currentColor" />
              <circle cx="52" cy="56" r="1.5" fill="currentColor" />
              {/* Person daydreaming */}
              <circle cx="68" cy="66" r="10" />
              <path d="M 64 65 Q 66 68, 68 65" />
              <path d="M 70 65 Q 72 68, 74 65" />
              <path d="M 66 71 Q 69 74, 72 71" />
              <path d="M 76 60 Q 84 56, 82 66" />
              {/* Hands cupping cheeks */}
              <path d="M 58 72 Q 62 76, 68 76 Q 74 76, 78 72" strokeWidth="1.8" />
              {/* Dotted pattern shirt */}
              <path d="M 56 80 L 80 80 L 84 98 L 52 98 Z" fill="#FFFFFF" />
              <circle cx="64" cy="88" r="1" fill="currentColor" />
              <circle cx="72" cy="88" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Editorial Serif Headline matching p6_655ms */}
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#1A2E20] tracking-tight leading-[1.12]">
              Let’s find that place
              <br />
              you’ve been dreaming about
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
export default PreFooterBanner;

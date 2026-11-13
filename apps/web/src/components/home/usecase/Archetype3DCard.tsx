import React from 'react';
import { HousingSolution } from '@tie/shared';
import { AVAILABLE_ILLUSTRATIONS, CharacterIllustrations } from './CharacterIllustrations';

export interface ArchetypeCardProps {
  sol: HousingSolution;
  onLearnMore: (slug: string) => void;
  isScrolling?: boolean;
}

export const Archetype3DCard: React.FC<ArchetypeCardProps> = ({ sol, onLearnMore, isScrolling }) => {
  return (
    <div
      onClick={() => onLearnMore(sol.slug)}
      className={`shrink-0 w-[320px] md:w-[395px] h-[440px] md:h-[535px] select-none rounded-[17.5px] bg-[#FAF7ED] border border-[#664A42]/15 hover:border-[#664A42]/40 pt-10 pb-9 px-6 flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer group shadow-xs hover:shadow-sm ${
        isScrolling ? 'pointer-events-none' : ''
      }`}
    >
      {/* Character Line Art in Center (scaled to ~72% card width: 220px / md: 275px) */}
      <div className="w-full flex-1 flex items-center justify-center">
        {AVAILABLE_ILLUSTRATIONS[sol.slug] ? (
          <img
            src={AVAILABLE_ILLUSTRATIONS[sol.slug]}
            alt={sol.title}
            onError={(e) => {
              if (sol.slug.includes('multi-gen')) {
                e.currentTarget.src = '/illustrations/multi-gen-compound.svg';
              }
            }}
            className="w-[220px] h-[220px] md:w-[275px] md:h-[275px] object-contain select-none pointer-events-none group-hover:scale-[1.03] transition-transform duration-300"
            draggable={false}
          />
        ) : (
          CharacterIllustrations[sol.slug] || (
            <div className="w-[220px] h-[220px] md:w-[275px] md:h-[275px] flex items-center justify-center text-[#2D4C23]">
              <svg className="w-32 h-32 stroke-current fill-none" viewBox="0 0 64 64">
                <polygon points="12 44, 32 20, 52 44" strokeWidth="1.5" />
                <rect x="24" y="32" width="16" height="12" strokeWidth="1.5" />
              </svg>
            </div>
          )
        )}
      </div>

      {/* Bottom Label (HUTS Card Title: 21px / md: 23px / 1.25 / #0C310A / font-serif) */}
      <div className="w-full pt-2">
        <h3 className="font-serif text-[21px] md:text-[23px] leading-[1.25] text-[#0C310A] group-hover:text-[#2D4C23] text-center font-normal tracking-[-0.01em] transition-colors duration-200">
          {sol.title}
        </h3>
      </div>
    </div>
  );
};

export default Archetype3DCard;

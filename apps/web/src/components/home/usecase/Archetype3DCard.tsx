import React, { useState, useRef, useEffect } from 'react';
import { HousingSolution } from '@tie/shared';
import { ArrowRight } from 'lucide-react';
import { AVAILABLE_ILLUSTRATIONS, CharacterIllustrations } from './CharacterIllustrations';

export interface ArchetypeCardProps {
  sol: HousingSolution;
  onLearnMore: (slug: string) => void;
  isScrolling: boolean;
}

export const Archetype3DCard: React.FC<ArchetypeCardProps> = ({ sol, onLearnMore, isScrolling }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nếu người dùng bắt đầu cuộn trang thì hủy bộ đếm lật thẻ ngay và đưa thẻ về mặt trước
  useEffect(() => {
    if (isScrolling) {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setIsFlipped(false);
    }
  }, [isScrolling]);

  const handleMouseEnterOrMove = () => {
    // Đang cuộn trang thì tuyệt đối không tự lật thẻ đi ngang qua trỏ chuột
    if (isScrolling || isFlipped || hoverTimerRef.current) return;

    hoverTimerRef.current = setTimeout(() => {
      setIsFlipped(true);
      hoverTimerRef.current = null;
    }, 220); // Giữ chuột trên thẻ 220ms mới lật giống HUTS
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsFlipped(false); // Đưa chuột ra ngoài thì úp lại ngay
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnterOrMove}
      onMouseMove={handleMouseEnterOrMove}
      onMouseLeave={handleMouseLeave}
      className={`shrink-0 w-[320px] md:w-[395px] h-[440px] md:h-[535px] [perspective:1200px] select-none rounded-[17.5px] ${
        isScrolling ? 'pointer-events-none' : ''
      }`}
    >
      {/* 3D Flippable Inner Card Container */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out rounded-[17.5px]"
        style={{
          transformStyle: isFlipped ? 'preserve-3d' : 'flat',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE: Warm Cream Surface + Delicate Hairline Border (Matches HUTS 1:1) */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[17.5px] bg-[#FAF7ED] border border-[#664A42]/15 hover:border-[#664A42]/40 pt-10 pb-9 px-6 flex flex-col items-center justify-between text-center transition-colors duration-200 cursor-pointer"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
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
                className="w-[220px] h-[220px] md:w-[275px] md:h-[275px] object-contain select-none pointer-events-none"
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
            <h3 className="font-serif text-[21px] md:text-[23px] leading-[1.25] text-[#0C310A] text-center font-normal tracking-[-0.01em]">
              {sol.title}
            </h3>
          </div>
        </div>

        {/* BACK SIDE: Minimalist Details & Underline Link (Rotated 180deg) */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[17.5px] bg-[#FAF7ED] border border-[#664A42]/15 hover:border-[#664A42]/40 pt-10 pb-9 px-6 flex flex-col justify-between items-center text-center transition-colors duration-200"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top: Scaled Down Illustration */}
          <div className="w-full flex items-center justify-center h-20 md:h-24 overflow-hidden shrink-0">
            {AVAILABLE_ILLUSTRATIONS[sol.slug] ? (
              <img
                src={AVAILABLE_ILLUSTRATIONS[sol.slug]}
                alt={sol.title}
                className="h-16 w-16 md:h-20 md:w-20 object-contain select-none pointer-events-none opacity-90"
                draggable={false}
              />
            ) : (
              <div className="scale-[0.45] md:scale-[0.52] origin-center opacity-85">
                {CharacterIllustrations[sol.slug]}
              </div>
            )}
          </div>

          {/* Center: Title & Short Description */}
          <div className="space-y-2 px-2 my-auto">
            <h3 className="font-serif text-[21px] md:text-[23px] font-normal text-[#0C310A] tracking-[-0.01em] leading-[1.25]">
              {sol.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#664A42] font-sans leading-relaxed line-clamp-4 max-w-xs mx-auto">
              {sol.description}
            </p>
          </div>

          {/* Bottom: Minimalist Underline Link (CHỈ CLICK VÀO DÒNG LINK NÀY MỚI CHUYỂN TRANG) */}
          <div className="w-full pt-1 flex justify-center shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore(sol.slug);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-sans font-medium text-[#0C310A] hover:text-[#2D4C23] border-b border-[#0C310A]/30 hover:border-[#2D4C23] pb-0.5 transition-all duration-300 cursor-pointer group/link"
              title={`Learn about the ${sol.title}`}
            >
              <span>Learn about the {sol.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300 text-[#2D4C23]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

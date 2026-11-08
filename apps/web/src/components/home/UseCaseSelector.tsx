import React, { useState, useRef, useEffect } from 'react';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// AI-generated Editorial Spot Illustrations (Risograph Monoline Ink matching HUTS)
const AVAILABLE_ILLUSTRATIONS: Record<string, string> = {
  'starter-home': '/illustrations/starter-home-transparent.png',
  'forever-home': '/illustrations/forever-home-transparent.png',
  'second-home': '/illustrations/second-home-transparent.png',
};

// Character Line Art SVGs matching exact frames from Banghi.mp4 (p3_36s, p3_40s, p3_42s)
const CharacterIllustrations: Record<string, React.ReactNode> = {
  // 1. Starter Home: Man kneeling with watering can watering small house with flower blooming on roof
  'starter-home': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      {/* Little House being watered */}
      <polygon points="105 125, 120 108, 135 125" fill="#E9F7C2" />
      <rect x="110" y="125" width="20" height="15" fill="#FFFFFF" />
      <rect x="115" y="132" width="6" height="8" fill="#2D4C23" />
      <rect x="123" y="127" width="5" height="5" />
      {/* Flower sprouting from chimney/roof */}
      <path d="M 120 108 Q 122 96, 126 90" strokeWidth="1.6" />
      <circle cx="126" cy="88" r="3.5" fill="#D1F06E" />
      <path d="M 126 84 L 126 92 M 122 88 L 130 88" strokeWidth="1.2" />
      {/* Water droplets */}
      <line x1="98" y1="108" x2="105" y2="116" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      <line x1="95" y1="112" x2="102" y2="120" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      <line x1="92" y1="116" x2="99" y2="124" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      {/* Watering Can */}
      <path d="M 82 108 L 94 104 L 98 108 L 86 112 Z" fill="#E9F7C2" />
      <path d="M 80 102 Q 86 94, 88 104" strokeWidth="1.2" />
      <path d="M 94 104 L 99 107" />
      {/* Kneeling Character */}
      <circle cx="68" cy="68" r="9" />
      <path d="M 72 68 Q 76 69, 74 72" /> {/* Nose */}
      <path d="M 69 74 Q 72 76, 74 74" /> {/* Smile */}
      <circle cx="71" cy="67" r="1" fill="currentColor" /> {/* Eye */}
      <path d="M 64 62 Q 68 58, 72 61" strokeWidth="1.2" /> {/* Hair tuft */}
      {/* Body & Striped Shirt */}
      <path d="M 64 77 Q 56 86, 54 102 L 78 102 Q 76 86, 68 77" fill="#FFFFFF" />
      <line x1="56" y1="84" x2="74" y2="84" strokeWidth="1" />
      <line x1="55" y1="90" x2="76" y2="90" strokeWidth="1" />
      <line x1="54" y1="96" x2="77" y2="96" strokeWidth="1" />
      {/* Arms extending to can */}
      <path d="M 72 82 Q 78 92, 82 106" strokeWidth="1.5" />
      <path d="M 66 84 Q 74 96, 80 108" strokeWidth="1.2" />
      {/* Kneeling legs & Trousers */}
      <path d="M 54 102 Q 48 114, 52 126 Q 60 132, 70 130" strokeWidth="1.5" />
      <path d="M 70 102 Q 68 116, 76 128 Q 84 132, 90 128" strokeWidth="1.5" />
      <ellipse cx="72" cy="132" rx="7" ry="3" fill="#2D4C23" />
      <ellipse cx="90" cy="130" rx="6" ry="3" fill="#2D4C23" />
      <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 2. Forever Home: Family looking towards countryside homes
  'forever-home': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      {/* Background Country Houses on hill */}
      <path d="M 80 85 Q 115 75, 145 88" strokeDasharray="2 2" strokeWidth="1" />
      <polygon points="110 75, 120 66, 130 75" fill="#E9F7C2" />
      <rect x="113" y="75" width="14" height="10" fill="#FFFFFF" />
      <polygon points="132 78, 138 72, 144 78" fill="#E9F7C2" />
      <rect x="134" y="78" width="8" height="8" fill="#FFFFFF" />
      <circle cx="106" cy="74" r="4" strokeDasharray="1.5 1.5" fill="#D1F06E" />
      <circle cx="147" cy="76" r="3" strokeDasharray="1.5 1.5" fill="#D1F06E" />
      {/* Father (Center) */}
      <circle cx="72" cy="72" r="9" />
      <path d="M 70 70 L 76 70" />
      <circle cx="70" cy="71" r="2.5" />
      <circle cx="76" cy="71" r="2.5" />
      <path d="M 62 82 Q 72 79, 82 82 L 84 116 L 60 116 Z" fill="#E9F7C2" />
      {/* Child on shoulders */}
      <circle cx="72" cy="48" r="6" />
      <path d="M 72 44 Q 76 42, 78 45" />
      <path d="M 68 54 Q 72 52, 76 54 L 78 68 L 66 68 Z" />
      <path d="M 66 58 Q 60 52, 64 48" strokeWidth="1.2" />
      <circle cx="64" cy="47" r="1.5" />
      {/* Mother (Right) */}
      <circle cx="92" cy="74" r="8" />
      <path d="M 88 66 C 88 62, 100 62, 98 70" />
      <path d="M 84 82 Q 92 80, 100 84 L 98 122 L 84 122 Z" fill="#FFFFFF" />
      {/* Son in front */}
      <circle cx="102" cy="98" r="6" />
      <path d="M 96 104 Q 102 102, 108 104 L 106 130 L 96 130 Z" fill="#E9F7C2" />
      <path d="M 45 138 Q 90 134, 135 138" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 3. Second Home: Person relaxing on sun lounger with sunglasses by water
  'second-home': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      <circle cx="50" cy="45" r="5" fill="#D1F06E" />
      <line x1="50" y1="36" x2="50" y2="33" />
      <line x1="50" y1="54" x2="50" y2="57" />
      <line x1="41" y1="45" x2="38" y2="45" />
      <line x1="59" y1="45" x2="62" y2="45" />
      <polygon points="40 76, 50 68, 60 76" fill="#E9F7C2" />
      <rect x="43" y="76" width="14" height="10" fill="#FFFFFF" />
      <path d="M 64 78 Q 74 76, 84 78 Q 94 80, 104 78" strokeDasharray="2 2" strokeWidth="1" />
      <path d="M 68 84 Q 78 82, 88 84 Q 98 86, 108 84" strokeDasharray="2 2" strokeWidth="1" />
      {/* Sun Lounger */}
      <line x1="68" y1="126" x2="135" y2="108" strokeWidth="2" strokeLinecap="round" />
      <line x1="120" y1="112" x2="140" y2="92" strokeWidth="2" strokeLinecap="round" />
      <line x1="78" y1="124" x2="76" y2="134" strokeWidth="1.5" />
      <line x1="126" y1="110" x2="128" y2="134" strokeWidth="1.5" />
      {/* Person */}
      <circle cx="128" cy="88" r="8" />
      <rect x="124" y="86" width="9" height="4" rx="1.5" fill="#2D4C23" />
      <path d="M 122 95 Q 112 102, 100 108 L 94 116 Q 106 114, 118 105 Z" fill="#E9F7C2" />
      <path d="M 94 116 Q 84 118, 72 118" strokeWidth="1.8" />
      <path d="M 72 118 Q 68 114, 68 122" strokeWidth="1.5" />
      <path d="M 112 120 Q 118 114, 124 120 L 122 130 L 110 130 Z" fill="#D1F06E" />
      <path d="M 45 136 Q 95 134, 145 136" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 4. Hybrid Home: Person walking, split between country nature and modern city
  'hybrid-home': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      <line x1="80" y1="35" x2="80" y2="135" strokeDasharray="3 3" strokeWidth="1.2" />
      {/* Left: Nature */}
      <path d="M 35 110 Q 55 98, 80 106" strokeWidth="1" />
      <circle cx="50" cy="98" r="6" fill="#D1F06E" />
      <line x1="50" y1="104" x2="50" y2="114" />
      <path d="M 52 58 Q 56 52, 60 58 Q 64 52, 68 58" strokeWidth="1.2" />
      <path d="M 40 70 Q 44 66, 42 74" />
      {/* Right: City Highrises */}
      <rect x="86" y="55" width="22" height="60" fill="#E9F7C2" />
      <line x1="92" y1="62" x2="96" y2="62" />
      <line x1="92" y1="70" x2="96" y2="70" />
      <line x1="92" y1="78" x2="96" y2="78" />
      <rect x="110" y="42" width="18" height="73" fill="#FFFFFF" />
      <line x1="116" y1="50" x2="122" y2="50" />
      <line x1="116" y1="58" x2="122" y2="58" />
      <line x1="116" y1="66" x2="122" y2="66" />
      {/* Striding Figure */}
      <circle cx="80" cy="72" r="8" />
      <path d="M 74 68 Q 80 64, 86 68" />
      <path d="M 74 80 L 86 80 L 84 105 L 76 105 Z" fill="#E9F7C2" />
      <path d="M 76 105 Q 68 116, 62 128" strokeWidth="1.8" />
      <path d="M 84 105 Q 92 116, 100 126" strokeWidth="1.8" />
      <ellipse cx="60" cy="129" rx="5" ry="2.5" fill="#2D4C23" />
      <ellipse cx="102" cy="127" rx="5" ry="2.5" fill="#2D4C23" />
    </svg>
  ),

  // 5. ADU: Woman juggling two mini houses in mid-air
  'adu': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      <g transform="translate(38, 48) rotate(-15)">
        <polygon points="10 18, 20 8, 30 18" fill="#D1F06E" />
        <rect x="13" y="18" width="14" height="12" fill="#FFFFFF" />
        <rect x="17" y="22" width="4" height="4" fill="#2D4C23" />
      </g>
      <path d="M 52 82 Q 46 64, 52 48" strokeDasharray="2 2" strokeWidth="1" />
      <g transform="translate(102, 48) rotate(15)">
        <polygon points="10 18, 20 8, 30 18" fill="#E9F7C2" />
        <rect x="13" y="18" width="14" height="12" fill="#FFFFFF" />
        <rect x="19" y="22" width="4" height="4" fill="#2D4C23" />
      </g>
      <path d="M 108 82 Q 114 64, 108 48" strokeDasharray="2 2" strokeWidth="1" />
      {/* Woman figure */}
      <circle cx="80" cy="74" r="9" />
      <circle cx="76" cy="74" r="3" />
      <circle cx="84" cy="74" r="3" />
      <line x1="79" y1="74" x2="81" y2="74" />
      <ellipse cx="80" cy="62" rx="5" ry="4" fill="#E9F7C2" />
      <path d="M 76 79 Q 80 84, 84 79" strokeWidth="1.2" />
      <path d="M 72 84 Q 80 88, 88 84 Q 86 92, 80 92 Q 74 92, 72 84" fill="#D1F06E" />
      <path d="M 66 90 Q 80 88, 94 90 L 92 128 L 68 128 Z" fill="#FFFFFF" />
      <path d="M 74 98 L 78 102 M 82 98 L 86 102" strokeWidth="1" />
      <path d="M 68 94 Q 52 92, 54 80" strokeWidth="1.8" />
      <ellipse cx="54" cy="78" rx="3" ry="2" />
      <path d="M 92 94 Q 108 92, 106 80" strokeWidth="1.8" />
      <ellipse cx="106" cy="78" rx="3" ry="2" />
      <path d="M 45 138 Q 90 135, 135 138" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 6. Investment Property: Two hands placing roof block onto modular house (Banghi.mp4 p3_40s)
  'investment-property': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      {/* Upper Module being placed */}
      <g transform="translate(10, -8)">
        <polygon points="80 50, 116 50, 110 64, 74 64" fill="#D1F06E" />
        <rect x="74" y="64" width="36" height="14" fill="#FFFFFF" />
        <line x1="82" y1="68" x2="88" y2="68" />
        <line x1="96" y1="68" x2="102" y2="68" />
      </g>
      {/* Hands holding the module */}
      <path d="M 132 40 Q 124 48, 114 52" strokeWidth="1.6" />
      <path d="M 134 46 Q 126 52, 118 56" strokeWidth="1.3" />
      <path d="M 136 52 Q 128 58, 122 60" strokeWidth="1.3" />
      {/* Lower Main Building with stippling and terraced base */}
      <polygon points="50 96, 75 80, 125 80, 150 96" fill="#E9F7C2" />
      <rect x="52" y="96" width="96" height="32" fill="#FFFFFF" />
      {/* Windows & Door */}
      <rect x="62" y="104" width="16" height="12" fill="#E9F7C2" />
      <rect x="86" y="104" width="16" height="12" fill="#E9F7C2" />
      <rect x="118" y="102" width="14" height="26" fill="#2D4C23" />
      {/* Motion lines */}
      <path d="M 64 66 Q 60 72, 64 78" strokeDasharray="1.5 2" />
      <path d="M 126 66 Q 130 72, 126 78" strokeDasharray="1.5 2" />
      <path d="M 40 138 Q 95 135, 150 138" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 7. Micro-Hospitality: Two hands holding organic plot with cabins nestled in nature (p3_42s)
  'micro-hospitality': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      {/* Hands cradling landscape */}
      <path d="M 80 134 C 60 134, 45 120, 50 98 L 56 104" strokeWidth="1.6" />
      <path d="M 80 134 C 100 134, 115 120, 110 98 L 104 104" strokeWidth="1.6" />
      {/* Floating Island Parcel */}
      <ellipse cx="80" cy="98" rx="42" ry="14" fill="#E9F7C2" />
      {/* Cabins on the island */}
      <polygon points="62 88, 70 78, 78 88" fill="#D1F06E" />
      <rect x="65" y="88" width="10" height="8" fill="#FFFFFF" />
      <polygon points="82 84, 92 72, 102 84" fill="#FFFFFF" />
      <rect x="85" y="84" width="14" height="11" fill="#2D4C23" />
      {/* Pine Trees on island */}
      <polygon points="54 84, 57 76, 60 84" fill="#2D4C23" />
      <polygon points="106 86, 110 77, 114 86" fill="#2D4C23" />
      {/* Foliage swirls */}
      <path d="M 42 70 Q 48 64, 52 72" strokeDasharray="1.5 2" />
      <path d="M 112 64 Q 118 58, 122 66" strokeDasharray="1.5 2" />
    </svg>
  ),

  // 8. Multi-Gen Compound: Multi-building cluster on rural meadow (p3_42s)
  'multi-generation-compound': (
    <svg className="w-52 h-52 text-[#2D4C23] stroke-current fill-none stroke-[1.75]" viewBox="0 0 160 160">
      {/* Main Gabled Pavilion */}
      <polygon points="46 92, 62 74, 78 92" fill="#D1F06E" />
      <rect x="50" y="92" width="24" height="24" fill="#FFFFFF" />
      <rect x="58" y="100" width="8" height="16" fill="#2D4C23" />
      {/* Guest Wing Pavilion */}
      <polygon points="82 86, 100 68, 118 86" fill="#E9F7C2" />
      <rect x="86" y="86" width="28" height="30" fill="#FFFFFF" />
      <rect x="92" y="94" width="8" height="8" fill="#E9F7C2" />
      {/* Studio ADU Pavilion */}
      <polygon points="120 102, 132 88, 144 102" fill="#FFFFFF" />
      <rect x="123" y="102" width="18" height="16" fill="#D1F06E" />
      {/* Connecting garden pathways */}
      <path d="M 74 112 Q 80 114, 86 112" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M 114 112 Q 118 114, 123 112" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Surrounding landscape */}
      <path d="M 35 134 Q 90 130, 145 134" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),
};

interface ArchetypeCardProps {
  sol: HousingSolution;
  onLearnMore: (slug: string) => void;
  isScrolling: boolean;
}

const Archetype3DCard: React.FC<ArchetypeCardProps> = ({ sol, onLearnMore, isScrolling }) => {
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
      className={`shrink-0 w-[380px] sm:w-[400px] md:w-[420px] h-[410px] md:h-[440px] [perspective:1200px] select-none rounded-[20px] ${
        isScrolling ? 'pointer-events-none' : ''
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Flippable Inner Card Container */}
      <div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out rounded-[20px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE: Warm Cream Card (Matches HUTS #FAF8F1 & Vibrant Lime) */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[20px] bg-[#FAF8F1] border border-[#E2DFD3] p-7 md:p-8 flex flex-col justify-between items-center text-center shadow-none transition-colors duration-300"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Character Line Art in Center (occupies ~70% of card height) */}
          <div className="w-full h-[250px] md:h-[270px] flex items-center justify-center my-auto transition-transform duration-500">
            {AVAILABLE_ILLUSTRATIONS[sol.slug] ? (
              <img
                src={AVAILABLE_ILLUSTRATIONS[sol.slug]}
                alt={sol.title}
                className="w-52 h-52 md:w-60 md:h-60 object-contain select-none pointer-events-none drop-shadow-xs"
                draggable={false}
              />
            ) : (
              CharacterIllustrations[sol.slug] || (
                <div className="w-52 h-52 md:w-60 md:h-60 flex items-center justify-center text-[#2D4C23]">
                  <svg className="w-36 h-36 stroke-current fill-none" viewBox="0 0 64 64">
                    <polygon points="12 44, 32 20, 52 44" strokeWidth="1.5" />
                    <rect x="24" y="32" width="16" height="12" strokeWidth="1.5" />
                  </svg>
                </div>
              )
            )}
          </div>

          {/* Bottom Label (Large Serif font text-[26px] md:text-[28px]) */}
          <div className="w-full pt-1 pb-1">
            <h3 className="font-serif text-[25px] sm:text-[26px] md:text-[28px] font-normal text-[#182215] tracking-tight text-center leading-tight">
              {sol.title}
            </h3>
          </div>
        </div>

        {/* BACK SIDE: Minimalist Details & Underline Link (Rotated 180deg) */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[20px] bg-[#FAF8F1] border border-[#E2DFD3] p-6 sm:p-7 md:p-8 flex flex-col justify-between text-center shadow-sm transition-colors duration-300"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top: Scaled Down Illustration */}
          <div className="w-full flex items-center justify-center h-24 md:h-28 overflow-hidden shrink-0">
            {AVAILABLE_ILLUSTRATIONS[sol.slug] ? (
              <img
                src={AVAILABLE_ILLUSTRATIONS[sol.slug]}
                alt={sol.title}
                className="h-20 w-20 md:h-24 md:w-24 object-contain select-none pointer-events-none opacity-90 drop-shadow-xs"
                draggable={false}
              />
            ) : (
              <div className="scale-[0.55] md:scale-[0.62] origin-center opacity-85">
                {CharacterIllustrations[sol.slug]}
              </div>
            )}
          </div>

          {/* Center: Title & Short Description */}
          <div className="space-y-2 px-2 my-auto">
            <h3 className="font-serif text-2xl md:text-[25px] font-normal text-[#182215] tracking-tight leading-snug">
              {sol.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#555148] font-sans leading-relaxed line-clamp-3 max-w-xs mx-auto">
              {sol.description}
            </p>
          </div>

          {/* Bottom: Minimalist Underline Link (CHỈ CLICK VÀO DÒNG LINK NÀY MỚI CHUYỂN TRANG) */}
          <div className="w-full pt-2 flex justify-center shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore(sol.slug);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-sans font-medium text-[#182215] hover:text-[#2D4C23] border-b border-[#182215]/30 hover:border-[#2D4C23] pb-0.5 transition-all duration-300 cursor-pointer group/link"
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

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lắng nghe sự kiện cuộn: Khóa hover khi đang cuộn, chỉ mở lại sau 150ms khi dừng hẳn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Scroll-driven Horizontal Scroll: Tracking vertical progress through the tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Translates the horizontal track across X axis as user scrolls vertically
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section
      id="solutions-section"
      ref={sectionRef}
      className="relative h-[260vh] sm:h-[300vh] bg-[#FAF8F1] overflow-hidden"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section Header: Centered Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 px-4 shrink-0">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-normal tracking-tight text-[#182215] leading-tight">
            Whatever type of place you have
            <br />
            in mind
          </h2>
        </div>

        {/* Scroll-driven Horizontal Track (Wide cards with viewport edge bleed) */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-5 md:gap-6 pl-4 sm:pl-8 lg:pl-16 pr-8 lg:pr-24 w-max"
          >
            {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
              <Archetype3DCard
                key={sol.id}
                sol={sol}
                onLearnMore={openSolutionDetail}
                isScrolling={isScrolling}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default UseCaseSelector;

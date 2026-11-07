import React, { useState, useRef, useEffect } from 'react';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Character Line Art SVGs matching exact frames from Banghi.mp4 (p3_36s, p3_40s, p3_42s)
const CharacterIllustrations: Record<string, React.ReactNode> = {
  // 1. Starter Home: Man kneeling with watering can watering small house with flower blooming on roof
  'starter-home': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      {/* Little House being watered */}
      <polygon points="105 125, 120 108, 135 125" fill="#E8F0DC" />
      <rect x="110" y="125" width="20" height="15" fill="#FFFFFF" />
      <rect x="115" y="132" width="6" height="8" fill="#4D6D3A" />
      <rect x="123" y="127" width="5" height="5" />
      {/* Flower sprouting from chimney/roof */}
      <path d="M 120 108 Q 122 96, 126 90" strokeWidth="1.6" />
      <circle cx="126" cy="88" r="3.5" fill="#D2E2B0" />
      <path d="M 126 84 L 126 92 M 122 88 L 130 88" strokeWidth="1.2" />
      {/* Water droplets */}
      <line x1="98" y1="108" x2="105" y2="116" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      <line x1="95" y1="112" x2="102" y2="120" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      <line x1="92" y1="116" x2="99" y2="124" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
      {/* Watering Can */}
      <path d="M 82 108 L 94 104 L 98 108 L 86 112 Z" fill="#E8F0DC" />
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
      <ellipse cx="72" cy="132" rx="7" ry="3" fill="#4D6D3A" />
      <ellipse cx="90" cy="130" rx="6" ry="3" fill="#4D6D3A" />
      <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 2. Forever Home: Family looking towards countryside homes
  'forever-home': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      {/* Background Country Houses on hill */}
      <path d="M 80 85 Q 115 75, 145 88" strokeDasharray="2 2" strokeWidth="1" />
      <polygon points="110 75, 120 66, 130 75" fill="#E8F0DC" />
      <rect x="113" y="75" width="14" height="10" fill="#FFFFFF" />
      <polygon points="132 78, 138 72, 144 78" fill="#E8F0DC" />
      <rect x="134" y="78" width="8" height="8" fill="#FFFFFF" />
      <circle cx="106" cy="74" r="4" strokeDasharray="1.5 1.5" fill="#D2E2B0" />
      <circle cx="147" cy="76" r="3" strokeDasharray="1.5 1.5" fill="#D2E2B0" />
      {/* Father (Center) */}
      <circle cx="72" cy="72" r="9" />
      <path d="M 70 70 L 76 70" />
      <circle cx="70" cy="71" r="2.5" />
      <circle cx="76" cy="71" r="2.5" />
      <path d="M 62 82 Q 72 79, 82 82 L 84 116 L 60 116 Z" fill="#E8F0DC" />
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
      <path d="M 96 104 Q 102 102, 108 104 L 106 130 L 96 130 Z" fill="#E8F0DC" />
      <path d="M 45 138 Q 90 134, 135 138" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 3. Second Home: Person relaxing on sun lounger with sunglasses by water
  'second-home': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      <circle cx="50" cy="45" r="5" fill="#D2E2B0" />
      <line x1="50" y1="36" x2="50" y2="33" />
      <line x1="50" y1="54" x2="50" y2="57" />
      <line x1="41" y1="45" x2="38" y2="45" />
      <line x1="59" y1="45" x2="62" y2="45" />
      <polygon points="40 76, 50 68, 60 76" fill="#E8F0DC" />
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
      <rect x="124" y="86" width="9" height="4" rx="1.5" fill="#4D6D3A" />
      <path d="M 122 95 Q 112 102, 100 108 L 94 116 Q 106 114, 118 105 Z" fill="#E8F0DC" />
      <path d="M 94 116 Q 84 118, 72 118" strokeWidth="1.8" />
      <path d="M 72 118 Q 68 114, 68 122" strokeWidth="1.5" />
      <path d="M 112 120 Q 118 114, 124 120 L 122 130 L 110 130 Z" fill="#D2E2B0" />
      <path d="M 45 136 Q 95 134, 145 136" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 4. Hybrid Home: Person walking, split between country nature and modern city
  'hybrid-home': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      <line x1="80" y1="35" x2="80" y2="135" strokeDasharray="3 3" strokeWidth="1.2" />
      {/* Left: Nature */}
      <path d="M 35 110 Q 55 98, 80 106" strokeWidth="1" />
      <circle cx="50" cy="98" r="6" fill="#D2E2B0" />
      <line x1="50" y1="104" x2="50" y2="114" />
      <path d="M 52 58 Q 56 52, 60 58 Q 64 52, 68 58" strokeWidth="1.2" />
      <path d="M 40 70 Q 44 66, 42 74" />
      {/* Right: City Highrises */}
      <rect x="86" y="55" width="22" height="60" fill="#E8F0DC" />
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
      <path d="M 74 80 L 86 80 L 84 105 L 76 105 Z" fill="#E8F0DC" />
      <path d="M 76 105 Q 68 116, 62 128" strokeWidth="1.8" />
      <path d="M 84 105 Q 92 116, 100 126" strokeWidth="1.8" />
      <ellipse cx="60" cy="129" rx="5" ry="2.5" fill="#4D6D3A" />
      <ellipse cx="102" cy="127" rx="5" ry="2.5" fill="#4D6D3A" />
    </svg>
  ),

  // 5. ADU: Woman juggling two mini houses in mid-air
  'adu': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      <g transform="translate(38, 48) rotate(-15)">
        <polygon points="10 18, 20 8, 30 18" fill="#D2E2B0" />
        <rect x="13" y="18" width="14" height="12" fill="#FFFFFF" />
        <rect x="17" y="22" width="4" height="4" fill="#4D6D3A" />
      </g>
      <path d="M 52 82 Q 46 64, 52 48" strokeDasharray="2 2" strokeWidth="1" />
      <g transform="translate(102, 48) rotate(15)">
        <polygon points="10 18, 20 8, 30 18" fill="#E8F0DC" />
        <rect x="13" y="18" width="14" height="12" fill="#FFFFFF" />
        <rect x="19" y="22" width="4" height="4" fill="#4D6D3A" />
      </g>
      <path d="M 108 82 Q 114 64, 108 48" strokeDasharray="2 2" strokeWidth="1" />
      {/* Woman figure */}
      <circle cx="80" cy="74" r="9" />
      <circle cx="76" cy="74" r="3" />
      <circle cx="84" cy="74" r="3" />
      <line x1="79" y1="74" x2="81" y2="74" />
      <ellipse cx="80" cy="62" rx="5" ry="4" fill="#E8F0DC" />
      <path d="M 76 79 Q 80 84, 84 79" strokeWidth="1.2" />
      <path d="M 72 84 Q 80 88, 88 84 Q 86 92, 80 92 Q 74 92, 72 84" fill="#D2E2B0" />
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
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      {/* Upper Module being placed */}
      <g transform="translate(10, -8)">
        <polygon points="80 50, 116 50, 110 64, 74 64" fill="#D2E2B0" />
        <rect x="74" y="64" width="36" height="14" fill="#FFFFFF" />
        <line x1="82" y1="68" x2="88" y2="68" />
        <line x1="96" y1="68" x2="102" y2="68" />
      </g>
      {/* Hands holding the module */}
      <path d="M 132 40 Q 124 48, 114 52" strokeWidth="1.6" />
      <path d="M 134 46 Q 126 52, 118 56" strokeWidth="1.3" />
      <path d="M 136 52 Q 128 58, 122 60" strokeWidth="1.3" />
      {/* Lower Main Building with stippling and terraced base */}
      <polygon points="50 96, 75 80, 125 80, 150 96" fill="#E8F0DC" />
      <rect x="52" y="96" width="96" height="32" fill="#FFFFFF" />
      {/* Windows & Door */}
      <rect x="62" y="104" width="16" height="12" fill="#E8F0DC" />
      <rect x="86" y="104" width="16" height="12" fill="#E8F0DC" />
      <rect x="118" y="102" width="14" height="26" fill="#4D6D3A" />
      {/* Motion lines */}
      <path d="M 64 66 Q 60 72, 64 78" strokeDasharray="1.5 2" />
      <path d="M 126 66 Q 130 72, 126 78" strokeDasharray="1.5 2" />
      <path d="M 40 138 Q 95 135, 150 138" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),

  // 7. Micro-Hospitality: Two hands holding organic plot with cabins nestled in nature (p3_42s)
  'micro-hospitality': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      {/* Hands cradling landscape */}
      <path d="M 80 134 C 60 134, 45 120, 50 98 L 56 104" strokeWidth="1.6" />
      <path d="M 80 134 C 100 134, 115 120, 110 98 L 104 104" strokeWidth="1.6" />
      {/* Floating Island Parcel */}
      <ellipse cx="80" cy="98" rx="42" ry="14" fill="#E8F0DC" />
      {/* Cabins on the island */}
      <polygon points="62 88, 70 78, 78 88" fill="#D2E2B0" />
      <rect x="65" y="88" width="10" height="8" fill="#FFFFFF" />
      <polygon points="82 84, 92 72, 102 84" fill="#FFFFFF" />
      <rect x="85" y="84" width="14" height="11" fill="#4D6D3A" />
      {/* Pine Trees on island */}
      <polygon points="54 84, 57 76, 60 84" fill="#4D6D3A" />
      <polygon points="106 86, 110 77, 114 86" fill="#4D6D3A" />
      {/* Foliage swirls */}
      <path d="M 42 70 Q 48 64, 52 72" strokeDasharray="1.5 2" />
      <path d="M 112 64 Q 118 58, 122 66" strokeDasharray="1.5 2" />
    </svg>
  ),

  // 8. Multi-Gen Compound: Multi-building cluster on rural meadow (p3_42s)
  'multi-generation-compound': (
    <svg className="w-52 h-52 text-[#4D6D3A] stroke-current fill-none stroke-[1.35]" viewBox="0 0 160 160">
      {/* Main Gabled Pavilion */}
      <polygon points="46 92, 62 74, 78 92" fill="#D2E2B0" />
      <rect x="50" y="92" width="24" height="24" fill="#FFFFFF" />
      <rect x="58" y="100" width="8" height="16" fill="#4D6D3A" />
      {/* Guest Wing Pavilion */}
      <polygon points="82 86, 100 68, 118 86" fill="#E8F0DC" />
      <rect x="86" y="86" width="28" height="30" fill="#FFFFFF" />
      <rect x="92" y="94" width="8" height="8" fill="#E8F0DC" />
      {/* Studio ADU Pavilion */}
      <polygon points="120 102, 132 88, 144 102" fill="#FFFFFF" />
      <rect x="123" y="102" width="18" height="16" fill="#D2E2B0" />
      {/* Connecting garden pathways */}
      <path d="M 74 112 Q 80 114, 86 112" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M 114 112 Q 118 114, 123 112" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Surrounding landscape */}
      <path d="M 35 134 Q 90 130, 145 134" strokeDasharray="3 3" strokeWidth="1" />
    </svg>
  ),
};

export const UseCaseSelector: React.FC = () => {
  const { filterSolutionSlug, setFilterSolutionSlug, openSolutionDetail } = useConfiguratorStore();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [scrollPos, setScrollPos] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state for desktop trackpad/mouse
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Monitor horizontal scroll to drive smooth 3D Y-Axis Cylindrical Rotation
  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPos(carouselRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle 3D card flip
  const toggleFlip = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const handleSelectSolution = (slug: string) => {
    if (filterSolutionSlug === slug) {
      setFilterSolutionSlug(null);
    } else {
      setFilterSolutionSlug(slug);
    }

    const el = document.getElementById('standards-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    carouselRef.current.scrollLeft = startScrollLeft - walk;
  };

  return (
    <section id="solutions-section" className="py-24 bg-tie-bg overflow-hidden border-b border-tie-border/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered Editorial Serif matching Banghi.mp4 p3_36s) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-tie-ink leading-tight">
            Whatever type of place you have
            <br />
            in mind
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center justify-end space-x-2 mb-4 px-2">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF8F5] border border-tie-border shadow-xs flex items-center justify-center text-tie-ink transition-colors active:scale-95"
            title="Scroll Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF8F5] border border-tie-border shadow-xs flex items-center justify-center text-tie-ink transition-colors active:scale-95"
            title="Scroll Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3D PERSPECTIVE CAROUSEL CONTAINER (Cylindrical 3D Scroll Depth) */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex space-x-6 overflow-x-auto pb-10 pt-4 px-4 scrollbar-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            perspective: '1400px',
            perspectiveOrigin: 'center center',
          }}
        >
          {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution, index: number) => {
            const isFlipped = Boolean(flippedCards[sol.slug]);
            const isSelected = filterSolutionSlug === sol.slug;

            // Calculate dynamic 3D Y-Axis Tilt based on horizontal position (Banghi.mp4 3D effect)
            const cardStep = 344; // Card width (320px) + Gap (24px)
            const cardLeftInView = index * cardStep - scrollPos;

            let tiltY = 0;
            let scale = 1;
            let opacity = 1;

            if (cardLeftInView < 40) {
              const ratio = Math.min(1, Math.max(0, (40 - cardLeftInView) / cardStep));
              tiltY = -ratio * 52; // Rotates backwards up to -52deg along Y-axis on the left edge
              scale = 1 - ratio * 0.12; // Gently reduces scale to 0.88
              opacity = 1 - ratio * 0.35; // Fades smoothly into the distance
            }

            return (
              <div
                key={sol.id}
                className="shrink-0 snap-center w-[290px] sm:w-[320px] h-[430px]"
                style={{
                  perspective: '1200px',
                  transformOrigin: 'left center',
                  transform: `rotateY(${tiltY}deg) scale(${scale})`,
                  opacity: opacity,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
                }}
              >
                {/* 3D Flippable Inner Card Container */}
                <div
                  className={`relative w-full h-full transition-transform duration-700 ease-out preserve-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleFlip(sol.slug)}
                >
                  
                  {/* FRONT SIDE: Minimalist White Card (Images 3, 4, 5) */}
                  <div
                    className={`absolute inset-0 backface-hidden rounded-3xl bg-white border p-6 sm:p-7 flex flex-col items-center justify-between text-center shadow-tie-soft transition-all duration-300 hover:shadow-tie-card ${
                      isSelected
                        ? 'border-tie-pine ring-2 ring-tie-pine bg-tie-pine/[0.02]'
                        : 'border-[#EBE7DF] hover:border-tie-pine/50'
                    }`}
                  >
                    {/* Top Pill / Subtitle Tag */}
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-tie-muted">
                      <span>0{index + 1} &bull; ARCHETYPE</span>
                      <span className="text-tie-pine font-semibold tracking-wider hover:underline">
                        FLIP &rarr;
                      </span>
                    </div>

                    {/* Whimsical Character Line Art (Matching Banghi.mp4 frames) */}
                    <div className="my-auto py-2 transition-transform duration-500 hover:scale-105">
                      {CharacterIllustrations[sol.slug] || (
                        <div className="w-48 h-48 flex items-center justify-center text-tie-pine">
                          <svg className="w-32 h-32 stroke-current fill-none" viewBox="0 0 64 64">
                            <polygon points="12 44, 32 20, 52 44" strokeWidth="1.5" />
                            <rect x="24" y="32" width="16" height="12" strokeWidth="1.5" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Bottom Label (Exact Centered Serif as in Banghi.mp4) */}
                    <div className="w-full pt-3">
                      <h3
                        onClick={(e) => {
                          e.stopPropagation();
                          openSolutionDetail(sol.slug);
                        }}
                        className="font-serif text-2xl font-normal text-tie-ink tracking-tight hover:text-[#567D42] transition-colors cursor-pointer"
                        title={`View ${sol.title} story & details`}
                      >
                        {sol.title}
                      </h3>
                    </div>
                  </div>

                  {/* BACK SIDE: 3D Flipped Specifications & Action (Image 4) */}
                  <div
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white border border-tie-pine p-6 sm:p-7 flex flex-col justify-between text-left shadow-tie-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-tie-border pb-3">
                        <span className="font-serif text-xl font-bold text-tie-ink">
                          {sol.title}
                        </span>
                        <button
                          onClick={(e) => toggleFlip(sol.slug, e)}
                          className="p-1 rounded-full text-tie-muted hover:text-tie-ink hover:bg-tie-surface transition-colors"
                          title="Flip back"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-tie-muted font-sans leading-relaxed">
                        {sol.description}
                      </p>

                      {/* Specs Pill List */}
                      <div className="space-y-2 pt-2 text-xs font-mono">
                        <div className="flex justify-between text-tie-muted">
                          <span>IDEAL STANDARDS:</span>
                          <span className="font-semibold text-tie-ink">
                            {sol.idealPlans?.join(', ').toUpperCase() || 'ADU, DOGTROT'}
                          </span>
                        </div>
                        <div className="flex justify-between text-tie-muted">
                          <span>TARGET TIMELINE:</span>
                          <span className="font-semibold text-tie-pine">16–22 WEEKS</span>
                        </div>
                        <div className="flex justify-between text-tie-muted">
                          <span>ESTIMATED BUDGET:</span>
                          <span className="font-semibold text-tie-terracotta">
                            ${(sol.recommendedBudget.min / 1000).toFixed(0)}K – ${(sol.recommendedBudget.max / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions on Back */}
                    <div className="space-y-2 pt-3 border-t border-tie-border">
                      <button
                        onClick={() => openSolutionDetail(sol.slug)}
                        className="w-full py-2.5 px-4 rounded-full bg-[#183D24] hover:bg-[#122A1A] text-white text-xs font-mono font-semibold transition-all flex items-center justify-center space-x-2 shadow-xs"
                      >
                        <span>Explore Story & Plans</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleSelectSolution(sol.slug)}
                        className="w-full py-2 px-4 rounded-full border border-tie-border hover:border-tie-pine text-tie-ink text-xs font-mono transition-all flex items-center justify-center space-x-1"
                      >
                        <span>Filter The Standards</span>
                      </button>

                      <button
                        onClick={(e) => toggleFlip(sol.slug, e)}
                        className="w-full py-1 text-[11px] font-mono text-tie-muted hover:text-tie-ink text-center"
                      >
                        Flip back to illustration
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default UseCaseSelector;

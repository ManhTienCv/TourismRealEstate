import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { StandardIsometricIllustrations } from './standards/StandardIsometricIllustrations';

// Authentic wide architectural photography & bed/bath specs matching HUTS
const STANDARDS_GALLERY = [
  {
    slug: 'small-bar',
    cleanName: 'Small Bar',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
    beds: '1',
    baths: '1',
  },
  {
    slug: 'medium-bar',
    cleanName: 'Medium Bar',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85',
    beds: '2',
    baths: '2',
  },
  {
    slug: 'big-bar',
    cleanName: 'Big Bar',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1400&q=85',
    beds: '3',
    baths: '2.5',
  },
  {
    slug: 'dogtrot',
    cleanName: 'Dogtrot',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
    beds: '3',
    baths: '2',
  },
  {
    slug: 'small-l',
    cleanName: 'Small L',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    beds: '2',
    baths: '2',
  },
  {
    slug: 'big-l',
    cleanName: 'Big L',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    beds: '4',
    baths: '3.5',
  },
  {
    slug: 'village',
    cleanName: 'Village',
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=85',
    beds: '4',
    baths: '4',
  },
  {
    slug: 'adu',
    cleanName: 'ADU',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85',
    beds: '1',
    baths: '1',
  },
];

interface StandardCardItemProps {
  item: (typeof STANDARDS_GALLERY)[number];
  onPlanClick: (slug: string) => void;
  isScrolling: boolean;
}

const StandardCardItem: React.FC<StandardCardItemProps> = ({ item, onPlanClick, isScrolling }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Khi đang cuộn trang: Hủy ngay bộ đếm lật thẻ và úp lại mặt trước
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
    // Nếu đang cuộn trang hoặc đã lật hoặc đang có timer chờ thì không làm gì
    if (isScrolling || isFlipped || hoverTimerRef.current) return;

    // Hover Intent: Giữ chuột trên thẻ 200ms mới lật 3D
    hoverTimerRef.current = setTimeout(() => {
      setIsFlipped(true);
      hoverTimerRef.current = null;
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsFlipped(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const IsoComponent = StandardIsometricIllustrations[item.slug];

  return (
    <div
      onClick={() => onPlanClick(item.slug)}
      className="shrink-0 w-[360px] md:w-[390px] cursor-pointer select-none group"
    >
      {/* Khung ảnh lật 3D: CHỈ lật phần khung ảnh (perspective: 1200px) */}
      <div
        onMouseEnter={handleMouseEnterOrMove}
        onMouseMove={handleMouseEnterOrMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[320px] md:h-[345px] [perspective:1200px] mb-4 select-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out rounded-[20px] shadow-sm group-hover:shadow-md"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* MẶT TRƯỚC: Ảnh thực tế của ngôi nhà */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] rounded-[20px] overflow-hidden bg-[#FAF8F1] border border-[#DFDCD0]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <img
              src={item.imageUrl}
              alt={item.cleanName}
              className="w-full h-full object-cover select-none pointer-events-none rounded-[20px]"
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* MẶT SAU: Mô hình kiến trúc 3D Isometric + 2 Pill thông số Bed/Bath */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-[#FAF8F1] border border-[#DFDCD0] rounded-[20px] p-6 relative flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Hình vẽ mô hình kiến trúc 3D Isometric nét mảnh chính giữa */}
            <div className="w-[78%] h-[78%] flex items-center justify-center pointer-events-none select-none">
              {IsoComponent ? (
                <IsoComponent className="w-full h-full object-contain pointer-events-none select-none" />
              ) : null}
            </div>

            {/* Góc dưới bên trái: 2 pill thông số Bed & Bath */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 text-[11px] font-medium text-[#182215] bg-white/70 border border-[#DFDCD0] rounded-full">
                {item.beds} Bed
              </span>
              <span className="px-3 py-1 text-[11px] font-medium text-[#182215] bg-white/70 border border-[#DFDCD0] rounded-full">
                {item.baths} Bath
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dòng chữ tên mẫu nhà BÊN NGOÀI bên dưới khung lật: đổi màu xanh lá khi isFlipped === true */}
      <h3
        className={`font-serif text-[28px] md:text-[30px] font-normal tracking-tight transition-colors duration-300 ${
          isFlipped ? 'text-[#5E8C31]' : 'text-[#182215]'
        }`}
      >
        {item.cleanName}
      </h3>
    </div>
  );
};

export const StandardsCatalogGrid: React.FC = () => {
  const { openPlanDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Theo dõi sự kiện cuộn trang để hủy lật thẻ khi đang cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 250vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-54%']);

  const handlePlanClick = (slug: string) => {
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    }
  };

  return (
    <section
      ref={containerRef}
      id="standards-section"
      className="relative w-full h-[250vh] bg-[#FAF8F1]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center select-none pt-8 sm:pt-12 pb-4">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto px-4 shrink-0">
          <h2 className="font-serif text-[40px] sm:text-[48px] lg:text-[56px] font-normal tracking-tight text-[#182215] leading-[1.12] mb-3">
            It all starts with our Standards...
          </h2>
          <p className="text-[13px] md:text-[14px] leading-[1.55] text-[#2C3527] max-w-[540px] mx-auto text-center mb-10">
            They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
          </p>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-8 sm:pl-16 lg:pl-20 pr-8 sm:pr-16 lg:pr-20 items-center shrink-0 w-max"
          >
            {STANDARDS_GALLERY.map((item) => (
              <StandardCardItem
                key={item.slug}
                item={item}
                onPlanClick={handlePlanClick}
                isScrolling={isScrolling}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default StandardsCatalogGrid;

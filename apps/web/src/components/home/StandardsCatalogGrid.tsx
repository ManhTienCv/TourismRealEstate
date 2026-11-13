import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { StandardIsometricIllustrations } from './standards/StandardIsometricIllustrations';

// Authentic wide architectural photography & 3D Axonometrics from HUTS Sanity CDN
const STANDARDS_GALLERY = [
  {
    slug: 'small-bar',
    cleanName: 'Small Bar',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/49b12a1c850a40727ce6b5d105d21a8459c35389-858x858.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/1d09b3431c239b3ac09deae6e4eb0d2ee9a4028a-2275x1880.jpg?w=1920&q=85&auto=format',
    beds: '1',
    baths: '1',
  },
  {
    slug: 'medium-bar',
    cleanName: 'Medium Bar',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/22e392c4e767684a13df77fed0553694c7b59ae6-2099x2099.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/68694549ea2c06f3fd73841fcc746d31cb0cd397-4800x4416.jpg?w=1920&q=85&auto=format',
    beds: '2',
    baths: '2',
  },
  {
    slug: 'big-bar',
    cleanName: 'Big Bar',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/7d481791d6139e5f98a1455da75f6e3d63abf1d9-2233x2105.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/c85860ab65562ce2a2cbdab7d3d345278b9447aa-4800x3955.jpg?w=1920&q=85&auto=format',
    beds: '3',
    baths: '2.5',
  },
  {
    slug: 'dogtrot',
    cleanName: 'Dogtrot',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/b74ce20f2f5f1cae50eef9cdbc6a726ab8d382db-564x383.png?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/aab572bff3627e669f2b551ad1694bb679e8998e-4800x4338.jpg?w=1920&q=85&auto=format',
    beds: '3',
    baths: '2',
  },
  {
    slug: 'small-l',
    cleanName: 'Small L',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/a7b6ffca0d4814f1354cd42e4563a1f43d03e4fd-2061x1932.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/d48224c53a662c3822c5a4991cf1eecbddbd3c77-4800x3965.jpg?w=1920&q=85&auto=format',
    beds: '2',
    baths: '2',
  },
  {
    slug: 'big-l',
    cleanName: 'Big L',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/94475e5020164a6f8ab9320e043f250b2000eb0d-772x703.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/566719422aa173d3ef049f99c5d3908c5d0bd003-4281x2808.jpg?w=1920&q=85&auto=format',
    beds: '4',
    baths: '3.5',
  },
  {
    slug: 'village',
    cleanName: 'Village',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/9ee66c5354de48ceb7b2c5e456303301ef947fbe-2367x2160.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/03e0167e89b28dc8472022956e8f7d95f1f61698-4800x3827.jpg?w=1920&q=85&auto=format',
    beds: '4',
    baths: '4',
  },
  {
    slug: 'adu',
    cleanName: 'ADU',
    imageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/12b724bfd8e075d0f39a1351f31264a32328f433-1467x1410.jpg?w=1920&q=85&auto=format',
    axonImageUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/7cf70fd6532c49b49c69b70800720dc4cbdd680d-1618x1602.png?w=1920&q=85&auto=format',
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
          className="relative w-full h-full [transform-style:preserve-3d] rounded-[17.5px] shadow-sm group-hover:shadow-md card-inner"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.125)',
          }}
        >
          {/* MẶT TRƯỚC: Ảnh thực tế của ngôi nhà (Sanity CDN High-Res) */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] rounded-[17.5px] overflow-hidden bg-[#FAF8F1] border border-[#DFDCD0]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <img
              src={item.imageUrl}
              alt={item.cleanName}
              className="w-full h-full object-cover select-none pointer-events-none rounded-[17.5px]"
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* MẶT SAU: Mô hình kiến trúc 3D Axonometric từ Sanity CDN + 2 Pill thông số Bed/Bath */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-[#FAF8F1] border border-[#DFDCD0] rounded-[17.5px] p-5 relative flex items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Hình vẽ mô hình kiến trúc 3D Axonometric từ Sanity CDN */}
            <div className="w-[88%] h-[88%] flex items-center justify-center pointer-events-none select-none">
              {item.axonImageUrl ? (
                <img
                  src={item.axonImageUrl}
                  alt={`${item.cleanName} 3D Axonometric`}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  loading="lazy"
                  draggable={false}
                />
              ) : IsoComponent ? (
                <IsoComponent className="w-full h-full object-contain pointer-events-none select-none" />
              ) : null}
            </div>

            {/* Góc dưới bên trái: 2 pill thông số Bed & Bath */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 text-[11px] font-medium text-[#0C310A] bg-white/80 backdrop-blur-xs border border-[#DFDCD0] rounded-full shadow-xs">
                {item.beds} Bed
              </span>
              <span className="px-3 py-1 text-[11px] font-medium text-[#0C310A] bg-white/80 backdrop-blur-xs border border-[#DFDCD0] rounded-full shadow-xs">
                {item.baths} Bath
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dòng chữ tên mẫu nhà BÊN NGOÀI bên dưới khung lật: đổi màu xanh lá khi isFlipped === true */}
      <h3
        className={`font-serif text-[26px] sm:text-[28px] md:text-[33px] font-normal tracking-[-0.02em] leading-[1.1] transition-colors duration-300 ${
          isFlipped ? 'text-[#5E8C31]' : 'text-[#0C310A]'
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
          <h2 className="font-serif text-[38px] sm:text-[44px] font-normal tracking-[-0.01em] text-[#0C310A] leading-[1.0] mb-3">
            It all starts with our Standards...
          </h2>
          <p className="text-[13px] md:text-[14px] leading-[1.55] text-[#664A42] max-w-[540px] mx-auto text-center mb-10">
            They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
          </p>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x, willChange: 'transform', transition: 'none' }}
            className="flex gap-[17.5px] px-[31.4px] items-center shrink-0 w-max h-scroll-content"
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

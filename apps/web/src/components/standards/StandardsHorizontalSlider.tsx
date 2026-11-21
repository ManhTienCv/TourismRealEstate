import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

export interface StandardsSliderItem {
  slug: string;
  title: string;
  thumbnail: string;
  floorplan: string;
  tags: string[];
}

export interface StandardsHorizontalSliderProps {
  title: string;
  items: StandardsSliderItem[];
}

export const StandardsHorizontalSlider: React.FC<StandardsHorizontalSliderProps> = ({
  title,
  items,
}) => {
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Khóa lật thẻ khi đang cuộn trang: úp thẻ lại và xóa timer
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setFlippedSlug(null);

      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  // Tính toán quãng đường trượt ngang maxTranslate
  useEffect(() => {
    const updateDistance = () => {
      const trackEl = trackRef.current;
      const containerEl = containerRef.current || sectionRef.current;
      if (!trackEl || !containerEl) return;

      const dist = Math.max(0, trackEl.scrollWidth - containerEl.clientWidth);
      setMaxTranslate(dist);
    };

    updateDistance();

    const trackEl = trackRef.current;
    if (!trackEl) return;

    const ro = new ResizeObserver(updateDistance);
    ro.observe(trackEl);
    window.addEventListener('resize', updateDistance);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, [items]);

  // Cuộn dọc điều khiển trượt ngang sticky
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.2,
    restDelta: 0.0005,
  });

  const x = useTransform(smoothProgress, [0.01, 0.97], [0, -maxTranslate], { clamp: true });

  const handleCardMouseEnter = (slug: string) => {
    if (isScrollingRef.current) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        setFlippedSlug(slug);
      }
    }, 190);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setFlippedSlug(null);
  };

  const handleSelectStandard = (slug: string) => {
    openStandardDetail(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="card-slider relative w-full h-[260vh] md:h-[290vh] bg-[#FAF7ED]"
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-[100dvh] flex flex-col justify-center pt-16 pb-10 [overflow:clip]"
      >
        {/* Section Heading */}
        <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] text-center mb-8 md:mb-10 px-6">
          {title}
        </h3>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-[22px] px-6 md:px-16 w-max will-change-transform"
          >
            {items.map((item) => {
              const isFlipped = flippedSlug === item.slug;

              return (
                <div
                  key={item.slug}
                  className="w-[300px] md:w-[388px] shrink-0 flex flex-col gap-[18px] group select-none"
                >
                  {/* 3D Flip Card Frame */}
                  <div
                    className="aspect-square w-full rounded-[20px] [perspective:1000px] cursor-pointer"
                    onClick={() => handleSelectStandard(item.slug)}
                    onMouseEnter={() => handleCardMouseEnter(item.slug)}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div
                      className={`relative w-full h-full rounded-[20px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.125)] ${
                        isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                      }`}
                    >
                      {/* Mặt trước: CHỈ hiển thị ảnh thumbnail, TUYỆT ĐỐI KHÔNG gắn các nhãn tag đè lên mặt trước ảnh */}
                      <div className="card-front absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] -webkit-backface-visibility-hidden bg-white border border-[#D0D4C8] shadow-sm">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover select-none pointer-events-none"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>

                      {/* Mặt sau: Nền trắng #FFFFFF, viền border #57772E, bo góc 20px, padding p-6 pb-14, ảnh 3D Axonometric floorplan căn giữa và dãy nhãn tags ở đáy */}
                      <div className="card-back absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateY(180deg)] bg-[#FFFFFF] border border-[#57772E] p-6 pb-14 flex flex-col justify-center items-center shadow-sm relative">
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={item.floorplan}
                            alt={`${item.title} Floorplan`}
                            className="w-full h-full object-contain select-none pointer-events-none max-w-[320px] max-h-[280px]"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>

                        {/* Dãy nhãn tags gọn ở đáy mặt sau */}
                        <div className="absolute bottom-4 left-5 right-5 flex flex-wrap gap-1.5 z-10">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="bg-[#FFFDF6]/80 border border-[#D0D4C8] rounded-full px-3 py-1 text-[12px] text-[#1E1414] font-sans font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tên mẫu nhà h5 bên dưới thẻ: CĂN TRÁI, đổi màu sang #57772E khi thẻ đang lật */}
                  <h5
                    className={`text-left font-serif font-normal text-[24px] md:text-[28px] leading-[1.2] transition-colors duration-200 cursor-pointer ${
                      isFlipped ? 'text-[#57772E]' : 'text-[#0C310A]'
                    }`}
                    onClick={() => handleSelectStandard(item.slug)}
                  >
                    {item.title}
                  </h5>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

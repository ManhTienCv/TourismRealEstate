import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Archetype3DCard } from './usecase/Archetype3DCard';

export const UseCaseSelector: React.FC = () => {
  const { openSolutionDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  // State và refs kiểm soát Hover Intent (200ms) + Scroll Lock cho 3D flip card
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Khóa lật thẻ khi đang cuộn trang: úp thẻ lại ngay lập tức và hủy timer
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

  const handleCardMouseEnter = (slug: string) => {
    if (isScrollingRef.current || document.documentElement.classList.contains('lenis-scrolling')) {
      return;
    }
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current && !document.documentElement.classList.contains('lenis-scrolling')) {
        setFlippedSlug(slug);
      }
    }, 200);
  };

  const handleCardMouseMove = (slug: string) => {
    if (isScrollingRef.current || document.documentElement.classList.contains('lenis-scrolling')) {
      return;
    }
    if (flippedSlug !== slug && !hoverTimerRef.current) {
      hoverTimerRef.current = setTimeout(() => {
        if (!isScrollingRef.current && !document.documentElement.classList.contains('lenis-scrolling')) {
          setFlippedSlug(slug);
        }
      }, 200);
    }
  };

  const handleCardMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setFlippedSlug(null);
  };

  // Tính chính xác tổng quãng đường trượt ngang maxTranslateX = Math.max(0, trackEl.scrollWidth - containerEl.clientWidth)
  useEffect(() => {
    const trackEl = trackRef.current;
    const containerEl = containerRef.current;
    if (!trackEl || !containerEl) return;

    const updateDistance = () => {
      const maxTranslate = Math.max(0, trackEl.scrollWidth - containerEl.clientWidth);
      setMaxTranslateX(maxTranslate);
    };

    updateDistance();

    const ro = new ResizeObserver(updateDistance);
    ro.observe(trackEl);
    ro.observe(containerEl);
    window.addEventListener('resize', updateDistance);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 320vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Lọc scrollYProgress qua useSpring độ phản hồi cao để triệt tiêu bước nhảy con lăn chuột
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Ánh xạ smoothProgress trong khoảng [0.01, 0.97] với clamp: true
  // Quán tính dừng kịp trong 3% cuối hành trình (0.97 -> 1.0), loại bỏ đoạn cuộn chết
  const x = useTransform(smoothProgress, [0.01, 0.97], [0, -maxTranslateX], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="solutions-section"
      className="card-slider relative h-[320vh] bg-[#FAF7ED]"
    >
      {/* Scoped CSS để định hình chính xác kích thước tỷ lệ ~0.91 (10/11) của HUTS */}
      <style>{`
        #solutions-section .scroll-content {
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          padding-top: 96px !important;
          padding-bottom: 1.75rem !important; /* pb-7 (28px) */
          overflow: hidden !important;
          height: 100vh !important;
          height: 100dvh !important;
          box-sizing: border-box !important;
        }
        @media (min-width: 768px) {
          #solutions-section .scroll-content {
            padding-top: 104px !important; /* md:pt-[104px] */
            padding-bottom: 2.25rem !important; /* md:pb-9 (36px) */
          }
        }

        #solutions-section .heading-wrapper {
          max-width: 880px !important;
          margin: 0 auto !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          margin-bottom: 1.5rem !important; /* mb-6 */
          flex-shrink: 0 !important;
        }
        @media (min-width: 768px) {
          #solutions-section .heading-wrapper {
            margin-bottom: 2rem !important; /* md:mb-8 */
          }
        }

        #solutions-section .heading-wrapper h3 {
          font-size: 32px !important;
          line-height: 1.08 !important;
          letter-spacing: -0.03em !important;
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          color: #0C310A !important;
          text-align: center !important;
          max-width: 880px !important;
          margin: 0 auto !important;
          text-wrap: balance !important;
          font-feature-settings: 'kern' 1 !important;
          font-kerning: normal !important;
        }
        @media (min-width: 768px) {
          #solutions-section .heading-wrapper h3 {
            font-size: 46px !important;
          }
        }

        #solutions-section .h-scroll-container {
          flex: 1 1 0% !important;
          min-height: 0 !important;
          display: flex !important;
          align-items: center !important;
          height: auto !important;
          width: 100% !important;
          overflow: hidden !important;
        }

        #solutions-section .h-scroll-content {
          display: flex !important;
          align-items: center !important;
          column-gap: 20px !important; /* gap-[20px] */
          height: auto !important;
          padding-left: clamp(1.5rem, 4vw, 4.5rem) !important;
          padding-right: clamp(1.5rem, 4vw, 4.5rem) !important;
        }

        #solutions-section .card-wrapper {
          height: min(430px, 56dvh) !important;
          aspect-ratio: 10 / 11 !important;
          width: auto !important;
          flex-shrink: 0 !important;
          display: flex !important;
          flex-direction: column !important;
        }

        #solutions-section .card.illustration {
          width: 100% !important;
          height: 100% !important;
          aspect-ratio: 10 / 11 !important;
          max-height: none !important;
          border-radius: 22px !important;
        }

        #solutions-section .card.illustration .card-inner,
        #solutions-section .card.illustration .card-front,
        #solutions-section .card.illustration .card-back {
          border-radius: 22px !important;
        }

        #solutions-section .card.illustration .card-front {
          display: grid !important;
          grid-template-rows: 1fr auto !important;
          row-gap: 1rem !important; /* gap-4 (16px) */
          padding: 1.5rem !important; /* p-6 (24px) */
          box-sizing: border-box !important;
          background-color: #FAF8F1 !important;
          border: 1px solid #DFDCD0 !important;
          align-items: center !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front {
            padding: 2rem !important; /* md:p-8 (32px) */
          }
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper {
          width: 100% !important;
          height: 100% !important;
          min-height: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper figure {
          width: 100% !important;
          height: 100% !important;
          min-height: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper figure img {
          width: 82% !important;
          height: 82% !important;
          max-width: 260px !important;
          max-height: 245px !important;
          object-fit: contain !important;
          margin: auto !important;
        }

        #solutions-section .card.illustration .card-front .text-wrapper h5 {
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          font-size: 22px !important;
          line-height: 1.2 !important;
          letter-spacing: -0.02em !important;
          color: #0C310A !important;
          text-align: center !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front .text-wrapper h5 {
            font-size: 27px !important;
          }
        }

        #solutions-section .card.illustration .card-back {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          padding: 1.5rem !important; /* p-6 (24px) */
          box-sizing: border-box !important;
          background-color: #FAF8F1 !important;
          border: 1px solid #57772E !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back {
            padding: 2rem !important; /* md:p-8 (32px) */
          }
        }

        #solutions-section .card.illustration .card-back figure {
          height: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 0.5rem !important;
        }

        #solutions-section .card.illustration .card-back figure img {
          height: 88px !important;
          width: auto !important;
          object-fit: contain !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back figure img {
            height: 104px !important;
          }
        }

        #solutions-section .card.illustration .card-back .text-wrapper {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          margin: auto 0 !important;
        }

        #solutions-section .card.illustration .card-back .text-wrapper h5 {
          font-family: 'HW Cigars', Georgia, serif !important;
          font-size: 22px !important;
          font-weight: 400 !important;
          color: #0C310A !important;
          margin-bottom: 0.35rem !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back .text-wrapper h5 {
            font-size: 26px !important;
          }
        }

        #solutions-section .card.illustration .card-back .text-wrapper p {
          font-size: 14px !important;
          line-height: 1.4 !important;
          color: #664A42 !important;
          text-align: center !important;
        }

        #solutions-section .card.illustration .card-back a.button {
          margin-top: auto !important;
        }
      `}</style>

      {/* 100dvh sticky container with flex-col justify-between pt-[96px] md:pt-[104px] pb-7 md:pb-9 (né hoàn toàn Navbar) */}
      <div className="scroll-content sticky top-0 left-0 w-full h-[100dvh] flex flex-col justify-between pt-[96px] md:pt-[104px] pb-7 md:pb-9 overflow-hidden select-none">
        {/* Section Header */}
        <div className="heading-wrapper max-w-[880px] mx-auto px-6 mb-6 md:mb-8 shrink-0 text-center">
          <h3 className="text-[32px] md:text-[46px] leading-[1.08] tracking-[-0.03em] font-serif font-normal text-[#0C310A] text-center max-w-[880px] mx-auto text-balance">
            Whatever type of place you have <br className="hidden md:inline" />in mind
          </h3>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="h-scroll-container flex-1 min-h-0 flex items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="h-scroll-content flex items-center gap-[20px]"
          >
            {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => (
              <Archetype3DCard
                key={sol.id}
                sol={sol}
                isFlipped={flippedSlug === sol.slug}
                onMouseEnter={() => handleCardMouseEnter(sol.slug)}
                onMouseMove={() => handleCardMouseMove(sol.slug)}
                onMouseLeave={handleCardMouseLeave}
                onLearnMore={(slug) => {
                  openSolutionDetail(slug);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSelector;

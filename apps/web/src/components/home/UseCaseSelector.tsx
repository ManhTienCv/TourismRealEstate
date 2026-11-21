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
      {/* Scoped CSS để định hình chính xác kích thước tỷ lệ ~0.875 (7/8) của HUTS */}
      <style>{`
        #solutions-section .scroll-content {
          display: grid !important;
          grid-template-rows: auto 1fr !important;
          row-gap: clamp(1.75rem, 1.5vw + 1.4rem, 2.75rem) !important;
          padding-top: clamp(3rem, 3.38vw + 2.2rem, 4.75rem) !important;
          padding-bottom: clamp(1.75rem, 1.8vw + 1.25rem, 2.75rem) !important;
          overflow: hidden !important;
          height: 100vh !important;
          height: 100dvh !important;
          box-sizing: border-box !important;
        }

        #solutions-section .heading-wrapper {
          max-width: 920px !important;
          margin: 0 auto !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          flex-shrink: 0 !important;
        }

        #solutions-section .heading-wrapper h3 {
          font-size: clamp(1.75rem, 2.63vw + 1.13rem, 3.5rem) !important;
          line-height: 1.1 !important;
          letter-spacing: -0.03em !important;
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          color: #0C310A !important;
          text-align: center !important;
          max-width: 920px !important;
          margin: 0 auto !important;
          text-wrap: balance !important;
          font-feature-settings: 'kern' 1 !important;
          font-kerning: normal !important;
        }

        #solutions-section .h-scroll-container {
          min-height: 0 !important;
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          width: 100% !important;
          overflow: hidden !important;
        }

        #solutions-section .h-scroll-content {
          display: flex !important;
          align-items: center !important;
          column-gap: 22px !important; /* gap-[22px] */
          height: auto !important;
          padding-left: clamp(1.5rem, 4vw, 4.5rem) !important;
          padding-right: clamp(1.5rem, 4vw, 4.5rem) !important;
        }

        #solutions-section .card-wrapper {
          height: min(485px, 59dvh) !important;
          aspect-ratio: 7 / 8 !important;
          width: auto !important;
          flex-shrink: 0 !important;
          display: flex !important;
          flex-direction: column !important;
        }

        #solutions-section .card.illustration {
          width: 100% !important;
          height: 100% !important;
          aspect-ratio: 7 / 8 !important;
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
          row-gap: 1.25rem !important; /* gap-5 (20px) */
          padding: 1.75rem !important; /* p-7 (28px) */
          box-sizing: border-box !important;
          background-color: #FAF8F1 !important;
          border: 1px solid #DFDCD0 !important;
          align-items: center !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front {
            padding: 2.25rem !important; /* md:p-9 (36px) */
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
          overflow: hidden !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper figure img {
          width: 100% !important;
          height: 100% !important;
          max-width: 92% !important;
          max-height: 92% !important;
          object-fit: contain !important;
          margin: auto !important;
        }

        #solutions-section .card.illustration .card-front .text-wrapper {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        #solutions-section .card.illustration .card-front .text-wrapper h5 {
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          font-size: clamp(1.375rem, 0.94vw + 1.15rem, 2rem) !important;
          line-height: 1.2 !important;
          letter-spacing: -0.025em !important;
          color: #0C310A !important;
          text-align: center !important;
        }

        #solutions-section .card.illustration .card-back {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          padding: 1.75rem !important; /* p-7 (28px) */
          box-sizing: border-box !important;
          background-color: #FAF8F1 !important;
          border: 1px solid #57772E !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back {
            padding: 2.25rem !important; /* md:p-9 (36px) */
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
          font-size: clamp(1.375rem, 0.94vw + 1.15rem, 1.85rem) !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          letter-spacing: -0.025em !important;
          color: #0C310A !important;
          margin-bottom: 0.35rem !important;
          text-align: center !important;
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

      {/* 100dvh sticky container with grid-rows-[auto_1fr] chuẩn HUTS */}
      <div className="scroll-content sticky top-0 left-0 w-full h-[100dvh] grid grid-rows-[auto_1fr] gap-[clamp(1.75rem,1.5vw+1.4rem,2.75rem)] pt-[clamp(3rem,3.38vw+2.2rem,4.75rem)] pb-[clamp(1.75rem,1.8vw+1.25rem,2.75rem)] overflow-hidden select-none">
        {/* Section Header */}
        <div className="heading-wrapper max-w-[920px] mx-auto px-6 shrink-0 text-center">
          <h3 className="text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] font-serif font-normal text-[#0C310A] text-center max-w-[920px] mx-auto text-balance">
            Whatever type of place you have <br className="hidden md:inline" />in mind
          </h3>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="h-scroll-container flex items-center min-h-0 w-full">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="h-scroll-content flex items-center gap-[22px]"
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

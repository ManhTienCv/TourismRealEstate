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
    stiffness: 160,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Ánh xạ smoothProgress trong khoảng [0.04, 0.86] với clamp: true
  // 14% cuối hành trình (0.86 -> 1.0) hãm phanh giúp useSpring dừng hẳn trước khi nhả sticky
  const x = useTransform(smoothProgress, [0.04, 0.86], [0, -maxTranslateX], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="solutions-section"
      className="card-slider relative h-[320vh] bg-[#FAF7ED]"
    >
      {/* Scoped CSS để định hình chính xác kích thước pixel thực tế của HUTS */}
      <style>{`
        #solutions-section .scroll-content {
          display: grid !important;
          grid-template-rows: auto 1fr !important;
          gap: 2rem !important; /* gap-8 (32px) */
          padding-top: 3.5rem !important; /* pt-14 (56px) */
          padding-bottom: 2rem !important; /* pb-8 (32px) */
          overflow: hidden !important;
          height: 100vh !important;
          height: 100dvh !important;
          box-sizing: border-box !important;
        }
        @media (min-width: 768px) {
          #solutions-section .scroll-content {
            gap: 36px !important; /* md:gap-[36px] */
            padding-top: 60px !important; /* md:pt-[60px] */
            padding-bottom: 42px !important; /* md:pb-[42px] */
          }
        }

        #solutions-section .heading-wrapper h3 {
          font-size: 32px !important;
          line-height: 1.1 !important;
          letter-spacing: -0.025em !important;
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          color: #0C310A !important;
          text-align: center !important;
          max-width: 740px !important;
          margin: 0 auto !important;
          text-wrap: balance !important;
          font-feature-settings: 'kern' 1 !important;
          font-kerning: normal !important;
        }
        @media (min-width: 768px) {
          #solutions-section .heading-wrapper h3 {
            font-size: 47.5px !important;
          }
        }

        #solutions-section .h-scroll-container {
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          overflow: hidden !important;
        }

        #solutions-section .h-scroll-content {
          display: flex !important;
          align-items: center !important;
          column-gap: 22px !important;
          height: 100% !important;
          padding-left: clamp(1.5rem, 4vw, 4.5rem) !important;
          padding-right: clamp(1.5rem, 4vw, 4.5rem) !important;
        }

        #solutions-section .card-wrapper {
          width: 300px !important;
          height: 380px !important;
          flex-shrink: 0 !important;
          display: flex !important;
          flex-direction: column !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card-wrapper {
            width: 409px !important;
            height: min(505px, 64dvh) !important;
          }
        }

        #solutions-section .card.illustration {
          width: 100% !important;
          height: 100% !important;
          max-height: none !important;
          border-radius: 22px !important;
        }

        #solutions-section .card.illustration .card-inner,
        #solutions-section .card.illustration .card-front,
        #solutions-section .card.illustration .card-back {
          border-radius: 22px !important;
        }

        #solutions-section .card.illustration .card-front,
        #solutions-section .card.illustration .card-back {
          padding: 1.75rem !important; /* p-7 (28px) */
          box-sizing: border-box !important;
          background-color: #FAF8F1 !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front,
          #solutions-section .card.illustration .card-back {
            padding: 41px !important; /* md:p-[41px] */
          }
        }

        #solutions-section .card.illustration .card-front {
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          align-items: center !important;
          border: 1px solid #DFDCD0 !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper {
          flex: 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          overflow: hidden !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper figure {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        #solutions-section .card.illustration .card-front .illustration-wrapper figure img {
          width: 190px !important;
          height: 190px !important;
          object-fit: contain !important;
          margin: auto !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front .illustration-wrapper figure img {
            width: 235px !important;
            height: 235px !important;
          }
        }

        #solutions-section .card.illustration .card-front .text-wrapper h5 {
          font-family: 'HW Cigars', Georgia, serif !important;
          font-weight: 400 !important;
          font-size: 22px !important;
          line-height: 1.3 !important;
          letter-spacing: -0.025em !important;
          color: #0C310A !important;
          text-align: center !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-front .text-wrapper h5 {
            font-size: 29px !important;
          }
        }

        #solutions-section .card.illustration .card-back {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
        }

        #solutions-section .card.illustration .card-back figure {
          height: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 0.5rem !important;
        }

        #solutions-section .card.illustration .card-back figure img {
          height: 110px !important;
          width: auto !important;
          object-fit: contain !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back figure img {
            height: 135px !important;
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
          font-size: 24px !important;
          font-weight: 400 !important;
          color: #0C310A !important;
          margin-bottom: 0.5rem !important;
        }
        @media (min-width: 768px) {
          #solutions-section .card.illustration .card-back .text-wrapper h5 {
            font-size: 29px !important;
          }
        }

        #solutions-section .card.illustration .card-back .text-wrapper p {
          font-size: 14.5px !important;
          line-height: 1.45 !important;
          color: #664A42 !important;
          text-align: center !important;
        }

        #solutions-section .card.illustration .card-back a.button {
          margin-top: auto !important;
        }
      `}</style>

      {/* 100dvh sticky container with grid-template-rows: auto 1fr (matching HUTS) */}
      <div className="scroll-content sticky top-0 left-0 w-full h-[100dvh] grid grid-rows-[auto_1fr] gap-8 md:gap-[36px] pt-14 md:pt-[60px] pb-8 md:pb-[42px] overflow-hidden select-none">
        {/* Section Header within grid row 1 */}
        <div className="heading-wrapper max-w-[740px] mx-auto px-6 text-center">
          <h3 className="text-[32px] md:text-[47.5px] leading-[1.1] tracking-[-0.025em] font-serif font-normal text-[#0C310A] text-balance">
            Whatever type of place <br className="hidden md:inline" />you have in mind
          </h3>
        </div>

        {/* Sticky Horizontal Track within grid row 2 */}
        <div className="h-scroll-container">
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

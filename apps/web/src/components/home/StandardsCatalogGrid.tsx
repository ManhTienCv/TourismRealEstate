import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

// Authentic Standards slider items matching exact HUTS DOM & assets
const STANDARDS_SLIDER_ITEMS = [
  {
    slug: 'adu',
    title: 'ADUs',
    coverImg: '/standards/covers/adu.jpg',
    axonImg: '/standards/axonometric/adu.png',
    tags: ['Sleeping Areas', 'Wet Room'],
  },
  {
    slug: 'small-bar',
    title: 'Small Bar',
    coverImg: '/standards/covers/small-bar.jpg',
    axonImg: '/standards/axonometric/small-bar.jpg',
    tags: ['1 Bed', '1 Bath'],
  },
  {
    slug: 'medium-bar',
    title: 'Medium Bar',
    coverImg: '/standards/covers/medium-bar.jpg',
    axonImg: '/standards/axonometric/medium-bar.jpg',
    tags: ['2.5 Bed', '1 Bath'],
  },
  {
    slug: 'big-bar',
    title: 'Big Bar',
    coverImg: '/standards/covers/big-bar.jpg',
    axonImg: '/standards/axonometric/big-bar.jpg',
    tags: ['3 Bed', '2 Bath'],
  },
  {
    slug: 'dogtrot',
    title: 'Dogtrot',
    coverImg: '/standards/covers/dogtrot.png',
    axonImg: '/standards/axonometric/dogtrot.jpg',
    tags: ['2 Bed', '1.5 Bath'],
  },
  {
    slug: 'small-l',
    title: 'Small L',
    coverImg: '/standards/covers/small-l.jpg',
    axonImg: '/standards/axonometric/small-l.jpg',
    tags: ['2.5 Bed', '1.5 Bath'],
  },
  {
    slug: 'big-l',
    title: 'Big L',
    coverImg: '/standards/covers/big-l.jpg',
    axonImg: '/standards/axonometric/big-l.jpg',
    tags: ['3 Bed', '2.5 Bath'],
  },
  {
    slug: 'village',
    title: 'Village',
    coverImg: '/standards/covers/village.jpg',
    axonImg: '/standards/axonometric/village.jpg',
    tags: ['3 Bed', '2.5 Bath'],
  },
];

export const StandardsCatalogGrid: React.FC = () => {
  const { openPlanDetail } = useConfiguratorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  // State và refs kiểm soát cơ chế "Lướt trôi + Đứng im chuột mới lật thẻ" (Hover Intent + Scroll Lock)
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
    // Độ trễ hover intent 200ms khi chuột đứng im trên thẻ
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

  // Tính động quãng đường trượt ngang maxTranslateX chuẩn xác tuyệt đối đến từng pixel
  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const updateDistance = () => {
      const children = Array.from(trackEl.children) as HTMLElement[];
      if (children.length === 0) return;

      const style = window.getComputedStyle(trackEl);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const gap = parseFloat(style.columnGap) || 0;

      let totalContentWidth = paddingLeft + paddingRight;
      children.forEach((child, idx) => {
        totalContentWidth += child.offsetWidth;
        if (idx < children.length - 1) {
          totalContentWidth += gap;
        }
      });

      // Quãng đường trượt ngang để thẻ cuối cùng nằm khớp lề phải (window.innerWidth - paddingRight), triệt tiêu khoảng trống thừa
      const dist = Math.max(0, Math.max(totalContentWidth, trackEl.scrollWidth) - window.innerWidth);
      setMaxTranslateX(dist);
    };

    updateDistance();

    const ro = new ResizeObserver(updateDistance);
    ro.observe(trackEl);
    window.addEventListener('resize', updateDistance);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 350vh (trôi mượt tương đương UseCaseSelector)
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

  // Ánh xạ smoothProgress với khoảng nghỉ đầu (0.05) và cuối (0.95) để thẻ cuối dừng vững ở lề phải
  const x = useTransform(smoothProgress, [0.05, 0.95], [0, -maxTranslateX]);

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
      className="card-slider relative w-full h-[350vh] bg-[#FAF7ED]"
    >
      {/* Scoped CSS để định hình chính xác kích thước 388x388px, căn lề và padding thoáng đãng */}
      <style>{`
        #standards-section .scroll-content {
          padding-top: 6rem !important; /* pt-24 (96px) tránh Navbar che tiêu đề */
          padding-bottom: 2.5rem !important; /* pb-10 */
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          height: 100vh !important;
          height: 100dvh !important;
        }

        #standards-section .heading-wrapper {
          margin-bottom: 2rem !important; /* mb-8 (32px) */
        }

        #standards-section .card-wrapper {
          width: 300px !important;
          height: auto !important;
          row-gap: 18px !important;
        }
        @media (min-width: 768px) {
          #standards-section .card-wrapper {
            width: 388px !important;
          }
        }

        #standards-section .card.standard {
          width: 100% !important;
          height: 310px !important;
          flex: none !important;
          border-radius: 20px !important;
        }
        @media (min-width: 768px) {
          #standards-section .card.standard {
            height: 388px !important;
          }
        }

        #standards-section .card.standard .card-front,
        #standards-section .card.standard .card-back {
          border-radius: 20px !important;
        }

        #standards-section .card.standard .card-back {
          background-color: #FFFFFF !important;
          border: 1px solid #57772E !important;
          padding: 1.5rem !important; /* p-6 */
        }

        #standards-section .card-wrapper > h5 {
          text-align: left !important;
          font-size: 22px !important;
          line-height: 1.2 !important;
        }
        @media (min-width: 768px) {
          #standards-section .card-wrapper > h5 {
            font-size: 26px !important;
          }
        }

        #standards-section .h-scroll-content {
          gap: 22.3px !important;
          column-gap: 22.3px !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        @media (min-width: 768px) {
          #standards-section .h-scroll-content {
            padding-left: 56px !important;
            padding-right: 56px !important;
          }
        }
      `}</style>

      {/* 100dvh sticky container with pt-24 pb-10 flex flex-col justify-center (matching HUTS) */}
      <div className="scroll-content select-none pt-24 pb-10 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="heading-wrapper mb-8">
          <div className="block-text">
            <div className="block-text-col">
              <h3 className="text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] font-serif font-normal text-[#0C310A] text-center mb-[22px]">
                It all starts with our Standards...
              </h3>
              <p className="max-w-[760px] mx-auto text-center text-[17px] lg:text-[19.5px] leading-[1.45] text-[#664A42] font-sans">
                They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Horizontal Track */}
        <div className="h-scroll-container">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="h-scroll-content flex items-center gap-[22.3px] px-6 md:px-[56px] will-change-transform h-auto"
          >
            {STANDARDS_SLIDER_ITEMS.map((item) => {
              const isFlipped = flippedSlug === item.slug;

              return (
                <div
                  key={item.slug}
                  className="card-wrapper w-[300px] md:w-[388px] shrink-0 flex flex-col gap-[18px] group"
                >
                  <div
                    className="card standard w-full h-[310px] md:h-[388px] rounded-[20px] [perspective:1000px] cursor-pointer"
                    onClick={() => handlePlanClick(item.slug)}
                    onMouseEnter={() => handleCardMouseEnter(item.slug)}
                    onMouseMove={() => handleCardMouseMove(item.slug)}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div
                      className={`card-inner relative w-full h-full rounded-[20px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.125)] ${
                        isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                      }`}
                    >
                      {/* Front: Exterior Architectural Render */}
                      <div className="card-front absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] bg-[#FFFDF6] border border-[#0C310A]/25">
                        <figure className="w-full h-full">
                          <img
                            src={item.coverImg}
                            alt={item.title}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                            draggable={false}
                          />
                        </figure>
                      </div>

                      {/* Back: 3D Axonometric Drawing on Pure White BG with Tags */}
                      <div className="card-back absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#FFFFFF] border border-[#57772E] flex flex-col justify-center items-center p-6">
                        <div className="image-wrapper w-full h-full flex items-center justify-center">
                          <figure className="w-full h-full flex items-center justify-center">
                            <img
                              src={item.axonImg}
                              alt={`${item.title} 3D Axonometric`}
                              className="w-full max-w-[330px] max-h-[290px] object-contain select-none pointer-events-none"
                              loading="lazy"
                              draggable={false}
                            />
                          </figure>
                        </div>

                        {/* Nhãn thông số ở góc dưới */}
                        <div className="tags-wrapper absolute bottom-[20px] left-[20px] right-[20px] flex flex-wrap items-start gap-[8px]">
                          {item.tags.map((tag, tIdx) => (
                            <div
                              key={tIdx}
                              className="tag text-[12px] leading-[1.5] text-[#1E1414] bg-[#FFFDF6]/65 border border-[#D0D4C8] rounded-full px-[14px] py-[5px] font-sans select-none"
                            >
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sibling h5 title below card: Căn trái, cách thẻ 18px, đổi màu xanh #57772E khi thẻ lật */}
                  <h5
                    className={`text-[clamp(1.375rem,0.94vw+1.15rem,1.85rem)] leading-[1.2] tracking-[-0.025em] font-serif font-normal text-left transition-colors duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      isFlipped ? 'text-[#57772E]' : 'text-[#0C310A]'
                    }`}
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

export default StandardsCatalogGrid;

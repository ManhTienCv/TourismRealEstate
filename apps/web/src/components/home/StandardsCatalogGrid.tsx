import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Tính động quãng đường trượt ngang maxTranslateX bằng ResizeObserver trên trackRef
  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const updateDistance = () => {
      const dist = Math.max(0, trackEl.scrollWidth - window.innerWidth + 64);
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

  // Sticky Horizontal Scroll driven by vertical viewport scroll across 320vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ánh xạ scrollYProgress với khoảng nghỉ đầu (0.08) và cuối (0.92) để trượt mượt một chiều từ trái sang phải
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -maxTranslateX]);

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
      className="card-slider relative w-full h-[320vh] bg-[#FAF8F1]"
    >
      {/* 100dvh sticky container with grid-template-rows: auto 1fr (matching HUTS) */}
      <div className="scroll-content select-none">
        
        {/* Section Header within grid row 1 */}
        <div className="heading-wrapper">
          <div className="block-text">
            <div className="block-text-col">
              <h3>It all starts with our Standards...</h3>
              <p>
                They’re more than home plans, they’re home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Horizontal Track within grid row 2 */}
        <div className="h-scroll-container">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="h-scroll-content"
          >
            {STANDARDS_SLIDER_ITEMS.map((item) => (
              <div key={item.slug} className="card-wrapper">
                <div
                  className="card standard"
                  onClick={() => handlePlanClick(item.slug)}
                >
                  <div className="card-inner">
                    {/* Front: Exterior Architectural Render */}
                    <div className="card-front">
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

                    {/* Back: 3D Axonometric Drawing on White BG with Tags */}
                    <div className="card-back">
                      <div className="image-wrapper">
                        <figure className="w-full h-full flex items-center justify-center">
                          <img
                            src={item.axonImg}
                            alt={`${item.title} 3D Axonometric`}
                            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
                            loading="lazy"
                            draggable={false}
                          />
                        </figure>
                      </div>
                      <div className="tags-wrapper">
                        {item.tags.map((tag, tIdx) => (
                          <div key={tIdx} className="tag">
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sibling h5 title below card: turns green #57772E on card hover */}
                <h5>{item.title}</h5>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default StandardsCatalogGrid;

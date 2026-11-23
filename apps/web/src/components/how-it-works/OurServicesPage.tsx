import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { HutsButton } from '../common/HutsButton';
import { StandardsHorizontalSlider } from '../standards/StandardsHorizontalSlider';
import { getAllStandards } from '../solutions/standardsData';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  SERVICES_DATA,
  ServicePhaseItem,
  ServiceTestimonialItem,
} from './howItWorksData';

interface ParallaxFullMediaProps {
  mediaType: 'video' | 'image';
  mediaUrl: string;
  title: string;
}

const ParallaxFullMedia: React.FC<ParallaxFullMediaProps> = ({
  mediaType,
  mediaUrl,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14">
      <div
        ref={containerRef}
        className="relative w-full h-[46vh] md:h-[74vh] rounded-[22px] [overflow:clip] bg-[#1E1414]"
      >
        <motion.div
          style={{ y }}
          className="absolute -top-[9%] left-0 w-full h-[118%] will-change-transform"
        >
          {mediaType === 'video' ? (
            <video
              src={mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={`${mediaUrl}?w=1600&q=85&auto=format`}
              alt={title}
              className="w-full h-full object-cover select-none"
              loading="lazy"
              decoding="async"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ScrollDrawArrow: React.FC<{ variant: 'wide' | 'loop' }> = ({ variant }) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: arrowRef,
    offset: ['start 85%', 'end 45%'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const lineProgress = useTransform(smoothProgress, [0, 0.85], [0, 1], {
    clamp: true,
  });
  const tipProgress = useTransform(smoothProgress, [0.8, 1], [0, 1], {
    clamp: true,
  });
  const tipOpacity = useTransform(smoothProgress, [0.78, 0.84], [0, 1], {
    clamp: true,
  });

  return (
    <div
      ref={arrowRef}
      className="py-4 md:py-8 flex justify-center items-center pointer-events-none select-none"
    >
      {variant === 'wide' ? (
        <svg
          width="357"
          height="268"
          viewBox="0 0 357 268"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-[180px] md:h-[220px] w-auto overflow-visible"
        >
          <motion.path
            id="line"
            d="M355.377 2.00001C355.377 102.685 321.875 149.594 226.369 161.434C185.004 166.562 18.6108 161.434 18.6108 262"
            stroke="#57772E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: lineProgress }}
          />
          <motion.path
            id="tip"
            d="M4.10686 244.355C6.01943 245.128 7.40235 246.589 8.85801 247.978C13.6383 252.54 17.313 258.941 17.6124 265.599C19.6026 258.667 24.5722 250.344 32.0167 248.371"
            stroke="#57772E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: tipProgress, opacity: tipOpacity }}
          />
        </svg>
      ) : (
        <svg
          width="225"
          height="263"
          viewBox="0 0 225 263"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-[180px] md:h-[220px] w-auto overflow-visible"
        >
          <motion.path
            id="line"
            d="M2.4283 1.99998C-6.5736 40.4912 130.855 54.5 109.454 83.8518C97.5219 100.217 71.5809 53.5103 115.455 63.2918C159 73 160.964 147.471 149.464 183.748C149.167 190.281 140.842 201.464 130.855 195.38C121.891 189.92 117.983 180.022 122.955 172.686C133.459 157.189 168.466 154.842 192.253 183.319C204.219 197.643 208.962 237.817 206.266 254"
            stroke="#57772E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: lineProgress }}
          />
          <motion.path
            id="tip"
            d="M223.143 239.988C220.861 240.441 219.017 241.787 217.108 243.035C210.84 247.134 205.4 253.553 203.638 261.002C202.926 252.741 199.217 242.255 191.406 238.394"
            stroke="#57772E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: tipProgress, opacity: tipOpacity }}
          />
        </svg>
      )}
    </div>
  );
};

const PhaseAccordion: React.FC<{ phase: ServicePhaseItem }> = ({ phase }) => {
  // Đóng mặc định toàn bộ hàng khi tải trang
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-16 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Cột trái: Nhãn Phase + Tiêu đề + Mô tả */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <span className="text-[13.5px] text-[#664A42] font-normal font-sans">
          {phase.phaseLabel}
        </span>
        <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(1.85rem,2.4vw+1.1rem,3.1rem)] leading-[1.1] tracking-[-0.025em]">
          {phase.title}
        </h3>
        <p className="text-[16px] leading-[1.6] text-[#664A42] font-sans mt-1">
          {phase.description}
        </p>
      </div>

      {/* Cột phải: Danh sách hàng Accordion */}
      <div className="lg:col-span-7 border-t border-[#D0D4C8]">
        {phase.rows.map((row, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={row.headline} className="border-b border-[#D0D4C8]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left cursor-pointer group"
              >
                <span className="font-serif font-normal text-[22px] md:text-[26px] leading-[1.2] text-[#0C310A] group-hover:text-[#57772E] transition-colors">
                  {row.headline}
                </span>
                <span
                  aria-hidden="true"
                  className={`w-9 h-9 rounded-full border border-[#0C310A]/15 bg-[#F3EFE2]/70 flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isOpen ? 'rotate-45 text-[#57772E]' : 'rotate-0 text-[#0C310A]'
                  }`}
                >
                  <span className="text-[20px] leading-none font-sans">+</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pr-6 text-[15.5px] leading-[1.65] text-[#664A42] font-sans">
                      <p>{row.summary}</p>
                      <p className="font-medium text-[#0C310A] mt-4 mb-2">
                        Key Deliverables:
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5">
                        {row.deliverables.map((item, dIdx) => (
                          <li key={dIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CAROUSEL_GAP = 40;

const ServicesTestimonialsCarousel: React.FC<{
  items: ServiceTestimonialItem[];
}> = ({ items }) => {
  const count = items.length;
  const extendedItems = [...items, ...items, ...items];

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(count);
  const [isInstant, setIsInstant] = useState(true);
  const [dimensions, setDimensions] = useState({ viewportW: 1440, slideW: 1040 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorDir, setCursorDir] = useState<'left' | 'right'>('right');

  // Con trỏ mũi tên tròn bay theo chuột dùng MotionValue + Spring (không dùng useState cho tọa độ)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 1500, damping: 50, mass: 0.05 });
  const springY = useSpring(cursorY, { stiffness: 1500, damping: 50, mass: 0.05 });

  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const slide = firstSlideRef.current;
      if (!vp || !slide) return;
      const viewportW = vp.clientWidth;
      const slideW = slide.offsetWidth;
      setDimensions((prev) =>
        prev.viewportW === viewportW && prev.slideW === slideW
          ? prev
          : { viewportW, slideW }
      );
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (firstSlideRef.current) ro.observe(firstSlideRef.current);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measure);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  const stepSlide = (delta: 1 | -1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsInstant(false);
    setActiveIndex((prev) =>
      Math.max(1, Math.min(extendedItems.length - 2, prev + delta))
    );

    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  };

  const handleAnimationComplete = () => {
    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
    }

    if (activeIndex >= count * 2) {
      setIsInstant(true);
      setActiveIndex(activeIndex - count);
      requestAnimationFrame(() => {
        isAnimatingRef.current = false;
      });
      return;
    }

    if (activeIndex < count) {
      setIsInstant(true);
      setActiveIndex(activeIndex + count);
      requestAnimationFrame(() => {
        isAnimatingRef.current = false;
      });
      return;
    }

    isAnimatingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Căn tâm vòng tròn 56px (w-14 h-14 -> offset 28px)
    cursorX.set(relX - 28);
    cursorY.set(relY - 28);

    const nextDir = relX < rect.width / 2 ? 'left' : 'right';
    setCursorDir((prev) => (prev !== nextDir ? nextDir : prev));
  };

  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    stepSlide(relX < rect.width / 2 ? -1 : 1);
  };

  const targetX =
    (dimensions.viewportW - dimensions.slideW) / 2 -
    activeIndex * (dimensions.slideW + CAROUSEL_GAP);

  return (
    <section className="py-16 md:py-24 w-full [overflow:clip] bg-[#FAF7ED]">
      <div
        ref={viewportRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          cursorX.set(-100);
          cursorY.set(-100);
        }}
        onMouseMove={handleMouseMove}
        onClick={handleViewportClick}
        className="relative w-full [overflow:clip] cursor-pointer md:cursor-none"
      >
        {/* Con trỏ mũi tên tròn bay theo chuột (Desktop) */}
        <motion.div
          aria-hidden="true"
          style={{
            x: springX,
            y: springY,
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.85,
          }}
          className="hidden md:flex absolute top-0 left-0 z-30 w-14 h-14 rounded-full bg-[#FFFDF7] border border-[#0C310A]/15 shadow-md items-center justify-center text-[#0C310A] pointer-events-none"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cursorDir === 'left' ? 'rotate-180' : 'rotate-0'}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>

        {/* Dải slide vòng lặp vô tận 1 chiều */}
        <motion.div
          animate={{ x: targetX }}
          transition={
            isInstant
              ? { duration: 0 }
              : { duration: 0.65, ease: [0.33, 1, 0.68, 1] }
          }
          onAnimationComplete={handleAnimationComplete}
          className="flex items-center w-max will-change-transform"
          style={{ gap: `${CAROUSEL_GAP}px` }}
        >
          {extendedItems.map((item, idx) => (
            <div
              key={`${item.author}-${idx}`}
              ref={idx === 0 ? firstSlideRef : undefined}
              className="shrink-0 w-[88vw] md:w-[min(1040px,82vw)] flex flex-col lg:flex-row items-center select-none"
            >
              {/* Hộp chữ trắng kem bên trái */}
              <div className="bg-[#FFFDF7] rounded-[22px] p-8 md:p-14 lg:pr-24 w-full lg:w-[68%] lg:min-h-[430px] flex flex-col justify-between gap-8 border border-[#0C310A]/5">
                <div className="flex flex-col gap-5">
                  <span
                    aria-hidden="true"
                    className="font-serif text-[76px] leading-[0.65] text-[#57772E] select-none"
                  >
                    “
                  </span>
                  <p className="font-serif font-normal text-[21px] md:text-[26px] leading-[1.36] text-[#0C310A]">
                    {item.quote}
                  </p>
                </div>

                <div className="flex flex-col gap-0.5 font-sans">
                  <span className="text-[14px] font-medium text-[#0C310A]">
                    {item.author}
                  </span>
                  <span className="text-[13.5px] text-[#664A42]">
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Hộp ảnh bên phải chồng nhẹ sang trái */}
              <div className="relative z-10 w-full lg:w-[40%] lg:-ml-[8%] aspect-[4/3] lg:aspect-[1/1.02] rounded-[22px] overflow-hidden shadow-sm mt-4 lg:mt-0 bg-[#EAE6DF]">
                <img
                  src={`${item.image}?w=1200&q=85&auto=format`}
                  alt={item.author}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />
                <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1E1414]/45 backdrop-blur-md text-[#FAF7ED] text-[12px] font-sans">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const OurServicesPage: React.FC = () => {
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);
  const all8Standards = getAllStandards();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  return (
    <div className="w-full bg-[#FAF7ED] [overflow-x:clip] font-sans text-[#1E1414]">
      {/* Section 1: Hero căn giữa */}
      <section className="pt-28 md:pt-36 pb-14 px-6 text-center max-w-[920px] mx-auto flex flex-col items-center gap-5">
        <img
          src={SERVICES_DATA.hero.illustration}
          alt="TIE home design and development sherpas"
          className="w-[96px] h-[96px] md:w-[116px] md:h-[116px] object-contain select-none pointer-events-none"
          draggable={false}
        />

        <span className="text-[13.5px] tracking-[0.01em] text-[#664A42] font-normal">
          {SERVICES_DATA.hero.label}
        </span>

        <h1 className="font-serif font-normal text-[#0C310A] text-[clamp(2.5rem,4.2vw+1.2rem,4.75rem)] leading-[1.06] tracking-[-0.03em]">
          {SERVICES_DATA.hero.titlePrefix}
          {SERVICES_DATA.hero.titleHighlight}
        </h1>

        <div className="mt-2">
          <HutsButton
            variant="primary"
            withArrow
            to={SERVICES_DATA.hero.ctaLink}
            onClick={(e) => {
              e.preventDefault();
              openConfigurator();
            }}
          >
            {SERVICES_DATA.hero.ctaText}
          </HutsButton>
        </div>
      </section>

      {/* Section 2: Đoạn dẫn căn trái */}
      <section className="max-w-[820px] mx-auto px-6 md:px-10 py-14 md:py-20">
        <h4 className="font-serif font-normal text-[#0C310A] text-[clamp(1.6rem,2.1vw+0.9rem,2.5rem)] leading-[1.32] tracking-[-0.02em] text-left">
          {SERVICES_DATA.leadStatement}
        </h4>
      </section>

      {/* Section 3: Chuỗi 5 Giai đoạn (Phase 01 -> Phase 05) */}
      <section className="w-full">
        {SERVICES_DATA.phases.map((phase) => (
          <div key={phase.id} className="w-full">
            <ParallaxFullMedia
              mediaType={phase.mediaType}
              mediaUrl={phase.mediaUrl}
              title={`${phase.phaseLabel} — ${phase.title}`}
            />

            <PhaseAccordion phase={phase} />

            {phase.arrowVariant !== null && (
              <ScrollDrawArrow variant={phase.arrowVariant} />
            )}
          </div>
        ))}
      </section>

      {/* Section 4: Testimonials Carousel vòng lặp vô tận chuẩn HUTS */}
      <ServicesTestimonialsCarousel items={SERVICES_DATA.testimonials} />

      {/* Section 5: Our Standards Catalog (Sticky Horizontal Scroll + 3D Flip Cards) */}
      <StandardsHorizontalSlider
        title="Our Standards Catalog"
        items={all8Standards}
      />
    </div>
  );
};

export default OurServicesPage;

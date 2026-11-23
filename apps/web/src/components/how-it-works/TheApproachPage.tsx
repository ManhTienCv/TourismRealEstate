import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  APPROACH_DATA,
  APPROACH_TESTIMONIALS,
  EditorialListSection,
  PrincipleBgTheme,
  PrincipleCardItem,
} from './howItWorksData';

const SPINE = 24;

const THEME_BG_MAP: Record<PrincipleBgTheme, string> = {
  meadow: 'bg-[#D5E798]',
  sunshine: 'bg-[#FFFF84]',
  sky: 'bg-[#D7E2F6]',
  beige: 'bg-[#E4DAB4]',
};

interface StackedCardProps {
  conveyorProgress: MotionValue<number>;
  k: number;
  viewportW: number;
  naturalStart: number;
  totalScroll: number;
  isDesktop: boolean;
  className: string;
  cardRef: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}

const StackedCard: React.FC<StackedCardProps> = ({
  conveyorProgress,
  k,
  viewportW,
  naturalStart,
  totalScroll,
  isDesktop,
  className,
  cardRef,
  children,
}) => {
  const parkedX = viewportW - (7 - k) * SPINE;
  const detachScroll = Math.max(0, naturalStart - parkedX);
  const detachP = Math.min(0.9999, detachScroll / totalScroll);
  const endX = naturalStart - totalScroll;

  const x = useTransform(
    conveyorProgress,
    detachP > 0.0001 ? [0, detachP, 1] : [0, 1],
    detachP > 0.0001 ? [parkedX, parkedX, endX] : [parkedX, endX]
  );

  return (
    <motion.div
      ref={cardRef}
      style={isDesktop ? { x, zIndex: k } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PrincipleCardContent: React.FC<{ card: PrincipleCardItem; index: number }> = ({
  card,
  index,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const testimonial = card.testimonialAuthor
    ? APPROACH_TESTIMONIALS[card.testimonialAuthor]
    : null;
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <>
      {/* Dải extender 24px bên phải cùng màu nền trên các thẻ 01..04 để lấp kín góc bo tròn 22px của thẻ đứng sau */}
      {index < 4 && (
        <div
          aria-hidden="true"
          className={`hidden lg:block absolute top-0 -right-[24px] w-[24px] h-full pointer-events-none ${THEME_BG_MAP[card.bgTheme]}`}
        />
      )}

      <div className="flex flex-col lg:flex-row lg:h-full items-stretch gap-10 lg:gap-[104px] px-6 md:px-12 lg:px-[82px] py-14 lg:py-[76px]">
        {/* Cột 1: Header (Số thứ tự + Tiêu đề + Mô tả) */}
        <div className="w-full lg:w-[438px] shrink-0 flex flex-col gap-8">
          <span className="font-serif font-normal text-[52px] lg:text-[64px] leading-none text-[#0C310A]">
            {formattedNumber}
          </span>
          <div>
            <h2 className="font-serif font-normal text-[#0C310A] text-[clamp(2rem,2.4vw+1rem,2.9rem)] leading-[1.08] tracking-[-0.025em] mb-4">
              {card.title}
            </h2>
            <p className="text-[15.5px] leading-[1.52] text-[#664A42] font-sans">
              {card.description}
            </p>
          </div>
        </div>

        {/* Cột 2: Accordion */}
        <div className="w-full lg:w-[438px] shrink-0 lg:h-full lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {card.accordions.map((acc, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={acc.title}
                className="border-t border-[#0C310A]/18 last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                >
                  <span className="font-serif font-normal text-[21px] md:text-[23px] leading-[1.25] text-[#0C310A] group-hover:opacity-80 transition-opacity">
                    {acc.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full border border-[#0C310A]/30 flex items-center justify-center shrink-0 text-[#0C310A] group-hover:border-[#0C310A]/60 transition-colors"
                  >
                    <span
                      className={`text-[18px] leading-none font-sans transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-[15px] leading-[1.58] text-[#664A42] font-sans">
                        {acc.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Cột 3: Testimonial (Thẻ 01 & 04) */}
        {testimonial && (
          <div className="w-full lg:w-[min(980px,78vw)] shrink-0 lg:h-full">
            <blockquote className="bg-[#FAF7ED] rounded-[22px] p-8 md:p-14 h-full flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6">
                <span
                  aria-hidden="true"
                  className="font-serif text-[72px] leading-[0.7] text-[#57772E] select-none"
                >
                  “
                </span>
                <p className="font-serif font-normal text-[24px] md:text-[32px] leading-[1.3] text-[#0C310A]">
                  {testimonial.quote}
                </p>
              </div>

              <footer className="flex flex-col gap-0.5 font-sans">
                <span className="font-medium text-[15px] text-[#0C310A]">
                  {testimonial.author}
                </span>
                <span className="text-[14px] text-[#664A42]">
                  {testimonial.location}
                </span>
              </footer>
            </blockquote>
          </div>
        )}

        {/* Cột ảnh (1 ảnh ở Thẻ 02, 2 ảnh xếp ngang ở Thẻ 05) */}
        {card.images &&
          card.images.length > 0 &&
          card.images.map((imgUrl, iIdx) => (
            <div
              key={iIdx}
              className="w-full lg:w-[438px] shrink-0 aspect-[4/3] lg:aspect-auto lg:h-full rounded-[22px] overflow-hidden bg-[#EAE6DF]"
            >
              <img
                src={`${imgUrl}?w=1400&q=85&auto=format`}
                alt={`${card.title} ${iIdx + 1}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
      </div>
    </>
  );
};

const EditorialChecklistSection: React.FC<{
  section: EditorialListSection;
  withTopBorder?: boolean;
  splitDontDoHeading?: boolean;
}> = ({ section, withTopBorder = false, splitDontDoHeading = false }) => {
  return (
    <section
      className={`max-w-[1360px] mx-auto px-6 md:px-14 py-16 md:py-[76px] flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${
        withTopBorder ? 'border-t border-[#0C310A]/12' : ''
      }`}
    >
      {/* Cột trái Sticky */}
      <div className="w-full lg:w-[37%] lg:sticky lg:top-[84px]">
        <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(2.25rem,3vw+1rem,3.15rem)] leading-[1.1] tracking-[-0.025em]">
          {splitDontDoHeading ? (
            <>
              What We
              <br className="hidden lg:block" /> Don&apos;t Do
            </>
          ) : (
            section.title
          )}
        </h3>
      </div>

      {/* Cột phải: Danh sách 3 mục (h5 + p bên trái, icon 30x30 bên phải) */}
      <div className="w-full lg:flex-1 lg:max-w-[640px] lg:ml-auto">
        <ul>
          {section.items.map((item) => (
            <li
              key={item.title}
              className="py-7 border-t border-[#0C310A]/15 last:border-b flex items-start justify-between gap-7"
            >
              <div className="flex-1">
                <h5 className="font-serif font-normal text-[26px] md:text-[30px] leading-[1.28] text-[#0C310A] mb-4">
                  {item.title}
                </h5>
                <p className="text-[15.5px] leading-[1.48] text-[#664A42] font-sans">
                  {item.description}
                </p>
              </div>
              <img
                src={section.icon}
                alt=""
                aria-hidden="true"
                className="w-[30px] h-[30px] shrink-0 mt-1 object-contain select-none pointer-events-none"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const TheApproachPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [metrics, setMetrics] = useState<{
    viewportW: number;
    viewportH: number;
    widths: number[];
  }>(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const h = typeof window !== 'undefined' ? window.innerHeight : 900;
    return {
      viewportW: w,
      viewportH: h,
      widths: [w - 144, w - 120, w - 48, w - 48, w - 48, w - 48, w - 48],
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  // Theo dõi breakpoint Desktop (lg: 1024px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Đo động viewportW, viewportH và chiều rộng thực tế của đủ 7 thẻ Card 0..6 bằng ResizeObserver
  useEffect(() => {
    const measure = () => {
      const viewportEl = viewportRef.current;
      if (!viewportEl) return;

      const viewportW = viewportEl.clientWidth || window.innerWidth;
      const viewportH = viewportEl.clientHeight || window.innerHeight;
      const widths = [0, 1, 2, 3, 4, 5, 6].map((idx) => {
        const fallback =
          idx === 0 ? viewportW - 144 : idx === 1 ? viewportW - 120 : viewportW - 48;
        return cardRefs.current[idx]?.offsetWidth || fallback;
      });

      setMetrics((prev) => {
        const same =
          prev.viewportW === viewportW &&
          prev.viewportH === viewportH &&
          prev.widths.every((w, i) => w === widths[i]);
        return same ? prev : { viewportW, viewportH, widths };
      });
    };

    measure();
    const rafId = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    cardRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  // Tính mảng tọa độ nối đuôi naturalStarts[0..6] và tổng quãng đường cuộn totalScroll
  const { naturalStarts, totalScroll } = useMemo(() => {
    const { viewportW, widths } = metrics;
    const starts: number[] = [0];
    for (let i = 1; i < 7; i++) {
      starts.push(starts[i - 1] + widths[i - 1]);
    }
    const totalConveyorWidth = starts[6] + widths[6];
    const scroll = Math.max(1, totalConveyorWidth - viewportW);
    return { naturalStarts: starts, totalScroll: scroll };
  }, [metrics]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    mass: 0.18,
    restDelta: 0.0005,
  });

  const conveyorProgress = useTransform(smoothProgress, [0, 0.98], [0, 1], {
    clamp: true,
  });

  const card0X = useTransform(conveyorProgress, [0, 1], [0, -totalScroll]);

  return (
    <div className="w-full bg-[#FAF7ED] [overflow-x:clip] font-sans text-[#1E1414]">
      {/* Section 1: Cơ chế băng chuyền nối đuôi + gáy chờ mép phải chuẩn HUTS */}
      <section
        ref={sectionRef}
        style={{ height: isDesktop ? metrics.viewportH + totalScroll : 'auto' }}
        className="relative bg-[#FAF7ED]"
      >
        <div
          ref={viewportRef}
          className="lg:sticky lg:top-0 lg:h-[100dvh] w-full [overflow:clip] relative bg-[#FAF7ED]"
        >
          {/* Card 0: Tấm Mở đầu trượt cùng băng chuyền (z-0) */}
          <motion.div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            style={{ x: isDesktop ? card0X : 0 }}
            className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-[calc(100vw-144px)] bg-[#FAF7ED] z-0 will-change-transform"
          >
            <div className="relative h-full w-full px-6 sm:px-10 lg:px-12 pt-24 lg:pt-[118px] pb-12 lg:pb-14 flex flex-col">
              {/* Khối trên trái: H1 3 dòng cân đối chuẩn HUTS */}
              <h1 className="font-serif font-normal text-[#0C310A] text-[clamp(2.75rem,4.5vw+0.8rem,4.75rem)] leading-[1.06] tracking-[-0.03em] max-w-[640px]">
                Perfecting the craft
                <br className="hidden lg:block" /> of home design
                <br className="hidden lg:block" /> and development.
              </h1>

              {/* Mũi tên uốn vòng SVG thật của HUTS */}
              <svg
                viewBox="0 0 119 133"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="hidden lg:block absolute left-[29%] xl:left-[31%] top-[49%] w-[138px] xl:w-[152px] h-auto pointer-events-none select-none"
              >
                <path
                  d="M112.578 112.529C87.7735 115.734 62.3504 112.667 42.2961 95.8689C24.1948 80.7062 19.1604 58.6469 42.9131 46.1591C54.157 40.2476 71.44 40.7544 79.8094 51.4121C89.1338 63.2857 71.9937 73.1837 61.9805 73.5363C38.5936 74.3602 15.0847 57.0131 12.1339 31.5424C8.63949 1.37918 1.99519 2.00093 1.99519 2.00093"
                  stroke="#57772E"
                  strokeWidth="3"
                  strokeMiterlimit="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M96.1243 131.001C96.5649 128.764 97.8749 126.956 99.0902 125.085C103.08 118.941 109.327 113.607 116.578 111.88C108.537 111.182 98.3304 107.547 94.5724 99.8892"
                  stroke="#57772E"
                  strokeWidth="3"
                  strokeMiterlimit="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Khối văn bản phải ngang tầm mũi tên: Font Serif cỡ lớn màu #0C310A */}
              <div className="mt-8 lg:mt-6 lg:ml-[50%] xl:ml-[52%] w-full lg:w-[44%] max-w-[440px] space-y-5">
                {APPROACH_DATA.intro.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="font-serif font-normal text-[20px] lg:text-[clamp(1.3rem,1.25vw+0.7rem,1.6rem)] leading-[1.36] tracking-[-0.015em] text-[#0C310A]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 1: Tấm Ảnh đại diện nối đuôi Card 0 (zIndex = 1, đỗ tại W - 144) */}
          <StackedCard
            conveyorProgress={conveyorProgress}
            k={1}
            viewportW={metrics.viewportW}
            naturalStart={naturalStarts[1]}
            totalScroll={totalScroll}
            isDesktop={isDesktop}
            cardRef={(el) => {
              cardRefs.current[1] = el;
            }}
            className="lg:w-[calc(100vw-120px)] lg:absolute lg:inset-y-0 lg:left-0 w-full h-[50vh] lg:h-full rounded-l-[22px] overflow-visible will-change-transform"
          >
            <div className="w-full lg:w-[calc(100%+24px)] h-full rounded-l-[22px] overflow-hidden bg-[#555835]">
              <img
                src={`${APPROACH_DATA.intro.image}?w=1600&q=85&auto=format`}
                alt="TIE Studio craft and development"
                className="w-full h-full object-cover select-none"
                loading="eager"
                decoding="async"
              />
            </div>
          </StackedCard>

          {/* Card 2 -> Card 6: 5 Tấm Nguyên lý nối đuôi (zIndex = 2..6, đỗ tại W - 120 .. W - 24) */}
          {APPROACH_DATA.principleCards.map((card, idx) => {
            const k = idx + 2;
            return (
              <StackedCard
                key={card.id}
                conveyorProgress={conveyorProgress}
                k={k}
                viewportW={metrics.viewportW}
                naturalStart={naturalStarts[k]}
                totalScroll={totalScroll}
                isDesktop={isDesktop}
                cardRef={(el) => {
                  cardRefs.current[k] = el;
                }}
                className={`lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-max lg:min-w-[calc(100vw-48px)] rounded-l-[22px] relative will-change-transform ${THEME_BG_MAP[card.bgTheme]}`}
              >
                <PrincipleCardContent card={card} index={idx} />
              </StackedCard>
            );
          })}
        </div>
      </section>

      {/* Section 2: What We Do */}
      <EditorialChecklistSection section={APPROACH_DATA.whatWeDo} />

      {/* Section 3: What We Don't Do */}
      <EditorialChecklistSection
        section={APPROACH_DATA.whatWeDontDo}
        withTopBorder
        splitDontDoHeading
      />
    </div>
  );
};

export default TheApproachPage;

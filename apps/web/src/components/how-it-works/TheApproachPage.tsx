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
  smoothProgress: MotionValue<number>;
  startP: number;
  endP: number;
  parkedX: number;
  endX: number;
  zIndex: number;
  isDesktop: boolean;
  className: string;
  cardRef: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}

const StackedCard: React.FC<StackedCardProps> = ({
  smoothProgress,
  startP,
  endP,
  parkedX,
  endX,
  zIndex,
  isDesktop,
  className,
  cardRef,
  children,
}) => {
  const safeEndP = endP > startP ? endP : startP + 0.0001;
  const x = useTransform(smoothProgress, [startP, safeEndP], [parkedX, endX], {
    clamp: true,
  });

  return (
    <motion.div
      ref={cardRef}
      style={isDesktop ? { x, zIndex } : undefined}
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
      {/* Dải extender 24px bên phải cùng màu nền để không bao giờ hở khe phía sau góc bo tròn 22px của thẻ kế tiếp */}
      <div
        aria-hidden="true"
        className={`hidden lg:block absolute top-0 -right-[24px] w-[24px] h-full pointer-events-none ${THEME_BG_MAP[card.bgTheme]}`}
      />

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
  const cardRefs = useRef<Array<HTMLDivElement | null>>([null, null, null, null, null, null]);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [metrics, setMetrics] = useState<{
    viewportW: number;
    viewportH: number;
    cardWidths: number[];
  }>(() => ({
    viewportW: typeof window !== 'undefined' ? window.innerWidth : 1440,
    viewportH: typeof window !== 'undefined' ? window.innerHeight : 900,
    cardWidths: [1440, 1440, 1440, 1440, 1440, 1440],
  }));

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

  // Đo động viewportW, viewportH và chiều rộng thực tế của 6 thẻ trượt Card 1..6 bằng ResizeObserver
  useEffect(() => {
    const measure = () => {
      const viewportEl = viewportRef.current;
      if (!viewportEl) return;

      const viewportW = viewportEl.clientWidth || window.innerWidth;
      const viewportH = viewportEl.clientHeight || window.innerHeight;
      const cardWidths = [0, 1, 2, 3, 4, 5].map(
        (idx) => cardRefs.current[idx]?.offsetWidth || viewportW
      );

      setMetrics((prev) => {
        const same =
          prev.viewportW === viewportW &&
          prev.viewportH === viewportH &&
          prev.cardWidths.every((w, i) => w === cardWidths[i]);
        return same ? prev : { viewportW, viewportH, cardWidths };
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

  // Tính toán vị trí đỗ (parkedX), đích cuối (endX) và dải tiến trình [startP, endP] cho từng thẻ k = 1..6
  const { cardConfigs, totalTravel } = useMemo(() => {
    const { viewportW, cardWidths } = metrics;
    const raw = [1, 2, 3, 4, 5, 6].map((k) => {
      const parkedX = viewportW - (7 - k) * SPINE;
      const nextParkedX = k < 6 ? viewportW - (6 - k) * SPINE : viewportW;
      const endX = k === 1 ? 0 : Math.min(0, nextParkedX - cardWidths[k - 1]);
      const travel = Math.max(1, parkedX - endX);
      return { k, parkedX, endX, travel };
    });

    const total = raw.reduce((sum, item) => sum + item.travel, 0);
    let cumBefore = 0;
    const configs = raw.map((item) => {
      const startP = cumBefore / total;
      cumBefore += item.travel;
      const endP = cumBefore / total;
      return { ...item, startP, endP };
    });

    return { cardConfigs: configs, totalTravel: total };
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

  return (
    <div className="w-full bg-[#FAF7ED] [overflow-x:clip] font-sans text-[#1E1414]">
      {/* Section 1: Động cơ 7 thẻ xếp chồng (Card 0 nền + Card 1..6 trượt đỗ tại W-144..W-24) */}
      <section
        ref={sectionRef}
        style={{ height: isDesktop ? metrics.viewportH + totalTravel : 'auto' }}
        className="relative bg-[#FAF7ED]"
      >
        <div
          ref={viewportRef}
          className="lg:sticky lg:top-0 lg:h-[100dvh] w-full [overflow:clip] relative bg-[#FAF7ED]"
        >
          {/* Card 0: Tấm Mở đầu cố định bên trái (z-0) */}
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-[calc(100%-144px)] bg-[#FAF7ED] z-0">
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
          </div>

          {/* Card 1: Tấm Ảnh đại diện toàn màn hình (zIndex = 1, đỗ tại W - 144) */}
          <StackedCard
            smoothProgress={smoothProgress}
            startP={cardConfigs[0].startP}
            endP={cardConfigs[0].endP}
            parkedX={cardConfigs[0].parkedX}
            endX={cardConfigs[0].endX}
            zIndex={1}
            isDesktop={isDesktop}
            cardRef={(el) => {
              cardRefs.current[0] = el;
            }}
            className="lg:absolute lg:inset-y-0 lg:left-0 w-full lg:w-[100vw] h-[50vh] lg:h-full rounded-l-[22px] overflow-hidden bg-[#555835] will-change-transform"
          >
            <img
              src={`${APPROACH_DATA.intro.image}?w=1600&q=85&auto=format`}
              alt="TIE Studio craft and development"
              className="w-full h-full object-cover select-none"
              loading="eager"
              decoding="async"
            />
          </StackedCard>

          {/* Card 2 -> Card 6: 5 Tấm Nguyên lý (zIndex = 2..6, đỗ tại W - 120 .. W - 24) */}
          {APPROACH_DATA.principleCards.map((card, idx) => {
            const cfg = cardConfigs[idx + 1];
            return (
              <StackedCard
                key={card.id}
                smoothProgress={smoothProgress}
                startP={cfg.startP}
                endP={cfg.endP}
                parkedX={cfg.parkedX}
                endX={cfg.endX}
                zIndex={idx + 2}
                isDesktop={isDesktop}
                cardRef={(el) => {
                  cardRefs.current[idx + 1] = el;
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

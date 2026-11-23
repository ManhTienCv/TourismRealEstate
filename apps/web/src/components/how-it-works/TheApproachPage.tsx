import React, { useEffect, useRef, useState } from 'react';
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

const THEME_BG_MAP: Record<PrincipleBgTheme, string> = {
  meadow: 'bg-[#D5E798]',
  sunshine: 'bg-[#FCF783]',
  sky: 'bg-[#C8E1EE]',
  beige: 'bg-[#ECE6D6]',
};

const SPINE_TABS: Array<{ id: string; color: string; range: [number, number] }> = [
  { id: 'spine-1', color: '#D5E798', range: [0.12, 0.2] },
  { id: 'spine-2', color: '#FCF783', range: [0.32, 0.4] },
  { id: 'spine-3', color: '#C8E1EE', range: [0.52, 0.6] },
  { id: 'spine-4', color: '#ECE6D6', range: [0.66, 0.74] },
  { id: 'spine-5', color: '#D5E798', range: [0.82, 0.9] },
];

const SpineTab: React.FC<{
  color: string;
  range: [number, number];
  progress: MotionValue<number>;
}> = ({ color, range, progress }) => {
  const width = useTransform(progress, range, [22, 0], { clamp: true });
  const opacity = useTransform(progress, range, [1, 0], { clamp: true });

  return (
    <motion.div
      style={{ width, opacity, backgroundColor: color }}
      className="h-full rounded-l-[24px] -ml-[6px] shadow-[-2px_0_10px_rgba(12,49,10,0.06)] shrink-0"
    />
  );
};

const PrinciplePanel: React.FC<{ card: PrincipleCardItem; index: number }> = ({
  card,
  index,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const testimonial = card.testimonialAuthor
    ? APPROACH_TESTIMONIALS[card.testimonialAuthor]
    : null;
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`relative ${THEME_BG_MAP[card.bgTheme]} lg:h-full shrink-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 py-14 lg:py-20 lg:rounded-l-[24px] lg:-ml-5`}
    >
      {/* Cột 1: Số thứ tự + Tiêu đề + Mô tả */}
      <div className="w-full lg:w-[34vw] lg:min-w-[380px] lg:max-w-[490px] shrink-0 flex flex-col gap-5">
        <span className="font-serif font-normal text-[32px] md:text-[40px] leading-none text-[#0C310A]">
          {formattedNumber}
        </span>
        <h2 className="font-serif font-normal text-[#0C310A] text-[clamp(2rem,2.6vw+1.1rem,3.5rem)] leading-[1.06] tracking-[-0.025em]">
          {card.title}
        </h2>
        <p className="text-[15.5px] leading-[1.6] text-[#1E1414]/85 font-sans">
          {card.description}
        </p>
      </div>

      {/* Cột 2: Accordion */}
      <div className="w-full lg:w-[38vw] lg:min-w-[400px] lg:max-w-[540px] lg:max-h-[72dvh] lg:overflow-y-auto shrink-0 pr-2">
        {card.accordions.map((acc, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={acc.title}
              className="border-t border-[#0C310A]/20 last:border-b"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-4 md:py-5 text-left cursor-pointer group"
              >
                <span className="font-serif font-normal text-[21px] md:text-[24px] leading-[1.25] text-[#0C310A] group-hover:opacity-80 transition-opacity">
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
                    <p className="pb-5 pr-10 text-[15px] leading-[1.6] text-[#1E1414]/85 font-sans">
                      {acc.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Cột 3: Hộp trích dẫn Testimonial (Thẻ 01 & 04) */}
      {testimonial && (
        <blockquote className="bg-[#FFFDF7] rounded-[24px] p-8 md:p-12 w-full lg:w-[44vw] lg:min-w-[460px] lg:max-w-[620px] shrink-0 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-5">
            <span
              aria-hidden="true"
              className="font-serif text-[72px] leading-[0.7] text-[#57772E] select-none"
            >
              “
            </span>
            <p className="font-serif font-normal text-[22px] md:text-[28px] leading-[1.35] text-[#0C310A]">
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
      )}

      {/* Cột 3 / Cột 4: Khung ảnh bo góc lớn xếp ngang cạnh nhau (Thẻ 02 & 05) */}
      {card.images &&
        card.images.length > 0 &&
        card.images.map((imgUrl, iIdx) => (
          <div
            key={iIdx}
            className="rounded-[24px] overflow-hidden shrink-0 w-full lg:w-[42vw] lg:min-w-[440px] lg:max-w-[600px] aspect-[4/3] lg:h-[66dvh] lg:aspect-auto bg-[#EAE6DF]"
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
    </article>
  );
};

const EditorialChecklistSection: React.FC<{
  section: EditorialListSection;
  withTopBorder?: boolean;
  splitDontDoHeading?: boolean;
}> = ({ section, withTopBorder = false, splitDontDoHeading = false }) => {
  return (
    <section
      className={`max-w-[1360px] mx-auto px-6 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${
        withTopBorder ? 'border-t border-[#0C310A]/12' : ''
      }`}
    >
      {/* Cột trái: Tiêu đề biên tập */}
      <div className="lg:col-span-4">
        <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(2.25rem,3vw+1.1rem,3.6rem)] leading-[1.08] tracking-[-0.03em]">
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

      {/* Cột phải: 3 mục có dòng tiêu đề + icon bên phải + đường kẻ + mô tả */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        {section.items.map((item) => (
          <div key={item.title} className="flex flex-col">
            <div className="flex items-center justify-between gap-6 pb-4 border-b border-[#0C310A]/15">
              <h5 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.2] text-[#0C310A]">
                {item.title}
              </h5>
              <img
                src={section.icon}
                alt=""
                aria-hidden="true"
                className="w-7 h-7 md:w-8 md:h-8 shrink-0 object-contain select-none pointer-events-none"
                loading="lazy"
              />
            </div>
            <p className="pt-4 text-[15.5px] leading-[1.6] text-[#664A42] max-w-[640px] font-sans">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const TheApproachPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

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

  // Đo quãng đường trượt ngang động bằng ResizeObserver
  useEffect(() => {
    const updateDistance = () => {
      const trackEl = trackRef.current;
      const viewportEl = viewportRef.current;
      if (!trackEl || !viewportEl) return;
      const dist = Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);
      setMaxTranslate(dist);
    };

    updateDistance();

    const trackEl = trackRef.current;
    const viewportEl = viewportRef.current;
    if (!trackEl || !viewportEl) return;

    const ro = new ResizeObserver(updateDistance);
    ro.observe(trackEl);
    ro.observe(viewportEl);
    window.addEventListener('resize', updateDistance);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, [isDesktop]);

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

  const x = useTransform(smoothProgress, [0.01, 0.96], [0, -maxTranslate], {
    clamp: true,
  });

  return (
    <div className="w-full bg-[#FAF7ED] [overflow-x:clip] font-sans text-[#1E1414]">
      {/* Section 1: Khối SideScroll trượt ngang 100dvh chuẩn HUTS */}
      <section ref={sectionRef} className="relative lg:h-[620vh] bg-[#FAF7ED]">
        <div
          ref={viewportRef}
          className="relative lg:sticky lg:top-0 lg:h-[100dvh] w-full [overflow:clip] flex items-stretch"
        >
          {/* Dải nội dung trượt ngang */}
          <motion.div
            ref={trackRef}
            style={{ x: isDesktop ? x : 0 }}
            className="flex flex-col lg:flex-row lg:h-full lg:w-max will-change-transform"
          >
            {/* 1. Panel Mở đầu (Intro Panel — khớp bố cục đường chéo & bo góc phải chuẩn HUTS) */}
            <div className="bg-[#FAF7ED] flex flex-col lg:flex-row items-stretch shrink-0 lg:h-full">
              {/* Khối nền kem chiếm ~87vw để hé lộ 1 phần ảnh ngôi nhà + 5 gáy màu ở mép phải */}
              <div className="relative z-10 bg-[#FAF7ED] lg:rounded-r-[24px] px-6 md:px-12 lg:px-14 pt-28 pb-12 lg:pt-[15vh] lg:pb-[10vh] flex flex-col justify-between gap-8 lg:w-[87vw] shrink-0">
                {/* Hàng trên trái: Tiêu đề H1 lớn 3 dòng */}
                <h1 className="font-serif font-normal text-[#0C310A] text-[clamp(2.5rem,4.1vw+1.1rem,4.75rem)] leading-[1.06] tracking-[-0.03em] max-w-[660px]">
                  {APPROACH_DATA.intro.title}
                </h1>

                {/* Hàng dưới lệch phải: Mũi tên xoắn vòng (#57772E) + 2 đoạn mô tả font-serif lớn */}
                <div className="flex flex-col lg:flex-row items-start lg:items-start gap-6 lg:gap-12 lg:pl-[25%]">
                  {/* Mũi tên xoắn vòng vẽ tay chuẩn HUTS */}
                  <svg
                    width="156"
                    height="126"
                    viewBox="0 0 156 126"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-[120px] h-[98px] lg:w-[152px] lg:h-[124px] shrink-0 lg:-mt-4 select-none pointer-events-none"
                  >
                    <path
                      d="M12 6C24 44 48 66 76 62C102 58 106 30 82 26C56 22 44 54 62 78C78 98 108 102 140 97"
                      stroke="#57772E"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M124 85C130 90 136 94 143 97C135 101 129 107 124 115"
                      stroke="#57772E"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="font-serif font-normal text-[#0C310A] text-[20px] md:text-[22px] lg:text-[25px] leading-[1.42] tracking-[-0.015em] max-w-[440px] space-y-6">
                    {APPROACH_DATA.intro.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ảnh đại diện lớn nối liền bên phải (lùi -ml-6 để bo góc phải khối kem ôm mượt lên ảnh) */}
              <div className="lg:w-[62vw] lg:max-w-[960px] h-[46vh] lg:h-full shrink-0 lg:-ml-6 bg-[#EAE6DF]">
                <img
                  src={`${APPROACH_DATA.intro.image}?w=1600&q=85&auto=format`}
                  alt="TIE Studio craft and development"
                  className="w-full h-full object-cover select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* 2. 5 Panel Nguyên lý lớn (01 -> 05) nối tiếp ngang hàng */}
            {APPROACH_DATA.principleCards.map((card, idx) => (
              <PrinciplePanel key={card.id} card={card} index={idx} />
            ))}
          </motion.div>

          {/* Dải gáy thẻ màu xếp chồng ở mép phải khung sticky (Desktop) */}
          <div className="hidden lg:flex pointer-events-none absolute right-0 top-0 h-full z-20 items-stretch">
            {SPINE_TABS.map((tab) => (
              <SpineTab
                key={tab.id}
                color={tab.color}
                range={tab.range}
                progress={smoothProgress}
              />
            ))}
          </div>
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

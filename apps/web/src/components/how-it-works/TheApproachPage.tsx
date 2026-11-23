import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  APPROACH_DATA,
  APPROACH_TESTIMONIALS,
  EditorialListSection,
  PrincipleBgTheme,
  PrincipleCardItem,
} from './howItWorksData';

const THEME_BG_MAP: Record<PrincipleBgTheme, string> = {
  meadow: 'bg-[#D5E798]',
  sunshine: 'bg-[#F6E48D]',
  sky: 'bg-[#CFE4EE]',
  beige: 'bg-[#EDE8DC]',
};

const PrincipleCard: React.FC<{ card: PrincipleCardItem }> = ({ card }) => {
  // Mặc định đóng toàn bộ accordion; bấm dòng nào mở/đóng mượt dòng đó
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const testimonial = card.testimonialAuthor
    ? APPROACH_TESTIMONIALS[card.testimonialAuthor]
    : null;

  return (
    <article
      className={`${THEME_BG_MAP[card.bgTheme]} rounded-[24px] p-7 md:p-11 lg:p-12 flex flex-col gap-6`}
    >
      <h2 className="font-serif font-normal text-[#0C310A] text-[clamp(1.85rem,2.2vw+1.1rem,3rem)] leading-[1.1] tracking-[-0.025em]">
        {card.title}
      </h2>

      <p className="text-[15.5px] md:text-[16.5px] leading-[1.6] text-[#1E1414]/85 font-sans">
        {card.description}
      </p>

      {/* Khối Accordion bên trong thẻ */}
      <div className="mt-1">
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
                className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer group"
              >
                <span className="font-serif font-normal text-[20px] md:text-[22px] leading-[1.25] text-[#0C310A] group-hover:opacity-80 transition-opacity">
                  {acc.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-[24px] leading-none font-sans text-[#0C310A] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isOpen ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
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
                    <p className="pb-5 pr-8 text-[15px] md:text-[15.5px] leading-[1.6] text-[#1E1414]/85 font-sans">
                      {acc.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Hộp trích dẫn Testimonial (nếu thẻ có testimonialAuthor) */}
      {testimonial && (
        <blockquote className="bg-[#FFFDF6]/65 rounded-[16px] p-6 border border-[#0C310A]/10 flex flex-col gap-3 mt-1">
          <p className="font-serif font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#0C310A]">
            “{testimonial.quote}”
          </p>
          <footer className="flex items-center gap-2 text-[13.5px] font-sans text-[#664A42]">
            <span className="font-medium text-[#0C310A]">— {testimonial.author}</span>
            <span className="opacity-50">•</span>
            <span>{testimonial.location}</span>
          </footer>
        </blockquote>
      )}

      {/* Ảnh minh họa bên trong thẻ (nếu thẻ có images) */}
      {card.images && card.images.length > 0 && (
        <div className="flex flex-col gap-4 mt-1">
          {card.images.map((imgUrl, iIdx) => (
            <div
              key={iIdx}
              className="rounded-[16px] overflow-hidden w-full aspect-[16/10] bg-[#EAE6DF]"
            >
              <img
                src={`${imgUrl}?w=1200&q=85&auto=format`}
                alt={`${card.title} ${iIdx + 1}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

const EditorialChecklistSection: React.FC<{ section: EditorialListSection }> = ({ section }) => {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-14 md:py-20 border-t border-[#D0D4C8]/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Cột trái: Tiêu đề biên tập */}
        <div className="lg:col-span-4">
          <h3 className="text-[clamp(1.75rem,2.6vw+1.1rem,3.25rem)] font-serif font-normal leading-[1.1] tracking-[-0.025em] text-[#0C310A]">
            {section.title}
          </h3>
        </div>

        {/* Cột phải: 3 mục xếp dọc có icon SVG 32x32 */}
        <div className="lg:col-span-8 flex flex-col gap-9 md:gap-11">
          {section.items.map((item) => (
            <div key={item.title} className="flex items-start gap-5">
              <img
                src={section.icon}
                alt=""
                aria-hidden="true"
                className="w-8 h-8 shrink-0 mt-0.5 object-contain select-none pointer-events-none"
                loading="lazy"
              />
              <div className="flex flex-col gap-2">
                <h5 className="font-serif font-normal text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.015em] text-[#0C310A]">
                  {item.title}
                </h5>
                <p className="text-[15.5px] md:text-[16px] leading-[1.6] text-[#664A42] font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TheApproachPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  return (
    <div className="w-full bg-[#FAF7ED] [overflow-x:clip] font-sans text-[#1E1414]">
      {/* Section 1: Khối SideScroll (Trái Sticky, Phải cuộn 5 thẻ nguyên lý) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-16 md:pb-24">
        {/* Cột trái: Sticky Intro */}
        <div className="lg:col-span-5 lg:sticky lg:top-0 pt-24 md:pt-28 pb-8 flex flex-col gap-6">
          <h1 className="font-serif font-normal text-[#0C310A] text-[clamp(2.25rem,3.1vw+1.25rem,3.75rem)] leading-[1.06] tracking-[-0.03em]">
            {APPROACH_DATA.intro.title}
          </h1>

          <div className="text-[16px] leading-[1.6] text-[#664A42] space-y-4 max-w-[460px]">
            {APPROACH_DATA.intro.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="w-full aspect-[16/10] rounded-[20px] overflow-hidden mt-2 bg-[#EAE6DF]">
            <img
              src={`${APPROACH_DATA.intro.image}?w=1200&q=85&auto=format`}
              alt="TIE Studio team and craft"
              className="w-full h-full object-cover select-none"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Cột phải: 5 Thẻ Nguyên Lý */}
        <div className="lg:col-span-7 pt-4 lg:pt-28 flex flex-col gap-6 md:gap-8">
          {APPROACH_DATA.principleCards.map((card) => (
            <PrincipleCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Section 2: What We Do */}
      <EditorialChecklistSection section={APPROACH_DATA.whatWeDo} />

      {/* Section 3: What We Don't Do */}
      <EditorialChecklistSection section={APPROACH_DATA.whatWeDontDo} />
    </div>
  );
};

export default TheApproachPage;

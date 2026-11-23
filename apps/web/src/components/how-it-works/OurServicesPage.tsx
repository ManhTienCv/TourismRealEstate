import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { HutsButton } from '../common/HutsButton';
import { DividerArrow } from '../home/narrative/DoubleLoopArrow';
import { TrustMetricsSection } from '../home/TrustMetricsSection';
import { StandardsHorizontalSlider } from '../standards/StandardsHorizontalSlider';
import { getAllStandards } from '../solutions/standardsData';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SERVICES_DATA, ServicePhaseItem } from './howItWorksData';

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
    <div
      ref={containerRef}
      className="relative w-full h-[46vh] md:h-[72vh] [overflow:clip] bg-[#1E1414]"
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
  );
};

const PhaseAccordion: React.FC<{ phase: ServicePhaseItem }> = ({ phase }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-16 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Cột trái: Nhãn Phase + Tiêu đề + Mô tả */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <span className="text-[13px] uppercase tracking-[0.06em] text-[#57772E] font-medium font-sans">
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
                  className={`text-[24px] leading-none font-sans text-[#0C310A] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    isOpen ? 'rotate-45 text-[#57772E]' : 'rotate-0'
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

        <span className="text-[13px] tracking-[0.06em] uppercase text-[#57772E] font-medium">
          {SERVICES_DATA.hero.label}
        </span>

        <h1 className="font-serif font-normal text-[#0C310A] text-[clamp(2.5rem,4.2vw+1.2rem,4.75rem)] leading-[1.06] tracking-[-0.03em]">
          {SERVICES_DATA.hero.titlePrefix}
          <span className="underline decoration-[#57772E] decoration-[2.5px] underline-offset-[6px]">
            {SERVICES_DATA.hero.titleHighlight}
          </span>
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

      {/* Section 2: Đoạn dẫn */}
      <section className="max-w-[980px] mx-auto px-6 md:px-12 py-14 md:py-20">
        <h4 className="font-serif font-normal text-[#0C310A] text-[clamp(1.5rem,1.8vw+1rem,2.35rem)] leading-[1.35] tracking-[-0.02em] text-center">
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
              <div className="py-4 md:py-8 flex justify-center">
                <DividerArrow
                  variant={phase.arrowVariant === 'wide' ? 'sweep' : 'loop'}
                />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Section 4: Testimonials (Tái sử dụng trực tiếp component trên Trang chủ) */}
      <TrustMetricsSection />

      {/* Section 5: Our Standards Catalog (Sticky Horizontal Scroll + 3D Flip Cards) */}
      <StandardsHorizontalSlider
        title="Our Standards Catalog"
        items={all8Standards}
      />
    </div>
  );
};

export default OurServicesPage;

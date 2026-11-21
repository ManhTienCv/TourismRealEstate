import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HutsButton } from '../common/HutsButton';
import {
  WHAT_IS_A_STANDARD_DATA,
  getAllStandards,
} from '../solutions/standardsData';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

export const WhatIsAStandardPage: React.FC = () => {
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);

  const data = WHAT_IS_A_STANDARD_DATA;
  const allStandards = getAllStandards();

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // States for Standards Catalog 3D cards
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  // Lock 3D flip when scrolling
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setFlippedSlug(null);

      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
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
    if (isScrollingRef.current) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        setFlippedSlug(slug);
      }
    }, 180);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setFlippedSlug(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="w-full bg-[#FAF7ED] text-[#1E1414] overflow-x-clip font-sans selection:bg-[#CBE282] selection:text-[#0C310A]"
    >
      {/* 1. HERO (section.page-header.page-header-centered.w-illo) */}
      <section className="page-header page-header-centered w-illo min-h-[100svh] flex flex-col justify-center items-center text-center px-6 md:px-24 pt-28 pb-16 gap-10">
        {/* Hình minh họa Illo SVG */}
        <motion.figure
          className="illo w-[256px] md:w-[375px] aspect-square flex items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.33, 1, 0.68, 1] }}
        >
          <img
            src={data.illoUrl}
            alt={data.label}
            className="w-full h-full object-contain"
            loading="eager"
            decoding="async"
          />
        </motion.figure>

        {/* Khối Tiêu đề & Nhãn */}
        <motion.div
          className="max-w-[900px] mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.33, 1, 0.68, 1] }}
        >
          <p className="label text-[#57772E] text-[15.5px] font-sans mb-3 font-normal tracking-wide">
            {data.label}
          </p>

          <h1 className="font-serif font-normal text-[#0C310A] text-[38px] md:text-[56px] lg:text-[64px] leading-[1.12] tracking-[-0.03em] mb-8">
            <span className="relative inline-block">
              <span className="relative z-10">Designed to balance</span>
              <svg
                viewBox="0 0 412 26"
                className="absolute left-0 right-0 -bottom-2 w-full h-[14px] pointer-events-none overflow-visible z-0"
                preserveAspectRatio="none"
                fill="none"
              >
                <motion.path
                  d="M255.8,23.8c-35.1-1.6-92.1-2.1-99.5-3-7-.8-6.6-1.9-.7-2.6,39.4-3.2,81.7,1.2,121.9-2.5,3.1-.7-2.6-1.4-4-1.6-46.3-3.1-94.4-1.2-140.4-3.3-16.6-.8-11.7-1.6,2.5-1.8,82.3-1.2,165.4,1,247.6-1.1,7.1-.3,15.8-.5,21.7-1.5.4,0,1.4-.3.5-.6C292.1,1.4,121.4.5,1.2,5.3"
                  fill="none"
                  stroke="#D5E798"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
                />
              </svg>
            </span>
            {' high design with ease of construction'}
          </h1>

          {/* Nút CTA dẫn tới /get-started hoặc mở wizard */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="mt-2"
          >
            <HutsButton
              variant="primary"
              withArrow={true}
              onClick={() => openConfigurator()}
            >
              {data.ctaText}
            </HutsButton>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. OVERVIEW (section.text-block) */}
      <section className="text-block px-6 md:px-16 py-16 md:py-24 max-w-[960px] mx-auto text-center">
        <p className="label text-[#57772E] text-[15.5px] font-sans mb-5 font-normal tracking-wide">
          Overview
        </p>
        <h5 className="font-serif font-normal text-[#0C310A] text-[22px] md:text-[32px] leading-[1.35] tracking-[-0.02em]">
          {data.overview}
        </h5>
      </section>

      {/* 3. 4 KHỐI BACK-AND-FORTH SO LE */}
      <section className="back-and-forth-group space-y-16 py-10 max-w-[1584px] mx-auto w-full">
        {data.backAndForth.map((item, idx) => {
          const isLeft = item.side === 'left';
          return (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[120px] px-6 md:px-16 py-8"
            >
              {/* Media: Video cho khối 1, Ảnh cho khối 2,3,4 */}
              <div
                className={`aspect-square rounded-[22px] overflow-hidden bg-white border border-[#D0D4C8]/50 shadow-sm ${
                  isLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover select-none"
                  />
                ) : (
                  <img
                    src={item.image || item.url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Text */}
              <div className={`flex flex-col ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                <h3 className="font-serif text-[28px] md:text-[38px] text-[#0C310A] leading-[1.2] tracking-[-0.02em] mb-5">
                  {item.title}
                </h3>
                <p className="text-[15.5px] leading-[1.65] text-[#664A42] font-sans">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. KHỐI THE STEP-BY-STEP (section.accordion.w-multi-media) */}
      <section className="step-by-step-accordion max-w-[1584px] mx-auto w-full px-6 md:px-16 py-24 bg-[#FAF7ED]">
        <div className="max-w-[700px] mb-14">
          <h3 className="text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] mb-4 leading-[1.1] tracking-[-0.03em]">
            {data.stepByStepAccordion.title}
          </h3>
          <p className="text-[15.5px] text-[#664A42] leading-[1.5] font-sans">
            A transparent, turnkey process designed to deliver your project on time and within budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Cột trái: Crossfade project images */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-[20px] bg-white border border-[#D0D4C8]/70 overflow-hidden shadow-sm">
              {data.stepByStepAccordion.rows.map((step, sIdx) => (
                <img
                  key={sIdx}
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] select-none ${
                    activeStepIndex === sIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Cột phải: Danh sách các bước 01..06 có nội dung bung mượt */}
          <div className="lg:col-span-6 flex flex-col">
            {data.stepByStepAccordion.rows.map((step, sIdx) => {
              const isActive = activeStepIndex === sIdx;
              return (
                <div
                  key={sIdx}
                  className="border-b border-[#D0D4C8] first:border-t py-4"
                >
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(sIdx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group py-2"
                  >
                    <div className="flex items-center min-w-0 pr-4">
                      <span className="font-sans text-[13px] text-[#57772E] mr-5 shrink-0 font-normal">
                        {step.index}
                      </span>
                      <span
                        className={`text-[17px] md:text-[18px] font-sans transition-colors ${
                          isActive
                            ? 'text-[#57772E] font-medium'
                            : 'text-[#0C310A] group-hover:text-[#57772E]'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={`text-[20px] font-sans transition-transform duration-300 shrink-0 ${
                        isActive ? 'rotate-45 text-[#57772E]' : 'text-[#0C310A] group-hover:text-[#57772E]'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Phần mô tả bung mượt */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-2 pb-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[14.5px] leading-[1.6] text-[#664A42] font-sans pl-10">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. KHỐI OUR STANDARDS CATALOG */}
      <section className="standards-catalog-section py-24 bg-[#FAF7ED] overflow-hidden">
        <div className="max-w-[1584px] mx-auto px-6 md:px-16 mb-12 text-center">
          <h3 className="text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] tracking-[-0.03em] mb-4">
            Our Standards Catalog
          </h3>
          <p className="text-[15.5px] text-[#664A42] max-w-[650px] mx-auto font-sans">
            Explore all 8 productized architectural plans designed for real land and real budgets.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 md:px-16 pb-8 no-scrollbar snap-x snap-mandatory max-w-[1584px] mx-auto">
          {allStandards.map((std) => {
            const isFlipped = flippedSlug === std.slug;
            return (
              <div
                key={std.slug}
                className="w-[300px] md:w-[360px] shrink-0 snap-start flex flex-col select-none cursor-pointer group"
                onClick={() => openStandardDetail(std.slug)}
                onMouseEnter={() => handleCardMouseEnter(std.slug)}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* 3D Flip Card Container */}
                <div className="relative w-full aspect-[6/5] rounded-[20px] [perspective:1000px]">
                  <div
                    className={`relative w-full h-full rounded-[20px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.125)] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                    }`}
                  >
                    {/* Front Face: Realistic 3D Cover */}
                    <div className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden border border-[#D0D4C8] bg-white [backface-visibility:hidden] -webkit-backface-visibility-hidden shadow-sm">
                      <img
                        src={std.thumbnail}
                        alt={std.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading="lazy"
                      />
                      {/* Sub-tags */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                        {std.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-white/85 backdrop-blur-sm text-[#0C310A] text-[11px] px-2.5 py-1 rounded-full font-sans border border-[#0C310A]/10 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Back Face: Axonometric drawing + Specs */}
                    <div className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden border border-[#57772E] bg-white p-5 flex flex-col justify-between [backface-visibility:hidden] -webkit-backface-visibility-hidden [transform:rotateY(180deg)] shadow-sm">
                      <div className="w-full h-[60%] flex items-center justify-center p-2">
                        <img
                          src={std.floorplan}
                          alt={`${std.title} axonometric`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#D0D4C8]">
                        <div>
                          <p className="text-[12px] text-[#664A42] font-sans">Specifications</p>
                          <p className="text-[13.5px] font-medium text-[#0C310A] font-sans">
                            {std.specs.map((s) => s.text).join(' • ')}
                          </p>
                        </div>
                        <span className="text-[13px] font-medium text-[#57772E] group-hover:underline">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tên mẫu nhà dưới thẻ */}
                <h4 className="font-serif text-[22px] text-[#0C310A] group-hover:text-[#57772E] transition-colors mt-4 text-center">
                  {std.title}
                </h4>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

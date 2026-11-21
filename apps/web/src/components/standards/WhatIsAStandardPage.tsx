import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HutsButton } from '../common/HutsButton';
import {
  WHAT_IS_A_STANDARD_DATA,
  getAllStandards,
} from '../solutions/standardsData';
import { StandardsHorizontalSlider } from './StandardsHorizontalSlider';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

export const WhatIsAStandardPage: React.FC = () => {
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);

  const data = WHAT_IS_A_STANDARD_DATA;
  const allStandards = getAllStandards();

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

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

      {/* 5. KHỐI OUR STANDARDS CATALOG (Sticky Horizontal Scroll + 3D Flip Cards) */}
      <StandardsHorizontalSlider
        title="Our Standards Catalog"
        items={allStandards}
      />
    </motion.div>
  );
};

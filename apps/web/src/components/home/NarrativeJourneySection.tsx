import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { DividerArrow } from './narrative/DoubleLoopArrow';

// 3 ảnh gốc của HUTS cho bộ xếp chồng
const INITIAL_CARDS = [
  {
    id: 'card-1',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/adec57220fd43008ea6d5e08e95bf76e0b84c0d2-3200x2133.jpg?w=1024&q=85&auto=format',
    alt: 'HUTS Country Property Aerial View',
  },
  {
    id: 'card-2',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/429ae55dedd3fdcda99c1bb5ad5dcadf0937262f-1440x800.png?w=1024&q=85&auto=format',
    alt: 'HUTS Architectural Elevation Drawing',
  },
  {
    id: 'card-3',
    image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b42fd76f6418c50eb7b7d84590c774a8915ae824-1440x810.jpg?w=1024&q=85&auto=format',
    alt: 'HUTS Realized Country Residence',
  },
];

// Physical fan-out stacking offsets matching HUTS
const STACK_POSITIONS = [
  { rotate: 4, x: 0, y: 0, scale: 1 },
  { rotate: -6, x: -16, y: 12, scale: 0.98 },
  { rotate: 7, x: 14, y: -12, scale: 0.96 },
];

export const NarrativeJourneySection: React.FC = () => {
  const { setActiveTab, openConfigurator } = useConfiguratorStore();
  const [cards, setCards] = useState(INITIAL_CARDS);
  const isDraggingRef = useRef(false);

  // Chuyển ảnh trên cùng xuống đáy xấp bài
  const moveTopCardToBack = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (distance > 50) {
      moveTopCardToBack();
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleClick = () => {
    if (!isDraggingRef.current) {
      moveTopCardToBack();
    }
  };

  const handleSeeProjects = () => {
    setActiveTab('portfolio');
    const el = document.getElementById('portfolio-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHowItWorksClick = () => {
    openConfigurator();
  };

  return (
    <section id="narrative-section" className="relative pt-0 pb-8 sm:pb-12 bg-[#FAF7ED] overflow-visible select-none">
      
      {/* ========================================================= */}
      {/* MŨI TÊN SỐ 1 (MẪU A — MŨI TÊN XOẮN) TRƯỚC "WE DO IT ACROSS THE COUNTRY" */}
      {/* ========================================================= */}
      <section className="divider-arrow flex justify-center items-center my-[-36.5px] relative z-10 pointer-events-none">
        <div className="h-[217px] w-auto">
          <DividerArrow variant="loop" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* KHỐI 1: "WE DO IT ACROSS THE COUNTRY" (LƯỚI 2 CỘT ĐỀU NHAU) */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[160px] px-6 md:px-16 py-12">
          
          {/* CỘT TRÁI: KHUNG 3 ẢNH XẾP CHỒNG ĐẶT P-[8%] */}
          <div className="flex justify-center p-[8%]">
            <div className="relative w-full max-w-[393px] aspect-square flex items-center justify-center select-none">
              {cards.map((card, index) => {
                const isTop = index === 0;
                const pos = STACK_POSITIONS[index] || { rotate: 0, x: 0, y: 0, scale: 0.95 };

                return (
                  <motion.div
                    key={card.id}
                    drag={isTop}
                    dragSnapToOrigin={true}
                    dragElastic={0.6}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={isTop ? handleClick : undefined}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                      rotate: pos.rotate,
                      scale: pos.scale,
                      zIndex: cards.length - index,
                    }}
                    whileDrag={{
                      scale: 1.05,
                      zIndex: 50,
                      cursor: 'grabbing',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    style={{
                      zIndex: cards.length - index,
                    }}
                    className={`absolute inset-0 rounded-[20px] overflow-hidden shadow-xl bg-[#FAF7ED] origin-center select-none ${
                      isTop ? 'cursor-grab active:cursor-grabbing shadow-2xl' : 'pointer-events-none'
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full max-w-[393px] aspect-square rounded-[20px] object-cover select-none pointer-events-none"
                      draggable={false}
                      loading={isTop ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CỘT PHẢI: BLOCK-TEXT & NÚT BẤM SEE OUR PROJECTS */}
          <div className="block-text max-w-[540px]">
            <h4 className="text-[28px] lg:text-[36.1px] leading-[1.14] tracking-[-0.02em] font-serif font-normal text-[#0C310A] mb-[22px]">
              We do it across the country
            </h4>

            <p className="large text-[17px] lg:text-[19.5px] leading-[1.4] text-[#664A42] mb-[30px]">
              We focused exclusively on delivering in rural locations. Coast-to-coast, TIE crafts beautiful properties through guidance, intent, and care. Have a specific area or state in mind? We've either built there, or will soon.
            </p>

            {/* Nút bấm See Our Projects: Viên thuốc + Vòng tròn icon chạm sát nhau (gap-0) */}
            <div
              onClick={handleSeeProjects}
              className="group inline-flex items-center gap-0 cursor-pointer select-none"
            >
              <div className="h-[48px] px-8 rounded-full border border-[#0C310A] text-[#0C310A] text-[14px] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#0C310A] group-hover:text-[#FAF7ED]">
                See Our Projects
              </div>
              <div className="w-[48px] h-[48px] rounded-full border border-[#0C310A] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#0C310A] group-hover:text-[#FAF7ED]">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M0 8.99805H16.7802" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M11.0684 17.7976C11.0684 12.77 14.3032 8.99938 18.0001 8.99938C15.6895 8.41283 11.0684 5.83203 11.0684 0.201172" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MŨI TÊN SỐ 2 (MẪU B — MŨI TÊN VẮT CHÉO TỪ PHẢI SANG TRÁI) */}
      {/* ========================================================= */}
      <section className="divider-arrow flex justify-center items-center my-[-36.5px] relative z-10 pointer-events-none">
        <div className="h-[217px] w-auto">
          <DividerArrow variant="sweep" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* KHỐI 2: "USING A PROCESS BUILT AROUND YOU" (LƯỚI 2 CỘT ĐỀU NHAU) */}
      {/* ========================================================= */}
      <div id="process-section" className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[160px] px-6 md:px-16 py-12">
          
          {/* CỘT TRÁI: BLOCK-TEXT & NÚT BẤM HOW IT WORKS */}
          <div className="block-text max-w-[540px]">
            <h4 className="text-[28px] lg:text-[36.1px] leading-[1.14] tracking-[-0.02em] font-serif font-normal text-[#0C310A] mb-[22px]">
              Using a process built
              <br />
              around you
            </h4>

            <p className="large text-[17px] lg:text-[19.5px] leading-[1.4] text-[#664A42] mb-[30px]">
              We deliver properties differently think of us as your sherpa on the path to your perfect property. Our people-first process goes far beyond floor plans—we coordinate every player needed to take you from a spark of an idea to raw land to a finished home. It's a start-to-finish approach that's proven, vetted, and simply the best way to build.
            </p>

            {/* Nút bấm How It Works: Viên thuốc + Vòng tròn icon chạm sát nhau (gap-0) */}
            <div
              onClick={handleHowItWorksClick}
              className="group inline-flex items-center gap-0 cursor-pointer select-none"
            >
              <div className="h-[48px] px-8 rounded-full border border-[#0C310A] text-[#0C310A] text-[14px] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#0C310A] group-hover:text-[#FAF7ED]">
                How It Works
              </div>
              <div className="w-[48px] h-[48px] rounded-full border border-[#0C310A] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#0C310A] group-hover:text-[#FAF7ED]">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M0 8.99805H16.7802" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M11.0684 17.7976C11.0684 12.77 14.3032 8.99938 18.0001 8.99938C15.6895 8.41283 11.0684 5.83203 11.0684 0.201172" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: HÌNH MINH HỌA SHERPA BÊN LÒ SƯỞI HUTS GỐC */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/illustrations/process-sherpa-fireplace.svg"
              alt="Architectural sherpa enjoying tea by a cozy fireplace"
              className="w-full max-w-[440px] md:max-w-[480px] h-auto object-contain select-none pointer-events-none"
            />
          </div>

        </div>
      </div>

    </section>
  );
};

export default NarrativeJourneySection;

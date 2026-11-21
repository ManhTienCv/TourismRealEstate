import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  COMMON_GRAPHIC_CARDS,
  getAllStandards,
  getStandardDetail,
  StandardDetailData,
} from '../solutions/standardsData';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

interface StandardDetailPageProps {
  slug?: string;
}

export const StandardDetailPage: React.FC<StandardDetailPageProps> = ({ slug: propSlug }) => {
  const storeSlug = useConfiguratorStore((s) => s.selectedStandardSlug);
  const openStandardDetail = useConfiguratorStore((s) => s.openStandardDetail);

  const rawSlug = propSlug || storeSlug || 'small-bar';
  const activeSlug = rawSlug === 'adu' ? 'adus' : rawSlug;
  const data: StandardDetailData = getStandardDetail(activeSlug) || getStandardDetail('small-bar')!;

  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // States for "More Standards" horizontal card slider
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto scroll to top when changing slug
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    setActiveRowIndex(0);
    setFlippedSlug(null);
  }, [activeSlug]);

  // Lock 3D card flip when scrolling
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

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.65;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

  // Filter 7 other standards for "More Standards" section
  const allStandards = getAllStandards();
  const otherStandards = allStandards.filter(
    (s) => s.slug !== activeSlug && s.slug !== 'adu'
  );

  return (
    <motion.div
      key={activeSlug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="w-full bg-[#FAF7ED] text-[#1E1414] overflow-x-clip font-sans selection:bg-[#CBE282] selection:text-[#0C310A]"
    >
      {/* 1. HERO TOÀN MÀN HÌNH (section.detail-page-header) */}
      <section className="detail-page-header relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#1E1414]">
        <img
          src={`${data.heroImage}?w=1600&q=85&auto=format`}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover select-none"
          loading="eager"
          decoding="async"
        />
        {/* Lớp phủ gradient tối bảo đảm tương phản */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/60 pointer-events-none" />

        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-[1584px] w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            className="font-serif font-normal text-[#FFFDF6] text-[48px] md:text-[84px] leading-[1.05] tracking-[-0.03em] mb-6"
          >
            {data.title}
          </motion.h1>

          <div className="tags standard-tags flex flex-wrap gap-2.5">
            {data.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#1E1414]/45 backdrop-blur-md border border-[#534E4A] text-[#FFFDF6] text-[12px] px-4 py-1.5 rounded-full font-sans tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW + BẢNG THÔNG SỐ (section.text-block.w-data-table) */}
      <section className="text-block w-data-table max-w-[1584px] mx-auto w-full px-6 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="label text-[#57772E] text-[15.5px] mb-5 font-normal tracking-wide">
              Overview
            </p>
            <h5 className="font-serif font-normal text-[#0C310A] text-[22px] md:text-[29.6px] leading-[1.35]">
              {data.overview}
            </h5>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:mt-11">
            <div className="data-table flex flex-col">
              {data.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex justify-between items-baseline py-4 border-b border-[#D0D4C8] first:border-t"
                >
                  <span className="text-[#664A42] text-[15px] font-sans">{spec.label}</span>
                  <span className="text-[#0C310A] font-medium text-[15px] font-sans text-right">
                    {spec.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. KHỐI ẢNH TOÀN RỘNG (fullWidthMedia - chỉ render khi có, ví dụ ADUs) */}
      {data.fullWidthMedia && data.fullWidthMedia.length > 0 && (
        <section className="full-width-media-group max-w-[1584px] mx-auto w-full px-6 md:px-16 py-6 space-y-8">
          {data.fullWidthMedia.map((mediaUrl, idx) => (
            <div
              key={idx}
              className="rounded-[22px] overflow-hidden aspect-[16/9] w-full bg-[#FAF7ED] border border-[#D0D4C8]/60 shadow-sm"
            >
              <img
                src={mediaUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </section>
      )}

      {/* 4. KHỐI MẶT BẰNG TƯƠNG TÁC ACCORDION (section.accordion.w-media.w-multi-media) */}
      {data.accordion && (
        <section className="accordion w-media w-multi-media max-w-[1584px] mx-auto w-full px-6 md:px-16 py-20 bg-[#FAF7ED]">
          <div className="max-w-[700px] mb-12">
            <h3 className="text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] mb-4 leading-[1.1] tracking-[-0.03em]">
              {data.accordion.title}
            </h3>
            <p className="text-[15.5px] text-[#664A42] leading-[1.5] font-sans">
              {data.accordion.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Cột trái: Stacked SVG floorplans with crossfade */}
            <div className="lg:col-span-6">
              <div className="multi-media-wrapper relative w-full aspect-[4/3] rounded-[20px] bg-white border border-[#D0D4C8]/70 p-6 flex items-center justify-center overflow-hidden shadow-sm">
                {data.accordion.rows.map((row, rIdx) => {
                  const mediaSrc = row.svgUrl || row.image || '';
                  return (
                    <img
                      key={rIdx}
                      src={mediaSrc}
                      alt={row.title}
                      className={`absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] object-contain transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] select-none ${
                        activeRowIndex === rIdx
                          ? 'opacity-100 z-10'
                          : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Cột phải: Danh sách các dòng 01..06 */}
            <div className="lg:col-span-6 flex flex-col">
              {data.accordion.rows.map((row, rIdx) => {
                const isActive = activeRowIndex === rIdx;
                const formattedIndex = row.index || `0${rIdx + 1}`;
                return (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => setActiveRowIndex(rIdx)}
                    className="w-full flex items-center justify-between py-5 border-b border-[#D0D4C8] first:border-t text-left cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center min-w-0 pr-4">
                      <span className="font-sans text-[13px] text-[#57772E] mr-5 shrink-0 font-normal">
                        {formattedIndex}
                      </span>
                      <span
                        className={`text-[16px] md:text-[17px] font-sans transition-colors ${
                          isActive
                            ? 'text-[#57772E] font-medium'
                            : 'text-[#0C310A] group-hover:text-[#57772E]'
                        }`}
                      >
                        {row.title}
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
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. TRÌNH CHIẾU BẢN VẼ & MẶT ĐỨNG (section.image-slider) */}
      {data.sliderItems && data.sliderItems.length > 0 && (
        <section className="image-slider py-20 bg-[#FAF7ED] overflow-hidden">
          <div className="max-w-[1584px] mx-auto px-6 md:px-16 mb-8 flex items-center justify-between">
            <h4 className="text-[28px] lg:text-[36px] font-serif font-normal text-[#0C310A] tracking-[-0.02em]">
              {data.sliderTitle}
            </h4>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollSlider('left')}
                aria-label="Previous slide"
                className="w-11 h-11 rounded-full border border-[#0C310A]/30 flex items-center justify-center transition-colors hover:bg-[#0C310A] hover:text-[#FFFDF6] cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider('right')}
                aria-label="Next slide"
                className="w-11 h-11 rounded-full border border-[#0C310A]/30 flex items-center justify-center transition-colors hover:bg-[#0C310A] hover:text-[#FFFDF6] cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-16 pb-4 no-scrollbar"
          >
            {data.sliderItems.map((item, idx) => (
              <div
                key={idx}
                className="w-[82vw] md:w-[58vw] shrink-0 snap-start flex flex-col"
              >
                <div className="rounded-[20px] border border-[#D0D4C8] overflow-hidden bg-white p-4 md:p-8 flex items-center justify-center aspect-[16/10] shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain select-none"
                    loading="lazy"
                  />
                </div>
                {item.title && (
                  <p className="caption text-[14px] text-[#664A42] mt-4 leading-relaxed font-sans">
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. CÁC KHỐI 2 CỘT SO LE: EXTERIOR BACK-AND-FORTH */}
      {data.exteriorBackAndForth && data.exteriorBackAndForth.length > 0 && (
        <section className="exterior-back-and-forth space-y-12 py-10 max-w-[1584px] mx-auto w-full">
          {data.exteriorBackAndForth.map((item, idx) => {
            const isLeft = item.side === 'left';
            return (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[120px] px-6 md:px-16 py-10"
              >
                {/* Khung ảnh */}
                <div
                  className={`aspect-square rounded-[22px] overflow-hidden bg-white border border-[#D0D4C8]/50 shadow-sm ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={item.image || item.url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                </div>

                {/* Khung nội dung chữ */}
                <div className={`flex flex-col ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  {item.label && (
                    <p className="text-[15.5px] text-[#57772E] font-sans mb-3 font-normal tracking-wide">
                      {item.label}
                    </p>
                  )}
                  <h3 className="font-serif text-[28px] md:text-[38px] text-[#0C310A] leading-[1.2] tracking-[-0.02em] mb-5">
                    {item.title}
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] text-[#664A42] font-sans">
                    {item.text}
                  </p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-6 space-y-2.5">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-center text-[15px] text-[#1E1414] font-sans"
                        >
                          <span className="text-[#57772E] mr-3 font-bold">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 7. LƯỚI ẢNH KIẾN TRÚC (section.image-grid) */}
      {data.imageGrid && data.imageGrid.length > 0 && (
        <section className="image-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-16 py-16 max-w-[1584px] mx-auto w-full">
          {data.imageGrid.map((imgItem, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 === 1 ? 'md:mt-16' : ''}`}
            >
              <div className="rounded-[20px] overflow-hidden aspect-[16/10] bg-white border border-[#D0D4C8]/50 shadow-sm">
                <img
                  src={imgItem.image}
                  alt={imgItem.caption || ''}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
              {imgItem.caption && (
                <p className="caption text-[14px] text-[#664A42] mt-3 font-sans leading-relaxed">
                  {imgItem.caption}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 8. CÁC KHỐI 2 CỘT SO LE: INTERIOR BACK-AND-FORTH */}
      {data.interiorBackAndForth && data.interiorBackAndForth.length > 0 && (
        <section className="interior-back-and-forth space-y-12 py-10 max-w-[1584px] mx-auto w-full">
          {data.interiorBackAndForth.map((item, idx) => {
            const isLeft = item.side === 'left';
            return (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[120px] px-6 md:px-16 py-10"
              >
                <div
                  className={`aspect-square rounded-[22px] overflow-hidden bg-white border border-[#D0D4C8]/50 shadow-sm ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={item.image || item.url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                </div>

                <div className={`flex flex-col ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  {item.label && (
                    <p className="text-[15.5px] text-[#57772E] font-sans mb-3 font-normal tracking-wide">
                      {item.label}
                    </p>
                  )}
                  <h3 className="font-serif text-[28px] md:text-[38px] text-[#0C310A] leading-[1.2] tracking-[-0.02em] mb-5">
                    {item.title}
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] text-[#664A42] font-sans">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 9. KHỐI 3 THẺ THÔNG SỐ CHUẨN (section.graphic-cards - "Designed with you in mind") */}
      <section className="graphic-cards px-6 md:px-16 py-24 bg-[#FAF7ED] max-w-[1584px] mx-auto w-full">
        <h3 className="text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] mb-14 text-center leading-[1.1] tracking-[-0.03em]">
          Designed with you in mind
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMON_GRAPHIC_CARDS.map((card, cIdx) => (
            <div
              key={cIdx}
              className="bg-[#FFFDF6] border border-[#D0D4C8] rounded-[22px] p-8 md:p-10 flex flex-col gap-5 shadow-sm"
            >
              <img
                src={card.icon}
                alt={card.headline}
                className="w-14 h-14 object-contain"
                loading="lazy"
              />
              <h5 className="text-[26px] font-serif font-normal text-[#0C310A] tracking-[-0.02em]">
                {card.headline}
              </h5>
              <div className="text-[15px] leading-[1.55] text-[#664A42] space-y-3 font-sans">
                {card.points.map((point, pIdx) => (
                  <p key={pIdx}>{point}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. DỰ ÁN THỰC TẾ SỬ DỤNG MẪU NHÀ (section.project-feature) */}
      {data.projects && data.projects.length > 0 && (
        <section className="project-feature max-w-[1584px] mx-auto w-full px-6 md:px-16 py-16">
          <h3 className="text-[34px] lg:text-[46px] font-serif font-normal text-[#0C310A] mb-12 text-center tracking-[-0.02em]">
            {data.projectsTitle}
          </h3>

          <div className="space-y-12">
            {data.projects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="min-h-[85vh] relative overflow-hidden flex items-center px-6 md:px-16 py-16 rounded-[24px] shadow-sm"
              >
                <img
                  src={proj.bgImage}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
                  <div className="max-w-[600px]">
                    <h2 className="font-serif text-[42px] md:text-[64px] font-normal text-[#FFFDF6] mb-6 leading-tight tracking-[-0.03em]">
                      {proj.title}
                    </h2>
                    <div className="flex flex-wrap gap-2.5">
                      {proj.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-black/50 backdrop-blur-md border border-white/20 text-[#FFFDF6] text-[13px] px-4 py-1.5 rounded-full font-sans tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.interiorImage && (
                    <div className="aspect-video w-full max-w-[520px] rounded-[16px] overflow-hidden shadow-2xl border border-white/10 shrink-0">
                      <img
                        src={proj.interiorImage}
                        alt="Interior preview"
                        className="w-full h-full object-cover select-none"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. KHỐI "MORE STANDARDS" (section.card-slider) */}
      <section className="more-standards-section py-20 bg-[#FAF7ED] overflow-hidden">
        <div className="max-w-[1584px] mx-auto px-6 md:px-16 mb-10 text-center">
          <h3 className="text-[34px] lg:text-[46px] font-serif font-normal text-[#0C310A] tracking-[-0.02em]">
            More Standards
          </h3>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 md:px-16 pb-8 no-scrollbar snap-x snap-mandatory max-w-[1584px] mx-auto">
          {otherStandards.map((std) => {
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

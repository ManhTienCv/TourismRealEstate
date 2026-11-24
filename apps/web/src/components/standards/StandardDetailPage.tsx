import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  COMMON_GRAPHIC_CARDS,
  getAllStandards,
  getStandardDetail,
  StandardDetailData,
  StandardSliderItem,
} from '../solutions/standardsData';
import { ProjectFeatureSection } from '../solutions/ProjectFeatureSection';
import { StandardsHorizontalSlider } from './StandardsHorizontalSlider';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

interface StandardDetailPageProps {
  slug?: string;
}

// Sub-component ImageSlider chuẩn HUTS có cursor follower mũi tên bay theo chuột
interface StandardImageSliderProps {
  title: string;
  items: StandardSliderItem[];
  isADUs: boolean;
  slug?: string;
}

const SLIDER_CLICK_COOLDOWN_MS = 420;

const StandardImageSlider: React.FC<StandardImageSliderProps> = ({ title, items, isADUs, slug }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

  const [snapOffsets, setSnapOffsets] = useState<number[]>([0]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const lastClickAtRef = useRef<number>(0);

  // Theo dõi chuột qua useMotionValue + lò xo bám nhanh mượt đồng bộ với TestimonialsCarousel
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useSpring(rawX, { stiffness: 820, damping: 38, mass: 0.15 });
  const cursorY = useSpring(rawY, { stiffness: 820, damping: 38, mass: 0.15 });

  // Reset activeIndex = 0 khi đổi slug hoặc danh sách items
  useEffect(() => {
    setActiveIndex(0);
  }, [slug, items]);

  // Đo bằng ResizeObserver và sinh mảng mốc dừng gộp bước lẻ snapOffsets
  useEffect(() => {
    const updateMetrics = () => {
      const viewportEl = viewportRef.current;
      const trackEl = trackRef.current;
      const firstSlideEl = firstSlideRef.current;
      if (!viewportEl || !trackEl) return;

      const viewportWidth = viewportEl.clientWidth;
      const trackScrollWidth = trackEl.scrollWidth;
      const slideStep = firstSlideEl ? firstSlideEl.offsetWidth + 24 : (isADUs ? 440 + 24 : 620 + 24);
      const maxOffset = Math.max(0, trackScrollWidth - viewportWidth);

      const offsets: number[] = [0];
      if (maxOffset > 4 && slideStep > 0) {
        let pos = 0;
        while (pos < maxOffset - 4) {
          const remaining = maxOffset - pos;
          // Nếu phần còn lại sau 1 bước nhỏ hơn 45% chiều rộng thẻ -> gộp thẳng vào mốc cuối, cấm đẻ bước nhích lẻ
          if (remaining <= slideStep * 1.45) {
            offsets.push(maxOffset);
            break;
          }
          pos += slideStep;
          offsets.push(pos);
        }
      }
      setSnapOffsets(offsets);
      setActiveIndex((prev) => Math.min(prev, Math.max(0, offsets.length - 1)));
    };

    updateMetrics();

    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl) return;

    const ro = new ResizeObserver(updateMetrics);
    ro.observe(viewportEl);
    ro.observe(trackEl);
    window.addEventListener('resize', updateMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, [slug, items, isADUs]);

  const safeIndex = Math.min(activeIndex, Math.max(0, snapOffsets.length - 1));
  const targetOffset = snapOffsets[safeIndex] ?? 0;

  const canGoPrev = safeIndex > 0;
  const canGoNext = safeIndex < snapOffsets.length - 1;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.jump(x - 48);
    rawY.jump(y - 48);
    cursorX.jump(x - 48);
    cursorY.jump(y - 48);
    setDirection(x < rect.width / 2 ? 'prev' : 'next');
    setCursorVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x - 48);
    rawY.set(y - 48);

    const nextDir = x < rect.width / 2 ? 'prev' : 'next';
    setDirection((prev) => (prev !== nextDir ? nextDir : prev));
    if (!cursorVisible) {
      cursorX.jump(x - 48);
      cursorY.jump(y - 48);
      setCursorVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastClickAtRef.current < SLIDER_CLICK_COOLDOWN_MS) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      if (canGoPrev) {
        lastClickAtRef.current = now;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    } else {
      if (canGoNext) {
        lastClickAtRef.current = now;
        setActiveIndex((prev) => Math.min(prev + 1, snapOffsets.length - 1));
      }
    }
  };

  const isDimmed = (direction === 'prev' && !canGoPrev) || (direction === 'next' && !canGoNext);

  return (
    <section className="image-slider py-20 bg-[#FAF7ED] [overflow-x:clip]">
      <div className="max-w-[1584px] mx-auto px-6 md:px-16 mb-8">
        <h4 className="text-[28px] lg:text-[36px] font-serif font-normal text-[#0C310A] tracking-[-0.02em]">
          {title}
        </h4>
      </div>

      <div
        ref={viewportRef}
        className="relative overflow-visible cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleClick}
      >
        {/* Dải Slides với Framer Motion kẹp chặn tuyệt đối targetOffset */}
        <motion.div
          ref={trackRef}
          animate={{ x: -targetOffset }}
          transition={{ duration: 0.6, ease: [0.45, 0, 0.2, 1] }}
          className="flex gap-6 w-max px-6 md:px-16 will-change-transform"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              ref={idx === 0 ? firstSlideRef : undefined}
              className={`shrink-0 flex flex-col ${
                isADUs ? 'w-[78vw] md:w-[440px]' : 'w-[82vw] md:w-[620px]'
              }`}
            >
              <div className="w-full h-[340px] md:h-[460px] rounded-[20px] overflow-hidden bg-[#EAE6DF]">
                <img
                  src={`${item.image}?w=1200&q=85&auto=format`}
                  alt={item.title || ''}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              {item.title && (
                <p className="caption text-[14px] text-[#664A42] mt-3 font-sans leading-relaxed">
                  {item.title}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Con trỏ vòng tròn mũi tên 96px (6rem) với mix-blend-difference đồng bộ HUTS */}
        <motion.div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          initial={false}
          animate={
            cursorVisible
              ? { scale: 1, opacity: isDimmed ? 0.35 : 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="hidden md:flex pointer-events-none absolute top-0 left-0 z-30 w-[6rem] h-[6rem] p-[2rem] rounded-full border border-white bg-transparent backdrop-blur-[4px] mix-blend-difference items-center justify-center will-change-transform"
        >
          <motion.div
            animate={{ rotate: direction === 'prev' ? -180 : 0 }}
            transition={{ duration: 0.26, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path d="M0 8.99805H16.7802" stroke="#FFFDF6" strokeWidth="2" />
              <path
                d="M11.0684 17.7976C11.0684 12.77 14.3032 8.99938 18.0001 8.99938C15.6895 8.41283 11.0684 5.83203 11.0684 0.201172"
                stroke="#FFFDF6"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Pagination dots cho Mobile theo snapOffsets.length */}
      {snapOffsets.length > 1 && (
        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
          {snapOffsets.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                safeIndex === idx ? 'w-6 bg-[#0C310A]' : 'w-2 bg-[#0C310A]/20'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const StandardDetailPage: React.FC<StandardDetailPageProps> = ({ slug: propSlug }) => {
  const storeSlug = useConfiguratorStore((s) => s.selectedStandardSlug);

  const rawSlug = propSlug || storeSlug || 'small-bar';
  const activeSlug = rawSlug === 'adu' ? 'adus' : rawSlug;
  const data: StandardDetailData = getStandardDetail(activeSlug) || getStandardDetail('small-bar')!;

  const [activeRowIndex, setActiveRowIndex] = useState(0);

  // Tự động cuộn lên đỉnh khi đổi slug
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    setActiveRowIndex(0);
  }, [activeSlug]);

  const allStandards = getAllStandards();
  const otherStandards = allStandards.filter(
    (s) => s.slug !== activeSlug && s.slug !== 'adu'
  );

  const isADUs = activeSlug === 'adus';

  // Tách imageGrid thành 2 cột masonry
  const leftColImages = data.imageGrid ? data.imageGrid.filter((_, idx) => idx % 2 === 0) : [];
  const rightColImages = data.imageGrid ? data.imageGrid.filter((_, idx) => idx % 2 === 1) : [];

  return (
    <motion.div
      key={activeSlug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="w-full bg-[#FAF7ED] text-[#1E1414] overflow-x-clip font-sans selection:bg-[#CBE282] selection:text-[#0C310A]"
    >
      {/* 1. HERO TOÀN MÀN HÌNH */}
      <section className="detail-page-header relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#1E1414]">
        <img
          src={`${data.heroImage}?w=1600&q=85&auto=format`}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover select-none"
          loading="eager"
          decoding="async"
        />
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

      {/* 2. OVERVIEW + BẢNG THÔNG SỐ */}
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

      {/* ---------------------------------------------------------------------- */}
      {/* KHỐI 3 -> 8 THEO THỨ TỰ PHÂN BIỆT CHO ADUS VÀ CÁC MẪU CÒN LẠI */}
      {/* ---------------------------------------------------------------------- */}

      {isADUs ? (
        /* ================== THỨ TỰ CHUẨN DÀNH CHO ADUS ================== */
        <>
          {/* 3. fullWidthMedia */}
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
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </section>
          )}

          {/* 4. exteriorBackAndForth (4 mẫu ADU con) */}
          {data.exteriorBackAndForth && data.exteriorBackAndForth.length > 0 && (
            <section className="exterior-back-and-forth space-y-12 py-10 max-w-[1584px] mx-auto w-full">
              {data.exteriorBackAndForth.map((item, idx) => {
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
                      {/* Bỏ mũi tên -> hiển thị thành các dòng xếp dọc space-y-3 mt-5 */}
                      {item.bullets && item.bullets.length > 0 && (
                        <div className="space-y-3 mt-5">
                          {item.bullets.map((bullet, bIdx) => (
                            <p key={bIdx} className="text-[15.5px] leading-[1.5] text-[#664A42]">
                              {bullet}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* 5. ImageSlider ("All Models at a Glance") */}
          {data.sliderItems && data.sliderItems.length > 0 && (
            <StandardImageSlider
              title={data.sliderTitle}
              items={data.sliderItems}
              isADUs={true}
              slug={activeSlug}
            />
          )}

          {/* 6. ImageGrid (Masonry 2 cột giữ tỷ lệ ảnh thật) */}
          {data.imageGrid && data.imageGrid.length > 0 && (
            <section className="image-grid max-w-[1584px] mx-auto w-full px-6 md:px-16 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="flex flex-col gap-6 md:gap-8">
                  {leftColImages.map((imgItem, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="rounded-[20px] overflow-hidden bg-[#EAE6DF] border border-[#D0D4C8]/50 shadow-sm">
                        <img
                          src={imgItem.image}
                          alt={imgItem.caption || ''}
                          className="w-full h-auto block select-none"
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
                </div>
                <div className="flex flex-col gap-6 md:gap-8">
                  {rightColImages.map((imgItem, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="rounded-[20px] overflow-hidden bg-[#EAE6DF] border border-[#D0D4C8]/50 shadow-sm">
                        <img
                          src={imgItem.image}
                          alt={imgItem.caption || ''}
                          className="w-full h-auto block select-none"
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
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ================== THỨ TỰ CHUẨN CHO 7 MẪU CÒN LẠI ================== */
        <>
          {/* 3. Accordion */}
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
                            isActive
                              ? 'rotate-45 text-[#57772E]'
                              : 'text-[#0C310A] group-hover:text-[#57772E]'
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

          {/* 4. ImageSlider ("Floorplans & Elevations") */}
          {data.sliderItems && data.sliderItems.length > 0 && (
            <StandardImageSlider
              title={data.sliderTitle}
              items={data.sliderItems}
              isADUs={false}
              slug={activeSlug}
            />
          )}

          {/* 5. exteriorBackAndForth */}
          {data.exteriorBackAndForth && data.exteriorBackAndForth.length > 0 && (
            <section className="exterior-back-and-forth space-y-12 py-10 max-w-[1584px] mx-auto w-full">
              {data.exteriorBackAndForth.map((item, idx) => {
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
                      {item.bullets && item.bullets.length > 0 && (
                        <div className="space-y-3 mt-5">
                          {item.bullets.map((bullet, bIdx) => (
                            <p key={bIdx} className="text-[15.5px] leading-[1.5] text-[#664A42]">
                              {bullet}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* 6. ImageGrid (Masonry 2 cột) */}
          {data.imageGrid && data.imageGrid.length > 0 && (
            <section className="image-grid max-w-[1584px] mx-auto w-full px-6 md:px-16 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="flex flex-col gap-6 md:gap-8">
                  {leftColImages.map((imgItem, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="rounded-[20px] overflow-hidden bg-[#EAE6DF] border border-[#D0D4C8]/50 shadow-sm">
                        <img
                          src={imgItem.image}
                          alt={imgItem.caption || ''}
                          className="w-full h-auto block select-none"
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
                </div>
                <div className="flex flex-col gap-6 md:gap-8">
                  {rightColImages.map((imgItem, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="rounded-[20px] overflow-hidden bg-[#EAE6DF] border border-[#D0D4C8]/50 shadow-sm">
                        <img
                          src={imgItem.image}
                          alt={imgItem.caption || ''}
                          className="w-full h-auto block select-none"
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
                </div>
              </div>
            </section>
          )}

          {/* 7. interiorBackAndForth */}
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
        </>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* CÁC PHẦN CUỐI DÙNG CHUNG CHO TẤT CẢ 8 TRANG MẪU NHÀ */}
      {/* ---------------------------------------------------------------------- */}

      {/* GRAPHIC CARDS ("Designed with you in mind" - 2 cột) */}
      <section className="graphic-cards px-6 md:px-16 py-24 bg-[#FAF7ED] max-w-[1584px] mx-auto w-full">
        <h3 className="text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] mb-14 text-center leading-[1.1] tracking-[-0.03em]">
          Designed with you in mind
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1280px] mx-auto">
          {COMMON_GRAPHIC_CARDS.map((card, cIdx) => (
            <div
              key={cIdx}
              className="bg-[#FFFDF6] border border-[#D0D4C8] rounded-[22px] p-8 md:p-12 flex flex-col shadow-sm"
            >
              <img
                src={card.icon}
                alt={card.headline}
                className="w-14 h-14 object-contain mx-auto mb-5"
                loading="lazy"
              />
              <h5 className="text-[26px] md:text-[29px] font-serif font-normal text-[#0C310A] text-center mb-6 tracking-[-0.02em]">
                {card.headline}
              </h5>
              <div className="text-[15.5px] leading-[1.55] text-[#664A42] space-y-4 font-sans text-left">
                {card.points.map((point, pIdx) => (
                  <p key={pIdx}>{point}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT FEATURE SECTION (Hiệu ứng Rèm trượt chữ dính + Parallax HUTS) */}
      {data.projects && data.projects.length > 0 && (
        <ProjectFeatureSection
          heading={data.projectsTitle}
          includeInterior={data.includeInterior}
          projects={data.projects}
        />
      )}

      {/* MORE STANDARDS SLIDER (Cuộn dọc trượt ngang sticky + Lật thẻ 3D) */}
      <StandardsHorizontalSlider
        key={activeSlug}
        title="More Standards"
        items={otherStandards}
      />
    </motion.div>
  );
};

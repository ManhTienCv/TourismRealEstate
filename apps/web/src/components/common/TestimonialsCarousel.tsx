import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface TestimonialCarouselItem {
  author: string;
  location: string;
  tag: string;
  quote: string;
  image: string;
}

export interface TestimonialsCarouselProps {
  items: TestimonialCarouselItem[];
  title?: string;
  className?: string;
}

const CLICK_COOLDOWN_MS = 380;

const TestimonialSlideCard: React.FC<{ item: TestimonialCarouselItem }> = ({
  item,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center select-none w-full">
      {/* Hộp chữ trắng kem bên trái */}
      <div className="bg-[#FFFDF7] rounded-[22px] border border-[#0C310A]/15 w-full lg:w-[74%] lg:min-h-[clamp(560px,69vh,660px)] p-8 md:p-14 lg:pl-[72px] lg:pr-[14%] lg:py-[64px] flex flex-col justify-between">
        <svg
          viewBox="0 0 64 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-[54px] md:w-[66px] h-auto shrink-0 text-[#57772E] select-none"
        >
          <path
            d="M14.2 48C6.3 48 0.5 42.1 0.5 33.4C0.5 19.6 10.6 6.8 25.4 0.5L28.6 6.4C19.8 11.1 14.9 17.5 14.3 23.6C15.4 23.3 16.5 23.2 17.6 23.2C24.5 23.2 29.6 28.4 29.6 35.5C29.6 42.8 23.2 48 14.2 48ZM48.6 48C40.7 48 34.9 42.1 34.9 33.4C34.9 19.6 45 6.8 59.8 0.5L63 6.4C54.2 11.1 49.3 17.5 48.7 23.6C49.8 23.3 50.9 23.2 52 23.2C58.9 23.2 64 28.4 64 35.5C64 42.8 57.6 48 48.6 48Z"
            fill="currentColor"
          />
        </svg>

        <div className="flex flex-col gap-9 md:gap-11 mt-auto pt-10">
          <p className="font-serif font-normal text-[23px] md:text-[clamp(1.65rem,2.05vw,2.25rem)] leading-[1.32] tracking-[-0.015em] text-[#0C310A]">
            {item.quote}
          </p>

          <div className="font-sans">
            <div className="text-[15px] font-medium text-[#0C310A]">
              {item.author}
            </div>
            <div className="text-[14px] text-[#664A42] mt-0.5">
              {item.location}
            </div>
          </div>
        </div>
      </div>

      {/* Hộp ảnh bên phải chồng lên mép hộp trắng */}
      <div className="relative z-10 w-full lg:w-[36%] lg:-ml-[8%] aspect-[4/3] lg:aspect-auto lg:h-[clamp(450px,56vh,530px)] rounded-[22px] overflow-hidden mt-4 lg:mt-0 shrink-0 bg-[#EAE6DF]">
        <img
          src={`${item.image}?w=1200&q=85&auto=format`}
          alt={item.author}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          loading="eager"
          decoding="async"
        />
        <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#1E1414]/45 backdrop-blur-md text-[#FAF7ED] text-[12px] font-normal font-sans pointer-events-none">
          {item.tag}
        </span>
      </div>
    </div>
  );
};

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  items,
  title,
  className = '',
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const lastClickAtRef = useRef<number>(0);

  // Động cơ Virtual Infinite Track: số nguyên không giới hạn, không khóa click, không reset về 0
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportW, setViewportW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [cursorVisible, setCursorVisible] = useState(false);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

  // Chuyển thẻ an toàn chống double-click vô tình
  const handleStep = (delta: 1 | -1) => {
    const now = performance.now();
    if (now - lastClickAtRef.current < CLICK_COOLDOWN_MS) return;
    lastClickAtRef.current = now;
    setActiveIndex((prev) => prev + delta);
  };

  // Con trỏ mũi tên tròn bám chuột tức thì (không dùng useState cho tọa độ x/y)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useSpring(rawX, { stiffness: 1400, damping: 60, mass: 0.06 });
  const cursorY = useSpring(rawY, { stiffness: 1400, damping: 60, mass: 0.06 });

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const measure = () => {
      const w = vp.clientWidth || window.innerWidth;
      setViewportW((prev) => (prev === w ? prev : w));
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const isDesktop = viewportW >= 1024;
  const slideW = isDesktop
    ? Math.min(1380, Math.round(viewportW * 0.915))
    : Math.round(viewportW * 0.9);
  const gap = isDesktop ? Math.max(100, Math.round(viewportW * 0.09)) : 32;
  const step = slideW + gap;
  const targetX = (viewportW - slideW) / 2 - activeIndex * step;

  // Chọn thẻ có nội dung dài nhất làm khung giữ chiều cao tàng hình để không bao giờ bị xẹp hay cắt đáy trên mobile
  const tallestItem = useMemo(() => {
    if (!items.length) return null;
    return items.reduce((longest, cur) =>
      cur.quote.length > longest.quote.length ? cur : longest
    );
  }, [items]);

  if (!items.length || !tallestItem) return null;

  const slots = [
    activeIndex - 3,
    activeIndex - 2,
    activeIndex - 1,
    activeIndex,
    activeIndex + 1,
    activeIndex + 2,
    activeIndex + 3,
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.jump(x - 40);
    rawY.jump(y - 40);
    setDirection(x < rect.width / 2 ? 'prev' : 'next');
    setCursorVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x - 40);
    rawY.set(y - 40);

    const nextDir = x < rect.width / 2 ? 'prev' : 'next';
    setDirection((prev) => (prev !== nextDir ? nextDir : prev));
    if (!cursorVisible) setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    handleStep(x < rect.width / 2 ? -1 : 1);
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Tiêu đề tùy chọn căn trái thẳng hàng tuyệt đối với mép trái thẻ */}
      {title && (
        <div style={{ width: slideW }} className="mx-auto mb-8 md:mb-10">
          <h3 className="font-serif font-normal text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.025em] text-[#0C310A] text-left">
            {title}
          </h3>
        </div>
      )}

      {/* Vùng tương tác Carousel tràn 100% chiều ngang */}
      <div
        ref={viewportRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleViewportClick}
        className="relative w-full overflow-hidden py-2 cursor-pointer lg:cursor-none"
      >
        {/* Con trỏ mũi tên tròn 80x80 bám chuột tức thì trên Desktop */}
        <motion.div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          initial={false}
          animate={
            cursorVisible
              ? { scale: 1, opacity: 1 }
              : { scale: 0.6, opacity: 0 }
          }
          transition={{ duration: 0.15 }}
          className="pointer-events-none hidden lg:flex absolute top-0 left-0 z-30 w-[80px] h-[80px] rounded-full bg-[#FAF7ED]/45 backdrop-blur-md border border-[#0C310A]/25 shadow-sm items-center justify-center text-[#0C310A] will-change-transform"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-150 ${
              direction === 'prev' ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>

        {/* Thẻ giữ chiều cao tàng hình nằm trong luồng thường */}
        <div
          aria-hidden="true"
          style={{ width: slideW }}
          className="invisible pointer-events-none select-none mx-auto"
        >
          <TestimonialSlideCard item={tallestItem} />
        </div>

        {/* Cửa sổ 7 slot ảo trượt mượt 1 chiều không giới hạn */}
        <motion.div
          initial={false}
          animate={{ x: targetX }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-2 left-0 will-change-transform"
        >
          {slots.map((s) => {
            const item =
              items[((s % items.length) + items.length) % items.length];
            return (
              <div
                key={s}
                style={{ width: slideW, left: s * step }}
                className="absolute top-0"
              >
                <TestimonialSlideCard item={item} />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Điều hướng cảm ứng trên Mobile / Tablet (< lg) */}
      <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => handleStep(-1)}
          className="w-11 h-11 rounded-full bg-[#FFFDF7] border border-[#0C310A]/15 shadow-sm flex items-center justify-center text-[#0C310A] active:scale-95 transition-transform"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => handleStep(1)}
          className="w-11 h-11 rounded-full bg-[#FFFDF7] border border-[#0C310A]/15 shadow-sm flex items-center justify-center text-[#0C310A] active:scale-95 transition-transform"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;

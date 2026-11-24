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

const TestimonialSlideCard: React.FC<{ item: TestimonialCarouselItem }> = ({
  item,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center select-none w-full">
      {/* Hộp chữ trắng kem bên trái (cao 540px trên desktop, nhô cao và sâu hơn ảnh ~60px ở cả 2 đầu) */}
      <div className="bg-[#FFFDF7] rounded-[22px] border border-[#0C310A]/10 w-full lg:w-[75%] lg:min-h-[540px] p-8 md:p-14 lg:pl-16 lg:pr-[18%] lg:py-16 flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-6">
          <span
            aria-hidden="true"
            className="font-serif font-bold text-[88px] md:text-[104px] leading-[0.58] text-[#57772E] select-none block"
          >
            “
          </span>
          <p className="font-serif font-normal text-[22px] md:text-[29px] lg:text-[31px] leading-[1.32] tracking-[-0.015em] text-[#0C310A]">
            {item.quote}
          </p>
        </div>

        <div className="font-sans">
          <div className="text-[15px] font-medium text-[#0C310A]">
            {item.author}
          </div>
          <div className="text-[14px] text-[#664A42] mt-0.5">
            {item.location}
          </div>
        </div>
      </div>

      {/* Hộp ảnh bên phải chồng nhẹ lên mép phải hộp trắng và ngắn hơn hộp trắng (420px) */}
      <div className="relative z-10 w-full lg:w-[37%] lg:-ml-[12%] aspect-[4/3] lg:aspect-auto lg:h-[420px] rounded-[22px] overflow-hidden shadow-[0_8px_30px_rgba(12,49,10,0.08)] mt-4 lg:mt-0 shrink-0 bg-[#EAE6DF]">
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

  // Động cơ Virtual Infinite Track: số nguyên không giới hạn, không khóa click, không reset về 0
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportW, setViewportW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [cursorVisible, setCursorVisible] = useState(false);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

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
    ? Math.min(1180, Math.round(viewportW * 0.88))
    : Math.round(viewportW * 0.9);
  const gap = isDesktop ? Math.max(120, Math.round(viewportW * 0.12)) : 32;
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
    rawX.jump(x - 36);
    rawY.jump(y - 36);
    setDirection(x < rect.width / 2 ? 'prev' : 'next');
    setCursorVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x - 36);
    rawY.set(y - 36);

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
    if (x < rect.width / 2) {
      setActiveIndex((prev) => prev - 1);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
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
        onClick={handleViewportClick}
        className="relative w-full overflow-hidden py-2 cursor-pointer lg:cursor-none"
      >
        {/* Con trỏ mũi tên tròn 72x72 bám chuột tức thì trên Desktop */}
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
          className="pointer-events-none hidden lg:flex absolute top-0 left-0 z-30 w-[72px] h-[72px] rounded-full bg-[#FFFDF7]/80 backdrop-blur-md border border-[#0C310A]/15 shadow-sm items-center justify-center text-[#0C310A] will-change-transform"
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
          transition={{
            type: 'spring',
            stiffness: 190,
            damping: 26,
            mass: 0.75,
          }}
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
          onClick={() => setActiveIndex((prev) => prev - 1)}
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
          onClick={() => setActiveIndex((prev) => prev + 1)}
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

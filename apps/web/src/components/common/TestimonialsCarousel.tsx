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

const CLICK_COOLDOWN_MS = 420;

const TestimonialSlideCard: React.FC<{ item: TestimonialCarouselItem }> = ({
  item,
}) => {
  return (
    <div className="px-[clamp(1.5rem,3.75587vw_+_0.619718rem,4rem)] w-full h-full">
      <div className="relative w-full h-full select-none grid grid-rows-[1fr_auto] min-[940px]:block">
        {/* Hộp chữ .content (9/12 cột ~ 75.5% bề ngang trên desktop) */}
        <div className="w-full min-[940px]:w-[75.5%] h-full bg-[#FFFDF6] border border-[#D0D4C8] rounded-[clamp(16px,13.1831px_+_0.751174vw,24px)] pt-[clamp(1.5rem,0.795775rem_+_3.0047vw,3.5rem)] pb-[32%] min-[940px]:pb-[clamp(1.5rem,0.795775rem_+_3.0047vw,3.5rem)] pl-[clamp(1.5rem,0.795775rem_+_3.0047vw,3.5rem)] pr-[clamp(1.5rem,0.795775rem_+_3.0047vw,3.5rem)] min-[940px]:pr-[clamp(6.5rem,11.7vw,10.5rem)] flex flex-col justify-between">
          {/* Icon dấu ngoặc kép SVG màu #57772E */}
          <div className="h-[clamp(2rem,1.47183rem_+_2.25352vw,3.5rem)] shrink-0">
            <svg
              viewBox="0 0 64 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-full w-auto text-[#57772E] select-none"
            >
              <path
                d="M14.2 48C6.3 48 0.5 42.1 0.5 33.4C0.5 19.6 10.6 6.8 25.4 0.5L28.6 6.4C19.8 11.1 14.9 17.5 14.3 23.6C15.4 23.3 16.5 23.2 17.6 23.2C24.5 23.2 29.6 28.4 29.6 35.5C29.6 42.8 23.2 48 14.2 48ZM48.6 48C40.7 48 34.9 42.1 34.9 33.4C34.9 19.6 45 6.8 59.8 0.5L63 6.4C54.2 11.1 49.3 17.5 48.7 23.6C49.8 23.3 50.9 23.2 52 23.2C58.9 23.2 64 28.4 64 35.5C64 42.8 57.6 48 48.6 48Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Khối văn bản trích dẫn + tác giả */}
          <div>
            <h5 className="mt-[clamp(1.5rem,0.267606rem_+_5.25822vw,5rem)] font-serif font-normal text-[#0C310A] text-[clamp(1.45rem,1.2vw_+_0.9rem,2.15rem)] leading-[1.32] tracking-[-0.015em]">
              {item.quote}
            </h5>

            <div className="mt-[clamp(1.5rem,1.14789rem_+_1.50235vw,2.5rem)] flex flex-col font-sans text-[#1E1414] text-[clamp(0.875rem,0.786972rem_+_0.375587vw,1.125rem)] leading-[clamp(1.225rem,1.06215rem_+_0.694836vw,1.6875rem)] tracking-[clamp(-0.01125rem,0.00396127rem_-_0.0169014vw,0rem)]">
              <span className="font-medium">{item.author}</span>
              <span className="opacity-50">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Hộp ảnh .image (4/12 cột ~ 32.4% bề ngang, thụt đúng 3rem trên & dưới hộp trắng, không đổ bóng) */}
        <div className="relative min-[940px]:absolute min-[940px]:top-12 min-[940px]:bottom-12 min-[940px]:right-0 min-[940px]:w-[32.4%] aspect-video min-[940px]:aspect-auto -mt-[25%] min-[940px]:mt-0 mx-[clamp(1.5rem,0.795775rem_+_3.0047vw,3.5rem)] min-[940px]:mx-0 rounded-[clamp(16px,13.1831px_+_0.751174vw,24px)] [overflow:clip] p-4 flex justify-end items-start bg-[#EAE6DF]">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={`${item.image}?w=1200&q=85&auto=format`}
              alt={item.author}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </div>
          <span className="relative z-10 px-3.5 py-1.5 rounded-full bg-[#1E1414]/45 backdrop-blur-md text-[#FFFDF6] text-[12px] leading-none font-normal font-sans pointer-events-none">
            {item.tag}
          </span>
        </div>
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
  const touchStartXRef = useRef<number | null>(null);

  // Động cơ Virtual Infinite Track: 100% viewport/slide, không giới hạn, không tua ngược
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportW, setViewportW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [cursorVisible, setCursorVisible] = useState(false);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

  // Chuyển thẻ điềm tĩnh chống vội & chống double-click (550ms cooldown)
  const handleStep = (delta: 1 | -1) => {
    const now = performance.now();
    if (now - lastClickAtRef.current < CLICK_COOLDOWN_MS) return;
    lastClickAtRef.current = now;
    setActiveIndex((prev) => prev + delta);
  };

  const handleGoToIndex = (targetModIdx: number) => {
    const now = performance.now();
    if (now - lastClickAtRef.current < CLICK_COOLDOWN_MS) return;
    const currentMod =
      ((activeIndex % items.length) + items.length) % items.length;
    const diff = targetModIdx - currentMod;
    if (diff === 0) return;
    lastClickAtRef.current = now;
    setActiveIndex((prev) => prev + diff);
  };

  // Theo dõi chuột qua useMotionValue + lò xo lơ lửng mềm chuẩn HUTS
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useSpring(rawX, { stiffness: 380, damping: 34, mass: 0.2 });
  const cursorY = useSpring(rawY, { stiffness: 380, damping: 34, mass: 0.2 });

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

  const step = viewportW;
  const targetX = -activeIndex * step;

  // Lấy thẻ có quote dài nhất làm bản sao tàng hình để khóa chiều cao đồng nhất cho mọi slide
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

  const currentModIndex =
    ((activeIndex % items.length) + items.length) % items.length;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
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
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const dx = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(dx) > 40) {
      handleStep(dx < 0 ? 1 : -1);
    }
  };

  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    handleStep(x < rect.width / 2 ? -1 : 1);
  };

  return (
    <section
      className={`relative w-full py-[clamp(3rem,2.20775rem_+_3.38028vw,5.25rem)] [overflow-x:clip] select-none ${className}`}
    >
      {/* Tiêu đề tùy chọn (chỉ trên Trang chủ) căn lề ngang y hệt thẻ */}
      {title && (
        <div className="px-[clamp(1.5rem,3.75587vw_+_0.619718rem,4rem)] mb-8 md:mb-12">
          <h3 className="font-serif font-normal text-[clamp(1.75rem,2.63vw_+_1.13rem,3.5rem)] leading-[1.1] tracking-[-0.025em] text-[#0C310A] text-left">
            {title}
          </h3>
        </div>
      )}

      {/* .slider-wrapper: overflow-visible để không cắt vòng tròn 96px và giữ mix-blend-difference xuyên suốt */}
      <div
        ref={viewportRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleViewportClick}
        className="relative w-full overflow-visible min-[940px]:cursor-pointer"
      >
        {/* Bản sao slide tàng hình nằm trong luồng thường để khóa chiều cao đồng nhất cho mọi slide */}
        <div
          aria-hidden="true"
          className="invisible pointer-events-none select-none w-full"
        >
          <TestimonialSlideCard item={tallestItem} />
        </div>

        {/* Cửa sổ 7 slot ảo trượt mượt điềm tĩnh 1 chiều không giới hạn */}
        <motion.div
          initial={false}
          animate={{ x: targetX }}
          transition={{ duration: 0.6, ease: [0.45, 0, 0.2, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          {slots.map((s) => {
            const item =
              items[((s % items.length) + items.length) % items.length];
            return (
              <div
                key={s}
                style={{ width: viewportW, left: s * step }}
                className="absolute top-0 h-full"
              >
                <TestimonialSlideCard item={item} />
              </div>
            );
          })}
        </motion.div>

        {/* Con trỏ vòng tròn mũi tên 96px (6rem) với mix-blend-difference & lơ lửng mềm chuẩn HUTS */}
        <motion.div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          initial={false}
          animate={
            cursorVisible
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="hidden min-[940px]:flex pointer-events-none absolute top-0 left-0 z-30 w-[6rem] h-[6rem] p-[2rem] rounded-full border border-white bg-transparent backdrop-blur-[4px] mix-blend-difference items-center justify-center will-change-transform"
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

      {/* Dãy chấm tròn pagination trên Mobile (< 940px) */}
      <div className="flex min-[940px]:hidden justify-center gap-2 mt-4">
        {items.map((item, idx) => {
          const isActive = idx === currentModIndex;
          return (
            <button
              key={item.author}
              type="button"
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => handleGoToIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full border transition-colors duration-300 ${
                isActive
                  ? 'bg-[#0C310A] border-[#0C310A]'
                  : 'bg-transparent border-[#D0D4C8]'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

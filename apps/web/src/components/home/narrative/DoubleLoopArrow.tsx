import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface DividerArrowProps {
  variant?: 'loop' | 'sweep' | 'A' | 'B';
  className?: string;
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
}

export const DividerArrow: React.FC<DividerArrowProps> = ({
  variant = 'loop',
  className = 'h-full w-auto',
  strokeColor = '#57772E',
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hiệu ứng hiển thị dần nét vẽ theo nhịp cuộn trang của người dùng
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'center 45%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
    restDelta: 0.001,
  });

  // Nét thân mũi tên vẽ từ trên xuống dưới (0.05 -> 0.85)
  const linePathLength = useTransform(smoothProgress, [0.05, 0.85], [0, 1]);
  // Đầu mũi tên vẽ tiếp nối ở cuối hành trình (0.75 -> 0.98)
  const tipPathLength = useTransform(smoothProgress, [0.75, 0.98], [0, 1]);
  const tipOpacity = useTransform(smoothProgress, [0.7, 0.82], [0, 1]);

  const isSweep = variant === 'sweep' || variant === 'B';

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center h-[217px] w-auto pointer-events-none select-none"
    >
      {isSweep ? (
        /* MẪU B — Mũi tên vắt chéo từ phải sang trái (Dùng cho Mũi tên số 2: giữa 2 khối) */
        <svg
          {...(width ? { width } : { width: '357' })}
          {...(height ? { height } : { height: '268' })}
          viewBox="0 0 357 268"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible select-none pointer-events-none ${className}`}
        >
          <g id="divider-arrow-sweep">
            {/* Path thân: Mũi tên quét từ phải sang trái */}
            <motion.path
              id="line"
              d="M355.377 2.00001C355.377 102.685 321.875 149.594 226.369 161.434C185.004 166.562 18.6108 161.434 18.6108 262"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: linePathLength }}
            />
            {/* Path đầu mũi nhọn */}
            <motion.path
              id="tip"
              d="M4.10686 244.355C6.01943 245.128 7.40235 246.589 8.85801 247.978C13.6383 252.54 17.313 258.941 17.6124 265.599C19.6026 258.667 24.5722 250.344 32.0167 248.371"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: tipPathLength, opacity: tipOpacity }}
            />
          </g>
        </svg>
      ) : (
        /* MẪU A — Mũi tên xoắn (Dùng cho Mũi tên số 1 & Mũi tên số 3) */
        <svg
          {...(width ? { width } : { width: '225' })}
          {...(height ? { height } : { height: '263' })}
          viewBox="0 0 225 263"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible select-none pointer-events-none ${className}`}
        >
          <g id="divider-arrow-loop">
            {/* Path thân: Mũi tên xoắn 2 vòng từ đỉnh xuống đáy */}
            <motion.path
              id="line"
              d="M2.4283 1.99998C-6.5736 40.4912 130.855 54.5 109.454 83.8518C97.5219 100.217 71.5809 53.5103 115.455 63.2918C159 73 160.964 147.471 149.464 183.748C149.167 190.281 140.842 201.464 130.855 195.38C121.891 189.92 117.983 180.022 122.955 172.686C133.459 157.189 168.466 154.842 192.253 183.319C204.219 197.643 208.962 237.817 206.266 254"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: linePathLength }}
            />
            {/* Path đầu mũi nhọn */}
            <motion.path
              id="tip"
              d="M223.143 239.988C220.861 240.441 219.017 241.787 217.108 243.035C210.84 247.134 205.4 253.553 203.638 261.002C202.926 252.741 199.217 242.255 191.406 238.394"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: tipPathLength, opacity: tipOpacity }}
            />
          </g>
        </svg>
      )}
    </div>
  );
};

// Alias DoubleLoopArrow for full backwards compatibility
export const DoubleLoopArrow = DividerArrow;
export default DividerArrow;

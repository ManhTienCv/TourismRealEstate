import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface DoubleLoopArrowProps {
  className?: string;
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
}

export const DoubleLoopArrow: React.FC<DoubleLoopArrowProps> = ({
  className = 'w-[180px] sm:w-[210px] md:w-[225px] h-auto',
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

  return (
    <div ref={containerRef} className="inline-flex justify-center items-center pointer-events-none select-none">
      <svg
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        viewBox="0 0 225 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`overflow-visible select-none pointer-events-none ${className}`}
      >
        <g id="divider-arrow">
          {/* Thân mũi tên xoắn 2 vòng chuẩn tọa độ 1:1 từ HUTS gốc, vẽ progressive từ trên xuống dưới */}
          <motion.path
            d="M2.4283 1.99998C-6.5736 40.4912 130.855 54.5 109.454 83.8518C97.5219 100.217 71.5809 53.5103 115.455 63.2918C159 73 160.964 147.471 149.464 183.748C149.167 190.281 140.842 201.464 130.855 195.38C121.891 189.92 117.983 180.022 122.955 172.686C133.459 157.189 168.466 154.842 192.253 183.319C204.219 197.643 208.962 237.817 206.266 254"
            stroke={strokeColor}
            strokeWidth="3"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: linePathLength }}
          />
          {/* Đầu mũi tên chữ V chỉ xuống dưới */}
          <motion.path
            d="M191.406 238.394C199.217 242.255 202.926 252.741 203.638 261.002C205.4 253.553 210.84 247.134 217.108 243.035C219.017 241.787 220.861 240.441 223.143 239.988"
            stroke={strokeColor}
            strokeWidth="3"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: tipPathLength, opacity: tipOpacity }}
          />
        </g>
      </svg>
    </div>
  );
};

export default DoubleLoopArrow;

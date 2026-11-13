import React from 'react';
import { motion } from 'framer-motion';

export interface DoubleLoopArrowProps {
  className?: string;
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
}

export const DoubleLoopArrow: React.FC<DoubleLoopArrowProps> = ({
  className = 'w-[200px] sm:w-[240px] md:w-[270px] lg:w-[285px] h-auto',
  strokeColor = '#4B6B3B',
  width,
  height,
}) => {
  return (
    <svg
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none pointer-events-none ${className}`}
    >
      {/* Thân mũi tên: đuôi móc nhẹ + 2 vòng xoắn lệch chuẩn 1:1 HUTS */}
      <motion.path
        d="M 21 13 C 22 28, 62 38, 88 58 C 98 66, 92 80, 82 76 C 73 72, 75 55, 92 56 C 112 57, 123 78, 122 108 C 121 130, 110 144, 102 139 C 94 134, 96 116, 118 116 C 142 116, 155 140, 152 181"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.15, ease: 'easeInOut' }}
      />
      {/* Đầu mũi tên chữ V mở bất đối xứng tự nhiên */}
      <motion.path
        d="M 144 164 C 148 170, 151 176, 152 182 C 156 175, 161 169, 168 166"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, delay: 0.9, ease: 'easeOut' }}
      />
    </svg>
  );
};

export default DoubleLoopArrow;

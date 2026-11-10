import React from 'react';
import { motion } from 'framer-motion';

export interface DoubleLoopArrowProps {
  className?: string;
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
}

export const DoubleLoopArrow: React.FC<DoubleLoopArrowProps> = ({
  className = '',
  strokeColor = '#4B6B3B',
  width = 220,
  height = 198,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-12 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none pointer-events-none ${className}`}
    >
      {/* Thân mũi tên uốn 2 vòng xoắn (Scroll path drawing animation) */}
      <motion.path
        d="M 20 20 C 45 40, 85 35, 90 55 C 92 70, 70 70, 72 52 C 75 35, 115 45, 118 95 C 120 125, 90 130, 92 110 C 95 90, 145 100, 145 155"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      {/* Đầu mũi tên hướng xuống (Hiển thị mượt mà khi thân vẽ xong) */}
      <motion.path
        d="M 136 142 C 141 147, 144 152, 145 157 C 147 151, 151 146, 156 143"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, delay: 0.85, ease: 'easeOut' }}
      />
    </svg>
  );
};

export default DoubleLoopArrow;

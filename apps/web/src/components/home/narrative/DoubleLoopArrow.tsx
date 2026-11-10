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
  width = 280,
  height = 250,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none pointer-events-none ${className}`}
    >
      {/* Thân mũi tên uốn lượn 2 vòng xoắn (Scroll path drawing animation) */}
      <motion.path
        d="M 42 8 C 68 26, 96 40, 114 54 C 124 66, 104 72, 108 58 C 112 43, 140 50, 142 90 C 144 116, 120 120, 123 136 C 125 148, 144 148, 148 136 C 152 122, 172 140, 175 188"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.15, ease: 'easeInOut' }}
      />
      {/* Đầu mũi tên hướng xuống (Hiển thị mượt mà khi thân vẽ xong) */}
      <motion.path
        d="M 166 175 C 171 182, 174 186, 175 190 C 177 185, 181 181, 186 177"
        stroke={strokeColor}
        strokeWidth="2.2"
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

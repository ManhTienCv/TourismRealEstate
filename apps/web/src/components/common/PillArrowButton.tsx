import React from 'react';

export interface PillArrowButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'dark' | 'light'; // 'dark' for warm cream background, 'light' for dark image/footer background
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export const PillArrowButton: React.FC<PillArrowButtonProps> = ({
  label,
  href,
  onClick,
  variant = 'dark',
  className = '',
  type = 'button',
  title,
}) => {
  const baseBorder =
    variant === 'dark'
      ? 'border-[#0C310A]/80 text-[#0C310A] bg-transparent group-hover:bg-[#0C310A] group-hover:text-white group-hover:border-[#0C310A]'
      : 'border-white/60 text-white bg-transparent group-hover:bg-white group-hover:text-[#0C310A] group-hover:border-white';

  const content = (
    <>
      {/* Pill with Label Text */}
      <span
        className={`px-6 sm:px-7 py-3 rounded-[104px] border text-[14px] leading-[1.4] font-normal tracking-tight transition-all duration-300 shadow-xs ${baseBorder}`}
      >
        {label}
      </span>

      {/* Circle with Arrow Icon */}
      <span
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[104px] border flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 ${baseBorder}`}
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        title={title || label}
        className={`group inline-flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      title={title || label}
      className={`group inline-flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform ${className}`}
    >
      {content}
    </button>
  );
};

export default PillArrowButton;

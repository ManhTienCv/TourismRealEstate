import React, { useRef, useEffect } from 'react';
import './HutsButton.css';

const SCRIBBLE_PATH =
  'M-11.7907 25.5948C-1.99079 7.39406 53.3086 -7.30655 91.8081 -10.8067C130.308 -14.3068 164.607 -12.2068 129.608 1.79383C94.6081 15.7944 37.9088 5.29517 -4.79076 43.0967C-47.4903 80.8983 1.50917 68.9978 11.3091 61.2975C21.1089 53.5972 55.4086 37.4965 79.2083 36.0965C103.008 34.6964 153.407 32.5939 174.407 1.79383C195.407 -29.0063 219.207 -29.0063 196.807 13.6955C174.407 56.3973 105.808 57.7985 84.8083 61.2975C63.8085 64.7965 44.9087 67.5966 32.3089 78.0971C19.709 88.5975 127.508 83.6962 157.607 72.4968C187.707 61.2975 218.507 24.8948 227.607 -1.00624C236.707 -26.9073 261.906 -7.3065 252.806 7.39411C243.706 22.0947 217.807 55.6961 207.307 66.8966C196.807 78.0971 219.207 96.9978 236.007 72.4968C252.806 47.9958 280.106 15.7945 285.706 7.39411';

export interface HutsButtonProps {
  children: React.ReactNode;
  variant?: 'secondary' | 'primary' | 'nav' | 'sock';
  withArrow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  href?: string;
  to?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  target?: string;
  rel?: string;
}

export const HutsButton: React.FC<HutsButtonProps> = ({
  children,
  variant = 'secondary',
  withArrow = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  to,
  className = '',
  type = 'button',
  title,
  target,
  rel,
}) => {
  const btnRef = useRef<HTMLElement | null>(null);

  // Đo kích thước tổng của nút để đồng bộ hoàn hảo tọa độ nét cọ SVG giữa 2 khối
  const syncWidth = (node: HTMLElement | null) => {
    btnRef.current = node;
    if (node && node.offsetWidth > 0) {
      node.style.setProperty('--btn-total-width', `${node.offsetWidth}px`);
    }
  };

  useEffect(() => {
    if (btnRef.current && btnRef.current.offsetWidth > 0) {
      btnRef.current.style.setProperty('--btn-total-width', `${btnRef.current.offsetWidth}px`);
    }
  }, [children, withArrow]);

  const buttonClasses = `huts-btn button-${variant} ${withArrow ? 'w-arrow' : ''} ${className}`;

  const innerContent = (
    <>
      {/* 1. Khối chữ */}
      <div className="text-wrapper">
        <svg viewBox="0 0 260 64" fill="none" className="btn-path" aria-hidden="true">
          <path d={SCRIBBLE_PATH} strokeWidth="30" pathLength="1000" strokeLinecap="butt" />
        </svg>
        <span>{children}</span>
      </div>

      {/* 2. Khối tròn icon mũi tên bên phải */}
      {withArrow && (
        <div className="btn-icon" aria-hidden="true">
          <svg viewBox="0 0 260 64" fill="none" className="btn-path" aria-hidden="true">
            <path d={SCRIBBLE_PATH} strokeWidth="30" pathLength="1000" strokeLinecap="butt" />
          </svg>
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" className="btn-icon-svg">
            <path className="stroke" d="M0 8.99805H16.7802" strokeWidth="1.8" />
            <path
              className="stroke"
              d="M11.0684 17.7976C11.0684 12.77 14.3032 8.99938 18.0001 8.99938C15.6895 8.41283 11.0684 5.83203 11.0684 0.201172"
              strokeWidth="1.8"
            />
          </svg>
        </div>
      )}
    </>
  );

  const linkUrl = href || to;
  if (linkUrl) {
    return (
      <a
        ref={syncWidth as React.RefCallback<HTMLAnchorElement>}
        href={linkUrl}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={buttonClasses}
        title={title}
        target={target}
        rel={rel}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={syncWidth as React.RefCallback<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={buttonClasses}
      title={title}
    >
      {innerContent}
    </button>
  );
};

export default HutsButton;

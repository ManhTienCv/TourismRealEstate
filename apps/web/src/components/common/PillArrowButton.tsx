import React from 'react';
import { HutsButton } from './HutsButton';

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
  return (
    <HutsButton
      variant={variant === 'light' ? 'primary' : 'secondary'}
      withArrow={true}
      href={href}
      onClick={onClick}
      className={className}
      type={type}
      title={title || label}
    >
      {label}
    </HutsButton>
  );
};

export default PillArrowButton;

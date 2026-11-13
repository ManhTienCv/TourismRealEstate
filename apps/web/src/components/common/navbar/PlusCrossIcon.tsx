import React from 'react';
import { Plus } from 'lucide-react';

interface PlusCrossIconProps {
  isOpen: boolean;
  colorClass?: string;
}

export const PlusCrossIcon: React.FC<PlusCrossIconProps> = ({ isOpen, colorClass = 'text-current' }) => (
  <span className="relative inline-flex items-center justify-center w-3 h-3 ml-1 shrink-0">
    <Plus
      className={`w-3 h-3 transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        isOpen ? 'rotate-45' : 'rotate-0'
      } ${colorClass}`}
      strokeWidth={2}
    />
  </span>
);

export default PlusCrossIcon;

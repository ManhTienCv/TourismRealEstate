import React from 'react';
import { Plus } from 'lucide-react';

interface PlusCrossIconProps {
  isOpen: boolean;
  isTransparent?: boolean;
}

export const PlusCrossIcon: React.FC<PlusCrossIconProps> = ({ isOpen, isTransparent = false }) => (
  <span className="relative flex items-center justify-center w-3.5 h-3.5 ml-0.5">
    <Plus
      className={`w-3 h-3 transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        isOpen ? 'rotate-45' : 'rotate-0'
      } ${isOpen ? 'text-[#0C310A]' : isTransparent ? 'text-white' : 'text-[#0C310A]'}`}
      strokeWidth={2.5}
    />
  </span>
);

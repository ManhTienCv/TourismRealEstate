import React from 'react';
import { Plus } from 'lucide-react';

interface PlusCrossIconProps {
  isOpen: boolean;
  isTransparent?: boolean;
}

export const PlusCrossIcon: React.FC<PlusCrossIconProps> = ({ isOpen, isTransparent = false }) => (
  <span className="relative flex items-center justify-center w-3.5 h-3.5 ml-0.5">
    <Plus
      className={`w-3 h-3 transition-transform duration-200 ease-in-out ${
        isOpen ? 'rotate-45' : 'rotate-0'
      } ${isOpen ? 'text-tie-ink' : isTransparent ? 'text-white' : 'text-tie-ink'}`}
      strokeWidth={2.5}
    />
  </span>
);

import React from 'react';

export const SolutionIcons: Record<string, React.ReactNode> = {
  'starter-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'forever-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'second-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  'hybrid-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'adu': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  'investment-property': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  'micro-hospitality': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M14 9h.01M10 9h.01" />
    </svg>
  ),
  'multi-gen-compound': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export const WIZARD_STEPS = [
  { num: 1, label: '01. Purpose' },
  { num: 2, label: '02. Site & Land' },
  { num: 3, label: '03. Standard' },
  { num: 4, label: '04. Craft & Add-ons' },
  { num: 5, label: '05. Live Pro-Forma' },
];

export interface FooterLinkItem {
  label: string;
  slug?: string;
  type?: 'solution' | 'standard' | 'scroll' | 'tab' | 'wizard';
  target?: string;
}

export const FOOTER_SOLUTIONS = [
  { label: 'Starter Home', slug: 'starter-home' },
  { label: 'Forever Home', slug: 'forever-home' },
  { label: 'Second Home', slug: 'second-home' },
  { label: 'Hybrid Home', slug: 'hybrid-home' },
  { label: 'ADU', slug: 'adu' },
  { label: 'Income Property', slug: 'income-property' },
  { label: 'Micro-Hospitality', slug: 'micro-hospitality' },
  { label: 'Multi-Gen Compound', slug: 'multi-gen-compound' },
];

export const FOOTER_STANDARDS = [
  { label: 'What is a Standard?', slug: 'what-is-a-standard' },
  { label: 'Small Bar', slug: 'small-bar' },
  { label: 'Medium Bar', slug: 'medium-bar' },
  { label: 'Big Bar', slug: 'big-bar' },
  { label: 'Dogtrot', slug: 'dogtrot' },
  { label: 'Small L', slug: 'small-l' },
  { label: 'Big L', slug: 'big-l' },
  { label: 'Village', slug: 'village' },
  { label: 'ADU', slug: 'adu' },
];

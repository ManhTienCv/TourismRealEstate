export type HousingSolutionSlug =
  | 'starter-home'
  | 'forever-home'
  | 'second-home'
  | 'hybrid-home'
  | 'adu'
  | 'investment-property'
  | 'micro-hospitality'
  | 'multi-gen-compound';

export interface HousingSolution {
  id: string;
  slug: HousingSolutionSlug;
  title: string;
  subtitle: string;
  description: string;
  buyerPersona: string;
  idealPlans: string[]; // standard plan slugs
  recommendedBudget: {
    min: number;
    max: number;
    currency: string;
  };
  keyBenefits: string[];
  heroImageUrl: string;
  accentColor?: string;
}

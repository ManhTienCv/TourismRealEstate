export type StandardPlanSlug =
  | 'adu'
  | 'small-bar'
  | 'medium-bar'
  | 'big-bar'
  | 'dogtrot'
  | 'small-l'
  | 'big-l'
  | 'village';

export interface StandardPlan {
  id: string;
  slug: StandardPlanSlug;
  name: string;
  code: string;
  tagline: string;
  description: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  moduleCount: number;
  footprint: {
    widthFt: number;
    lengthFt: number;
  };
  ceilingHeightFt: number;
  baseHardCost: number;
  baseTimelineWeeks: number;
  exteriorImageUrl: string; // Photographic exterior default view
  axon3dImageUrl: string;    // Clean architectural axonometric 3D diagram on white background for hover state
  floorPlanUrl: string;
  interiorImages: string[];
  features: string[];
  idealSolutions: string[];  // HousingSolutionSlug[]
  architecturalNotes: string;
}

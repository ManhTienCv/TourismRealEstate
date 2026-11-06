import { HousingSolutionSlug } from './housing-solution';
import { StandardPlanSlug } from './standard-plan';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  stateOrRegion: string;
  completedYear: number;
  durationMonths: number;
  standardPlanSlug: StandardPlanSlug;
  standardPlanName: string;
  housingSolutionSlug: HousingSolutionSlug;
  housingSolutionTitle: string;
  totalCost: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  heroImage: string;
  gallery: string[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
    city: string;
  };
  specs: {
    foundation: string;
    cladding: string;
    roof: string;
    interiorFinish: string;
    solarKw?: number;
    offGrid: boolean;
  };
  narrative: string[];
  keyOutcomes: string[];
}

import { HousingSolutionSlug } from './housing-solution';
import { StandardPlanSlug } from './standard-plan';

export type FoundationType =
  | 'slab_on_grade'
  | 'crawl_space'
  | 'pier_and_beam'
  | 'full_basement';

export type CladdingType =
  | 'thermally_modified_pine'
  | 'standing_seam_zinc'
  | 'cedar_shingle'
  | 'board_and_batten';

export type RoofProfileType =
  | 'gable_pitched'
  | 'mono_shed'
  | 'flat_living_green';

export type InteriorFinishType =
  | 'essential_nordic'
  | 'crafted_warm_wood'
  | 'luxe_architectural';

export type EnergyPackageType =
  | 'high_efficiency_grid'
  | 'solar_ready_heatpump'
  | 'net_zero_passive_battery';

export type SitePrepLevelType =
  | 'flat_cleared'
  | 'moderate_slope'
  | 'steep_rocky';

export interface EstimateConfigurationSpecs {
  foundationType: FoundationType;
  claddingType: CladdingType;
  roofProfile: RoofProfileType;
  interiorFinish: InteriorFinishType;
  energyPackage: EnergyPackageType;
  sitePrepLevel: SitePrepLevelType;
  additions: {
    outdoorDeckSqft: number; // e.g. 0, 200, 400, 600
    detachedSauna: boolean;
    screenedPorch: boolean;
    carportEV: boolean;
  };
}

export interface ProFormaCostBreakdown {
  baseHardCost: number;
  optionsHardCost: number;
  totalHardCost: number;
  sitePrepCost: number;
  softCost: number;          // Permitting, architectural engineering, site survey (approx 12-14% of hard costs)
  contingencyCost: number;   // Mandatory 5% contingency buffer
  grandTotalCost: number;
  pricePerSqft: number;
  estimatedTimelineWeeks: number;
  costItems: {
    category: 'Hard Cost' | 'Site Prep' | 'Soft Cost' | 'Contingency';
    name: string;
    description: string;
    amount: number;
  }[];
}

export interface CreateEstimateDto {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  siteZipCode?: string;
  housingSolutionSlug: HousingSolutionSlug;
  standardPlanSlug: StandardPlanSlug;
  customSpecs: EstimateConfigurationSpecs;
  notes?: string;
}

export interface ProjectEstimate {
  id: string;
  estimateNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  siteZipCode?: string;
  housingSolutionSlug: HousingSolutionSlug;
  standardPlanSlug: StandardPlanSlug;
  customSpecs: EstimateConfigurationSpecs; // Stored as JSONB in PostgreSQL
  costBreakdown: ProFormaCostBreakdown;   // Stored as JSONB or computed
  status: 'draft' | 'saved' | 'review_requested' | 'consultation_scheduled';
  createdAt: string;
  updatedAt: string;
}

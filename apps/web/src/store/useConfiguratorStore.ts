import { create } from 'zustand';
import {
  calculateProForma,
  EstimateConfigurationSpecs,
  HousingSolutionSlug,
  ProFormaCostBreakdown,
  SEED_STANDARD_PLANS,
  StandardPlan,
  StandardPlanSlug,
} from '@tie/shared';

export type LandStatusType = 'owned' | 'looking' | 'evaluating';
export type TerrainCondition = 'flat' | 'sloped' | 'mountainous';
export type FinishTierOption = 'essential' | 'signature' | 'bespoke';
export type CladdingOption = 'pine' | 'zinc' | 'cedar' | 'shou_sugi_ban';

export interface WizardAddons {
  wraparoundDeck: boolean; // $26,000
  solarBatteryPack: boolean; // $38,000
  radiantHeating: boolean; // $12,500
  detachedSauna: boolean; // $24,500
  screenedPorch: boolean; // $18,500
  evCarport: boolean; // $15,000
}

export interface ConfiguratorState {
  // Navigation / Drawer states
  activeTab: 'home' | 'standards' | 'portfolio' | 'configurator' | 'field-report';
  isConfiguratorOpen: boolean; // Controls GetStartedWizard drawer/modal
  selectedPlanForDetail: StandardPlan | null;
  selectedProjectSlug: string | null;
  selectedSolutionSlug: string | null; // Controls Solution Detail View (Starter Home, Forever Home, etc.)

  // Catalog Filters
  filterSolutionSlug: string | null;
  filterBeds: number | null;
  filterSqftCategory: 'all' | 'compact' | 'mid' | 'estate';

  // Configurator Wizard Selections (5 Steps)
  step: number; // 1 to 5
  housingSolutionSlug: HousingSolutionSlug;
  landStatus: LandStatusType;
  terrain: TerrainCondition;
  standardPlanSlug: StandardPlanSlug;
  finishTier: FinishTierOption;
  cladding: CladdingOption;
  wizardAddons: WizardAddons;

  // Computed Pro-Forma
  proForma: ProFormaCostBreakdown;

  // Actions
  setActiveTab: (tab: 'home' | 'standards' | 'portfolio' | 'configurator' | 'field-report') => void;
  openConfigurator: (planSlug?: StandardPlanSlug, solutionSlug?: HousingSolutionSlug) => void;
  closeConfigurator: () => void;
  openPlanDetail: (plan: StandardPlan) => void;
  closePlanDetail: () => void;
  openProjectDetail: (slug: string) => void;
  closeProjectDetail: () => void;
  openSolutionDetail: (slug: string) => void;
  closeSolutionDetail: () => void;

  setFilterSolutionSlug: (slug: string | null) => void;
  setFilterBeds: (beds: number | null) => void;
  setFilterSqftCategory: (cat: 'all' | 'compact' | 'mid' | 'estate') => void;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setHousingSolution: (slug: HousingSolutionSlug) => void;
  setLandStatus: (status: LandStatusType) => void;
  setTerrain: (terrain: TerrainCondition) => void;
  setStandardPlan: (slug: StandardPlanSlug) => void;
  setFinishTier: (tier: FinishTierOption) => void;
  setCladding: (cladding: CladdingOption) => void;
  toggleAddon: (key: keyof WizardAddons) => void;
}

const getPlan = (slug: StandardPlanSlug): StandardPlan => {
  return SEED_STANDARD_PLANS.find((p) => p.slug === slug) || SEED_STANDARD_PLANS[0];
};

function recomputeProForma(
  planSlug: StandardPlanSlug,
  terrain: TerrainCondition,
  finishTier: FinishTierOption,
  cladding: CladdingOption,
  addons: WizardAddons
): ProFormaCostBreakdown {
  const plan = getPlan(planSlug);
  const sqft = plan.sqft;

  // Base hard cost
  const baseHard = plan.baseHardCost;

  // Finish tier cost
  let finishCost = 0;
  if (finishTier === 'signature') finishCost = sqft * 35;
  if (finishTier === 'bespoke') finishCost = sqft * 68;

  // Cladding cost
  let claddingRate = 18;
  if (cladding === 'zinc') claddingRate = 34;
  if (cladding === 'cedar') claddingRate = 24;
  if (cladding === 'shou_sugi_ban') claddingRate = 28;
  const claddingCost = Math.round(sqft * 1.35 * claddingRate);

  // Addons cost
  let addonsCost = 0;
  if (addons.wraparoundDeck) addonsCost += 26000;
  if (addons.solarBatteryPack) addonsCost += 38000;
  if (addons.radiantHeating) addonsCost += 12500;
  if (addons.detachedSauna) addonsCost += 24500;
  if (addons.screenedPorch) addonsCost += 18500;
  if (addons.evCarport) addonsCost += 15000;

  // Foundation & Site Prep
  let siteCost = 18500; // Flat
  let terrainWeeks = 0;
  if (terrain === 'sloped') {
    siteCost = 34000; // +18% site complexity
    terrainWeeks = 2;
  } else if (terrain === 'mountainous') {
    siteCost = 58000; // +35% site complexity
    terrainWeeks = 4;
  }

  const totalHard = baseHard + finishCost + claddingCost + addonsCost;
  const softCost = Math.round(totalHard * 0.115 + 6500);

  const subtotal = totalHard + siteCost + softCost;
  const contingency = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + contingency;

  const costItems: ProFormaCostBreakdown['costItems'] = [
    {
      category: 'Hard Cost',
      name: `Base Modular Fabrication — ${plan.name} (${sqft.toLocaleString()} sqft)`,
      description: 'Offsite precision timber framing, continuous insulation, pre-installed MEP',
      amount: baseHard,
    },
    {
      category: 'Hard Cost',
      name: `Interior Craft: ${finishTier.toUpperCase()} Tier`,
      description: finishTier === 'essential' ? 'Essential Nordic (Birch ply & polished concrete)' : finishTier === 'signature' ? 'Signature (European white oak & honed soapstone)' : 'Bespoke (Microcement, travertine & walnut joinery)',
      amount: finishCost,
    },
    {
      category: 'Hard Cost',
      name: `Exterior Cladding: ${cladding.toUpperCase()}`,
      description: 'Architectural rainscreen with ventilated moisture drainage cavity',
      amount: claddingCost,
    },
    {
      category: 'Site Prep',
      name: `Site Civil Preparation (${terrain.toUpperCase()} Terrain)`,
      description: terrain === 'flat' ? 'Flat clear meadow grading' : terrain === 'sloped' ? 'Terraced grading & extended utility trenching' : 'Rock hammer ledge excavation & civil retention',
      amount: siteCost,
    },
    {
      category: 'Soft Cost',
      name: 'PE Structural Calculations & Permitting Administration',
      description: 'Civil stamped plans, Title 24 compliance, zoning municipal filing fees',
      amount: softCost,
    },
    {
      category: 'Contingency',
      name: '5% Construction Contingency Buffer',
      description: 'Guaranteed risk management buffer protecting against soil or regional variances',
      amount: contingency,
    },
  ];

  if (addonsCost > 0) {
    costItems.push({
      category: 'Hard Cost',
      name: 'Selected Structural Add-ons',
      description: 'Decks, off-grid energy storage, sauna module, or covered EV carport',
      amount: addonsCost,
    });
  }

  return {
    baseHardCost: baseHard,
    optionsHardCost: finishCost + claddingCost + addonsCost,
    totalHardCost: totalHard,
    sitePrepCost: siteCost,
    softCost,
    contingencyCost: contingency,
    grandTotalCost: grandTotal,
    pricePerSqft: Math.round(grandTotal / sqft),
    estimatedTimelineWeeks: plan.baseTimelineWeeks + terrainWeeks + (finishTier === 'bespoke' ? 2 : 0) + (addonsCost > 0 ? 1 : 0),
    costItems,
  };
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  activeTab: 'home',
  isConfiguratorOpen: false,
  selectedPlanForDetail: null,
  selectedProjectSlug: null,
  selectedSolutionSlug: null,

  filterSolutionSlug: null,
  filterBeds: null,
  filterSqftCategory: 'all',

  step: 1,
  housingSolutionSlug: 'second-home',
  landStatus: 'owned',
  terrain: 'sloped',
  standardPlanSlug: 'dogtrot',
  finishTier: 'signature',
  cladding: 'pine',
  wizardAddons: {
    wraparoundDeck: true,
    solarBatteryPack: false,
    radiantHeating: true,
    detachedSauna: false,
    screenedPorch: true,
    evCarport: false,
  },

  proForma: recomputeProForma('dogtrot', 'sloped', 'signature', 'pine', {
    wraparoundDeck: true,
    solarBatteryPack: false,
    radiantHeating: true,
    detachedSauna: false,
    screenedPorch: true,
    evCarport: false,
  }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  openConfigurator: (planSlug, solutionSlug) => {
    const currentPlanSlug = planSlug || get().standardPlanSlug;
    const currentSolutionSlug = solutionSlug || get().housingSolutionSlug;
    const state = get();
    const updated = recomputeProForma(
      currentPlanSlug,
      state.terrain,
      state.finishTier,
      state.cladding,
      state.wizardAddons
    );

    set({
      isConfiguratorOpen: true,
      standardPlanSlug: currentPlanSlug,
      housingSolutionSlug: currentSolutionSlug,
      proForma: updated,
      step: 1,
    });
  },

  closeConfigurator: () => set({ isConfiguratorOpen: false }),

  openPlanDetail: (plan) => set({ selectedPlanForDetail: plan }),
  closePlanDetail: () => set({ selectedPlanForDetail: null }),

  openProjectDetail: (slug) => set({ selectedProjectSlug: slug }),
  closeProjectDetail: () => set({ selectedProjectSlug: null }),

  openSolutionDetail: (slug) => {
    set({ selectedSolutionSlug: slug, activeTab: 'home' });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  closeSolutionDetail: () => set({ selectedSolutionSlug: null }),

  setFilterSolutionSlug: (slug) => set({ filterSolutionSlug: slug }),
  setFilterBeds: (beds) => set({ filterBeds: beds }),
  setFilterSqftCategory: (cat) => set({ filterSqftCategory: cat }),

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  setHousingSolution: (slug) => set({ housingSolutionSlug: slug }),

  setLandStatus: (status) => set({ landStatus: status }),

  setTerrain: (terrain) => {
    const s = get();
    const updated = recomputeProForma(s.standardPlanSlug, terrain, s.finishTier, s.cladding, s.wizardAddons);
    set({ terrain, proForma: updated });
  },

  setStandardPlan: (slug) => {
    const s = get();
    const updated = recomputeProForma(slug, s.terrain, s.finishTier, s.cladding, s.wizardAddons);
    set({ standardPlanSlug: slug, proForma: updated });
  },

  setFinishTier: (finishTier) => {
    const s = get();
    const updated = recomputeProForma(s.standardPlanSlug, s.terrain, finishTier, s.cladding, s.wizardAddons);
    set({ finishTier, proForma: updated });
  },

  setCladding: (cladding) => {
    const s = get();
    const updated = recomputeProForma(s.standardPlanSlug, s.terrain, s.finishTier, cladding, s.wizardAddons);
    set({ cladding, proForma: updated });
  },

  toggleAddon: (key) => {
    const s = get();
    const newAddons = { ...s.wizardAddons, [key]: !s.wizardAddons[key] };
    const updated = recomputeProForma(s.standardPlanSlug, s.terrain, s.finishTier, s.cladding, newAddons);
    set({ wizardAddons: newAddons, proForma: updated });
  },
}));

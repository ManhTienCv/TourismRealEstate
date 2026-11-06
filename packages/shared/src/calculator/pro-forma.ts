import {
  CladdingType,
  EnergyPackageType,
  EstimateConfigurationSpecs,
  FoundationType,
  InteriorFinishType,
  ProFormaCostBreakdown,
  RoofProfileType,
  SitePrepLevelType,
} from '../types/project-estimate';
import { StandardPlan } from '../types/standard-plan';

export const FOUNDATION_COSTS: Record<FoundationType, { name: string; costPerSqft: number; baseFee: number }> = {
  slab_on_grade: { name: 'Insulated Monolithic Slab-on-Grade', costPerSqft: 28, baseFee: 8500 },
  crawl_space: { name: 'Engineered Stem Wall & Conditioned Crawlspace', costPerSqft: 36, baseFee: 11000 },
  pier_and_beam: { name: 'Helical Steel Piers & Timber Glulam Beams (Low Impact)', costPerSqft: 42, baseFee: 13500 },
  full_basement: { name: 'Poured Concrete Full Daylight Basement', costPerSqft: 75, baseFee: 24000 },
};

export const CLADDING_COSTS: Record<CladdingType, { name: string; costPerSqft: number; description: string }> = {
  thermally_modified_pine: {
    name: 'Thermally Modified Scandinavian Pine (Kebony)',
    costPerSqft: 18,
    description: 'Natural rot resistance, silver weathering over time, zero chemical biocide',
  },
  standing_seam_zinc: {
    name: 'Standing Seam Architectural Matte Charcoal Zinc',
    costPerSqft: 32,
    description: 'Ultra-modern 50-year warranty, non-combustible Class A fire rating',
  },
  cedar_shingle: {
    name: 'Western Red Cedar Shingles (Hand-split)',
    costPerSqft: 24,
    description: 'Warm regional aesthetic with deep shadow lines and organic scent',
  },
  board_and_batten: {
    name: 'Charred Shou Sugi Ban Board & Batten',
    costPerSqft: 28,
    description: 'Traditional Japanese flame-charred cedar, pest proof and UV stable',
  },
};

export const ROOF_PROFILE_COSTS: Record<RoofProfileType, { name: string; cost: number; description: string }> = {
  gable_pitched: {
    name: 'Symmetric Cathedral Gable (8:12 Pitch)',
    cost: 0,
    description: 'Iconic barn silhouette with vaulted ceilings throughout living zone',
  },
  mono_shed: {
    name: 'Continuous Mono-Pitch Shed (3:12 Solar Optimized)',
    cost: 6500,
    description: 'Clerestory window band admitting passive southern daylight',
  },
  flat_living_green: {
    name: 'Engineered Living Sedum Green Vegetative Roof',
    cost: 19500,
    description: 'Extensive sedum matting, natural thermal insulation, biophilic views',
  },
};

export const INTERIOR_FINISH_COSTS: Record<InteriorFinishType, { name: string; costPerSqft: number; description: string }> = {
  essential_nordic: {
    name: 'Essential Nordic (White Birch & Polished Concrete)',
    costPerSqft: 0,
    description: 'Included in base package: painted drywall, birch ply built-ins, matte black fixtures',
  },
  crafted_warm_wood: {
    name: 'Crafted Warm Timber (White Oak & Soapstone)',
    costPerSqft: 35,
    description: 'Engineered European white oak plank flooring, custom fluted oak cabinetry, soapstone countertops',
  },
  luxe_architectural: {
    name: 'Luxe Minimalist (Travertine, Microcement & Walnut)',
    costPerSqft: 70,
    description: 'Seamless microcement baths, hand-milled walnut joinery, concealed flush doors, flush baseboards',
  },
};

export const ENERGY_PACKAGE_COSTS: Record<EnergyPackageType, { name: string; cost: number; description: string }> = {
  high_efficiency_grid: {
    name: 'High Performance All-Electric (Standard)',
    cost: 0,
    description: 'Triple-pane European tilt-turn windows, ducted mini-split heat pump, Zehnder ERV',
  },
  solar_ready_heatpump: {
    name: 'Solar-Ready + High Seer Inverter Upgrade',
    cost: 8500,
    description: 'Pre-wired rooftop conduit, critical loads panel, 22-SEER Mitsubishi hyper-heat heat pump',
  },
  net_zero_passive_battery: {
    name: 'Net-Zero Passive House + 12kW Solar + Tesla Powerwall 3',
    cost: 38000,
    description: 'Full off-grid resiliency: 12kW bifacial solar array, 13.5kWh battery bank, micro-grid transfer switch',
  },
};

export const SITE_PREP_COSTS: Record<SitePrepLevelType, { name: string; cost: number; description: string }> = {
  flat_cleared: {
    name: 'Gentle Grade / Pre-Cleared Meadow (< 5% slope)',
    cost: 16500,
    description: 'Minimal cut & fill, standard utility trenching up to 75 linear feet',
  },
  moderate_slope: {
    name: 'Moderate Slope & Tree Clearing (5% - 15% slope)',
    cost: 32000,
    description: 'Terraced grading, selective tree clearing, extended septic drainfield & utility tie-ins',
  },
  steep_rocky: {
    name: 'Complex Mountain Topography (> 15% slope / Ledge Rock)',
    cost: 54000,
    description: 'Rock hammer excavation, engineered retaining civil walls, extended 150ft+ trenching',
  },
};

export const ADDITIONS_COSTS = {
  deckCostPerSqft: 65,
  detachedSauna: 24500,
  screenedPorch: 18500,
  carportEV: 15000,
};

export function calculateProForma(
  plan: StandardPlan,
  specs: EstimateConfigurationSpecs
): ProFormaCostBreakdown {
  const sqft = plan.sqft;
  const costItems: ProFormaCostBreakdown['costItems'] = [];

  // 1. Base Hard Cost
  const baseHardCost = plan.baseHardCost;
  costItems.push({
    category: 'Hard Cost',
    name: `Base Modular Fabrication — ${plan.name} (${sqft.toLocaleString()} sq ft)`,
    description: `Includes factory structural insulated panel framing, triple-pane glazing, base MEP rough-ins`,
    amount: baseHardCost,
  });

  // 2. Foundation Hard Cost
  const foundation = FOUNDATION_COSTS[specs.foundationType];
  const foundationCost = foundation.baseFee + foundation.costPerSqft * sqft;
  costItems.push({
    category: 'Hard Cost',
    name: `Foundation System: ${foundation.name}`,
    description: `Engineered foundation footings, damp proofing, and anchors sized for ${sqft} sqft footprint`,
    amount: foundationCost,
  });

  // 3. Cladding & Exterior Finish
  const cladding = CLADDING_COSTS[specs.claddingType];
  // Exterior wall surface roughly 1.4x sqft
  const wallSurfaceEstimate = Math.round(sqft * 1.35);
  const claddingCost = cladding.costPerSqft * wallSurfaceEstimate;
  costItems.push({
    category: 'Hard Cost',
    name: `Exterior Cladding: ${cladding.name}`,
    description: cladding.description,
    amount: claddingCost,
  });

  // 4. Roof Profile
  const roof = ROOF_PROFILE_COSTS[specs.roofProfile];
  if (roof.cost > 0) {
    costItems.push({
      category: 'Hard Cost',
      name: `Roof Architectural Profile: ${roof.name}`,
      description: roof.description,
      amount: roof.cost,
    });
  }

  // 5. Interior Finish Level
  const interior = INTERIOR_FINISH_COSTS[specs.interiorFinish];
  const interiorCost = interior.costPerSqft * sqft;
  if (interiorCost > 0) {
    costItems.push({
      category: 'Hard Cost',
      name: `Interior Fit-Out: ${interior.name}`,
      description: interior.description,
      amount: interiorCost,
    });
  }

  // 6. Energy & Off-Grid Package
  const energy = ENERGY_PACKAGE_COSTS[specs.energyPackage];
  if (energy.cost > 0) {
    costItems.push({
      category: 'Hard Cost',
      name: `Energy & Mechanical Package: ${energy.name}`,
      description: energy.description,
      amount: energy.cost,
    });
  }

  // 7. Additions
  let additionsCost = 0;
  if (specs.additions.outdoorDeckSqft > 0) {
    const deckCost = specs.additions.outdoorDeckSqft * ADDITIONS_COSTS.deckCostPerSqft;
    additionsCost += deckCost;
    costItems.push({
      category: 'Hard Cost',
      name: `Thermowood Outdoor Deck (${specs.additions.outdoorDeckSqft} sq ft)`,
      description: 'Hidden-fastener thermally treated ash decking with black cable railings',
      amount: deckCost,
    });
  }

  if (specs.additions.detachedSauna) {
    additionsCost += ADDITIONS_COSTS.detachedSauna;
    costItems.push({
      category: 'Hard Cost',
      name: 'Detached Scandinavian Cedar Sauna Module (8x8 ft)',
      description: 'Harvia electric rock heater, double-glazed panoramic window, thermo-aspen benches',
      amount: ADDITIONS_COSTS.detachedSauna,
    });
  }

  if (specs.additions.screenedPorch) {
    additionsCost += ADDITIONS_COSTS.screenedPorch;
    costItems.push({
      category: 'Hard Cost',
      name: 'Integrated Three-Season Screened Porch',
      description: 'Cedar-framed mesh screening, vaulted ceiling, outdoor ceiling fan and lighting',
      amount: ADDITIONS_COSTS.screenedPorch,
    });
  }

  if (specs.additions.carportEV) {
    additionsCost += ADDITIONS_COSTS.carportEV;
    costItems.push({
      category: 'Hard Cost',
      name: 'Timber Post Timber Carport with Level 2 EV Charger',
      description: 'Covered single-vehicle bay matching main home cladding, 48A hardwired EV charging station',
      amount: ADDITIONS_COSTS.carportEV,
    });
  }

  const optionsHardCost =
    foundationCost +
    claddingCost +
    roof.cost +
    interiorCost +
    energy.cost +
    additionsCost;

  const totalHardCost = baseHardCost + optionsHardCost;

  // 8. Site Preparation Cost
  const sitePrep = SITE_PREP_COSTS[specs.sitePrepLevel];
  const sitePrepCost = sitePrep.cost;
  costItems.push({
    category: 'Site Prep',
    name: `Site Civil Preparation: ${sitePrep.name}`,
    description: sitePrep.description,
    amount: sitePrepCost,
  });

  // 9. Soft Costs (Permits, Structural Engineering, Architecture Oversight)
  // ~12% of total hard costs
  const softCost = Math.round(totalHardCost * 0.115 + 6500);
  costItems.push({
    category: 'Soft Cost',
    name: 'Engineering, Permitting & Architectural Administration',
    description: 'PE stamped structural calculations, Title 24 / IECC energy compliance, municipal zoning filing fees',
    amount: softCost,
  });

  // 10. Strict 5% Contingency Buffer
  const subtotalBeforeContingency = totalHardCost + sitePrepCost + softCost;
  const contingencyCost = Math.round(subtotalBeforeContingency * 0.05);
  costItems.push({
    category: 'Contingency',
    name: '5% Construction Contingency Buffer',
    description: 'Mandatory risk management reserve for unforeseen soil anomalies or municipality delays',
    amount: contingencyCost,
  });

  const grandTotalCost = subtotalBeforeContingency + contingencyCost;
  const pricePerSqft = Math.round(grandTotalCost / sqft);

  // Timeline calculation:
  // Base timeline + site complexity + custom finishes
  let timelineWeeks = plan.baseTimelineWeeks;
  if (specs.sitePrepLevel === 'moderate_slope') timelineWeeks += 2;
  if (specs.sitePrepLevel === 'steep_rocky') timelineWeeks += 4;
  if (specs.foundationType === 'full_basement') timelineWeeks += 3;
  if (specs.interiorFinish === 'luxe_architectural') timelineWeeks += 2;
  if (specs.additions.detachedSauna || specs.additions.screenedPorch) timelineWeeks += 1;

  return {
    baseHardCost,
    optionsHardCost,
    totalHardCost,
    sitePrepCost,
    softCost,
    contingencyCost,
    grandTotalCost,
    pricePerSqft,
    estimatedTimelineWeeks: timelineWeeks,
    costItems,
  };
}

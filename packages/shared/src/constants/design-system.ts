export const TIE_DESIGN_TOKENS = {
  colors: {
    bg: '#F7F5F0',        // Primary warm alabaster/architectural paper background
    surface: '#EFECE6',   // Secondary card/section surface
    border: '#E2DDD5',    // Subtle warm hairline borders
    ink: '#1C1B18',       // Primary deep charcoal typography
    muted: '#68645E',     // Secondary body copy & descriptions
    pine: '#2C4A3E',      // Primary CTA buttons, active states, forest green
    terracotta: '#D46A43',// Secondary accents, cost variance badges, highlights
    sand: '#E6E1D8',      // Additional tertiary warm neutral
    pineHover: '#233B31',
    terracottaHover: '#BF5C36',
  },
  fonts: {
    serif: '"Playfair Display", "Instrument Serif", Georgia, serif',
    sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", Menlo, Monaco, Consolas, monospace',
  },
} as const;

export const SIX_CONSTRUCTION_STAGES = [
  {
    stageIndex: 0,
    code: 'stage_1',
    name: 'Feasibility, Survey & Permitting',
    shortName: 'Permitting',
    description: 'Site civil engineering, soil bearing tests, zoning approvals, and local building permit issuance.',
    typicalDurationWeeks: 4,
  },
  {
    stageIndex: 1,
    code: 'stage_2',
    name: 'Site Prep & Foundation Pour',
    shortName: 'Foundation',
    description: 'Trenching, utility runs, grading, rebar installation, and insulated foundation concrete curing.',
    typicalDurationWeeks: 3,
  },
  {
    stageIndex: 2,
    code: 'stage_3',
    name: 'Offsite Precision Factory Fabrication',
    shortName: 'Modular Fabrication',
    description: 'Climate-controlled production of structural modules, continuous exterior insulation, framing & rough MEP.',
    typicalDurationWeeks: 5,
  },
  {
    stageIndex: 3,
    code: 'stage_4',
    name: 'Module Transport & Crane Set',
    shortName: 'Crane Set',
    description: 'Flatbed haul to site, hydraulic 120-ton crane lift, seismic anchoring, and weather-tight module marriage.',
    typicalDurationWeeks: 1,
  },
  {
    stageIndex: 4,
    code: 'stage_5',
    name: 'Interior & Exterior Architectural Fit-Out',
    shortName: 'Fit-Out',
    description: 'Cladding installation, standing seam roofing, hardwood flooring, millwork, and fixture mounting.',
    typicalDurationWeeks: 4,
  },
  {
    stageIndex: 5,
    code: 'stage_6',
    name: 'Commissioning, Blower Door Test & Handover',
    shortName: 'Handover',
    description: 'ASHRAE air tightness verification, mechanical system balancing, final certificate of occupancy, and keys handover.',
    typicalDurationWeeks: 2,
  },
] as const;

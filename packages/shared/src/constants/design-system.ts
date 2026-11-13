export const TIE_DESIGN_TOKENS = {
  colors: {
    bg: '#FAF8F1',          // Primary warm cream background (Huts: #FAF8F1)
    surface: '#FAF8F1',     // Card surface
    border: '#E2DDD5',      // Subtle hairline borders
    ink: '#0C310A',         // Primary title on cream (HUTS: #0C310A / rgb(12, 49, 10))
    titleLight: '#FAF7ED',  // Title on dark photography (HUTS: #FAF7ED / rgb(250, 247, 237))
    muted: '#664A42',       // Secondary body copy & descriptions (HUTS: #664A42 / rgb(102, 74, 66))
    pine: '#2C4A3E',        // Primary CTA buttons, forest green
    terracotta: '#D46A43',  // Secondary accents
    sand: '#E6E1D8',        // Tertiary warm neutral
    pineHover: '#233B31',
    terracottaHover: '#BF5C36',
  },
  typography: {
    h1: 'text-[44px] leading-[1.0] tracking-[-0.01em] font-normal',
    h2: 'text-[44px] leading-[1.0] tracking-[-0.01em] font-normal text-[#0C310A]',
    h3: 'text-[33px] leading-[1.1] tracking-[-0.02em] font-normal text-[#0C310A]',
    paragraph: 'text-[12.4px] leading-[1.4] text-[#664A42]',
    navLink: 'text-[14px] leading-[1.4] font-normal text-[#664A42]',
    button: 'text-[14px] leading-[1.4] font-normal rounded-[104px]',
  },
  layout: {
    hScrollContent: 'px-[31.4px] gap-[17.5px]',
    cardInnerRadius: 'rounded-[17.5px]',
    buttonRadius: 'rounded-[104px]',
  },
  fonts: {
    serif: '"HW Cigars", "Playfair Display", "Instrument Serif", Georgia, serif',
    sans: '"ABC Walter Neue", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

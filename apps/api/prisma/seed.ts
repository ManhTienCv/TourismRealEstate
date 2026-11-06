import { PrismaClient, LandStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const SEED_HOUSING_SOLUTIONS = [
  {
    id: 'sol-starter-home',
    name: 'Starter Home',
    slug: 'starter-home',
    tagline: 'High-design architectural simplicity for first-time builders.',
    description:
      'Eliminate first-time builder anxiety. Pre-engineered modular floor plans, fixed-fee offsite predictability, and timeless Scandinavian materials designed to grow alongside your family or equity.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/home.svg',
  },
  {
    id: 'sol-forever-home',
    name: 'Forever Home',
    slug: 'forever-home',
    tagline: 'Generous light-filled modular living designed for multi-decade permanence.',
    description:
      'Engineered with commercial-grade timber posts, quadruple-sealed building envelopes, age-in-place zero-threshold transitions, cathedral gathering halls, and private acoustic wings.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/shield.svg',
  },
  {
    id: 'sol-second-home',
    name: 'Second Home',
    slug: 'second-home',
    tagline: 'Escape the city to a low-maintenance, turn-key natural refuge.',
    description:
      'Lock-and-leave simplicity with smart seasonal freeze drain downs, fire-resistant standing seam metal exteriors, and panoramic framed apertures that dissolve into wild topography.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/compass.svg',
  },
  {
    id: 'sol-hybrid-home',
    name: 'Hybrid Home',
    slug: 'hybrid-home',
    tagline: 'Acoustically isolated studios and creative workspaces built for remote focus.',
    description:
      'Intentionally partitioned floor layouts featuring an architectural breezeway or acoustic vestibule separating client meetings and creative studio work from domestic living quarters.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/briefcase.svg',
  },
  {
    id: 'sol-adu',
    name: 'ADU',
    slug: 'adu',
    tagline: 'Fast-track backyard dwellings for rental income, aging parents, or guest suites.',
    description:
      'Compliant with state-wide ADU pre-approved building bylaws. Rapid crane deployment without disturbing your primary residence lawn or requiring months of loud framing crews.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/layers.svg',
  },
  {
    id: 'sol-investment-property',
    name: 'Investment Property',
    slug: 'investment-property',
    tagline: 'High-durability rental cash-flow assets optimized for long-term ROI.',
    description:
      'Engineered specifically for short-term and mid-term rental operations. High-impact commercial finishes, programmable digital access control, lockable owner cupboards, and robust commercial MEP systems.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/trending-up.svg',
  },
  {
    id: 'sol-micro-hospitality',
    name: 'Micro-Hospitality',
    slug: 'micro-hospitality',
    tagline: 'Bespoke clusters of architectural cabins for boutique eco-resorts.',
    description:
      'Modular cabin constellations sharing central utility cores or operating entirely off-grid with localized solar micro-grids, compost bio-digesters, and communal cedar hot tubs.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/tent.svg',
  },
  {
    id: 'sol-multi-gen-compound',
    name: 'Multi-Gen Compound',
    slug: 'multi-gen-compound',
    tagline: 'Connected pavilions honoring autonomy and closeness under one roofline.',
    description:
      'Multiple modular wings linked by covered cedar breezeways, communal outdoor kitchens, and central courtyard gardens. Offers independent privacy for in-laws or grown children with shared heritage gathering space.',
    svgIconUrl: 'https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/users.svg',
  },
];

export const SEED_STANDARD_PLANS = [
  {
    id: 'plan-adu',
    name: 'ADU',
    slug: 'adu',
    tagline: 'Precision micro-dwelling for backyard density and serene living.',
    bedrooms: 1.0,
    bathrooms: 1.0,
    sqftArea: 480,
    baseCostPerSqft: 370.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 16, lengthFt: 30 },
      ceilingHeightFt: 10.5,
      roofPitch: 'Flat / Slight Mono-Shed (1:12)',
      moduleCount: 1,
      structuralZones: ['Studio Living/Sleeping', 'Concealed Kitchenette Galley', 'Full Skylit Bath'],
      windowSystem: 'Triple-pane European Tilt & Turn',
      passiveHouseRating: 'ACH50 < 0.6',
    },
    solutionSlugs: ['adu', 'starter-home', 'micro-hospitality'],
  },
  {
    id: 'plan-small-bar',
    name: 'Small Bar',
    slug: 'small-bar',
    tagline: 'Linear efficiency with vaulted cathedral volume and panoramic vistas.',
    bedrooms: 1.0,
    bathrooms: 1.0,
    sqftArea: 640,
    baseCostPerSqft: 350.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 16, lengthFt: 40 },
      ceilingHeightFt: 13.0,
      roofPitch: 'Symmetric Cathedral Gable (8:12)',
      moduleCount: 2,
      structuralZones: ['Cathedral Great Room & Hearth', 'Chefs Linear Galley', 'Private Primary Suite'],
      windowSystem: 'Continuous 16ft Glazed Slider Wall',
      passiveHouseRating: 'ACH50 < 0.55',
    },
    solutionSlugs: ['starter-home', 'second-home', 'micro-hospitality'],
  },
  {
    id: 'plan-medium-bar',
    name: 'Medium Bar',
    slug: 'medium-bar',
    tagline: 'Two-bedroom architectural linear elegance for balanced modern living.',
    bedrooms: 2.0,
    bathrooms: 2.0,
    sqftArea: 1100,
    baseCostPerSqft: 305.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 22, lengthFt: 50 },
      ceilingHeightFt: 12.5,
      roofPitch: 'Cathedral Gable (6:12)',
      moduleCount: 2,
      structuralZones: ['Acoustic Split Bedrooms', 'Central Kitchen Island Core', 'Dual En-suite Baths'],
      windowSystem: 'Bifacial North/South Cross-Glazing',
      passiveHouseRating: 'ACH50 < 0.5',
    },
    solutionSlugs: ['starter-home', 'second-home', 'investment-property'],
  },
  {
    id: 'plan-big-bar',
    name: 'Big Bar',
    slug: 'big-bar',
    tagline: 'Expansive three-bedroom modernist barn for family life and hospitality.',
    bedrooms: 3.0,
    bathrooms: 2.5,
    sqftArea: 1650,
    baseCostPerSqft: 282.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 26, lengthFt: 64 },
      ceilingHeightFt: 14.0,
      roofPitch: 'Vaulted Scissor Truss (8:12)',
      moduleCount: 3,
      structuralZones: ['34ft Open Great Room', 'Owners Wing with Soaking Tub', 'Children/Guest Wing', 'Scullery & Mudroom'],
      windowSystem: 'Continuous Clerestory Ribbon Windows',
      passiveHouseRating: 'ACH50 < 0.48',
    },
    solutionSlugs: ['forever-home', 'second-home', 'investment-property'],
  },
  {
    id: 'plan-dogtrot',
    name: 'Dogtrot',
    slug: 'dogtrot',
    tagline: 'Modern reimagining of the regional vernacular breezeway home.',
    bedrooms: 3.0,
    bathrooms: 2.5,
    sqftArea: 1850,
    baseCostPerSqft: 281.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 32, lengthFt: 62 },
      ceilingHeightFt: 13.5,
      roofPitch: 'Continuous Standing Seam Bridge (7:12)',
      moduleCount: 4,
      structuralZones: ['Living/Dining Pavilion', '16ft Sheltered Outdoor Dogtrot Hearth', 'Isolated Work/Sleeping Wing'],
      windowSystem: 'Quadruple Weather-sealed Lift & Slide Panels',
      passiveHouseRating: 'ACH50 < 0.45',
    },
    solutionSlugs: ['hybrid-home', 'forever-home', 'second-home', 'multi-gen-compound'],
  },
  {
    id: 'plan-small-l',
    name: 'Small L',
    slug: 'small-l',
    tagline: 'Sheltered private micro-courtyard framing mountain and garden vistas.',
    bedrooms: 2.0,
    bathrooms: 2.0,
    sqftArea: 1350,
    baseCostPerSqft: 292.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 38, lengthFt: 46 },
      ceilingHeightFt: 12.0,
      roofPitch: 'Dual Mono-Shed Inward Sloping (3:12)',
      moduleCount: 3,
      structuralZones: ['Inward Protected Courtyard', 'Linear Culinary Gallery', 'Autonomous Studio/Bedroom'],
      windowSystem: 'Zero-post 90-degree Glazed Corner',
      passiveHouseRating: 'ACH50 < 0.52',
    },
    solutionSlugs: ['starter-home', 'hybrid-home', 'second-home'],
  },
  {
    id: 'plan-big-l',
    name: 'Big L',
    slug: 'big-l',
    tagline: 'Grand perimeter architecture embracing a central swimming or dining terrace.',
    bedrooms: 4.0,
    bathrooms: 3.5,
    sqftArea: 2200,
    baseCostPerSqft: 277.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 54, lengthFt: 58 },
      ceilingHeightFt: 14.5,
      roofPitch: 'Symmetric Cathedral Wings (8:12)',
      moduleCount: 4,
      structuralZones: ['750 sqft Sheltered Pool Terrace', 'Secluded Northern Primary Wing', 'Multi-Gen Junior Suite', 'Wine Storage & Scullery'],
      windowSystem: 'Thermally Broken Structural Curtain Wall',
      passiveHouseRating: 'ACH50 < 0.44',
    },
    solutionSlugs: ['forever-home', 'multi-gen-compound', 'investment-property'],
  },
  {
    id: 'plan-village',
    name: 'Village',
    slug: 'village',
    tagline: 'Multi-pavilion architectural constellation for multi-gen or hospitality estate.',
    bedrooms: 5.0,
    bathrooms: 4.5,
    sqftArea: 3200,
    baseCostPerSqft: 275.0,
    exteriorImageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80',
    axon3dImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80&sat=-100&contrast=120',
    floorplan2dUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    specsJson: {
      footprint: { widthFt: 75, lengthFt: 85 },
      ceilingHeightFt: 15.0,
      roofPitch: 'Tri-Pavilion Cathedral Gable (8:12)',
      moduleCount: 6,
      structuralZones: ['Main Gathering Pavilion', 'Sleeping Sanctuary Wing', 'Two Guest Pod Studios', 'Covered Cedar Boardwalk Commons'],
      windowSystem: 'Commercial Grade Acoustic Triple Glazing',
      passiveHouseRating: 'ACH50 < 0.42',
    },
    solutionSlugs: ['multi-gen-compound', 'micro-hospitality', 'forever-home'],
  },
];

export const SEED_PORTFOLIO_PROJECTS = [
  {
    id: 'proj-blueberry-hill',
    title: 'Blueberry Hill ADU',
    slug: 'blueberry-hill-adu',
    location: 'Great Barrington, Massachusetts',
    actualSqft: 480,
    standardPlanSlug: 'adu',
    housingSolutionSlug: 'adu',
    clientName: 'Sarah & Noah Greenfield',
    clientQuote:
      'The crane hoisted the entire home over our century-old maple trees and placed it onto helical piers in under 3 hours. It is easily the highest-quality building on our property.',
    heroImageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
    galleryUrls: [
      { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', caption: 'Interior natural birch ply built-in cabinetry' },
      { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', caption: 'Curbless bathroom with overhead skylight' },
    ],
  },
  {
    id: 'proj-break-house',
    title: 'Break House',
    slug: 'break-house',
    location: 'Rhinebeck, New York',
    actualSqft: 640,
    standardPlanSlug: 'small-bar',
    housingSolutionSlug: 'starter-home',
    clientName: 'Julian & Maya Sterling',
    clientQuote:
      'As first-time homebuilders, the horror stories from friends had us terrified. TIE gave us real numbers up front that did not change. The finished house feels like an architectural masterpiece.',
    heroImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    galleryUrls: [
      { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', caption: 'Vaulted Scandinavian living hall with soapstone hearth' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Integrated cedar patio deck overlooking orchard' },
    ],
  },
  {
    id: 'proj-mountain-view-meadow',
    title: 'Mountain View Meadow',
    slug: 'mountain-view-meadow',
    location: 'Woodstock, New York',
    actualSqft: 1850,
    standardPlanSlug: 'dogtrot',
    housingSolutionSlug: 'second-home',
    clientName: 'Marcus & Elena Vance',
    clientQuote:
      'TIE transformed what would have been an excruciating two-year rural build into a calm 22-week timeline. Seeing the crane place the central dogtrot module in single morning was unforgettable.',
    heroImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    galleryUrls: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Open breezeway living pavilion with mountain view' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80', caption: 'European white oak custom kitchen millwork' },
      { url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80', caption: 'Charred Shou Sugi Ban exterior rainscreen' },
    ],
  },
  {
    id: 'proj-creekside-compound',
    title: 'Creekside Compound',
    slug: 'creekside-compound',
    location: 'Healdsburg, California',
    actualSqft: 2200,
    standardPlanSlug: 'big-l',
    housingSolutionSlug: 'forever-home',
    clientName: 'David & Catherine Chen',
    clientQuote:
      'The L-geometry creates an oasis of stillness against valley winds. Having our acoustic work studio connected yet completely isolated from the children’s wing gave us our sanctuary.',
    heroImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    galleryUrls: [
      { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', caption: 'Sheltered courtyard terrace with integrated plunge pool' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80', caption: 'Continuous corner glass slider wall' },
    ],
  },
];

export const SEED_FIELD_REPORTS = [
  {
    id: 'fr-tie-catskills-0482',
    projectCode: 'TIE-FR-CATSKILLS-0482',
    clientEmail: 'harrison.thorne@example.com',
    currentStage: 4, // 04. Custom Modification & Crane Set
    estimatedBudget: 620000.0,
    actualSpent: 418500.0,
    variancePercentage: -1.8, // 1.8% under budget
    stageHistory: [
      {
        stageIndex: 1,
        code: 'stage_01',
        title: '01. Site Analysis',
        status: 'completed',
        completedAt: '2026-08-20',
        inspectorName: 'Thomas Caldwell, PE',
        deliverables: ['LIDAR drone topography survey', 'Geotechnical soil test (4,200 psf confirmed)', 'Zoning code compliance review'],
      },
      {
        stageIndex: 2,
        code: 'stage_02',
        title: '02. Budget & Program',
        status: 'completed',
        completedAt: '2026-09-02',
        inspectorName: 'Elena Vance, Principal Architect',
        deliverables: ['Pro-Forma itemized cost lock', 'Land clearing & septic engineering plan', 'Site prep contractor mobilization'],
      },
      {
        stageIndex: 3,
        code: 'stage_03',
        title: '03. Standard Selection',
        status: 'completed',
        completedAt: '2026-09-15',
        inspectorName: 'Marcus Lindqvist, Factory Director',
        deliverables: ['Standard Plan: TIE Dogtrot 1850 locked', 'Orientation and solar path modeling', 'Foundation anchor engineering'],
      },
      {
        stageIndex: 4,
        code: 'stage_04',
        title: '04. Custom Modification',
        status: 'in_progress',
        completedAt: null,
        inspectorName: 'Klaus Lindemann, Field Superintendent',
        deliverables: ['Offsite modular precision fabrication (100% complete)', '120-ton crane staging & anchor welding (Active)', 'Dogtrot central roof tie-in'],
      },
      {
        stageIndex: 5,
        code: 'stage_05',
        title: '05. Permitting',
        status: 'completed',
        completedAt: '2026-09-28',
        inspectorName: 'Ulster County Building Department',
        deliverables: ['Building Permit #BP-2026-0891 stamped & posted', 'DOH Septic permit approved', 'Highway curb cut clearance'],
      },
      {
        stageIndex: 6,
        code: 'stage_06',
        title: '06. Construction & Commissioning',
        status: 'upcoming',
        completedAt: null,
        inspectorName: 'Passive House Institute US (PHIUS)',
        deliverables: ['Blower door test (< 0.6 ACH50)', 'Zehnder ERV commissioning', 'Certificate of Occupancy & keys handover'],
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting TIE PropTech Database Seeding...');

  // 1. Seed Housing Solutions
  for (const sol of SEED_HOUSING_SOLUTIONS) {
    await prisma.housingSolution.upsert({
      where: { slug: sol.slug },
      update: {
        name: sol.name,
        tagline: sol.tagline,
        description: sol.description,
        svgIconUrl: sol.svgIconUrl,
      },
      create: {
        id: sol.id,
        name: sol.name,
        slug: sol.slug,
        tagline: sol.tagline,
        description: sol.description,
        svgIconUrl: sol.svgIconUrl,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_HOUSING_SOLUTIONS.length} Housing Solutions`);

  // 2. Seed Standard Plans
  for (const plan of SEED_STANDARD_PLANS) {
    const createdPlan = await prisma.standardPlan.upsert({
      where: { slug: plan.slug },
      update: {
        name: plan.name,
        tagline: plan.tagline,
        bedrooms: plan.bedrooms,
        bathrooms: plan.bathrooms,
        sqftArea: plan.sqftArea,
        baseCostPerSqft: plan.baseCostPerSqft,
        exteriorImageUrl: plan.exteriorImageUrl,
        axon3dImageUrl: plan.axon3dImageUrl,
        floorplan2dUrl: plan.floorplan2dUrl,
        specsJson: plan.specsJson,
      },
      create: {
        id: plan.id,
        name: plan.name,
        slug: plan.slug,
        tagline: plan.tagline,
        bedrooms: plan.bedrooms,
        bathrooms: plan.bathrooms,
        sqftArea: plan.sqftArea,
        baseCostPerSqft: plan.baseCostPerSqft,
        exteriorImageUrl: plan.exteriorImageUrl,
        axon3dImageUrl: plan.axon3dImageUrl,
        floorplan2dUrl: plan.floorplan2dUrl,
        specsJson: plan.specsJson,
      },
    });

    // 3. Connect SolutionStandardPlan pivot table
    for (const solSlug of plan.solutionSlugs) {
      const solution = await prisma.housingSolution.findUnique({ where: { slug: solSlug } });
      if (solution) {
        await prisma.solutionStandardPlan.upsert({
          where: {
            housingSolutionId_standardPlanId: {
              housingSolutionId: solution.id,
              standardPlanId: createdPlan.id,
            },
          },
          update: {},
          create: {
            housingSolutionId: solution.id,
            standardPlanId: createdPlan.id,
          },
        });
      }
    }
  }
  console.log(`✓ Seeded ${SEED_STANDARD_PLANS.length} Standard Plans and linked pivot relationships`);

  // 4. Seed Portfolio Projects
  for (const proj of SEED_PORTFOLIO_PROJECTS) {
    const plan = await prisma.standardPlan.findUnique({ where: { slug: proj.standardPlanSlug } });
    const solution = await prisma.housingSolution.findUnique({ where: { slug: proj.housingSolutionSlug } });

    if (plan && solution) {
      await prisma.portfolioProject.upsert({
        where: { slug: proj.slug },
        update: {
          title: proj.title,
          location: proj.location,
          actualSqft: proj.actualSqft,
          standardPlanId: plan.id,
          housingSolutionId: solution.id,
          clientName: proj.clientName,
          clientQuote: proj.clientQuote,
          heroImageUrl: proj.heroImageUrl,
          galleryUrls: proj.galleryUrls,
        },
        create: {
          id: proj.id,
          title: proj.title,
          slug: proj.slug,
          location: proj.location,
          actualSqft: proj.actualSqft,
          standardPlanId: plan.id,
          housingSolutionId: solution.id,
          clientName: proj.clientName,
          clientQuote: proj.clientQuote,
          heroImageUrl: proj.heroImageUrl,
          galleryUrls: proj.galleryUrls,
        },
      });
    }
  }
  console.log(`✓ Seeded ${SEED_PORTFOLIO_PROJECTS.length} Realized Portfolio Projects`);

  // 5. Seed Field Reports
  for (const rep of SEED_FIELD_REPORTS) {
    await prisma.fieldReport.upsert({
      where: { projectCode: rep.projectCode },
      update: {
        clientEmail: rep.clientEmail,
        currentStage: rep.currentStage,
        stageHistory: rep.stageHistory,
        estimatedBudget: rep.estimatedBudget,
        actualSpent: rep.actualSpent,
        variancePercentage: rep.variancePercentage,
      },
      create: {
        id: rep.id,
        projectCode: rep.projectCode,
        clientEmail: rep.clientEmail,
        currentStage: rep.currentStage,
        stageHistory: rep.stageHistory,
        estimatedBudget: rep.estimatedBudget,
        actualSpent: rep.actualSpent,
        variancePercentage: rep.variancePercentage,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_FIELD_REPORTS.length} Field Reports (6-Stage Lifecycle)`);

  // 6. Seed Sample Estimate
  const samplePlan = await prisma.standardPlan.findUnique({ where: { slug: 'dogtrot' } });
  const sampleSolution = await prisma.housingSolution.findUnique({ where: { slug: 'second-home' } });
  if (samplePlan && sampleSolution) {
    await prisma.projectEstimate.upsert({
      where: { referenceCode: 'TIE-EST-WOODSTOCK-01' },
      update: {},
      create: {
        id: 'est-sample-01',
        referenceCode: 'TIE-EST-WOODSTOCK-01',
        clientName: 'Harrison & Claire Thorne',
        clientEmail: 'harrison.thorne@example.com',
        housingSolutionId: sampleSolution.id,
        standardPlanId: samplePlan.id,
        landStatus: LandStatus.owned,
        customConfig: {
          terrain: 'sloped',
          finish_tier: 'signature',
          cladding: 'thermally_modified_pine',
          addons: ['deck_400sqft', 'detached_cedar_sauna', 'screened_porch'],
        },
        costBreakdown: {
          hard_cost: 585000,
          site_cost: 32000,
          soft_cost: 72000,
          contingency: 34450,
          total_cost: 723450,
        },
      },
    });
    console.log('✓ Seeded sample ProjectEstimate with JSONB configuration and cost breakdown');
  }

  console.log('🌲 TIE PropTech Database Seeding Completed Successfully!');
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error('Error during seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

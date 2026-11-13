export type MenuType = 'solutions' | 'standards' | 'how-it-works' | 'resources' | null;

// Standards 3x3 items organized in 3 vertical columns matching exact HUTS layout (Image 9)
export const STANDARDS_COLUMNS = [
  // Column 1
  [
    {
      slug: 'what-is-a-standard',
      title: 'What is a Standard?',
      description: 'HUTS base plans that can be modified for your home site and unique lifestyle',
      imageUrl: '/standards/thumbnails/what-is-a-standard.png',
      isInfo: true,
    },
    {
      slug: 'small-bar',
      title: 'Small Bar',
      description: 'The swiss-army knife of our Standards collection. All the essentials in a beautiful, affordable package',
      imageUrl: '/standards/thumbnails/small-bar.jpg',
    },
    {
      slug: 'dogtrot',
      title: 'Dogtrot',
      description: "2 bedroom design that's marked by a clean separation of public and private functions",
      imageUrl: '/standards/thumbnails/dogtrot.png',
    },
  ],
  // Column 2
  [
    {
      slug: 'adu',
      title: 'ADU',
      description: 'Small-scale structures designed for extra space, homesteading your lot, or generating revenue',
      imageUrl: '/standards/thumbnails/adu.jpg',
    },
    {
      slug: 'medium-bar',
      title: 'Medium Bar',
      description: 'An efficient 2.5 bedroom home that packs big functionality into a small footprint',
      imageUrl: '/standards/thumbnails/medium-bar.jpg',
    },
    {
      slug: 'village',
      title: 'Village',
      description: "A 3-bedroom village scheme designed for sites where there's more than just one view or home experience",
      imageUrl: '/standards/thumbnails/village.jpg',
    },
  ],
  // Column 3
  [
    {
      slug: 'small-l',
      title: 'Small L',
      description: 'An elegant assembly of two gable-roofed forms that combines function with grandeur',
      imageUrl: '/standards/thumbnails/small-l.jpg',
    },
    {
      slug: 'big-l',
      title: 'Big L',
      description: 'The largest Standard plan that combines the efficiency of the Small L with a grand primary suite',
      imageUrl: '/standards/thumbnails/big-l.jpg',
    },
    {
      slug: 'big-bar',
      title: 'Big Bar',
      description: 'Organized in wings with bedrooms on either side of the public spaces with a single, long roof line',
      imageUrl: '/standards/thumbnails/big-bar.jpg',
    },
  ],
];

export const STANDARDS_MENU_ITEMS = STANDARDS_COLUMNS.flat();

// Housing Solutions 3-column items matching exact HUTS layout and text (Image 8)
export const SOLUTIONS_COLUMNS = [
  // Column 1
  [
    {
      slug: 'starter-home',
      title: 'Starter Home',
      description: 'An affordable, thoughtfully designed home that gets you out of your rental and into an asset',
    },
    {
      slug: 'hybrid-home',
      title: 'Hybrid Home',
      description: 'A flexible home you can enjoy personally and rent when you’re not there—built to fit your lifestyle',
    },
    {
      slug: 'micro-hospitality',
      title: 'Micro-Hospitality',
      description: 'A high-design, low-footprint destination where great land meets unforgettable stays—built with both guests and ROI in mind',
    },
  ],
  // Column 2
  [
    {
      slug: 'forever-home',
      title: 'Forever Home',
      description: 'A deeply personal, multi-functional home built to last—and to host every future holiday photo',
    },
    {
      slug: 'adu',
      title: 'ADU',
      description: 'A versatile addition to your property that works as a rental, guest suite, or workspace—and makes your land work harder for you',
    },
    {
      slug: 'multi-gen-compound',
      title: 'Multi-Generation Compound',
      description: 'This isn’t about one house. It’s about designing land, relationships, and legacy.',
    },
  ],
  // Column 3
  [
    {
      slug: 'second-home',
      title: 'Second Home',
      description: 'A retreat that recharges you, earns for you, and grows with you—whether it’s just for you or part of a rental strategy',
    },
    {
      slug: 'investment-property',
      title: 'Investment Property',
      description: 'A purpose-built property designed to deliver long-term returns through smart design, sharp budgeting, and strategic development',
    },
  ],
];

export const SOLUTIONS_MENU_ITEMS = SOLUTIONS_COLUMNS.flat();

// How It Works 2-column items matching exact HUTS layout and text (Image 3)
export const HOW_IT_WORKS_ITEMS = [
  {
    id: 'approach',
    title: 'The HUTS Approach',
    description: 'We combine our experience in architecture, development, and placemaking to make the home design and building process better',
    type: 'approach',
  },
  {
    id: 'services',
    title: 'Our Services',
    description: 'We simplify and streamline the home design and development process at every step of the way',
    type: 'services',
  },
];

// Resources 3-column items
export const RESOURCES_MENU_ITEMS = [
  {
    id: 'standards-guide',
    title: 'Architectural Standards Guide',
    description: 'Explore technical specifications, module dimensions, and structural options for all 8 base plans.',
    targetTab: 'standards',
  },
  {
    id: 'field-reports',
    title: 'Active Field Reports',
    description: 'Track live construction stages, foundation pours, and factory delivery logs from real rural build sites.',
    targetTab: 'field-report',
  },
  {
    id: 'pro-forma',
    title: 'Interactive Pro-Forma Calculator',
    description: 'Estimate total turn-key project costs, terrain adjustments, and finish tiers in real-time.',
    action: 'calculator',
  },
];

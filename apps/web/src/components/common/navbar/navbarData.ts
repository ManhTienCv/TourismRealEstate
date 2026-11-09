export type MenuType = 'solutions' | 'standards' | 'how-it-works' | 'resources' | null;

// Standards 3x3 items matching exact HUTS layout
export const STANDARDS_MENU_ITEMS = [
  {
    slug: 'what-is-a-standard',
    title: 'What is a Standard?',
    description: 'HUTS base plans that can be modified for your home site and unique lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    isInfo: true,
  },
  {
    slug: 'adu',
    title: 'ADU',
    description: 'Small-scale structures designed for extra space, homesteading your lot, or generating revenue.',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'small-l',
    title: 'Small L',
    description: 'An elegant assembly of two gable-roofed forms that combines function with grandeur.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'small-bar',
    title: 'Small Bar',
    description: 'The swiss-army knife of our Standards collection. All the essentials in a beautiful, affordable package.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'medium-bar',
    title: 'Medium Bar',
    description: 'An efficient 2.5 bedroom home that packs big functionality into a small footprint.',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'big-l',
    title: 'Big L',
    description: 'The largest Standard plan that combines the efficiency of the Small L with a grand primary suite.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'dogtrot',
    title: 'Dogtrot',
    description: "2 bedroom design that's marked by a clean separation of public and private functions.",
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'village',
    title: 'Village',
    description: "A 3-bedroom village scheme designed for sites where there's more than just one view or home experience.",
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'big-bar',
    title: 'Big Bar',
    description: 'Organized in wings with bedrooms on either side of the public spaces with a single, long roof line.',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80',
  },
];

// Housing Solutions items matching exact HUTS layout
export const SOLUTIONS_MENU_ITEMS = [
  {
    slug: 'starter-home',
    title: 'Starter Home',
    description: 'An affordable, thoughtfully designed home that gets you out of your rental and into an asset',
    iconType: 'plant',
  },
  {
    slug: 'forever-home',
    title: 'Forever Home',
    description: 'A deeply personal, multi-functional home built to last—and to host every future holiday photo',
    iconType: 'family',
  },
  {
    slug: 'second-home',
    title: 'Second Home',
    description: "A retreat that recharges you, earns for you, and grows with you—whether it's just for you or part of a rental strategy",
    iconType: 'relax',
  },
  {
    slug: 'hybrid-home',
    title: 'Hybrid Home',
    description: "A flexible home you can enjoy personally and rent when you're not there—built to fit your lifestyle",
    iconType: 'hybrid',
  },
  {
    slug: 'adu',
    title: 'ADU',
    description: 'An architectural auxiliary space for passive rental income, guest living, or focused creative work',
    iconType: 'studio',
  },
  {
    slug: 'income-property',
    title: 'Income Property',
    description: 'An architecturally sound hospitality asset optimized for high-yield short-term rental performance',
    iconType: 'money',
  },
  {
    slug: 'micro-hospitality',
    title: 'Micro-Hospitality',
    description: 'Turn-key multi-unit modular hospitality retreats with unified operational and aesthetic frameworks',
    iconType: 'outpost',
  },
  {
    slug: 'multi-gen-compound',
    title: 'Multi-Gen Compound',
    description: 'Interconnected family estates preserving acoustic autonomy while anchoring shared seasonal memories',
    iconType: 'village',
  },
];

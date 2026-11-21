/**
 * standardsData.ts
 *
 * Bộ dữ liệu hoàn chỉnh 100% trích xuất từ Sanity CMS của HUTS cho:
 * 1. COMMON_GRAPHIC_CARDS: 3 thẻ thông số kỹ thuật chuẩn (Mechanicals, Materials, Products).
 * 2. WHAT_IS_A_STANDARD_DATA: Dữ liệu trang giới thiệu "What is a Standard?".
 * 3. STANDARDS_DETAIL_DATA: Dữ liệu chi tiết 8 mẫu nhà mô-đun (ADUs, Small Bar, Small L, Medium Bar, Dogtrot, Big Bar, Big L, Village).
 */

export interface GraphicCard {
  headline: string;
  icon: string;
  points: string[];
}

export interface BackAndForthMedia {
  side: 'left' | 'right';
  type?: 'image' | 'video';
  url: string;
  image?: string;
  label?: string;
  title: string;
  text: string;
  bullets?: string[];
}

export interface StepByStepAccordionRow {
  index: string;
  title: string;
  text: string;
  image: string;
}

export interface WhatIsAStandardData {
  label: string;
  h1: string;
  ctaText: string;
  illoUrl: string;
  overview: string;
  backAndForth: BackAndForthMedia[];
  stepByStepAccordion: {
    title: string;
    rows: StepByStepAccordionRow[];
  };
}

export interface StandardSpec {
  label: string;
  text: string;
}

export interface AccordionRow {
  index?: string;
  title: string;
  svgUrl?: string;
  image?: string;
  text?: string;
}

export interface StandardAccordion {
  title: string;
  description: string;
  rows: AccordionRow[];
}

export interface StandardSliderItem {
  title: string;
  image: string;
}

export interface ImageGridItem {
  caption?: string;
  image: string;
}

export interface StandardProject {
  title: string;
  slug: string;
  image: string;
  interiorImage?: string;
  tags: string[];
}

export interface StandardDetailData {
  slug: string;
  title: string;
  tags: string[];
  heroImage: string;
  thumbnail: string;
  floorplan: string;
  overview: string;
  specs: StandardSpec[];
  fullWidthMedia?: string[];
  accordion: StandardAccordion | null;
  exteriorBackAndForth: BackAndForthMedia[];
  sliderTitle: string;
  sliderItems: StandardSliderItem[];
  imageGrid: ImageGridItem[];
  interiorBackAndForth: BackAndForthMedia[];
  includeInterior?: boolean;
  projectsTitle: string;
  projects: StandardProject[];
}

// ============================================================================
// 1. HẰNG SỐ DÙNG CHUNG: COMMON_GRAPHIC_CARDS (3 THẺ KỸ THUẬT CHUẨN)
// ============================================================================
export const COMMON_GRAPHIC_CARDS: GraphicCard[] = [
  {
    headline: 'Mechanicals',
    icon: 'https://cdn.sanity.io/images/xi1ruvdt/production/d6507919a7914094db6d1e5e33dc1c9e720c13cd-65x64.svg',
    points: [
      'Fujitsu ductless mini-split units for zoned heating and cooling',
      'Direct gas supply to kitchen range for optimal cooking experience',
      'Rinnai tankless on-demand water heater & LED high-quality lighting',
      'Smart home integrations for easy, remote property management',
    ],
  },
  {
    headline: 'Materials',
    icon: 'https://cdn.sanity.io/images/xi1ruvdt/production/283e58fc23fd4c4bc518273ccd044701a6e9c11d-65x64.svg',
    points: [
      '8.5” wide, engineered hardwood from Madera surfaces, available in several premium finishes to complement your interior design selections.',
      'Kitchen counters and backsplash are made with sustainable, high-durability Caesarstone.',
      'Semi-custom, solid wood cabinetry available in various shape profiles.',
      'Highly-insulated window and door package.',
    ],
  },
  {
    headline: 'Products',
    icon: 'https://cdn.sanity.io/images/xi1ruvdt/production/4f2335c39aafc9c3050ab583978668f6b909176b-65x64.svg',
    points: [
      'We specify kitchen appliances from high-efficiency manufacturers like Bosch, Blomberg, and Miele',
      'Integrated smart home technologies from August, Samsung, Nest, and Google Home',
      'Kitchen and bathroom fixtures by Rejuvenation and Kohler',
    ],
  },
];

// ============================================================================
// 2. DỮ LIỆU TRANG GIỚI THIỆU: WHAT_IS_A_STANDARD_DATA (/what-is-a-standard)
// ============================================================================
export const WHAT_IS_A_STANDARD_DATA: WhatIsAStandardData = {
  label: 'What is a Standard?',
  h1: '[Designed to balance] high design with ease of construction',
  ctaText: 'Find Your Home',
  illoUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/79d93a399c82af467165c1d6394449611d5fbd50-120x120.svg',
  overview:
    "Standards are a collection of plans that put you in the editor's seat. Based on a 16’ grid, they work with much of the existing standardization of the American construction trade — minimizing waste and utilizing details that most any contractor could successfully execute.",
  backAndForth: [
    {
      side: 'left',
      type: 'video',
      url: 'https://cdn.sanity.io/files/xi1ruvdt/production/b1548014e5cd4e90df63e6430e4a4a7e71e01d4f.mp4',
      image: 'https://cdn.sanity.io/files/xi1ruvdt/production/b1548014e5cd4e90df63e6430e4a4a7e71e01d4f.mp4',
      title: 'Ease of Construction',
      text: "We've simplified our details, wall assemblies and specifications. They've been reviewed by engineers, contractors and tested in the field, with ease of construction in mind. Our construction approach is meant to work for site-built construction or pre-fab and modular, where it makes sense.",
    },
    {
      side: 'right',
      type: 'image',
      url: 'https://cdn.sanity.io/images/xi1ruvdt/production/b9b79f0583c5567820d19f9d9df9b715894859d9-2512x1758.png',
      image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b9b79f0583c5567820d19f9d9df9b715894859d9-2512x1758.png',
      title: 'Existing Standards',
      text: 'Our standards are designed with constructability in mind. The American construction trade has some existing patterns in place - 16" on center framing, 4\'x8\' sheets of plywood and drywall, regular 2\' material increments. We don\'t work against those measurements, but instead work with them to minimize waste and increase the number of builders who can successfully deliver on HUTS projects, anywhere in the country.',
    },
    {
      side: 'left',
      type: 'image',
      url: 'https://cdn.sanity.io/images/xi1ruvdt/production/420fa364ed507f465d7009b86c1efd3784761694-4032x3024.jpg',
      image: 'https://cdn.sanity.io/images/xi1ruvdt/production/420fa364ed507f465d7009b86c1efd3784761694-4032x3024.jpg',
      title: 'Phased Construction',
      text: "Many of our clients have big ambitions, but smaller budgets. Our design system was created with growth in mind. Tack on a bedroom addition when you're ready. Plug in a guest cottage when the time is right. We plan for a decade down the line and deliver for tomorrow's build.",
    },
    {
      side: 'right',
      type: 'image',
      url: 'https://cdn.sanity.io/images/xi1ruvdt/production/7ef49ae77d6e608cf05dfb81128c0b922b793ed0-3200x2133.jpg',
      image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7ef49ae77d6e608cf05dfb81128c0b922b793ed0-3200x2133.jpg',
      title: 'Designed Flexibility',
      text: 'Our standards are designed to be modified, with relative ease. We can shift windows, lengths, widths and interior layouts without significantly editing the structural systems. We want your home to be yours, without losing the cost benefit of our product design efforts.',
    },
  ],
  stepByStepAccordion: {
    title: 'The Step-by-Step',
    rows: [
      {
        index: '01',
        title: 'Understand the build site',
        text: 'Get started with HUTS Land to identify the perfect parcel for you. Some people take a long time to find the right spot, but we can point you in the right direction.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/cc59798c08d9a4cb1332a41c25702d8af056c907-2554x1922.png',
      },
      {
        index: '02',
        title: 'Determine budget & program',
        text: 'We have deep experience developing models and pro formas to make sure your investment makes sense both short and long-term.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4dfdea297f5f1ad924e5045bfbda4a88edbda421-2500x1876.jpg',
      },
      {
        index: '03',
        title: 'Select the Standard',
        text: "We'll discuss your lifestyle, goals and needs to match you with the best design starting point for your home project.",
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a0d69aa0a6a270b114939f6635d4b165daeb1953-4032x3024.jpg',
      },
      {
        index: '04',
        title: 'Modify for your site & lifestyle',
        text: "Let's make it your own. We care deeply about how your home will serve as a personalized backdrop for your unique lifestyle and vision.",
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/469c9772be88bc26c89161be8ee1db74f137b177-3200x2133.jpg',
      },
      {
        index: '05',
        title: 'Secure business permits',
        text: 'After modifying your home design, we will coordinate our team and consultants to fully document your project to entitle the property.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c9ff02bd70071154129b5901f4fdafcc808fbb41-2048x1152.jpg',
      },
      {
        index: '06',
        title: 'Construction documentation',
        text: "Together with our design team and consultants, we'll assemble the documents required for pricing and construction.",
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e49727a2dd6f922a5857096b982d068bdfb84990-2048x1152.jpg',
      },
    ],
  },
};

// ============================================================================
// 3. DỮ LIỆU CHI TIẾT 8 MẪU NHÀ: STANDARDS_DETAIL_DATA
// ============================================================================
export const STANDARDS_DETAIL_DATA: Record<string, StandardDetailData> = {
  // --------------------------------------------------------------------------
  // 1. ADUS
  // --------------------------------------------------------------------------
  adus: {
    slug: 'adus',
    title: 'ADUs',
    tags: ['Sleeping Areas', 'Wet Room'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/3509b42ab50657c7d06651b6060ac2b05e403c12-3200x2133.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/12b724bfd8e075d0f39a1351f31264a32328f433-1467x1410.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/7cf70fd6532c49b49c69b70800720dc4cbdd680d-1618x1602.png',
    overview:
      'We designed these little cabins for all the reasons we know they’re needed. And we designed them with love, for you to live a big life in a small space.',
    specs: [
      { label: 'Size', text: '100-200 sf' },
      { label: 'Features', text: 'Guests / Rental / Studio' },
    ],
    fullWidthMedia: [
      'https://cdn.sanity.io/images/xi1ruvdt/production/ca1166237ad20235ec2b11b1d52ff629b45d802b-3000x1688.png',
      'https://cdn.sanity.io/images/xi1ruvdt/production/55201d3a3cb4e1c9ac9df4508576ad6f1065aba9-1440x810.png',
    ],
    accordion: null,
    exteriorBackAndForth: [
      {
        side: 'left',
        title: 'The Little Cottage',
        text: 'Small. Efficient. Inexpensive to build. Packed with functionality. And, let’s be real, extremely cute. The Tiny Cottage can be a standalone offgrid cabin or an accessory to your existing property.',
        bullets: ['One Sleeping Area', 'Full Wet Room', '100sf + 100sf loft', 'Perfect for couples'],
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/287337f77f079a755eb9a1155fc08d0ea0434d42-1440x800.png',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/287337f77f079a755eb9a1155fc08d0ea0434d42-1440x800.png',
      },
      {
        side: 'right',
        title: 'The Cottage',
        text: 'Our classic 10’ x 20’ ADU is a study in usability and function. The plan provides dedicated sleeping spaces for four, a full galley kitchen, living and dining spaces, a wood-burning stove, and a separate powder room.',
        bullets: ['Two Sleeping Areas', 'Full Wet Room', '200sf + 100sf loft', 'Perfect for small families'],
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b26ba881bdb9ed5fbccb877f4a0fe7e8303ffa3a-1440x800.png',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/b26ba881bdb9ed5fbccb877f4a0fe7e8303ffa3a-1440x800.png',
      },
      {
        side: 'left',
        title: 'The Entertainer',
        text: 'Without any dedicated sleeping areas on the ground floor, this 10’ x 20’ cabin is designed to maximize shared living space. Perfect to host a dinner party, game night or indoor-outdoor event.',
        bullets: ['One Sleeping Area', 'Full Wet Room', '200sf + 60sf loft', 'Perfect for maximizing living space'],
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/0ec938551aab91057767e64bd20c0a0b7f01bf05-1440x800.png',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/0ec938551aab91057767e64bd20c0a0b7f01bf05-1440x800.png',
      },
      {
        side: 'right',
        title: 'The Bunkhouse',
        text: 'The Bunkhouse is designed to maximize sleeping space and capacity. When the focus is more on the activities outside than inside, The Bunkhouse is a great option for family retreats and group stays.',
        bullets: ['Two Sleeping Areas', 'Full Wet Room', '200sf + 200sf loft', 'Perfect for maximized sleeping space'],
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/457c6c7ce8060dfd269b94a83d1b843c0201d458-1440x800.png',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/457c6c7ce8060dfd269b94a83d1b843c0201d458-1440x800.png',
      },
    ],
    sliderTitle: 'All Models at a Glance',
    sliderItems: [
      {
        title: 'The Little Cottage',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c7f63778e9b5b5d993e2d88672f59203a68dd34b-564x501.png',
      },
      {
        title: 'The Cottage',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3b080b75b435e6ef8b9900c2eac2019dc84f2d29-564x501.png',
      },
      {
        title: 'The Entertainer',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ea2b3b6816de4149d1b1fa1f7a66b5247ea9a2ae-564x501.png',
      },
      {
        title: 'The Bunkhouse',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/526a5572ae13a23aef06488bba67514972ee05ea-564x501.png',
      },
    ],
    imageGrid: [
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/00fa7f7bf644c6c8bf61238e8d40b44b6cfb7ac3-2133x3200.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/50801ffeed6eb736cf393d0945d1cd96f949ced2-3200x2133.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c7df5ef3724e7d0c3ddd597acb5ae41e887decc7-3200x2133.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d52c7cff11737d727ebe088169d55b19753badaa-2133x3200.jpg' },
    ],
    interiorBackAndForth: [],
    includeInterior: false,
    projectsTitle: 'Projects using ADUs',
    projects: [
      {
        title: 'Bloomer Lane',
        slug: '/portfolio/bloomer-lane',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/087912e9b945ca5251ae21835fbfc4e15495cf07-1440x850.png',
        tags: ['ADU', 'Studio', '1 Bath', '<500 Sqft'],
      },
      {
        title: 'Hudson Valley Pool House',
        slug: '/portfolio/hudson-valley-pool-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/41ac6f36ef05d259d30c1ed66d425cb0c6b8175d-1440x810.png',
        tags: ['ADU', 'Studio', '1 Bath', '<500 Sqft'],
      },
      {
        title: 'Gulf Road',
        slug: '/portfolio/gulf-road',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c9055fc6f8ab4cad9fd1f570ee00fc0f0ba09f88-2048x1229.jpg',
        tags: ['ADU', '4 Bed', '4+ Bath', '1,000-1,500 Sqft', 'Micro Hospitality'],
      },
      {
        title: 'The Trail House',
        slug: '/portfolio/the-trail-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8c963ceba25c36785c663a6ff460e400add60882-3981x2239.jpg',
        tags: ['ADU', 'Medium Bar', '2 Bed', '2 Bath', '1,000-1,500 Sqft', 'Hybrid Home'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. SMALL BAR
  // --------------------------------------------------------------------------
  'small-bar': {
    slug: 'small-bar',
    title: 'Small Bar',
    tags: ['1 Bed', '1 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/105a55711ebd84dd4b287f39c0495cc4a122f609-1920x1080.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/49b12a1c850a40727ce6b5d105d21a8459c35389-858x858.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/1d09b3431c239b3ac09deae6e4eb0d2ee9a4028a-2275x1880.jpg',
    overview:
      'The swiss-army knife of our Standards collection, The Small Bar works as a weekend getaway for a couple, a rental unit, or a small-scale full-time home. All the essentials in a beautiful, affordable package.',
    specs: [
      { label: 'Size', text: '512 sf' },
      { label: 'Features', text: 'Perfect for Couples' },
    ],
    accordion: {
      title: 'The perfect starter home or weekend getaway',
      description:
        'We’ve talked to thousands of potential homeowners - those ready to go and those where owning a home is a goal for the distant future. They want an efficient home that can pay for itself through rental or could be built without any debt. A desirable place that works in any location and compliments the lifestyle of any individual. This is that house design.',
      rows: [
        {
          index: '01',
          title: 'Dedicated Wood Storage',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/a8c8db4ebd4c8daa1ed6833ad2edda5a810d88a8-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a8c8db4ebd4c8daa1ed6833ad2edda5a810d88a8-835x602.svg',
        },
        {
          index: '02',
          title: 'Living Room with Wood Burning Fireplace',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/4718adde740890b9201bcb4bb1284a74c6efb729-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4718adde740890b9201bcb4bb1284a74c6efb729-835x602.svg',
        },
        {
          index: '03',
          title: 'Galley Kitchen with Eat-In Dining',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/8f42d0a035013aa94242e27a27b98a80bc7da36f-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8f42d0a035013aa94242e27a27b98a80bc7da36f-835x602.svg',
        },
        {
          index: '04',
          title: 'Mechanical Closet',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/fe5cfd1c7a01a4d4df26567b9b147c849b66b038-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/fe5cfd1c7a01a4d4df26567b9b147c849b66b038-835x602.svg',
        },
        {
          index: '05',
          title: 'Full Bath with Shower and Vanity',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/11872224e74cd0a0c59e6b33d3bef0305e46596b-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/11872224e74cd0a0c59e6b33d3bef0305e46596b-835x602.svg',
        },
        {
          index: '06',
          title: 'Large Bedroom with Picture Window',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/9220b5b9568cd6ccd902367928920f7978180df3-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/9220b5b9568cd6ccd902367928920f7978180df3-835x602.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'The front of our HUTS Small Bar, featuring a dedicated wood storage niche and covered front entry.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1d09b3431c239b3ac09deae6e4eb0d2ee9a4028a-2275x1880.jpg',
      },
      {
        title: 'The rear of our HUTS small bar, featuring floor-to-ceiling glass across the entry corridor, living / kitchen, dining space, and bedroom.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/0be53cab156bcb46aaaa0d839bd3d718f2ee9374-2275x1989.jpg',
      },
      {
        title: 'Small Bar elevation',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8af0ecb926d4395e8c923fc9ce0698f00c2ff453-1152x768.png',
      },
      {
        title: 'Full Small Bar floorplan',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/58428e976f143287657d708a6a44160ac9fdcbcd-1152x768.png',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/22752e325a8f47bcc030b1d1deaf2d752ad4e46f-1920x1080.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/22752e325a8f47bcc030b1d1deaf2d752ad4e46f-1920x1080.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Small Bar are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Small Bar? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/2ea000c93d0a20a5a14ea24b3e7cca14d5054839-1920x1080.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/2ea000c93d0a20a5a14ea24b3e7cca14d5054839-1920x1080.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'Outdoor Rooms',
        text: 'Nobody builds a house in the country to stay inside all the time. Considered outdoor areas expand your usable footprint, without having to pay for walls, roofs, or ongoing conditioning costs. The HUTS Small Bar merges indoors and outdoors, adding lots of usable (outdoor) space at a fraction of the build cost.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6a6eedfc5396aa7ddb1cac5fd0f22a397fa22ba8-1920x1080.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/6a6eedfc5396aa7ddb1cac5fd0f22a397fa22ba8-1920x1080.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'A beautifully detailed Small Bar in its lightly-controlled landscape.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b3968c6d376ff106c92edd04d82e31870bea60c7-1920x1080.jpg',
      },
      {
        caption: 'An elevation of the HUT Small Bar in the afternoon sun.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b167feaf7635c05a07321560813b2417735a69d6-1920x1080.jpg',
      },
      {
        caption: 'The entry of the HUTS small bar, with wood storage and front door in view.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/99254b6e9d242deb726c9c64eba84bc5095e5324-1920x1080.jpg',
      },
      {
        caption: 'Late afternoon on the rear deck of the HUTS Small Bar.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7c33802d8006001df4d90a5d9d31b81f77e5714a-1920x1080.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Considered Interiors',
        title: 'Great Room',
        text: 'Organized around the galley chef’s kitchen, the great room features dedicated spaces for living, dining and cooking. A generous entertaining space for a small home footprint.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e75aa0877e2b617a88efaa672d4240ca89411133-1920x1080.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/e75aa0877e2b617a88efaa672d4240ca89411133-1920x1080.jpg',
      },
      {
        side: 'right',
        label: 'Considered Millwork',
        title: 'Details Matter',
        text: 'Beautiful micro-bevel millwork sets the tone for this space, and can be customized with any number of profiles and finishes, including painted, lacquered and natural wood.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/06e1ee71c078a73ab739b6a8dfe52892a978e1c9-1920x1080.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/06e1ee71c078a73ab739b6a8dfe52892a978e1c9-1920x1080.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Small Bar',
    projects: [
      {
        title: 'Moose Aly Guest House',
        slug: '/portfolio/moose-aly-guest-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/39d6a22295c5e94f66fc02a9278881ce7d60a83d-1440x810.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/2b0167027ea1631b1b62eeaa901e44b9c0d7c0ce-1440x810.png',
        tags: ['Small Bar', '3 Bed', '1 Bath', '1,000-1,500 Sqft', 'ADU'],
      },
      {
        title: 'Oak Bluffs House',
        slug: '/portfolio/oak-bluffs-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ee9912cbdab0c67e080162bdde1a50588d4cdf1a-1440x850.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/cc5436fecd35854a1600cd0df4aa13ccdbf35ec3-3000x2308.jpg',
        tags: ['Small Bar', '1 Bed', '2 Bath', '500 - 1,000 Sqft', 'Hybrid Home'],
      },
      {
        title: 'Rustic Meadow House',
        slug: '/portfolio/rustic-meadow-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b99eaba3f3ab982b821556258f52e25906bd6823-1440x810.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/3c2c2d39284f36fd24f33e1ff718095e3bac79f2-1440x810.png',
        tags: ['Small Bar', '3 Bed', '1 Bath', '1,500-2,000 Sqft', 'Second Home'],
      },
      {
        title: 'Rhinecliff Road',
        slug: '/portfolio/rhinecliff-road',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5018fb9d5ee22b0fa48d3c94bb9284340312f246-2048x1281.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/b03396bed2d524b77df10862d7d44e92d9c6cc38-1920x1080.png',
        tags: ['Medium Bar', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Second Home'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. SMALL L
  // --------------------------------------------------------------------------
  'small-l': {
    slug: 'small-l',
    title: 'Small L',
    tags: ['2.5 Bed', '1.5 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/0b61ef06a7a0d551629ecaed4cffbfb6e2896e13-3840x2160.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/a7b6ffca0d4814f1354cd42e4563a1f43d03e4fd-2061x1932.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/d48224c53a662c3822c5a4991cf1eecbddbd3c77-4800x3965.jpg',
    overview:
      'An elegant assembly of two gable-roofed forms, our Small L Standard combines function with grandeur. The home is designed to take advantage of views across the whole of the site, while blurring the lines between indoors and outdoors. Excellent as a second or full-time home, the design features dedicated working space, laundry, and space for a small family.',
    specs: [
      { label: 'Size', text: '1,400 sf' },
      { label: 'Features', text: 'Dedicated Office Space' },
    ],
    accordion: {
      title: 'Live / Work',
      description:
        'The Small L design is big on flexibility, design and functionality. With a dedicated office space, laundry, mechanical storage, and entry mud room, the Small L is designed for weekends away, full-time-living or high-value renting.',
      rows: [
        {
          index: '01',
          title: 'Entryway',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/782ca26aa78ff09e20466c22bf56709ed27bc8b8-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/782ca26aa78ff09e20466c22bf56709ed27bc8b8-835x602.svg',
        },
        {
          index: '02',
          title: 'Mudroom, Storage & Washer / Dryer',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/cd8490aa8929e3f0994dcfa44a47ea2034ac2ca3-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/cd8490aa8929e3f0994dcfa44a47ea2034ac2ca3-835x602.svg',
        },
        {
          index: '03',
          title: 'Flexible Office Space',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/a08e647bc138bab141bc2d5dc87186e0895f4742-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a08e647bc138bab141bc2d5dc87186e0895f4742-835x602.svg',
        },
        {
          index: '04',
          title: 'Bedrooms & Full Bathroom',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/5240a563ccb8e6cdb34754fa23b2d3dd908d4150-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5240a563ccb8e6cdb34754fa23b2d3dd908d4150-835x602.svg',
        },
        {
          index: '05',
          title: "Chef's Kitchen & Breakfast Bar",
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/dad7c62ffd62f8df8bd8c09e8953026da04c1ea5-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/dad7c62ffd62f8df8bd8c09e8953026da04c1ea5-835x602.svg',
        },
        {
          index: '06',
          title: 'Grand Living Room with Vaulted Ceiling',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/d8348955ec4d4078181483e1f0322d5d3e490031-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d8348955ec4d4078181483e1f0322d5d3e490031-835x602.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'Entryway into the Small L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ef89bba505e097680b20dc1905d39071b932ff67-3675x2649.jpg',
      },
      {
        title: 'Rear patio and surrounded garden space of the Small L.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/85544e122ad3a7f7ce9aa2223ea3282e638379e6-3675x2625.jpg',
      },
      {
        title: 'Small L Elevation',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1d00bc75e991cc4d0f0014dbe040fa11c5463984-2048x1241.jpg',
      },
      {
        title: 'Full floorplan',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8300e68a55939bf2e2816fee116a9c158d186a7d-2048x1447.jpg',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6d64b2b82fe62582c666042d12d68bfedf87cd41-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/6d64b2b82fe62582c666042d12d68bfedf87cd41-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Small L are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Small L? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ce9c459aac8ea604f61ce78f9fbe29546f7329bb-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/ce9c459aac8ea604f61ce78f9fbe29546f7329bb-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'Outdoor Rooms',
        text: 'Nobody builds a house in the country to stay inside all the time. Considered outdoor areas expand your usable footprint, without having to pay for walls, roofs, or ongoing conditioning costs. The HUTS Small L merges indoors and outdoors, adding lots of usable (outdoor) space at a fraction of the build cost.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e8be1877ab45b1cd8db8c81d66a210b40ccca310-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/e8be1877ab45b1cd8db8c81d66a210b40ccca310-3840x2160.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'The view from the back side of the entry corridor.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/86b2571fd3e096ecff21e3c5c7ae0756e67dfd0f-3840x2160.jpg',
      },
      {
        caption: 'A beautifully detailed entry to the Small L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4248936f96cd297ac840a8488bd8ebaa2fd53c47-3840x2160.jpg',
      },
      {
        caption: 'The exterior fireplace wall at sunset.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/86de1ba9eed6d6cd842621aeef24cb5da36f3be8-3840x2160.jpg',
      },
      {
        caption: 'The entry of the HUTS Small L, with wood storage and front door in view.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/33979ce6046f2db3808c9c048eaa3d5b6abf4205-3840x2160.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Considered Interiors',
        title: 'Double Exposure',
        text: 'With exposures on both sides of the great room, the feeling in this grand vaulted space is one that feels as much outdoors and indoors.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ccd3ca15b1cffe51b8ab796282c3a32f5b2eac50-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/ccd3ca15b1cffe51b8ab796282c3a32f5b2eac50-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Details Matter',
        title: 'Honest Materials',
        text: 'The pure shape of the home is complimented by a material palette of natural wood, glass, and steel.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/9317b3f9b97534c6a13f396a66cde8a7f88e9f77-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/9317b3f9b97534c6a13f396a66cde8a7f88e9f77-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Small L',
    projects: [
      {
        title: 'Appalachian Retreat',
        slug: '/portfolio/appalachian-retreat',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3d6b3177b98085d0999a62a0670540539c2f6de8-2160x1215.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/e06ed4f9f37be7e14b16cea823571a8daa355aca-2160x1216.png',
        tags: ['Small L', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Forever Home'],
      },
      {
        title: 'Reservoir House',
        slug: '/portfolio/reservoir-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/344ae7e6b8b1cb18635e9b5a00fa0bbd851542de-1440x810.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/7c6aa08b3006095c3e0f870b85713eb8313a391d-1440x810.png',
        tags: ['Small L', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Forever Home'],
      },
      {
        title: 'Ketchum Modern',
        slug: '/portfolio/ketchum-modern',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/57dce8f176b93c3db145ff7f14a6d657d4b37c5c-1440x850.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/4088c9fc9c0ef8a7d6031e6e12c81d60f64dac7f-1440x810.png',
        tags: ['Small L', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Forever Home'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. MEDIUM BAR
  // --------------------------------------------------------------------------
  'medium-bar': {
    slug: 'medium-bar',
    title: 'Medium Bar',
    tags: ['2.5 Bed', '1 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/5fc32189cdb0de452c46ef025de46e1e2bd63232-3000x1688.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/22e392c4e767684a13df77fed0553694c7b59ae6-2099x2099.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/68694549ea2c06f3fd73841fcc746d31cb0cd397-4800x4416.jpg',
    overview:
      'An efficient 2.5 bedroom home that packs big functionality into a small footprint. An open living / kitchen / dining room is surrounded by glass. A loft above the guest rooms holds the principle bedroom and a dedicated lofted working space that overlooks the living room.',
    specs: [
      { label: 'Size', text: '850 sf' },
      { label: 'Features', text: 'Flexible Loft' },
    ],
    accordion: {
      title: 'Surprisingly Spacious',
      description:
        'The HUTS Medium Bar is all about delivering big functionality in a small package. It works for couples hosting friends, families, and delivers high ROI as a rental property.',
      rows: [
        {
          index: '01',
          title: 'Full Size Staircase to Loft Bedroom/Office',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/813aa858f15b2c8bd3036f7750c344e21e38a6a2-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/813aa858f15b2c8bd3036f7750c344e21e38a6a2-835x602.svg',
        },
        {
          index: '02',
          title: 'Queen Beds & Full Closets',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/d58ef13c6b94e2aff3e3161ea04f140619ce8bf7-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d58ef13c6b94e2aff3e3161ea04f140619ce8bf7-835x602.svg',
        },
        {
          index: '03',
          title: 'Full Bath with Option to Expand with Tub',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/732f6c5eeb2bd9a6d6f5f7d9ba0dd873ad8240e4-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/732f6c5eeb2bd9a6d6f5f7d9ba0dd873ad8240e4-835x602.svg',
        },
        {
          index: '04',
          title: "Full Wall Chef's Kitchen",
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/5fa34e3c74be83111aabf34a25405f22b3629342-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5fa34e3c74be83111aabf34a25405f22b3629342-835x602.svg',
        },
        {
          index: '05',
          title: 'Living Space with Full Height Vaulted Ceiling',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/96cbbac66404d65a08ece383c74b2f7f88e219a1-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/96cbbac66404d65a08ece383c74b2f7f88e219a1-835x602.svg',
        },
        {
          index: '06',
          title: 'Entry Closet & Mechanicals',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/15fc105e2c6337a042a7478fe8a0155fe1e84a28-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/15fc105e2c6337a042a7478fe8a0155fe1e84a28-835x602.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'A clean profile with full-height windows on all exposures',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/537e1a5f24ec2048e91d655a3604216c3fe864a9-2762x2309.jpg',
      },
      {
        title: 'Rear view of Medium Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/00f80db35dcd15b48ea17dc2cf07a11c5c728a25-2762x2220.jpg',
      },
      {
        title: 'Medium Bar full elevation',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/f96e6780a3a416435554cbc3ead25ccc44d20281-2304x1536.jpg',
      },
      {
        title: 'Full floorplan',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/f381900abc1b5692e3cf8f2c34c7216330f18ddb-2304x1536.jpg',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6372d3ad7e766d222cef59fdc47f738d9d0c1cfd-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/6372d3ad7e766d222cef59fdc47f738d9d0c1cfd-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Medium Bar are designed to strike a beautiful composition from every angle - front, side and back.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6b4ae21db763e0e5039abfb7607f286c7e38e408-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/6b4ae21db763e0e5039abfb7607f286c7e38e408-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'A sense of arrival',
        text: 'The best part about living among nature is the sense of relief when you arrive. Our designs are crafted to create a sensation of arrival to somewhere peaceful, balanced and purposeful.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a32e83607bc49aede95874939884d9a44c56d5f7-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/a32e83607bc49aede95874939884d9a44c56d5f7-3840x2160.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'An elevation of the Medium Bar at dawn',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a06ca2f1bd88672faf96cba2e08ebe5f30548e8c-3840x2160.jpg',
      },
      {
        caption: 'The Medium Bar nestled against the shore of the river',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3945027ff598f28d2c14e344078d4fae53e34fdf-3840x2160.jpg',
      },
      {
        caption: 'The Medium Bar features an end-to-end deck, with dedicated outdoor dining, lounge and firepit / sauna / hot tub area',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5892a2298aac400d9e5803b1048987bfb794f92d-3840x2160.jpg',
      },
      {
        caption: 'Shown here clad in cedar shingles, the material palette can be revised to work with region, context and preferences',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ad731fe67f556f8eab2cb42903117ff344a9c2fe-3840x2160.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Immersed in Nature',
        title: 'Great Room',
        text: 'With sliding glass walls and full-height windows surrounding the space, the compact footprint of the living area feels huge and airy.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/721a12974c48f54cf84ca671e9435fb3416a6ffd-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/721a12974c48f54cf84ca671e9435fb3416a6ffd-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Details Matter',
        title: 'Integrated Loft',
        text: 'The loft space can either overlook the public area or include a full height wall to provide privacy. At nearly 400 SF, the loft is sizable, and can be modified to accommodate built-in closets, a bathroom, or dedicated office space.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7f06ebfd392905cd6e81864d9b7330226e636c5a-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/7f06ebfd392905cd6e81864d9b7330226e636c5a-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Medium Bar',
    projects: [
      {
        title: 'Stonewall House',
        slug: '/portfolio/stonewall-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e49727a2dd6f922a5857096b982d068bdfb84990-2048x1152.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/44800598be7609e8f5254aa6a51e475b9f6d99c7-3000x1688.jpg',
        tags: ['Medium Bar', '2 Bed', '2 Bath', '1,000-1,500 Sqft', 'Starter Home'],
      },
      {
        title: 'Beaver Brook',
        slug: '/portfolio/beaver-brook',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/023f15276a079e42e88e7edd021c0306ab47e313-1440x850.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/7a0bdd55869d428857899d2d4987e12600666dba-1152x768.png',
        tags: ['Medium Bar', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Hybrid Home'],
      },
      {
        title: 'Twin Mountain',
        slug: '/portfolio/twin-mountain',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1414f42fb2fb2677d706625820fb62a2c26bee84-3000x1688.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/4f9bfd5df0ab24f4b09cf8155f800606f04ae1d2-3000x1689.png',
        tags: ['Medium Bar', '5 Bed', '4 Bath', '3,000+ Sqft', 'Hybrid Home'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. DOGTROT
  // --------------------------------------------------------------------------
  dogtrot: {
    slug: 'dogtrot',
    title: 'Dogtrot',
    tags: ['2 Bed', '1.5 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/3bb03a64e64e6dce824f35fe7130a4a1287797d9-3840x2160.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/b74ce20f2f5f1cae50eef9cdbc6a726ab8d382db-564x383.png',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/aab572bff3627e669f2b551ad1694bb679e8998e-4800x4338.jpg',
    overview:
      'This 2 bedroom Standard design is marked by a clean separation of public and private functions. The two, equal-sized gable-roofed structures are connected by a shared breezeway that leads out to the deck between them that’s best oriented towards the primary view.',
    specs: [
      { label: 'Size', text: '1,022 sf' },
      { label: 'Features', text: 'Private/Public Separation' },
    ],
    accordion: {
      title: 'Unique Form',
      description:
        'Entering through the center entryway, our Dogtrot has a connector between the public and private spaces on either side. Turn left into the public area, where you’ll find a full-height vaulted living, kitchen, dining room. Turn right, and you’ll enter the private space: two equal-sized bedrooms and spacious three-piece bathroom.',
      rows: [
        {
          index: '01',
          title: 'Entry Closet & Mechanicals',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/cdd9991ae562f3dcc37393cc412684783f4f2a83-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/cdd9991ae562f3dcc37393cc412684783f4f2a83-835x602.svg',
        },
        {
          index: '02',
          title: 'Common Powder Room',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/19433fc9b96fba5b66b9bcf4a970045f09c01f6e-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/19433fc9b96fba5b66b9bcf4a970045f09c01f6e-835x602.svg',
        },
        {
          index: '03',
          title: 'Private Bedroom & Bathroom Area',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/00d668451da294b42e24e76eaf7f96abff99da65-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/00d668451da294b42e24e76eaf7f96abff99da65-835x602.svg',
        },
        {
          index: '04',
          title: 'Kitchen & Dining Under Vaulted Ceiling',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/c03a9ef805fa79d13262794e533768bdc42b413e-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c03a9ef805fa79d13262794e533768bdc42b413e-835x602.svg',
        },
        {
          index: '05',
          title: 'Defined Outdoor Room',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/34a8eced6e85e76322779eff7a0feda179a2acbd-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/34a8eced6e85e76322779eff7a0feda179a2acbd-835x602.svg',
        },
        {
          index: '06',
          title: 'Living Room with Fireplace',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/0a40e5fb27fe0fb99dcde54a3f77ce51c5c372b2-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/0a40e5fb27fe0fb99dcde54a3f77ce51c5c372b2-835x602.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'Entry into the center of the Dogtrot.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/aa9fe94a78a2b20cf0d6e5cf45d6cc392655dba1-4800x4338.jpg',
      },
      {
        title: 'The cloistered rear patio of the Dogtrot, framed by the two gable roof structures.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5451408e12cc485740ea6119642a7c4903eb97be-4800x4338.jpg',
      },
      {
        title: 'Dogtrot elevation.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/35850085b997d3288c75f8efc6188b90c82c48b6-1152x768.png',
      },
      {
        title: 'Full floorplan.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/9ae76e19dfbd0d8def6f28feaac1c960b41520b3-1152x970.png',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/fb8ca4270f5247300e391a31aef49d7c43056c9f-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/fb8ca4270f5247300e391a31aef49d7c43056c9f-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Dogtrot are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Dogtrot? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/04039b507315b4cc31e74b2a2cf19e9c73b53ba0-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/04039b507315b4cc31e74b2a2cf19e9c73b53ba0-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Scale',
        title: 'Appropriate Sizing',
        text: 'New home builds are generally way too big. Extra spaces go underutilized, cost too much to build, too much to maintain, and suck up too much energy to condition. At just over 1000 SF, our Dogtrot has everything you need, nothing you don’t, in one beautiful home design.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/46e4f30db4e08e97d50f05b1b4c78d260674d045-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/46e4f30db4e08e97d50f05b1b4c78d260674d045-3840x2160.jpg',
      },
    ],
    imageGrid: [
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/f6d25176904f9198812bddec5b82bc117f38f464-3840x2160.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/15874632c0bb14b36163eb0c4fe5715c99506615-3840x2160.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4cec25194482ae42d4a06ef807f925cd0466c7b5-3840x2160.jpg' },
      { image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4a668fc49c4e43a167acdcf79b7d3f5d8e7b18fb-3840x2160.jpg' },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Interiors',
        title: 'Great Room',
        text: 'Organized around the galley chef’s kitchen, the great room features dedicated spaces for living, dining and cooking. A generous entertaining space for a small home footprint.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/35a6a4d281a522230cb8858c55b7770826490727-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/35a6a4d281a522230cb8858c55b7770826490727-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Details Matter',
        title: 'Considered Millwork',
        text: 'Beautiful micro-bevel millwork sets the tone for this space, and can be customized with any number of profiles and finishes, including painted, lacquered and natural wood.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ea34d832c947c5e05cec7f743871a091064b4232-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/ea34d832c947c5e05cec7f743871a091064b4232-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Dogtrot',
    projects: [
      {
        title: 'North Peak',
        slug: '/portfolio/north-peak',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/51419a5688876ba0ca2f0ff4f1c0ac16345a4607-1440x810.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/317df148d7216c59f67236c3f20e6b077f62ee1f-1440x810.png',
        tags: ['Small L', 'Dogtrot', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Investment Property'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 6. BIG BAR
  // --------------------------------------------------------------------------
  'big-bar': {
    slug: 'big-bar',
    title: 'Big Bar',
    tags: ['3 Bed', '2 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/a7e51b8f98a5b8fc18166de061a85a08bce28b94-3840x2160.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/7d481791d6139e5f98a1455da75f6e3d63abf1d9-2233x2105.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/c85860ab65562ce2a2cbdab7d3d345278b9447aa-4800x3955.jpg',
    overview:
      'With a single, long roof line, the HUTS Big Bar presents a refined architectural move across the landscape. This design is perfect for steep sites or when there’s one orientation towards the primary view on the site. Organized in wings with bedrooms on either side of the public spaces, this design is excellent for short-term rental as the principle suite can be locked off from visitors while the spacious guest area is offered for rent.',
    specs: [
      { label: 'Size', text: '1,284 sf' },
      { label: 'Features', text: 'Dedicated Entry' },
    ],
    accordion: {
      title: 'Thoughtful Simplicity',
      description:
        'A thoughtful home design considers all of the potential uses across the lifespan of the place. Can it work as a full-time residence? Does it have a variety of rental arrangements? Can it host guests and be the center of activity? Is it small enough to disappear within the landscape? With our Big Bar, we tried to think of everything.',
      rows: [
        {
          index: '01',
          title: 'Entry with Built-In Closets & Storage',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/7222619aa10f0d5ad483bf3c5c7864e6974aa1cb-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7222619aa10f0d5ad483bf3c5c7864e6974aa1cb-835x361.svg',
        },
        {
          index: '02',
          title: 'Principle Bedroom with Corner Glass',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/fc50980e7837d31de01094aa04f0816f122147d2-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/fc50980e7837d31de01094aa04f0816f122147d2-835x361.svg',
        },
        {
          index: '03',
          title: 'Bathroom with Dual Showers & Tub',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/a3bf2cc05168c618c8531073aeb1f36e9c7fddc7-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a3bf2cc05168c618c8531073aeb1f36e9c7fddc7-835x361.svg',
        },
        {
          index: '04',
          title: 'Full-Height, Vaulted Living Space',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/c6619b25ad3db7e01145470344a65b519a3bc2d3-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c6619b25ad3db7e01145470344a65b519a3bc2d3-835x361.svg',
        },
        {
          index: '05',
          title: 'Full Guest Bathroom',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/162d2d42aad6c963eec2ff6a553d504be52f5936-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/162d2d42aad6c963eec2ff6a553d504be52f5936-835x361.svg',
        },
        {
          index: '06',
          title: 'Laundry Closet & Mechanicals',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/056d6dbcdec8e4b09c8c60476cf8e5189fa5c4e9-835x361.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/056d6dbcdec8e4b09c8c60476cf8e5189fa5c4e9-835x361.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'The subtle entrance to the Big Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c85860ab65562ce2a2cbdab7d3d345278b9447aa-4800x3955.jpg',
      },
      {
        title: 'The grand rear patio of the Big Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1f90fb49daf8d8dc3827c97e1340b24660190042-3449x2460.jpg',
      },
      {
        title: 'Full floorplan',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5b53a1b875f06907314e002f3f215cc899ac4b58-3450x2304.jpg',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3fcd175290121022d4fbf24e59ce34fda01ad490-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/3fcd175290121022d4fbf24e59ce34fda01ad490-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Big Bar are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Big Bar? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/273874576a6c9bd2e1da715416e1f49c8deb1fbf-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/273874576a6c9bd2e1da715416e1f49c8deb1fbf-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'Outdoor Rooms',
        text: 'Nobody builds a house in the country to stay inside all the time. Considered outdoor areas expand your usable footprint, without having to pay for walls, roofs, or ongoing conditioning costs. The HUTS Big Bar merges indoors and outdoors, adding lots of usable (outdoor) space at a fraction of the build cost.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/bf96758c271e085bc8b8193ed1e7ef25f2124c5c-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/bf96758c271e085bc8b8193ed1e7ef25f2124c5c-3840x2160.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'Big Bar sited on a thinned forest lot',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/cc11c619e778a543f8439582f83fd82171194ca1-3840x2160.jpg',
      },
      {
        caption: 'The HUTS Big Bar on a summer morning',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/652f1a590f8c24a81984a97afd52fd14113267a9-3840x2160.jpg',
      },
      {
        caption: 'An informal boardwalk entry to the HUTS Big Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1f565e439afc9bd804e1a720a4755b61a4f8146b-3840x2160.jpg',
      },
      {
        caption: 'The refined, minimal entry to the HUTS Big Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/a0a26103a04ea52a7394f140632482c912caa531-3840x2160.jpg',
      },
      {
        caption: 'Honest materials meeting at the rear of the HUTS Big Bar',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6f7093eec7b58c74e351ddbb0adea113dcc6660d-3840x2160.jpg',
      },
      {
        caption: 'Entry along the living, kitchen, dining space',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/0c20d4c27d4adbbcc58355c2e9c113577a302451-3840x2160.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Immersed in Nature',
        title: 'Great Room',
        text: 'Organized around the galley chef’s kitchen, the great room features dedicated spaces for living, dining and cooking. A generous entertaining space for a small home footprint.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/f14a8cbb8d8866b306af995a1628512cb306d8a9-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/f14a8cbb8d8866b306af995a1628512cb306d8a9-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Details Matter',
        title: 'Considered Millwork',
        text: 'Beautiful micro-bevel millwork sets the tone for this space, and can be customized with any number of profiles and finishes, including painted, lacquered and natural wood.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/f04d9c378bbedeebd93afadff98b9e1d49b193fa-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/f04d9c378bbedeebd93afadff98b9e1d49b193fa-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Big Bar',
    projects: [
      {
        title: 'Break House',
        slug: '/portfolio/break-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/dacfea2a387f782e7dfe3b00f40ed7276da964a5-3070x2047.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/c45e208f072aacfdde60517b84638f6805f62aec-3200x2133.png',
        tags: ['Big Bar', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Hybrid Home'],
      },
      {
        title: 'Mombaccus Modern',
        slug: '/portfolio/mombaccus-modern',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/4137d9155afd3738d014985968936f7f7b3b30a3-2160x1215.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/6be655ea947d7c03be3de492f790d6352153a0cb-2160x1200.png',
        tags: ['Big Bar', '3 Bed', '2 Bath', '1,500-2,000 Sqft', 'Forever Home'],
      },
      {
        title: 'Creekside Compound',
        slug: '/portfolio/creekside-compound',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/212b49dc352468037ad6e960041b3be578005dcc-1440x810.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/826dc5c73893229b805a048e1885d398c3b77c15-1152x768.png',
        tags: ['Medium Bar', 'Big Bar', '6+ Bed', '4+ Bath', '3,000+ Sqft', 'Multi-Generational Compound'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. BIG L
  // --------------------------------------------------------------------------
  'big-l': {
    slug: 'big-l',
    title: 'Big L',
    tags: ['3 Bed', '2.5 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/a3e4fe195acb4e421f398c1aae2f53406565f63a-1250x703.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/94475e5020164a6f8ab9320e043f250b2000eb0d-772x703.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/566719422aa173d3ef049f99c5d3908c5d0bd003-4281x2808.jpg',
    overview:
      'Our largest Standard plan, the HUTS Big L combines the efficiency of the Small L with a grand principle suite. Glass walls and corner glazing details open the home up to the panoramic views and seamless indoor-outdoor living. Fantastic as a primary home, a sizeable second home (that’s equally comfortable in mountain or beach settings), or short-term rental with lots of possible arrangements, the Big L is a study in how to merge function with architectural form.',
    specs: [
      { label: 'Size', text: '1,800 sf' },
      { label: 'Features', text: 'Principle Suite' },
    ],
    accordion: {
      title: 'Spaces for Everyone',
      description:
        'The Big L includes spaces for kids, guests, potential renters and owners. It’s a big space without being overwhelming, with each area well-considered for modern living.',
      rows: [
        {
          index: '01',
          title: 'Entryway',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/b9d50041d8ea0820cb259d6109c49e302b9b925b-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/b9d50041d8ea0820cb259d6109c49e302b9b925b-835x602.svg',
        },
        {
          index: '02',
          title: 'Dedicated Office Space & Storage',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/8680ce7322f0168b7da8b0f9cbeab555e4c0b20d-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8680ce7322f0168b7da8b0f9cbeab555e4c0b20d-835x602.svg',
        },
        {
          index: '03',
          title: 'Full Height Vaulted Living Space',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/685c426a7b7a94a78f77fb1aa954db415297bb34-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/685c426a7b7a94a78f77fb1aa954db415297bb34-835x602.svg',
        },
        {
          index: '04',
          title: 'Principle Bathroom & Walk-In Closet',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/1a2ba0702a5788bad53fc0cf5d7f3843e27f8a77-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1a2ba0702a5788bad53fc0cf5d7f3843e27f8a77-835x602.svg',
        },
        {
          index: '05',
          title: 'Principle Bedroom',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/9a9e3e0619fc5334540ec4ec2432d5f31f7a4075-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/9a9e3e0619fc5334540ec4ec2432d5f31f7a4075-835x602.svg',
        },
        {
          index: '06',
          title: 'Guest / Kids Wing',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/bb9e24529c7c7257e01812557ee50c8d685e8917-835x602.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/bb9e24529c7c7257e01812557ee50c8d685e8917-835x602.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'The entry to the HUTS Big L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/566719422aa173d3ef049f99c5d3908c5d0bd003-4281x2808.jpg',
      },
      {
        title: 'The rear patio and courtyard of the HUTS Big L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8f5b26d1d6fb6c581b342a6307edb7e43e669fa0-4281x2788.jpg',
      },
      {
        title: '360º elevation view',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/46537c48f63f48c290160e61c8a75a53bc1ef24e-2304x1536.jpg',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d61f8fae5d8c93ba677ed4f0581db925ec315da9-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/d61f8fae5d8c93ba677ed4f0581db925ec315da9-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Big L are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Big L? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d1cec67e72078646f5d665859b54bafb5686c28a-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/d1cec67e72078646f5d665859b54bafb5686c28a-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'Outdoor Rooms',
        text: 'Nobody builds a house in the country to stay inside all the time. Considered outdoor areas expand your usable footprint, without having to pay for walls, roofs, or ongoing conditioning costs. The HUTS Big L merges indoors and outdoors, adding lots of usable (outdoor) space at a fraction of the build cost.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/335600cff63eb93eedbe428c2ab5b30953c4b9c1-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/335600cff63eb93eedbe428c2ab5b30953c4b9c1-3840x2160.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'View of the guest wing facade',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d1c45925b172c59137da0ffe90a4dcab18176655-3840x2160.jpg',
      },
      {
        caption: 'Rustic boardwalk entryway to the Big L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/6eae523d7f0145ee62ee1fc6694f08bbf6d7c698-3840x2160.jpg',
      },
      {
        caption: 'Glass entryway into the Big L',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/bcb59c806d705052e8fee01ee7844b9a0a34db97-3840x2160.jpg',
      },
      {
        caption: 'Rear facade of the principle suite and living / kitchen / dining space',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5cbaf2b23ab6dde546fe55cd3d8d13fb5f60e427-3840x2160.jpg',
      },
      {
        caption: 'View from the guest bedroom corner across the courtyard to the public wing of the home',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/bb8da1d95d9d007e37ebecb3102a37685c03915a-3840x2160.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'Let the Light In',
        title: 'Double Exposure',
        text: 'With exposures on both sides of the great room, the feeling in this grand vaulted space is one that feels as much outdoors and indoors.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8a0793e1ca510a904d3520294b4651fadde2cab9-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/8a0793e1ca510a904d3520294b4651fadde2cab9-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'An Intimate Home',
        title: 'Views for Days',
        text: 'The Big L offers a unique mix of transparency and privacy. Anywhere that glass is appropriate, sliders and floor-to-ceiling picture windows are incorporated, providing grand vistas over the land and cheekier looks across the house. When privacy is required, we’ve pulled back and allowed wall space for furniture and art placement.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5078171777c9610cf2c9fe6f436bac2ee07504a7-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/5078171777c9610cf2c9fe6f436bac2ee07504a7-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Big L',
    projects: [
      {
        title: 'Fremont Forever Home',
        slug: '/portfolio/fremont-forever-home',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5c494328c3c94eea753b3e02732909b31d3b41f5-3000x1688.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/67dee40ff89a85c4c56137766c5f4d94a1887fe2-3000x1688.png',
        tags: ['Big L', 'Village', '4 Bed', '2.5 Bath', '3,000+ Sqft', 'Forever Home'],
      },
      {
        title: 'Mountain View Meadow',
        slug: '/portfolio/mountain-view-meadow',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/5c3cc3da09c516a2ba6f0339d635553934dcf2aa-2048x1365.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/4788e850b34ff622c9c47d57a7f5dc4f3a8d8947-2048x1365.png',
        tags: ['Big L', '2 Bed', '2.5 Bath', '1,500-2,000 Sqft', 'Investment Property'],
      },
      {
        title: 'Hill Top House',
        slug: '/portfolio/hill-top-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/cd5aca7a968602961bf143ed26569651b33c929f-1998x1124.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/cbf7c4654ac53b012c66abeb10071a2f70297af0-1440x825.png',
        tags: ['Big L', '2 Bed', '2 Bath', '2,000-3,000 Sqft', 'Second Home'],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 8. VILLAGE
  // --------------------------------------------------------------------------
  village: {
    slug: 'village',
    title: 'Village',
    tags: ['3 Bed', '2.5 Bath'],
    heroImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/ff8419f394574383bdf007835770d23d365eee60-3840x2160.jpg',
    thumbnail: 'https://cdn.sanity.io/images/xi1ruvdt/production/9ee66c5354de48ceb7b2c5e456303301ef947fbe-2367x2160.jpg',
    floorplan: 'https://cdn.sanity.io/images/xi1ruvdt/production/03e0167e89b28dc8472022956e8f7d95f1f61698-4800x3827.jpg',
    overview:
      'Our 3-bedroom village scheme is designed for sites where there’s more than just one view or one experience the home should be oriented towards. The principle suite, guest structure and public functions are arrayed around a central glass connector, and each individual structure is oriented towards a separate view. The arrangement creates a dynamic relationship to the landscape and produces diverse outdoor spaces.',
    specs: [
      { label: 'Size', text: '1,560 sf' },
      { label: 'Features', text: 'Various Outdoor Spaces' },
    ],
    accordion: {
      title: 'An Innovative Form',
      description:
        'At first, our Village Standard appears as a cluster of separate structures, but the home is actually a single form. The turns and connections in the design create clear separation between programs along with a collection of interesting outdoor patios, cloistered gardens and private rooms within nature.',
      rows: [
        {
          index: '01',
          title: 'Guest / Kids Bedrooms & Bathroom',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/1ebb2b7f3f2090556ca57e09910a0944dd2723ed-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1ebb2b7f3f2090556ca57e09910a0944dd2723ed-835x649.svg',
        },
        {
          index: '02',
          title: 'Entry Corridor',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/3f8f6ef244268593ff4ac04ece333a8808e48921-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3f8f6ef244268593ff4ac04ece333a8808e48921-835x649.svg',
        },
        {
          index: '03',
          title: 'Principle Suite with Walk-In Closet',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/8df3ce21402327eabc5e47f594f7283e14f56c8f-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8df3ce21402327eabc5e47f594f7283e14f56c8f-835x649.svg',
        },
        {
          index: '04',
          title: 'Powder Room & Mechanical Storage',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/c9c45568923721aca688d0a59e2e913a73a82634-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c9c45568923721aca688d0a59e2e913a73a82634-835x649.svg',
        },
        {
          index: '05',
          title: 'Open Living Space',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/e05369e8b47dca0c659578a35dee98ef65be28c5-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/e05369e8b47dca0c659578a35dee98ef65be28c5-835x649.svg',
        },
        {
          index: '06',
          title: 'One of Several Dedicated Outdoor Rooms',
          svgUrl: 'https://cdn.sanity.io/images/xi1ruvdt/production/8a320575ab32b2d03926ed182a40951c0821291e-835x649.svg',
          image: 'https://cdn.sanity.io/images/xi1ruvdt/production/8a320575ab32b2d03926ed182a40951c0821291e-835x649.svg',
        },
      ],
    },
    sliderTitle: 'Floorplans & Elevations',
    sliderItems: [
      {
        title: 'The entry side of our 360º HUTS Village Standard',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/aef17e3170e8f01ff48b8886fbf2f1f89bc09d41-4800x3827.jpg',
      },
      {
        title: 'The rear of our HUTS Village showing various outdoor spaces',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/03e0167e89b28dc8472022956e8f7d95f1f61698-4800x3827.jpg',
      },
      {
        title: '360º elevation view',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/1bbe9e0f1676ced4043f361aeacfdd01cdddd9d3-2304x1536.jpg',
      },
    ],
    exteriorBackAndForth: [
      {
        side: 'right',
        label: 'Context',
        title: 'A thoughtful and modern cabin',
        text: 'Our design and development approach was crafted with context in mind. How do we make new builds feel like they belong - nestled homes that feel like they’re of the landscape and not just in it or near it.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/21a7745b2598121e40ed7ae4cb67be2b3080d08d-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/21a7745b2598121e40ed7ae4cb67be2b3080d08d-3840x2160.jpg',
      },
      {
        side: 'left',
        label: 'Composition',
        title: "Gather 'Round",
        text: 'The window patterns on our Village are designed to strike a beautiful composition from every angle - front, side and back. When developing a rural home, the importance of 2D curb appeal gives way to the 360 experience of the landscape. Our Village? It’s a beautiful home from every angle.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/0a67b05f1b4fed2b7c1ca105b754991914432873-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/0a67b05f1b4fed2b7c1ca105b754991914432873-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Live Outside',
        title: 'Outdoor Rooms',
        text: 'Nobody builds a house in the country to stay inside all the time. Considered outdoor areas expand your usable footprint, without having to pay for walls, roofs, or ongoing conditioning costs. The HUTS Village merges indoors and outdoors, adding lots of usable (outdoor) space at a fraction of the build cost.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ef10a51c27dcc4bcb537da918832bcbb760a4551-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/ef10a51c27dcc4bcb537da918832bcbb760a4551-3840x2160.jpg',
      },
    ],
    imageGrid: [
      {
        caption: 'View towards the rear of the HUTS Village Standard',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/ff8419f394574383bdf007835770d23d365eee60-3840x2160.jpg',
      },
      {
        caption: 'Natural wood facade meets natural wood decking',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/45ec2688cb355e82859d688f8ccafa86dc9c7a9f-3840x2160.jpg',
      },
      {
        caption: 'Entryway with decking and natural stone steps',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/36f712b9819ff5b3348f62fa29ca2ee1c14a497b-3840x2160.jpg',
      },
      {
        caption: 'Outdoor decking overlooking the approach',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/7d61b56afd9c63e13f705159949b748bbd341e1b-3840x2160.jpg',
      },
    ],
    interiorBackAndForth: [
      {
        side: 'left',
        label: 'A Grand Space',
        title: 'Great Room',
        text: 'The Living, kitchen, dining space features ample space for each activity, a large loft area, and separation from the principle suite.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/64c0c7b69566de915e1f3a15666706f34eef0c8f-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/64c0c7b69566de915e1f3a15666706f34eef0c8f-3840x2160.jpg',
      },
      {
        side: 'right',
        label: 'Details Matter',
        title: 'Considered Millwork',
        text: 'Beautiful micro-bevel millwork sets the tone for this space, and can be customized with any number of profiles and finishes, including painted, lacquered and natural wood.',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/979e5fb94b20384430b26ee4dc2ea36af7881b0d-3840x2160.jpg',
        url: 'https://cdn.sanity.io/images/xi1ruvdt/production/979e5fb94b20384430b26ee4dc2ea36af7881b0d-3840x2160.jpg',
      },
    ],
    includeInterior: true,
    projectsTitle: 'Projects using Village',
    projects: [
      {
        title: 'Live-Work House',
        slug: '/portfolio/live-work-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/d46484e4b60a3acc8cc7d4df39300dd1889ae785-3000x1688.jpg',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/bf1d1d18c08e8d91a31903a5d633315784ddc2bf-3000x1689.png',
        tags: ['Village', '2 Bed', '2.5 Bath', '1,500-2,000 Sqft', 'Forever Home'],
      },
      {
        title: 'Garden Home',
        slug: '/portfolio/garden-home',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/c5749355747204a48ad9eee6df922eb1dde33a58-1440x800.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/c4c5ec89c4be1d24b4d94fabdab623c9daad84d6-1440x825.png',
        tags: ['Village', '2 Bed', '2.5 Bath', '1,500-2,000 Sqft', 'Forever Home'],
      },
      {
        title: 'The Barn House',
        slug: '/portfolio/the-barn-house',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/3110715101dd3b5872d13ee53024420cdc9f06e3-1440x800.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/f7296c6b37925e9e238668ee3f00971aad732029-1440x810.png',
        tags: ['Village', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Investment Property'],
      },
      {
        title: 'Kerhonkson',
        slug: '/portfolio/kerhonkson',
        image: 'https://cdn.sanity.io/images/xi1ruvdt/production/fe90a153b38b340201b93841f6f2f73215569bec-1440x810.png',
        interiorImage: 'https://cdn.sanity.io/images/xi1ruvdt/production/007a8f2c338fec571894a4e608be071b7aac259c-1152x768.png',
        tags: ['Village', '2 Bed', '2 Bath', '2,000-3,000 Sqft', 'Second Home'],
      },
    ],
  },
};

// Aliases cho các định dạng slug khác nhau (ví dụ 'adu' <-> 'adus')
STANDARDS_DETAIL_DATA['adu'] = STANDARDS_DETAIL_DATA['adus'];

// ============================================================================
// 4. HELPER FUNCTIONS TIỆN ÍCH TRUY VẤN
// ============================================================================

/**
 * Lấy dữ liệu chi tiết của một Standard theo slug.
 * Tự động chuẩn hóa alias giữa 'adu' và 'adus'.
 */
export function getStandardDetail(slug: string): StandardDetailData | undefined {
  const normalized = slug === 'adu' ? 'adus' : slug;
  return STANDARDS_DETAIL_DATA[normalized];
}

/**
 * Lấy toàn bộ danh sách 8 mẫu Standards độc bản (không trùng lặp alias).
 */
export function getAllStandards(): StandardDetailData[] {
  return [
    STANDARDS_DETAIL_DATA['adus'],
    STANDARDS_DETAIL_DATA['small-bar'],
    STANDARDS_DETAIL_DATA['small-l'],
    STANDARDS_DETAIL_DATA['medium-bar'],
    STANDARDS_DETAIL_DATA['dogtrot'],
    STANDARDS_DETAIL_DATA['big-bar'],
    STANDARDS_DETAIL_DATA['big-l'],
    STANDARDS_DETAIL_DATA['village'],
  ];
}

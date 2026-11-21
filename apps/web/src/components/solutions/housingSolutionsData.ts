export interface BackAndForthItem {
  side: 'left' | 'right';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  title: string;
  desc: string;
  galleryImages?: string[];
}

export interface ListItem {
  title: string;
  desc: string;
}

export interface StandardsSliderData {
  title: string;
  desc: string;
  cards: string[];
}

export interface ProjectFeatureItem {
  title: string;
  slug: string;
  image: string;
  interiorImage?: string;
  tags: string[];
}

export interface ProjectFeatureData {
  heading: string;
  includeInterior?: boolean;
  projects: ProjectFeatureItem[];
}

export interface HousingSolutionDetailData {
  slug: string;
  label: string;
  h1: string;
  cta: string;
  illo: string;
  intro: string;
  backAndForth: BackAndForthItem[];
  designConsiderations: ListItem[];
  financialConditions: ListItem[];
  whyHuts: BackAndForthItem;
  standardsSlider: StandardsSliderData | null;
  projectFeature: ProjectFeatureData;
}

export interface StandardCardLookup {
  slug: string;
  title: string;
  coverImg: string;
  axonImg: string;
  tags: string[];
}

export const STANDARDS_LOOKUP: Record<string, StandardCardLookup> = {
  'small-bar': {
    slug: 'small-bar',
    title: 'Small Bar',
    coverImg: '/standards/covers/small-bar.jpg',
    axonImg: '/standards/axonometric/small-bar.jpg',
    tags: ['1 Bed', '1 Bath'],
  },
  'small-l': {
    slug: 'small-l',
    title: 'Small L',
    coverImg: '/standards/covers/small-l.jpg',
    axonImg: '/standards/axonometric/small-l.jpg',
    tags: ['2.5 Bed', '1.5 Bath'],
  },
  'medium-bar': {
    slug: 'medium-bar',
    title: 'Medium Bar',
    coverImg: '/standards/covers/medium-bar.jpg',
    axonImg: '/standards/axonometric/medium-bar.jpg',
    tags: ['2.5 Bed', '1 Bath'],
  },
  'big-bar': {
    slug: 'big-bar',
    title: 'Big Bar',
    coverImg: '/standards/covers/big-bar.jpg',
    axonImg: '/standards/axonometric/big-bar.jpg',
    tags: ['3 Bed', '2 Bath'],
  },
  'big-l': {
    slug: 'big-l',
    title: 'Big L',
    coverImg: '/standards/covers/big-l.jpg',
    axonImg: '/standards/axonometric/big-l.jpg',
    tags: ['3 Bed', '2.5 Bath'],
  },
  'village': {
    slug: 'village',
    title: 'Village',
    coverImg: '/standards/covers/village.jpg',
    axonImg: '/standards/axonometric/village.jpg',
    tags: ['3 Bed', '2.5 Bath'],
  },
  'dogtrot': {
    slug: 'dogtrot',
    title: 'Dogtrot',
    coverImg: '/standards/covers/dogtrot.png',
    axonImg: '/standards/axonometric/dogtrot.jpg',
    tags: ['2 Bed', '1.5 Bath'],
  },
  'adu': {
    slug: 'adu',
    title: 'ADUs',
    coverImg: '/standards/covers/adu.jpg',
    axonImg: '/standards/axonometric/adu.png',
    tags: ['Sleeping Areas', 'Wet Room'],
  },
  'adus': {
    slug: 'adu',
    title: 'ADUs',
    coverImg: '/standards/covers/adu.jpg',
    axonImg: '/standards/axonometric/adu.png',
    tags: ['Sleeping Areas', 'Wet Room'],
  },
};

export const HOUSING_SOLUTIONS_DATA: Record<string, HousingSolutionDetailData> = {
  'starter-home': {
    slug: 'starter-home',
    label: 'Starter Home',
    h1: 'Start small. [Think long].',
    cta: 'Create my Starter Home',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/a0ccbe6d79faab2281bc8839f92faf3f7869f9f7-120x120.svg',
    intro:
      "You’re tired of renting, but the leap to buying feels overwhelming — especially when every “affordable” home on the market needs work, feels cramped, or looks like someone else's dream from 1993. You're not trying to max out your life savings on day one. You're trying to make a smart move: something you can afford now, that sets you up for the long term. You want a home that works for your current life — and one that can evolve with it. The dream isn’t “forever” on day one. It’s a strong foundation to build on.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/322bb91f2dd602f2810215ab4a141788330d44ce-3000x2250.jpg',
        title: 'We build smart from the start.',
        desc: 'Right-sized, efficient homes that hit your budget, fit your lifestyle, and don’t cut corners.',
      },
      {
        side: 'right',
        mediaType: 'video',
        mediaUrl:
          'https://cdn.sanity.io/files/xi1ruvdt/production/0badec48ada5a828995caa930a5e02912a02c279.mp4',
        title: "We plan for what's next.",
        desc: 'Our Starter Homes are designed to grow — with clear options for future additions or upgrades.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/6638b7828d2470d6a0064946bc7f84198d272f7b-1741x1678.png',
        title: 'We guide the whole journey.',
        desc: 'From land sourcing to permitting to financing strategy, we help first-time buyers get unstuck.',
      },
    ],
    designConsiderations: [
      {
        title: 'Flexible floorplans.',
        desc: 'Spaces that can shift as life does — an office now, a nursery later, a guest suite down the line.',
      },
      {
        title: 'Storage where it matters.',
        desc: 'Closets, mudrooms, and pantries that keep small homes livable and clutter-free.',
      },
      {
        title: 'Room to expand.',
        desc: "Homes are sited and designed to support future additions, whether it's a second bedroom or a backyard studio.",
      },
      {
        title: 'Efficient systems.',
        desc: 'We spec durable, cost-effective heating, cooling, and insulation for real performance.',
      },
      {
        title: 'Every inch earns its keep.',
        desc: 'No wasted space, no over-designed gimmicks — just thoughtful simplicity that works.',
      },
    ],
    financialConditions: [
      {
        title: 'Built for your budget.',
        desc: 'We keep total project costs within reach — typically under 4x local dual-income household earnings.',
      },
      {
        title: 'Own instead of rent.',
        desc: 'Our process helps you shift from paying someone else’s mortgage to building equity in your own home.',
      },
      {
        title: 'Act as your own developer.',
        desc: 'By managing the process with our help, you skip the markup and keep more value.',
      },
      {
        title: 'Phased investment.',
        desc: 'Start with what you need now. Add to it over time — when life and finances allow.',
      },
      {
        title: 'Financing support.',
        desc: 'We’ll help you understand what’s possible, from first-time buyer loans to low-down-payment options.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/3e6215eaa2d22eb8052c290de3e5f1cbd361606f-1670x1096.jpg',
      title: 'Why We Work on Starter Homes',
      desc: 'The Starter Home isn’t just a small house — it’s a strategy. Our homes are designed to be financially attainable, emotionally satisfying, and structurally ready to grow. We help first-time buyers get into the market with confidence and a plan. At HUTS, we don’t believe in building something you’ll grow out of. We build something you can grow into.',
    },
    standardsSlider: {
      title: 'Starter homes made easy with Standards',
      desc: 'Our Standards will do the heavy lifting when it comes to turning your first home into a reality.',
      cards: ['small-bar', 'small-l', 'medium-bar'],
    },
    projectFeature: {
      heading: '...and we work with you to make it stand the test of time.',
      includeInterior: false,
      projects: [
        {
          title: 'Stonewall House',
          slug: '/portfolio/stonewall-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/e49727a2dd6f922a5857096b982d068bdfb84990-2048x1152.jpg',
          tags: ['Medium Bar', '2 Bed', '2 Bath', '1,000-1,500 Sqft', 'Starter Home'],
        },
      ],
    },
  },

  'forever-home': {
    slug: 'forever-home',
    label: 'Forever Home',
    h1: "Build the [last house] you'll ever need.",
    cta: 'Create my Forever Home',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/04f505d271689be3485b9196d07c3778cf6ae6cc-120x120.svg',
    intro:
      "This is about roots. You want space to gather, work, retreat, host the holidays, and eventually pass something down. But getting there isn’t simple. You want a home that feels intentional, personal, and future-proof — not one that’s trendy for five minutes or designed around someone else’s idea of “dream home.” You're building your backdrop. It better be good.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/d2eb6544521ad22141f786d457a256f35cda432e-1668x1668.jpg',
        title: 'We design with your whole life in mind.',
        desc: 'Work, family, aging, guests, seasons — we think through it all so your home grows with you.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/69b44fd679c1e06c622b935844bf72fb50b03ffa-1682x1682.jpg',
        title: 'We help define what really matters.',
        desc: 'Through our process, we help you prioritize the things that will have lasting meaning.',
      },
      {
        side: 'left',
        mediaType: 'video',
        mediaUrl:
          'https://cdn.sanity.io/files/xi1ruvdt/production/9b58a8f7b2adf7965d4bd53fd4d0b2f67da5d848.mp4',
        title: 'We get it built the right way.',
        desc: 'Our standards streamline construction without sacrificing quality or individuality.',
      },
    ],
    designConsiderations: [
      {
        title: 'Zoned living.',
        desc: 'Private space when you need it, connection when you want it — for couples, families, or multiple generations.',
      },
      {
        title: 'Spaces with purpose.',
        desc: 'Workspaces that don’t feel like afterthoughts. Guest rooms that double as studios. Storage where it counts.',
      },
      {
        title: 'Aging in place.',
        desc: 'Thoughtful layouts with wide doorways, minimal thresholds, and single-level options baked in from the start.',
      },
      {
        title: 'Durable, timeless materials.',
        desc: 'Finishes that wear in, not out — built for decades, not design trends.',
      },
      {
        title: 'Outdoor life integrated.',
        desc: 'Porches, patios, mudrooms, and gardens that support the daily rhythms of rural living.',
      },
    ],
    financialConditions: [
      {
        title: 'Smart where it counts.',
        desc: 'Private space when you need it, connection when you want it — for couples, families, or multiple generations.',
      },
      {
        title: 'Build onces, live long.',
        desc: 'A well-planned forever home avoids costly remodels or additions down the line.',
      },
      {
        title: 'Equity you live in.',
        desc: 'You’re not just parking money in land — you’re building value through quality and function.',
      },
      {
        title: 'Flexibility for family.',
        desc: 'A home that can evolve to accommodate aging parents, returning kids, or changing needs.',
      },
      {
        title: 'No middlemen.',
        desc: 'By acting as your own developer, you keep more of your investment in the actual home.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/f22fcc480475fec2bd2859d1267bc719e1dd67fa-3000x1688.jpg',
      title: 'Why HUTS Works on Forever Homes',
      desc: 'A forever home isn’t about size — it’s about fit. We don’t just help you build a house that looks great on day one. We help you create one that still works on day ten thousand. Our process brings clarity to big decisions, ensures your budget goes toward things that last, and delivers a home that’s as thoughtful as the life you’ll live in it. You bring the long view. We’ll bring the plan to get there.',
    },
    standardsSlider: {
      title: 'Forever starts with Standards',
      desc: 'Our range of Standards plans includes a multiple design fit for a forever home, from modest to multi-generational compound builders.',
      cards: ['big-bar', 'big-l', 'village'],
    },
    projectFeature: {
      heading: '...and we work with you to make it stand the test of time.',
      includeInterior: false,
      projects: [
        {
          title: 'Arrowhead Ridge',
          slug: '/portfolio/arrowhead-ridge',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/2867afd2262b02bd559af982c9d4fccd0d2e08c6-1440x810.png',
          tags: ['Big L', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Forever Home', 'ADU'],
        },
        {
          title: 'Reservoir House',
          slug: '/portfolio/reservoir-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/344ae7e6b8b1cb18635e9b5a00fa0bbd851542de-1440x810.png',
          tags: ['Small L', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Forever Home'],
        },
        {
          title: 'Ketchum Modern',
          slug: '/portfolio/ketchum-modern',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/57dce8f176b93c3db145ff7f14a6d657d4b37c5c-1440x850.png',
          tags: ['Small L', '2 Bed', '2.5 Bath', '2,000-3,000 Sqft', 'Forever Home'],
        },
      ],
    },
  },

  'second-home': {
    slug: 'second-home',
    label: 'Second Home',
    h1: "Your [first priority] when you're not working.",
    cta: 'Create my Second Home',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/562af5c7e19af3961fa43255da57792b646c0cf6-120x120.svg',
    intro:
      "You work hard, and when you leave town, you want to actually leave town. You’re not looking for a rental property, or a fixer-upper that turns into another job. You want a second place that feels like home — one that resets your rhythm the moment you arrive. A place that’s close enough to get to often, but far enough to feel like an escape. This isn’t about income. It’s about peace, presence, and making your time off feel like time off.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/d3af069cf7c6e3962e020566301e7e3a1beaa18c-2500x1407.jpg',
        title: 'We design for how you really live.',
        desc: 'Lazy mornings, muddy hikes, hosting friends — the whole second-home cadence.',
      },
      {
        side: 'right',
        mediaType: 'video',
        mediaUrl:
          'https://cdn.sanity.io/files/xi1ruvdt/production/e855f8394c372dfe52a771f0ad6abed3898c071c.mp4',
        title: 'We help make it easy.',
        desc: 'From land selection to utilities to permits, we simplify the messy parts so you can focus on the fun parts.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/ce8397a99ed80cb2d4771ee425fd48c85594f2cb-3000x1688.jpg',
        title: "We don't waste your time or money.",
        desc: 'No overdesign. No underbuilding. Just the right house, in the right place.',
      },
    ],
    designConsiderations: [
      {
        title: 'Easy arrival and reset.',
        desc: 'Mudrooms, gear storage, and drop zones that make weekend landings seamless.',
      },
      {
        title: 'Casual, open living.',
        desc: 'Floorplans that support lounging, gathering, cooking, and doing nothing at all.',
      },
      {
        title: 'Low-effort upkeep.',
        desc: 'Materials and systems that hold up to infrequent use, fast cleanups, and seasonal shifts.',
      },
      {
        title: 'Guest-friendly but not guest-centric.',
        desc: 'Extra beds, yes — but not at the cost of your own comfort or privacy.',
      },
      {
        title: 'Outdoor living that matters.',
        desc: 'Screened porches, fire pits, trails, or hot tubs — built to be used, not just photographed.',
      },
    ],
    financialConditions: [
      {
        title: 'Spend where it counts.',
        desc: 'We help direct budget toward what creates lasting value — not resale fluff or real estate fads.',
      },
      {
        title: 'No income pressure.',
        desc: 'Because you’re not renting, we focus on livability, not ROI or platform performance.',
      },
      {
        title: 'Construction cost clarity.',
        desc: 'Realistic estimates based on real builds in your region — no guesswork.',
      },
      {
        title: 'Long-term durability.',
        desc: 'Quality materials and thoughtful design reduce future costs and surprise fixes.',
      },
      {
        title: "Quality that's emotional and real.",
        desc: 'You’re building a home that means something — and holds value in every sense.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'video',
      mediaUrl:
        'https://cdn.sanity.io/files/xi1ruvdt/production/b44c2febc29e84c65537d50229ef26c4999cf817.mp4',
      title: 'Why HUTS Works Here',
      desc: 'A second home should feel easy, personal, and permanent — not like another transaction. We take the second-guessing out of second-home building. From land sourcing to permitting to design that fits your lifestyle, HUTS brings clarity and ease to the process. You bring the playlist. We’ll build the place you press play.',
    },
    standardsSlider: {
      title: 'Build your Second Home with Standards',
      desc: 'Depending on your needs, our Standards will help you create the perfect second home.',
      cards: ['small-l', 'medium-bar', 'village'],
    },
    projectFeature: {
      heading: '…and we work with you to make it everything you’ve dreamed of.',
      includeInterior: false,
      projects: [
        {
          title: 'Walla Walla',
          slug: '/portfolio/walla-walla',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/229bbd46ce998a03c741b1d1f4900e3a5fe551e9-2048x1152.jpg',
          tags: ['Dogtrot', 'Village', '5 Bed', '4+ Bath', '3,000+ Sqft', 'Micro Hospitality'],
        },
        {
          title: 'Sea Ranch',
          slug: '/portfolio/sea-ranch',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/e2cc3422dcd6b11a9237cc1d7c36ee3d453973e5-1440x810.png',
          tags: ['Small L', '2 Bed', '2.5 Bath', '1,500-2,000 Sqft', 'Hybrid Home'],
        },
        {
          title: 'Swamp Pond Road',
          slug: '/portfolio/swamp-pond-road',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/84bd48e38412f3083d1e97d6e9216721de79d567-1440x810.png',
          tags: ['Big Bar', '3 Bed', '2.5 Bath', '1,500-2,000 Sqft', 'Second Home'],
        },
      ],
    },
  },

  'hybrid-home': {
    slug: 'hybrid-home',
    label: 'Hybrid Home',
    h1: 'Live here, rent there, [build equity] in the background.',
    cta: 'Create my Hybrid Home',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/507ae04cddbe0d5d50216593dd85be21ffe4135e-120x120.svg',
    intro:
      "You rent in the city, but you want to own something. You’re not ready to leave your current life behind—but you’re ready to start building a future. You’ve probably toured a few “starter homes” and scrolled endless listings, but everything feels like a compromise or a money pit. You don’t need more options. You need a plan that lets you own your kind of home—even if it means sharing it with a few strangers (for now).",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/c2cc02a1ca2137cb4c252f7f38adadcb7ca3fbd5-2880x2160.jpg',
        title: 'Designed with dual-use in mind.',
        desc: 'Whether you’re living in it part-time, renting it out on weekends, or doing both at once, we create homes that flex with your life.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/2ef65dd47166fa881b30f546118f0532748b9111-3200x2132.jpg',
        title: 'Planning for ownership from day one.',
        desc: 'Our process helps you build equity without sacrificing lifestyle or quality of life.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/cc5436fecd35854a1600cd0df4aa13ccdbf35ec3-3000x2308.jpg',
        title: "We'll walk you through the weird stuff.",
        desc: 'Shared use, financing, permitting, management—we’ve seen it all and we’ll help you make smart choices every step of the way.',
      },
    ],
    designConsiderations: [
      {
        title: 'Kitchens that cook.',
        desc: 'Full kitchens that work for both weekday meals and weekend guests, with durable surfaces and smart storage.',
      },
      {
        title: 'Lockable owner zones.',
        desc: 'Closets, cabinets, or even whole rooms that stay private when you’re not there.',
      },
      {
        title: 'Easy transitions.',
        desc: 'Furniture layouts and floorplans that feel personal when you’re in them and professional when you’re not.',
      },
      {
        title: 'Low-maintenance materials.',
        desc: 'Finishes that wear well, clean easily, and still look great in listing photos.',
      },
      {
        title: 'Zoned living.',
        desc: 'Sound separation, outdoor access, and flexible layouts that make a small home feel like it has two speeds.',
      },
    ],
    financialConditions: [
      {
        title: 'Rental-ready from day one.',
        desc: 'Designed to meet the expectations (and price points) of short-term rental guests.',
      },
      {
        title: 'Offsetting ownership costs.',
        desc: 'With the right plan, your home helps pay for itself—even before you live there full time.',
      },
      {
        title: 'Financing that flexes.',
        desc: 'We help you explore construction loans, mortgages, and creative ways to use existing equity.',
      },
      {
        title: 'Smart operational setup.',
        desc: 'From management to cleaning to seasonal use, we help you make the numbers work.',
      },
      {
        title: 'Long-game investment.',
        desc: 'You’re not just owning a home—you’re building a foothold in a place you care about.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/ad0b520aa33618093f05deca223dcb20815fb24d-2880x2160.png',
      title: 'Why HUTS Works on Hybrid Homes',
      desc: 'Most builders aren’t thinking about a home that lives two lives. We are. Hybrid Homes require a clear plan, thoughtful design, and a development process that balances emotion with economics. At HUTS, we don’t just help you build a house—we help you figure out how it all works, from the day you get the keys to the day it’s your full-time home. Or your launchpad. Or your long game.',
      galleryImages: [
        'https://cdn.sanity.io/images/xi1ruvdt/production/ad0b520aa33618093f05deca223dcb20815fb24d-2880x2160.png',
        'https://cdn.sanity.io/images/xi1ruvdt/production/24bfc69a3480a71bc23a5c2c643f04c262e1f48c-3200x2133.jpg',
        'https://cdn.sanity.io/images/xi1ruvdt/production/4ef818b6d5765e3ac2d8aef64f64c1dec838d177-2160x1215.jpg',
        'https://cdn.sanity.io/images/xi1ruvdt/production/860b4971fae3b7006d4527194ca0a846cee2fceb-2160x1662.jpg',
      ],
    },
    standardsSlider: {
      title: 'Start your Hybrid Home with our Standards...',
      desc: 'Our Standards will help you create the perfect hybrid home that’s as unique as your needs.',
      cards: ['medium-bar', 'small-l', 'dogtrot'],
    },
    projectFeature: {
      heading: "...and we'll work with you to make your home work for you.",
      includeInterior: true,
      projects: [
        {
          title: 'Break House',
          slug: '/portfolio/break-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/dacfea2a387f782e7dfe3b00f40ed7276da964a5-3070x2047.jpg',
          interiorImage:
            'https://cdn.sanity.io/images/xi1ruvdt/production/c45e208f072aacfdde60517b84638f6805f62aec-3200x2133.png',
          tags: ['Big Bar', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Hybrid Home'],
        },
        {
          title: 'The Trail House',
          slug: '/portfolio/the-trail-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/8c963ceba25c36785c663a6ff460e400add60882-3981x2239.jpg',
          interiorImage:
            'https://cdn.sanity.io/images/xi1ruvdt/production/9615ee4e24f1cc8dba13a9490b3eccc55778e9a9-2500x1875.jpg',
          tags: ['ADU', 'Medium Bar', '2 Bed', '2 Bath', '1,000-1,500 Sqft', 'Hybrid Home'],
        },
        {
          title: 'Oak Bluffs House',
          slug: '/portfolio/oak-bluffs-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/ee9912cbdab0c67e080162bdde1a50588d4cdf1a-1440x850.png',
          interiorImage:
            'https://cdn.sanity.io/images/xi1ruvdt/production/860b4971fae3b7006d4527194ca0a846cee2fceb-2160x1662.jpg',
          tags: ['Small Bar', '1 Bed', '2 Bath', '500 - 1,000 Sqft', 'Hybrid Home'],
        },
        {
          title: 'Blueberry Hill House',
          slug: '/portfolio/blueberry-hill-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/7dd63d9c9da5e1e7906c40a22fee8cdfecc34093-2048x1365.jpg',
          tags: ['2 Bed', '2 Bath', '1,500-2,000 Sqft', 'Second Home'],
        },
      ],
    },
  },

  'adu': {
    slug: 'adu',
    label: 'ADU',
    h1: "Add what's [missing].",
    cta: 'Create my ADU',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/42dcdb8469fa2e33e6a0b614be753dde8269d807-120x120.svg',
    intro:
      "You’ve got the property — now you want it to work harder. Whether it’s space for an aging parent, a rental to offset the mortgage, or just somewhere guests can crash without sharing your kitchen, an ADU sounds like the answer. But between confusing zoning rules, unclear costs, and builders who think “accessory” means “afterthought,” it’s hard to know where to start. You’re not just adding a unit. You’re creating options — for family, for income, for the future.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/539d7e9a8c566d7002a3d6efa2fd29ce13e244e6-997x1121.jpg',
        title: "We start with what's allowed.",
        desc: 'Before you dream up layouts, we check the zoning. We’ll tell you what’s feasible — and how to get it approved.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/ca1166237ad20235ec2b11b1d52ff629b45d802b-3000x1688.png',
        title: 'We design for multiple uses.',
        desc: 'In-laws today, tenants tomorrow. Our ADUs flex with your needs.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/5943b919f12ed3ec3589a59a6f0706f252a17b51-1440x810.png',
        title: 'We make it pencil.',
        desc: 'Clear costs, smart phasing, and a focus on long-term value.',
      },
    ],
    designConsiderations: [
      {
        title: 'Right-sized everything.',
        desc: 'We design compact units with full function — real kitchens, bathrooms, and private entries.',
      },
      {
        title: 'Separate, but connected.',
        desc: 'Thoughtful placement, pathing, and landscaping keep privacy intact while staying close.',
      },
      {
        title: 'Indoor-outdoor flow.',
        desc: 'Patios, pocket yards, or decks extend usable space without adding square footage.',
      },
      {
        title: 'Neutral, durable finishes.',
        desc: 'Looks great, holds up over time, and works for guests, tenants, or family.',
      },
      {
        title: 'Dual-purpose layouts.',
        desc: 'We build in flexibility for short stays, long-term use, or aging in place.',
      },
    ],
    financialConditions: [
      {
        title: 'Lower total cost, higher utility.',
        desc: 'ADUs are one of the most efficient ways to increase livable space and property value.',
      },
      {
        title: 'Income potential.',
        desc: 'Renting your ADU — full-time or seasonally — can help offset your primary housing costs.',
      },
      {
        title: 'Feasible financing.',
        desc: 'We help clients navigate HELOCs, construction loans, and cash-out refis to get these built.',
      },
      {
        title: 'Avoid the markup.',
        desc: 'You act as the developer, keeping costs down and returns high.',
      },
      {
        title: 'Appraisal uplift.',
        desc: 'A well-designed, permitted ADU boosts your property’s value and flexibility on resale.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/9437b22105811bc27a87f0d36211b449287212f8-3200x2133.jpg',
      title: 'Why HUTS Works on ADUs',
      desc: 'ADUs are small, but the process can be anything but. From setbacks to utility tie-ins to “can I Airbnb this?”, we’ve done the homework so you don’t have to. At HUTS, we bring together zoning expertise, purpose-built design, and a build process that keeps things on track. Whether it’s for family, income, or just peace of mind, we’ll help you add what’s missing — and make sure it fits.',
    },
    standardsSlider: null,
    projectFeature: {
      heading: 'We’ll help you create a little space made just for you.',
      includeInterior: false,
      projects: [
        {
          title: 'Blueberry Hill ADU',
          slug: '/portfolio/blueberry-hill-adu',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/6015a1a13a97d8b2cf7e19d320b7fc3292d6e5b9-2160x1440.jpg',
          tags: ['ADU', 'Studio', '1 Bath', '<500 Sqft'],
        },
        {
          title: 'Old Gladstone Hollow',
          slug: '/portfolio/old-gladstone-hollow',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/77a01ee01c7585843447b2fb8728b3522db6af8d-1440x850.png',
          tags: ['ADU', 'Studio', '1 Bath', '<500 Sqft'],
        },
        {
          title: 'Moose Aly Guest House',
          slug: '/portfolio/moose-aly-guest-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/39d6a22295c5e94f66fc02a9278881ce7d60a83d-1440x810.png',
          tags: ['Small Bar', '3 Bed', '1 Bath', '1,000-1,500 Sqft', 'ADU'],
        },
      ],
    },
  },

  'investment-property': {
    slug: 'investment-property',
    label: 'Investment Property',
    h1: 'Design it like a home. Run it like [a business].',
    cta: 'Create an Investment Property',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/e054694545fd9a5e81b0b6de369ec84f547c72f9-120x120.svg',
    intro:
      "You’re not looking for a passion project. You’re looking for a property that performs — one that guests love, appraisers respect, and managers can run without chaos. But too often, investment homes are either soulless boxes with bad furniture or over-designed one-offs that cost too much and return too little. You don’t want to build just for the spreadsheet, but you can’t ignore it either. This is a real estate asset. And the best version of that is one that’s well-designed, cost-aware, and operationally tight.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'video',
        mediaUrl:
          'https://cdn.sanity.io/files/xi1ruvdt/production/ac04bc49b2de4958d908883abb602eb8c510ce6a.mp4',
        title: 'We treat ROI like a design input.',
        desc: 'Our homes are beautiful, but always built with revenue, cost, and resale in mind.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/2d5151fa7caa42a3c193b5c0fdf1ce906728e93d-2048x1146.jpg',
        title: 'We help you de-risk development.',
        desc: 'Site selection, zoning feasibility, utilities, and phasing — all part of our process.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/51419a5688876ba0ca2f0ff4f1c0ac16345a4607-1440x810.png',
        title: 'We build repeatable value.',
        desc: "Whether it's one house or ten, we help create a system you can grow.",
      },
    ],
    designConsiderations: [
      {
        title: 'Efficiency without compromise.',
        desc: 'Layouts that maximize rentable square footage without feeling cramped.',
      },
      {
        title: 'Durable interiors.',
        desc: 'Thoughtful materials that are built to impress guests and survive turnover.',
      },
      {
        title: 'Guest-first experience.',
        desc: 'Arrival flow, lighting, privacy, and amenities that drive five-star reviews and higher ADRs.',
      },
      {
        title: 'Brand-consistent design.',
        desc: 'Each unit is distinct but familiar — great for portfolios or scaling over time.',
      },
      {
        title: 'Maintenance-aware planning.',
        desc: 'Mechanical systems, cleaning access, and finishes that make operations smoother.',
      },
    ],
    financialConditions: [
      {
        title: 'Designed to cash flow.',
        desc: 'We model your build costs against rental income and help hit targets from day one.',
      },
      {
        title: 'CapEx you can trust.',
        desc: 'Our estimates are grounded in reality — based on actual construction across the country.',
      },
      {
        title: 'Loan-ready documentation.',
        desc: 'Drawings, specs, and pro formas built to satisfy lenders and underwriters.',
      },
      {
        title: 'Low overhead, high return.',
        desc: 'Acting as your own developer means more of your investment goes into the asset.',
      },
      {
        title: 'Exit optionality.',
        desc: 'Designed assets hold value — for sale, refi, or rebrand down the line.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/f272ddb798bcb5e4131623dfb7d9b3e0c2e07a2d-1440x810.png',
      title: 'Why HUTS Works Here',
      desc: 'We don’t see a conflict between good design and good investment. We design properties people want to book, buy, and brag about — while helping you stay on budget and on timeline. Whether you’re building your first rental or your fifth, we bring a framework that’s both creative and capital-conscious. It’s not just about what it looks like. It’s about what it earns — and how easy it is to own.',
    },
    standardsSlider: {
      title: 'Smart investment starts with Standards',
      desc: 'Our Standards will help you build an investment property that works for you.',
      cards: ['medium-bar', 'dogtrot', 'small-l'],
    },
    projectFeature: {
      heading: '…and we work with you to make it more than just another property.',
      includeInterior: false,
      projects: [
        {
          title: 'Endless Meadow House',
          slug: '/portfolio/endless-meadow-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/6d3a862d9d5bdd023c5ee3a8f40378c4d26ed2c8-2048x1366.jpg',
          tags: ['Small L', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Investment Property'],
        },
        {
          title: 'Sunset Beach',
          slug: '/portfolio/sunset-beach',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/73464b52d04c9f3e6ced17bf60d03c8c3c4a4e49-2048x1152.jpg',
          tags: ['Custom', '2 Bed', '2 Bath', '1,500-2,000 Sqft', 'Investment Property'],
        },
        {
          title: "Fisherman's Retreat",
          slug: '/portfolio/fishermans-retreat',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/d2fcb349a4bb5bfcc2024e3512adac575c562801-2048x1366.jpg',
          tags: ['Medium Bar', '2 Bed', '2 Bath', '1,500-2,000 Sqft', 'Investment Property'],
        },
        {
          title: 'North Peak',
          slug: '/portfolio/north-peak',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/51419a5688876ba0ca2f0ff4f1c0ac16345a4607-1440x810.png',
          tags: ['Small L', 'Dogtrot', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Investment Property'],
        },
      ],
    },
  },

  'micro-hospitality': {
    slug: 'micro-hospitality',
    label: 'Micro-Hospitality',
    h1: 'Small stays. [Big returns].',
    cta: 'Create a Micro-Hospitality Destination',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/c5340ae58c788a53a90232eb55d0b241fdd93478-120x120.svg',
    intro:
      "You’re not just listing a bed. You’re curating a place. A setting. An experience guests will remember, photograph, and tell friends about. You want to build something that fits the land, feels intentional, and delivers more than just a place to sleep. You’ve got a vision—maybe it’s a cluster of cabins, maybe it’s one great house in the woods—but you need help turning that into something real.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/b1056953e77a1adeba63790f132bf72414e49004-4000x2250.jpg',
        title: 'We design hospitality from the start.',
        desc: 'Our homes are shaped around guest experience, from arrival to checkout and everything in between.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/459a0c6832fb5c501919e0391667c179784b3e37-4800x5108.png',
        title: 'We help make it pencil.',
        desc: 'Cost modeling, pro forma development, seasonal yield — our team blends design and development into one approach.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/7c3cdeeabf421f96fa9fd28364ccca190d8c4b7c-2190x2179.jpg',
        title: 'We guide the whole process.',
        desc: 'Land selection, permitting, utilities, phasing — we don’t just draw it. We get it built.',
      },
    ],
    designConsiderations: [
      {
        title: 'Layout that tells a story.',
        desc: 'Arrival sequence, sightlines, and lighting are all scripted to create a memorable guest experience.',
      },
      {
        title: 'Guest-ready infrastructure.',
        desc: 'Strong water pressure, hardwired Wi-Fi, durable finishes, and easy-to-clean systems.',
      },
      {
        title: 'Interior that earns.',
        desc: 'Well-designed interiors don’t just feel good, they drive nightly rates and five-star reviews.',
      },
      {
        title: 'Modular units, custom feeling.',
        desc: 'Each unit is designed to feel distinct but still efficient to build and repeat.',
      },
      {
        title: 'Amenity choreography.',
        desc: 'From wood-fired tubs to fire pits to shared trails, everything is planned like a stage set, not a parking lot.',
      },
    ],
    financialConditions: [
      {
        title: 'Revenue per square foot matters.',
        desc: 'These homes are small, but they earn big if designed right.',
      },
      {
        title: 'CapEx clarity.',
        desc: 'Our cost estimates are grounded in real-world builds across rural America.',
      },
      {
        title: 'Phased development.',
        desc: 'Start with one unit, grow over time, and reuse your permitting and site infrastructure.',
      },
      {
        title: 'Better than prefab alone.',
        desc: 'Most prefab companies sell you a box. We help you make a profitable hospitality product.',
      },
      {
        title: 'Ongoing ROI.',
        desc: 'Good design pays off in occupancy, nightly rate, repeat guests, and resale value.',
      },
    ],
    whyHuts: {
      side: 'right',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/f01d61086ed3aa0b8480096d2fa9573864a2e57d-4000x2400.jpg',
      title: 'Why HUTS works on Microhospitality',
      desc: 'We’ve built for guests before. And for owners. We know what makes a place both magical and manageable. Micro hospitality lives at the intersection of experience design, real estate development, and operations. HUTS is one of the few companies that actually operates at that intersection. We’ll help you build a place people can’t wait to stay at, and a business you’re proud to own.',
    },
    standardsSlider: {
      title: 'Create a destination worth staying with Standards',
      desc: 'Our Standards will help you build a memorable destination experience for your guests.',
      cards: ['village', 'adus', 'medium-bar'],
    },
    projectFeature: {
      heading: '…and we work with you to make it more than just a place to stay.',
      includeInterior: false,
      projects: [
        {
          title: 'Gulf Road',
          slug: '/portfolio/gulf-road',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/c9055fc6f8ab4cad9fd1f570ee00fc0f0ba09f88-2048x1229.jpg',
          tags: ['ADU', '4 Bed', '4+ Bath', '1,000-1,500 Sqft', 'Micro Hospitality'],
        },
        {
          title: 'Branch Berkeley Springs',
          slug: '/portfolio/branch-berkeley-springs',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/334af504ced666d5f6fdff76e4aa0a5a2d11355a-4000x2250.jpg',
          tags: ['Custom', '6+ Bed', '4+ Bath', '3,000+ Sqft', 'Micro Hospitality'],
        },
        {
          title: 'The Billy',
          slug: '/portfolio/the-billy',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/c308841445f33b9b7ea9c78120ba381aee20f37b-2044x1358.png',
          tags: ['Custom', '6+ Bed', '4+ Bath', '3,000+ Sqft', 'Micro Hospitality'],
        },
        {
          title: 'Meeker Hollow Road',
          slug: '/portfolio/meeker-hollow-road',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/c010cf77285b234b5fac121eaad4340d8f013132-4000x2250.jpg',
          tags: ['Village', 'Dogtrot', 'ADU', '6+ Bed', '3,000+ Sqft', 'Micro Hospitality'],
        },
        {
          title: 'Medo Resorts',
          slug: '/portfolio/medo-resorts',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/969fa392cb0010c3c8669093c8e9957b285708b4-4000x2250.jpg',
          tags: ['Small Bar', 'Medium Bar', '6+ Bed', '3,000+ Sqft', 'Micro Hospitality'],
        },
        {
          title: 'Walla Walla',
          slug: '/portfolio/walla-walla',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/229bbd46ce998a03c741b1d1f4900e3a5fe551e9-2048x1152.jpg',
          tags: ['Dogtrot', 'Village', '5 Bed', '4+ Bath', '3,000+ Sqft', 'Micro Hospitality'],
        },
      ],
    },
  },

  'multi-generational': {
    slug: 'multi-generational',
    label: 'Multi-Generational Family Compound',
    h1: 'Build together. [Stay together].',
    cta: 'Create your Compound',
    illo: 'https://cdn.sanity.io/images/xi1ruvdt/production/510deebfe5ef8b59dc3bc901a75d659acd21f929-120x120.svg',
    intro:
      "You’re not just planning for yourself. You’re thinking about siblings, kids, parents, and maybe even grandkids. The goal isn’t just to build homes — it’s to build continuity. A place that can stretch, flex, and last. But the process is anything but simple. Zoning can be a puzzle. Every stakeholder has a different vision. And most builders aren’t used to thinking in decades. This isn’t about one house. It’s about designing land, relationships, and legacy.",
    backAndForth: [
      {
        side: 'left',
        mediaType: 'video',
        mediaUrl:
          'https://cdn.sanity.io/files/xi1ruvdt/production/5c1dbaa23bbf0fb24faa4a57c68958203a2cff39.mp4',
        title: 'We know the zoning landscape.',
        desc: 'From subdivisions to accessory dwellings to shared utilities, we’ll help you unlock what’s possible.',
      },
      {
        side: 'right',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/4e87845c95690d0ca3f345e66531a60c080d53a5-3000x1688.jpg',
        title: 'We design for harmony.',
        desc: 'Shared space where it matters, privacy where it counts — all tailored to your family’s rhythm.',
      },
      {
        side: 'left',
        mediaType: 'image',
        mediaUrl:
          'https://cdn.sanity.io/images/xi1ruvdt/production/12ff68ec9b0c945e5d31e924b177d304bfe882f3-8399x10498.jpg',
        title: 'We think like planners.',
        desc: 'Our team balances long-term ownership, phased development, and succession strategy.',
      },
    ],
    designConsiderations: [
      {
        title: 'Clusters, not copies.',
        desc: 'Homes are designed to relate to each other and the land — without feeling like a cul-de-sac.',
      },
      {
        title: 'Shared infrastructure.',
        desc: 'Driveways, wells, power, and septic systems are planned holistically to reduce costs and friction.',
      },
      {
        title: 'Flexible footprints.',
        desc: 'From full homes to ADUs to studios, we help mix scales and uses across one property.',
      },
      {
        title: 'Common spaces that work.',
        desc: 'Fire pits, gardens, trails, and shared pavilions designed for connection, not obligation.',
      },
      {
        title: 'Private zones by design.',
        desc: 'We balance proximity with autonomy — so families stay close without stepping on toes.',
      },
    ],
    financialConditions: [
      {
        title: 'Zoning-first feasibility.',
        desc: "We assess land use rules early — flagging what's allowed, what's likely, and what needs strategy.",
      },
      {
        title: 'Smarter site planning.',
        desc: 'Shared driveways, power drops, and septic reduce redundancy and overall build cost.',
      },
      {
        title: 'Flexible ownership models.',
        desc: 'Whether it’s held in trust, shared across an LLC, or passed down, we work within your long-term plan.',
      },
      {
        title: 'Phased development.',
        desc: 'Start with one or two homes, then grow over time — our approach makes that easy.',
      },
      {
        title: 'Equity across generations.',
        desc: 'Well-planned compounds preserve family wealth and give future generations options, not burdens.',
      },
    ],
    whyHuts: {
      side: 'left',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/8baf2af60f94cee414fb6d98ea437d4795426a7d-2400x3000.jpg',
      title: 'Why HUTS Works Here',
      desc: 'Most builders aren’t thinking in generations. We are. Compounds require more than good design — they need legal awareness, infrastructure planning, and land use strategy. At HUTS, we help families shape land and build homes that support real life across time. Whether you\'re trying to get everyone under one property line, or simply want a place to come back to forever, we’ll help you get it right — from zoning to zero punch list.',
    },
    standardsSlider: {
      title: 'Build for the future with Standards',
      desc: 'Our range of Standards plans includes a multiple design fit for multi-generational compound builders.',
      cards: ['village', 'small-l', 'big-l'],
    },
    projectFeature: {
      heading: '...and we work with you to make it stand the test of time.',
      includeInterior: false,
      projects: [
        {
          title: 'Endless Meadow House',
          slug: '/portfolio/endless-meadow-house',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/6d3a862d9d5bdd023c5ee3a8f40378c4d26ed2c8-2048x1366.jpg',
          tags: ['Small L', '3 Bed', '2 Bath', '1,000-1,500 Sqft', 'Investment Property'],
        },
        {
          title: 'Sunset Beach',
          slug: '/portfolio/sunset-beach',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/73464b52d04c9f3e6ced17bf60d03c8c3c4a4e49-2048x1152.jpg',
          tags: ['Custom', '2 Bed', '2 Bath', '1,500-2,000 Sqft', 'Investment Property'],
        },
        {
          title: "Fisherman's Retreat",
          slug: '/portfolio/fishermans-retreat',
          image:
            'https://cdn.sanity.io/images/xi1ruvdt/production/d2fcb349a4bb5bfcc2024e3512adac575c562801-2048x1366.jpg',
          tags: ['Medium Bar', '2 Bed', '2 Bath', '1,500-2,000 Sqft', 'Investment Property'],
        },
      ],
    },
  },
};

// Aliases
HOUSING_SOLUTIONS_DATA['multi-generation-compound'] = HOUSING_SOLUTIONS_DATA['multi-generational'];
HOUSING_SOLUTIONS_DATA['multi-gen-compound'] = HOUSING_SOLUTIONS_DATA['multi-generational'];

export const getHousingSolution = (slug: string): HousingSolutionDetailData => {
  return HOUSING_SOLUTIONS_DATA[slug] || HOUSING_SOLUTIONS_DATA['starter-home'];
};

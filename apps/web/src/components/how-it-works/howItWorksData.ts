export type PrincipleBgTheme = 'meadow' | 'sunshine' | 'sky' | 'beige';

export interface PrincipleAccordionItem {
  title: string;
  body: string;
}

export interface PrincipleTestimonial {
  author: string;
  quote: string;
  location: string;
}

export interface PrincipleCardItem {
  id: string;
  bgTheme: PrincipleBgTheme;
  title: string;
  description: string;
  accordions: PrincipleAccordionItem[];
  testimonialAuthor?: 'Lauren W.' | 'Dan S.';
  images?: string[];
}

export interface EditorialListItem {
  title: string;
  description: string;
}

export interface EditorialListSection {
  title: string;
  icon: string;
  items: EditorialListItem[];
}

export interface ApproachPageData {
  intro: {
    title: string;
    paragraphs: string[];
    image: string;
  };
  principleCards: PrincipleCardItem[];
  whatWeDo: EditorialListSection;
  whatWeDontDo: EditorialListSection;
}

export interface ServicePhaseRow {
  headline: string;
  summary: string;
  deliverables: string[];
}

export interface ServicePhaseItem {
  id: string;
  phaseLabel: string;
  title: string;
  description: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  arrowVariant: 'wide' | 'loop' | null;
  rows: ServicePhaseRow[];
}

export interface ServicesPageData {
  hero: {
    label: string;
    titlePrefix: string;
    titleHighlight: string;
    illustration: string;
    ctaText: string;
    ctaLink: string;
  };
  leadStatement: string;
  phases: ServicePhaseItem[];
}

// Trích dẫn Testimonials dùng cho các thẻ nguyên lý của The TIE Approach (đồng bộ với dữ liệu Trang chủ)
export const APPROACH_TESTIMONIALS: Record<'Lauren W.' | 'Dan S.', PrincipleTestimonial> = {
  'Lauren W.': {
    author: 'Lauren W.',
    quote:
      'The transparency on budget and schedule was unlike any construction project we’ve managed. A truly effortless experience from start to finish.',
    location: 'Forever Home Client',
  },
  'Dan S.': {
    author: 'Dan S.',
    quote:
      'As a couple with no experience in this field or idea on where to begin, TIE made something like building a home feel possible, organized, and deeply intentional.',
    location: 'Second Home Client',
  },
};

export const APPROACH_DATA: ApproachPageData = {
  intro: {
    title: 'Perfecting the craft of home design and development.',
    paragraphs: [
      'Our Studio is a team of designers, construction managers, project managers, zoning and land use gurus, and specialized professional consultants.',
      'We create our designs and deliver on developments with a few key principles in mind.',
    ],
    image:
      'https://cdn.sanity.io/images/xi1ruvdt/production/c8b5cf2b34240b94ff32f54df51102a56f9c1cdf-1440x810.jpg',
  },
  principleCards: [
    {
      id: 'the-maths-just-gotta-work',
      bgTheme: 'meadow',
      title: 'The Math’s Just Gotta Work',
      description:
        'A beautiful home isn’t enough—it has to pencil. At TIE, we design with financial feasibility in mind from day one. That means understanding the full picture: land, site work, approvals, construction costs, and long-term value. We don’t believe in surprises. We believe in clear-eyed planning that makes good design actually doable. Whether you’re building your first home, a short-term rental, or a family compound, we’re here to help make sure the numbers add up—and that your project is as smart on paper as it is in real life.',
      accordions: [
        {
          title: 'Feasibility First',
          body: 'We assess the financial and regulatory viability of your project before we draw a single line. That ensures your goals, budget, and site align.',
        },
        {
          title: 'Built to Hit the Target',
          body: "Whether you're aiming for an ultra-tight starter home or a high-end retreat, we align design decisions with your financial goals—without sacrificing intent or quality.",
        },
        {
          title: 'Transparency, Not Guesswork',
          body: 'Our process brings clarity to the full picture: site conditions, entitlements, utilities, and real-world build costs—so you can invest wisely.',
        },
      ],
      testimonialAuthor: 'Lauren W.',
    },
    {
      id: 'good-design-matters',
      bgTheme: 'sunshine',
      title: 'Good Design Matters',
      description:
        "We don’t treat design like a luxury add-on—it’s the core of everything we do. Good design doesn’t just look better; it lives better. It brings clarity to your routines, delight to your days, and enduring value to your investment. Whether you're building for yourself or for guests, thoughtful design drives demand, improves performance, and sets your property apart. We believe in homes that are intuitive, beautiful, and built to stand the test of time. It’s not about trends or taste—it’s about creating spaces that work hard and feel great.",
      accordions: [
        {
          title: 'Designed for Daily Joy',
          body: 'The right proportions, light, layout, and flow transform a house into a home. Good design makes everyday moments feel better—more calm, more connected, more you.',
        },
        {
          title: 'Built-In Long-Term Value',
          body: 'Great design never goes out of style. It holds its value, ages gracefully, and attracts attention—for all the right reasons—if you ever decide to sell.',
        },
        {
          title: 'Rental Demand Loves Design',
          body: 'A well-designed home stands out in a crowded market. Whether short-term or long-term, design-forward properties attract better guests, book faster, and earn more.',
        },
      ],
      images: [
        'https://cdn.sanity.io/images/xi1ruvdt/production/03704e6fcb6f588442e239c886c8c7adf18b79d6-3000x1875.jpg',
      ],
    },
    {
      id: 'the-land-guides-the-way',
      bgTheme: 'sky',
      title: 'The Land Guides the Way',
      description:
        'Imagine several acres of land. It’s around the size of your dining table. Imagine a house. It’s about the size of a Monopoly piece. Your property project is at least as much about designing for and working with the landscape as it is the interior space of your home. At TIE, we don’t impose a design on the land—we take our cues from it. That means studying topography, vegetation, solar orientation, wind patterns, views, and access. A smart home design doesn’t fight its environment—it harmonizes with it, creating spaces that feel inevitable, intentional, and rooted.',
      accordions: [
        {
          title: 'Land Sourcing with Intent',
          body: 'We evaluate each parcel not just for feasibility, but for design opportunity—so the land becomes a creative partner from the start.',
        },
        {
          title: 'Site-Sensitive Design',
          body: 'We respond to the land’s topography, light, vegetation, and views—shaping your home to fit the terrain, not flattening the terrain to fit your home.',
        },
        {
          title: 'Orientation Matters',
          body: 'We align homes to maximize passive solar gain, natural cooling, and outdoor living—designing with the sun and seasons in mind.',
        },
        {
          title: 'Minimal Footprint, Maximum Impact',
          body: 'We design homes that touch the land lightly—minimizing grading, preserving natural features, and creating meaningful moments between inside and out.',
        },
        {
          title: 'Outdoor Experience is Part of the Program',
          body: 'The site isn’t just what surrounds the house—it is the house. We plan for trails, clearings, gardens, and gathering spots from day one.',
        },
      ],
    },
    {
      id: 'better-decisions-not-more-decisions',
      bgTheme: 'beige',
      title: 'Better Decisions, Not More Decisions',
      description:
        'Designing a home shouldn’t feel like a full-time job—or a never-ending scroll of options. At TIE, we simplify the process without dumbing it down. That means narrowing choices to the ones that matter, sequencing decisions so they build on each other, and guiding you with clarity at every step. We don’t overwhelm you with catalogs or leave you in the dark. Instead, we use our expertise to present curated paths, smart defaults, and tradeoffs in plain English—so you can make confident, high-impact choices without getting bogged down.',
      accordions: [
        {
          title: 'Land Sourcing',
          body: 'We help you focus on parcels that work—by pre-vetting access, zoning, utilities, and buildability—so you don’t waste time chasing bad land.',
        },
        {
          title: 'Design',
          body: 'We offer design frameworks that adapt to your goals and site, not blank pages. You get creative freedom, not decision paralysis.',
        },
        {
          title: 'Interiors',
          body: 'Our standards are rooted in beauty and function. We present intentional choices—material palettes, fixture sets, layout options—so you’re never guessing.',
        },
        {
          title: 'Financing',
          body: 'We connect design to real budgets. Whether you’re financing a build or looking at long-term ROI, we help you evaluate what makes sense and when.',
        },
        {
          title: 'Construction',
          body: 'From procurement to timelines, we help you stay focused on the decisions that keep your build on track—and avoid costly detours.',
        },
      ],
      testimonialAuthor: 'Dan S.',
    },
    {
      id: 'make-cool-stuff-with-cool-people',
      bgTheme: 'meadow',
      title: 'Make Cool Stuff with Cool People',
      description:
        'Homebuilding is a team sport—and sometimes, it goes into extra innings. That’s why we believe the who is just as important as the what. At TIE, we aim to make beautiful, lasting homes—but also to enjoy the process of making them. We work best with curious, collaborative, and good-humored people, whether they’re clients, contractors, consultants, or team members. No ego, no drama, no jerks. Just talented people aligned around a shared goal: building something great together. If we’re going to spend months (or years) working together, let’s make it fun, respectful, and worth the effort.',
      accordions: [
        {
          title: 'Clients as Creative Partners',
          body: 'We work best with clients who bring vision, openness, and a little grit. We don’t expect you to know everything—but we do expect mutual respect and curiosity.',
        },
        {
          title: 'Contractor Relationship Matters',
          body: 'We value builders who care about quality, communication, and collaboration. We don’t chase the lowest bid—we chase the best fit.',
        },
        {
          title: 'People-First Hiring',
          body: 'We hire for care, clarity, and craft. Our team is small but mighty—and we choose people who are generous thinkers and collaborative doers.',
        },
        {
          title: 'Consultants & Collaborators',
          body: 'Whether it’s engineers, surveyors, or sustainability experts, we bring in specialists who align with our ethos and raise the bar—not just check a box.',
        },
        {
          title: 'Process > Ego',
          body: 'Great work happens when the process is respected and shared. We’re not here to play design genius—we’re here to build things that last.',
        },
      ],
      images: [
        'https://cdn.sanity.io/images/xi1ruvdt/production/9e7502b84df5d06490612e687b69d7f369d7aec7-6000x3752.jpg',
        'https://cdn.sanity.io/images/xi1ruvdt/production/10c8984793556afdedc4fbdf0677c149368862c1-4000x2250.jpg',
      ],
    },
  ],
  whatWeDo: {
    title: 'What We Do',
    icon: 'https://cdn.sanity.io/images/xi1ruvdt/production/cf0a2a952429e843d70e2de7a1fef98abbc8aa83-32x32.svg',
    items: [
      {
        title: 'We do have a point of view',
        description:
          'We’re not just facilitators—we’re designers with world-class training and a clear perspective on what makes a home great. You’re hiring us for that.',
      },
      {
        title: 'We do let the standard evolve',
        description:
          'Our designs start from a proven framework, but the land, local context, and how you live transform it into something unmistakably yours.',
      },
      {
        title: 'We do keep the process out in the open',
        description:
          'From timelines to billing, we keep everything transparent. If you ever have to ask “what’s next?” or “where did the time go?”—we’ve missed the mark.',
      },
    ],
  },
  whatWeDontDo: {
    title: "What We Don't Do",
    icon: 'https://cdn.sanity.io/images/xi1ruvdt/production/5c5b4f295e94a44781cbabd4365cf7e429a535b8-32x32.svg',
    items: [
      {
        title: "We don't sell standalone plans",
        description:
          'A set of drawings might look nice, but it won’t get you meaningfully closer to a finished house. We focus on the whole path—from feasibility to keys in hand.',
      },
      {
        title: "We don't do paper architecture",
        description:
          'We only take on projects with a real path to getting built. That means we care just as much about financing, permitting, and feasibility as we do about design.',
      },
      {
        title: 'We don\'t accept "that\'s just what it costs here"',
        description:
          'High-cost markets aren’t an excuse—they’re a design and strategy problem. We dig in to make smart, beautiful projects pencil anyway.',
      },
    ],
  },
};

export const SERVICES_DATA: ServicesPageData = {
  hero: {
    label: 'Services',
    titlePrefix: 'Your home design and development ',
    titleHighlight: 'sherpas',
    illustration:
      'https://cdn.sanity.io/images/xi1ruvdt/production/bf92f4ab9399fbb6b3e6b0c4f8dd234978ed6960-120x120.svg',
    ctaText: 'Create Your Home',
    ctaLink: '/get-started',
  },
  leadStatement:
    'Designing and developing a new home is hard. We make it fun. You want a place that reflects your sensibilities, your lifestyle, and respects your budget. You also don’t want to spend endless hours reviewing details and pouring over material catalogs. We’ve worked to streamline the process with a focus on making it fun. Oh, and creating something beautiful. Really, really beautiful.',
  phases: [
    {
      id: 'phase-01',
      phaseLabel: 'Phase 01',
      title: 'Land Sourcing',
      description:
        'If you don’t have a parcel already, we recommend starting with our parcel discovery tools. If you’re looking for a higher-touch land sourcing effort, we’re here to help you find, evaluate and secure the perfect lot.',
      mediaType: 'video',
      mediaUrl:
        'https://cdn.sanity.io/files/xi1ruvdt/production/5d08f171d10d8b17c1e30aa47acb3d0b2f3bb524.mp4',
      arrowVariant: 'wide',
      rows: [
        {
          headline: 'Concierge Land Sourcing',
          summary:
            'Our LAND team will source the best available parcels within a target area and price range, with favorable build possibilities and beautiful natural features.',
          deliverables: [
            'Initial discovery with client to understand goals.',
            'Detailed report on each presented parcel.',
            'Comparative report with recommendations.',
          ],
        },
        {
          headline: 'Land Consultation',
          summary:
            'Leverage our LAND team’s experience to offer in-depth guidance on your short list of lots, including: feasibility, best use, pre-construction costs and more.',
          deliverables: [
            'Full parcel review for up to 3 listings',
            'Comprehensive evaluative report on each listing',
            'Clear guidance on our preferred listings',
          ],
        },
      ],
    },
    {
      id: 'phase-02',
      phaseLabel: 'Phase 02',
      title: 'Pre-Construction Coordination',
      description:
        'Before we can facilitate the design and build of your home, we have to understand what’s possible on your lot and lay the track for a successful development. These are necessary and critical steps for any new construction project.',
      mediaType: 'video',
      mediaUrl:
        'https://cdn.sanity.io/files/xi1ruvdt/production/4885ddb2848c44bf6cbc4b6dbb8413819d45877b.mp4',
      arrowVariant: 'loop',
      rows: [
        {
          headline: 'Code Review & Site Requirements',
          summary:
            'We will conduct a local code and zoning review of your lot and identify all specific site requirements.',
          deliverables: [
            'Comprehensive permitting and zoning review',
            'Usage study, with site visit as required',
            'Definition of all town permit requirements',
          ],
        },
        {
          headline: 'Site Planning',
          summary:
            'Preparation of a masterplan that documents site conditions (e.g. sun path, views, wind conditions), circulation / driveway, utilities locations, home placement, and more.',
          deliverables: [
            'Fully developed site plan',
            'On site visits, as required and as available',
            'Documentation for groundwork vendors',
          ],
        },
        {
          headline: 'Preliminary Pro Forma',
          summary:
            'We will develop a pro forma to assess the development project’s financial viability, calculating likely capital expenditures, ongoing costs, and revenue potential.',
          deliverables: [
            'Definition of potential development uses',
            'Estimates for construction and management expenses',
            'Estimates for revenue based on defined use',
          ],
        },
        {
          headline: 'Groundwork Coordination',
          summary:
            'We will source, solicit bids from and assemble the required groundwork vendors, including surveyor, excavator, ground clearing, land engineers, septic engineers and well vendors.',
          deliverables: [
            'Manage bid process and team assembly',
            'Secure permits for required work',
            "On the ground owner's representation, where relevant.",
          ],
        },
      ],
    },
    {
      id: 'phase-03',
      phaseLabel: 'Phase 03',
      title: 'Design',
      description:
        'The TIE design team and our trusted professional partners have years of experience in modern home design, with a people-focused approach, clean details, appropriate-scale, and a focus on sustainability and integration with nature.',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/f43eeb4f1997f09a3cac13cc37de7b9079e0f90a-1152x768.png',
      arrowVariant: 'wide',
      rows: [
        {
          headline: 'Standard Plan Purchase',
          summary:
            'Purchase a single-use license for one of our Standards plans. Utilize as-is or modify with our design team.',
          deliverables: [
            'Architect-designed, builder-vetted documentation',
            'Full interior finish specifications',
            'Full systems specifications',
          ],
        },
        {
          headline: 'Modification & Visualization',
          summary:
            'Work with our design team to make moderate modifications to the design scheme and documents.',
          deliverables: [
            'Design revisions based on personal goals',
            '3D model walk-through & visualizations',
            'Updated and personalized documentation',
          ],
        },
        {
          headline: 'Interior Finish & Fixture Selections',
          summary:
            'Utilize our base-level selections as a starting point, and work with our team to personalize from there.',
          deliverables: [
            'Interior Design lookbook',
            'Finish and Fixture specifications',
            'Purchasing and procurement coordination',
          ],
        },
        {
          headline: 'Custom Design',
          summary:
            'Have a unique home concept? Our Studio team - in coordination with local design professional partners - can develop your custom concept for a main home or outbuilding.',
          deliverables: [
            'Design concept and schematic design',
            'Design development and visualization',
            'Assembly of required professional resources',
          ],
        },
      ],
    },
    {
      id: 'phase-04',
      phaseLabel: 'Phase 04',
      title: 'Permitting & Entitlement',
      description:
        'Each town planning office has its own process and peculiarities. We will coordinate the creation of required materials and navigate the process to get your project permitted and your parcel entitled.',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/d585d1cf9adaca594d00f7c14a040e3d7f6c293b-1440x960.png',
      arrowVariant: 'loop',
      rows: [
        {
          headline: 'Permit Drawings & Documents',
          summary:
            'Preparation of a comprehensive, town- and site-specific set of permit drawings and reports.',
          deliverables: [
            'Coordination of stamped, sealed and certified permit documentation by local design professional',
            'ResCheck and required environmental studies',
            'Coordination engineer and AOR, as required by state or municipality',
          ],
        },
        {
          headline: 'Town Planning Submission',
          summary:
            'Preparation of permit applications and coordination with the planning office on feedback and revisions.',
          deliverables: [
            'Operate as owner’s representative',
            'Present to planning board, as required',
            'Coordinate permit issuance to contractor',
          ],
        },
      ],
    },
    {
      id: 'phase-05',
      phaseLabel: 'Phase 05',
      title: 'Construction Coordination',
      description:
        'From required drawing sets to assembling a vetted build team, TIE will put together the pieces to turn your home’s design concept into a built reality.',
      mediaType: 'image',
      mediaUrl:
        'https://cdn.sanity.io/images/xi1ruvdt/production/7e4283ce9c53c606971c1213b33e856e5825e651-3200x2133.jpg',
      arrowVariant: null,
      rows: [
        {
          headline: 'Construction Documentation',
          summary:
            'Coordination of comprehensive bid, pricing and construction documentation for use by contractor, sub-contractors and your lender.',
          deliverables: [
            'Comprehensive bid and pricing set',
            'Comprehensive construction documentation',
            'Coordination between local engineers, design professionals, and drafting team.',
          ],
        },
        {
          headline: 'Contractor Sourcing',
          summary:
            'Soliciting bids from our contractor network and beyond, evaluating pricing and working to value engineer the project to fit your budget.',
          deliverables: [
            'Source at least 3 qualified GCs in your area',
            'Field GC questions and feedback',
            'Recommend build partner based on bid info',
          ],
        },
        {
          headline: "Owner's Representation",
          summary:
            'Throughout construction, TIE can help ensure proper delivery and design quality control as your on-site representative.',
          deliverables: [
            'Frequent remote check-ins with GC',
            'On-site reviews at key milestones',
          ],
        },
      ],
    },
  ],
};

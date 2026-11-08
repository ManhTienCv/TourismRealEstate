import { PillArrowButton } from '../common/PillArrowButton';
import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_STANDARD_PLANS, HousingSolutionSlug } from '@tie/shared';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ZoningFinancialSection } from '../home/ZoningFinancialSection';

interface SolutionContent {
  slug: string;
  categoryTag: string;
  headlineLine1: string;
  headlineLine2: string;
  buttonLabel: string;
  storyQuote: string;
  storyIntro: string;
  pillars: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  recommendedPlanSlugs: string[];
  illustration: React.ReactNode;
}

const SOLUTION_DETAILS: Record<string, SolutionContent> = {
  'starter-home': {
    slug: 'starter-home',
    categoryTag: 'Starter Home',
    headlineLine1: 'Start small.',
    headlineLine2: 'Think long.',
    buttonLabel: 'Create my Starter Home',
    storyQuote:
      "We get it. You're tired of renting, but the leap to buying feels overwhelming — especially when every 'affordable' home on the market needs work, feels cramped, or looks like someone else's dream from 1993.",
    storyIntro:
      'A Starter Home shouldn’t be a compromise. It should be a launchpad. Built with offsite modular precision, our starter collection offers architect-grade design at predictable fixed costs, engineered to grow as your life unfolds.',
    pillars: [
      {
        number: '01',
        title: 'Equity Over Maintenance',
        description:
          'Skip 40-year-old leaky plumbing and mystery wiring. Every TIE Starter Home features factory-sealed thermal envelopes, triple-pane glass, and high-efficiency heat pumps with 10-year structural warranties.',
      },
      {
        number: '02',
        title: 'Designed to Expand',
        description:
          'Start with a lean, functional 1- or 2-bedroom modular bar. Pre-engineered structural connection points allow you to seamlessly add a guest wing, studio, or covered breezeway whenever you are ready.',
      },
      {
        number: '03',
        title: 'Guaranteed Cost Clarity',
        description:
          'No open-ended contractor surprises. Our modular manufacturing delivers fixed-price fabrication and transparent turnkey site coordination so your bank and balance sheet stay aligned.',
      },
    ],
    recommendedPlanSlugs: ['small-bar', 'medium-bar', 'small-l'],
    illustration: (
      <svg className="w-full max-w-[462px] h-auto text-[#4D6D3A] stroke-current fill-none stroke-[1.4]" viewBox="0 0 160 160">
        {/* House being watered */}
        <polygon points="105 125, 120 108, 135 125" fill="#E8F0DC" />
        <rect x="110" y="125" width="20" height="15" fill="#FFFFFF" />
        <rect x="115" y="132" width="6" height="8" fill="#4D6D3A" />
        <rect x="123" y="127" width="5" height="5" />
        {/* Flower sprouting from chimney/roof */}
        <path d="M 120 108 Q 122 96, 126 90" strokeWidth="1.6" />
        <circle cx="126" cy="88" r="3.5" fill="#D2E2B0" />
        <path d="M 126 84 L 126 92 M 122 88 L 130 88" strokeWidth="1.2" />
        {/* Water droplets */}
        <line x1="98" y1="108" x2="105" y2="116" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
        <line x1="95" y1="112" x2="102" y2="120" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
        <line x1="92" y1="116" x2="99" y2="124" strokeDasharray="1.5 2.5" strokeWidth="1.2" />
        {/* Watering Can */}
        <path d="M 82 108 L 94 104 L 98 108 L 86 112 Z" fill="#E8F0DC" />
        <path d="M 80 102 Q 86 94, 88 104" strokeWidth="1.2" />
        <path d="M 94 104 L 99 107" />
        {/* Kneeling Character */}
        <circle cx="68" cy="68" r="9" />
        <path d="M 72 68 Q 76 69, 74 72" />
        <path d="M 69 74 Q 72 76, 74 74" />
        <circle cx="71" cy="67" r="1" fill="currentColor" />
        <path d="M 64 62 Q 68 58, 72 61" strokeWidth="1.2" />
        {/* Shirt */}
        <path d="M 64 77 Q 56 86, 54 102 L 78 102 Q 76 86, 68 77" fill="#FFFFFF" />
        <line x1="56" y1="84" x2="74" y2="84" strokeWidth="1" />
        <line x1="55" y1="90" x2="76" y2="90" strokeWidth="1" />
        <line x1="54" y1="96" x2="77" y2="96" strokeWidth="1" />
        {/* Arms */}
        <path d="M 72 82 Q 78 92, 82 106" strokeWidth="1.5" />
        <path d="M 66 84 Q 74 96, 80 108" strokeWidth="1.2" />
        {/* Kneeling legs */}
        <path d="M 54 102 Q 48 114, 52 126 Q 60 132, 70 130" strokeWidth="1.5" />
        <path d="M 70 102 Q 68 116, 76 128 Q 84 132, 90 128" strokeWidth="1.5" />
        <ellipse cx="72" cy="132" rx="7" ry="3" fill="#4D6D3A" />
        <ellipse cx="90" cy="130" rx="6" ry="3" fill="#4D6D3A" />
        <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    ),
  },

  'forever-home': {
    slug: 'forever-home',
    categoryTag: 'Forever Home',
    headlineLine1: 'Build the last house',
    headlineLine2: "you'll ever need.",
    buttonLabel: 'Create my Forever Home',
    storyQuote:
      'A deeply personal, multi-functional home built to last — and to host every future holiday photo, milestone celebration, and quiet Sunday morning.',
    storyIntro:
      'We believe longevity is rooted in intelligent geometry and authentic materials. Our Forever Home collection is designed for generational permanence: spacious vaulted gathering pavilions coupled with serene acoustic bedroom wings.',
    pillars: [
      {
        number: '01',
        title: 'Generous Communal Volume',
        description:
          'Soaring 14ft cathedral ceilings, exposed glue-laminated ridge beams, and soapstone hearths anchor open-concept living that effortlessly welcomes large family gatherings.',
      },
      {
        number: '02',
        title: 'Acoustic & Spatial Privacy',
        description:
          'Winged layouts buffer the primary retreat from energetic living areas and children’s suites, creating dedicated quiet zones for remote work and deep relaxation.',
      },
      {
        number: '03',
        title: 'Built for 50+ Years',
        description:
          'Standing-seam architectural zinc, thermally modified pine that patinas to silver driftwood, and zero-threshold single-level access for lifelong comfort and aging-in-place.',
      },
    ],
    recommendedPlanSlugs: ['big-bar', 'big-l', 'dogtrot'],
    illustration: (
      <svg className="w-full max-w-[462px] h-auto text-[#4D6D3A] stroke-current fill-none stroke-[1.4]" viewBox="0 0 160 160">
        {/* Background Country Houses on hill */}
        <path d="M 80 85 Q 115 75, 145 88" strokeDasharray="2 2" strokeWidth="1" />
        <polygon points="110 75, 120 66, 130 75" fill="#E8F0DC" />
        <rect x="113" y="75" width="14" height="10" fill="#FFFFFF" />
        <polygon points="132 78, 138 72, 144 78" fill="#E8F0DC" />
        <rect x="134" y="78" width="8" height="8" fill="#FFFFFF" />
        <circle cx="106" cy="74" r="4" strokeDasharray="1.5 1.5" fill="#D2E2B0" />
        <circle cx="147" cy="76" r="3" strokeDasharray="1.5 1.5" fill="#D2E2B0" />
        {/* Father (Center) */}
        <circle cx="72" cy="72" r="9" />
        <circle cx="70" cy="71" r="2.5" />
        <circle cx="76" cy="71" r="2.5" />
        <path d="M 62 82 Q 72 79, 82 82 L 84 116 L 60 116 Z" fill="#E8F0DC" />
        {/* Child on shoulders */}
        <circle cx="72" cy="48" r="6" />
        <path d="M 72 44 Q 76 42, 78 45" />
        <path d="M 68 54 Q 72 52, 76 54 L 78 68 L 66 68 Z" />
        <circle cx="64" cy="47" r="1.5" />
        {/* Mother (Right) */}
        <circle cx="92" cy="74" r="8" />
        <path d="M 88 66 C 88 62, 100 62, 98 70" />
        <path d="M 84 82 Q 92 80, 100 84 L 98 122 L 84 122 Z" fill="#FFFFFF" />
        {/* Son in front */}
        <circle cx="102" cy="98" r="6" />
        <path d="M 96 104 Q 102 102, 108 104 L 106 130 L 96 130 Z" fill="#E8F0DC" />
        <path d="M 45 138 Q 90 134, 135 138" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    ),
  },

  'second-home': {
    slug: 'second-home',
    categoryTag: 'Second Home',
    headlineLine1: 'A quiet retreat that',
    headlineLine2: 'recharges your soul.',
    buttonLabel: 'Create my Second Home',
    storyQuote:
      'A getaway designed around relaxation, low maintenance, and easy weekend turnarounds — so you spend time living in the landscape, not fixing chores.',
    storyIntro:
      'Whether perched above Catskills streams or sheltered in Sonoma oak groves, our second-home architecture emphasizes indoor-outdoor living, passive climate comfort, and smart lock-and-leave technology.',
    pillars: [
      {
        number: '01',
        title: 'Lock & Leave Simplicity',
        description:
          'Smart remote thermostats, automated freeze-protection valves, and durable materials keep your retreat safe and ready whenever Friday afternoon arrives.',
      },
      {
        number: '02',
        title: 'Nature-Centric Sightlines',
        description:
          'Generous sliding glass assemblies open up entire rooms to wraparound covered verandas, soaking tubs, and outdoor cedar showers.',
      },
      {
        number: '03',
        title: 'High Rental Yield Potential',
        description:
          'When you are not there, our modular layouts and high-demand architectural design command premium occupancy on luxury hospitality platforms.',
      },
    ],
    recommendedPlanSlugs: ['dogtrot', 'small-l', 'medium-bar'],
    illustration: (
      <svg className="w-full max-w-[462px] h-auto text-[#4D6D3A] stroke-current fill-none stroke-[1.4]" viewBox="0 0 160 160">
        <circle cx="50" cy="45" r="5" fill="#D2E2B0" />
        <line x1="50" y1="36" x2="50" y2="33" />
        <line x1="50" y1="54" x2="50" y2="57" />
        <polygon points="40 76, 50 68, 60 76" fill="#E8F0DC" />
        <rect x="43" y="76" width="14" height="10" fill="#FFFFFF" />
        <line x1="68" y1="126" x2="135" y2="108" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="95" r="7" />
        <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    ),
  },

  'adu': {
    slug: 'adu',
    categoryTag: 'ADU',
    headlineLine1: 'Make your land',
    headlineLine2: 'work harder for you.',
    buttonLabel: 'Create my ADU',
    storyQuote:
      'A versatile detached addition that works as a high-yield rental, guest suite, or private creative workspace — increasing your property value exponentially.',
    storyIntro:
      'With state-wide accessory dwelling pre-approvals and zero-disruption crane placement, adding a high-design TIE ADU to your backyard takes weeks instead of years.',
    pillars: [
      {
        number: '01',
        title: 'Immediate Rental Income',
        description:
          'Compact footprints under 500–800 sqft generate consistent cash flow as executive mid-term rentals or Airbnb retreats.',
      },
      {
        number: '02',
        title: 'Rapid Crane Installation',
        description:
          'Fully finished inside and out at our factory, the ADU is hoisted over your trees and onto helical piers in just hours.',
      },
      {
        number: '03',
        title: 'Independent Utilities',
        description:
          'Pre-engineered for separate electrical subpanels, submetering, and independent mini-split HVAC zones.',
      },
    ],
    recommendedPlanSlugs: ['adu', 'small-bar'],
    illustration: (
      <svg className="w-full max-w-[462px] h-auto text-[#4D6D3A] stroke-current fill-none stroke-[1.4]" viewBox="0 0 160 160">
        <polygon points="60 60, 80 44, 100 60" fill="#E8F0DC" />
        <rect x="65" y="60" width="30" height="24" fill="#FFFFFF" />
        <rect x="75" y="70" width="10" height="14" fill="#4D6D3A" />
        <circle cx="118" cy="70" r="12" fill="#D2E2B0" strokeDasharray="2 2" />
        <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    ),
  },

  'hybrid-home': {
    slug: 'hybrid-home',
    categoryTag: 'Hybrid Home',
    headlineLine1: 'Enjoy personally.',
    headlineLine2: 'Rent when away.',
    buttonLabel: 'Create my Hybrid Home',
    storyQuote:
      'A flexible sanctuary engineered with dedicated lock-off owner closets, resilient finishes, and hospitality-ready amenities.',
    storyIntro:
      'Blend private family enjoyment with top-tier short-term rental performance. Our Hybrid layouts feature separate entryways, private utility zones, and acoustic buffering.',
    pillars: [
      {
        number: '01',
        title: 'Integrated Owner Lock-Offs',
        description:
          'Dedicated master closets and storage wings stay locked to guests, making Friday arrivals effortless.',
      },
      {
        number: '02',
        title: 'Hospitality Durability',
        description:
          'Polished radiant concrete floors, quartzite solid surfaces, and commercial hardware that resist guest wear.',
      },
      {
        number: '03',
        title: 'Pro-Forma Cash Flow',
        description:
          'Designed to offset 100% of mortgage, insurance, and land holding costs within 18–24 months of operation.',
      },
    ],
    recommendedPlanSlugs: ['medium-bar', 'dogtrot', 'small-l'],
    illustration: (
      <svg className="w-full max-w-[462px] h-auto text-[#4D6D3A] stroke-current fill-none stroke-[1.4]" viewBox="0 0 160 160">
        <polygon points="50 70, 75 50, 100 70" fill="#E8F0DC" />
        <rect x="55" y="70" width="40" height="25" fill="#FFFFFF" />
        <path d="M 40 136 Q 140 136, 145 136" strokeDasharray="3 3" strokeWidth="1" />
      </svg>
    ),
  },
};

export const SolutionDetailView: React.FC = () => {
  const {
    selectedSolutionSlug,
    closeSolutionDetail,
    openConfigurator,
    openPlanDetail,
  } = useConfiguratorStore();

  if (!selectedSolutionSlug) return null;

  // Fallback to starter-home if unknown slug
  const content = SOLUTION_DETAILS[selectedSolutionSlug] || SOLUTION_DETAILS['starter-home'];

  // Resolve compatible plans
  const compatiblePlans = SEED_STANDARD_PLANS.filter((plan) =>
    content.recommendedPlanSlugs.includes(plan.slug)
  );

  return (
    <div className="w-full min-h-screen bg-[#FAF8F1] text-tie-ink pt-24 pb-28">
      
      {/* 1. Top Breadcrumb & Back Navigation */}
      <div className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 pt-4 pb-8">
        <button
          onClick={closeSolutionDetail}
          className="inline-flex items-center space-x-2 text-sm font-sans font-medium text-tie-muted hover:text-tie-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* 2. Hero Section matching Banghi1.mp4 178s & 280s */}
      <section className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Category Eyebrow + Serif Headline + CTA */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Category Eyebrow */}
            <div className="inline-block text-[#567D42] text-sm sm:text-base font-sans font-semibold tracking-wider uppercase">
              {content.categoryTag}
            </div>

            {/* Giant Signature Serif Title with Hand-drawn Underline */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[82px] font-normal tracking-tight text-tie-ink leading-[1.05]">
                {content.headlineLine1}
                <br />
                <span className="relative inline-block">
                  {content.headlineLine2}
                  {/* Hand-drawn Green SVG Underline */}
                  <svg
                    className="absolute -bottom-3 left-0 w-full h-4 text-[#567D42]"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 2 8 C 50 1, 150 14, 198 6"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Sub-quote */}
            <p className="text-lg sm:text-xl text-[#4A4742] font-sans leading-relaxed max-w-xl">
              {content.storyQuote}
            </p>

            {/* Reusable Unified Pill Arrow Button */}
            <div className="pt-4">
              <PillArrowButton
                label={content.buttonLabel}
                onClick={() => openConfigurator(undefined, content.slug as HousingSolutionSlug)}
                variant="dark"
              />
            </div>

          </div>

          {/* Right Column: Giant Hand-drawn Monoline Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[440px] aspect-square rounded-[36px] bg-[#FAF8F1] border border-[#E8E4DC] p-8 flex items-center justify-center shadow-xs">
              {content.illustration}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Editorial Storytelling Section (3 Pillars of Value) */}
      <section className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 py-20 border-t border-[#E8E4DC]">
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-tie-ink tracking-tight">
            Designed for real land. Built for the long haul.
          </h2>
          <p className="text-base sm:text-lg text-tie-muted font-sans leading-relaxed">
            {content.storyIntro}
          </p>
        </div>

        {/* 3-Column Architectural Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {content.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 rounded-3xl bg-[#FAF8F1] border border-[#E8E4DC] space-y-4 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="font-serif text-3xl sm:text-4xl text-[#567D42] font-semibold">
                {pillar.number}
              </div>
              <h3 className="font-serif text-2xl font-normal text-tie-ink">
                {pillar.title}
              </h3>
              <p className="text-sm text-tie-muted font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Curated Standards Section (Recommended Plans) */}
      <section className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 py-20 border-t border-[#E8E4DC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[#567D42] text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase mb-2">
              The Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-tie-ink tracking-tight">
              Recommended Standards for {content.categoryTag}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-tie-muted font-sans max-w-md">
            Our modular base designs can be adapted to your unique topography, solar path, and lifestyle.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {compatiblePlans.map((plan) => (
            <div
              key={plan.id}
              className="group rounded-3xl bg-[#FAF8F1] border border-[#E8E4DC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Plan Thumbnail Rendering */}
              <div
                onClick={() => openPlanDetail(plan)}
                className="relative aspect-[4/3] w-full bg-[#F3EFEA] overflow-hidden cursor-pointer"
              >
                <img
                  src={plan.axon3dImageUrl || plan.exteriorImageUrl}
                  alt={plan.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-medium text-tie-ink shadow-xs">
                  {plan.code}
                </div>
              </div>

              {/* Plan Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => openPlanDetail(plan)}
                    className="font-serif text-2xl font-normal text-tie-ink cursor-pointer hover:text-[#567D42] transition-colors"
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs text-tie-muted font-sans line-clamp-2">
                    {plan.tagline}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E8E4DC] text-center text-xs font-mono text-tie-muted">
                  <div>
                    <span className="block font-semibold text-tie-ink text-sm">
                      {plan.bedrooms} Bed
                    </span>
                    <span>{plan.bathrooms} Bath</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-tie-ink text-sm">
                      {plan.sqft}
                    </span>
                    <span>Sq.Ft.</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-[#567D42] text-sm">
                      {plan.baseTimelineWeeks} Wks
                    </span>
                    <span>Assembly</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center space-x-2">
                  <button
                    onClick={() => openPlanDetail(plan)}
                    className="flex-1 py-2.5 px-4 rounded-full border border-[#183D24]/30 hover:border-[#183D24] text-[#183D24] text-xs font-medium font-sans transition-all text-center"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => openConfigurator(plan.slug, content.slug as HousingSolutionSlug)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#183D24] hover:bg-[#122A1A] text-white text-xs font-medium font-sans transition-all text-center flex items-center justify-center space-x-1"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Zoning Feasibility & Financial Conditions (Prompt 2.3) */}
      <ZoningFinancialSection />

      {/* 6. Bottom Call to Action Banner */}
      <section className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 pt-20">
        <div className="rounded-[40px] bg-[#183D24] text-white p-10 sm:p-16 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-block text-[#D2E2B0] text-xs font-mono uppercase tracking-widest">
              Ready to Begin
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              Start building your {content.categoryTag} today.
            </h2>
            <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
              Explore your parcel feasibility, customize materials, and receive a comprehensive construction pro-forma in under 3 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <PillArrowButton
              label="Launch Build Estimator"
              onClick={() => openConfigurator(undefined, content.slug as HousingSolutionSlug)}
              variant="light"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

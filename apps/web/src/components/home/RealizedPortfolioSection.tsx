import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';

// Featured Realized Projects matching exact video Banghi1.mp4 (90s - 130s), Banghi1.1.mp4, and Screenshots (Ảnh 2 & Ảnh 3)
const FEATURED_REALIZED_PROJECTS = [
  {
    id: 'blueberry-hill-adu',
    slug: 'berkshires-adu-studio',
    title: 'Blueberry\nHill ADU',
    exteriorImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
    pills: ['ADU', 'Studio', '1 Bath', '<500 Sqft', 'ADU'],
  },
  {
    id: 'break-house',
    slug: 'break-house',
    title: 'Break House',
    exteriorImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    pills: ['Big Bar', '3 Bed', '2 Bath', '1,000–1,500 Sqft', 'Hybrid Home'],
  },
  {
    id: 'arrowhead-ridge',
    slug: 'arrowhead-ridge',
    title: 'Arrowhead Ridge',
    exteriorImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    pills: ['Big L', '2 Bed', '2.5 Bath', '2,000–3,000 Sqft', 'Forever Home', 'ADU'],
  },
  {
    id: 'catskills-dogtrot',
    slug: 'catskills-dogtrot-retreat',
    title: 'The Overlook\nDogtrot',
    exteriorImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
    pills: ['Dogtrot', '2 Bed', '2 Bath', '1,500–2,000 Sqft', 'Second Home'],
  },
];

export const RealizedPortfolioSection: React.FC = () => {
  const { openProjectDetail } = useConfiguratorStore();

  return (
    <section id="portfolio-section" className="relative w-full bg-[#FAF8F5] overflow-hidden">
      
      {/* 1. Intro Editorial Header on Cream Background */}
      <div className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hand-drawn Green Wavy SVG Connector Line */}
        <div className="flex justify-center -mt-6 mb-6">
          <svg
            className="w-16 h-20 text-[#567D42]/60"
            viewBox="0 0 80 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          >
            <path d="M 40 0 C 60 40, 20 60, 40 100" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-tie-ink">
          And we can build it for you on your land.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-tie-muted font-sans max-w-2xl mx-auto">
          From Catskills ledge outcrops to Hudson Valley heirloom orchards and Sonoma hillsides.
        </p>
      </div>

      {/* 2. 100% Full-bleed Edge-to-Edge Continuous Scroll Stack (Matching exact Image 2 & 3 from Banghi1.1.mp4) */}
      <div className="w-full">
        {FEATURED_REALIZED_PROJECTS.map((project, idx) => {
          // In Huts.com (as verified in Banghi1.1.mp4 & Image 3):
          // Slide 0: interior card anchored to the bottom edge (bottom-0) with top rounded corners (rounded-t-[36px] rounded-b-none)
          // Slide 1: interior card anchored to the top edge (top-0) with bottom rounded corners (rounded-b-[36px] rounded-t-none)
          // Both cards share identical width, right position, and aspect ratio.
          // When scrolling from Slide 0 to Slide 1, the two interior images meet seamlessly at the seam with NO gap and NO white border!
          const isBottomAnchored = idx % 2 === 0;

          return (
            <div
              key={project.id}
              onClick={() => openProjectDetail(project.slug)}
              className="group relative w-full h-[85vh] sm:h-[90vh] lg:h-screen min-h-[640px] lg:min-h-0 flex items-center cursor-pointer overflow-hidden select-none"
            >
              {/* Full-bleed Exterior Photography Background (0 margins, 100% viewport width) */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={project.exteriorImage}
                  alt={project.title.replace('\n', ' ')}
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-[1.015] transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
                {/* Subtle Dark Vignette & Gradient for High Contrast Typography */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Foreground Content: Split Two-Column Layout (Matching Banghi1.1.mp4) */}
              <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between pointer-events-none">
                
                {/* Left Column: Project Title & Dark Translucent Pills */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 pt-6 lg:pt-0 pointer-events-auto">
                  <h3 className="font-serif text-5xl sm:text-7xl lg:text-[84px] font-normal leading-[1.04] tracking-tight text-white drop-shadow-xl whitespace-pre-line">
                    {project.title}
                  </h3>

                  {/* Translucent Dark Rounded Pills */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {project.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="bg-black/45 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-[13px] font-sans px-4 py-1.5 rounded-full shadow-md select-none"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Floating Rounded Interior Card */}
                {/* Positioned flush to the boundary (bottom-0 for even index, top-0 for odd index on lg+ screens) */}
                <div
                  className={`w-full lg:w-auto flex justify-center lg:justify-end pointer-events-auto ${
                    isBottomAnchored
                      ? 'lg:absolute lg:right-16 xl:right-24 lg:bottom-0'
                      : 'lg:absolute lg:right-16 xl:right-24 lg:top-0'
                  }`}
                >
                  <div
                    className={`w-full sm:w-[480px] md:w-[540px] lg:w-[600px] xl:w-[660px] aspect-[4/3] overflow-hidden shadow-2xl bg-[#1E2620] relative transform group-hover:scale-[1.015] transition-transform duration-700 ease-out ${
                      isBottomAnchored
                        ? 'rounded-[24px] sm:rounded-[32px] lg:rounded-t-[36px] lg:rounded-b-none'
                        : 'rounded-[24px] sm:rounded-[32px] lg:rounded-b-[36px] lg:rounded-t-none'
                    }`}
                  >
                    <img
                      src={project.interiorImage}
                      alt={`${project.title.replace('\n', ' ')} interior`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Outro CTA: "See More Projects" */}
      <div className="py-20 bg-[#FAF8F5] flex items-center justify-center space-x-3">
        <button
          onClick={() => {
            const el = document.getElementById('portfolio-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-full text-sm font-sans font-medium text-[#1A2E20] bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#F3EFEA] transition-all duration-200 shadow-sm"
        >
          See More Projects
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('portfolio-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#F3EFEA] flex items-center justify-center text-[#1A2E20] transition-all duration-200 group shadow-sm"
          title="See More Projects"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </section>
  );
};

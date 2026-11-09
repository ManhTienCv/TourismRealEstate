import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { PillArrowButton } from '../common/PillArrowButton';

// Featured Realized Projects matching exact Huts.com portfolio specification (3 curated projects)
const FEATURED_REALIZED_PROJECTS = [
  {
    id: 'break-house',
    slug: 'break-house',
    title: 'Break House',
    exteriorImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    pills: ['Big Bar', '3 Bed', '2 Bath', '1,000–1,500 Sqft', 'Hybrid Home'],
  },
  {
    id: 'mountain-view-meadow',
    slug: 'arrowhead-ridge',
    title: 'Mountain\nView Meadow',
    exteriorImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    pills: ['Medium L', '2 Bed', '2 Bath', '1,200–1,600 Sqft', 'Second Home'],
  },
  {
    id: 'the-overlook-dogtrot',
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
    <section id="portfolio-section" className="relative w-full bg-[#FAF8F1]">
      
      {/* 1. Intro Editorial Header on Cream Background */}
      <div className="py-20 max-w-[1584px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

      {/* 2. Pure Sticky Deck Curtain Transitions (Exact HUTS behavior) */}
      {/* Each project card is sticky top-0 h-screen. The subsequent cards wipe over it from bottom to top. */}
      {/* When the last card finishes wiping in and the container ends, the entire card (background + title + pills + inset image) */}
      {/* scrolls up intact into the Outro CTA ("See More Projects") without any bottom cutoff or coordinate jump! */}
      <div className="relative w-full">
        {FEATURED_REALIZED_PROJECTS.map((project, index) => {
          return (
            <div
              key={project.id}
              onClick={() => openProjectDetail(project.slug)}
              className="sticky top-0 w-full h-screen h-[100dvh] select-none cursor-pointer overflow-hidden shadow-2xl"
              style={{
                zIndex: index + 10,
              }}
            >
              {/* Background Layer: Full-bleed exterior photography */}
              <img
                src={project.exteriorImage}
                alt={project.title.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Inner Content Layer: Always anchored to card, perfectly centered at all screen sizes */}
              <div className="relative w-[82vw] max-w-[1260px] h-full mx-auto pointer-events-none flex items-center justify-between gap-8 z-10">
                
                {/* Left Column: Title & 1-line Glassmorphism Pill Tags */}
                <div className="w-[50%] lg:w-[560px] pointer-events-auto text-white">
                  <h3 className="font-serif text-[42px] sm:text-[48px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-tight whitespace-pre-line mb-6 drop-shadow-md font-normal">
                    {project.title}
                  </h3>
                  <div className="flex items-center flex-nowrap gap-2 whitespace-nowrap overflow-hidden">
                    {project.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1 text-[11px] md:text-xs rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white font-medium shrink-0 shadow-sm"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Inset Image with w-[46%] lg:w-[550px] xl:w-[580px] shrink-0, aspect-[16/10], rounded-[14px] */}
                <div className="w-[46%] lg:w-[550px] xl:w-[580px] shrink-0 pointer-events-auto">
                  <div className="w-full aspect-[16/10] rounded-[14px] overflow-hidden shadow-2xl bg-neutral-900 border border-white/10">
                    <img
                      src={project.interiorImage}
                      alt={`${project.title.replace('\n', ' ')} interior`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Outro CTA: Reusable Unified Pill Arrow Button (Relative z-20 so it flows directly below Project 3) */}
      <div className="relative z-20 pt-14 pb-10 bg-[#FAF8F1] flex items-center justify-center">
        <PillArrowButton
          label="See More Projects"
          onClick={() => smoothScrollTo('portfolio-section', { offset: -40, duration: 1.2 })}
          variant="dark"
        />
      </div>

    </section>
  );
};

export default RealizedPortfolioSection;

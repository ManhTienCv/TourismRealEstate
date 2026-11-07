import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { ArrowRight } from 'lucide-react';

// Featured Realized Projects matching exact Huts.com portfolio specification
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
    id: 'mountain-view-meadow',
    slug: 'arrowhead-ridge',
    title: 'Mountain View\nMeadow',
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
    <section id="portfolio-section" className="relative w-full bg-[#FAF8F5]">
      
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

      {/* 2. Clip-path Wipe Transition with Fixed Content Overlay (Sticky Curtain Reveal) */}
      <div className="relative w-full">
        {FEATURED_REALIZED_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            onClick={() => openProjectDetail(project.slug)}
            className="relative w-full h-screen overflow-hidden rounded-none select-none cursor-pointer group [clip-path:inset(0)]"
            style={{
              zIndex: index + 1,
              clipPath: 'inset(0)',
              WebkitClipPath: 'inset(0)',
            }}
          >
            {/* Background Layer: Full-bleed background image with subtle dark overlay */}
            <img
              src={project.exteriorImage}
              alt={project.title.replace('\n', ' ')}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Fixed Inner Content: Stays locked in exact same viewport position, sliced cleanly by clip-path */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-between max-w-7xl mx-auto px-8 md:px-16">
              
              {/* Left Column: Title & Glassmorphism Pill Tags */}
              <div className="w-5/12 pointer-events-auto text-white">
                <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight whitespace-pre-line mb-6 drop-shadow-md">
                  {project.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {project.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Compact Inset Image with Generous Breathing Room */}
              <div className="w-6/12 max-w-[520px] pointer-events-auto">
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 group-hover:scale-[1.01] transition-transform duration-500 ease-out">
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
        ))}
      </div>

      {/* 3. Outro CTA: "See More Projects" */}
      <div className="py-20 bg-[#FAF8F5] flex items-center justify-center space-x-3">
        <button
          onClick={() => smoothScrollTo('portfolio-section', { offset: -40, duration: 1.2 })}
          className="px-8 py-3.5 rounded-full text-sm font-sans font-medium text-[#1A2E20] bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#F3EFEA] transition-all duration-200 shadow-sm"
        >
          See More Projects
        </button>
        <button
          onClick={() => smoothScrollTo('portfolio-section', { offset: -40, duration: 1.2 })}
          className="w-12 h-12 rounded-full bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#F3EFEA] flex items-center justify-center text-[#1A2E20] transition-all duration-200 group shadow-sm"
          title="See More Projects"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </section>
  );
};

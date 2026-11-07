import React, { useRef } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Featured Realized Projects matching exact video Banghi1.1.mp4 and Stacking Cards Scroll specifications
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

interface StackingCardProps {
  project: (typeof FEATURED_REALIZED_PROJECTS)[0];
  index: number;
  total: number;
}

const StackingProjectCard: React.FC<StackingCardProps> = ({ project, index }) => {
  const { openProjectDetail } = useConfiguratorStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking for depth feel
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: Background exterior photo moves slightly slower than foreground content
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.03, 1.0]);

  return (
    <div
      ref={cardRef}
      style={{
        zIndex: index + 10,
        top: 0,
      }}
      onClick={() => openProjectDetail(project.slug)}
      className="sticky top-0 w-full h-screen min-h-[600px] overflow-hidden flex items-center select-none cursor-pointer group shadow-[0_-25px_50px_rgba(0,0,0,0.45)] bg-[#121A14]"
    >
      {/* 1. Full-bleed Parallax Exterior Photography */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          style={{ y: bgY, scale: bgScale }}
          src={project.exteriorImage}
          alt={project.title.replace('\n', ' ')}
          className="absolute inset-0 w-full h-[116%] -top-[8%] object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        {/* Subtle Dark Vignette & Gradient for High Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* 2. Foreground Content: Split Two-Column Layout */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Column: Project Title & Dark Translucent Pills */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 pt-6 lg:pt-0">
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
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="w-full sm:w-[480px] md:w-[540px] lg:w-[600px] xl:w-[660px] aspect-[4/3] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#1E2620] relative transform group-hover:scale-[1.015] transition-transform duration-700 ease-out">
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
};

export const RealizedPortfolioSection: React.FC = () => {
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

      {/* 2. Stacking Cards Scroll (Sticky Overlapping Sections with Parallax) */}
      <div className="relative w-full">
        {FEATURED_REALIZED_PROJECTS.map((project, idx) => (
          <StackingProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={FEATURED_REALIZED_PROJECTS.length}
          />
        ))}
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

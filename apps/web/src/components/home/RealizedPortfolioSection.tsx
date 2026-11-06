import React, { useState } from 'react';
import { SEED_PORTFOLIO_PROJECTS, PortfolioProject } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const RealizedPortfolioSection: React.FC = () => {
  const { openProjectDetail, openConfigurator } = useConfiguratorStore();

  return (
    <section id="portfolio-section" className="relative py-20 bg-tie-bg overflow-hidden border-b border-tie-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hand-drawn Green Wavy SVG Connector Line */}
        <div className="flex justify-center -mt-8 mb-8">
          <svg
            className="w-20 h-24 text-tie-pine/50"
            viewBox="0 0 80 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          >
            <path d="M 40 0 C 60 40, 20 60, 40 100" />
          </svg>
        </div>

        {/* Section Header (Signature Huts Headline) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
            And we can build it for you on your land.
          </h2>
          <p className="text-base text-tie-muted font-sans max-w-xl mx-auto">
            From Catskills ledge outcrops to Hudson Valley heirloom orchards and Sonoma hillsides.
          </p>
        </div>

        {/* Vertical Stack of Large, Immersive Photography (Matching Huts Image 1 & 2) */}
        <div className="space-y-10 sm:space-y-12">
          {SEED_PORTFOLIO_PROJECTS.slice(0, 3).map((project: PortfolioProject, idx: number) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => openProjectDetail(project.slug)}
                className="group relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[2.2/1] lg:aspect-[2.6/1] w-full border border-tie-border shadow-tie-card cursor-pointer bg-tie-surface"
              >
                {/* Full-width Architectural Image */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/85 via-tie-ink/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Overlay Floating Tags: Standard Used & Completed Year */}
                <div className="absolute top-5 left-5 flex items-center space-x-2">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-semibold text-tie-pine shadow-sm">
                    {project.standardPlanName}
                  </span>
                  <span className="bg-tie-ink/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-tie-bg hidden sm:inline">
                    COMPLETED {project.completedYear}
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between text-white gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="text-[11px] font-mono text-[#D2E2B0] uppercase tracking-wider block">
                      {project.housingSolutionTitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#D2E2B0] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs font-sans text-white/90 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D2E2B0]" />
                      <span>{project.location}</span>
                      <span className="text-white/40">&bull;</span>
                      <span>{project.sqft.toLocaleString()} SQFT</span>
                      <span className="text-white/40">&bull;</span>
                      <span>{project.durationMonths} MONTHS DELIVERED</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 font-mono text-xs text-[#D2E2B0] group-hover:translate-x-1 transition-transform">
                    <span className="font-semibold underline underline-offset-4">Inspect Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button: "See More Projects" (Banghi.mp4 p6_620ms) */}
        <div className="mt-14 flex items-center justify-center space-x-2.5">
          <button
            onClick={() => {
              const el = document.getElementById('portfolio-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full text-sm font-sans font-medium text-[#1A2E20] bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#FAF8F5] transition-all duration-200"
          >
            See More Projects
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('portfolio-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-12 h-12 rounded-full bg-white border border-[#1A2E20]/30 hover:border-[#1A2E20] hover:bg-[#FAF8F5] flex items-center justify-center text-[#1A2E20] transition-all duration-200 group"
            title="See More Projects"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

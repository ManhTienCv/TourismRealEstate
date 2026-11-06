import React, { useState } from 'react';
import { SEED_PORTFOLIO_PROJECTS, PortfolioProject } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Building2, ArrowRight, MapPin, Quote, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const RealizedProjectsSection: React.FC = () => {
  const { openProjectDetail } = useConfiguratorStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = SEED_PORTFOLIO_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.housingSolutionSlug === activeFilter || p.standardPlanSlug === activeFilter;
  });

  return (
    <section id="portfolio-section" className="py-24 bg-tie-bg border-b border-tie-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
              <Building2 className="w-3.5 h-3.5" />
              <span>04 &bull; REALIZED ARCHITECTURAL CASE STUDIES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
              Built on land, delivered with clarity.
            </h2>
            <p className="text-base sm:text-lg text-tie-muted font-sans leading-relaxed">
              Explore completed TIE homes across the Hudson Valley, Catskills, Berkshires, and California wine country. Inspect actual realized budgets, delivery durations, and client testimonials.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 font-mono text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-tie-pine text-tie-bg font-semibold'
                  : 'bg-tie-surface text-tie-muted hover:text-tie-ink border border-tie-border'
              }`}
            >
              All Projects ({SEED_PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('second-home')}
              className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all ${
                activeFilter === 'second-home'
                  ? 'bg-tie-pine text-tie-bg font-semibold'
                  : 'bg-tie-surface text-tie-muted hover:text-tie-ink border border-tie-border'
              }`}
            >
              Weekend Retreats
            </button>
            <button
              onClick={() => setActiveFilter('starter-home')}
              className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all ${
                activeFilter === 'starter-home'
                  ? 'bg-tie-pine text-tie-bg font-semibold'
                  : 'bg-tie-surface text-tie-muted hover:text-tie-ink border border-tie-border'
              }`}
            >
              Modern Starters
            </button>
            <button
              onClick={() => setActiveFilter('adu')}
              className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all ${
                activeFilter === 'adu'
                  ? 'bg-tie-pine text-tie-bg font-semibold'
                  : 'bg-tie-surface text-tie-muted hover:text-tie-ink border border-tie-border'
              }`}
            >
              Backyard ADUs
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project: PortfolioProject, idx: number) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-tie-surface rounded-sm border border-tie-border overflow-hidden shadow-tie-card flex flex-col justify-between"
              >
                <div>
                  {/* Hero Imagery */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden bg-tie-surface-light cursor-pointer"
                    onClick={() => openProjectDetail(project.slug)}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/80 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4 bg-tie-bg/95 backdrop-blur-md px-3 py-1 rounded-sm border border-tie-border text-xs font-mono font-semibold text-tie-pine">
                      {project.standardPlanName}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-tie-bg">
                      <div className="flex items-center space-x-1.5 text-xs font-sans">
                        <MapPin className="w-3.5 h-3.5 text-tie-terracotta" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <div className="font-mono text-xs px-2 py-0.5 rounded bg-tie-pine/90 text-tie-bg border border-tie-border/30">
                        COMPLETED {project.completedYear}
                      </div>
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div>
                      <div className="text-xs font-mono text-tie-terracotta font-semibold uppercase tracking-wider mb-1">
                        {project.housingSolutionTitle}
                      </div>
                      <h3
                        onClick={() => openProjectDetail(project.slug)}
                        className="font-serif text-2xl font-bold text-tie-ink group-hover:text-tie-pine cursor-pointer transition-colors"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-tie-muted font-sans mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Architectural Metric Pill Row */}
                    <div className="grid grid-cols-3 gap-2 bg-tie-bg p-3 rounded-sm border border-tie-border font-mono text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-tie-muted block">Realized Cost</span>
                        <span className="font-bold text-tie-ink">${project.totalCost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-tie-muted block">Floor Area</span>
                        <span className="font-semibold text-tie-ink">{project.sqft.toLocaleString()} SQFT</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-tie-muted block">Delivery Time</span>
                        <span className="font-semibold text-tie-pine">{project.durationMonths} MONTHS</span>
                      </div>
                    </div>

                    {/* Client Quote Card */}
                    <div className="bg-tie-surface-light p-4 rounded-sm border-l-2 border-tie-pine text-xs space-y-2">
                      <p className="italic text-tie-ink font-serif text-sm">
                        &ldquo;{project.clientQuote.quote}&rdquo;
                      </p>
                      <div className="font-sans font-medium text-tie-muted text-[11px]">
                        &mdash; {project.clientQuote.author}, <span className="text-tie-subtle">{project.clientQuote.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:px-8 bg-tie-bg/60 border-t border-tie-border flex items-center justify-between">
                  <span className="text-xs font-mono text-tie-muted">
                    {project.specs.offGrid ? '🌿 Off-Grid Solar' : '⚡ Grid Tied High-Performance'} &bull; {project.specs.cladding}
                  </span>
                  <button
                    onClick={() => openProjectDetail(project.slug)}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-tie-pine hover:text-tie-pine-hover transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

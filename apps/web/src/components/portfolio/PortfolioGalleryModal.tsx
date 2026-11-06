import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_PORTFOLIO_PROJECTS } from '@tie/shared';
import { X, MapPin, Check, Sparkles, Building2, Quote, ArrowRight } from 'lucide-react';

export const PortfolioGalleryModal: React.FC = () => {
  const { selectedProjectSlug, closeProjectDetail, openConfigurator } = useConfiguratorStore();

  if (!selectedProjectSlug) return null;

  const project = SEED_PORTFOLIO_PROJECTS.find((p) => p.slug === selectedProjectSlug);
  if (!project) return null;

  const handleConfigureSimilar = () => {
    closeProjectDetail();
    openConfigurator(project.standardPlanSlug as any, project.housingSolutionSlug as any);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tie-ink/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-tie-bg rounded-sm border border-tie-border shadow-tie-float overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-tie-surface px-6 py-4 border-b border-tie-border flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-tie-pine text-tie-bg">
              CASE STUDY
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-tie-ink">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-tie-muted hidden sm:inline">
              &bull; {project.location} &bull; Completed {project.completedYear}
            </span>
          </div>

          <button
            onClick={closeProjectDetail}
            className="p-1.5 rounded text-tie-muted hover:text-tie-ink hover:bg-tie-surface-light border border-transparent hover:border-tie-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Banner Image */}
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-tie-border shadow-sm">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-tie-bg">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-tie-terracotta-light">
                  {project.housingSolutionTitle}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {project.subtitle}
                </h2>
              </div>
              <div className="font-mono text-sm font-bold bg-tie-bg/90 text-tie-ink px-3 py-1 rounded-sm border border-tie-border">
                ${project.totalCost.toLocaleString()} Turnkey
              </div>
            </div>
          </div>

          {/* Realized Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Standard Base
              </span>
              <div className="font-serif text-base font-bold text-tie-ink">
                {project.standardPlanName}
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Dimensions
              </span>
              <div className="font-mono text-lg font-bold text-tie-ink">
                {project.sqft.toLocaleString()} <span className="text-xs font-normal">SQ FT</span>
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Total Build Time
              </span>
              <div className="font-mono text-lg font-bold text-tie-pine">
                {project.durationMonths} MONTHS
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Bedrooms / Bath
              </span>
              <div className="font-mono text-lg font-bold text-tie-ink">
                {project.bedrooms} BD / {project.bathrooms} BA
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-bold text-tie-ink">
              Architectural Context & Site Resolution
            </h4>
            {project.narrative.map((para, idx) => (
              <p key={idx} className="text-sm text-tie-muted leading-relaxed font-sans">
                {para}
              </p>
            ))}
          </div>

          {/* Client Testimonial Box */}
          <div className="p-6 bg-tie-surface rounded-sm border-l-4 border-tie-pine space-y-3">
            <Quote className="w-6 h-6 text-tie-pine opacity-70" />
            <p className="font-serif italic text-base sm:text-lg text-tie-ink leading-relaxed">
              &ldquo;{project.clientQuote.quote}&rdquo;
            </p>
            <div className="font-mono text-xs text-tie-muted">
              &mdash; {project.clientQuote.author}, {project.clientQuote.role} ({project.clientQuote.city})
            </div>
          </div>

          {/* Key Realized Outcomes */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-tie-ink">
              Verified Project Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="p-3 bg-tie-surface rounded-sm border border-tie-border flex items-start space-x-2 text-xs text-tie-ink">
                  <Check className="w-4 h-4 text-tie-pine shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Showcase */}
          {project.gallery.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-tie-ink">
                Architectural Photography Gallery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-sm overflow-hidden border border-tie-border bg-tie-surface">
                    <img
                      src={img}
                      alt={`${project.title} detail ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-tie-surface px-6 py-4 border-t border-tie-border flex items-center justify-between shrink-0">
          <div className="font-mono text-xs text-tie-muted hidden sm:block">
            Pre-engineered plan: <span className="font-bold text-tie-ink">{project.standardPlanName}</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={closeProjectDetail}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-sm border border-tie-border text-xs font-medium text-tie-muted hover:text-tie-ink hover:bg-tie-surface-light transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleConfigureSimilar}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg text-xs font-semibold shadow-tie-soft transition-all"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-tie-terracotta-light" />
              <span>Configure a Similar Build</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

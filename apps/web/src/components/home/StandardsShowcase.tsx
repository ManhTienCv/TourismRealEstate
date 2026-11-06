import React, { useState } from 'react';
import { SEED_STANDARD_PLANS, StandardPlan } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowUpRight, SlidersHorizontal, Sparkles, Layers, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const StandardsShowcase: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'compact' | 'mid' | 'estate'>('all');
  const { openConfigurator, openPlanDetail } = useConfiguratorStore();

  const filteredPlans = SEED_STANDARD_PLANS.filter((plan) => {
    if (filterCategory === 'compact') return plan.sqft < 1000;
    if (filterCategory === 'mid') return plan.sqft >= 1000 && plan.sqft <= 1800;
    if (filterCategory === 'estate') return plan.sqft > 1800;
    return true;
  });

  return (
    <section id="standards-section" className="py-24 bg-tie-bg border-b border-tie-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
              <Layers className="w-3.5 h-3.5" />
              <span>02 &bull; TIE STANDARDS (8 ARCHITECTURAL BASES)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
              The Modular Catalog.
            </h2>
            <p className="text-base sm:text-lg text-tie-muted font-sans leading-relaxed">
              Every TIE standard is completely engineered for precision offsite fabrication. Hover over any design to inspect the structural 3D axonometric diagram, or click to view full architectural working drawings.
            </p>
          </div>

          {/* Size Filter Pills */}
          <div className="flex items-center space-x-1.5 p-1 bg-tie-surface rounded-sm border border-tie-border shrink-0 text-xs font-mono">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-sm transition-all ${
                filterCategory === 'all'
                  ? 'bg-tie-pine text-tie-bg font-semibold shadow-sm'
                  : 'text-tie-muted hover:text-tie-ink'
              }`}
            >
              All (8)
            </button>
            <button
              onClick={() => setFilterCategory('compact')}
              className={`px-3 py-1.5 rounded-sm transition-all ${
                filterCategory === 'compact'
                  ? 'bg-tie-pine text-tie-bg font-semibold shadow-sm'
                  : 'text-tie-muted hover:text-tie-ink'
              }`}
            >
              &lt; 1,000 SQFT
            </button>
            <button
              onClick={() => setFilterCategory('mid')}
              className={`px-3 py-1.5 rounded-sm transition-all ${
                filterCategory === 'mid'
                  ? 'bg-tie-pine text-tie-bg font-semibold shadow-sm'
                  : 'text-tie-muted hover:text-tie-ink'
              }`}
            >
              1,000–1,800 SQFT
            </button>
            <button
              onClick={() => setFilterCategory('estate')}
              className={`px-3 py-1.5 rounded-sm transition-all ${
                filterCategory === 'estate'
                  ? 'bg-tie-pine text-tie-bg font-semibold shadow-sm'
                  : 'text-tie-muted hover:text-tie-ink'
              }`}
            >
              1,800+ SQFT
            </button>
          </div>
        </div>

        {/* 8 Standard Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlans.map((plan: StandardPlan, idx: number) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-tie-surface rounded-sm border border-tie-border overflow-hidden flex flex-col justify-between hover:shadow-tie-card transition-all duration-300"
              >
                <div>
                  {/* DUAL-IMAGE INTERACTIVE CONTAINER */}
                  {/* Default: Exterior photographic view | Hover: 3D Axonometric white background */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-tie-surface-light border-b border-tie-border cursor-pointer"
                       onClick={() => openPlanDetail(plan)}>
                    
                    {/* 1. Default Exterior Photographic Image */}
                    <img
                      src={plan.exteriorImageUrl}
                      alt={`${plan.name} Exterior View`}
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    />

                    {/* 2. Hover State: 3D Axonometric Diagram on White Background */}
                    <img
                      src={plan.axon3dImageUrl}
                      alt={`${plan.name} 3D Axonometric Model`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Visual Hover Badge Indicator */}
                    <div className="absolute top-3 left-3 bg-tie-bg/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-tie-border text-[11px] font-mono font-medium text-tie-ink shadow-sm">
                      {plan.code}
                    </div>

                    <div className="absolute top-3 right-3 bg-tie-ink/80 text-tie-bg backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      AXON 3D VIEW
                    </div>

                    {/* Module Count Badge */}
                    <div className="absolute bottom-3 right-3 bg-tie-bg/95 px-2 py-0.5 rounded-sm border border-tie-border text-[10px] font-mono text-tie-pine font-semibold">
                      {plan.moduleCount} {plan.moduleCount === 1 ? 'MODULE' : 'MODULES'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-tie-ink group-hover:text-tie-pine transition-colors">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-tie-muted line-clamp-1 mt-0.5 font-sans">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Architectural Specs Pills (JetBrains Mono) */}
                    <div className="flex items-center space-x-2 pt-1 font-mono text-xs">
                      <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-ink font-semibold">
                        {plan.sqft.toLocaleString()} SQFT
                      </span>
                      <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-muted">
                        {plan.bedrooms} BD / {plan.bathrooms} BA
                      </span>
                      <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-terracotta font-medium ml-auto">
                        {plan.baseTimelineWeeks} WKS
                      </span>
                    </div>

                    {/* Base Hard Cost */}
                    <div className="pt-2 border-t border-tie-border/70 flex items-baseline justify-between font-mono">
                      <span className="text-[11px] text-tie-muted uppercase tracking-wider">
                        Base Fabrication
                      </span>
                      <span className="text-base font-bold text-tie-pine">
                        ${plan.baseHardCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-tie-bg/60 border-t border-tie-border flex items-center space-x-2">
                  <button
                    onClick={() => openPlanDetail(plan)}
                    className="flex-1 py-2 px-3 rounded-sm bg-tie-surface hover:bg-tie-surface-light border border-tie-border text-xs font-medium text-tie-ink transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-tie-muted" />
                    <span>View Plan</span>
                  </button>

                  <button
                    onClick={() => openConfigurator(plan.slug)}
                    className="flex-1 py-2 px-3 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg text-xs font-medium shadow-sm transition-all flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-tie-terracotta-light" />
                    <span>Configure</span>
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

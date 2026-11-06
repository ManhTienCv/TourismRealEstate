import React, { useState } from 'react';
import { StandardPlan } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Eye, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StandardCardProps {
  plan: StandardPlan;
  index: number;
}

export const StandardCard: React.FC<StandardCardProps> = ({ plan, index }) => {
  const { openConfigurator, openPlanDetail } = useConfiguratorStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-tie-surface rounded-sm border border-tie-border overflow-hidden flex flex-col justify-between hover:shadow-tie-card transition-all duration-300"
    >
      <div>
        {/* SIGNATURE DUAL-IMAGE INTERACTION CONTAINER */}
        {/* Default State: High-resolution exterior architectural photography */}
        {/* Hover State: Smooth crossfade to clean white-background 3D Axonometric model */}
        <div
          className="relative aspect-[4/3] overflow-hidden bg-tie-surface-light border-b border-tie-border cursor-pointer select-none"
          onClick={() => openPlanDetail(plan)}
        >
          {/* 1. Default Exterior Photographic Render / Photo */}
          <img
            src={plan.exteriorImageUrl}
            alt={`${plan.name} Exterior View`}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            loading="lazy"
          />

          {/* 2. Hover 3D Axonometric Diagram on White Background */}
          <img
            src={plan.axon3dImageUrl}
            alt={`${plan.name} 3D Axonometric Model`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />

          {/* Floating Plan Code Badge */}
          <div className="absolute top-3 left-3 bg-tie-bg/95 backdrop-blur-md px-2.5 py-1 rounded-sm border border-tie-border text-[11px] font-mono font-medium text-tie-ink shadow-sm">
            {plan.code}
          </div>

          {/* Dynamic View Mode Label */}
          <div className="absolute top-3 right-3 bg-tie-ink/85 text-tie-bg backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            3D AXONOMETRIC
          </div>

          {/* Module Count Badge */}
          <div className="absolute bottom-3 right-3 bg-tie-bg/95 px-2.5 py-0.5 rounded-sm border border-tie-border text-[10px] font-mono text-tie-pine font-semibold shadow-sm">
            {plan.moduleCount} {plan.moduleCount === 1 ? 'MODULE' : 'MODULES'}
          </div>
        </div>

        {/* Plan Header & Description */}
        <div className="p-5 space-y-3.5">
          <div>
            <h3
              onClick={() => openPlanDetail(plan)}
              className="font-serif text-2xl font-bold text-tie-ink group-hover:text-tie-pine transition-colors cursor-pointer"
            >
              {plan.name}
            </h3>
            <p className="text-xs text-tie-muted line-clamp-1 mt-0.5 font-sans">
              {plan.tagline}
            </p>
          </div>

          {/* Architectural Specs Pills (JetBrains Mono) */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs pt-1">
            <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-ink font-semibold">
              {plan.sqft.toLocaleString()} SQFT
            </span>
            <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-muted">
              {plan.bedrooms} BED
            </span>
            <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-muted">
              {plan.bathrooms} BATH
            </span>
            <span className="px-2 py-1 rounded bg-tie-bg border border-tie-border text-tie-terracotta font-medium ml-auto">
              {plan.baseTimelineWeeks} WKS
            </span>
          </div>

          {/* Base Hard Cost Breakdown Row */}
          <div className="pt-3 border-t border-tie-border/70 flex items-baseline justify-between font-mono">
            <div>
              <span className="text-[10px] text-tie-muted uppercase tracking-wider block">
                Base Fabrication
              </span>
              <span className="text-xs text-tie-muted">
                ${Math.round(plan.baseHardCost / plan.sqft)}/sqft
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-tie-pine">
                ${plan.baseHardCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 bg-tie-bg/60 border-t border-tie-border flex items-center space-x-2">
        <button
          onClick={() => openPlanDetail(plan)}
          className="flex-1 py-2 px-3 rounded-sm bg-tie-surface hover:bg-tie-surface-light border border-tie-border text-xs font-medium text-tie-ink transition-colors flex items-center justify-center space-x-1.5"
          title="Inspect blueprints, dimensions and engineering drawings"
        >
          <Eye className="w-3.5 h-3.5 text-tie-muted" />
          <span>Plan Specs</span>
        </button>

        <button
          onClick={() => openConfigurator(plan.slug)}
          className="flex-1 py-2 px-3 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg text-xs font-medium shadow-sm transition-all flex items-center justify-center space-x-1.5 active:scale-95"
          title="Configure terrain, interior finishes, and live pro-forma pricing"
        >
          <Sparkles className="w-3.5 h-3.5 text-tie-terracotta-light" />
          <span>Configure</span>
        </button>
      </div>
    </motion.div>
  );
};

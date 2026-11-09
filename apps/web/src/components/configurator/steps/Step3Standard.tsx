import React from 'react';
import { SEED_STANDARD_PLANS, StandardPlan } from '@tie/shared';

interface Step3StandardProps {
  currentPlan: StandardPlan;
  standardPlanSlug: string;
  onSetStandardPlan: (slug: string) => void;
}

export const Step3Standard: React.FC<Step3StandardProps> = ({
  currentPlan,
  standardPlanSlug,
  onSetStandardPlan,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
          STEP 03 &bull; ARCHITECTURAL STANDARD
        </span>
        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
          Choose Your Architectural Standard.
        </h4>
        <p className="text-sm text-tie-muted font-sans mt-1">
          Select one of our 8 modular designs. Every standard is pre-engineered with precise spatial layouts and fixed fabrication costs.
        </p>
      </div>

      {/* Selected Plan Spotlight with Live 3D Axonometric Preview */}
      <div className="bg-tie-surface rounded-sm border border-tie-border p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 aspect-[4/3] rounded-sm overflow-hidden bg-white border border-tie-border relative shadow-inner">
          <img
            src={currentPlan.axon3dImageUrl}
            alt={`${currentPlan.name} 3D Axonometric`}
            className="w-full h-full object-contain p-4"
          />
          <div className="absolute top-3 left-3 bg-tie-bg/95 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono font-bold text-tie-pine border border-tie-border">
            LIVE 3D AXONOMETRIC
          </div>
          <div className="absolute bottom-3 right-3 bg-tie-ink/80 text-tie-bg px-2 py-0.5 rounded text-[10px] font-mono">
            {currentPlan.moduleCount} MODULES
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-mono text-tie-terracotta uppercase">
              Selected Model
            </span>
            <h4 className="font-serif text-3xl font-bold text-tie-ink">
              {currentPlan.name}
            </h4>
            <p className="text-sm text-tie-muted font-sans mt-1">
              {currentPlan.tagline}
            </p>
          </div>

          {/* Monospace Specs Pill Row */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded bg-tie-bg border border-tie-border font-bold text-tie-ink">
              {currentPlan.sqft.toLocaleString()} SQFT
            </span>
            <span className="px-3 py-1.5 rounded bg-tie-bg border border-tie-border text-tie-muted">
              {currentPlan.bedrooms} BED
            </span>
            <span className="px-3 py-1.5 rounded bg-tie-bg border border-tie-border text-tie-muted">
              {currentPlan.bathrooms} BATH
            </span>
            <span className="px-3 py-1.5 rounded bg-tie-bg border border-tie-border text-tie-terracotta font-medium">
              {currentPlan.baseTimelineWeeks} WEEKS
            </span>
          </div>

          <div className="pt-3 border-t border-tie-border/70 flex items-baseline justify-between font-mono">
            <span className="text-xs text-tie-muted uppercase">Base Modular Fabrication:</span>
            <span className="text-2xl font-bold text-tie-pine">
              ${currentPlan.baseHardCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 8 Standards Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {SEED_STANDARD_PLANS.map((plan: StandardPlan) => {
          const isSelected = plan.slug === standardPlanSlug;
          return (
            <div
              key={plan.id}
              onClick={() => onSetStandardPlan(plan.slug)}
              className={`p-3 rounded-sm border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-tie-pine text-tie-bg border-tie-pine shadow-sm font-semibold'
                  : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border text-tie-ink'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                <span>{plan.code}</span>
                <span>{plan.sqft} SQFT</span>
              </div>
              <div className="font-serif font-bold text-sm truncate">
                {plan.name}
              </div>
              <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-tie-bg/80' : 'text-tie-pine font-medium'}`}>
                ${plan.baseHardCost.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

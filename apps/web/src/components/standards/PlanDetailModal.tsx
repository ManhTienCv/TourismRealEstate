import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { X, Sparkles, Check } from 'lucide-react';

export const PlanDetailModal: React.FC = () => {
  const { selectedPlanForDetail, closePlanDetail, openConfigurator } = useConfiguratorStore();
  const [activeViewMode, setActiveViewMode] = useState<'exterior' | 'axon3d' | 'floorplan'>('exterior');

  if (!selectedPlanForDetail) return null;

  const plan = selectedPlanForDetail;

  const handleConfigure = () => {
    closePlanDetail();
    openConfigurator(plan.slug);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tie-ink/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-tie-bg rounded-sm border border-tie-border shadow-tie-float overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="bg-tie-surface px-6 py-4 border-b border-tie-border flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-tie-pine text-tie-bg">
              {plan.code}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-tie-ink">
              {plan.name}
            </h3>
            <span className="hidden sm:inline text-xs font-mono text-tie-muted">
              &bull; {plan.sqft.toLocaleString()} SQ FT &bull; {plan.bedrooms} BD / {plan.bathrooms} BA
            </span>
          </div>

          <button
            onClick={closePlanDetail}
            className="p-1.5 rounded text-tie-muted hover:text-tie-ink hover:bg-tie-surface-light border border-transparent hover:border-tie-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Visual Display with Dual-Image Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-tie-muted uppercase tracking-wider">
                Architectural Viewport
              </span>

              {/* View Switcher Pills */}
              <div className="flex items-center space-x-1 p-1 bg-tie-surface rounded-sm border border-tie-border text-xs font-mono">
                <button
                  onClick={() => setActiveViewMode('exterior')}
                  className={`px-3 py-1 rounded-sm transition-all ${
                    activeViewMode === 'exterior'
                      ? 'bg-tie-pine text-tie-bg font-semibold'
                      : 'text-tie-muted hover:text-tie-ink'
                  }`}
                >
                  Photographic Exterior
                </button>
                <button
                  onClick={() => setActiveViewMode('axon3d')}
                  className={`px-3 py-1 rounded-sm transition-all ${
                    activeViewMode === 'axon3d'
                      ? 'bg-tie-pine text-tie-bg font-semibold'
                      : 'text-tie-muted hover:text-tie-ink'
                  }`}
                >
                  3D Axonometric Diagram
                </button>
                <button
                  onClick={() => setActiveViewMode('floorplan')}
                  className={`px-3 py-1 rounded-sm transition-all ${
                    activeViewMode === 'floorplan'
                      ? 'bg-tie-pine text-tie-bg font-semibold'
                      : 'text-tie-muted hover:text-tie-ink'
                  }`}
                >
                  Floor Plan Schematic
                </button>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-tie-border bg-tie-surface-light shadow-inner">
              {activeViewMode === 'exterior' && (
                <img
                  src={plan.exteriorImageUrl}
                  alt={`${plan.name} Exterior`}
                  className="w-full h-full object-cover transition-all duration-500 animate-fadeIn"
                />
              )}

              {activeViewMode === 'axon3d' && (
                <div className="w-full h-full flex items-center justify-center p-6 bg-tie-surface-light">
                  <img
                    src={plan.axon3dImageUrl}
                    alt={`${plan.name} Axonometric Diagram`}
                    className="max-h-full max-w-full object-contain filter contrast-105 animate-fadeIn"
                  />
                  <div className="absolute bottom-4 left-4 bg-tie-bg/90 px-3 py-1.5 rounded-sm border border-tie-border text-xs font-mono text-tie-muted">
                    3D Structural Axonometric &bull; Module Boundary Lines
                  </div>
                </div>
              )}

              {activeViewMode === 'floorplan' && (
                <div className="w-full h-full flex items-center justify-center p-6 bg-tie-surface-light">
                  <img
                    src={plan.floorPlanUrl}
                    alt={`${plan.name} Architectural Floor Plan`}
                    className="max-h-full max-w-full object-contain filter grayscale contrast-125 animate-fadeIn"
                  />
                  <div className="absolute bottom-4 left-4 bg-tie-bg/90 px-3 py-1.5 rounded-sm border border-tie-border text-xs font-mono text-tie-muted">
                    Scale 1/4&quot; = 1&apos;-0&quot; &bull; Architectural Layout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Architectural Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Conditioned Area
              </span>
              <div className="font-mono text-xl font-bold text-tie-ink">
                {plan.sqft.toLocaleString()} <span className="text-xs font-normal">SQ FT</span>
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Dimensions Footprint
              </span>
              <div className="font-mono text-xl font-bold text-tie-ink">
                {plan.footprint.widthFt}&apos; &times; {plan.footprint.lengthFt}&apos;
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Ceiling Volume
              </span>
              <div className="font-mono text-xl font-bold text-tie-pine">
                {plan.ceilingHeightFt}&apos; <span className="text-xs font-normal">Vaulted</span>
              </div>
            </div>

            <div className="p-4 bg-tie-surface rounded-sm border border-tie-border">
              <span className="font-mono text-[10px] uppercase text-tie-muted block mb-1">
                Base Fabrication
              </span>
              <div className="font-mono text-xl font-bold text-tie-terracotta">
                ${plan.baseHardCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-tie-ink">
              Design Intent & Spatial Logic
            </h4>
            <p className="text-sm text-tie-muted leading-relaxed font-sans">
              {plan.description}
            </p>
            <div className="p-4 bg-tie-surface/60 rounded-sm border-l-2 border-tie-pine text-xs text-tie-muted font-sans">
              <strong className="text-tie-ink">Architectural Engineering Note:</strong> {plan.architecturalNotes}
            </div>
          </div>

          {/* Standard Inclusions */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-tie-ink">
              Standard Modular Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-tie-muted">
                  <Check className="w-4 h-4 text-tie-pine shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="bg-tie-surface px-6 py-4 border-t border-tie-border flex items-center justify-between shrink-0">
          <div className="font-mono text-xs text-tie-muted hidden sm:block">
            Estimated Fabrication & Set Timeline: <span className="font-bold text-tie-ink">{plan.baseTimelineWeeks} Weeks</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={closePlanDetail}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-sm border border-tie-border text-xs font-medium text-tie-muted hover:text-tie-ink hover:bg-tie-surface-light transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleConfigure}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg text-xs font-semibold shadow-tie-soft transition-all"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-tie-terracotta-light" />
              <span>Configure This Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

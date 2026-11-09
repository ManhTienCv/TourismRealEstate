import React from 'react';
import { Check, Trees, Mountain } from 'lucide-react';

interface Step2LandProps {
  landStatus: 'owned' | 'looking' | 'evaluating';
  terrain: 'flat' | 'sloped' | 'mountainous';
  onSetLandStatus: (status: 'owned' | 'looking' | 'evaluating') => void;
  onSetTerrain: (terrain: 'flat' | 'sloped' | 'mountainous') => void;
}

export const Step2Land: React.FC<Step2LandProps> = ({
  landStatus,
  terrain,
  onSetLandStatus,
  onSetTerrain,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
          STEP 02 &bull; SITE &amp; TOPOGRAPHY
        </span>
        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
          Where will you be building?
        </h4>
        <p className="text-sm text-tie-muted font-sans mt-1">
          Topography and soil conditions dictate site civil costs, access roads, and foundation engineering.
        </p>
      </div>

      {/* Subsection: Land Ownership Status */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
          Land Acquisition Status:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: 'owned' as const,
              title: 'I Own Land',
              desc: 'Ready for parcel survey, boundary checks & perc testing',
              badge: 'SITE-READY',
            },
            {
              id: 'looking' as const,
              title: 'Under Contract / Searching',
              desc: 'Currently evaluating candidate parcels with brokers',
              badge: 'SEARCHING',
            },
            {
              id: 'evaluating' as const,
              title: 'Need Evaluation Help',
              desc: 'Want TIE due-diligence package before land purchase',
              badge: 'DUE DILIGENCE',
            },
          ].map((item) => {
            const isSelected = landStatus === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSetLandStatus(item.id)}
                className={`p-4 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                    : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tie-bg border border-tie-border text-tie-pine font-medium">
                    {item.badge}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-tie-pine stroke-[3]" />}
                </div>
                <h5 className="font-serif text-base font-bold text-tie-ink">
                  {item.title}
                </h5>
                <p className="text-xs text-tie-muted font-sans mt-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsection: Terrain Condition */}
      <div className="space-y-3 pt-4 border-t border-tie-border/70">
        <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
          Site Topography &amp; Ground Conditions:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: 'flat' as const,
              title: 'Flat Meadow / Clearing',
              costModifier: 'Base Site Prep ($18,500)',
              desc: 'Gentle gradient (< 5%), clear access road, standard slab or crawlspace foundation.',
              icon: <Trees className="w-5 h-5 text-tie-pine" />,
            },
            {
              id: 'sloped' as const,
              title: 'Rolling Sloped Terrain',
              costModifier: '+18% Site Cost ($34,000)',
              desc: 'Moderate incline (5–18%), stepped terraced foundation, extended utility trenching.',
              icon: <Mountain className="w-5 h-5 text-tie-terracotta" />,
            },
            {
              id: 'mountainous' as const,
              title: 'Mountain / Exposed Ledge',
              costModifier: '+35% Site Cost ($58,000)',
              desc: 'Steep incline (> 18%) or bedrock ledge. Rock hammer excavation, reinforced concrete grade beams.',
              icon: <Mountain className="w-5 h-5 text-tie-terracotta" />,
            },
          ].map((item) => {
            const isSelected = terrain === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSetTerrain(item.id)}
                className={`p-5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                    : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {item.icon}
                    <span className="font-mono text-xs font-semibold text-tie-terracotta">
                      {item.costModifier}
                    </span>
                  </div>
                  <h5 className="font-serif text-lg font-bold text-tie-ink">
                    {item.title}
                  </h5>
                  <p className="text-xs text-tie-muted font-sans">
                    {item.desc}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-4 pt-2 border-t border-tie-border/60 flex items-center text-xs font-mono text-tie-pine font-medium">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    <span>Applied to Pro-Forma</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

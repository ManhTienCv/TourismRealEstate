import React from 'react';
import { SEED_HOUSING_SOLUTIONS, HousingSolution } from '@tie/shared';
import { Check, Compass } from 'lucide-react';
import { SolutionIcons } from '../configuratorConstants';

interface Step1GoalProps {
  housingSolutionSlug: string;
  onSelectSolution: (slug: string) => void;
}

export const Step1Goal: React.FC<Step1GoalProps> = ({
  housingSolutionSlug,
  onSelectSolution,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
          STEP 01 &bull; USE-CASE PROGRAM
        </span>
        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
          What is the purpose of this home?
        </h4>
        <p className="text-sm text-tie-muted font-sans mt-1">
          Every country parcel serves a different vision. Select your program to align with optimized floorplans, local zoning rules, and investment timelines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SEED_HOUSING_SOLUTIONS.map((sol: HousingSolution) => {
          const isSelected = housingSolutionSlug === sol.slug;
          return (
            <div
              key={sol.id}
              onClick={() => onSelectSolution(sol.slug)}
              className={`p-5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-tie-pine/5 border-tie-pine shadow-sm ring-1 ring-tie-pine'
                  : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`${isSelected ? 'text-tie-pine' : 'text-tie-muted'}`}>
                    {SolutionIcons[sol.slug] || <Compass className="w-6 h-6" />}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-tie-pine text-tie-bg flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-serif text-lg font-bold text-tie-ink">
                    {sol.title}
                  </h5>
                  <p className="text-xs text-tie-muted font-sans mt-1 line-clamp-2">
                    {sol.subtitle || sol.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-tie-border/60 text-[10px] font-mono text-tie-pine truncate">
                {sol.keyBenefits?.[0] || 'Precision Modular Delivery'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { HousingSolution, SEED_HOUSING_SOLUTIONS } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HousingSolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<HousingSolution>(SEED_HOUSING_SOLUTIONS[0]);
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section id="solutions-section" className="py-24 bg-tie-surface/50 border-b border-tie-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
            <span>01 &bull; USE-CASE ARCHETYPES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
            Tailored to how you live, invest, and build.
          </h2>
          <p className="text-base sm:text-lg text-tie-muted font-sans leading-relaxed">
            Every building journey starts with an intention. Explore 8 specialized buyer frameworks engineered to solve zoning, acoustic isolation, rental yield, or multi-generational legacy.
          </p>
        </div>

        {/* 8 Use-Case Filter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-12">
          {SEED_HOUSING_SOLUTIONS.map((solution, idx) => {
            const isSelected = selectedSolution.slug === solution.slug;
            return (
              <button
                key={solution.id}
                onClick={() => setSelectedSolution(solution)}
                className={`text-left p-3 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-tie-pine text-tie-bg border-tie-pine shadow-sm'
                    : 'bg-tie-bg text-tie-muted border-tie-border hover:border-tie-pine/50 hover:text-tie-ink'
                }`}
              >
                <span className={`font-mono text-[10px] block mb-1 ${isSelected ? 'text-tie-terracotta-light' : 'text-tie-subtle'}`}>
                  0{idx + 1}
                </span>
                <span className="font-serif text-sm font-semibold leading-tight line-clamp-2">
                  {solution.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSolution.slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-tie-bg rounded-sm border border-tie-border shadow-tie-card overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Preview Column */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[380px] overflow-hidden">
                <img
                  src={selectedSolution.heroImageUrl}
                  alt={selectedSolution.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-tie-bg/95 backdrop-blur-md px-3 py-1 rounded-sm border border-tie-border text-xs font-mono font-semibold text-tie-pine">
                  SOLUTION: {selectedSolution.slug.toUpperCase()}
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-tie-terracotta mb-2 font-semibold uppercase tracking-wider">
                    <span>Buyer Persona</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mb-2">
                    {selectedSolution.title}
                  </h3>
                  <p className="font-serif italic text-base text-tie-pine mb-4">
                    {selectedSolution.subtitle}
                  </p>
                  <p className="text-sm text-tie-muted leading-relaxed mb-6 font-sans">
                    {selectedSolution.description}
                  </p>

                  {/* Target Buyer Insight */}
                  <div className="bg-tie-surface p-3.5 rounded-sm border border-tie-border mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-tie-muted block mb-1">
                      Ideal For
                    </span>
                    <p className="text-xs sm:text-sm text-tie-ink font-medium">
                      {selectedSolution.buyerPersona}
                    </p>
                  </div>

                  {/* Key Benefits Matrix */}
                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-tie-muted block mb-2">
                      Engineered Advantages
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedSolution.keyBenefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2 text-xs text-tie-muted">
                          <Check className="w-4 h-4 text-tie-pine shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Recommended Budget & CTA */}
                <div className="pt-6 border-t border-tie-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-tie-muted block">
                      Target Turnkey Budget
                    </span>
                    <div className="font-mono text-lg font-bold text-tie-ink">
                      ${(selectedSolution.recommendedBudget.min / 1000).toFixed(0)}k &ndash; ${(selectedSolution.recommendedBudget.max / 1000).toFixed(0)}k
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => openConfigurator(selectedSolution.idealPlans[0] as any, selectedSolution.slug)}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm text-sm font-medium text-tie-bg bg-tie-pine hover:bg-tie-pine-hover shadow-tie-soft transition-all"
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-tie-terracotta-light" />
                      <span>Configure This Solution</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

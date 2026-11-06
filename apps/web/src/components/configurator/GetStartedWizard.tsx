import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  SEED_HOUSING_SOLUTIONS,
  SEED_STANDARD_PLANS,
  StandardPlan,
  HousingSolution,
} from '@tie/shared';
import { apiClient } from '../../api/client';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  MapPin,
  Compass,
  Layers,
  Hammer,
  FileCheck,
  Send,
  Building2,
  Trees,
  Mountain,
  Sun,
  Flame,
  ShieldCheck,
  Printer,
  Download,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Solution Icons Mapping
const SolutionIcons: Record<string, React.ReactNode> = {
  'starter-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'forever-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'second-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  'hybrid-home': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'adu': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  'investment-property': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  'micro-hospitality': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M14 9h.01M10 9h.01" />
    </svg>
  ),
  'multi-gen-compound': (
    <svg className="w-6 h-6 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export const GetStartedWizard: React.FC = () => {
  const {
    isConfiguratorOpen,
    closeConfigurator,
    step,
    setStep,
    nextStep,
    prevStep,
    housingSolutionSlug,
    setHousingSolution,
    landStatus,
    setLandStatus,
    terrain,
    setTerrain,
    standardPlanSlug,
    setStandardPlan,
    finishTier,
    setFinishTier,
    cladding,
    setCladding,
    wizardAddons,
    toggleAddon,
    proForma,
  } = useConfiguratorStore();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<{
    referenceCode: string;
    message: string;
  } | null>(null);

  if (!isConfiguratorOpen) return null;

  const currentPlan =
    SEED_STANDARD_PLANS.find((p) => p.slug === standardPlanSlug) || SEED_STANDARD_PLANS[0];

  const currentSolution =
    SEED_HOUSING_SOLUTIONS.find((s) => s.slug === housingSolutionSlug) || SEED_HOUSING_SOLUTIONS[0];

  const handleSubmitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiClient.submitEstimate({
        clientName: clientName || 'Prospective Homebuilder',
        clientEmail: clientEmail || 'client@tiearchitecture.com',
        clientPhone,
        housingSolutionSlug,
        standardPlanSlug,
        landStatus,
        terrain,
        finishTier,
        cladding,
        addons: wizardAddons,
      });

      setSubmittedBrief({
        referenceCode: res.referenceCode || `TIE-${Date.now().toString(36).toUpperCase()}`,
        message: res.message || 'Project brief registered successfully',
      });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2C4A3E', '#D46A43', '#EFECE6'],
        });
      } catch (err) {
        // Confetti fallback
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stacked Bar Calculation Percentages
  const hardPct = Math.max(5, Math.round((proForma.totalHardCost / proForma.grandTotalCost) * 100));
  const sitePct = Math.max(5, Math.round((proForma.sitePrepCost / proForma.grandTotalCost) * 100));
  const softPct = Math.max(5, Math.round((proForma.softCost / proForma.grandTotalCost) * 100));
  const contPct = 100 - (hardPct + sitePct + softPct);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tie-ink/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-tie-bg rounded-sm border border-tie-border shadow-tie-float overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* WIZARD HEADER BAR */}
        <div className="bg-tie-surface px-6 py-4 border-b border-tie-border flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-sm bg-tie-pine flex items-center justify-center text-tie-bg font-serif font-bold text-base shadow-xs">
              T
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-tie-ink">
                  TIE Project Configurator
                </h3>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-tie-bg border border-tie-border text-tie-pine font-semibold">
                  STEP {step} OF 5
                </span>
              </div>
              <p className="text-xs text-tie-muted font-sans hidden sm:block">
                Warm Editorial Modular Architecture &bull; Live Pro-Forma Pricing
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono bg-tie-bg px-3 py-1.5 rounded border border-tie-border">
              <span className="text-tie-muted uppercase">ESTIMATED ALL-IN:</span>
              <span className="font-bold text-tie-pine text-sm">
                ${proForma.grandTotalCost.toLocaleString()}
              </span>
            </div>

            <button
              onClick={closeConfigurator}
              className="p-1.5 rounded text-tie-muted hover:text-tie-ink hover:bg-tie-surface-light border border-transparent hover:border-tie-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="bg-tie-surface/50 px-6 py-3 border-b border-tie-border shrink-0">
          <div className="grid grid-cols-5 gap-2 text-xs font-mono">
            {[
              { num: 1, label: '01. GOAL' },
              { num: 2, label: '02. LAND' },
              { num: 3, label: '03. STANDARD' },
              { num: 4, label: '04. FINISHES' },
              { num: 5, label: '05. PRO-FORMA' },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setStep(s.num)}
                  className={`text-left py-1 px-2 rounded transition-all border ${
                    isActive
                      ? 'bg-tie-pine text-tie-bg border-tie-pine font-bold'
                      : isPast
                      ? 'bg-tie-surface text-tie-ink border-tie-border font-medium'
                      : 'text-tie-muted border-transparent hover:text-tie-ink'
                  }`}
                >
                  <span className="truncate block">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SCROLLABLE WIZARD CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-tie-bg">
          {submittedBrief ? (
            /* SUCCESS STATE */
            <div className="py-12 text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-tie-pine/10 border border-tie-pine/30 text-tie-pine flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-tie-terracotta uppercase tracking-widest">
                  PROJECT BRIEF SUBMITTED
                </span>
                <h3 className="font-serif text-3xl font-bold text-tie-ink">
                  Your Country Project is Queued.
                </h3>
                <p className="text-sm text-tie-muted font-sans leading-relaxed">
                  Our licensed architectural team and regional site civil engineers have received your initial pro-forma. A dedicated Project Architect will review your configuration and reach out within 24 business hours.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="p-6 bg-tie-surface rounded-sm border border-tie-border space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-tie-muted">
                  <span>REFERENCE TRACKING ID:</span>
                  <span className="font-bold text-tie-pine text-sm">{submittedBrief.referenceCode}</span>
                </div>
                <div className="flex justify-between items-center text-tie-muted">
                  <span>SELECTED ARCHITECTURAL STANDARD:</span>
                  <span className="font-semibold text-tie-ink">{currentPlan.name} ({currentPlan.sqft} SQFT)</span>
                </div>
                <div className="flex justify-between items-center text-tie-muted">
                  <span>PRO-FORMA ALL-IN ESTIMATE:</span>
                  <span className="font-bold text-tie-pine">${proForma.grandTotalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-tie-muted">
                  <span>ESTIMATED DELIVERY TIMELINE:</span>
                  <span className="font-semibold text-tie-terracotta">{proForma.estimatedTimelineWeeks} WEEKS</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-tie-surface border border-tie-border text-xs font-mono font-medium hover:bg-tie-surface-light flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4 text-tie-muted" />
                  <span>PRINT PROJECT BRIEF</span>
                </button>
                <button
                  onClick={closeConfigurator}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-tie-pine text-tie-bg text-xs font-mono font-semibold hover:bg-tie-pine-hover shadow-sm"
                >
                  RETURN TO CATALOG
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: HOUSING SOLUTION GOAL */}
              {step === 1 && (
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
                          onClick={() => setHousingSolution(sol.slug)}
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
              )}

              {/* STEP 2: LAND STATUS & TERRAIN CONDITION */}
              {step === 2 && (
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
                            onClick={() => setLandStatus(item.id)}
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

                  {/* Subsection: Terrain Condition (Flat, Sloped +18%, Mountainous +35%) */}
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
                            onClick={() => setTerrain(item.id)}
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
              )}

              {/* STEP 3: CHOOSE BASE STANDARD PLAN */}
              {step === 3 && (
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
                          onClick={() => setStandardPlan(plan.slug)}
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
              )}

              {/* STEP 4: FINISH TIER & ADD-ONS */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
                      STEP 04 &bull; CRAFT &amp; SPECIFICATIONS
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
                      Customize Finishes &amp; Add-ons.
                    </h4>
                    <p className="text-sm text-tie-muted font-sans mt-1">
                      Tailor the tactile experience, exterior rainscreen envelope, and optional lifestyle modules.
                    </p>
                  </div>

                  {/* Subsection: Finish Tier */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
                      Interior Architectural Finish Tier:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'essential' as const,
                          name: 'Essential Nordic',
                          rate: 'Included ($0/sqft)',
                          materials: 'Baltic Birch plywood cabinetry, polished architectural concrete floors, minimalist matte black hardware.',
                        },
                        {
                          id: 'signature' as const,
                          name: 'Signature Crafted',
                          rate: '+$35 / SQFT',
                          materials: 'Engineered European White Oak plank flooring, honed charcoal soapstone counters, hydronic towel warmers.',
                        },
                        {
                          id: 'bespoke' as const,
                          name: 'Bespoke Atelier',
                          rate: '+$68 / SQFT',
                          materials: 'Hand-troweled microcement wet rooms, vein-cut Roman travertine slabs, solid walnut millwork throughout.',
                        },
                      ].map((item) => {
                        const isSelected = finishTier === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setFinishTier(item.id)}
                            className={`p-5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                                : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-tie-terracotta">
                                  {item.rate}
                                </span>
                                {isSelected && <Check className="w-4 h-4 text-tie-pine stroke-[3]" />}
                              </div>
                              <h5 className="font-serif text-lg font-bold text-tie-ink">
                                {item.name}
                              </h5>
                              <p className="text-xs text-tie-muted font-sans leading-relaxed">
                                {item.materials}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subsection: Exterior Cladding */}
                  <div className="space-y-3 pt-4 border-t border-tie-border/70">
                    <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
                      Exterior Rainscreen Cladding:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'pine' as const, label: 'Thermally Modified Pine', note: 'Natural weathering, low maintenance' },
                        { id: 'zinc' as const, label: 'Standing Seam Zinc', note: '100-year non-combustible lifetime' },
                        { id: 'cedar' as const, label: 'Western Red Cedar', note: 'Clear vertical grain architectural grade' },
                        { id: 'shou_sugi_ban' as const, label: 'Shou Sugi Ban Yakisugi', note: 'Fire-resistant charred timber' },
                      ].map((item) => {
                        const isSelected = cladding === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setCladding(item.id)}
                            className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine font-medium'
                                : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif font-bold text-sm text-tie-ink">{item.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-tie-pine stroke-[3]" />}
                            </div>
                            <span className="text-[11px] text-tie-muted block font-sans">{item.note}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subsection: Add-ons Grid */}
                  <div className="space-y-3 pt-4 border-t border-tie-border/70">
                    <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
                      Lifestyle &amp; Performance Add-on Modules:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { key: 'wraparoundDeck' as const, title: 'Wrap-around Ipe Deck', cost: 26000, desc: '600 sqft architectural hardwood deck with cable railing' },
                        { key: 'solarBatteryPack' as const, title: 'Solar & 20kWh Battery', cost: 38000, desc: '11.2kW bifacial solar array + dual Tesla Powerwalls for off-grid' },
                        { key: 'radiantHeating' as const, title: 'Hydronic Radiant Heat', cost: 12500, desc: 'In-slab continuous zone heating with smart thermostat integration' },
                        { key: 'detachedSauna' as const, title: 'Detached Cedar Sauna', cost: 24500, desc: '8x10 ft Western Red Cedar module with Finnish electric heater' },
                        { key: 'screenedPorch' as const, title: 'Screened Bug Porch', cost: 18500, desc: 'Integrated three-season bug-proof outdoor dining pavilion' },
                        { key: 'evCarport' as const, title: 'Covered EV Carport', cost: 15000, desc: 'Heavy timber open carport with integrated Level 2 EV charging' },
                      ].map((item) => {
                        const isChecked = wizardAddons[item.key];
                        return (
                          <div
                            key={item.key}
                            onClick={() => toggleAddon(item.key)}
                            className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-start space-x-3 ${
                              isChecked
                                ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                                : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // Handled by div click
                              className="mt-1 h-4 w-4 rounded border-tie-border text-tie-pine focus:ring-tie-pine cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-serif font-bold text-sm text-tie-ink">
                                  {item.title}
                                </span>
                                <span className="font-mono text-xs font-semibold text-tie-pine">
                                  +${item.cost.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-[11px] text-tie-muted font-sans mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: LIVE PRO-FORMA COST BREAKDOWN DASHBOARD */}
              {step === 5 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
                      STEP 05 &bull; LIVE PRO-FORMA DASHBOARD
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
                      Comprehensive Project Pro-Forma.
                    </h4>
                    <p className="text-sm text-tie-muted font-sans mt-1">
                      Transparent cost architecture backed by our &plusmn;5% guaranteed budget variance policy.
                    </p>
                  </div>

                  {/* Pro-Forma Metrics Highlight Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                    <div className="bg-tie-surface p-4 rounded-sm border border-tie-border">
                      <span className="text-[10px] uppercase text-tie-muted block">GRAND TOTAL ALL-IN</span>
                      <span className="text-2xl font-bold text-tie-pine block mt-1">
                        ${proForma.grandTotalCost.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-tie-terracotta block mt-0.5">&plusmn;5% Guaranteed</span>
                    </div>

                    <div className="bg-tie-surface p-4 rounded-sm border border-tie-border">
                      <span className="text-[10px] uppercase text-tie-muted block">EFFECTIVE RATE</span>
                      <span className="text-2xl font-bold text-tie-ink block mt-1">
                        ${proForma.pricePerSqft}
                      </span>
                      <span className="text-[10px] text-tie-muted block mt-0.5">Per Gross Sqft</span>
                    </div>

                    <div className="bg-tie-surface p-4 rounded-sm border border-tie-border">
                      <span className="text-[10px] uppercase text-tie-muted block">MOVE-IN VELOCITY</span>
                      <span className="text-2xl font-bold text-tie-ink block mt-1">
                        {proForma.estimatedTimelineWeeks} WEEKS
                      </span>
                      <span className="text-[10px] text-tie-pine block mt-0.5">From Stamped Permit</span>
                    </div>

                    <div className="bg-tie-surface p-4 rounded-sm border border-tie-border">
                      <span className="text-[10px] uppercase text-tie-muted block">CONTINGENCY BUFFER</span>
                      <span className="text-2xl font-bold text-tie-ink block mt-1">
                        ${proForma.contingencyCost.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-tie-muted block mt-0.5">5% Built-In Risk Escrow</span>
                    </div>
                  </div>

                  {/* VISUAL STACKED BAR CHART */}
                  <div className="bg-tie-surface p-6 rounded-sm border border-tie-border space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-tie-ink uppercase">Budget Allocation Stacked Pro-Forma</span>
                      <span className="text-tie-muted">100% Guaranteed Fabrication Cap</span>
                    </div>

                    {/* The Stacked Bar */}
                    <div className="h-8 w-full rounded overflow-hidden flex border border-tie-border/80 shadow-inner">
                      {/* 1. Hard Cost */}
                      <div
                        style={{ width: `${hardPct}%` }}
                        className="bg-tie-pine h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
                        title={`Hard Modular Fabrication: $${proForma.totalHardCost.toLocaleString()} (${hardPct}%)`}
                      >
                        {hardPct}% Hard
                      </div>

                      {/* 2. Site Prep */}
                      <div
                        style={{ width: `${sitePct}%` }}
                        className="bg-tie-terracotta h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
                        title={`Site Civil & Foundations: $${proForma.sitePrepCost.toLocaleString()} (${sitePct}%)`}
                      >
                        {sitePct}% Site
                      </div>

                      {/* 3. Soft Cost */}
                      <div
                        style={{ width: `${softPct}%` }}
                        className="bg-tie-muted h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
                        title={`PE Permitting & Soft Costs: $${proForma.softCost.toLocaleString()} (${softPct}%)`}
                      >
                        {softPct}% Soft
                      </div>

                      {/* 4. Contingency */}
                      <div
                        style={{ width: `${contPct}%` }}
                        className="bg-[#C2A676] h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-ink px-1 truncate transition-all duration-500"
                        title={`5% Contingency Escrow: $${proForma.contingencyCost.toLocaleString()} (${contPct}%)`}
                      >
                        {contPct}%
                      </div>
                    </div>

                    {/* Stack Legend */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-mono">
                      <div className="flex items-center space-x-2">
                        <div className="w-3.5 h-3.5 rounded-xs bg-tie-pine shrink-0" />
                        <div>
                          <span className="text-tie-muted block text-[10px]">HARD COSTS</span>
                          <span className="font-bold text-tie-ink">${proForma.totalHardCost.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-3.5 h-3.5 rounded-xs bg-tie-terracotta shrink-0" />
                        <div>
                          <span className="text-tie-muted block text-[10px]">SITE PREP</span>
                          <span className="font-bold text-tie-ink">${proForma.sitePrepCost.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-3.5 h-3.5 rounded-xs bg-tie-muted shrink-0" />
                        <div>
                          <span className="text-tie-muted block text-[10px]">SOFT / PERMITS</span>
                          <span className="font-bold text-tie-ink">${proForma.softCost.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-3.5 h-3.5 rounded-xs bg-[#C2A676] shrink-0" />
                        <div>
                          <span className="text-tie-muted block text-[10px]">5% CONTINGENCY</span>
                          <span className="font-bold text-tie-ink">${proForma.contingencyCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itemized Cost Breakdown Table */}
                  <div className="bg-tie-surface rounded-sm border border-tie-border overflow-hidden">
                    <div className="p-4 bg-tie-surface-light border-b border-tie-border flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold text-tie-ink uppercase">Itemized Cost Schedule</span>
                      <span className="text-tie-muted">Based on {currentPlan.name} &bull; {currentPlan.sqft} SQFT</span>
                    </div>

                    <div className="divide-y divide-tie-border/70 text-xs font-sans">
                      {proForma.costItems.map((item, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-tie-bg/60 transition-colors">
                          <div className="pr-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-tie-bg border border-tie-border text-tie-muted uppercase">
                                {item.category}
                              </span>
                              <span className="font-medium text-tie-ink">{item.name}</span>
                            </div>
                            <p className="text-[11px] text-tie-muted mt-0.5">{item.description}</p>
                          </div>
                          <span className="font-mono font-bold text-tie-ink text-sm shrink-0">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Form to Save/Export Brief */}
                  <div className="bg-tie-surface p-6 rounded-sm border border-tie-border space-y-5">
                    <div>
                      <h5 className="font-serif text-xl font-bold text-tie-ink">
                        Save &amp; Export Your Project Brief
                      </h5>
                      <p className="text-xs text-tie-muted font-sans mt-1">
                        Submit this pro-forma to initiate a free 30-minute architectural consultation and receive a downloadable PDF specification package.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitBrief} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono uppercase text-tie-muted block mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="Elena &amp; Marcus Vance"
                            className="w-full bg-tie-bg border border-tie-border rounded-sm px-3.5 py-2 text-xs font-sans text-tie-ink focus:outline-none focus:ring-1 focus:ring-tie-pine"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-tie-muted block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="client@woodstockretreat.com"
                            className="w-full bg-tie-bg border border-tie-border rounded-sm px-3.5 py-2 text-xs font-sans text-tie-ink focus:outline-none focus:ring-1 focus:ring-tie-pine"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-tie-muted block mb-1">
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-tie-bg border border-tie-border rounded-sm px-3.5 py-2 text-xs font-sans text-tie-ink focus:outline-none focus:ring-1 focus:ring-tie-pine"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-tie-muted block mb-1">
                            Land Parcel Location / Zip Code
                          </label>
                          <input
                            type="text"
                            value={siteLocation}
                            onChange={(e) => setSiteLocation(e.target.value)}
                            placeholder="e.g. Ulster County, NY or 12498"
                            className="w-full bg-tie-bg border border-tie-border rounded-sm px-3.5 py-2 text-xs font-sans text-tie-ink focus:outline-none focus:ring-1 focus:ring-tie-pine"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg font-mono text-xs font-bold tracking-wider uppercase shadow-tie-soft transition-all flex items-center justify-center space-x-2 active:scale-[0.99]"
                        >
                          {isSubmitting ? (
                            <span>GENERATING SPECIFICATION BRIEF...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-tie-terracotta-light" />
                              <span>SUBMIT PROJECT BRIEF TO TIE ARCHITECTS</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* WIZARD BOTTOM NAVIGATION BAR */}
        {!submittedBrief && (
          <div className="bg-tie-surface px-6 py-4 border-t border-tie-border flex items-center justify-between shrink-0">
            <div>
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-tie-bg border border-tie-border text-xs font-mono font-medium text-tie-ink hover:bg-tie-surface-light transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-tie-muted" />
                  <span>PREVIOUS</span>
                </button>
              ) : (
                <button
                  onClick={closeConfigurator}
                  className="text-xs font-mono text-tie-muted hover:text-tie-ink"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-tie-muted hidden sm:inline">
                {step === 5 ? 'Ready to finalize brief' : 'All options auto-saved'}
              </span>

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-sm bg-tie-pine hover:bg-tie-pine-hover text-tie-bg text-xs font-mono font-bold tracking-wider shadow-sm transition-all"
                >
                  <span>NEXT STEP</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

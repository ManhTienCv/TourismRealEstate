import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { apiClient } from '../../api/client';
import confetti from 'canvas-confetti';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WIZARD_STEPS } from './configuratorConstants';
import { Step1Goal } from './steps/Step1Goal';
import { Step2Land } from './steps/Step2Land';
import { Step3Standard } from './steps/Step3Standard';
import { Step4Finishes } from './steps/Step4Finishes';
import { Step5ProForma } from './steps/Step5ProForma';
import { WizardSuccessView } from './steps/WizardSuccessView';

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
            {WIZARD_STEPS.map((s) => {
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
            <WizardSuccessView
              submittedBrief={submittedBrief}
              currentPlan={currentPlan}
              grandTotalCost={proForma.grandTotalCost}
              estimatedTimelineWeeks={proForma.estimatedTimelineWeeks}
              onClose={closeConfigurator}
            />
          ) : (
            <>
              {step === 1 && (
                <Step1Goal
                  housingSolutionSlug={housingSolutionSlug}
                  onSelectSolution={(slug) => setHousingSolution(slug as any)}
                />
              )}

              {step === 2 && (
                <Step2Land
                  landStatus={landStatus}
                  terrain={terrain}
                  onSetLandStatus={setLandStatus}
                  onSetTerrain={setTerrain}
                />
              )}

              {step === 3 && (
                <Step3Standard
                  currentPlan={currentPlan}
                  standardPlanSlug={standardPlanSlug}
                  onSetStandardPlan={(slug) => setStandardPlan(slug as any)}
                />
              )}

              {step === 4 && (
                <Step4Finishes
                  finishTier={finishTier}
                  cladding={cladding}
                  wizardAddons={wizardAddons}
                  onSetFinishTier={setFinishTier}
                  onSetCladding={setCladding}
                  onToggleAddon={toggleAddon}
                />
              )}

              {step === 5 && (
                <Step5ProForma
                  proForma={proForma}
                  hardPct={hardPct}
                  sitePct={sitePct}
                  softPct={softPct}
                  contPct={contPct}
                  currentPlan={currentPlan}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientPhone={clientPhone}
                  siteLocation={siteLocation}
                  isSubmitting={isSubmitting}
                  onSetName={setClientName}
                  onSetEmail={setClientEmail}
                  onSetPhone={setClientPhone}
                  onSetLocation={setSiteLocation}
                  onSubmitBrief={handleSubmitBrief}
                />
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

export default GetStartedWizard;

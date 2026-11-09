import React from 'react';
import { StandardPlan } from '@tie/shared';
import { Check, Printer } from 'lucide-react';

interface WizardSuccessViewProps {
  submittedBrief: {
    referenceCode: string;
  };
  currentPlan: StandardPlan;
  grandTotalCost: number;
  estimatedTimelineWeeks: number;
  onClose: () => void;
}

export const WizardSuccessView: React.FC<WizardSuccessViewProps> = ({
  submittedBrief,
  currentPlan,
  grandTotalCost,
  estimatedTimelineWeeks,
  onClose,
}) => {
  return (
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
          <span className="font-bold text-tie-pine">${grandTotalCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-tie-muted">
          <span>ESTIMATED DELIVERY TIMELINE:</span>
          <span className="font-semibold text-tie-terracotta">{estimatedTimelineWeeks} WEEKS</span>
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
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-tie-pine text-tie-bg text-xs font-mono font-semibold hover:bg-tie-pine-hover shadow-sm"
        >
          RETURN TO CATALOG
        </button>
      </div>
    </div>
  );
};

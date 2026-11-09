import React from 'react';
import { StandardPlan } from '@tie/shared';
import { Send } from 'lucide-react';

interface ProFormaItem {
  category: string;
  name: string;
  description: string;
  amount: number;
}

interface Step5ProFormaProps {
  proForma: {
    grandTotalCost: number;
    pricePerSqft: number;
    estimatedTimelineWeeks: number;
    contingencyCost: number;
    totalHardCost: number;
    sitePrepCost: number;
    softCost: number;
    costItems: ProFormaItem[];
  };
  hardPct: number;
  sitePct: number;
  softPct: number;
  contPct: number;
  currentPlan: StandardPlan;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  siteLocation: string;
  isSubmitting: boolean;
  onSetName: (name: string) => void;
  onSetEmail: (email: string) => void;
  onSetPhone: (phone: string) => void;
  onSetLocation: (location: string) => void;
  onSubmitBrief: (e: React.FormEvent) => void;
}

export const Step5ProForma: React.FC<Step5ProFormaProps> = ({
  proForma,
  hardPct,
  sitePct,
  softPct,
  contPct,
  currentPlan,
  clientName,
  clientEmail,
  clientPhone,
  siteLocation,
  isSubmitting,
  onSetName,
  onSetEmail,
  onSetPhone,
  onSetLocation,
  onSubmitBrief,
}) => {
  return (
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
          <div
            style={{ width: `${hardPct}%` }}
            className="bg-tie-pine h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
            title={`Hard Modular Fabrication: $${proForma.totalHardCost.toLocaleString()} (${hardPct}%)`}
          >
            {hardPct}% Hard
          </div>

          <div
            style={{ width: `${sitePct}%` }}
            className="bg-tie-terracotta h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
            title={`Site Civil & Foundations: $${proForma.sitePrepCost.toLocaleString()} (${sitePct}%)`}
          >
            {sitePct}% Site
          </div>

          <div
            style={{ width: `${softPct}%` }}
            className="bg-tie-muted h-full flex items-center justify-center text-[11px] font-mono font-semibold text-tie-bg px-1 truncate transition-all duration-500"
            title={`PE Permitting & Soft Costs: $${proForma.softCost.toLocaleString()} (${softPct}%)`}
          >
            {softPct}% Soft
          </div>

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

        <form onSubmit={onSubmitBrief} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-tie-muted block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => onSetName(e.target.value)}
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
                onChange={(e) => onSetEmail(e.target.value)}
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
                onChange={(e) => onSetPhone(e.target.value)}
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
                onChange={(e) => onSetLocation(e.target.value)}
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
  );
};

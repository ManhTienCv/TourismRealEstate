import React from 'react';
import { Zap, Factory } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 bg-tie-surface border-b border-tie-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-tie-pine">
            <Zap className="w-3.5 h-3.5 text-tie-terracotta" />
            <span>03 &bull; THE CONCURRENT METHODOLOGY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
            Why productized architecture works.
          </h2>
          <p className="text-base sm:text-lg text-tie-muted font-sans leading-relaxed">
            Traditional construction forces you to build linearly in mud, snow, and rain. TIE operates concurrently: your site foundation cures while your modular home is precision framed inside our climate-controlled facility.
          </p>
        </div>

        {/* Comparison Timeline Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Traditional Site Build Card */}
          <div className="bg-tie-bg p-8 rounded-sm border border-tie-border relative space-y-6">
            <div className="flex items-center justify-between border-b border-tie-border pb-4">
              <div>
                <span className="font-mono text-xs uppercase text-tie-muted">Legacy Methodology</span>
                <h3 className="font-serif text-xl font-bold text-tie-ink">Traditional Site Build</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 text-xs font-mono font-semibold">
                18–26 Months
              </span>
            </div>

            <ul className="space-y-4 text-sm text-tie-muted">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span><strong>Linear Timeline:</strong> Zero framing begins until soil, civil trenching, and foundation curing finish.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span><strong>Weather Vulnerability:</strong> Wood studs warp in autumn rains; insulation exposed to mold before roof dried in.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span><strong>Uncapped Change Orders:</strong> Unforeseen subcontractor markups typically result in 20–35% budget creep.</span>
              </li>
            </ul>
          </div>

          {/* TIE Concurrent Modular Card */}
          <div className="bg-tie-surface-light p-8 rounded-sm border-2 border-tie-pine relative space-y-6 shadow-tie-soft">
            <div className="flex items-center justify-between border-b border-tie-border pb-4">
              <div>
                <span className="font-mono text-xs uppercase text-tie-pine font-semibold">The TIE Advantage</span>
                <h3 className="font-serif text-xl font-bold text-tie-pine">Concurrent Modular Delivery</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-semibold">
                16–22 Weeks
              </span>
            </div>

            <ul className="space-y-4 text-sm text-tie-ink">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-tie-pine mt-1.5 shrink-0" />
                <span><strong>Parallel Velocity:</strong> Site grading & factory precision assembly happen at the exact same time.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-tie-pine mt-1.5 shrink-0" />
                <span><strong>Zero Moisture Exposure:</strong> Built in a climate-controlled environment with sub-millimeter laser calibration.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-tie-pine mt-1.5 shrink-0" />
                <span><strong>Guaranteed Pro-Forma:</strong> Off-site fabrication costs are fixed before the first excavator touches your land.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Step Process Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-tie-bg p-6 rounded-sm border border-tie-border space-y-3">
            <div className="w-10 h-10 rounded-sm bg-tie-pine/10 text-tie-pine flex items-center justify-center font-mono font-bold">
              01
            </div>
            <h4 className="font-serif text-lg font-bold text-tie-ink">Select & Configure</h4>
            <p className="text-xs text-tie-muted leading-relaxed">
              Choose your base Standard architectural design and customize finishes, foundations, and off-grid packs with instant pro-forma transparency.
            </p>
          </div>

          <div className="bg-tie-bg p-6 rounded-sm border border-tie-border space-y-3">
            <div className="w-10 h-10 rounded-sm bg-tie-pine/10 text-tie-pine flex items-center justify-center font-mono font-bold">
              02
            </div>
            <h4 className="font-serif text-lg font-bold text-tie-ink">Permits & Factory Build</h4>
            <p className="text-xs text-tie-muted leading-relaxed">
              We file pre-engineered plan sets with your municipal building department while our plant fabricates high-performance structural modules.
            </p>
          </div>

          <div className="bg-tie-bg p-6 rounded-sm border border-tie-border space-y-3">
            <div className="w-10 h-10 rounded-sm bg-tie-pine/10 text-tie-pine flex items-center justify-center font-mono font-bold">
              03
            </div>
            <h4 className="font-serif text-lg font-bold text-tie-ink">Crane Set in 1 Day</h4>
            <p className="text-xs text-tie-muted leading-relaxed">
              Modules are transported on escorted flatbeds and hoisted by a 120-ton crane onto your cured foundation in a single afternoon.
            </p>
          </div>

          <div className="bg-tie-bg p-6 rounded-sm border border-tie-border space-y-3">
            <div className="w-10 h-10 rounded-sm bg-tie-pine/10 text-tie-pine flex items-center justify-center font-mono font-bold">
              04
            </div>
            <h4 className="font-serif text-lg font-bold text-tie-ink">Blower Door & Handover</h4>
            <p className="text-xs text-tie-muted leading-relaxed">
              Our site superintendents complete utility hookups, architectural trim, and certified Passive House air tightness verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

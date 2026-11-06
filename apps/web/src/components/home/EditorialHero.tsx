import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EditorialHero: React.FC = () => {
  const { openConfigurator, setActiveTab } = useConfiguratorStore();

  const scrollToStandards = () => {
    setActiveTab('standards');
    const el = document.getElementById('standards-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-tie-bg border-b border-tie-border">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1C1B18_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Architectural Sub-badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-tie-surface border border-tie-border text-xs font-mono tracking-wide text-tie-pine">
              <span className="w-2 h-2 rounded-full bg-tie-terracotta animate-pulse" />
              <span>Modular Architecture &bull; Turnkey PropTech Platform</span>
            </div>

            {/* Editorial Serif Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-tie-ink leading-[1.08]">
              Precision modular architecture for{' '}
              <span className="italic font-normal text-tie-pine">enduring</span>{' '}
              landscapes.
            </h1>

            {/* Body Copy */}
            <p className="text-lg sm:text-xl text-tie-muted leading-relaxed font-sans max-w-2xl">
              TIE transforms custom homebuilding into a predictable, transparent consultative experience. Select from 8 modular architectural standards, configure options with real-time pro-forma pricing, and track offsite fabrication through our live digital field reports.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => openConfigurator()}
                className="inline-flex items-center justify-center px-7 py-4 rounded-sm text-base font-medium text-tie-bg bg-tie-pine hover:bg-tie-pine-hover shadow-tie-soft transition-all duration-200 group"
              >
                <Sparkles className="w-5 h-5 mr-2 text-tie-terracotta-light group-hover:rotate-12 transition-transform" />
                <span>Launch Interactive Configurator</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToStandards}
                className="inline-flex items-center justify-center px-6 py-4 rounded-sm text-base font-medium text-tie-ink bg-tie-surface hover:bg-tie-surface-light border border-tie-border transition-all duration-200"
              >
                <span>Browse Standards (8 Designs)</span>
              </button>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-tie-border text-xs font-sans text-tie-muted">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-tie-pine shrink-0" />
                <span>Fixed Fabrication Cost</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-tie-pine shrink-0" />
                <span>16–24 Week Completion</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-tie-terracotta shrink-0" />
                <span>Net-Zero Passive Envelope</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Main Card with Warm Editorial Framing */}
              <div className="relative rounded-sm overflow-hidden bg-tie-surface border border-tie-border p-2.5 shadow-tie-card">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                    alt="TIE Modular Dogtrot Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/80 via-transparent to-transparent" />

                  {/* Floating Architectural Badge */}
                  <div className="absolute top-4 left-4 bg-tie-bg/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-tie-border shadow-sm">
                    <span className="font-mono text-xs font-semibold text-tie-pine">
                      STANDARD 05 &bull; DOGTROT 1850
                    </span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-tie-bg p-3 bg-tie-ink/80 backdrop-blur-md rounded-sm border border-tie-border/30">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div>
                        <span className="text-tie-surface block text-[10px] uppercase tracking-wider">Footprint</span>
                        <span className="font-semibold text-sm">1,850 SQ FT</span>
                      </div>
                      <div>
                        <span className="text-tie-surface block text-[10px] uppercase tracking-wider">Bed / Bath</span>
                        <span className="font-semibold text-sm">3 BD / 2.5 BA</span>
                      </div>
                      <div>
                        <span className="text-tie-surface block text-[10px] uppercase tracking-wider">Timeline</span>
                        <span className="font-semibold text-sm text-amber-300">22 WEEKS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pro-Forma Pill */}
              <div className="absolute -bottom-6 -left-6 bg-tie-surface-light border border-tie-border p-4 rounded-sm shadow-tie-float hidden sm:block max-w-xs">
                <div className="flex items-center space-x-2 text-xs font-mono text-tie-muted mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>TRANSPARENT PRO-FORMA</span>
                </div>
                <div className="font-serif text-lg font-bold text-tie-ink">
                  $520,000 <span className="text-xs font-mono font-normal text-tie-muted">Base Fabrication</span>
                </div>
                <p className="text-[11px] text-tie-muted mt-1">
                  Itemized down to foundation, site prep, and 5% contingency reserve.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

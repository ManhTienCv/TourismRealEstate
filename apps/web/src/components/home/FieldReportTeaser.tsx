import React from 'react';
import { SEED_FIELD_REPORT } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Hammer, CloudSun, Calendar, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const FieldReportTeaser: React.FC = () => {
  const { setActiveTab } = useConfiguratorStore();
  const report = SEED_FIELD_REPORT;

  return (
    <section id="field-report-section" className="py-24 bg-tie-surface border-b border-tie-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-tie-bg rounded-sm border border-tie-border shadow-tie-card overflow-hidden">
          {/* Header Bar */}
          <div className="bg-tie-pine text-tie-bg p-6 sm:px-8 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-tie-terracotta flex items-center justify-center text-tie-bg">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-tie-terracotta-light">
                    ACTIVE FIELD REPORT &bull; CLIENT PORTAL
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                  {report.reportCode}: {report.clientName}
                </h3>
              </div>
            </div>

            {/* Weather & Site Metrics */}
            <div className="flex items-center space-x-6 text-xs font-mono text-tie-surface/90">
              <div className="flex items-center space-x-2">
                <CloudSun className="w-4 h-4 text-amber-300" />
                <span>{report.currentSiteConditions.tempFahrenheit}°F &bull; {report.currentSiteConditions.weatherCondition}</span>
              </div>
              <div className="hidden sm:block">
                <span>ELEVATION: {report.siteElevationFt} FT</span>
              </div>
            </div>
          </div>

          {/* Progress Tracker Strip */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase text-tie-muted block">
                  Current Construction Stage ({report.currentStageIndex + 1} of 6)
                </span>
                <h4 className="font-serif text-2xl font-bold text-tie-ink">
                  {report.currentStageName}
                </h4>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-tie-pine">
                  {report.overallProgressPercent}%
                </span>
                <span className="text-xs font-mono text-tie-muted">Overall Complete</span>
              </div>
            </div>

            {/* 6 Stage Graphical Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {report.stages.map((stage) => {
                const isComplete = stage.status === 'completed';
                const isCurrent = stage.status === 'in_progress';
                return (
                  <div
                    key={stage.stageCode}
                    className={`p-3 rounded-sm border text-xs flex flex-col justify-between ${
                      isComplete
                        ? 'bg-tie-surface text-tie-ink border-tie-pine/40'
                        : isCurrent
                        ? 'bg-tie-surface-light text-tie-pine border-2 border-tie-terracotta shadow-sm'
                        : 'bg-tie-bg/60 text-tie-subtle border-tie-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase">
                        Stage {stage.stageIndex + 1}
                      </span>
                      {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-tie-pine" />}
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-tie-terracotta animate-ping" />}
                    </div>
                    <div className="font-serif font-bold text-sm leading-tight mb-2">
                      {stage.shortName}
                    </div>
                    <div className="font-mono text-[10px] text-tie-muted">
                      {isComplete ? '100% Done' : isCurrent ? `${stage.progressPercent}% Active` : 'Queued'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Latest Field Update Log Snippet */}
            <div className="bg-tie-surface p-4 sm:p-6 rounded-sm border border-tie-border grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-tie-muted">
                  <Calendar className="w-3.5 h-3.5 text-tie-pine" />
                  <span>Latest Log: Week {report.updates[0].weekNumber} &bull; {report.updates[0].date}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    Inspector Approved
                  </span>
                </div>
                <h5 className="font-serif text-lg font-bold text-tie-ink">
                  {report.updates[0].title}
                </h5>
                <p className="text-xs sm:text-sm text-tie-muted line-clamp-2 leading-relaxed font-sans">
                  {report.updates[0].summary}
                </p>
                <div className="text-[11px] font-mono text-tie-pine pt-1">
                  Active Crew: {report.updates[0].activeTradeCrew}
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-stretch gap-3">
                <button
                  onClick={() => {
                    setActiveTab('field-report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-sm text-xs font-semibold text-tie-bg bg-tie-pine hover:bg-tie-pine-hover shadow-tie-soft transition-all"
                >
                  <span>Open Full Field Report Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
                <span className="text-center font-mono text-[10px] text-tie-muted">
                  Real-time photo logs &bull; 120-ton crane lift footage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

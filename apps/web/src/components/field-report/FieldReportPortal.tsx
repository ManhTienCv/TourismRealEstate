import React, { useState } from 'react';
import { SEED_FIELD_REPORT, FieldReportStage, FieldReportLogUpdate } from '@tie/shared';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  Hammer,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export const FieldReportPortal: React.FC = () => {
  const { setActiveTab } = useConfiguratorStore();
  const report = SEED_FIELD_REPORT;
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(report.currentStageIndex);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  return (
    <div className="py-12 bg-tie-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-tie-border pb-4">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('home')}
              className="text-tie-muted hover:text-tie-ink transition-colors"
            >
              Home
            </button>
            <span className="text-tie-subtle">/</span>
            <span className="text-tie-pine font-semibold">TIE Field Report</span>
            <span className="text-tie-subtle">/</span>
            <span className="text-tie-muted">{report.reportCode}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-tie-ink font-semibold">LIVE ACTIVE BUILD</span>
          </div>
        </div>

        {/* Client Portal Hero Banner */}
        <div className="bg-tie-surface rounded-sm border border-tie-border p-6 sm:p-10 shadow-tie-card space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-tie-bg border border-tie-border text-xs font-mono text-tie-pine font-semibold">
                <Hammer className="w-3.5 h-3.5 text-tie-terracotta" />
                <span>FIELD REPORT PORTAL &bull; {report.reportCode}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-tie-ink">
                {report.clientName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-tie-muted pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-tie-terracotta" />
                  <span>{report.siteAddress}</span>
                </span>
                <span>&bull;</span>
                <span>PLAN: <strong>{report.standardPlanName}</strong> ({report.sqft} SQFT)</span>
              </div>
            </div>

            {/* Weather & Site Station Card */}
            <div className="bg-tie-bg p-5 rounded-sm border border-tie-border shadow-sm flex items-center space-x-6 font-mono text-xs shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-tie-muted block">Catskills Site Station</span>
                <div className="flex items-center space-x-2 text-tie-ink font-bold text-base">
                  <CloudSun className="w-5 h-5 text-amber-500" />
                  <span>{report.currentSiteConditions.tempFahrenheit}°F</span>
                </div>
                <span className="text-[11px] text-tie-muted font-sans block">{report.currentSiteConditions.weatherCondition}</span>
              </div>
              <div className="border-l border-tie-border pl-6 space-y-1">
                <span className="text-[10px] uppercase text-tie-muted block">Site Elevation</span>
                <span className="font-bold text-sm text-tie-ink">{report.siteElevationFt} FT</span>
                <span className="text-[10px] text-tie-muted block">Wind: {report.currentSiteConditions.windMph} mph</span>
              </div>
            </div>
          </div>

          {/* Overall Progress Gauge */}
          <div className="space-y-3 pt-4 border-t border-tie-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-tie-muted uppercase">Overall Project Progress</span>
              <span className="text-tie-pine font-bold text-sm">{report.overallProgressPercent}% Complete</span>
            </div>
            <div className="w-full bg-tie-bg h-3 rounded-full overflow-hidden border border-tie-border">
              <div
                className="bg-tie-pine h-full rounded-full transition-all duration-700"
                style={{ width: `${report.overallProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-tie-muted">
              <span>Groundbreaking: {report.startDate}</span>
              <span className="text-tie-pine font-semibold">Target Handover: {report.estimatedCompletionDate}</span>
            </div>
          </div>
        </div>

        {/* 6 STAGES OF TIE MODULAR CONSTRUCTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-tie-ink">
              The 6 Construction Stages
            </h2>
            <span className="font-mono text-xs text-tie-muted">
              Click stage to view deliverables & inspector sign-offs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {report.stages.map((stage: FieldReportStage) => {
              const isSelected = selectedStageIndex === stage.stageIndex;
              const isCompleted = stage.status === 'completed';
              const isInProgress = stage.status === 'in_progress';

              return (
                <div
                  key={stage.stageCode}
                  onClick={() => setSelectedStageIndex(isSelected ? null : stage.stageIndex)}
                  className={`bg-tie-surface rounded-sm border p-6 transition-all cursor-pointer flex flex-col justify-between ${
                    isInProgress
                      ? 'border-2 border-tie-terracotta shadow-tie-card bg-tie-surface-light'
                      : isCompleted
                      ? 'border-tie-pine/50 shadow-sm'
                      : 'border-tie-border opacity-75'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-tie-pine">
                        STAGE 0{stage.stageIndex + 1}
                      </span>
                      {isCompleted && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Passed
                        </span>
                      )}
                      {isInProgress && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-800 animate-pulse">
                          Active Now
                        </span>
                      )}
                      {stage.status === 'upcoming' && (
                        <span className="text-[10px] font-mono text-tie-subtle">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-tie-ink">
                      {stage.name}
                    </h3>
                    <p className="text-xs text-tie-muted leading-relaxed font-sans">
                      {stage.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="pt-3 border-t border-tie-border space-y-2">
                      <span className="font-mono text-[10px] uppercase text-tie-muted block">
                        Verification Milestones
                      </span>
                      {stage.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2 text-xs">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                              del.completed ? 'text-tie-pine' : 'text-tie-border'
                            }`}
                          />
                          <span className={del.completed ? 'text-tie-ink' : 'text-tie-subtle'}>
                            {del.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inspector Stamp */}
                  {stage.inspectorSignOff && stage.inspectorName && (
                    <div className="mt-4 pt-3 border-t border-tie-border flex items-center space-x-2 text-[11px] font-mono text-tie-pine">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-tie-pine" />
                      <span className="truncate">Sign-off: {stage.inspectorName}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* WEEKLY FIELD LOG UPDATES & PHOTO DOCUMENTATION */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-tie-ink">
                Weekly Field Superintendent Logs
              </h2>
              <p className="text-xs text-tie-muted mt-0.5">
                Onsite photographic proof, torque certifications, and crane logs logged weekly
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded bg-tie-surface border border-tie-border text-tie-pine font-semibold">
              {report.updates.length} VERIFIED LOGS
            </span>
          </div>

          <div className="space-y-8">
            {report.updates.map((update: FieldReportLogUpdate) => {
              return (
                <div
                  key={update.id}
                  className="bg-tie-surface rounded-sm border border-tie-border p-6 sm:p-8 space-y-6 shadow-tie-soft"
                >
                  {/* Log Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-tie-border pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-sm bg-tie-pine text-tie-bg flex items-center justify-center font-mono font-bold text-xs">
                        W{update.weekNumber}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-mono text-tie-muted">
                          <span>{update.date}</span>
                          <span>&bull;</span>
                          <span className="text-tie-pine font-semibold">{update.stageName}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-tie-ink">
                          {update.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-tie-bg border border-tie-border text-tie-muted">
                        {update.weather}
                      </span>
                      {update.qualityInspectionPassed && (
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>QA Passed</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-sm text-tie-muted leading-relaxed font-sans">
                    {update.summary}
                  </p>

                  {/* Active Crew & Inspector Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-tie-bg p-3.5 rounded-sm border border-tie-border">
                    <div>
                      <span className="text-[10px] uppercase text-tie-muted block">Trade Crew Active</span>
                      <span className="font-semibold text-tie-ink">{update.activeTradeCrew}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-tie-muted block">Logged By</span>
                      <span className="font-semibold text-tie-pine">{update.loggedBy}</span>
                    </div>
                  </div>

                  {/* Photo Documentation Gallery */}
                  {update.photoUrls.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-tie-muted block">
                        High-Resolution Field Photographs
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {update.photoUrls.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => setActivePhotoModal(photo.url)}
                            className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-tie-border bg-tie-bg cursor-pointer shadow-sm"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-tie-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 left-2 right-2 text-tie-bg text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                              {photo.caption}
                            </div>
                            <div className="absolute top-2 right-2 bg-tie-ink/80 text-tie-bg px-2 py-0.5 rounded text-[10px] font-mono">
                              {photo.tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Full Photo Lightbox Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-tie-ink/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={activePhotoModal}
            alt="Expanded Field Photo"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm border border-tie-border"
          />
        </div>
      )}
    </div>
  );
};

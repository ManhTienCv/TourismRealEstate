import { StandardPlanSlug } from './standard-plan';

export interface FieldReportStage {
  stageIndex: number; // 0 to 5
  stageCode: 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5' | 'stage_6';
  code?: 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5' | 'stage_6';
  name: string;
  shortName: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercent: number; // 0 to 100
  targetCompletionDate: string;
  actualCompletionDate?: string;
  inspectorSignOff: boolean;
  inspectorName?: string;
  deliverables: {
    title: string;
    completed: boolean;
  }[];
}

export interface FieldReportLogUpdate {
  id: string;
  fieldReportId: string;
  date: string;
  weekNumber: number;
  stageCode: string;
  stageName: string;
  title: string;
  summary: string;
  weather: string;
  activeTradeCrew: string;
  inspectorNotes?: string;
  photoUrls: {
    url: string;
    caption: string;
    tag: string;
  }[];
  qualityInspectionPassed: boolean;
  loggedBy: string;
}

export interface FieldReportProject {
  id: string;
  reportCode: string; // e.g. "TIE-FR-CATSKILLS-04"
  clientName: string;
  clientInitials: string;
  siteAddress: string;
  siteRegion: string;
  standardPlanSlug: StandardPlanSlug;
  standardPlanName: string;
  sqft: number;
  currentStageIndex: number; // 0 to 5
  currentStageName: string;
  overallProgressPercent: number;
  startDate: string;
  estimatedCompletionDate: string;
  siteElevationFt: number;
  currentSiteConditions: {
    tempFahrenheit: number;
    weatherCondition: string;
    windMph: number;
  };
  stages: FieldReportStage[];
  updates: FieldReportLogUpdate[];
  liveCameraAvailable: boolean;
}

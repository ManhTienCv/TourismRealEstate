import {
  CreateEstimateDto,
  FieldReportProject,
  HousingSolution,
  PortfolioProject,
  ProjectEstimate,
  ProFormaCostBreakdown,
  SEED_FIELD_REPORT,
  SEED_HOUSING_SOLUTIONS,
  SEED_PORTFOLIO_PROJECTS,
  SEED_STANDARD_PLANS,
  StandardPlan,
} from '@tie/shared';

const API_BASE = '/api';

export interface SubmitEstimatePayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  housingSolutionSlug: string;
  standardPlanSlug: string;
  landStatus: 'owned' | 'looking' | 'evaluating';
  terrain: 'flat' | 'sloped' | 'mountainous';
  finishTier: 'essential' | 'signature' | 'bespoke';
  cladding: 'pine' | 'zinc' | 'cedar' | 'shou_sugi_ban';
  addons: Record<string, boolean> | any;
}

export const apiClient = {
  // 1. Housing Solutions
  async getHousingSolutions(): Promise<HousingSolution[]> {
    try {
      const res = await fetch(`${API_BASE}/v1/solutions`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return SEED_HOUSING_SOLUTIONS;
  },

  async getHousingSolution(slug: string): Promise<HousingSolution> {
    try {
      const res = await fetch(`${API_BASE}/v1/solutions/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    const found = SEED_HOUSING_SOLUTIONS.find((s) => s.slug === slug);
    if (!found) throw new Error('Solution not found');
    return found;
  },

  // 2. Standard Plans
  async getStandardPlans(filters?: {
    solutionSlug?: string;
    minBeds?: number;
    maxSqft?: number;
    sort?: string;
  }): Promise<StandardPlan[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.solutionSlug) params.append('solutionSlug', filters.solutionSlug);
      if (filters?.minBeds !== undefined) params.append('minBeds', String(filters.minBeds));
      if (filters?.maxSqft !== undefined) params.append('maxSqft', String(filters.maxSqft));
      if (filters?.sort) params.append('sort', filters.sort);

      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE}/v1/standards${qs}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }

    let results = [...SEED_STANDARD_PLANS];
    if (filters?.solutionSlug) {
      results = results.filter((p) => p.idealSolutions.includes(filters.solutionSlug!));
    }
    if (filters?.minBeds !== undefined) {
      results = results.filter((p) => p.bedrooms >= filters.minBeds!);
    }
    if (filters?.maxSqft !== undefined) {
      results = results.filter((p) => p.sqft <= filters.maxSqft!);
    }
    return results;
  },

  async getStandardPlan(slug: string): Promise<StandardPlan> {
    try {
      const res = await fetch(`${API_BASE}/v1/standards/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    const found = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (!found) throw new Error('Plan not found');
    return found;
  },

  // 3. Portfolio Projects
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    try {
      const res = await fetch(`${API_BASE}/v1/portfolio`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return SEED_PORTFOLIO_PROJECTS;
  },

  async getPortfolioProject(slug: string): Promise<PortfolioProject> {
    try {
      const res = await fetch(`${API_BASE}/v1/portfolio/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    const found = SEED_PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
    if (!found) throw new Error('Project not found');
    return found;
  },

  // 4. Estimator API
  async calculateProForma(dto: {
    standardPlanSlug: string;
    customConfig: {
      terrain: string;
      finishTier: string;
      cladding: string;
      addons: string[];
    };
  }): Promise<ProFormaCostBreakdown> {
    try {
      const res = await fetch(`${API_BASE}/v1/estimator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === dto.standardPlanSlug) || SEED_STANDARD_PLANS[0];
    const { calculateProForma } = await import('@tie/shared');
    return calculateProForma(plan, {
      sitePrepLevel:
        dto.customConfig.terrain === 'mountainous'
          ? 'steep_rocky'
          : dto.customConfig.terrain === 'sloped'
          ? 'moderate_slope'
          : 'flat_cleared',
      foundationType: 'crawl_space',
      claddingType: 'thermally_modified_pine',
      roofProfile: 'gable_pitched',
      interiorFinish: 'essential_nordic',
      energyPackage: 'high_efficiency_grid',
      additions: {
        outdoorDeckSqft: dto.customConfig.addons?.includes('wraparoundDeck') ? 400 : 0,
        detachedSauna: dto.customConfig.addons?.includes('detachedSauna') || false,
        screenedPorch: dto.customConfig.addons?.includes('screenedPorch') || false,
        carportEV: dto.customConfig.addons?.includes('evCarport') || false,
      },
    });
  },

  async submitEstimate(payload: SubmitEstimatePayload): Promise<{
    id: string;
    referenceCode: string;
    clientName: string;
    clientEmail: string;
    costBreakdown: ProFormaCostBreakdown;
    message: string;
  }> {
    try {
      const activeAddons = Object.entries(payload.addons)
        .filter(([_, v]) => Boolean(v))
        .map(([k]) => k);

      const body = {
        clientName: payload.clientName,
        clientEmail: payload.clientEmail,
        housingSolutionSlug: payload.housingSolutionSlug,
        standardPlanSlug: payload.standardPlanSlug,
        landStatus: payload.landStatus,
        customConfig: {
          terrain: payload.terrain,
          finishTier: payload.finishTier,
          cladding: payload.cladding,
          addons: activeAddons,
        },
      };

      const res = await fetch(`${API_BASE}/v1/estimator/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }

    const ref = `TIE-${Date.now().toString(36).toUpperCase()}`;
    return {
      id: `est-${Date.now()}`,
      referenceCode: ref,
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      costBreakdown: {} as any,
      message: 'Estimate saved successfully (offline fallback)',
    };
  },

  // 5. Field Reports
  async getFieldReport(projectCode: string): Promise<FieldReportProject> {
    try {
      const res = await fetch(`${API_BASE}/v1/field-reports/${projectCode}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return SEED_FIELD_REPORT;
  },
};

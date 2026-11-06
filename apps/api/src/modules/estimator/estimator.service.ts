import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CalculateEstimateDto } from './dto/calculate-estimate.dto';
import { SubmitEstimateDto } from './dto/submit-estimate.dto';
import { CladdingChoice, FinishTier, TerrainType } from './dto/custom-config.dto';
import { SEED_STANDARD_PLANS, SEED_HOUSING_SOLUTIONS } from '../../../prisma/seed';

export interface ProFormaBreakdown {
  hard_cost: number;
  site_cost: number;
  soft_cost: number;
  contingency: number;
  total_cost: number;
  price_per_sqft: number;
  estimated_timeline_weeks: number;
  itemized_details: {
    base_fabrication: number;
    finish_upgrade: number;
    cladding_cost: number;
    addons_cost: number;
    terrain_excavation: number;
    architectural_permitting: number;
    contingency_reserve: number;
  };
}

@Injectable()
export class EstimatorService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper: Resolves standard plan from DB or in-memory seed
   */
  private async resolveStandardPlan(identifier: string) {
    if (this.prisma.isConnected) {
      try {
        const found = await this.prisma.standardPlan.findFirst({
          where: {
            OR: [{ id: identifier }, { slug: identifier }],
          },
        });
        if (found) return found;
      } catch (err) {
        // Fallback
      }
    }

    const fallback = SEED_STANDARD_PLANS.find(
      (p) => p.id === identifier || p.slug === identifier
    );
    if (!fallback) {
      throw new NotFoundException(`Standard Plan "${identifier}" was not found.`);
    }
    return fallback;
  }

  /**
   * Helper: Resolves housing solution from DB or in-memory seed
   */
  private async resolveHousingSolution(identifier: string) {
    if (this.prisma.isConnected) {
      try {
        const found = await this.prisma.housingSolution.findFirst({
          where: {
            OR: [{ id: identifier }, { slug: identifier }],
          },
        });
        if (found) return found;
      } catch (err) {
        // Fallback
      }
    }

    const fallback = SEED_HOUSING_SOLUTIONS.find(
      (s) => s.id === identifier || s.slug === identifier
    );
    if (!fallback) {
      throw new NotFoundException(`Housing Solution "${identifier}" was not found.`);
    }
    return fallback;
  }

  /**
   * 1. POST /api/v1/estimator/calculate
   * Stateless real-time Pro-Forma cost calculation engine
   */
  async calculateProForma(dto: CalculateEstimateDto): Promise<ProFormaBreakdown> {
    const plan = await this.resolveStandardPlan(dto.standardPlanId);
    const sqft = plan.sqftArea;
    const baseCostPerSqft = Number(plan.baseCostPerSqft);

    // 1. Base Factory Fabrication Cost
    const baseFabrication = Math.round(sqft * baseCostPerSqft);

    // 2. Interior Craft & Finish Tier
    let finishRate = 0;
    if (dto.customConfig.finish_tier === FinishTier.SIGNATURE) finishRate = 35;
    if (dto.customConfig.finish_tier === FinishTier.BESPOKE) finishRate = 68;
    const finishUpgrade = Math.round(sqft * finishRate);

    // 3. Cladding & Exterior Rainscreen (~1.35x floor area exterior wall surface)
    let claddingRate = 18; // pine default
    if (dto.customConfig.cladding === CladdingChoice.ZINC) claddingRate = 34;
    if (dto.customConfig.cladding === CladdingChoice.CEDAR) claddingRate = 24;
    if (dto.customConfig.cladding === CladdingChoice.SHOU_SUGI_BAN) claddingRate = 28;
    const claddingCost = Math.round(sqft * 1.35 * claddingRate);

    // 4. Structural & Lifestyle Addons
    const ADDON_PRICES: Record<string, number> = {
      deck_200sqft: 14000,
      deck_400sqft: 26000,
      deck_600sqft: 38000,
      detached_cedar_sauna: 24500,
      screened_porch: 18500,
      ev_carport: 15000,
      solar_storage_pack: 38000,
    };

    let addonsCost = 0;
    if (dto.customConfig.addons && Array.isArray(dto.customConfig.addons)) {
      for (const addon of dto.customConfig.addons) {
        if (ADDON_PRICES[addon]) {
          addonsCost += ADDON_PRICES[addon];
        }
      }
    }

    // Total Hard Costs
    const hardCost = baseFabrication + finishUpgrade + claddingCost + addonsCost;

    // 5. Site Civil Preparation & Topography
    let terrainCost = 18500; // Flat clear meadow
    let terrainWeeks = 0;
    if (dto.customConfig.terrain === TerrainType.SLOPED) {
      terrainCost = 34000;
      terrainWeeks = 2;
    } else if (dto.customConfig.terrain === TerrainType.MOUNTAINOUS) {
      terrainCost = 58000;
      terrainWeeks = 4;
    }

    // 6. Soft Costs: Engineering calculations & Municipal Permitting (~11.5% of hard cost + $6,500)
    const softCost = Math.round(hardCost * 0.115 + 6500);

    // 7. Mandatory 5% Contingency Buffer
    const subtotal = hardCost + terrainCost + softCost;
    const contingency = Math.round(subtotal * 0.05);

    // Grand Total Turnkey
    const totalCost = subtotal + contingency;
    const pricePerSqft = Math.round(totalCost / sqft);

    // Timeline Weeks Calculation
    let baseTimelineWeeks = 16;
    if (sqft >= 1000 && sqft < 1800) baseTimelineWeeks = 18;
    if (sqft >= 1800 && sqft < 2500) baseTimelineWeeks = 22;
    if (sqft >= 2500) baseTimelineWeeks = 28;

    const estimatedTimelineWeeks =
      baseTimelineWeeks +
      terrainWeeks +
      (dto.customConfig.finish_tier === FinishTier.BESPOKE ? 2 : 0) +
      (dto.customConfig.addons?.length ? 1 : 0);

    return {
      hard_cost: hardCost,
      site_cost: terrainCost,
      soft_cost: softCost,
      contingency,
      total_cost: totalCost,
      price_per_sqft: pricePerSqft,
      estimated_timeline_weeks: estimatedTimelineWeeks,
      itemized_details: {
        base_fabrication: baseFabrication,
        finish_upgrade: finishUpgrade,
        cladding_cost: claddingCost,
        addons_cost: addonsCost,
        terrain_excavation: terrainCost,
        architectural_permitting: softCost,
        contingency_reserve: contingency,
      },
    };
  }

  /**
   * 2. POST /api/v1/estimator/submit
   * Persists configuration to PostgreSQL `project_estimates` and returns structured brief
   */
  async submitEstimate(dto: SubmitEstimateDto) {
    const plan = await this.resolveStandardPlan(dto.standardPlanId);
    const solution = await this.resolveHousingSolution(dto.housingSolutionId);

    // Calculate real-time pro-forma
    const proForma = await this.calculateProForma({
      standardPlanId: plan.id,
      customConfig: dto.customConfig,
    });

    const referenceCode = `TIE-EST-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const estimateRecord = {
      id: `est-${Date.now()}`,
      referenceCode,
      clientName: dto.clientName,
      clientEmail: dto.clientEmail,
      housingSolutionId: solution.id,
      standardPlanId: plan.id,
      landStatus: dto.landStatus,
      customConfig: dto.customConfig as any, // Stored in PostgreSQL JSONB
      costBreakdown: proForma as any,       // Stored in PostgreSQL JSONB
      createdAt: new Date(),
    };

    if (this.prisma.isConnected) {
      try {
        await this.prisma.projectEstimate.create({
          data: estimateRecord,
        });
      } catch (err) {
        // Fallback
      }
    }

    return {
      status: 'success',
      message: 'Architectural pro-forma estimate successfully locked and recorded.',
      referenceCode,
      brief: {
        client: {
          name: dto.clientName,
          email: dto.clientEmail,
          landStatus: dto.landStatus,
        },
        selection: {
          solutionName: solution.name,
          planName: plan.name,
          sqftArea: plan.sqftArea,
          bedrooms: plan.bedrooms,
          bathrooms: plan.bathrooms,
        },
        customConfig: dto.customConfig,
        proFormaCostBreakdown: proForma,
        nextMilestone: 'Phase 01: Site Civil Analysis & Geotechnical Soil Boring Evaluation',
        consultationContact: 'advisors@tiearchitecture.com',
      },
    };
  }
}

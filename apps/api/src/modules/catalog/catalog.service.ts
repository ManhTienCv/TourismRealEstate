import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StandardsFilterDto, StandardSortOption } from './dto/standards-filter.dto';
import {
  SEED_HOUSING_SOLUTIONS,
  SEED_STANDARD_PLANS,
  SEED_PORTFOLIO_PROJECTS,
} from '../../../prisma/seed';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. GET /api/v1/solutions
   * Returns all 8 Housing Solutions with linked Standard Plans.
   */
  async getSolutions() {
    if (this.prisma.isConnected) {
      try {
        const solutions = await this.prisma.housingSolution.findMany({
          include: {
            standardPlans: {
              include: {
                standardPlan: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        });

        if (solutions.length > 0) {
          return solutions.map((sol) => ({
            id: sol.id,
            name: sol.name,
            slug: sol.slug,
            tagline: sol.tagline,
            description: sol.description,
            svgIconUrl: sol.svgIconUrl,
            standardPlans: sol.standardPlans.map((sp) => sp.standardPlan),
          }));
        }
      } catch (err) {
        // Fallback to high-fidelity in-memory seed dataset
      }
    }

    // In-memory relational mapping fallback
    return SEED_HOUSING_SOLUTIONS.map((sol) => {
      const linkedPlans = SEED_STANDARD_PLANS.filter((p) =>
        p.solutionSlugs.includes(sol.slug)
      ).map(({ solutionSlugs, ...p }) => p);

      return {
        ...sol,
        standardPlans: linkedPlans,
      };
    });
  }

  /**
   * 2. GET /api/v1/standards
   * Returns filterable list of Standard Plans (solutionSlug, minBeds, maxSqft, sort).
   */
  async getStandards(filter: StandardsFilterDto) {
    if (this.prisma.isConnected) {
      try {
        const whereClause: any = {};

        if (filter.minBeds !== undefined) {
          whereClause.bedrooms = { gte: filter.minBeds };
        }
        if (filter.maxSqft !== undefined) {
          whereClause.sqftArea = { lte: filter.maxSqft };
        }
        if (filter.solutionSlug) {
          whereClause.housingSolutions = {
            some: {
              housingSolution: {
                slug: filter.solutionSlug,
              },
            },
          };
        }

        let orderBy: any = { sqftArea: 'asc' };
        if (filter.sort === StandardSortOption.SQFT_DESC) orderBy = { sqftArea: 'desc' };
        if (filter.sort === StandardSortOption.PRICE_ASC) orderBy = { baseCostPerSqft: 'asc' };
        if (filter.sort === StandardSortOption.PRICE_DESC) orderBy = { baseCostPerSqft: 'desc' };
        if (filter.sort === StandardSortOption.NAME_ASC) orderBy = { name: 'asc' };

        const dbPlans = await this.prisma.standardPlan.findMany({
          where: whereClause,
          orderBy,
          include: {
            housingSolutions: {
              include: {
                housingSolution: true,
              },
            },
          },
        });

        if (dbPlans.length > 0) {
          return dbPlans.map((plan) => ({
            ...plan,
            compatibleSolutions: plan.housingSolutions.map((hs) => hs.housingSolution),
          }));
        }
      } catch (err) {
        // Fallback
      }
    }

    // In-memory filtering fallback
    let filtered = SEED_STANDARD_PLANS.filter((plan) => {
      if (filter.solutionSlug && !plan.solutionSlugs.includes(filter.solutionSlug)) {
        return false;
      }
      if (filter.minBeds !== undefined && plan.bedrooms < filter.minBeds) {
        return false;
      }
      if (filter.maxSqft !== undefined && plan.sqftArea > filter.maxSqft) {
        return false;
      }
      return true;
    });

    if (filter.sort === StandardSortOption.SQFT_DESC) {
      filtered = filtered.sort((a, b) => b.sqftArea - a.sqftArea);
    } else if (filter.sort === StandardSortOption.PRICE_ASC) {
      filtered = filtered.sort((a, b) => a.baseCostPerSqft - b.baseCostPerSqft);
    } else if (filter.sort === StandardSortOption.PRICE_DESC) {
      filtered = filtered.sort((a, b) => b.baseCostPerSqft - a.baseCostPerSqft);
    } else if (filter.sort === StandardSortOption.NAME_ASC) {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => a.sqftArea - b.sqftArea);
    }

    return filtered.map((plan) => {
      const compatibleSolutions = SEED_HOUSING_SOLUTIONS.filter((s) =>
        plan.solutionSlugs.includes(s.slug)
      );
      const { solutionSlugs, ...rest } = plan;
      return {
        ...rest,
        compatibleSolutions,
      };
    });
  }

  /**
   * 3. GET /api/v1/standards/:slug
   * Returns detailed view of a Standard Plan including compatible Solutions and realized Portfolio Projects.
   */
  async getStandardBySlug(slug: string) {
    if (this.prisma.isConnected) {
      try {
        const item = await this.prisma.standardPlan.findUnique({
          where: { slug },
          include: {
            housingSolutions: {
              include: {
                housingSolution: true,
              },
            },
            portfolioProjects: {
              include: {
                housingSolution: true,
              },
            },
          },
        });

        if (item) {
          return {
            ...item,
            compatibleSolutions: item.housingSolutions.map((hs) => hs.housingSolution),
            realizedProjects: item.portfolioProjects,
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (!plan) {
      throw new NotFoundException(`Standard Plan with slug "${slug}" was not found.`);
    }

    const compatibleSolutions = SEED_HOUSING_SOLUTIONS.filter((s) =>
      plan.solutionSlugs.includes(s.slug)
    );
    const realizedProjects = SEED_PORTFOLIO_PROJECTS.filter(
      (p) => p.standardPlanSlug === slug
    );

    const { solutionSlugs, ...rest } = plan;
    return {
      ...rest,
      compatibleSolutions,
      realizedProjects,
    };
  }

  /**
   * 4. GET /api/v1/portfolio
   * Lists realized case studies with relational metadata tags.
   */
  async getPortfolio() {
    if (this.prisma.isConnected) {
      try {
        const projects = await this.prisma.portfolioProject.findMany({
          include: {
            standardPlan: true,
            housingSolution: true,
          },
          orderBy: { createdAt: 'desc' },
        });

        if (projects.length > 0) return projects;
      } catch (err) {
        // Fallback
      }
    }

    return SEED_PORTFOLIO_PROJECTS.map((proj) => {
      const standardPlan = SEED_STANDARD_PLANS.find((p) => p.slug === proj.standardPlanSlug);
      const housingSolution = SEED_HOUSING_SOLUTIONS.find((s) => s.slug === proj.housingSolutionSlug);
      return {
        ...proj,
        standardPlan,
        housingSolution,
      };
    });
  }
}

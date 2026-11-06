import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SEED_FIELD_REPORTS } from '../../../prisma/seed';

@Injectable()
export class FieldReportService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * GET /api/v1/field-reports/:projectCode
   * Fetches 6-stage construction tracking data and budget variance metrics.
   */
  async getByProjectCode(projectCode: string) {
    if (this.prisma.isConnected) {
      try {
        const found = await this.prisma.fieldReport.findUnique({
          where: { projectCode },
        });
        if (found) {
          return {
            ...found,
            estimatedBudget: Number(found.estimatedBudget),
            actualSpent: Number(found.actualSpent),
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    const fallback = SEED_FIELD_REPORTS.find(
      (r) =>
        r.projectCode.toLowerCase() === projectCode.toLowerCase() ||
        projectCode.toLowerCase() === 'latest' ||
        projectCode.toLowerCase() === 'demo'
    );

    if (!fallback) {
      throw new NotFoundException(`Field Report with project code "${projectCode}" was not found.`);
    }

    return fallback;
  }

  /**
   * Helper: List all active field reports for administration or multi-project client portal
   */
  async getAllReports() {
    if (this.prisma.isConnected) {
      try {
        const reports = await this.prisma.fieldReport.findMany({
          orderBy: { createdAt: 'desc' },
        });
        if (reports.length > 0) {
          return reports.map((r) => ({
            ...r,
            estimatedBudget: Number(r.estimatedBudget),
            actualSpent: Number(r.actualSpent),
          }));
        }
      } catch (err) {
        // Fallback
      }
    }

    return SEED_FIELD_REPORTS;
  }
}

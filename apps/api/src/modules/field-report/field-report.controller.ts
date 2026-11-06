import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FieldReportService } from './field-report.service';

@ApiTags('Field Reports (6-Stage Construction Progress Tracker)')
@Controller('field-reports')
export class FieldReportController {
  constructor(private readonly fieldReportService: FieldReportService) {}

  @Get()
  @ApiOperation({
    summary: 'List all active field construction tracking projects',
  })
  @ApiResponse({ status: 200, description: 'List of active field report projects' })
  async getAllReports() {
    return this.fieldReportService.getAllReports();
  }

  @Get(':projectCode')
  @ApiOperation({
    summary: 'Fetch 6-stage construction tracking data and budget variance metrics',
    description:
      'Retrieves the 6-stage lifecycle tracking details (01. Site Analysis -> 02. Budget & Program -> 03. Standard Selection -> 04. Custom Modification -> 05. Permitting -> 06. Construction) including current stage, deliverables, inspector sign-offs, estimated budget, actual spent, and variance percentage.',
  })
  @ApiParam({
    name: 'projectCode',
    description: 'Unique field project code (e.g. TIE-FR-CATSKILLS-0482 or "latest")',
    example: 'TIE-FR-CATSKILLS-0482',
  })
  @ApiResponse({ status: 200, description: 'Construction progress tracking report with stage history and variance' })
  @ApiResponse({ status: 404, description: 'Project report not found' })
  async getByProjectCode(@Param('projectCode') projectCode: string) {
    return this.fieldReportService.getByProjectCode(projectCode);
  }
}

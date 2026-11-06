import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EstimatorService } from './estimator.service';
import { CalculateEstimateDto } from './dto/calculate-estimate.dto';
import { SubmitEstimateDto } from './dto/submit-estimate.dto';

@ApiTags('Estimator (Pro-Forma Calculation & Configuration Engine)')
@Controller('estimator')
export class EstimatorController {
  constructor(private readonly estimatorService: EstimatorService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Stateless real-time Pro-Forma cost calculation',
    description:
      'Calculates an itemized construction pro-forma (Hard Cost, Site Civil Cost, Soft Cost, 5% Contingency Buffer, and Total Cost per sqft) based on standardPlanId, terrain, finish tier, cladding choice, and structural addons.',
  })
  @ApiResponse({
    status: 200,
    description: 'Computed itemized pro-forma cost breakdown and estimated timeline weeks',
  })
  async calculate(@Body() dto: CalculateEstimateDto) {
    return this.estimatorService.calculateProForma(dto);
  }

  @Post('submit')
  @ApiOperation({
    summary: 'Save configuration to PostgreSQL JSONB and generate structured project brief',
    description:
      'Persists custom configuration specs and itemized pro-forma breakdown into the project_estimates table (utilizing PostgreSQL JSONB fields), issuing a unique reference code.',
  })
  @ApiResponse({
    status: 201,
    description: 'Estimate successfully saved with generated reference code and project brief',
  })
  async submit(@Body() dto: SubmitEstimateDto) {
    return this.estimatorService.submitEstimate(dto);
  }
}

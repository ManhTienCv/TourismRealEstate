import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { StandardsFilterDto } from './dto/standards-filter.dto';

@ApiTags('Catalog (Solutions, Standards & Portfolio)')
@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('solutions')
  @ApiOperation({
    summary: 'List all 8 Housing Solutions with linked Standard Plans',
    description:
      'Retrieves the 8 foundational Huts.com buyer use-case solutions (Starter, Forever, Second, Hybrid, ADU, Investment, Micro-Hospitality, Multi-Gen Compound) along with all pre-engineered standard plans associated via the pivot table.',
  })
  @ApiResponse({ status: 200, description: 'List of housing solutions with linked standard plans' })
  async getSolutions() {
    return this.catalogService.getSolutions();
  }

  @Get('standards')
  @ApiOperation({
    summary: 'Filterable list of Standard Plans (TIE Standards)',
    description:
      'Returns the 8 modular base architectural designs (ADU, Small Bar, Medium Bar, Big Bar, Dogtrot, Small L, Big L, Village) with dual-image assets (exteriorImageUrl + axon3dImageUrl) and support for filters.',
  })
  @ApiResponse({ status: 200, description: 'Filtered list of architectural standard plans' })
  async getStandards(@Query() filterDto: StandardsFilterDto) {
    return this.catalogService.getStandards(filterDto);
  }

  @Get('standards/:slug')
  @ApiOperation({
    summary: 'Detailed view of a Standard Plan by slug',
    description:
      'Fetches complete architectural specs (dimensions, roof pitch, structural zones), compatible Housing Solutions, and realized Portfolio Projects built from this standard.',
  })
  @ApiParam({ name: 'slug', description: 'Plan slug (e.g. adu, small-bar, dogtrot, big-l)', example: 'dogtrot' })
  @ApiResponse({ status: 200, description: 'Standard Plan detail with compatible solutions and realized builds' })
  @ApiResponse({ status: 404, description: 'Standard Plan not found' })
  async getStandardBySlug(@Param('slug') slug: string) {
    return this.catalogService.getStandardBySlug(slug);
  }

  @Get('portfolio')
  @ApiOperation({
    summary: 'List realized architectural case studies',
    description:
      'Retrieves completed real-world builds (Blueberry Hill ADU, Break House, Mountain View Meadow, Creekside Compound) with client quotes, actual square footages, and relational metadata tags.',
  })
  @ApiResponse({ status: 200, description: 'List of realized case studies' })
  async getPortfolio() {
    return this.catalogService.getPortfolio();
  }
}

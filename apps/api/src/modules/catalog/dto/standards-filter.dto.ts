import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum StandardSortOption {
  SQFT_ASC = 'sqft_asc',
  SQFT_DESC = 'sqft_desc',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NAME_ASC = 'name_asc',
}

export class StandardsFilterDto {
  @ApiPropertyOptional({
    description: 'Filter by housing solution slug (e.g. starter-home, second-home, adu)',
    example: 'second-home',
  })
  @IsOptional()
  @IsString()
  solutionSlug?: string;

  @ApiPropertyOptional({
    description: 'Minimum number of bedrooms',
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minBeds?: number;

  @ApiPropertyOptional({
    description: 'Maximum square footage area',
    example: 2000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxSqft?: number;

  @ApiPropertyOptional({
    description: 'Sort ordering option',
    enum: StandardSortOption,
    example: StandardSortOption.SQFT_ASC,
  })
  @IsOptional()
  @IsEnum(StandardSortOption)
  sort?: StandardSortOption;
}

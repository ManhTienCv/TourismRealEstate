import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TerrainType {
  FLAT = 'flat',
  SLOPED = 'sloped',
  MOUNTAINOUS = 'mountainous',
}

export enum FinishTier {
  ESSENTIAL = 'essential',
  SIGNATURE = 'signature',
  BESPOKE = 'bespoke',
}

export enum CladdingChoice {
  PINE = 'pine',
  ZINC = 'zinc',
  CEDAR = 'cedar',
  SHOU_SUGI_BAN = 'shou_sugi_ban',
}

export class CustomConfigDto {
  @ApiProperty({
    description: 'Site terrain topography classification',
    enum: TerrainType,
    example: TerrainType.SLOPED,
  })
  @IsEnum(TerrainType)
  @IsNotEmpty()
  terrain: TerrainType;

  @ApiProperty({
    description: 'Interior architectural craft and finish tier',
    enum: FinishTier,
    example: FinishTier.SIGNATURE,
  })
  @IsEnum(FinishTier)
  @IsNotEmpty()
  finish_tier: FinishTier;

  @ApiProperty({
    description: 'Exterior architectural rainscreen cladding material',
    enum: CladdingChoice,
    example: CladdingChoice.PINE,
  })
  @IsEnum(CladdingChoice)
  @IsNotEmpty()
  cladding: CladdingChoice;

  @ApiProperty({
    description: 'Array of selected lifestyle and exterior structural additions',
    example: ['deck_400sqft', 'detached_cedar_sauna', 'screened_porch'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  addons: string[];
}

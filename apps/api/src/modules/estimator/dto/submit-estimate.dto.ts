import { ApiProperty } from '@nestjs/swagger';
import { LandStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { CustomConfigDto } from './custom-config.dto';

export class SubmitEstimateDto {
  @ApiProperty({
    description: 'Prospective client full name',
    example: 'Elena Vance',
  })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({
    description: 'Prospective client contact email',
    example: 'elena.vance@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty({
    description: 'UUID or unique slug of the Housing Solution',
    example: 'second-home',
  })
  @IsString()
  @IsNotEmpty()
  housingSolutionId: string;

  @ApiProperty({
    description: 'UUID or unique slug of the Standard Plan',
    example: 'dogtrot',
  })
  @IsString()
  @IsNotEmpty()
  standardPlanId: string;

  @ApiProperty({
    description: 'Client property land acquisition status',
    enum: LandStatus,
    example: LandStatus.owned,
  })
  @IsEnum(LandStatus)
  @IsNotEmpty()
  landStatus: LandStatus;

  @ApiProperty({
    description: 'Custom architectural configuration parameters',
    type: CustomConfigDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfigDto)
  customConfig: CustomConfigDto;
}

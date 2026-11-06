import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { CustomConfigDto } from './custom-config.dto';

export class CalculateEstimateDto {
  @ApiProperty({
    description: 'UUID or unique slug of the Standard Plan (e.g. dogtrot, small-bar, adu, big-l)',
    example: 'dogtrot',
  })
  @IsString()
  @IsNotEmpty()
  standardPlanId: string;

  @ApiProperty({
    description: 'Custom architectural configuration parameters',
    type: CustomConfigDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfigDto)
  customConfig: CustomConfigDto;
}

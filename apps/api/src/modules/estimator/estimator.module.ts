import { Module } from '@nestjs/common';
import { EstimatorController } from './estimator.controller';
import { EstimatorService } from './estimator.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EstimatorController],
  providers: [EstimatorService, PrismaService],
  exports: [EstimatorService],
})
export class EstimatorModule {}

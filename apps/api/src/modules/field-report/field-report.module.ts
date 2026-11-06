import { Module } from '@nestjs/common';
import { FieldReportController } from './field-report.controller';
import { FieldReportService } from './field-report.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [FieldReportController],
  providers: [FieldReportService, PrismaService],
  exports: [FieldReportService],
})
export class FieldReportModule {}

import { Module } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';
import { EstimatorModule } from './modules/estimator/estimator.module';
import { FieldReportModule } from './modules/field-report/field-report.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    CatalogModule,
    EstimatorModule,
    FieldReportModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

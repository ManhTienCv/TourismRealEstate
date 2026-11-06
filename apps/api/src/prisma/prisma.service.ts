import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Successfully connected to PostgreSQL (tie_proptech_db)');
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(
        'PostgreSQL connection not established. Falling back to high-fidelity in-memory modular database repository.'
      );
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }
}

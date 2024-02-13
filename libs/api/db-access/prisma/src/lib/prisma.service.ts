import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, type Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' }
      ],
      errorFormat: 'minimal'
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$on('query', ({ query, params }) => {
      this.logger.debug(`${query}; ${params}`);
    });
    this.$on('error', ({ message }) => {
      this.logger.error(message);
    });
    this.$on('warn', ({ message }) => {
      this.logger.warn(message);
    });
    this.$on('info', ({ message }) => {
      this.logger.debug(message);
    });
  }
}

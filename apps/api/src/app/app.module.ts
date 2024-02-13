import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@jasobs10/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@jasobs10/prisma';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../environment/environment';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateEnv })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

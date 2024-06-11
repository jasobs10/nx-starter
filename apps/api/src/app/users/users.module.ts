import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaModule } from '@jasobs10/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController]
})
export class UsersModule {}

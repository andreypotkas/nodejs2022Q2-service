import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryDataBaseService, PrismaService],
})
export class UsersModule {}

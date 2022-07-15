import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryDataBaseService],
})
export class UsersModule {}

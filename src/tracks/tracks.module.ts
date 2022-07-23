import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}

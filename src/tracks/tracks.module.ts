import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDataBaseService],
})
export class TracksModule {}

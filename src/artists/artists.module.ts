import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDataBaseService],
})
export class ArtistsModule {}

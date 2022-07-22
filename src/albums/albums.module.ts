import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDataBaseService],
})
export class AlbumsModule {}

import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [TracksModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistsService, AlbumsService, PrismaService],
})
export class FavoritesModule {}

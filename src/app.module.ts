import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { InMemoryDataBaseService } from './in-memory-data-base/in-memory-data-base.service';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, InMemoryDataBaseService],
})
export class AppModule {}

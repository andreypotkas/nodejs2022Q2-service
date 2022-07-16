import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { IAlbum } from 'src/albums/interfaces/album.model';
import { ArtistsService } from 'src/artists/artists.service';
import { IArtist } from 'src/artists/interfaces/artist.model';
import {
  database,
  InMemoryDataBaseService,
} from 'src/in-memory-data-base/in-memory-data-base.service';
import { ITrack } from 'src/tracks/interfaces/track.model';

@Injectable()
export class FavoritesService {
  addTrack(id: string) {
    const track = database.db.tracks.find((item: ITrack) => item.id === id);

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.db.favorites.tracks.push(track.id);

    return track;
  }

  deleteTrack(id: string) {
    const index = database.db.favorites.tracks.findIndex(
      (item: string) => item === id,
    );

    if (index === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    database.db.favorites.tracks.splice(index, 1);
    return `Track with id: ${id} was deleted from favorites`;
  }

  addArtist(id: string) {
    const artist = database.db.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.db.favorites.artists.push(artist.id);
    return artist;
  }

  deleteArtist(id: string) {
    const index = database.db.favorites.artists.findIndex(
      (item: string) => item === id,
    );

    if (index === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    database.db.favorites.artists.splice(index, 1);
    return `Artist with id: ${id} was deleted from favorites`;
  }

  addAlbum(id: string) {
    const album = database.db.albums.find((item: IAlbum) => item.id === id);

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.db.favorites.albums.push(album.id);
    return album;
  }

  deleteAlbum(id: string) {
    const index = database.db.favorites.albums.findIndex(
      (item: string) => item === id,
    );

    if (index === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    database.db.favorites.albums.splice(index, 1);
    return `Album with id: ${id} was deleted from favorites`;
  }

  findAll() {
    const tracks = database.db.favorites.tracks.map((item: string) =>
      database.db.tracks.find((track: ITrack) => track.id === item),
    );

    const albums = database.db.favorites.albums.map((item: string) =>
      database.db.albums.find((album: IAlbum) => album.id === item),
    );
    const artistsArr = database.db.favorites.artists.map((item: string) =>
      database.db.artists.find((artist: IArtist) => artist.id === item),
    );
    const artists = artistsArr.length === 1 ? artistsArr[0] : artistsArr;
    return {
      artists: artists,
      tracks: tracks,
      albums: albums,
    };
  }
}

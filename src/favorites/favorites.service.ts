import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(public prisma: PrismaService) {}

  async addTrack(id: string) {
    await this.check();
    const track: any = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newTrack = await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        favoriteId: '1',
      },
    });

    return newTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        favoriteId: null,
      },
    });

    /*     await this.prisma.favorite.update({
      where: { id: '1' },
      data: {
        tracks: {
          set: tracks
            .map((item) => {
              if (item.id === id) return undefined;
              return { id: item.id };
            })
            .filter((item) => item !== undefined),
        },
      },
    }); */
    return `Track with id: ${id} was deleted from favorites`;
  }

  async addArtist(id: string) {
    await this.check();
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        favoriteId: '1',
      },
    });

    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        favoriteId: null,
      },
    });
    return `Artist with id: ${id} was deleted from favorites`;
  }

  async addAlbum(id: string) {
    await this.check();
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        favoriteId: '1',
      },
    });

    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        favoriteId: null,
      },
    });
    return `Album with id: ${id} was deleted from favorites`;
  }

  async findAll() {
    await this.check();
    const { tracks, artists, albums } = await this.prisma.favorite.findUnique({
      where: { id: '1' },
      select: { artists: true, tracks: true, albums: true },
    });

    return {
      artists: artists.map((item) => {
        const { favoriteId, ...artist } = item;
        return artist;
      }),
      tracks: tracks.map((item) => {
        const { favoriteId, ...tracks } = item;
        return tracks;
      }),
      albums: albums.map((item) => {
        const { favoriteId, ...albums } = item;
        return albums;
      }),
    };
  }

  async check() {
    const fav: any = await this.prisma.favorite.findUnique({
      where: {
        id: '1',
      },
    });
    if (!fav) {
      await this.prisma.favorite.create({
        data: {
          id: '1',
        },
      });
    }
  }
}

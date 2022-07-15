import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { IAlbum } from './interfaces/album.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: InMemoryDataBaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = {
      ...new Album(),
      id: uuidv4(),
    };

    for (const key in createAlbumDto) {
      album[key] = createAlbumDto[key];
    }

    this.db.db.albums.push(album);
    return album;
  }

  findAll() {
    return this.db.db.albums;
  }

  findOne(id: string) {
    const album = this.db.db.albums.find((item: IAlbum) => item.id === id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.db.albums.find((item: IAlbum) => item.id === id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateAlbumDto) {
      album[key] = updateAlbumDto[key];
    }

    return album;
  }

  remove(id: string) {
    const index = this.db.db.albums.findIndex((item: IAlbum) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.db.db.albums.splice(index, 1);
    return `Album with id: ${id} was deleted!`;
  }
}

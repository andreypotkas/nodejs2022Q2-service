import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  database,
  InMemoryDataBaseService,
} from 'src/in-memory-data-base/in-memory-data-base.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { IAlbum } from './interfaces/album.model';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(public prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = new Album();

    for (const key in createAlbumDto) {
      album[key] = createAlbumDto[key];
    }

    const newAlbum = await this.prisma.album.create({
      data: album,
    });

    return newAlbum;
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<any> {
    const album: any = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album: IAlbum = await this.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateAlbumDto) {
      album[key] = updateAlbumDto[key];
    }
    return album;
  }

  async remove(id: string) {
    const album = await this.findOne(id);

    if (!album) {
      throw new NotFoundException('album not found');
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });

    return `album with id: ${id} was deleted!`;
  }
}

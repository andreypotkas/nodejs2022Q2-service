import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.model';
import { Artist } from './entities/artist.entity';
import { database } from 'src/in-memory-data-base/in-memory-data-base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(public prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const artist: IArtist = new Artist();
    for (const key in createArtistDto) {
      artist[key] = createArtistDto[key];
    }
    const newArtist = await this.prisma.artist.create({
      data: artist,
    });

    return newArtist;
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<any> {
    const artist: IArtist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist: IArtist = await this.findOne(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }
    return artist;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });

    return `Artist with id: ${id} was deleted!`;
  }
}

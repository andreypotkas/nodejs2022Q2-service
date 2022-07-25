import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { database } from 'src/in-memory-data-base/in-memory-data-base.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { ITrack } from './interfaces/track.model';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TracksService {
  constructor(public prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track: ITrack = new Track();
    console.log(createTrackDto);
    for (const key in createTrackDto) {
      track[key] = createTrackDto[key];
    }

    const newTrack = await this.prisma.track.create({
      data: track,
    });
    return newTrack;
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<any> {
    const track: any = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    const track: ITrack = await this.findOne(id);
    if (!track) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateTrackDto) {
      track[key] = updateTrackDto[key];
    }
    return track;
  }

  async remove(id: string) {
    const track = await this.findOne(id);

    if (!track) {
      throw new NotFoundException('track not found');
    }

    await this.prisma.track.delete({
      where: {
        id,
      },
    });

    return `track with id: ${id} was deleted!`;
  }
}

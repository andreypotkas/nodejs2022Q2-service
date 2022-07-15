import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { ITrack } from './interfaces/track.model';
import { Track } from './entities/track.entity';
@Injectable()
export class TracksService {
  constructor(private readonly db: InMemoryDataBaseService) {}
  create(createTrackDto: CreateTrackDto) {
    const track: ITrack = {
      ...new Track(),
      id: uuidv4(),
    };

    for (const key in createTrackDto) {
      track[key] = createTrackDto[key];
    }

    this.db.db.tracks.push(track);
    return track;
  }

  findAll() {
    return this.db.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.db.tracks.find((item: ITrack) => item.id === id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.db.tracks.find((item: ITrack) => item.id === id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateTrackDto) {
      track[key] = updateTrackDto[key];
    }
    return track;
  }

  remove(id: string) {
    const index = this.db.db.tracks.findIndex((item: ITrack) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.db.db.tracks.splice(index, 1);
    return `Track with id: ${id} was deleted!`;
  }
}

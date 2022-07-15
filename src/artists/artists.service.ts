import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './interfaces/artist.model';
import { Artist } from './entities/artist.entity';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
@Injectable()
export class ArtistsService {
  constructor(private readonly db: InMemoryDataBaseService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist: IArtist = {
      ...new Artist(),
      id: uuidv4(),
    };

    for (const key in createArtistDto) {
      artist[key] = createArtistDto[key];
    }

    this.db.db.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.db.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.db.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.db.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }
    return artist;
  }

  remove(id: string) {
    const index = this.db.db.artists.findIndex(
      (item: IArtist) => item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.db.db.artists.splice(index, 1);
    return `Artist with id: ${id} was deleted!`;
  }
}

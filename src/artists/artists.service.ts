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
import {
  database,
  InMemoryDataBaseService,
} from 'src/in-memory-data-base/in-memory-data-base.service';
@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    const artist: IArtist = {
      ...new Artist(),
      id: uuidv4(),
    };

    for (const key in createArtistDto) {
      artist[key] = createArtistDto[key];
    }

    database.db.artists.push(artist);
    return artist;
  }

  findAll() {
    return database.db.artists;
  }

  findOne(id: string) {
    const artist = database.db.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = database.db.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }
    return artist;
  }

  remove(id: string) {
    const index = database.db.artists.findIndex(
      (item: IArtist) => item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    database.db.artists.splice(index, 1);
    return `Artist with id: ${id} was deleted!`;
  }
}

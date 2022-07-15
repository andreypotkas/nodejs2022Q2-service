import { Injectable } from '@nestjs/common';
import { Idb } from './interfaces/db.model';

@Injectable()
export class InMemoryDataBaseService {
  public db: Idb = {
    users: [],
    tracks: [],
    albums: [],
    artists: [],
    favorites: {
      tracks: [],
      artists: [],
      albums: [],
    },
  };
}

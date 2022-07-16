import { Idb } from './interfaces/db.model';

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
export const database = new InMemoryDataBaseService();

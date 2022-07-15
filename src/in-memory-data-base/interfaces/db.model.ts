import { Album, Artist, Favorites, Track } from 'src/models';
import { User } from 'src/users/interfaces/users.model';

export interface Idb {
  users: User[];
  artists: Artist[] | [];
  tracks: Track[] | [];
  albums: Album[] | [];
  favorites: Favorites;
}

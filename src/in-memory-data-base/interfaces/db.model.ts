import { IAlbum } from 'src/albums/interfaces/album.model';
import { IArtist } from 'src/artists/interfaces/artist.model';
import { Favorites } from 'src/models';
import { ITrack } from 'src/tracks/interfaces/track.model';
import { User } from 'src/users/interfaces/users.model';

export interface Idb {
  users: User[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: Favorites;
}

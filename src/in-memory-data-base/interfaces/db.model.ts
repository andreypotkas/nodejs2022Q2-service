import { IAlbum } from 'src/albums/interfaces/album.model';
import { IArtist } from 'src/artists/interfaces/artist.model';
import { IFavorites } from 'src/favorites/interfaces/favorites.model';
import { ITrack } from 'src/tracks/interfaces/track.model';
import { IUser } from 'src/users/interfaces/users.model';

export interface Idb {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: IFavorites;
}

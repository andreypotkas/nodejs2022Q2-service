import { IFavorites } from '../interfaces/favorites.model';

export class Favorite implements IFavorites {
  constructor(
    public artists: string[] = [], // favorite artists ids
    public albums: string[] = [], // favorite albums ids
    public tracks: string[] = [],
  ) {}
}

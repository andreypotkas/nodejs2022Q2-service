import { IAlbum } from '../interfaces/album.model';

export class Album implements IAlbum {
  constructor(
    public name: string = '',
    public year: number = 0,
    public artistId: string | null = null,
  ) {}
}

import { IAlbum } from '../interfaces/album.model';
import { v4 as uuidv4 } from 'uuid';
export class Album implements IAlbum {
  constructor(
    public id: string = uuidv4(),
    public name: string = '',
    public year: number = 0,
    public artistId: string | null = null,
  ) {}
}

import { IArtist } from '../interfaces/artist.model';

export class Artist implements IArtist {
  constructor(
    public id: string = '',
    public name = '',
    public grammy = false,
  ) {}
}

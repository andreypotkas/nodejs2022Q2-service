import { IArtist } from '../interfaces/artist.model';
import { v4 as uuidv4 } from 'uuid';

export class Artist implements IArtist {
  constructor(
    public name = '',
    public grammy = false,
    public id: string = uuidv4(),
  ) {}
}

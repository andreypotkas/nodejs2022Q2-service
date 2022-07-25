import { ITrack } from '../interfaces/track.model';
import { v4 as uuidv4 } from 'uuid';
export class Track implements ITrack {
  constructor(
    public id: string = uuidv4(),
    public name: string = '',
    public duration: number = 0,
    public artistId: string | null = null,
    public albumId: string | null = null,
  ) {}
}

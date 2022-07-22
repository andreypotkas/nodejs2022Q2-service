import { ITrack } from '../interfaces/track.model';

export class Track implements ITrack {
  constructor(
    public name: string = '',
    public duration: number = 0,
    public artistId: string | null = null,
    public albumId: string | null = null,
  ) {}
}

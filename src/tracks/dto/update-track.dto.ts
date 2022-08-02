import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;

  artistId: string | null;

  albumId: string | null;

  @IsNumber()
  duration: number;
}

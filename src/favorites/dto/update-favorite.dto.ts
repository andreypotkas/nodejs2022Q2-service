import { PartialType } from '@nestjs/swagger';
import { IsEmpty, IsString, IsUUID } from 'class-validator';
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  @IsString()
  @IsUUID()
  @IsEmpty()
  id: string;
}

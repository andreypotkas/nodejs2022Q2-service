import { IsEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsUUID()
  @IsEmpty()
  id: string;
}

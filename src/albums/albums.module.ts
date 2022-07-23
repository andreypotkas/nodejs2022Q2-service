import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, PrismaService],
})
export class AlbumsModule {}

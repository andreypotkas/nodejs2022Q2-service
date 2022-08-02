import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { IUser } from './interfaces/users.model';

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user: IUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        createdAt: +Date.now(),
        updatedAt: +Date.now(),
        version: 1,
      },
    });

    const { password, ...response } = user;

    return response;
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<any> {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdatePasswordDto): Promise<any> {
    const user: IUser = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.oldPassword === user.password) {
      user.password = updateUserDto.newPassword;
    } else {
      throw new HttpException('Old password is wrong!', HttpStatus.FORBIDDEN);
    }

    user.version += 1;
    user.updatedAt = +Date.now();

    await this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });

    const { password, ...response } = user;

    return response;
  }

  async remove(id: string): Promise<string> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return `User with id: ${id} was deleted!`;
  }
}

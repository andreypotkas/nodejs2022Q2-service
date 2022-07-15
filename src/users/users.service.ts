import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/users.model';
import { InMemoryDataBaseService } from 'src/in-memory-data-base/in-memory-data-base.service';

@Injectable()
export class UsersService {
  constructor(public db: InMemoryDataBaseService) {}
  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };

    this.db.db.users.push(user);

    const { password, ...response } = user;

    return response;
  }

  findAll(): User[] {
    return this.db.db.users;
  }

  findOne(id: string): User {
    const user = this.db.db.users.find((item: User) => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdatePasswordDto): User {
    const user = this.db.db.users.find((item: User) => item.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.oldPassword === user.id) {
      user.password = updateUserDto.newPassword;
    } else {
      throw new HttpException('Old password is wrong!', HttpStatus.FORBIDDEN);
    }

    user.version += 1;
    user.updatedAt = Date.now();

    const { password, ...response } = user;

    return response;
  }

  remove(id: string): string {
    const index = this.db.db.users.findIndex((item: User) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.db.db.users.splice(index, 1);
    return `User with id: ${id} was deleted!`;
  }
}

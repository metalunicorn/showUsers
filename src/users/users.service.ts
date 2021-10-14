import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = genSaltSync(10);
    const newUser = await this.userRepository
      .createQueryBuilder('User')
      .insert()
      .values([
        {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          login: createUserDto.lastName,
          sex: createUserDto.sex,
          birthday: createUserDto.birthday,
          email: createUserDto.login,
          passwordHash: hashSync(createUserDto.password, salt),
        },
      ])
      .execute();
    console.log(newUser);
    return `user created User id: ${newUser.raw.insertId}`;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

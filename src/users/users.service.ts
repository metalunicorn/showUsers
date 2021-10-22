import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs';
import { PaginationDto } from './dto/pagination-user.dto';
import { PaginatedUserResultDto } from './dto/pagination-user-result.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = genSaltSync(10);

    try {
      const newUser = await this.userRepository
        .createQueryBuilder('User')
        .insert()
        .values([
          {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            login: createUserDto.login,
            sex: createUserDto.sex,
            birthday: createUserDto.birthday,
            email: createUserDto.email,
            passwordHash: hashSync(createUserDto.password, salt),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
        .execute();

      return `user created User id: ${newUser.raw.insertId}`;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`user already exist`, HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedUserResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.userRepository.count();
    const users = await this.userRepository
      .createQueryBuilder()
      .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: users,
    };
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

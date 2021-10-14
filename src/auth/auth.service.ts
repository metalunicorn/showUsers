import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '.././users/entities/user.entity';
import { Repository } from 'typeorm';
import {} from 'bcryptjs';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    const findOne = await this.authRepository
      .createQueryBuilder('FindReview')
      .where('email = :email', { email: email })
      .getOne();
    return findOne;
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Pick<User, 'login'>> {
    const user = await this.findUser(login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compareSync(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return {
      login: user.login,
    };
  }

  async login(login: string) {
    const payload = { login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

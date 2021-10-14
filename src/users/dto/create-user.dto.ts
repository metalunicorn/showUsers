import {
  IsString,
  IsEmail,
  Length,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(4, 100)
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @Length(4, 100)
  lastName: string;

  @IsString()
  @ApiProperty()
  @Length(4, 100)
  login: string;

  @IsString()
  @ApiProperty()
  @Length(4, 100)
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(Sex)
  @ApiProperty()
  sex: Sex;

  @IsDateString()
  @ApiProperty()
  birthday: Date;
}

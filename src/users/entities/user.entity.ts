import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
@Unique(['login'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  @Column()
  passwordHash: string;

  @Column({
    length: 100,
  })
  login: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Sex,
    default: Sex.MALE,
  })
  sex: string;

  @Column()
  birthday: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

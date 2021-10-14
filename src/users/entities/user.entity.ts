import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
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
}

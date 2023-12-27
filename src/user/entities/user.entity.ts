import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

import { UserRole, Gender } from 'src/constants';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable: true})
  nickName: string;

  @Column({nullable: true})
  birthday: Date;

  @Column({nullable: true})
  displayName: string;

  @Column({default: UserRole.USER})
  role: UserRole;

  @Column({default: Gender.MALE})
  gender: Gender;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @Column({nullable: true})
  photoId: string;

  @Column({nullable: true})
  login: string;

  @Column({nullable: true, select: false})
  password: string;

}

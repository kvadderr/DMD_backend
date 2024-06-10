import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  PrimaryColumn
} from 'typeorm';

import { UserRole, Gender } from 'src/constants';

@Entity('user')
export class User {

  @Index()
  @PrimaryColumn()
  id: string;

  @Column({nullable: true})
  nickName: string;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @Column({default: false})
  isSubscribe: boolean;

}

import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn
} from 'typeorm';

@Entity('user')
export class User {

  @Index()
  @PrimaryColumn()
  id: string;

  @Column({nullable: true})
  nickName: string;

  @Column({nullable: true})
  avatar: string;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @Column({default: false})
  isSubscribe: boolean;

  @Column({default: 0})
  countSessions: number;

  @Column({default: 0})
  countMinutes: number;

  incrementSessionsAndMinutes(minutes: number, sessions: number) {
    this.countMinutes += minutes;
    this.countSessions += sessions;
  }

}

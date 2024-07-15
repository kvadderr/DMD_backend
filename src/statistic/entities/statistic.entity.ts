import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('statistic')
export class Statistic {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: 0 })
  countSessions: number;

  @Column({ default: 0 })
  countMinutes: number;

  incrementSessionsAndMinutes(minutes: number, sessions: number) {
    this.countMinutes += minutes;
    this.countSessions += sessions;
  }
}
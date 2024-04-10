import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';

import { Meditation } from 'src/meditation/entities/meditation.entity';
import { Voice } from 'src/voices/entities/voice.entity';

@Entity('audio')
export class Audio {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  duration: number;

  @Column({ name: 'meditation_id' })
  meditation_id: number

  @ManyToOne(() => Meditation, (meditation) => meditation.audios)
  @JoinColumn({ name: 'meditation_id' })
  meditation: Meditation;

  @Column({ name: 'voice_id' })
  voice_id: number

  @ManyToOne(() => Voice, (voice) => voice.audios)
  @JoinColumn({ name: 'voice_id' })
  voice: Voice;

}

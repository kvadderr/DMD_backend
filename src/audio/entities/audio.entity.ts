import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Meditation } from 'src/meditation/entities/meditation.entity';
import { Voice } from 'src/voices/entities/voice.entity';

@Entity('audio')
export class Audio {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @ManyToOne(() => Meditation, (meditation) => meditation.audios)
  meditation: Meditation;

  @ManyToOne(() => Voice, (voice) => voice.audios)
  voice: Voice;

}

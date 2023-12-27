import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Audio } from 'src/audio/entities/audio.entity';

@Entity('voice')
export class Voice {

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  photo: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @OneToMany(() => Audio, (audio) => audio.meditation)
  audios: Audio[];

}

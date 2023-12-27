import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Lang } from 'src/constants';
import { Category } from 'src/category/entities/category.entity';
import { Audio } from 'src/audio/entities/audio.entity';

@Entity('meditation')
export class Meditation {

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({default: Lang.RU})
  lang: Lang;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToMany(() => Category, category => category.meditations)
  @JoinTable()
  categories: Category[];

  @ApiProperty()
  @Column({default: true})
  isSubscribed: boolean;

  @ApiProperty()
  @Column()
  audioLenght: number;

  @ApiProperty()
  @Column()
  photo: string;

  @OneToMany(() => Audio, (audio) => audio.meditation)
  audios: Audio[];
}

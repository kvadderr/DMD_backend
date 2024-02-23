import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Meditation } from 'src/meditation/entities/meditation.entity';

@Entity('category')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(() => Meditation, meditation => meditation.categories)
  @JoinTable()
  meditations: Meditation[];

}

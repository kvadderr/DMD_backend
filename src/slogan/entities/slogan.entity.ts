import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('slogan')
export class Slogan {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

}

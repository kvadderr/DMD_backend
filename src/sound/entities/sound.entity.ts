import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany
} from 'typeorm';


@Entity('sound')
export class Sound {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  sound: string;
  
}

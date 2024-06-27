import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AppEntity } from 'src/base/BaseEntity';

@Entity()
export class Order extends AppEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  userID: string;

  @Column({ default: "WAITING" })
  status: string;

  @Column({ nullable: true })
  rebillId: number;

}
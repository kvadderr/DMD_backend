import { Entity, JoinColumn, Column, PrimaryColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { AppEntity } from 'src/base/BaseEntity';

@Entity()
export class Order extends AppEntity {

  @Column()
  amount: number;

  @Column({ nullable: true })
  paymentURL: string;

  @Column({ nullable: true })
  paymentType: string;

  @Column({ nullable: true })
  promocode: string;

  @Column({ nullable: true })
  login: string;

  @Column({ default: "WAITING" })
  status: string;

  @Column({ nullable: true })
  email: string;

}
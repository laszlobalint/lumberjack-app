import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Purchase } from './purchase.entity';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.customers,
  )
  user: User;

  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  companyName?: string;

  @Column({ type: 'varchar' })
  taxId?: string;

  @Column({ type: 'varchar' })
  nationalId?: string;

  @Column({ type: 'varchar' })
  checkingAccount?: string;

  @Column({ type: 'varchar' })
  description?: string;

  @OneToMany(
    type => Purchase,
    purchase => purchase.customer,
  )
  purchases: Purchase[];

  @CreateDateColumn({ type: 'datetime' })
  date: Date;
}

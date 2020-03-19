import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    type => User,
    user => user.purchases,
  )
  user: User;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'varchar' })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  date: Date;

  @Column({ type: 'boolean' })
  completed: boolean;

  @ManyToOne(
    type => Product,
    product => product.purchases,
  )
  product: Product;

  @ManyToOne(
    type => Customer,
    customer => customer.purchases,
  )
  customer: Customer;
}

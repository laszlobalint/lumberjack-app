import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.purchases,
  )
  user: User;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'text' })
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

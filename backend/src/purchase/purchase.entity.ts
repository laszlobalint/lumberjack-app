/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    _type => Customer,
    customer => customer.purchases,
  )
  customer: Customer;

  @ManyToOne(
    _type => Product,
    product => product.purchases,
  )
  product: Product;

  @ManyToOne(
    _type => User,
    user => user.purchases,
  )
  user: User;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean' })
  reduceStock: boolean;

  @Column({ type: 'boolean' })
  completed: boolean;

  @Column({ type: 'datetime', nullable: true })
  deliveryDate: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdDate: Date;

  constructor(partial: Partial<Purchase>) {
    Object.assign(this, partial);
  }
}

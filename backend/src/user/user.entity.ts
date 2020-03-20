import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(
    type => Product,
    product => product.user,
  )
  products: Product[];

  @OneToMany(
    type => Purchase,
    purchase => purchase.user,
  )
  purchases: Purchase[];

  @OneToMany(
    type => Customer,
    customer => customer.user,
  )
  customers: Customer[];
}

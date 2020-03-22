import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

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
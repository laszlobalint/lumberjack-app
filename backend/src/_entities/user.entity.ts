import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'varchar' })
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

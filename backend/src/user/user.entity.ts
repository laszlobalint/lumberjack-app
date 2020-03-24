import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';

export type UserRoleType = 'admin' | 'guest';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'guest'],
    default: 'guest',
  })
  role: UserRoleType;

  @OneToMany(
    type => Customer,
    customer => customer.user,
  )
  @Exclude()
  customers: Customer[];

  @OneToMany(
    type => Product,
    product => product.user,
  )
  @Exclude()
  products: Product[];

  @OneToMany(
    type => Purchase,
    purchase => purchase.user,
  )
  @Exclude()
  purchases: Purchase[];
}

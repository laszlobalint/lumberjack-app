/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { User } from '../user/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    _type => User,
    user => user.customers,
  )
  user: User;

  @OneToMany(
    _type => Purchase,
    purchase => purchase.customer,
  )
  @Exclude()
  purchases: Purchase[];

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  name?: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  phone?: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  companyName?: string;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  taxId?: string;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  nationalId?: string;

  @Column({ type: 'varchar', nullable: true, length: 40 })
  checkingAccount?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdDate: Date;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}

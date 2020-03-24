import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { User } from '../user/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.customers,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @OneToMany(
    type => Purchase,
    purchase => purchase.customer,
  )
  @Exclude()
  purchases: Purchase[];

  @Column({ type: 'varchar', length: 100 })
  name?: string;

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  phone?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  companyName?: string;

  @Column({ type: 'varchar', length: 20 })
  taxId?: string;

  @Column({ type: 'varchar', length: 20 })
  nationalId?: string;

  @Column({ type: 'varchar', length: 40 })
  checkingAccount?: string;

  @Column({ type: 'text' })
  description?: string;

  @CreateDateColumn({ type: 'datetime' })
  date: Date;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}

import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import { User } from '../user/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.products,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @OneToMany(
    type => Purchase,
    purchase => purchase.product,
  )
  @Exclude()
  purchases: Purchase[];

  @Column({ type: 'varchar', unique: true, length: 100 })
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdDate: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

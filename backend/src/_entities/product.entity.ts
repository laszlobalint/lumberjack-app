import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    type => User,
    user => user.products,
  )
  user: User;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(
    type => Purchase,
    purchase => purchase.product,
  )
  purchases: Purchase[];

  @CreateDateColumn({ type: 'datetime' })
  date: Date;
}

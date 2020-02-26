import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;
}

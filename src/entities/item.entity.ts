import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Min } from '@nestjs/class-validator';
import { Restaurants } from './restaurant.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column()
  @Min(0)
  price: number;

  @Column('varchar', { length: 100 })
  description: string;

  @Column()
  images: string;

  @ManyToOne(() => Restaurants, (restaurant) => restaurant.items)
  restaurent: Restaurants;
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    OneToOne
  } from "typeorm";
  import { Items } from "./item.entity";
  import { Users } from "./user.entity";
  import { Orders } from "./order.entity";
  
  @Entity()
  export class Restaurants {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", { length: 30 })
    name: string;
  
    @Column("varchar", { length: 50 })
    address: string;
  
    @Column("varchar", { length: 10 })
    phone: string;

    @Column()
    images: string
  
    @OneToMany(() => Items, (items) => items.restaurent)
    items: Items[];
  
    @ManyToMany(() => Users, (users) => users.restaurants)
    users: Users[];
  
    @OneToMany(() => Orders, (orders) => orders.restaurant)
    orders: Orders[];
  }
  
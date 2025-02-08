import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Min } from "@nestjs/class-validator";
import { Restaurants } from "./restaurant.entity";
import { Users } from "./user.entity";
import { OrderItems } from "./orderitem.entity";

export enum OrderStatus {
    PENDING = "Pending",
    COMPLETE = "Complete",
}

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Min(0)
    amount: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    orderdate: Date

    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus

    @ManyToOne(() => Restaurants, (restaurant) => restaurant.orders, { onDelete: "CASCADE" })
    restaurant: Restaurants

    @ManyToOne(() => Users, (user) => user.orders, { onDelete: "CASCADE" })
    user: Users

    @OneToMany(() => OrderItems, (orderitems) => orderitems.order)
    orderitems: OrderItems[]
}
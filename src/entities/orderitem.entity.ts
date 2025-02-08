import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Min } from "@nestjs/class-validator";
import { Orders } from "./order.entity";

@Entity()
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Min(1)
    quantity:  number

    @Column()
    @Min(0)
    price: number

    @ManyToOne(() => Orders, (order) => order.orderitems)
    order: Orders
}
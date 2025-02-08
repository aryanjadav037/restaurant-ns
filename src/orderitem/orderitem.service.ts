import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItems } from '../entities/orderitem.entity';
import { CreateOrderItemDTO } from './create-orderitem.dto';
import { Orders } from '../entities/order.entity';
import { Items } from '../entities/item.entity';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItems)
        private readonly orderItemsRepository: Repository<OrderItems>,
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        @InjectRepository(Items)
        private readonly itemsRepository: Repository<Items>,
    ) {}

    async create(
        orderId: number,
        itemId: number,
        createOrderItemDTO: CreateOrderItemDTO,
    ): Promise<OrderItems> {
        const { quantity } = createOrderItemDTO;

        // Fetch the associated order
        const order = await this.ordersRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        // Fetch the associated item
        const item = await this.itemsRepository.findOne({ where: { id: itemId } });
        if (!item) {
            throw new NotFoundException(`Item with ID ${itemId} not found`);
        }

        // Calculate the total price
        const totalPrice = item.price * quantity;
        console.log(totalPrice)
        // Create and save the new order item
        const newOrderItem = this.orderItemsRepository.create({
            quantity,
            price: totalPrice,
            order: { id: orderId },
        });

        return this.orderItemsRepository.save(newOrderItem);
    }

    async findAll(): Promise<OrderItems[]> {
        return this.orderItemsRepository.find({ relations: ['order', 'item'] });
    }

    async findOne(id: number): Promise<OrderItems> {
        const orderItem = await this.orderItemsRepository.findOne({
            where: { id },
            relations: ['order', 'item'],
        });
        if (!orderItem) {
            throw new NotFoundException(`OrderItem with ID ${id} not found`);
        }
        return orderItem;
    }

    async remove(id: number): Promise<void> {
        const result = await this.orderItemsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`OrderItem with ID ${id} not found`);
        }
    }
}
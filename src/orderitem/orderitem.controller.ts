import {
    Controller,
    Post,
    Param,
    Body,
    NotFoundException,
    ParseIntPipe,
    Get,
    Delete,
} from '@nestjs/common';
import { OrderItemsService } from './orderitem.service';
import { CreateOrderItemDTO } from './create-orderitem.dto';
import { OrderItems } from '../entities/orderitem.entity';

@Controller('orders/:orderId/items')
export class OrderItemsController {
    constructor(private readonly orderItemsService: OrderItemsService) {}
    @Post(':itemId')
    async create(
        @Param('orderId', ParseIntPipe) orderId: number,
        @Param('itemId', ParseIntPipe) itemId: number,
        @Body() createOrderItemDTO: CreateOrderItemDTO,
    ): Promise<OrderItems> {
        try {
            return await this.orderItemsService.create(orderId, itemId, createOrderItemDTO);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsController } from './orderitem.controller';
import { OrderItemsService } from './orderitem.service';
import { OrderItems } from '../entities/orderitem.entity';
import { Orders } from '../entities/order.entity';
import { Items } from '../entities/item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItems, Orders, Items])],
    controllers: [OrderItemsController],
    providers: [OrderItemsService],
    exports: [OrderItemsService]
})
export class OrderItemsModule {}
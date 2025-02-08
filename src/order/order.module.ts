import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/order.entity';  // Import Order entity
import { OrdersService } from './order.service';  // Import Order service
import { OrdersController } from './order.controller';  // Import Order controller

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],  // Register the order entity with TypeORM
  controllers: [OrdersController],  // Register the controller
  providers: [OrdersService],  // Register the service
  exports: [OrdersService],  // Export ordersService for use in other modules if needed
})
export class OrdersModule {}

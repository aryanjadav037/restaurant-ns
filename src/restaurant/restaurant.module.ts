import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurants } from '../entities/restaurant.entity';  // Import User entity
import { RestaurantController } from './restaurant.controller';  // Import User service
import {RestaurantsService} from "./restaurant.service"  // Import User controller

@Module({
  imports: [TypeOrmModule.forFeature([Restaurants])],  // Register the Users entity with TypeORM
  controllers: [RestaurantController],  // Register the controller
  providers: [RestaurantsService],  // Register the service
  exports: [RestaurantsService],  // Export UsersService for use in other modules if needed
})
export class RestaurantsModule {}

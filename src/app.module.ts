/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Restaurants } from './entities/restaurant.entity';
import { Users } from './entities/user.entity';
import { Orders } from './entities/order.entity';
import { Items } from './entities/item.entity';

import { UsersModule } from './user/user.module'; 
import { RestaurantsModule } from './restaurant/restaurant.module';
import { OrdersModule } from './order/order.module';
import { ItemsModule } from './item/item.module';
import { OrderItemsModule } from './orderitem/orderitem.module';
import { CloudinaryModule } from './Image/image.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderItems } from './entities/orderitem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'restaurant-ns',
      entities: [Restaurants, Users, Orders, Items, OrderItems],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    ItemsModule,
    OrderItemsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

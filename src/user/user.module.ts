import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';  // Import User entity
import { UsersService } from './user.service';  // Import User service
import { UsersController } from './user.controller';  // Import User controller

@Module({
  imports: [TypeOrmModule.forFeature([Users])],  // Register the Users entity with TypeORM
  controllers: [UsersController],  // Register the controller
  providers: [UsersService],  // Register the service
  exports: [UsersService],  // Export UsersService for use in other modules if needed
})
export class UsersModule {}

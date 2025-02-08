import { IsString, IsEmail, IsCurrency, Max, IsDate, IsEnum, IsArray, ArrayNotEmpty, IsUUID, IsOptional, Length} from '@nestjs/class-validator';
import { OrderStatus } from '../entities/order.entity'; 

export class UpdateOrderDTO {

  @IsOptional()
  @IsCurrency()
  @Max(999999, { message: 'Amount must be less than 1000' })
  amount?: number;

  @IsOptional()
  @IsDate()
  orderdate?: Date;

  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status must be either pending, completed, or cancelled' })
  status?: OrderStatus;

  @IsOptional()
  @IsUUID('4', { message: 'Restaurant ID must be a valid UUID' })
  restaurantId?: string; // For restaurantId, if it's just an ID reference

  @IsOptional()
  @IsUUID('4', { each: true, message: 'Each user ID must be a valid UUID' })
  userId?: string; // Order IDs as UUID array

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Each Orderitem ID must be a valid UUID' })
  orderitemIds?: string[]; // Orderitem IDs as UUID array

}
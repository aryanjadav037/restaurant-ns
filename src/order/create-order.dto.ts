import { IsString, IsEmail, IsCurrency, Max, IsDate, IsEnum, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, Length} from '@nestjs/class-validator';
import { OrderStatus } from '../entities/order.entity'; 

export class CreateOrderDTO {

  @IsNotEmpty()
  @IsCurrency()
  @Max(999999, { message: 'Amount must be less than 1000' })
  amount: number;

  @IsNotEmpty()
  @IsDate()
  orderdate: Date;

  @IsNotEmpty()
  @IsEnum(OrderStatus, { message: 'Status must be either pending, completed, or cancelled' })
  status: OrderStatus;

  @IsNotEmpty()
  @IsUUID('4', { message: 'Restaurant ID must be a valid UUID' })
  restaurantId: string; // For restaurantId, if it's just an ID reference

  @IsNotEmpty()
  @IsUUID('4', { each: true, message: 'Each user ID must be a valid UUID' })
  userId: string; // Order IDs as UUID array

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each Orderitem ID must be a valid UUID' })
  orderitemIds: string[]; // Orderitem IDs as UUID array

}

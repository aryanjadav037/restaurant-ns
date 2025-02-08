import { IsString, IsEmail, IsCurrency, Max, IsDate, IsEnum, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, Length, IsNumber} from '@nestjs/class-validator';
import { OrderStatus } from '../entities/order.entity'; 

export class CreateOrderItemDTO {

  @IsNotEmpty()
  @IsNumber()
  @Max(999, { message: 'Quantity must be less than 1000' })
  quantity: number;

}

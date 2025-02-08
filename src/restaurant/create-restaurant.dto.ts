import { IsString, IsEmail, IsPhoneNumber, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, Length, IsUrl } from '@nestjs/class-validator';
import { IsOptional } from '@nestjs/class-validator'; // Optional for update scenarios

export class CreateRestaurantDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: 'Name must be between 3 and 30 characters' })
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber( undefined,{ message: 'Mobile number must be valid' })
  phone: string;

  @IsUrl()
  images: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { message: 'Each item ID must be a valid UUID' })
  itemIds: string[]; // For restaurantId, if it's just an ID reference

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each User ID must be a valid UUID' })
  userIds: string[]; // Order IDs as UUID array

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each Order ID must be a valid UUID' })
  orderIds: string[]; // Order IDs as UUID array

}

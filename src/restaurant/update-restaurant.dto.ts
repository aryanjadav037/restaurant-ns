import { IsString, IsEmail, IsPhoneNumber, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, IsOptional, IsUrl } from '@nestjs/class-validator';


export class UpdateRestaurantDTO {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsPhoneNumber( undefined,{ message: 'Mobile number must be valid' })
  phone?: string;

  @IsOptional()
  @IsUrl()
  images?: string;

  @IsArray()
  @IsOptional()
  @IsUUID('4', { message: 'Each item ID must be a valid UUID' })
  itemIds?: string[]; // For restaurantId, if it's just an ID reference

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true, message: 'Each User ID must be a valid UUID' })
  userIds?: string[]; // Order IDs as UUID array

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true, message: 'Each Order ID must be a valid UUID' })
  orderIds?: string[]; // Order IDs as UUID array

}

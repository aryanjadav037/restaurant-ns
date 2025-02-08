import { 
    IsString, 
    IsEmail, 
    IsNotEmpty, 
    Length, 
    IsArray, 
    IsInt, 
    IsOptional,
    IsPhoneNumber, 
    IsUrl
  } from '@nestjs/class-validator';
  
  export class UpdateUserDTO {
    
    @IsOptional()
    @IsString()
    @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
    name?: string;
  
    @IsOptional()
    @IsString()
    @IsPhoneNumber( undefined,{ message: 'Mobile number must be valid' })
    mobileno?: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;
  
    @IsOptional()
    @IsString()
    @Length(5, 50, { message: 'Address must be between 5 and 50 characters' })
    address?: string;

    @IsOptional()
    @IsUrl()
    images?: string;  
  
    @IsOptional()
    @IsArray({ message: 'Restaurant ID must be an integer' })
    restaurantId?: number;
  
    @IsOptional()
    @IsArray({ message: 'Orders must be an array of order IDs' })
    orderIds?: number[];
  }
  
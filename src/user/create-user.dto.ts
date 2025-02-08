import { IsString, IsEmail, IsPhoneNumber, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, Length, IsUrl} from '@nestjs/class-validator';


export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber( undefined,{ message: 'Mobile number must be valid' })
  mobileno: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: 'Address must be between 5 and 50 characters' })
  address: string;

  @IsUrl()
  images: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { message: 'Restaurant ID must be a valid UUID' })
  restaurantId: string[]; // For restaurantId, if it's just an ID reference

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each Order ID must be a valid UUID' })
  orderIds: string[]; // Order IDs as UUID array

}

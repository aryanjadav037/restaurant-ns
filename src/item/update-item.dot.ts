/* eslint-disable prettier/prettier */
import {
    IsString, IsNumber, Min
    , IsArray, IsUUID, Length,
    IsOptional, IsUrl
} from '@nestjs/class-validator';
// import { IsOptional } from '@nestjs/class-validator'; 

export class UpdateItemDTO {
    @IsOptional()
    @IsString()
    @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    Price: number;

    @IsOptional()
    @IsString()
    @Length(5, 100, { message: 'Description must be between 5 and 100 characters' })
    description: string;

    @IsOptional()
    @IsUrl()
    images: string;
    
    @IsOptional()
    @IsUUID('4', { message: 'Each restaurent ID must be a valid UUID' })
    restaurantId: string; // For restaurantId, if it's just an ID reference

}
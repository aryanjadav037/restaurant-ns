import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurants } from '../entities/restaurant.entity'; // Adjust the path to your entity
import { CreateRestaurantDTO } from './create-restaurant.dto'; // Adjust the path to your DTO
import { UpdateRestaurantDTO } from './update-restaurant.dto'; // Adjust the path to your DTO

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurants)
    private readonly restaurantRepository: Repository<Restaurants>,
  ) {}

  // Create a new user
  async createRestaurant(RestaurantDTO: CreateRestaurantDTO): Promise<Restaurants> {
    // Create a new user instance using the DTO
    const restaurant = this.restaurantRepository.create(RestaurantDTO);

    try {
      // Save the user to the database
      return await this.restaurantRepository.save(restaurant);
    } catch (error) {
      // Handle any errors (e.g., duplicate mobileno or email)
      throw new Error(`Failed to create restaurant: ${error.message}`);
    }
  }

  // Fetch all restaurants (example for other use cases)
  async findAllRestaurants(): Promise<Restaurants[]> {
    return await this.restaurantRepository.find();
  }

  // Fetch a restaurants user by ID
  async findRestaurants(id: number): Promise<Restaurants> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new Error(`restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  // Update an existing restaurant
  async updateRestaurant(id: number, RestaurantDTO: UpdateRestaurantDTO): Promise<Restaurants> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new Error(`restaurant with ID ${id} not found`);
    }

    // Update restaurant fields with the new data from userDTO
    Object.assign(restaurant, RestaurantDTO);

    return await this.restaurantRepository.save(restaurant);
  }

  // Delete a restaurant by ID
  async deleteRestaurant(id: number): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new Error(`restaurant with ID ${id} not found`);
    }

    await this.restaurantRepository.remove(restaurant);
  }
}

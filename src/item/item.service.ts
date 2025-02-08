/* eslint-disable prettier/prettier */


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from '../entities/item.entity'; // Adjust the path to your entity
import { CreateItemDTO } from './create-item.dto'; // Adjust the path to your DTO
import { UpdateItemDTO } from './update-item.dot' // Adjust the path to your DTO

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemRepository: Repository<Items>,
  ) {}

  // Create a new Item
  async createItem(ItemDTO: CreateItemDTO): Promise<Items> {
    // Create a new Items instance using the DTO
    const item = this.itemRepository.create(ItemDTO);

    try {
      // Save the user to the database
      return await this.itemRepository.save(item);
    } catch (error) {
      // Handle any errors (e.g., duplicate mobileno or email)
      throw new Error(`Failed to create item: ${error}`);
    }
  }

  // Fetch all items (example for other use cases)
  async findAllItems(): Promise<Items[]> {
    return await this.itemRepository.find();
  }

  // Fetch a Items user by ID
  async findItems(id: number): Promise<Items> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`item with ID ${id} not found`);
    }
    return item;
  }

  // Update an existing restaurant
  async updateItem(id: number, ItemDTO: UpdateItemDTO): Promise<Items> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`item with ID ${id} not found`);
    }

    // Update restaurant fields with the new data from userDTO
    Object.assign(item, ItemDTO);

    return await this.itemRepository.save(item);
  }

  // Delete a Item by ID
  async deleteItem(id: number): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`item with ID ${id} not found`);
    }

    await this.itemRepository.remove(item);
  }
}
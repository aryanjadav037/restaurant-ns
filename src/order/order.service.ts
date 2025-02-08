import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../entities/order.entity'; // Adjust the path to your entity
import { CreateOrderDTO } from './create-order.dto'; // Adjust the path to your DTO
import { UpdateOrderDTO } from './update-order.dto'; // Adjust the path to your DTO

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly OrdersRepository: Repository<Orders>,
  ) {}

  // Create a new order
  async createOrder(orderDTO: CreateOrderDTO): Promise<Orders> {
    // Create a new order instance using the DTO
    const order = this.OrdersRepository.create(orderDTO);

    try {
      // Save the order to the database
      return await this.OrdersRepository.save(order);
    } catch (error) {
      // Handle any errors (e.g., duplicate mobileno or email)
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // Fetch all Orders (example for other use cases)
  async findAllOrders(): Promise<Orders[]> {
    return await this.OrdersRepository.find();
  }

  // Fetch a single user by ID
  async findOrderById(id: number): Promise<Orders> {
    const order = await this.OrdersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Update an existing user
  async updateOrder(id: number, orderDTO: UpdateOrderDTO): Promise<Orders> {
    const order = await this.OrdersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`order with ID ${id} not found`);
    }

    // Update user fields with the new data from userDTO
    Object.assign(order, orderDTO);

    return await this.OrdersRepository.save(order);
  }

  // Delete a user by ID
  async deleteOrder(id: number): Promise<void> {
    const order = await this.OrdersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    await this.OrdersRepository.remove(order);
  }
}

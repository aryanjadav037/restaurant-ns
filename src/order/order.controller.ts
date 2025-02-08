import { 
    Controller, 
    Post, 
    Body, 
    Get, 
    Param, 
    Delete, 
    Put, 
    ParseIntPipe, 
    NotFoundException, 
    BadRequestException 
  } from '@nestjs/common';
  import { OrdersService } from './order.service';
  import { CreateOrderDTO } from './create-order.dto';  // DTO with validations
  import { UpdateOrderDTO } from './update-order.dto';  // DTO with validations
  import { Orders } from '../entities/order.entity';
  
  @Controller('orders')
  export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}
  
    // Create a new order with validation
    @Post()
    async createOrder(@Body() orderDTO: CreateOrderDTO): Promise<Orders> {
      try {
        return await this.orderService.createOrder(orderDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Get all orders
    @Get()
    async findAllOrders(): Promise<Orders[]> {
      return this.orderService.findAllOrders();
    }
  
    // Get a single order by ID with validation
    @Get(':id')
    async findOrderById(@Param('id', ParseIntPipe) id: number): Promise<Orders> {
      const order = await this.orderService.findOrderById(id);
      if (!order) {
        throw new NotFoundException(`order with ID ${id} not found`);
      }
      return order;
    }
  
    // Update order by ID
    @Put(':id')
    async updateOrder(
      @Param('id', ParseIntPipe) id: number, 
      @Body() orderDTO: UpdateOrderDTO
    ): Promise<Orders> {
      try {
        return await this.orderService.updateOrder(id, orderDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Delete order by ID
    @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
      try {
        await this.orderService.deleteOrder(id);
        return { message: `Order with ID ${id} deleted successfully` };
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  }
  
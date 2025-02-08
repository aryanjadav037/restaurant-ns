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
    BadRequestException,
    UseInterceptors,
    UploadedFile
  } from '@nestjs/common';
  import { RestaurantsService } from './restaurant.service';
  import { CloudinaryService } from 'src/Image/image.service';
  import { UploadController } from 'src/Image/image.controller';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CreateRestaurantDTO } from './create-restaurant.dto';  // DTO with validations
  import { UpdateRestaurantDTO } from './update-restaurant.dto';  // DTO with validations
  import { Restaurants } from '../entities/restaurant.entity';
  
  @Controller('restaurants')
  export class RestaurantController {
    constructor(private readonly RestaurantsService: RestaurantsService) {}
  
    // Create a new user with validation
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createRestaurant(@Body() restaurantDTO: CreateRestaurantDTO, @UploadedFile() file: Express.Multer.File): Promise<Restaurants> {
      try {

        const upCont = new UploadController(new CloudinaryService());

        if (!file) {
          throw new BadRequestException('No file uploaded.');
        }
        
        const i =  await upCont.uploadImage(file).catch(() => {
          throw new BadRequestException('Invalid file type.');
        });

        restaurantDTO.images = i.url;

        return await this.RestaurantsService.createRestaurant(restaurantDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Get all Restaurants
    @Get()
    async findAllRestaurants(): Promise<Restaurants[]> {
      return this.RestaurantsService.findAllRestaurants();
    }
  
    // Get a single user by ID with validation
    @Get(':id')
    async findRestaurantById(@Param('id', ParseIntPipe) id: number): Promise<Restaurants> {
      const Restaurant = await this.RestaurantsService.findRestaurants(id);
      if (!Restaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      return Restaurant;
    }
  
    // Update Restaurant by ID
    @Put(':id')
    async updateRestaurant(
      @Param('id', ParseIntPipe) id: number, 
      @Body() RestaurantsDTO: UpdateRestaurantDTO
    ): Promise<Restaurants> {
      try {
        return await this.RestaurantsService.updateRestaurant(id, RestaurantsDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Delete Restaurant by ID
    @Delete(':id')
    async deleteRestaurant(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
      try {
        await this.RestaurantsService.deleteRestaurant(id);
        return { message: `Restaurants with ID ${id} deleted successfully` };
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  }
  
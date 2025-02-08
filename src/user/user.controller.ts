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
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UsersService } from './user.service';
  import { CloudinaryService } from 'src/Image/image.service';
  import { UploadController } from 'src/Image/image.controller';
  import { CreateUserDTO } from './create-user.dto';  // DTO with validations
  import { UpdateUserDTO } from './update-user.dto';  // DTO with validations
  import { Users } from '../entities/user.entity';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    // Create a new user with validation
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createUser(@Body() userDTO: CreateUserDTO, @UploadedFile() file: Express.Multer.File): Promise<Users> {
      try {

        const upCont = new UploadController(new CloudinaryService());

        if (!file) {
          throw new BadRequestException('No file uploaded.');
        }
        
        const i =  await upCont.uploadImage(file).catch(() => {
          throw new BadRequestException('Invalid file type.');
        });

        userDTO.images = i.url;

        return await this.usersService.createUser(userDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Get all users
    @Get()
    async findAllUsers(): Promise<Users[]> {
      return this.usersService.findAllUsers();
    }
  
    // Get a single user by ID with validation
    @Get(':id')
    async findUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
      const user = await this.usersService.findUserById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
  
    // Update user by ID
    @Put(':id')
    async updateUser(
      @Param('id', ParseIntPipe) id: number, 
      @Body() userDTO: UpdateUserDTO
    ): Promise<Users> {
      try {
        return await this.usersService.updateUser(id, userDTO);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Delete user by ID
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
      try {
        await this.usersService.deleteUser(id);
        return { message: `User with ID ${id} deleted successfully` };
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  }
  
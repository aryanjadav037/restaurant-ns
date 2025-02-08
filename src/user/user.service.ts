import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity'; // Adjust the path to your entity
import { CreateUserDTO } from './create-user.dto'; // Adjust the path to your DTO
import { UpdateUserDTO } from './update-user.dto'; // Adjust the path to your DTO

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // Create a new user
  async createUser(userDTO: CreateUserDTO): Promise<Users> {
    // Create a new user instance using the DTO
    const user = this.usersRepository.create(userDTO);

    try {
      // Save the user to the database
      return await this.usersRepository.save(user);
    } catch (error) {
      // Handle any errors (e.g., duplicate mobileno or email)
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // Fetch all users (example for other use cases)
  async findAllUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  // Fetch a single user by ID
  async findUserById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update an existing user
  async updateUser(id: number, userDTO: UpdateUserDTO): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Update user fields with the new data from userDTO
    Object.assign(user, userDTO);

    return await this.usersRepository.save(user);
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    await this.usersRepository.remove(user);
  }
}

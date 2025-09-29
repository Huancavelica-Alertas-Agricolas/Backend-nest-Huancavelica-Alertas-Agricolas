import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: any): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user) as unknown as User;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['projects'],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  async update(id: number, userData: any): Promise<User> {
    await this.userRepository.update(id, userData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByCode(code: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { code },
      relations: ['projects'],
    });
  }
}
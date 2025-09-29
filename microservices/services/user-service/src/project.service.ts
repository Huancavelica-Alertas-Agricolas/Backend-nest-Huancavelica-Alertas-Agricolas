import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(projectData: any): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return await this.projectRepository.save(project) as unknown as Project;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async findByUser(userId: number): Promise<Project[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['projects'],
    });
    return user?.projects || [];
  }

  async update(id: number, projectData: any): Promise<Project> {
    await this.projectRepository.update(id, projectData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
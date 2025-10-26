import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AlertaService } from './alerta.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly alertaService: AlertaService,
  ) {}

  // User operations
  @MessagePattern('create_user')
  async createUser(@Payload() userData: CreateUserDto) {
    this.logger.log('Creating user:', userData);
    return await this.userService.create(userData);
  }

  @MessagePattern('get_user')
  async getUser(@Payload() id: number) {
    this.logger.log(`Getting user with id: ${id}`);
    return await this.userService.findOne(id);
  }

  @MessagePattern('get_user_by_code')
  async getUserByCode(@Payload() code: string) {
    this.logger.log(`Getting user by code: ${code}`);
    return await this.userService.findByCode(code);
  }

  @MessagePattern('get_user_by_email')
  async getUserByEmail(@Payload() email: string) {
    this.logger.log(`Getting user by email: ${email}`);
    return await this.userService.findByEmail(email);
  }

  @MessagePattern('get_all_users')
  async getAllUsers() {
    this.logger.log('Getting all users');
    return await this.userService.findAll();
  }

  @MessagePattern('update_user')
  async updateUser(@Payload() data: { id: number; userData: Partial<User> }) {
    this.logger.log(`Updating user ${data.id}:`, data.userData);
    return await this.userService.update(data.id, data.userData);
  }

  @MessagePattern('delete_user')
  async deleteUser(@Payload() id: number) {
    this.logger.log(`Deleting user with id: ${id}`);
    return await this.userService.remove(id);
  }

  // Estaciones moved to alert-service / weather-service. Endpoints removed from user-service.

  // Alertas operations
  @MessagePattern('create_alerta')
  async createAlerta(@Payload() alertaData: unknown) {
    this.logger.log('Creating alerta:', alertaData);
    return await this.alertaService.create(alertaData);
  }

  @MessagePattern('get_all_alertas')
  async getAllAlertas() {
    this.logger.log('Getting all alertas');
    return await this.alertaService.findAll();
  }

  @MessagePattern('get_user_alertas')
  async getUserAlertas(@Payload() userId: number) {
    this.logger.log(`Getting alertas for user: ${userId}`);
    return await this.alertaService.findByUser(userId);
  }

  @MessagePattern('get_alertas_activas')
  async getAlertasActivas() {
    this.logger.log('Getting active alertas');
    return await this.alertaService.findActivas();
  }

  @MessagePattern('update_alerta_estado')
  async updateAlertaEstado(@Payload() data: { id: number; estado: string }) {
    this.logger.log(`Updating alerta ${data.id} estado to: ${data.estado}`);
    return await this.alertaService.updateEstado(data.id, data.estado);
  }

  @MessagePattern('create_log')
  async createLog(@Payload() logData: unknown) {
    this.logger.log('Creating log:', logData);
    return await this.alertaService.createLog(logData);
  }
}

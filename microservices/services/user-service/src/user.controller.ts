import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { EstacionService } from './estacion.service';
import { AlertaService } from './alerta.service';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly estacionService: EstacionService,
    private readonly alertaService: AlertaService,
  ) {}

  // User operations
  @MessagePattern('create_user')
  async createUser(@Payload() userData: any) {
    this.logger.log('Creating user:', userData);
    return await this.userService.create(userData);
  }

  @MessagePattern('get_user')
  async getUser(@Payload() id: number) {
    this.logger.log(`Getting user with id: ${id}`);
    return await this.userService.findOne(id);
  }

  @MessagePattern('get_all_users')
  async getAllUsers() {
    this.logger.log('Getting all users');
    return await this.userService.findAll();
  }

  @MessagePattern('update_user')
  async updateUser(@Payload() data: { id: number; userData: any }) {
    this.logger.log(`Updating user ${data.id}:`, data.userData);
    return await this.userService.update(data.id, data.userData);
  }

  @MessagePattern('delete_user')
  async deleteUser(@Payload() id: number) {
    this.logger.log(`Deleting user with id: ${id}`);
    return await this.userService.remove(id);
  }

  // Estaciones operations
  @MessagePattern('create_estacion')
  async createEstacion(@Payload() estacionData: any) {
    this.logger.log('Creating estacion:', estacionData);
    return await this.estacionService.create(estacionData);
  }

  @MessagePattern('get_all_estaciones')
  async getAllEstaciones() {
    this.logger.log('Getting all estaciones');
    return await this.estacionService.findAll();
  }

  @MessagePattern('get_estaciones_activas')
  async getEstacionesActivas() {
    this.logger.log('Getting active estaciones');
    return await this.estacionService.findActivas();
  }

  @MessagePattern('get_estacion')
  async getEstacion(@Payload() id: number) {
    this.logger.log(`Getting estacion with id: ${id}`);
    return await this.estacionService.findOne(id);
  }

  // Alertas operations
  @MessagePattern('create_alerta')
  async createAlerta(@Payload() alertaData: any) {
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
    return await this.alertaService.updateEstado(data.id, data.estado as any);
  }

  @MessagePattern('create_log')
  async createLog(@Payload() logData: any) {
    this.logger.log('Creating log:', logData);
    return await this.alertaService.createLog(logData);
  }
}
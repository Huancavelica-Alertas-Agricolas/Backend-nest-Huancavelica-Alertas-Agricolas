import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: DeepPartial<User>): Promise<User> {
    // Validaciones básicas de duplicados
    if (userData.code) {
      const existingByCode = await this.userRepository.findOne({ where: { code: userData.code } });
      if (existingByCode) {
        // Retornar el existente para que la capa superior decida el mensaje
        return existingByCode;
      }
    }

    if (userData.email) {
      const existingByEmail = await this.userRepository.findOne({ where: { email: userData.email } });
      if (existingByEmail) {
        return existingByEmail;
      }
    }

    // Mapear todos los campos explícitamente para asegurar que se almacenen
    const user = this.userRepository.create({
      code: userData.code,
      nombre: userData.nombre,
      email: userData.email,
      telefono: userData.telefono,
      ciudad: userData.ciudad,
      terreno: userData.terreno,
      cultivo: userData.cultivo,
      frecuencia: userData.frecuencia,
      anio_objetivo: userData.anio_objetivo,
      canal: userData.canal,
      experiencia: userData.experiencia,
      recibe_alertas: userData.recibe_alertas,
      importancia: userData.importancia,
      observaciones: userData.observaciones,
      activo: userData.activo,
      ultimaAlertaId: userData.ultimaAlertaId,
      ultimoLogId: userData.ultimoLogId,
      preferenciasNotificacionSummary: userData.preferenciasNotificacionSummary
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, userData: DeepPartial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByCode(code: string): Promise<User> {
    return await this.userRepository.findOne({ where: { code } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}

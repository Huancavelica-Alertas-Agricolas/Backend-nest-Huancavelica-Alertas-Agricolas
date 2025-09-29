import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerta, TipoAlerta, EstadoAlerta } from './entities/alerta.entity';
import { AlertCanal } from './entities/alert-canal.entity';
import { Log } from './entities/log.entity';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Alerta)
    private alertaRepository: Repository<Alerta>,
    @InjectRepository(AlertCanal)
    private alertCanalRepository: Repository<AlertCanal>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(alertaData: any): Promise<Alerta> {
    const alerta = this.alertaRepository.create({
      ...alertaData,
      timestamp: new Date(),
      estado: EstadoAlerta.ACTIVA,
    });
    return await this.alertaRepository.save(alerta) as unknown as Alerta;
  }

  async findAll(): Promise<Alerta[]> {
    return await this.alertaRepository.find({
      relations: ['estacion', 'usuario', 'canales', 'logs'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByUser(usuarioId: number): Promise<Alerta[]> {
    return await this.alertaRepository.find({
      where: { usuarioId },
      relations: ['estacion', 'canales', 'logs'],
      order: { timestamp: 'DESC' },
    });
  }

  async findActivas(): Promise<Alerta[]> {
    return await this.alertaRepository.find({
      where: { estado: EstadoAlerta.ACTIVA },
      relations: ['estacion', 'usuario', 'canales'],
      order: { timestamp: 'DESC' },
    });
  }

  async updateEstado(id: number, estado: EstadoAlerta): Promise<Alerta> {
    await this.alertaRepository.update(id, { estado });
    return await this.alertaRepository.findOne({ 
      where: { id },
      relations: ['estacion', 'usuario', 'canales', 'logs'] 
    });
  }

  async createLog(logData: any): Promise<Log> {
    const log = this.logRepository.create({
      ...logData,
      deliveredAt: new Date(),
    });
    return await this.logRepository.save(log) as unknown as Log;
  }

  async addCanal(alertaId: number, canalData: any): Promise<AlertCanal> {
    const canal = this.alertCanalRepository.create({
      ...canalData,
      alertaId,
    });
    return await this.alertCanalRepository.save(canal) as unknown as AlertCanal;
  }
}
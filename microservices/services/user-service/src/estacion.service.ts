import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estacion } from './entities/estacion.entity';

@Injectable()
export class EstacionService {
  constructor(
    @InjectRepository(Estacion)
    private estacionRepository: Repository<Estacion>,
  ) {}

  async create(estacionData: any): Promise<Estacion> {
    const estacion = this.estacionRepository.create(estacionData);
    return await this.estacionRepository.save(estacion) as unknown as Estacion;
  }

  async findAll(): Promise<Estacion[]> {
    return await this.estacionRepository.find({
      relations: ['lecturas'],
    });
  }

  async findOne(id: number): Promise<Estacion> {
    return await this.estacionRepository.findOne({
      where: { id },
      relations: ['lecturas'],
    });
  }

  async findActivas(): Promise<Estacion[]> {
    return await this.estacionRepository.find({
      where: { activa: true },
      relations: ['lecturas'],
    });
  }

  async update(id: number, estacionData: any): Promise<Estacion> {
    await this.estacionRepository.update(id, estacionData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estacionRepository.delete(id);
  }
}
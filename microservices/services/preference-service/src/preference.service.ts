import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferenciasNotificacion, TipoCanal, TipoAlerta } from './entities/preferencias-notificacion.entity';

export interface PreferenceRequest {
  usuarioId: number;
  canal: TipoCanal;
  tipoAlerta?: TipoAlerta;
  activo?: boolean;
  destinatario?: string;
  configuracion?: any;
  horaInicio?: string;
  horaFin?: string;
  diasSemana?: string[];
  alertasInmediatas?: boolean;
  resumenDiario?: boolean;
  reporteSemanal?: boolean;
}

export interface PreferenceResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable()
export class PreferenceService {
  private readonly logger = new Logger(PreferenceService.name);

  constructor(
    @InjectRepository(PreferenciasNotificacion)
    private preferenceRepository: Repository<PreferenciasNotificacion>,
  ) {}

  async createPreference(preferenceData: PreferenceRequest): Promise<PreferenceResponse> {
    try {
      const preference = this.preferenceRepository.create({
        ...preferenceData,
        tipoAlerta: preferenceData.tipoAlerta || TipoAlerta.TODAS,
        activo: preferenceData.activo !== undefined ? preferenceData.activo : true,
        alertasInmediatas: preferenceData.alertasInmediatas !== undefined ? preferenceData.alertasInmediatas : true,
        resumenDiario: preferenceData.resumenDiario || false,
        reporteSemanal: preferenceData.reporteSemanal || false,
      });

      const savedPreference = await this.preferenceRepository.save(preference);
      
      this.logger.log(`Preferencia creada para usuario: ${preferenceData.usuarioId}`);
      
      return {
        success: true,
        message: 'Preferencia creada exitosamente',
        data: savedPreference,
      };
    } catch (error: any) {
      this.logger.error('Error creando preferencia:', error.stack);
      return {
        success: false,
        message: 'Error al crear la preferencia',
        error: error.message,
      };
    }
  }

  async getUserPreferences(usuarioId: number): Promise<PreferenceResponse> {
    try {
      const preferences = await this.preferenceRepository.find({
        where: { usuarioId },
        order: { createdAt: 'DESC' },
      });

      return {
        success: true,
        message: `Preferencias obtenidas para usuario ${usuarioId}`,
        data: preferences,
      };
    } catch (error: any) {
      this.logger.error('Error obteniendo preferencias de usuario:', error.stack);
      return {
        success: false,
        message: 'Error al obtener preferencias',
        error: error.message,
      };
    }
  }

  async updatePreference(id: number, preferenceData: Partial<PreferenceRequest>): Promise<PreferenceResponse> {
    try {
      const existingPreference = await this.preferenceRepository.findOne({ where: { id } });
      
      if (!existingPreference) {
        return {
          success: false,
          message: 'Preferencia no encontrada',
        };
      }

      await this.preferenceRepository.update(id, preferenceData);
      const updatedPreference = await this.preferenceRepository.findOne({ where: { id } });

      this.logger.log(`Preferencia actualizada: ${id}`);

      return {
        success: true,
        message: 'Preferencia actualizada exitosamente',
        data: updatedPreference,
      };
    } catch (error: any) {
      this.logger.error('Error actualizando preferencia:', error.stack);
      return {
        success: false,
        message: 'Error al actualizar la preferencia',
        error: error.message,
      };
    }
  }

  async deletePreference(id: number): Promise<PreferenceResponse> {
    try {
      const result = await this.preferenceRepository.delete(id);
      
      if (result.affected === 0) {
        return {
          success: false,
          message: 'Preferencia no encontrada',
        };
      }

      this.logger.log(`Preferencia eliminada: ${id}`);

      return {
        success: true,
        message: 'Preferencia eliminada exitosamente',
      };
    } catch (error: any) {
      this.logger.error('Error eliminando preferencia:', error.stack);
      return {
        success: false,
        message: 'Error al eliminar la preferencia',
        error: error.message,
      };
    }
  }

  async getActivePreferences(usuarioId: number, tipoAlerta: TipoAlerta): Promise<PreferenceResponse> {
    try {
      const preferences = await this.preferenceRepository.find({
        where: [
          { usuarioId, activo: true, tipoAlerta },
          { usuarioId, activo: true, tipoAlerta: TipoAlerta.TODAS }
        ],
      });

      return {
        success: true,
        message: `Preferencias activas obtenidas para usuario ${usuarioId} y tipo ${tipoAlerta}`,
        data: preferences,
      };
    } catch (error: any) {
      this.logger.error('Error obteniendo preferencias activas:', error.stack);
      return {
        success: false,
        message: 'Error al obtener preferencias activas',
        error: error.message,
      };
    }
  }
}
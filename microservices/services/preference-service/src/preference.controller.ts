import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PreferenceService, PreferenceRequest, PreferenceResponse } from './preference.service';

@Controller()
export class PreferenceController {
  private readonly logger = new Logger(PreferenceController.name);

  constructor(private readonly preferenceService: PreferenceService) {}

  @MessagePattern('create_preference')
  async createPreference(@Payload() preferenceData: PreferenceRequest): Promise<PreferenceResponse> {
    this.logger.log('Creando preferencia:', preferenceData);
    return await this.preferenceService.createPreference(preferenceData);
  }

  @MessagePattern('get_user_preferences')
  async getUserPreferences(@Payload() usuarioId: number): Promise<PreferenceResponse> {
    this.logger.log(`Obteniendo preferencias para usuario: ${usuarioId}`);
    return await this.preferenceService.getUserPreferences(usuarioId);
  }

  @MessagePattern('update_preference')
  async updatePreference(@Payload() data: { id: number } & Partial<PreferenceRequest>): Promise<PreferenceResponse> {
    this.logger.log(`Actualizando preferencia: ${data.id}`);
    const { id, ...preferenceData } = data;
    return await this.preferenceService.updatePreference(id, preferenceData);
  }

  @MessagePattern('delete_preference')
  async deletePreference(@Payload() id: number): Promise<PreferenceResponse> {
    this.logger.log(`Eliminando preferencia: ${id}`);
    return await this.preferenceService.deletePreference(id);
  }

  @MessagePattern('get_active_preferences')
  async getActivePreferences(@Payload() data: { usuarioId: number; tipoAlerta: string }): Promise<PreferenceResponse> {
    this.logger.log(`Obteniendo preferencias activas para usuario: ${data.usuarioId} y tipo: ${data.tipoAlerta}`);
    return await this.preferenceService.getActivePreferences(data.usuarioId, data.tipoAlerta as any);
  }
}
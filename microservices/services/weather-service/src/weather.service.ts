import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Parser } from 'json2csv';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface WeatherRecord {
  fecha_hora: string;
  temp_c: number;
  humedad: number;
  clima: string;
  prob_lluvia: number;
  precip_mm: number;
  riesgo_helada?: boolean;
  riesgo_sequia?: boolean;
}

export interface WeatherResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateAndSaveWeatherReport(): Promise<WeatherResponse> {
    this.logger.log('Iniciando la generación del reporte de clima...');
    
    try {
      const registros = await this.fetchAndFilterWeatherData();

      if (registros.length === 0) {
        this.logger.warn('No se encontraron registros de lluvia.');
        return {
          success: false,
          message: 'No se encontraron datos de lluvia para generar el reporte.',
        };
      }
      
      const registrosConAnalisis = this.addRiskAnalysis(registros);
      const csv = this.generateCsvFromData(registrosConAnalisis);
      
      // Asegurar que el directorio reports existe
      const reportsDir = join(process.cwd(), 'reports');
      if (!existsSync(reportsDir)) {
        await mkdir(reportsDir, { recursive: true });
      }
      
      const filePath = join(reportsDir, 'clima_huancavelica.csv');
      await writeFile(filePath, csv);

      this.logger.log(`Reporte guardado exitosamente en: ${filePath}`);
      return {
        success: true,
        message: `Reporte generado y guardado exitosamente`,
        data: {
          filePath,
          recordCount: registrosConAnalisis.length,
          records: registrosConAnalisis,
        },
      };
    } catch (error) {
      this.logger.error('Error al generar el reporte de clima', error.stack);
      return {
        success: false,
        message: 'Error al generar el reporte de clima',
        error: error.message,
      };
    }
  }

  async getCurrentWeatherData(): Promise<WeatherResponse> {
    this.logger.log('Obteniendo datos meteorológicos actuales...');
    
    try {
      const registros = await this.fetchAndFilterWeatherData();
      const registrosConAnalisis = this.addRiskAnalysis(registros);
      
      return {
        success: true,
        message: 'Datos meteorológicos obtenidos exitosamente',
        data: registrosConAnalisis,
      };
    } catch (error) {
      this.logger.error('Error al obtener datos meteorológicos', error.stack);
      return {
        success: false,
        message: 'Error al obtener datos meteorológicos',
        error: error.message,
      };
    }
  }

  private async fetchAndFilterWeatherData(): Promise<WeatherRecord[]> {
    const apiKey = this.configService.get<string>('API_KEY');
    const lat = -12.7861;
    const lon = -74.9723;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      
      const forecastDays = data.forecast?.forecastday || [];

      return forecastDays.flatMap((dia: any) => 
        dia.hour
        .filter((hora: any) => hora.will_it_rain === 1)
        .map((hora: any) => ({
          fecha_hora: hora.time,
          temp_c: hora.temp_c,
          humedad: hora.humidity,
          clima: hora.condition?.text || '',
          prob_lluvia: hora.will_it_rain,
          precip_mm: hora.precip_mm,
        })),
      );
    } catch (error) {
      this.logger.error('Error al obtener datos de la API del clima', error.stack);
      throw new Error('No se pudieron obtener los datos meteorológicos');
    }
  }

  private addRiskAnalysis(registros: WeatherRecord[]): WeatherRecord[] {
    return registros.map((reg) => ({
      ...reg,
      riesgo_helada: reg.temp_c <= 0,
      riesgo_sequia: reg.precip_mm < 1 && reg.humedad < 40,
    }));
  }

  private generateCsvFromData(data: WeatherRecord[]): string {
    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  }
}
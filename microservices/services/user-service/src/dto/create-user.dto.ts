import { IsString, IsOptional, IsEmail, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  code: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  ciudad: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsNumber()
  ultimaAlertaId?: number;

  @IsOptional()
  @IsNumber()
  ultimoLogId?: number;

  @IsOptional()
  @IsString()
  preferenciasNotificacionSummary?: string;

  @IsOptional()
  @IsString()
  terreno?: string;

  @IsOptional()
  @IsString()
  cultivo?: string;

  @IsOptional()
  @IsString()
  frecuencia?: string;

  @IsOptional()
  @IsString()
  anio_objetivo?: string;

  @IsOptional()
  @IsString()
  canal?: string;

  @IsOptional()
  @IsString()
  experiencia?: string;

  @IsOptional()
  @IsString()
  recibe_alertas?: string;

  @IsOptional()
  @IsString()
  importancia?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

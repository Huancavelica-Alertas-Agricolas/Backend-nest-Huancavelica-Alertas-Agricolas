import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  tipo_alerta: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsOptional()
  @IsNumber()
  temperatura_min?: number;

  @IsOptional()
  @IsNumber()
  temperatura_max?: number;

  @IsOptional()
  @IsNumber()
  humedad_min?: number;

  @IsOptional()
  @IsNumber()
  humedad_max?: number;

  @IsOptional()
  @IsBoolean()
  alerta_helada?: boolean;

  @IsOptional()
  @IsBoolean() 
  alerta_sequia?: boolean;
}
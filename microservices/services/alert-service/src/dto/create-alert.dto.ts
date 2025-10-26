import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsNumber()
  usuarioId?: number;
}

export declare class CreateAlertDto {
    email: string;
    tipo_alerta: string;
    ubicacion: string;
    temperatura_min?: number;
    temperatura_max?: number;
    humedad_min?: number;
    humedad_max?: number;
    alerta_helada?: boolean;
    alerta_sequia?: boolean;
}

export declare class User {
    id: number;
    code: string;
    nombre: string;
    email: string;
    telefono: string;
    ciudad: string;
    activo: boolean;
    ultimaAlertaId?: number;
    ultimoLogId?: number;
    preferenciasNotificacionSummary?: string;
    terreno?: string;
    cultivo?: string;
    frecuencia?: string;
    anio_objetivo?: string;
    canal?: string;
    experiencia?: string;
    recibe_alertas?: string;
    importancia?: string;
    observaciones?: string;
    createdAt: Date;
    updatedAt: Date;
}

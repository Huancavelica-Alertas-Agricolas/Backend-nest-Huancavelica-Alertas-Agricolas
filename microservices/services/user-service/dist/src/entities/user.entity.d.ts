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
    createdAt: Date;
    updatedAt: Date;
}

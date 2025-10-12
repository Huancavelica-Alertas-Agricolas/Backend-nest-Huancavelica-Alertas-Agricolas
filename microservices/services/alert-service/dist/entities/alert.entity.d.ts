export declare enum TipoAlerta {
    LLUVIA = "lluvia",
    TEMPERATURA = "temperatura",
    HELADA = "helada",
    SEQUIA = "sequia",
    VIENTO = "viento"
}
export declare enum EstadoAlerta {
    ACTIVA = "activa",
    ENVIADA = "enviada",
    CANCELADA = "cancelada",
    EXPIRADA = "expirada"
}
export declare class Alert {
    id: number;
    title: string;
    description: string;
    type: TipoAlerta;
    status: EstadoAlerta;
    stationId: number;
    userId: number;
    timestamp: Date;
    expiresAt: Date;
    params: any;
    channels: any[];
    createdAt: Date;
}

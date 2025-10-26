import type { Alert } from "./alert.entity";
export declare enum TipoCanal {
    TELEGRAM = "telegram",
    GMAIL = "gmail",
    SMS = "sms"
}
export declare enum EstadoEnvio {
    PENDIENTE = "pendiente",
    ENVIADO = "enviado",
    FALLIDO = "fallido",
    ENTREGADO = "entregado"
}
export declare class AlertCanal {
    id: number;
    alertId: number;
    channel: TipoCanal;
    recipient: string;
    status: EstadoEnvio;
    sentAt: Date;
    errorMessage: string;
    metadata: any;
    alert: Alert;
    createdAt: Date;
}

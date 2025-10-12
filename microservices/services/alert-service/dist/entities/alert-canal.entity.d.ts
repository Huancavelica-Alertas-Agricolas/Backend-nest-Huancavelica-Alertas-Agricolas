import type { Alert } from "./alert.entity";
export declare enum TipoCanal {
    EMAIL = "email",
    SMS = "sms",
    PUSH = "push",
    WEBHOOK = "webhook"
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

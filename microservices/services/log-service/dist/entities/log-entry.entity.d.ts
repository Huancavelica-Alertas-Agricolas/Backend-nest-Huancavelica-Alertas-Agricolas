export declare enum TipoLog {
    ALERTA_CREADA = "alerta_creada",
    ALERTA_ENVIADA = "alerta_enviada",
    ALERTA_CANCELADA = "alerta_cancelada",
    ERROR_ENVIO = "error_envio",
    LECTURA_RECIBIDA = "lectura_recibida",
    NOTIFICACION_ENVIADA = "notificacion_enviada",
    SISTEMA = "sistema",
    LOGIN = "login",
    LOGOUT = "logout"
}
export declare enum EstadoLog {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}
export declare class LogEntry {
    id: number;
    usuarioId: number;
    alertaId: number;
    tipo: TipoLog;
    status: EstadoLog;
    mensaje: string;
    metadatos: any;
    deliveredAt: Date;
    createdAt: Date;
}

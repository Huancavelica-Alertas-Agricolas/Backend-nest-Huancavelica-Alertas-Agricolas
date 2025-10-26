export declare class AlertaService {
    private readonly logger;
    private readonly client;
    constructor();
    create(alertaData: unknown): Promise<unknown>;
    findAll(): Promise<unknown>;
    findByUser(usuarioId: number): Promise<unknown>;
    findActivas(): Promise<unknown>;
    updateEstado(id: number, estado: string): Promise<unknown>;
    createLog(logData: unknown): Promise<unknown>;
    addCanal(alertaId: number, canalData: unknown): Promise<unknown>;
}

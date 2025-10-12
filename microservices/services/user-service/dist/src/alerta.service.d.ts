export declare class AlertaService {
    private readonly logger;
    private readonly client;
    constructor();
    create(alertaData: any): Promise<any>;
    findAll(): Promise<any>;
    findByUser(usuarioId: number): Promise<any>;
    findActivas(): Promise<any>;
    updateEstado(id: number, estado: any): Promise<any>;
    createLog(logData: any): Promise<any>;
    addCanal(alertaId: number, canalData: any): Promise<any>;
}

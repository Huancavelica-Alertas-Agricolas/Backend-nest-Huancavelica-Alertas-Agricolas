import { UserService } from './user.service';
import { AlertaService } from './alerta.service';
export declare class UserController {
    private readonly userService;
    private readonly alertaService;
    private readonly logger;
    constructor(userService: UserService, alertaService: AlertaService);
    createUser(userData: any): Promise<import("./entities/user.entity").User>;
    getUser(id: number): Promise<import("./entities/user.entity").User>;
    getAllUsers(): Promise<import("./entities/user.entity").User[]>;
    updateUser(data: {
        id: number;
        userData: any;
    }): Promise<import("./entities/user.entity").User>;
    deleteUser(id: number): Promise<void>;
    createAlerta(alertaData: any): Promise<any>;
    getAllAlertas(): Promise<any>;
    getUserAlertas(userId: number): Promise<any>;
    getAlertasActivas(): Promise<any>;
    updateAlertaEstado(data: {
        id: number;
        estado: string;
    }): Promise<any>;
    createLog(logData: any): Promise<any>;
}

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AlertaService } from './alerta.service';
export declare class UserController {
    private readonly userService;
    private readonly alertaService;
    private readonly logger;
    constructor(userService: UserService, alertaService: AlertaService);
    createUser(userData: unknown): Promise<User>;
    getUser(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(data: {
        id: number;
        userData: Partial<User>;
    }): Promise<User>;
    deleteUser(id: number): Promise<void>;
    createAlerta(alertaData: unknown): Promise<unknown>;
    getAllAlertas(): Promise<unknown>;
    getUserAlertas(userId: number): Promise<unknown>;
    getAlertasActivas(): Promise<unknown>;
    updateAlertaEstado(data: {
        id: number;
        estado: string;
    }): Promise<unknown>;
    createLog(logData: unknown): Promise<unknown>;
}

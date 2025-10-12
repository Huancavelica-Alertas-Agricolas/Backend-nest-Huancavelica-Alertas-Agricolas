import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: any): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, userData: any): Promise<User>;
    remove(id: number): Promise<void>;
    findByCode(code: string): Promise<User>;
}

import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: DeepPartial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, userData: DeepPartial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    findByCode(code: string): Promise<User>;
}

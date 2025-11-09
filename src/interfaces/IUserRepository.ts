import { IUser, ICreateUserDto, IUpdateUserDto } from './IUser';

export interface IUserRepository {
    findAll(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null>;
    create(userData: ICreateUserDto): Promise<IUser>;
    update(id: string, userData: IUpdateUserDto): Promise<IUser | null>;
    delete(id: string): Promise<boolean>;
}



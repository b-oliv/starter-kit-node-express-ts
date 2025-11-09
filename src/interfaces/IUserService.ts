import { IUser, ICreateUserDto, IUpdateUserDto } from './IUser';

export interface IUserService {
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: string): Promise<IUser | null>;
    createUser(userData: ICreateUserDto): Promise<IUser>;
    updateUser(id: string, userData: IUpdateUserDto): Promise<IUser | null>;
    deleteUser(id: string): Promise<boolean>;
}



import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUser, ICreateUserDto, IUpdateUserDto } from '../interfaces/IUser';

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<IUser | null> {
        if (!id) {
            throw new Error('User ID is required');
        }
        return await this.userRepository.findById(id);
    }

    async createUser(userData: ICreateUserDto): Promise<IUser> {
        this.validateUserData(userData);
        return await this.userRepository.create(userData);
    }

    async updateUser(id: string, userData: IUpdateUserDto): Promise<IUser | null> {
        if (!id) {
            throw new Error('User ID is required');
        }

        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            return null;
        }

        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id: string): Promise<boolean> {
        if (!id) {
            throw new Error('User ID is required');
        }
        return await this.userRepository.delete(id);
    }

    private validateUserData(userData: ICreateUserDto | IUpdateUserDto): void {
        if ('name' in userData && (!userData.name || userData.name.trim().length === 0)) {
            throw new Error('Name is required and cannot be empty');
        }

        if ('email' in userData) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!userData.email || !emailRegex.test(userData.email)) {
                throw new Error('Valid email is required');
            }
        }
    }
}



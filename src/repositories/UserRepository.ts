import { IUserRepository } from '../interfaces/IUserRepository';
import { IUser, ICreateUserDto, IUpdateUserDto } from '../interfaces/IUser';
import { User } from '../models/User';

// Implémentation en mémoire pour l'exemple
// Dans un vrai projet, cela serait remplacé par une base de données
export class UserRepository implements IUserRepository {
    private users: Map<string, IUser> = new Map();

    async findAll(): Promise<IUser[]> {
        return Array.from(this.users.values());
    }

    async findById(id: string): Promise<IUser | null> {
        return this.users.get(id) || null;
    }

    async create(userData: ICreateUserDto): Promise<IUser> {
        const user = User.create(userData);
        this.users.set(user.id, user);
        return user;
    }

    async update(id: string, userData: IUpdateUserDto): Promise<IUser | null> {
        const user = this.users.get(id);
        if (!user) {
            return null;
        }

        const updatedUser: IUser = {
            ...user,
            ...userData,
        };

        this.users.set(id, updatedUser);
        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        return this.users.delete(id);
    }
}



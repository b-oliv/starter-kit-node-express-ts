import { IUser, ICreateUserDto } from '../interfaces/IUser';

export class User implements IUser {
    public id: string;
    public name: string;
    public email: string;
    public createdAt: Date;

    constructor(id: string, name: string, email: string, createdAt: Date = new Date()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    static create(userData: ICreateUserDto): User {
        const id = this.generateId();
        return new User(id, userData.name, userData.email);
    }

    private static generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}



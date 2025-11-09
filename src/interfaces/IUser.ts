export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface ICreateUserDto {
    name: string;
    email: string;
}

export interface IUpdateUserDto {
    name?: string;
    email?: string;
}



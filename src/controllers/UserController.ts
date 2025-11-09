import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/IUserService';
import { ICreateUserDto, IUpdateUserDto } from '../interfaces/IUser';

export class UserController {
    constructor(private userService: IUserService) { }

    getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: ICreateUserDto = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const userData: IUpdateUserDto = req.body;
            const user = await this.userService.updateUser(id, userData);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deleted = await this.userService.deleteUser(id);

            if (!deleted) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}



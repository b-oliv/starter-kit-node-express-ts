import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../../src/controllers/UserController';
import { IUserService } from '../../../src/interfaces/IUserService';
import { IUser } from '../../../src/interfaces/IUser';

describe('UserController', () => {
    let userController: UserController;
    let mockUserService: jest.Mocked<IUserService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockUserService = {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        } as jest.Mocked<IUserService>;

        userController = new UserController(mockUserService);

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers: IUser[] = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    createdAt: new Date(),
                },
            ];

            mockUserService.getAllUsers.mockResolvedValue(mockUsers);

            await userController.getAllUsers(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should call next with error when service throws', async () => {
            const error = new Error('Service error');
            mockUserService.getAllUsers.mockRejectedValue(error);

            await userController.getAllUsers(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserById', () => {
        it('should return user when found', async () => {
            const mockUser: IUser = {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                createdAt: new Date(),
            };

            mockRequest.params = { id: '1' };
            mockUserService.getUserById.mockResolvedValue(mockUser);

            await userController.getUserById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user not found', async () => {
            mockRequest.params = { id: '1' };
            mockUserService.getUserById.mockResolvedValue(null);

            await userController.getUserById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });

    describe('createUser', () => {
        it('should create user and return 201', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const mockUser: IUser = {
                id: '1',
                ...userData,
                createdAt: new Date(),
            };

            mockRequest.body = userData;
            mockUserService.createUser.mockResolvedValue(mockUser);

            await userController.createUser(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('updateUser', () => {
        it('should update user when found', async () => {
            const updateData = { name: 'Jane Doe' };
            const mockUser: IUser = {
                id: '1',
                name: 'Jane Doe',
                email: 'john@example.com',
                createdAt: new Date(),
            };

            mockRequest.params = { id: '1' };
            mockRequest.body = updateData;
            mockUserService.updateUser.mockResolvedValue(mockUser);

            await userController.updateUser(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockUserService.updateUser).toHaveBeenCalledWith('1', updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user not found', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = { name: 'Jane Doe' };
            mockUserService.updateUser.mockResolvedValue(null);

            await userController.updateUser(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });

    describe('deleteUser', () => {
        it('should delete user and return 204', async () => {
            mockRequest.params = { id: '1' };
            mockUserService.deleteUser.mockResolvedValue(true);

            await userController.deleteUser(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockUserService.deleteUser).toHaveBeenCalledWith('1');
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        });

        it('should return 404 when user not found', async () => {
            mockRequest.params = { id: '1' };
            mockUserService.deleteUser.mockResolvedValue(false);

            await userController.deleteUser(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });
});



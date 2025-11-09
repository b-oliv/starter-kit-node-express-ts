import { UserService } from '../../../src/services/UserService';
import { IUserRepository } from '../../../src/interfaces/IUserRepository';
import { IUser, ICreateUserDto } from '../../../src/interfaces/IUser';

describe('UserService', () => {
    let userService: UserService;
    let mockRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        mockRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as jest.Mocked<IUserRepository>;

        userService = new UserService(mockRepository);
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
                {
                    id: '2',
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    createdAt: new Date(),
                },
            ];

            mockRepository.findAll.mockResolvedValue(mockUsers);

            const result = await userService.getAllUsers();

            expect(result).toEqual(mockUsers);
            expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUserById', () => {
        it('should return user by id', async () => {
            const mockUser: IUser = {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                createdAt: new Date(),
            };

            mockRepository.findById.mockResolvedValue(mockUser);

            const result = await userService.getUserById('1');

            expect(result).toEqual(mockUser);
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
        });

        it('should throw error when id is empty', async () => {
            await expect(userService.getUserById('')).rejects.toThrow('User ID is required');
        });
    });

    describe('createUser', () => {
        it('should create a new user with valid data', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const mockUser: IUser = {
                id: '1',
                ...userData,
                createdAt: new Date(),
            };

            mockRepository.create.mockResolvedValue(mockUser);

            const result = await userService.createUser(userData);

            expect(result).toEqual(mockUser);
            expect(mockRepository.create).toHaveBeenCalledWith(userData);
        });

        it('should throw error when name is empty', async () => {
            const userData: ICreateUserDto = {
                name: '',
                email: 'john@example.com',
            };

            await expect(userService.createUser(userData)).rejects.toThrow(
                'Name is required and cannot be empty'
            );
        });

        it('should throw error when email is invalid', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'invalid-email',
            };

            await expect(userService.createUser(userData)).rejects.toThrow('Valid email is required');
        });
    });

    describe('updateUser', () => {
        it('should update user with valid data', async () => {
            const existingUser: IUser = {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                createdAt: new Date(),
            };

            const updatedUser: IUser = {
                ...existingUser,
                name: 'Jane Doe',
            };

            mockRepository.findById.mockResolvedValue(existingUser);
            mockRepository.update.mockResolvedValue(updatedUser);

            const result = await userService.updateUser('1', { name: 'Jane Doe' });

            expect(result).toEqual(updatedUser);
            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(mockRepository.update).toHaveBeenCalledWith('1', { name: 'Jane Doe' });
        });

        it('should return null when user not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            const result = await userService.updateUser('1', { name: 'Jane Doe' });

            expect(result).toBeNull();
            expect(mockRepository.update).not.toHaveBeenCalled();
        });

        it('should throw error when id is empty', async () => {
            await expect(userService.updateUser('', { name: 'Jane Doe' })).rejects.toThrow(
                'User ID is required'
            );
        });
    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            mockRepository.delete.mockResolvedValue(true);

            const result = await userService.deleteUser('1');

            expect(result).toBe(true);
            expect(mockRepository.delete).toHaveBeenCalledWith('1');
        });

        it('should throw error when id is empty', async () => {
            await expect(userService.deleteUser('')).rejects.toThrow('User ID is required');
        });
    });
});



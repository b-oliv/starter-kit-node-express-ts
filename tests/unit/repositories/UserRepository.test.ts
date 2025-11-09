import { UserRepository } from '../../../src/repositories/UserRepository';
import { ICreateUserDto } from '../../../src/interfaces/IUser';

describe('UserRepository', () => {
    let repository: UserRepository;

    beforeEach(() => {
        repository = new UserRepository();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const user = await repository.create(userData);

            expect(user).toBeDefined();
            expect(user.id).toBeDefined();
            expect(user.name).toBe(userData.name);
            expect(user.email).toBe(userData.email);
            expect(user.createdAt).toBeInstanceOf(Date);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const userData1: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };
            const userData2: ICreateUserDto = {
                name: 'Jane Doe',
                email: 'jane@example.com',
            };

            await repository.create(userData1);
            await repository.create(userData2);

            const users = await repository.findAll();

            expect(users).toHaveLength(2);
        });

        it('should return empty array when no users exist', async () => {
            const users = await repository.findAll();
            expect(users).toHaveLength(0);
        });
    });

    describe('findById', () => {
        it('should return user by id', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const createdUser = await repository.create(userData);
            const foundUser = await repository.findById(createdUser.id);

            expect(foundUser).toBeDefined();
            expect(foundUser?.id).toBe(createdUser.id);
            expect(foundUser?.name).toBe(userData.name);
        });

        it('should return null when user not found', async () => {
            const user = await repository.findById('non-existent-id');
            expect(user).toBeNull();
        });
    });

    describe('update', () => {
        it('should update user', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const createdUser = await repository.create(userData);
            const updatedUser = await repository.update(createdUser.id, { name: 'Jane Doe' });

            expect(updatedUser).toBeDefined();
            expect(updatedUser?.name).toBe('Jane Doe');
            expect(updatedUser?.email).toBe(userData.email);
        });

        it('should return null when updating non-existent user', async () => {
            const updatedUser = await repository.update('non-existent-id', { name: 'Jane Doe' });
            expect(updatedUser).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete user', async () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const createdUser = await repository.create(userData);
            const deleted = await repository.delete(createdUser.id);

            expect(deleted).toBe(true);

            const foundUser = await repository.findById(createdUser.id);
            expect(foundUser).toBeNull();
        });

        it('should return false when deleting non-existent user', async () => {
            const deleted = await repository.delete('non-existent-id');
            expect(deleted).toBe(false);
        });
    });
});



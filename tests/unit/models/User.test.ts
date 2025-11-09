import { User } from '../../../src/models/User';
import { ICreateUserDto } from '../../../src/interfaces/IUser';

describe('User', () => {
    describe('create', () => {
        it('should create a user with generated id', () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const user = User.create(userData);

            expect(user).toBeInstanceOf(User);
            expect(user.id).toBeDefined();
            expect(user.name).toBe(userData.name);
            expect(user.email).toBe(userData.email);
            expect(user.createdAt).toBeInstanceOf(Date);
        });

        it('should generate unique ids', () => {
            const userData: ICreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const user1 = User.create(userData);
            const user2 = User.create(userData);

            expect(user1.id).not.toBe(user2.id);
        });
    });

    describe('constructor', () => {
        it('should create user with all properties', () => {
            const id = 'test-id';
            const name = 'John Doe';
            const email = 'john@example.com';
            const createdAt = new Date('2023-01-01');

            const user = new User(id, name, email, createdAt);

            expect(user.id).toBe(id);
            expect(user.name).toBe(name);
            expect(user.email).toBe(email);
            expect(user.createdAt).toBe(createdAt);
        });

        it('should use current date when createdAt not provided', () => {
            const id = 'test-id';
            const name = 'John Doe';
            const email = 'john@example.com';

            const beforeCreation = new Date();
            const user = new User(id, name, email);
            const afterCreation = new Date();

            expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
            expect(user.createdAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
        });
    });
});



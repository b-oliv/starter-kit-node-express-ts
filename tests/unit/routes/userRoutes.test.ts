import request from 'supertest';
import express, { Express } from 'express';
import { createUserRoutes } from '../../../src/routes/userRoutes';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { errorHandler } from '../../../src/middleware/errorHandler';

describe('userRoutes', () => {
    let app: Express;
    let userRepository: UserRepository;

    beforeEach(() => {
        // Créer un nouveau repository pour chaque test pour l'isolation
        userRepository = new UserRepository();
        app = express();
        app.use(express.json());
        app.use('/api/users', createUserRoutes(userRepository));
        // Ajouter le middleware errorHandler pour gérer les erreurs
        app.use(errorHandler);
    });

    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const userData1 = {
                name: 'John Doe',
                email: 'john@example.com',
            };
            const userData2 = {
                name: 'Jane Doe',
                email: 'jane@example.com',
            };

            // Créer les utilisateurs via les routes
            await request(app).post('/api/users').send(userData1);
            await request(app).post('/api/users').send(userData2);

            const response = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });

        it('should return empty array when no users exist', async () => {
            const response = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return user by id', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            // Créer l'utilisateur via la route
            const createResponse = await request(app)
                .post('/api/users')
                .send(userData);
            const createdUser = createResponse.body;

            const response = await request(app).get(`/api/users/${createdUser.id}`);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(createdUser.id);
            expect(response.body.name).toBe(userData.name);
            expect(response.body.email).toBe(userData.email);
        });

        it('should return 404 when user not found', async () => {
            const response = await request(app).get('/api/users/non-existent-id');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            const response = await request(app)
                .post('/api/users')
                .send(userData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(userData.name);
            expect(response.body.email).toBe(userData.email);
            expect(response.body.id).toBeDefined();
            expect(response.body.createdAt).toBeDefined();
        });

        it('should return 500 when validation fails', async () => {
            const invalidUserData = {
                name: '',
                email: 'invalid-email',
            };

            const response = await request(app)
                .post('/api/users')
                .send(invalidUserData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(500);
            expect(response.body.status).toBe('error');
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            // Créer l'utilisateur via la route
            const createResponse = await request(app)
                .post('/api/users')
                .send(userData);
            const createdUser = createResponse.body;

            const updateData = {
                name: 'Jane Doe',
            };

            const response = await request(app)
                .put(`/api/users/${createdUser.id}`)
                .send(updateData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.email).toBe(userData.email);
        });

        it('should return 404 when user not found', async () => {
            const updateData = {
                name: 'Jane Doe',
            };

            const response = await request(app)
                .put('/api/users/non-existent-id')
                .send(updateData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
            };

            // Créer l'utilisateur via la route
            const createResponse = await request(app)
                .post('/api/users')
                .send(userData);
            const createdUser = createResponse.body;

            const response = await request(app).delete(`/api/users/${createdUser.id}`);

            expect(response.status).toBe(204);

            // Vérifier que l'utilisateur a bien été supprimé
            const getResponse = await request(app).get(`/api/users/${createdUser.id}`);
            expect(getResponse.status).toBe(404);
        });

        it('should return 404 when user not found', async () => {
            const response = await request(app).delete('/api/users/non-existent-id');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });
});


import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

// Factory function pour créer les routes avec un repository injecté (pour les tests)
export const createUserRoutes = (repository?: IUserRepository) => {
  const router = Router();
  const userRepository = repository || new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.get('/', userController.getAllUsers);
  router.get('/:id', userController.getUserById);
  router.post('/', userController.createUser);
  router.put('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);

  return router;
};

// Export par défaut pour l'utilisation normale
export const userRoutes = createUserRoutes();



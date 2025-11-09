# Starter Kit API Node.js + Express + TypeScript

Starter kit pour créer une API REST avec Node.js, Express et TypeScript, SOLID.

## 🏗️ Architecture

- **Single Responsibility Principle (SRP)** : Chaque classe a une seule responsabilité
  - `UserController` : Gère les requêtes HTTP
  - `UserService` : Contient la logique métier
  - `UserRepository` : Gère l'accès aux données

- **Open/Closed Principle (OCP)** : Ouvert à l'extension, fermé à la modification
  - Utilisation d'interfaces pour permettre l'extension sans modifier le code existant

- **Liskov Substitution Principle (LSP)** : Les implémentations peuvent être substituées
  - `UserRepository` implémente `IUserRepository`
  - `UserService` implémente `IUserService`

- **Interface Segregation Principle (ISP)** : Interfaces spécifiques et ciblées
  - `IUserRepository` : Interface pour l'accès aux données
  - `IUserService` : Interface pour la logique métier

- **Dependency Inversion Principle (DIP)** : Dépendre des abstractions, pas des implémentations
  - Les services dépendent des interfaces, pas des implémentations concrètes

## 📁 Structure du projet

```
starter-kit-nodejs-express-ts/
├── src/
│   ├── controllers/      # Contrôleurs (couche présentation)
│   ├── services/         # Services (logique métier)
│   ├── repositories/     # Répositories (accès aux données)
│   ├── models/           # Modèles de domaine
│   ├── interfaces/       # Interfaces et contrats
│   ├── routes/           # Routes Express
│   ├── middleware/       # Middlewares Express
│   └── index.ts          # Point d'entrée
├── tests/
│   └── unit/             # Tests unitaires
├── dist/                 # Code compilé (généré)
├── coverage/             # Rapports de couverture (généré)
└── package.json
```

## 🚀 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à la racine :
```
PORT=3000
NODE_ENV=development
```

## 📝 Scripts disponibles

- `npm run dev` : Démarrer le serveur en mode développement avec rechargement automatique
- `npm run build` : Compiler le TypeScript
- `npm start` : Démarrer le serveur en mode production
- `npm test` : Exécuter les tests unitaires
- `npm run test:watch` : Exécuter les tests en mode watch
- `npm run test:coverage` : Générer un rapport de couverture de code
- `npm run lint` : Vérifier le code avec ESLint
- `npm run lint:fix` : Corriger automatiquement les erreurs ESLint
- `npm run format` : Formater le code avec Prettier

## 🧪 Tests

Les tests unitaires sont écrits avec Jest et couvrent :
- Les repositories
- Les services
- Les contrôleurs
- Les modèles

Pour exécuter les tests :
```bash
npm test
```

Pour voir la couverture de code :
```bash
npm run test:coverage
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Vérifier l'état de l'API

### Users
- `GET /api/users` - Récupérer tous les utilisateurs
- `GET /api/users/:id` - Récupérer un utilisateur par ID
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Exemple de création d'utilisateur

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

## 🔧 Technologies utilisées

- **Node.js** : Runtime JavaScript
- **Express** : Framework web
- **TypeScript** : Langage de programmation typé
- **Jest** : Framework de tests
- **ESLint** : Linter pour le code
- **Prettier** : Formateur de code
- **Helmet** : Sécurité HTTP
- **CORS** : Gestion des CORS

## 📚 Principes SOLID appliqués

### Single Responsibility Principle
Chaque classe a une responsabilité unique et bien définie.

### Open/Closed Principle
Le code est ouvert à l'extension (via les interfaces) mais fermé à la modification.

### Liskov Substitution Principle
Les implémentations peuvent être substituées sans casser le code client.

### Interface Segregation Principle
Les interfaces sont spécifiques et ne forcent pas les classes à implémenter des méthodes inutiles.

### Dependency Inversion Principle
Les dépendances sont injectées via les constructeurs, permettant une meilleure testabilité et flexibilité.

## 🎯 Prochaines étapes

Pour étendre ce starter kit, vous pouvez :
- Ajouter une base de données (PostgreSQL, MongoDB, etc.)
- Implémenter l'authentification JWT
- Ajouter la validation des données avec Zod ou class-validator
- Ajouter la documentation API avec Swagger
- Implémenter la pagination
- Ajouter des tests d'intégration
- Configurer CI/CD

## 📄 Licence

MIT



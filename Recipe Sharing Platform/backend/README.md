# Recipe Sharing Platform - Backend API

Express.js backend with OOP design patterns, JWT authentication, and MongoDB integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── classes/
│   ├── User.js         # User OOP class with auth logic
│   └── Recipe.js       # Recipe OOP class with CRUD logic
├── models/
│   ├── User.js         # User Mongoose schema
│   └── Recipe.js       # Recipe Mongoose schema
├── routes/
│   ├── userRoutes.js   # User authentication routes
│   └── recipeRoutes.js # Recipe CRUD routes
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── server.js           # Express server entry point
└── package.json        # Dependencies
```

## 🔑 OOP Design

### UserClass
- Static methods: `register()`, `login()`, `generateToken()`
- Instance methods: `getPublicProfile()`, `updateProfile()`

### RecipeClass
- Static methods: `createRecipe()`, `getAllRecipes()`, `getRecipeById()`
- Instance methods: `updateRecipe()`, `deleteRecipe()`, `toggleLike()`

## 📡 API Endpoints

### Users
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get profile (protected)
- `PUT /api/users/profile` - Update profile (protected)

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe
- `POST /api/recipes` - Create recipe (protected)
- `PUT /api/recipes/:id` - Update recipe (protected)
- `DELETE /api/recipes/:id` - Delete recipe (protected)
- `POST /api/recipes/:id/like` - Like recipe (protected)

## 🔒 Authentication

Uses JWT tokens. Include in headers:
```
Authorization: Bearer <token>
```

## 🗄️ Database

MongoDB connection configured via `MONGODB_URI` in `.env`

## 📝 Environment Variables

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-secret-key
NODE_ENV=development
```

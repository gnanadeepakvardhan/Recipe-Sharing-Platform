# 🍳 Recipe Sharing Platform - Full Stack Application

A modern, full-stack recipe sharing platform built with **Express.js** (OOP) + **Next.js** + **MongoDB**.

## 📋 Project Overview

This application demonstrates proficiency in:
- **RESTful API** development with Express.js
- **Object-Oriented Programming (OOP)** design patterns in JavaScript
- **JWT-based authentication** and route protection
- **MongoDB** schema design and data modeling
- **Frontend development** with Next.js (React-based)
- **Full stack integration** via API calls
- Modern UI with **Tailwind CSS**

## 🏗️ Architecture

```
Recipe Sharing Platform/
├── backend/              # Express.js backend API
│   ├── classes/          # OOP classes (User, Recipe)
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── server.js         # Entry point
│
└── frontend/             # Next.js frontend
    ├── app/              # Next.js app directory
    ├── components/       # React components
    ├── lib/              # API & auth utilities
    └── public/           # Static assets
```

## 🚀 Features

### Backend
- ✅ User authentication (register, login)
- ✅ JWT token-based authentication
- ✅ CRUD operations for recipes
- ✅ Like/unlike recipes
- ✅ OOP classes for User and Recipe
- ✅ MongoDB integration
- ✅ Protected routes
- ✅ RESTful API design

### Frontend
- ✅ User registration and login
- ✅ Browse all recipes
- ✅ Search and filter recipes
- ✅ View recipe details
- ✅ Create new recipes
- ✅ Edit own recipes
- ✅ Like recipes
- ✅ User profile management
- ✅ Responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **js-cookie** - Cookie management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
PORT=5000
MONGODB_URI=mongodb-uri
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# Using Homebrew on macOS
brew services start mongodb-community

# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

5. Run the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional):
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe (protected)
- `PUT /api/recipes/:id` - Update recipe (protected, author only)
- `DELETE /api/recipes/:id` - Delete recipe (protected, author only)
- `POST /api/recipes/:id/like` - Like/unlike recipe (protected)

## 📝 Sample API Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Recipe (with auth token)
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish",
    "ingredients": ["Spaghetti", "Eggs", "Bacon", "Parmesan"],
    "instructions": ["Cook spaghetti", "Fry bacon", "Mix with eggs and cheese"],
    "cuisine": "Italian",
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Medium"
  }'
```

## 🎨 OOP Design Pattern

The backend uses Object-Oriented Programming principles with encapsulated logic in classes:

### UserClass (`backend/classes/User.js`)
- `register()` - Static method to register new users
- `login()` - Static method to authenticate users
- `generateToken()` - Static method to create JWT tokens
- `getPublicProfile()` - Instance method to get user profile
- `updateProfile()` - Instance method to update user profile

### RecipeClass (`backend/classes/Recipe.js`)
- `createRecipe()` - Static method to create recipes
- `getAllRecipes()` - Static method to fetch recipes with filters
- `getRecipeById()` - Static method to get single recipe
- `updateRecipe()` - Instance method to update recipe
- `deleteRecipe()` - Instance method to delete recipe
- `toggleLike()` - Instance method to like/unlike recipe

## 🗂️ Project Structure

```
Recipe Sharing Platform/
├── backend/
│   ├── classes/
│   │   ├── User.js         # User OOP class
│   │   └── Recipe.js       # Recipe OOP class
│   ├── models/
│   │   ├── User.js         # User Mongoose model
│   │   └── Recipe.js       # Recipe Mongoose model
│   ├── routes/
│   │   ├── userRoutes.js   # User endpoints
│   │   └── recipeRoutes.js # Recipe endpoints
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── profile/        # Profile page
│   │   └── recipes/
│   │       ├── [id]/      # Recipe detail
│   │       ├── [id]/edit/  # Edit recipe
│   │       └── new/        # Create recipe
│   ├── components/
│   │   └── Navbar.tsx      # Navigation component
│   ├── lib/
│   │   ├── api.js         # API client
│   │   └── auth.js        # Auth utilities
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Input validation
- Error handling

## 🧪 Testing

### Test Backend API
```bash
# Start backend
cd backend && npm run dev

# Test in another terminal
curl http://localhost:5000/api/health
```

### Test Frontend
```bash
# Start frontend
cd frontend && npm run dev

# Open browser
http://localhost:3000
```

## 🚢 Deployment

### Backend (Render/Railway)
1. Push backend code to GitHub
2. Connect to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push frontend code to GitHub
2. Connect to Vercel/Netlify
3. Set environment variables
4. Deploy

### Environment Variables for Production
- Backend: `MONGODB_URI`, `JWT_SECRET`, `PORT`
- Frontend: `NEXT_PUBLIC_API_URL`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Deepak - Full Stack Developer

## 🎓 Learning Outcomes

After completing this project, you'll have learned:
- ✅ Building RESTful APIs with Express.js
- ✅ Applying OOP principles in JavaScript
- ✅ Implementing JWT authentication
- ✅ Working with MongoDB and Mongoose
- ✅ Building responsive UIs with Next.js
- ✅ Full stack integration
- ✅ Deployment strategies

---

**Happy Cooking! 🍳**


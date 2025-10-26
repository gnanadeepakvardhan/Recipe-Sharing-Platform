# 🏗️ Recipe Sharing Platform - Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │   Pages     │  │  Components  │  │   Lib (API)  │       │
│  │             │  │              │  │              │       │
│  │ - Home      │  │ - Navbar     │  │ - api.js     │       │
│  │ - Login     │  │              │  │ - auth.js    │       │
│  │ - Register  │  └──────────────┘  └──────────────┘       │
│  │ - Profile   │                                            │
│  │ - Recipes   │                  Port: 3000                │
│  └─────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP REST API
                              │ (Axios)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (Express.js)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │  Routes     │  │ Middleware  │  │  Models      │       │
│  │             │  │             │  │              │       │
│  │ - Users     │  │ - auth.js   │  │ - User.js    │       │
│  │ - Recipes   │  │   (JWT)     │  │ - Recipe.js  │       │
│  └─────────────┘  └─────────────┘  └──────────────┘       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              OOP Classes                             │  │
│  │  ┌──────────────┐        ┌──────────────┐          │  │
│  │  │  UserClass   │        │ RecipeClass  │          │  │
│  │  │             │        │             │          │  │
│  │  │ • register()│        │• create()   │          │  │
│  │  │ • login()   │        │• update()   │          │  │
│  │  │ • getProfile│        │• delete()   │          │  │
│  │  │ • update()  │        │• toggleLike │          │  │
│  │  └──────────────┘        └──────────────┘          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│                    Port: 5000                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ MongoDB Driver
                              │ (Mongoose)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                        │
│  ┌──────────────────┐      ┌──────────────────┐            │
│  │   Users          │      │    Recipes       │            │
│  │                  │      │                  │            │
│  │ - _id            │      │ - _id            │            │
│  │ - username       │      │ - title          │            │
│  │ - email          │      │ - description    │            │
│  │ - password (hash)│      │ - ingredients    │            │
│  │ - timestamps     │      │ - instructions   │            │
│  └──────────────────┘      │ - author (ref)   │            │
│                            │ - likes (refs)   │            │
│                            │ - timestamps     │            │
│                            └──────────────────┘            │
│                                                             │
│                  Port: 27017                                │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Registration/Login Flow
```
Frontend (User Input)
  → POST /api/users/register
  → Express Router (userRoutes.js)
  → UserClass.register()
  → User Model (Mongoose)
  → MongoDB (Save User)
  → Generate JWT Token
  → Return Token to Frontend
  → Store in Cookies
```

### 2. Recipe Creation Flow
```
Frontend (Recipe Form)
  → POST /api/recipes (with JWT)
  → Auth Middleware (verify JWT)
  → Express Router (recipeRoutes.js)
  → RecipeClass.createRecipe()
  → Recipe Model (Mongoose)
  → MongoDB (Save Recipe)
  → Return Recipe to Frontend
```

### 3. Recipe Like Flow
```
Frontend (Like Button)
  → POST /api/recipes/:id/like (with JWT)
  → Auth Middleware (verify JWT)
  → RecipeClass.toggleLike()
  → Update Recipe in MongoDB
  → Return Updated Recipe
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **js-cookie** - Cookie management

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

## OOP Design Pattern

### UserClass
```javascript
// Static Methods (Class-level)
UserClass.register(username, email, password)
UserClass.login(email, password)
UserClass.generateToken(userId)

// Instance Methods (Object-level)
userInstance.getPublicProfile()
userInstance.updateProfile(updates)
```

### RecipeClass
```javascript
// Static Methods (Class-level)
RecipeClass.createRecipe(data, authorId)
RecipeClass.getAllRecipes(filters)
RecipeClass.getRecipeById(recipeId)
RecipeClass.isAuthor(recipeId, userId)

// Instance Methods (Object-level)
recipeInstance.updateRecipe(updates)
recipeInstance.deleteRecipe()
recipeInstance.toggleLike(userId)
recipeInstance.toPublicJSON()
```

## Security Features

1. **Authentication**: JWT tokens with 7-day expiration
2. **Authorization**: Protected routes using middleware
3. **Password Hashing**: bcryptjs with salt rounds
4. **Input Validation**: Mongoose schema validation
5. **CORS**: Configured for cross-origin requests
6. **Error Handling**: Centralized error middleware

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID

### Protected Endpoints (Require JWT)
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe (author only)
- `DELETE /api/recipes/:id` - Delete recipe (author only)
- `POST /api/recipes/:id/like` - Like/unlike recipe

## Database Schema

### User Schema
```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  createdAt: Date
  updatedAt: Date
}
```

### Recipe Schema
```javascript
{
  title: String (required)
  description: String (required)
  ingredients: [String] (required)
  instructions: [String] (required)
  cuisine: String (default: 'Other')
  prepTime: Number (required)
  cookTime: Number (required)
  servings: Number (required)
  difficulty: String (enum: ['Easy', 'Medium', 'Hard'])
  author: ObjectId (ref: 'User')
  likes: [ObjectId] (ref: 'User')
  createdAt: Date
  updatedAt: Date
}
```

## File Structure

```
Recipe Sharing Platform/
├── backend/
│   ├── classes/          # OOP Classes
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── models/           # Mongoose Models
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── routes/           # Express Routes
│   │   ├── userRoutes.js
│   │   └── recipeRoutes.js
│   ├── middleware/        # Middleware
│   │   └── auth.js
│   ├── server.js          # Entry point
│   ├── package.json
│   └── env.example.txt
│
├── frontend/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── profile/
│   │   └── recipes/
│   ├── components/       # React Components
│   │   └── Navbar.tsx
│   ├── lib/              # Utilities
│   │   ├── api.js
│   │   └── auth.js
│   ├── package.json
│   └── tailwind.config.js
│
├── README.md
├── QUICKSTART.md
└── ARCHITECTURE.md (this file)
```

## Deployment Architecture

### Development
- Frontend: `localhost:3000`
- Backend: `localhost:5000`
- MongoDB: `localhost:27017`

### Production
- Frontend: Deploy to Vercel/Netlify
- Backend: Deploy to Render/Railway
- MongoDB: Use MongoDB Atlas (cloud)

## Environment Variables

### Backend
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Performance Considerations

1. **MongoDB Indexes**: Created on username, email, and text search fields
2. **Password Hashing**: Async bcrypt with 10 salt rounds
3. **JWT Expiration**: 7-day tokens reduce server load
4. **Middleware Chain**: Optimized middleware execution order
5. **React Optimization**: Next.js automatic code splitting

## Scalability

- **Horizontal Scaling**: Stateless backend, can run multiple instances
- **Database**: MongoDB sharding for large datasets
- **Caching**: Can add Redis for session management
- **CDN**: Static assets served via CDN in production
- **Load Balancer**: Nginx for request distribution

## Future Enhancements

1. Image upload for recipes
2. Recipe ratings and reviews
3. User follow system
4. Recipe collections/favorites
5. Advanced search with filters
6. Email notifications
7. Social sharing
8. Recipe printing/PDF export

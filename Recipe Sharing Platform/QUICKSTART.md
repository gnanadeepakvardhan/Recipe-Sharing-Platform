# 🚀 Quick Start Guide

Get your Recipe Sharing Platform up and running in minutes!

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Setup Steps

### 1. Clone/Download the Repository

```bash
cd "Recipe Sharing Platform"
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy env.example.txt to .env or create manually with:
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
EOF

# Start MongoDB (if running locally)
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows, ensure MongoDB service is running
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo

# Start backend server
npm run dev
```

Backend should now be running on `http://localhost:5000`

### 3. Frontend Setup (New Terminal)

```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should now be running on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## 🧪 Test the Application

### Create an Account
1. Click "Register" in the navbar
2. Fill in username, email, and password
3. Click "Register"

### Create a Recipe
1. Click "Add Recipe" in the navbar
2. Fill in recipe details
3. Click "Create Recipe"

### Browse Recipes
1. View all recipes on the homepage
2. Click "View Recipe" to see details
3. Search and filter recipes

## 📦 Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- For MongoDB Atlas, update connection string

### Port Already in Use
- Change PORT in backend/.env to another port (e.g., 5001)
- Update NEXT_PUBLIC_API_URL in frontend/.env.local

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Environment Variables

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### Frontend (.env.local) - Optional
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎯 Next Steps

1. ✅ Application is running
2. ✅ Create your first recipe
3. ✅ Explore the codebase
4. ✅ Customize features
5. 🚀 Deploy to production!

For detailed information, see [README.md](README.md)

Happy Cooking! 🍳

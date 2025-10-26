# 🔧 Complete Setup Guide - Environment Variables

This guide shows you how to get **every value** for your `.env` file.

## 📝 Environment Variables Breakdown

### 1. PORT
**Value:** `5000` (or any available port)
- This is the port where your backend server will run
- Can be 3000, 5000, 8000, etc.
- Just make sure it's not already in use

### 2. MONGODB_URI
**Where to get it:**

#### Option A: Local MongoDB
```bash
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
```

**Steps:**
1. Install MongoDB locally:
   - **Windows:** Download from https://www.mongodb.com/try/download/community
   - **Mac:** `brew install mongodb-community`
   - **Linux:** `sudo apt-get install mongodb`
   - **Or use Docker:** `docker run -d -p 27017:27017 --name mongodb mongo`

2. Start MongoDB service
3. Use the connection string above

#### Option B: MongoDB Atlas (Cloud - Recommended for Production)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipe-sharing?retryWrites=true&w=majority
```

**Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `recipe-sharing`

### 3. JWT_SECRET
**Value:** Any random string (minimum 32 characters)

**How to generate it:**

#### Option A: Online Generator
Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" section
- Copy any 256-bit key

#### Option B: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Option C: Using Online Tools
Visit: https://generate-secret.vercel.app/64

#### Option D: Simple Manual String
Just use a long random string like:
```
JWT_SECRET=recipe-sharing-platform-secret-key-2025-deepak-123456789
```

**Important:** Keep this secret! Never commit it to Git.

### 4. NODE_ENV
**Value:** `development` (for local development) or `production` (for deployment)

## 🎯 Complete .env File Examples

### For Local Development (Local MongoDB)
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
NODE_ENV=development
```

### For Local Development (MongoDB Atlas)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipe-sharing?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
NODE_ENV=development
```

### For Production Deployment
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipe-sharing?retryWrites=true&w=majority
JWT_SECRET=<your-strong-production-secret-key>
NODE_ENV=production
```

## 📋 Quick Setup Steps

### Step 1: Create .env file in backend folder
```bash
cd backend
touch .env  # Linux/Mac
# Or create .env file manually
```

### Step 2: Add environment variables

**Windows PowerShell:**
```powershell
cd backend
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-random-secret-key-here
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```

**Linux/Mac:**
```bash
cd backend
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-sharing
JWT_SECRET=your-random-secret-key-here
NODE_ENV=development
EOF
```

## 🧪 Test Your Setup

### Test MongoDB Connection
```bash
# Try connecting to MongoDB
mongosh "mongodb://localhost:27017/recipe-sharing"

# Or for Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipe-sharing"
```

### Test Backend
```bash
cd backend
npm install
npm run dev

# Should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

## ⚠️ Important Notes

1. **Never commit .env to Git** - It's already in .gitignore
2. **JWT_SECRET** - Use a strong random string
3. **MONGODB_URI** - Keep password secure
4. **Local vs Atlas** - Atlas is easier for deployment

## 🔐 Security Checklist

- [ ] Strong JWT_SECRET (at least 32 characters)
- [ ] MongoDB password is secure
- [ ] .env file is in .gitignore
- [ ] Never share .env file publicly
- [ ] Use different secrets for development/production

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Check if MongoDB is running
- Verify MONGODB_URI is correct
- For Atlas, check network access settings

### "JWT verification failed"
- Check JWT_SECRET matches in all environments
- Ensure no extra spaces in .env file

### "Port already in use"
- Change PORT to another number (e.g., 5001)
- Kill process using port: `lsof -i :5000`

## 🎓 Quick Reference Table

| Variable | Where to Get | Example |
|----------|--------------|---------|
| PORT | Choose any port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/recipe-sharing |
| JWT_SECRET | Generate random key | a1b2c3d4e5f6... |
| NODE_ENV | Set manually | development |

## 📞 Next Steps

Once your .env is configured:
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000 🚀

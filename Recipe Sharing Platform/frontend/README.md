# Recipe Sharing Platform - Frontend

Next.js 14 frontend with TypeScript, Tailwind CSS, and API integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout with Navbar
│   ├── page.tsx           # Home page - Recipe list
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── profile/           # User profile page
│   └── recipes/
│       ├── [id]/          # Recipe detail page
│       ├── [id]/edit/     # Edit recipe page
│       └── new/           # Create recipe page
├── components/
│   └── Navbar.tsx         # Navigation component
├── lib/
│   ├── api.js            # API client with axios
│   └── auth.js           # Auth utilities
└── public/               # Static assets
```

## 🎨 Styling

Uses **Tailwind CSS** for all styling. Configured in `tailwind.config.js`.

## 📡 API Integration

All API calls are handled through:
- `lib/api.js` - API client using axios
- `lib/auth.js` - Authentication utilities

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token stored in cookies
3. Token attached to all API requests
4. Protected routes check auth state
5. User profile accessible globally

## 🌐 Pages

- `/` - Home (Recipe list with search/filter)
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (protected)
- `/recipes/new` - Create recipe (protected)
- `/recipes/[id]` - Recipe detail
- `/recipes/[id]/edit` - Edit recipe (protected, author only)

## 📝 Environment Variables

```bash
# Optional
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Default API URL is set in `next.config.js` as `http://localhost:5000/api`

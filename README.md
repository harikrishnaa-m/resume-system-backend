# Resume System Backend

A simple backend API for resume management built with Node.js, Express, and MongoDB.

## Features

1. User registration and login with JWT authentication
2. Password security with bcrypt hashing
3. CRUD operations for resume management
4. Protected API routes
5. CORS support for frontend integration
6. MongoDB database integration

## Setup

1. Clone the repository
2. Run `npm install`
3. Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resume-system
   JWT_SECRET=your-jwt-secret
   ```
4. Start server: `npm start`

## API Routes

**Auth Routes (`/api/auth`)**

1. POST `/register` - Register user
2. POST `/login` - Login user

**Resume Routes (`/api/resume`)**

1. GET `/` - Get user resume (protected)
2. POST `/` - Create resume (protected)
3. PUT `/` - Update resume (protected)
4. DELETE `/` - Delete resume (protected)

**Integration Routes (`/api/integration`)**

1. POST `/integrate` - Integrate external platform data (protected)
   - Supports: Coursera, Udemy
   - Auto-updates resume with course completions

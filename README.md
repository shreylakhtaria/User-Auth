# User-Auth
A small Full-stack Auth System Made using latest Framework

## What is this project?

User-Auth is a full-stack authentication system that allows users to register, log in, and View their profiles. It demonstrates secure authentication practices using modern web technologies.

The project consists of:
- A Next.js frontend with a clean user interface
- A NestJS backend with GraphQL API
- MongoDB database integration

## How to run the project

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or MongoDB Atlas)

### Steps to run

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/User-Auth.git
   cd User-Auth
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   The backend will run on http://localhost:3001 by default

3. **Start the frontend application**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

4. **Use the application**
   - Visit http://localhost:3000 in your browser
   - Register a new account or log in with an existing one
   - Explore the authenticated features
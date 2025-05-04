# Echo Student Society Portal

A MERN stack application for managing student society activities and memberships.

## Project Structure

```
echo-web-app/
├── frontend/          # React frontend
├── backend/           # Node.js/Express backend
└── package.json       # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Install dependencies in frontend and backend folders:
   ```bash
   npm run install-all
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/echo-portal
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

This will start both the frontend (port 3000) and backend (port 5000) servers.

## Features

- User authentication and authorization
- Society management
- Event management
- Member management
- Announcements
- And more...

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
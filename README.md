# ComX

ComX is a full-stack collaboration platform for teams and communities. It combines authentication, community management, project tracking, task workflows, real-time chat, shared calendars, video calls, and public user profiles in one codebase.

This repository contains:

- `comX-frontend`: React + Vite client
- `comX-backend`: Express + Prisma API and Socket.IO server

## Features

- Email/password authentication with OTP verification
- Forgot-password OTP flow
- Community creation and join-code based onboarding
- Role-based member management (`OWNER`, `ADMIN`, `MEMBER`, `QUEUE`, `BANNED`)
- Project creation with milestones and team assignment
- Task creation, completion, review, and tracking
- Real-time project chat with Socket.IO
- Community calendar events
- LiveKit-based community calls
- User profiles, skills, and follow/unfollow support

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Redux Toolkit
- TanStack React Query
- Axios
- Tailwind CSS
- Radix UI
- Framer Motion
- Socket.IO Client
- LiveKit Components

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.IO
- JWT via cookies
- bcryptjs
- Nodemailer
- Multer
- Cloudinary
- LiveKit Server SDK

## Repository Structure

```text
.
|-- comX-backend/
|   |-- prisma/
|   |   |-- migrations/
|   |   `-- schema.prisma
|   `-- src/
|       |-- config/
|       |-- controllers/
|       |-- middlewares/
|       |-- routes/
|       |-- schemas/
|       |-- types/
|       |-- utils/
|       `-- server.ts
`-- comX-frontend/
    |-- public/
    `-- src/
        |-- api/
        |-- components/
        |-- hooks/
        |-- lib/
        |-- pages/
        |-- state/
        |-- types/
        |-- App.tsx
        `-- main.tsx
```

## Architecture

ComX is a modular monolith:

- the frontend is a single-page React application
- the backend is a single Express service
- PostgreSQL stores relational data
- Socket.IO handles project chat
- LiveKit powers video calls
- Prisma manages schema and data access

HTTP APIs are exposed under:

- `/auth`
- `/community`
- `/member`
- `/calendar`
- `/project`
- `/task`
- `/user`

## Environment Variables

### Backend (`comX-backend/.env`)

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/comx
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

EMAIL=your_email_address
PASSWORD=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### Frontend (`comX-frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_PUBLIC_LIVEKIT_URL=your_livekit_ws_url
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm

### Install dependencies

```bash
cd comX-backend
npm install

cd ../comX-frontend
npm install
```

### Run database migrations

```bash
cd comX-backend
npx prisma migrate deploy
```

### Start the backend

```bash
cd comX-backend
npm run build
npm start
```

### Start the frontend

```bash
cd comX-frontend
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Notes

- The backend expects cookie-based auth, so frontend requests use `withCredentials: true`.
- Request validation schemas now live directly under `comX-backend/src/schemas`.
- File uploads are first written locally by Multer and then uploaded to Cloudinary.
- Email verification and password reset rely on SMTP credentials configured in backend env.
- LiveKit token issuance is handled by the backend route `/community/livekit/get-token`

## Deployment

Recommended free-tier setup:

- frontend on Vercel
- backend on Render
- database on Neon or Supabase Postgres
- video calling on LiveKit Cloud
- media uploads on Cloudinary

### 1. Backend on Render

- Create a new Web Service from this repository.
- Set `Root Directory` to `comX-backend`.
- Render can also detect the included `render.yaml` blueprint from the repo root.
- Use:
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`

Backend environment variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/comx
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL=your_email_address
PASSWORD=your_email_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

Notes:

- `FRONTEND_URL` can be a comma-separated list if you want to allow multiple origins.
- `npm start` already runs `prisma migrate deploy` before starting the server.

### 2. Frontend on Vercel

- Import the same repository in Vercel.
- Set the project root to `comX-frontend`.
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Frontend environment variables:

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_SOCKET_URL=https://your-backend.onrender.com
VITE_PUBLIC_LIVEKIT_URL=wss://your-livekit-instance.livekit.cloud
```

The included `comX-frontend/vercel.json` rewrites all routes to `index.html`, which is required for React Router deep links.

### 3. Post-deploy verification

After both services are live, verify:

- register, email OTP, login, logout
- community creation and joining
- project and task flows
- Socket.IO chat
- image uploads to Cloudinary
- LiveKit call join flow

### 4. Security cleanup before public launch

- Rotate any secrets that were previously stored in local `.env` files.
- Do not commit real production secrets.
- Prefer separate credentials for development and production.

# E-Commerce App

A modern e-commerce application built with Next.js, TypeScript, TailwindCSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand.

## 🚀 Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Better Auth
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **State Management**: Zustand
- **Linting**: ESLint

## 📦 Features

- ✅ Modern Next.js app with App Router
- ✅ TypeScript for type safety
- ✅ TailwindCSS for styling
- ✅ Better Auth for authentication (email/password + OAuth)
- ✅ Neon PostgreSQL database
- ✅ Drizzle ORM for type-safe database queries
- ✅ Zustand for state management
- ✅ ESLint for code quality
- ✅ Database schema for users, products, orders, and cart
- ✅ Seed script with sample Nike products

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Fill in the following variables in your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Database Setup

Create your database tables:

```bash
npm run db:push
```

Or generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

Seed sample Nike products:

```bash
npm run db:seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

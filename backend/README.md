# Productify Backend

This is the backend service for Productify, built with Node.js, Express, TypeScript, PostgreSQL, Drizzle ORM, and Clerk authentication.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Clerk Auth
- CORS
- dotenv

## Project Structure

```bash
backend/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── controllers/
│   │   ├── commentController.ts
│   │   ├── productController.ts
│   │   └── userController.ts
│   ├── db/
│   │   ├── index.ts
│   │   ├── queries.ts
│   │   └── schema.ts
│   ├── route/
│   │   ├── commentRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── userRoutes.ts
│   └── index.ts
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

## Prerequisites

Before running the backend, make sure you have:

- Node.js installed
- PostgreSQL database running
- A Clerk project configured
- A frontend URL for CORS

## Installation

From the backend directory:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/productify
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Available Scripts

```bash
npm run dev
```
Runs the app in development mode with nodemon.

```bash
npm run build
```
Compiles the TypeScript project.

```bash
npm start
```
Starts the built production server from `dist/index.js`.

```bash
npm run db:push
```
Pushes the Drizzle schema to the PostgreSQL database.

## Running the Server

```bash
npm run dev
```

The server will start on the configured `PORT` and expose the API at `/api` routes.

## API Overview

### Health Check

```http
GET /api/health
```
Returns a simple success message and available endpoint groups.

### Users

```http
POST /api/users/sync
```
Syncs the authenticated Clerk user to the database.

### Products

```http
GET /api/products
GET /api/products/:id
GET /api/products/my
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

- Public routes: `GET /api/products` and `GET /api/products/:id`
- Protected routes require Clerk authentication

### Comments

```http
POST /api/comments/:productId
DELETE /api/comments/:commentId
```

Protected routes require Clerk authentication.

## Authentication

This backend uses Clerk middleware:

- `clerkMiddleware()` is enabled globally
- `requireAuth()` is used to protect user, product, and comment routes
- Authenticated requests include the Clerk user session information on the request object

## Database

The schema is defined in `src/db/schema.ts` and includes:

- `users`
- `products`
- `comments`

Relations are configured between users, products, and comments using Drizzle.

## Notes

- The backend is configured to accept requests from the frontend URL in `FRONTEND_URL`.
- It uses Express JSON and URL-encoded parsing for request handling.
- The project can be expanded with more route-level controllers and service logic as needed.

## Troubleshooting

If the server does not start:

1. Verify your `.env` file exists and contains valid values.
2. Ensure PostgreSQL is running.
3. Check that your Clerk keys are valid.
4. Run `npm install` if dependencies are missing.

## License

This project is currently licensed under ISC.

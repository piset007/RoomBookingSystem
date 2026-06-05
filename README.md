# Room Booking System

A TypeScript-based REST API for managing rooms, bookings, subjects, and timetables in a simple room booking system.

## Features

- User authentication with JWT
- Room management and availability lookup
- Booking CRUD operations with authentication
- Subject and timetable management
- Error handling and health check endpoint

## Tech Stack

- Node.js
- TypeScript
- Express
- MySQL
- JWT authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies

```bash
npm install
```

2. Create or update `.env`

Copy the existing `.env` or create a new file with the following settings:

```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=room_booking_system
DB_USER=root
DB_PASSWORD=
DB_CONNECTION_LIMIT=10
PORT=3000
JWT_SECRET=replace_this_with_a_generated_secret
JWT_EXPIRES_IN=1d
STUDENT_MAX_ACTIVE_FUTURE_BOOKINGS=3
```

Generate a strong JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

3. Create the database and run migrations manually using the SQL files in `migrations/`.

## Running the App

- Development mode:

```bash
npm run dev
```

- Production mode:

```bash
npm start
```

The API will start on the port defined by `PORT` in `.env` (default `3000`).

## Project Structure

- `server.ts` - application entrypoint
- `src/app.ts` - Express application setup
- `src/routes/` - route definitions
- `src/controllers/` - request handlers
- `src/services/` - business logic
- `src/repositories/` - database access
- `src/models/` - entity models
- `src/middlewares/` - authentication and error handling
- `src/config/database.ts` - database configuration
- `migrations/` - SQL migration scripts

## Notes

- This project uses `ts-node`, so Node must be able to execute TypeScript directly.
- Configure a MySQL database and ensure connection settings in `.env` are correct.
- JWT-protected endpoints require the `Authorization: Bearer <token>` header.

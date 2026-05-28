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
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
STUDENT_MAX_ACTIVE_FUTURE_BOOKINGS=3
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

## API Endpoints

Base path: `/api`

### Authentication

- `POST /api/auth/login`
  - Authenticate user and receive a JWT token.
- `POST /api/auth/register`
  - Register a new user and receive a JWT token.

### Rooms

- `GET /api/rooms`
  - List all rooms.
- `GET /api/rooms/available`
  - Get available rooms.
- `GET /api/rooms/:id`
  - Get details for a specific room.
- `POST /api/rooms`
  - Create a new room.
- `PUT /api/rooms/:id`
  - Update a room.
- `DELETE /api/rooms/:id`
  - Delete a room.

### Bookings

Authentication is required for booking endpoints.

- `GET /api/bookings`
  - List bookings.
- `GET /api/bookings/:id`
  - Get a specific booking.
- `POST /api/bookings`
  - Create a booking.
- `PUT /api/bookings/:id`
  - Update a booking.
- `DELETE /api/bookings/:id`
  - Delete a booking.

### Subjects

- `GET /api/subjects`
  - List all subjects.
- `GET /api/subjects/:id`
  - Get details for a subject.
- `POST /api/subjects`
  - Create a new subject.
- `PUT /api/subjects/:id`
  - Update a subject.
- `DELETE /api/subjects/:id`
  - Delete a subject.

### Timetables

- `GET /api/timetables`
  - List all timetables.
- `GET /api/timetables/room/:roomId`
  - List timetable entries for a specific room.
- `GET /api/timetables/:id`
  - Get a specific timetable entry.
- `POST /api/timetables`
  - Create a timetable entry.
- `PUT /api/timetables/:id`
  - Update a timetable entry.
- `DELETE /api/timetables/:id`
  - Delete a timetable entry.

## Health Check

- `GET /health`
  - Returns `{ status: 'ok' }` when the server is running.

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

# Room Booking System

A comprehensive room booking system built with Node.js, Express, Sequelize, and MySQL.

## Project Structure

```
src/
├── config/          # Database configuration
├── enums/           # Enum classes (Role, BookingStatus, RoomStatus)
├── models/          # Sequelize models and database schema
├── repositories/    # Data access layer
├── services/        # Business logic layer
├── controllers/     # HTTP request handlers
├── middlewares/     # Express middlewares (auth, validation)
├── routes/          # API route definitions
└── app.js           # Express application setup

server.js            # Entry point
package.json         # Dependencies
.env                 # Environment variables
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RoomBookingSystem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update database credentials and JWT secret

4. **Create database**
   ```bash
   mysql -u root -p < database.sql
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-token` - Verify JWT token

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available` - Get available rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create room (Admin only)
- `PUT /api/rooms/:id` - Update room (Admin only)
- `DELETE /api/rooms/:id` - Delete room (Admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/user/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `POST /api/bookings/:id/approve` - Approve booking (Admin only)
- `POST /api/bookings/:id/reject` - Reject booking (Admin only)
- `POST /api/bookings/:id/cancel` - Cancel booking

### Time Tables
- `GET /api/timetables/:id` - Get timetable by ID
- `GET /api/timetables/room/:roomId` - Get room schedule
- `GET /api/timetables/day/:day` - Get schedule by day
- `POST /api/timetables` - Create timetable (Admin only)
- `PUT /api/timetables/:id` - Update timetable (Admin only)
- `DELETE /api/timetables/:id` - Delete timetable (Admin only)

## User Roles

- **ADMIN** - Full system access
- **TEACHER** - Can create and manage bookings
- **STUDENT** - Can view available rooms and schedule

## Architecture

### Layered Architecture

**Models Layer**
- OOP classes mapped to database tables
- Includes validation and business rules

**Repository Layer**
- Data access layer
- Communicates only with the database
- CRUD operations

**Service Layer**
- Business logic
- Orchestrates repositories
- Implements business rules

**Controller Layer**
- HTTP request/response handling
- Delegates to services
- Returns JSON responses

**Middleware Layer**
- Authentication (JWT)
- Authorization (Role-based)
- Input validation (Joi)

## Database Schema

### Users
- id, email, password, firstName, lastName, phone, role, isActive, createdAt, updatedAt

### Rooms
- id, roomNumber, name, capacity, location, building, floor, status, amenities, createdAt, updatedAt

### Bookings
- id, userId, roomId, startDate, endDate, purpose, status, attendeeCount, approvedBy, createdAt, updatedAt

### TimeTables
- id, roomId, dayOfWeek, startTime, endTime, isRecurring, eventName, createdAt, updatedAt

### Permissions
- id, name, description, resource, action, createdAt, updatedAt

### RolePermissions
- id, roleId, permissionId, createdAt, updatedAt

## Error Handling

All endpoints return consistent JSON response format:

**Success Response**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Development Tips

1. **Database Synchronization** - Models sync automatically on server startup
2. **JWT Authentication** - All protected routes require Bearer token
3. **Validation** - Joi schemas validate request bodies
4. **Pagination** - Use `?page=1&limit=10` for paginated endpoints

## License

MIT

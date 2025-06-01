# Book My Train

A Real-Time Train Ticket Booking System built using Node.js, Express.js, MySQL, and JWT authentication. The system provides seamless seat booking functionality while handling race conditions during bookings.

## Features

- User Authentication (JWT)
- Admin Management
- Real-time Seat Availability Check
- Train Booking System
- Multiple Routes Support
- Race Condition Handling
- Secure API Endpoints

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT for Authentication
- RESTful API Architecture

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/001sarvesh/book-my-train-Sys.git
cd book-my-train-Sys
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables in `.env` file
```env
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
ADMIN_API_KEY=your_admin_api_key
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=book_my_train
DB_PORT=3306
```

4. Set up the database
- Run the SQL scripts in `setup_database.sql`
- Add test data using `setup_test_data.sql`

5. Start the server
```bash
npm start
```

## API Endpoints

- POST /api/users/register - Register a new user
- POST /api/users/login - Log in and get JWT token
- POST /api/admin/add-train - Add new train (Admin only)
- PUT /api/admin/update-capacity - Update train capacity (Admin only)
- GET /api/train-info/seat-availability - Check seat availability
- POST /api/train-info/book-seats - Book train seats
- GET /api/train-info/get-booking-details - Get booking history

## Author

- [Sarvesh Shukla](https://github.com/001sarvesh)

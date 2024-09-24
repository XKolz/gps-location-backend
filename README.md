# GPS Event Service Backend

## Project Overview

This backend service powers a GPS-based event discovery application. The app allows users to find events and services near their current location. Users can register, log in, search for events, bookmark events, and leave reviews or ratings. The backend is built using Express.js, PostgreSQL, and Sequelize ORM.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Event Management](#event-management)
  - [User Management](#user-management)
  - [Review and Ratings](#review-and-ratings)
- [Database Models](#database-models)
- [Technologies Used](#technologies-used)
- [Running Tests](#running-tests)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gps-location-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd gps-location-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables (see [Environment Variables](#environment-variables) section).

5. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`.

## Environment Variables

The backend requires the following environment variables to be set. You can configure these in a `.env` file at the root of your project.

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Authenticate a user and return a JWT token.
- **POST** `/api/auth/logout`: Log out a user (JWT invalidation is optional).

### Event Management

- **GET** `/api/events`: Fetch all events based on geolocation.
- **POST** `/api/events`: Create a new event (Admin only).
- **GET** `/api/events/:id`: Fetch details of a specific event.
- **PUT** `/api/events/:id`: Update an event (Admin only).
- **DELETE** `/api/events/:id`: Delete an event (Admin only).
- **POST** `/api/events/:id/bookmark`: Bookmark an event (User only).

### User Management

- **GET** `/api/users/:id/bookmarks`: Fetch bookmarked events for a specific user.

### Review and Ratings

- **POST** `/api/events/:id/reviews`: Submit a review and rating for an event (User only).
- **GET** `/api/events/:id/reviews`: Fetch reviews and ratings for a specific event.

## Database Models

The backend uses Sequelize ORM with PostgreSQL (or Mongoose for MongoDB). The primary models include:

- **User**: Stores user information (id, username, email, password, role, etc.).
- **Event**: Stores event details (id, name, type, address, latitude, longitude, description, dateTime).
- **Review**: Stores user reviews and ratings (id, eventId, userId, rating, comment).
- **Bookmark**: Stores events that users have bookmarked (id, eventId, userId).

## Technologies Used

- **Node.js** and **Express.js**: Backend framework for building RESTful APIs.
- **PostgreSQL** and **Sequelize ORM**: Relational database and ORM for data storage.
- **MongoDB** and **Mongoose**: Optional NoSQL database option.
- **JWT**: For user authentication.
- **bcrypt.js**: For password hashing and security.
- **Leaflet.js**: For handling geolocation and mapping on the frontend (but mentioned here for context).

## Running Tests

This project uses **Jest** and **Supertest** for testing.

To run tests:

```bash
npm test
```

Ensure the database is configured correctly before running tests.

## Error Handling

Error handling is centralized using middleware. All API responses follow a consistent format:

- Success: 
  ```json
  {
    "status": "success",
    "data": { ... }
  }
  ```

- Failure:
  ```json
  {
    "status": "error",
    "message": "Error description",
    "errors": { ... } // Optional field for validation errors
  }
  ```

## Contributing

To contribute to this project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.


### API Postman Docs

https://documenter.getpostman.com/view/23652017/2sAXqv6gWK
<!-- ----------------------- -->


<!-- 

npm install express pg pg-hstore sequelize dotenv jsonwebtoken bcryptjs
npm install dotenv

npm i nodemon

npx sequelize-cli init

npx sequelize-cli migration:generate --name add-bookmarks-to-users

npx sequelize-cli db:migrate

CREATE INDEX idx_event_location ON "Events" USING GIST (location);

It is based on the user's current location, and the backend calculates and returns the events sorted by proximity whenever the user selects the "Sort by Distance" option. -->
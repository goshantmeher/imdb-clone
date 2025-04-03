# IMDB Clone Backend

This project is the backend service for an IMDB clone application. It provides APIs for managing movies, users and other related functionalities.

## Features

- User authentication and authorization
- CRUD operations for movies, reviews, and users
- Search and filter functionality for movies
- RESTful API design

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or any other database being used)

## Mongo Setup guide

1. Install mongodb

2. Create DB

   ```bash
   db.auth("root", <password>)
   use imdb_clone
   db.createUser({
       user: <user>,
       pwd: <password>,
       roles: [{ role: "readWrite", db: "imdb_clone" }]
   })
   ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/goshantmeher/imdb-clone.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NODE_ENV=
   PORT=<server_port>
   JWT_SECRET=your_jwt_secret
   TOKEN_EXPIRATION=7d
   MONGO_URI=<your_mongo_uri>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- refer Imdb_clone.postman_collection.json
- import to postman client

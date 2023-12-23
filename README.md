
# Employee Management System

## Overview
This is an Employee Management System developed using the MERN stack (MongoDB, Express.js, React, Node.js). It includes functionalities for managing employee data, user authentication, and various other features.

## Features
- **User Authentication**: Register and login functionality for users.
- **Employee Management**: Create, read, update, and delete employee records.
- **Managerial Insights**: Obtain ratios and other analytical data about managers and employees.
- **Salary Analysis**: Analyze and compare employee salaries against various metrics.

## Installation and Setup
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in a `.env` file:
   - `MONGO`: MongoDB connection string.
   - `PORT`: Port number for the server.
   - `JWT`: Secret key for JWT token.
4. Run the server:
   ```
   npm start
   ```
## Frontend Repository
- The frontend code for this project can be found at [GitHub Frontend Repo](https://github.com/houssem9017/Career-Pulse-Frontend).


## Deployment
- The application is prepared for deployment on Vercel, with a `vercel.json` configuration file included.
- For more information on deploying to Vercel, visit [Vercel Documentation](https://vercel.com/docs).

## API Endpoints
- `/user/signup`: Register a new user.
- `/user/login`: Login for existing users.
- `/employee`: Various endpoints for managing employees (create, read, update, delete).
- `/employee/managers_ratio`: Get managerial ratio data.
- `/employee/managers`: Get a list of managers.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT for secure user authentication.
- **Other Tools**: Mongoose, Cors, Cookie-Parser, Morgan for logging.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

Houssem Darragi – [houssem.darragi@esprit.tn](mailto:houssem.darragi@esprit.tn)


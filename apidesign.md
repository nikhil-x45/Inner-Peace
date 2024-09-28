# user management

User Management API Documentation

Base URL: https://api.yourapp.com

1. User Registration
   Endpoint: POST /api/auth/register
   Description: Register a new user
   Request Body:
   {
     "email": "user@example.com",
     "username": "newuser",
     "password": "securepassword",
     "name": "John Doe",
     "age": 30,
     "userType": "peer"
   }
   Response:
   - Status: 201 Created
   - Body:
     {
       "message": "User registered successfully",
       "userId": "12345"
     }
   Error Responses:
   - 400 Bad Request: If input is invalid
   - 409 Conflict: If username or email already exists

2. User Login
   Endpoint: POST /api/auth/login
   Description: Authenticate a user and receive a token
   Request Body:
   {
     "username": "newuser",
     "password": "securepassword"
   }
   Response:
   - Status: 200 OK
   - Body:
     {
       "message": "Login successful",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "user": {
         "id": "12345",
         "username": "newuser",
         "userType": "peer"
       }
     }
   Error Responses:
   - 401 Unauthorized: If credentials are invalid

3. Get User Profile
   Endpoint: GET /api/users/profile
   Description: Retrieve the profile of the authenticated user
   Headers:
   - Authorization: Bearer <token>
   Response:
   - Status: 200 OK
   - Body:
     {
       "id": "12345",
       "username": "newuser",
       "email": "user@example.com",
       "name": "John Doe",
       "age": 30,
       "userType": "peer"
     }
   Error Responses:
   - 401 Unauthorized: If token is invalid or expired
   - 404 Not Found: If user profile doesn't exist

4. Update User Profile
   Endpoint: PATCH /api/users/profile
   Description: Update the profile of the authenticated user
   Headers:
   - Authorization: Bearer <token>
   Request Body: (include only fields to be updated)
   {
     "age": 31
   }
   Response:
   - Status: 200 OK
   - Body:
     {
       "message": "Profile updated successfully",
       "user": {
         "id": "12345",
         "username": "newuser",
         "email": "user@example.com",
         "name": "John Doe",
         "age": 31,
         "userType": "peer"
       }
     }
   Error Responses:
   - 400 Bad Request: If update data is invalid
   - 401 Unauthorized: If token is invalid or expired
   - 404 Not Found: If user profile doesn't exist

Note: All endpoints return 500 Internal Server Error if there's an unexpected server error.



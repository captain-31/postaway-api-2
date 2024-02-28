# PostAway - Social Media API 2.0
PostAway is REST API of social media platform. This REST API provides user to post, comment, like, send friend requests, and reset their passwords using OTP for enhanced security.

## Authentication & Authorization

- JWT token is used for authentication while login
- Auth Middleware for authorization, ensuring only authorized users can access specific endpoints.

## Error Handling

- Implemented meaningful error responses and status codes for different scenarios (e.g., unauthorized access, server errors, etc)

## API Overview

- **User Authentication**  
    - **User registration**: Register new user in the application
    - **User login/logout**: Authenticate users to access the application and log them out
    - **Get user details by ID**: Fetch details for a specific user by ID
    - **Get details of all users**: Retrieve details of all registered users
    - **Update user details by ID**: Allow users to update their profile information
    - **Log out user from all devices**: Log out a specific user from all devices

- **Posts**  
  - **Create New Post**: Enable users to create new posts with captions and images.
  - **Retrieve User's Posts**: Get all posts of the logged-in user.
  - **Retrieve All Posts**: Get all available posts.
  - **Retrieve Specific Post by ID**: Fetch a specific post by its unique ID.
  - **Delete Specific Post by ID**: Allow users to delete a specific post by its ID.
  - **Update Specific Post by ID**: Enable users to modify a specific post by its ID.

- **Comments**  
  - **Create New Comment**: Allow user to add comment to post.
  - **Delete Specific Comment by ID**: Allow user to delete a specific comment by its ID.
  - **Update Specific Comment by ID**: Allow user to modify a specific comment by its ID.
  - **Retrieve Comments for Specific Post**: Get all comments of a specific post.

- **Likes**
  - **Retrieve Likes for Specific Post**: Fetch the list of likes for a particular post by its ID.
  - **Toggle Like/Unlike Post or Comment**: Enable users to like or unlike specific posts.

- **OTP**
  - **Send OTP to User's Email**: Send a one-time password to the user's email for verification
  - **Verify OTP**: Verify the OTP entered by the user for authentication
  - **Reset user's password**: Allow users to reset their password using the verified OTP

- **Friendship**
  - **Toggle friendship status**: Enable users to toggle friendship status with other users
  - **Retrieve pending friend requests**: Fetch pending friend requests for a user
  - **Respond to friend requests**: Allow users to accept or reject friend requests
  - **Retrieve friend list**: Fetch the friend list of a specific user based on their user ID

## API Endpoints

- ### User Route
    - User Registration: `POST /api/users/signup` 
    - User login: `POST /api/users/signin`
    - Returns user details by its id: `GET /api/users/get-details/:userId`
    - Returns details of all users: `GET /api/users/get-all-details`
    - Update details of a user by its id: `PUT /api/users/update-details/:userId`
    - Log out: `GET /api/users/logout` 
    - Log out from all devices: `GET /api/users/logout-all-device` 

- ### Post Route
    - Create post: `POST /api/posts/`
    - Update post by post id: `PUT /api/posts/:postId` 
    - Delete post by post id: `DELETE /api/posts/:postId`
    - Returns a specific post by post id: `GET /api/posts/:postId`
    - Returns all posts: `GET /api/posts/all`
    - Returns posts of logged-in user: `GET /api/posts/`

 - ### Comment Route
    - Returns all comments by post id: `GET /api/comments/:postId`
    - Create new comment by post id: `POST /api/comments/:postId`
    - Delete comment by comment id: `DELETE /api/comments/:commentId`
    - Update comment by comment id: `PUT /api/comments/:commentId`

 - ### Like Route
    - Returns all likes for a specific post by its id: `GET /api/likes/:postId`
    - Toggle like for a specific post: `GET /api/likes/toggle/:postId`

 - ### OTP Route
    - Sends a unique 6-digit OTP to the user's email: `POST /api/otp/send`
    - Verify the OTP: `POST /api/otp/verify`
    - Reset password: `POST /api/otp/reset-password`

 - ### Friendship Route
    - Toggles friendship status: `POST /api/friends/:friendId`
    - Returns pending friend requests: `GET /api/friends/get-pending-requests`
    - Responds to friend request: `POST /api/friends/:friendId`
    - Returns the friend list of the user: `GET /api/friends/get-friends/:userId`

## Technologies Used

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.

## NPM Packages Used

- **express:** Web application framework for Node.js.
- **body-parser:** Parsing the request body.
- **moment:** Formatting date as required.
- **multer:** Handling file uploads.
- **cookie-parser:** Saving cookies at client-side.
- **jsonwebtoken:** Used for authentication.
- **swagger-ui-express:** Used for documentation.
- **winston:** Used for logging data.
- **bcrypt:** Used for hashing passwords.
- **dotenv:** Used for storing environment variables.
- **nodemailer:** Used for sending emails.
- **mongoose:** Used to interact with MongoDB 


## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/postaway-api.git
cd postaway-api
```

2. Install Dependencies:

```bash
npm i
```

3. Run the server.js file

```bash
node server.js
```

## Documentation

Visit http://localhost:3000/api-docs in your web browser for API documentation.
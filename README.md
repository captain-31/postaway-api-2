# PostAway - Social Media API
PostAway is REST API of social media platform. This REST API provides user to create, share, and interact with posts and comments. 

## Authentication & Authorization

- JWT token is used for authentication while login
- Auth Middleware for authorization, ensuring only authorized users can access specific endpoints.

## Error Handling

- Implemented meaningful error responses and status codes for different scenarios (e.g., unauthorized access, server errors, etc)

## API Overview

- **User Authentication**  
    - User registration: Register new user in the application
    - User login: Authenticate users to access the application

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


## API Endpoints

- ### User Route
    - User Registration: `POST /api/signup` 
    - User login: `POST /api/signin`

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


## Technologies Used

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.

## NPM Packages Used

- **express:** Web application framework for Node.js.
- **body-parser:** Parsing the request body.
- **express-validator:** Validates incoming request data.
- **moment:** Formatting date as required.
- **multer:** Handling file uploads.
- **cookie-parser:** Saving cookies at client-side.
- **jsonwebtoken:** Used for authentication.
- **swagger-ui-express:** Used for documentation.
- **winston:** Used for logging data.


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
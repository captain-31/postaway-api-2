import './env.js';

import express from 'express'
import cookieParser from 'cookie-parser'
import swagger from 'swagger-ui-express'
import mongoose from 'mongoose'

import userRouter from './src/features/user/user.routes.js'
import postRouter from './src/features/post/post.routes.js'
import commentRouter from './src/features/comment/comment.routes.js'
import likeRouter from './src/features/like/like.routes.js'
import friendshipRouter from './src/features/freindship/friendship.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';

import { ApplicationError } from './src/errorHandler/applicationError.js'
import loggerMiddleware from './src/middlewares/logger.middleware.js'
import apiDocs from './swagger.json' assert {type: 'json'}

const app = express()

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

// Parse JSON bodies for API requests
app.use(express.json());

// Parse URL-encoded bodies for form submissions
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

// Middleware to log requests
app.use(loggerMiddleware)

app.use(express.static('uploads'))

// Routes Middleware: related to user, posts, comments & likes
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)
app.use('/api/friends', friendshipRouter)
app.use('/api/otp', otpRouter)

// Default req handler
app.get('/', (req, res) => {
    res.send('Welcome to Postaway API')
})

// Error handler middleware (Internal error)

app.use((err, req, res, next) => {
    
    console.log(err)

    // mongoose error
    if(err instanceof mongoose.Error.ValidationError) {
        res.status(400).send(err.message);
    }

    // if application error
    if(err instanceof ApplicationError) {
        res.status(err.code).send({ error: err.message })
    }
    
    // you can also log this
    res.status(500).send('Something went wrong. Please try later.')
})

// Handle 404 requests
app.use((req, res) => {
    res.status(404).send('API not found. Please check our documentation for more information localhost:3000/api-docs');
})

export default app
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import swagger from 'swagger-ui-express'

import userRouter from './src/features/user/user.routes.js'
import postRouter from './src/features/post/post.routes.js'
import commentRouter from './src/features/comment/comment.routes.js'
import likeRouter from './src/features/like/like.routes.js'
import { ApplicationError } from './src/errorHandler/applicationError.js'
import loggerMiddleware from './src/middlewares/logger.middleware.js'
import apiDocs from './swagger.json' assert {type: 'json'}

const app = express()

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

app.use(bodyParser.json())
app.use(cookieParser())

// Middleware to log requests
app.use(loggerMiddleware)

app.use(express.static('uploads'))

// Routes Middleware: related to user, posts, comments & likes
app.use('/api', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)

// Error handler middleware (Internal error)

app.use((err, req, res, next) => {
    
    console.log(err)

    // if application error
    if(err instanceof ApplicationError) {
        return res.status(err.code).send({ error: err.message })
    }
    
    // you can also log this
    res.status(500).send('Something went wrong. Please try later.')
})


export default app
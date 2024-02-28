import express from 'express'

import CommentController from './comment.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const commentRouter = express.Router()
const commentController = new CommentController()

// Get comments for a specific post.
commentRouter.get('/:postId', (req, res, next) => {
    commentController.get(req, res, next)
})

// Add a comment to a specific post.
commentRouter.post('/:postId', jwtAuth, (req, res, next) => {
    commentController.add(req, res, next)
})

// Delete a specific comment.
commentRouter.delete('/:commentId', jwtAuth, (req, res, next) => {
    commentController.delete(req, res, next)
})

// Update a specific comment.
commentRouter.put('/:commentId', jwtAuth, (req, res, next) => {
    commentController.update(req, res, next)
})

export default commentRouter
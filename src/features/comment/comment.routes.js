import express from 'express'

import CommentController from './comment.controller.js'
import { validateCommentData } from '../../middlewares/validation.middleware.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const commentRouter = express.Router()
const commentController = new CommentController()

commentRouter.get('/:id', commentController.get)
commentRouter.post('/:id', jwtAuth, validateCommentData, commentController.add)
commentRouter.delete('/:id', jwtAuth, commentController.delete)
commentRouter.put('/:id', jwtAuth, validateCommentData, commentController.update)

export default commentRouter
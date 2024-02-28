import express from 'express'

import PostController from './post.controller.js'
import { uploadFile } from '../../middlewares/file-upload.middleware.js'
import { validatePostData } from '../../middlewares/validation.middleware.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const postRouter = express.Router()
const postController = new PostController()

postRouter.get('/all', (req, res, next) => {
    postController.getAll(req, res, next)
})

postRouter.get('/:postId', jwtAuth, (req, res, next) => {
    postController.getById(req, res, next)
})

postRouter.get('/', jwtAuth, (req, res, next) => {
    postController.getByUser(req, res, next)
})

postRouter.post('/', jwtAuth, uploadFile.single('imageUrl'), validatePostData, (req, res, next) => {
    postController.add(req, res, next)
})

postRouter.put('/:postId', jwtAuth, uploadFile.single('imageUrl'), validatePostData, (req, res, next) => {
    postController.update(req, res, next)
})

postRouter.delete('/:postId', jwtAuth, (req, res, next) => {
    postController.delete(req, res, next)
})

export default postRouter
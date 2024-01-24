import express from 'express'

import LikeController from './like.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const likeRouter = express.Router()
const likeController = new LikeController()

likeRouter.get('/:id', likeController.get)
likeRouter.get('/toogle/:postId', jwtAuth, likeController.toogle)

export default likeRouter
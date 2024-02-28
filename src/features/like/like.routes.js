import express from 'express'

import LikeController from './like.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const likeRouter = express.Router()
const likeController = new LikeController()

likeRouter.get('/:id', (req, res, next) => {
    likeController.get(req, res, next)
})
likeRouter.post('/toogle/:id', jwtAuth, (req, res, next) => {
    likeController.toogle(req, res, next)
})

export default likeRouter
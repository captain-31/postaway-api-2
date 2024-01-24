import express from 'express'

import UserController from './user.controller.js'
import { validateSignUpRequest, validateSignInRequest } from '../../middlewares/validation.middleware.js'

const userRouter = express.Router()
const userController = new UserController()

userRouter.post('/signup', validateSignUpRequest, userController.signUp)
userRouter.post('/signin', validateSignInRequest, userController.signIn)

export default userRouter   
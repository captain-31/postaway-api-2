import express from 'express'

import UserController from './user.controller.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

// import { validateSignUpRequest, validateSignInRequest } from '../../middlewares/validation.middleware.js'

const userRouter = express.Router()
const userController = new UserController()

userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next)
})

userRouter.post('/signin', (req, res, next) => {
    userController.signIn(req, res, next)
})

userRouter.get('/logout', (req, res, next) => {
    userController.logout(req, res, next)
})

userRouter.get('/logout-all-devices', (req, res, next) => {
    userController.logoutAllDevices(req, res, next)
})

userRouter.get('/get-details/:userId', (req, res, next) => {
    userController.getSingleUser(req, res, next)
})

userRouter.get('/get-all-details', (req, res, next) => {
    userController.getAllUsers(req, res, next)
})

userRouter.put('/update-details/:userId', jwtAuth, (req, res, next) => {
    userController.updateUser(req, res, next)
})

export default userRouter
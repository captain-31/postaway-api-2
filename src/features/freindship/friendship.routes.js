import express from 'express'

import jwtAuth from '../../middlewares/jwt.middleware.js'
import FriendshipController from './friendship.controller.js'

const friendshipRouter = express.Router()
const friendshipController = new FriendshipController()

// Route: Get a user's friends
friendshipRouter.get('/get-friends/:userId', jwtAuth, (req, res, next) => {
    friendshipController.getFriends(req, res, next)
})

// Route: Get pending friend requests
friendshipRouter.get('/get-pending-requests', jwtAuth, (req, res, next) => {
    friendshipController.getPendingRequests(req, res, next)
})

// Route: Toggle friendship with another user
friendshipRouter.post('/toggle-friendship/:friendId', jwtAuth, (req, res, next) => {
    friendshipController.toogleFriendship(req, res, next)
})

// Route: Accept or reject a friend request
friendshipRouter.post('/response-to-request/:friendId', jwtAuth, (req, res, next) => {
    friendshipController.responseToRequest(req, res, next)
})

export default friendshipRouter
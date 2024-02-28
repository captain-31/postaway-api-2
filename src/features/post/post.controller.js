import moment from "moment"
import PostRepository from "./post.repository.js"
import UserRepository from "../user/user.repository.js"
import { ApplicationError } from "../../errorHandler/applicationError.js"

export default class PostController {

    constructor() {
        this.postRepository = new PostRepository()
        this.userRepository = new UserRepository()
    }

    async add(req, res, next) {
        const { caption } = req.body
        const userId = req.userId

        const imageUrl = "images/" + req.file.filename
        const timestamp = moment().format('DD MMM YYYY hh:mm A')

        const userExists = await this.userRepository.getSingleUser(userId);

        // add only if user exists
        if(userExists.success) {

            const response = await this.postRepository.add({userId, caption, imageUrl, timestamp})

            if(response.success) {
                res.status(201).send({ 
                    success: true,
                    message: 'Post added successfully', 
                    response: response.res 
                })
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        
        } else {
            // return res.status(404).send({ error: 'Invalid user id' });
            throw new ApplicationError(userExists.error.msg, userExists.error.statusCode)
        }

    }

    async getAll(req, res, next) {
        try {
            const response = await this.postRepository.getAll()
            if(response.success) {
                
                if(response.res.length > 0) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'All posts', 
                        posts: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'No posts found', 
                        posts: response.res,  
                    })
                }
                
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const response = await this.postRepository.getById(req.params.postId)
            
            if(response.success) {
                
                if(response.res) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'Fetched post data successfully', 
                        post: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'No post found', 
                        post: response.res,  
                    })
                }
                
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }

        } catch (error) {
            next(error)
        }
    }

    async getByUser(req, res, next) {
        try {
            const response = await this.postRepository.getByUser(req.userId)
            if(response.success) {
                
                if(response.res.length > 0) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'all posts', 
                        posts: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'no posts found', 
                        posts: response.res,  
                    })
                }
                
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        const userId = req.userId
        const postId = req.params.postId

        try {
            const response = await this.postRepository.delete(postId, userId)
            if(response.success) {
                
                if(response.res == null) {
                    return res.status(404).send({ 
                        success: false,
                        message: 'Post not found', 
                        post: response.res,  
                    })
                } else {
                    return res.status(200).send({ 
                        success: true,
                        message: 'Post deleted', 
                        deletedPost: response.res,  
                    })
                }
            }
            else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }

        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        
        try {
            const postObj = {
                _id: req.params.postId,
                userId: req.userId, 
                caption: req.body.caption,
                imageUrl: "images/" + req.file.filename,
                timestamp: moment().format('DD MMM YYYY hh:mm A')
            }

            const response = await this.postRepository.update(postObj)
            if(response.success) {

                if(response.res == null) {
                    return res.status(404).send({ 
                        success: false,
                        message: 'Post not found', 
                        post: response.res,  
                    })
                } else {
                    return res.status(200).send({ 
                        success: true,
                        message: 'Post updated successfully', 
                        updatedPost: response.res 
                    })
                }

                
            } else {
                throw new ApplicationError(response.error.msg, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }
}
import moment from "moment"

import CommentRepository from "./comment.repository.js"
import PostRepository from "../post/post.repository.js"
import { ApplicationError } from "../../errorHandler/applicationError.js"

export default class CommentController {

    constructor() {
        this.commentRepository = new CommentRepository()
        this.postRepository = new PostRepository()
    }

    // Get comments for a specific post.
    async get(req, res, next) {
        try {
            const response = await this.commentRepository.get(req.params.postId)
            if (response.success) {

                if (response.res.length > 0) {
                    return res.status(200).send({
                        success: true,
                        message: 'All comments of requested post',
                        comments: response.res,
                    })
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'No comments found for this post',
                        comments: response.res,
                    })
                }

            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }

    // add comment 
    async add(req, res, next) {

        const comment = {
            userId: req.userId,
            postId: req.params.postId,
            content: req.body.content,
            timestamp: moment().format('DD MMM YYYY hh:mm A')
        }

        try {
            // check if post exists
            const post = await this.postRepository.getByUserIdAndPostId(comment.userId, comment.postId)

            if (post.success) {

                if (post.res) {

                    // add comment 
                    const response = await this.commentRepository.add(comment)

                    if (response.success) {
                        res.status(201).send({
                            success: true,
                            message: 'Comment added successfully',
                            response: response.res
                        })
                    } else {
                        throw new ApplicationError(response.error.message, response.error.statusCode)
                    }

                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'No post found'
                    })
                }

            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }

        } catch (error) {
            next(error)
        }
    }

    // delete a comment
    async delete(req, res, next) {
        const userId = req.userId
        const commentId = req.params.commentId

        try {
            const response = await this.commentRepository.delete(commentId, userId)
            if (response.success) {

                if (response.res == null) {
                    return res.status(404).send({
                        success: false,
                        message: 'Comment not found',
                        comment: response.res,
                    })
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Comment deleted',
                        deletedComment: response.res,
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

    // modify a comment
    async update(req, res, next) {
        
        try {
            const commentObj = {
                _id: req.params.commentId,
                userId: req.userId,
                content: req.body.content,
                timestamp: moment().format('DD MMM YYYY hh:mm A')
            }

            const response = await this.commentRepository.update(commentObj)
            if (response.success) {

                if (response.res == null) {
                    return res.status(404).send({
                        success: false,
                        message: 'Comment not found',
                        comment: response.res,
                    })
                } else {
                    return res.status(201).send({
                        success: true,
                        message: 'Comment updated successfully',
                        updatedComment: response.res
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
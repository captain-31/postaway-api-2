import { ApplicationError } from "../../errorHandler/applicationError.js"
import CommentRepository from "../comment/comment.repository.js"
import PostRepository from "../post/post.repository.js"
import LikeRepository from "./like.repository.js"

export default class LikeController {

    constructor() {
        this.likeRepository = new LikeRepository()
        this.commentRepository = new CommentRepository()
        this.postRepository = new PostRepository()
    }

    // get like for post or comments
    async get(req, res, next) {
        try {
            const id = req.params.id
            const response = await this.likeRepository.getLikes(id)

            if(response.success) {
                if(response.res.length > 0) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'Fetched likes', 
                        likes: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'No likes found', 
                        likes: response.res,  
                    })
                }
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }

    // toogle like
    async toogle(req, res, next) {

        try {
            const id = req.params.id
            const type = req.query.type

            if(type != 'Post' && type != 'Comment') {
                throw new ApplicationError('Invalid Type', 400)
            }

            if(type == 'Post') {
                // check if post exists
                const post = await this.postRepository.getById(id)
                if(post.res) {
                    // check if post has like 
                    const isLiked = await this.likeRepository.getSingleLike(type, id)
                  
                    if(isLiked.success) {
                        // Already liked - delete entry
                        await this.likeRepository.deleteLike(type, id)
                        return res.status(200).send({ 
                            success: true,
                            message: 'Post un-liked successfully' 
                        })
                    } else {
                        // Like dont exist - add entry
                        await this.likeRepository.likePost(req.userId, id)
                        return res.status(200).send({ 
                            success: true,
                            message: 'post liked successfully' 
                        })
                    }
                } else {
                    throw new ApplicationError('Post not found', 404)
                }

                
            } else {
                console.log('in commetnn')
                // check if comment exits
                const comment = await this.commentRepository.getCommentById(id)
                console.log(comment)

                if(comment.success) {

                    // check if comment has like
                    const isLiked = await this.likeRepository.getSingleLike(type, id)
                    if(isLiked.success) {
                        // Already liked - delete entry
                        await this.likeRepository.deleteLike(type, id)
                        return res.status(200).send({ 
                            success: true,
                            message: 'comment un-liked successfully' 
                        })
                    } else {
                        // Like dont exist - add entry
                        await this.likeRepository.likeComment(req.userId, id)
                        return res.status(200).send({ 
                            success: true,
                            message: 'comment liked successfully' 
                        })
                    }

                } else {
                    throw new ApplicationError('Comment not found', 404)
                }
            }

        } catch (error) {
            next(error)
        }
    }

}
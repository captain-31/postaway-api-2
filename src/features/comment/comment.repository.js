import mongoose from "mongoose"
import '../../../env.js'
import { commentSchema } from "./comment.schema.js"

const commentModel = mongoose.model('Comment', commentSchema)

export default class CommentRepository {

    async add(comment) {
        try {
            const newComment = new commentModel(comment)
            await newComment.save()
            return { success: true, res: newComment };
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } };
        }
    }

    async get(postId) {
        try {
            const comments = await commentModel.find({postId: postId})
            return { success: true, res: comments }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async delete(commentId, userId) {
        try {
            const comment = await commentModel.findOneAndDelete({
                _id: commentId,
                userId: userId
            })
            return { success: true, res: comment }
        } catch(error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async update(comment) {

        try {
            const updatedComment = await commentModel.findOneAndUpdate(
                { _id: comment._id, userId: comment.userId },
                {
                    $set: {
                        content: comment.content,
                        timestamp: comment.timestamp
                    }
                },
                { new: true }
            )
            return { success: true, res: updatedComment } 
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getCommentById(commentId) {
        try {
            const comment = await commentModel.findById(commentId)
            if(comment)
                return { success: true, res: comment }
            else 
                return { 
                    success: false, 
                    error: {
                        statusCode: 400, 
                        message: 'Comment not found' 
                    }
                }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

}
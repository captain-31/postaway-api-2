import mongoose from "mongoose"
import { likeSchema } from "./like.schema.js"

const likeModel = mongoose.model("Like", likeSchema)

export default class LikeRepository {

    async likePost(userId, postId) {

        try {
            const newLike = new likeModel({
                user: userId,
                likable: postId,
                on_model: 'Post'
            })
            await newLike.save()
            return { success: true, res: newLike }

        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async likeComment(userId, commentId) {

        try {
            const newLike = new likeModel({
                user: userId,
                likable: commentId,
                on_model: 'Comment'
            })
            await newLike.save()
            return { success: true, res: newLike }

        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getLikes(id) {
       
        try {
            const likes =  await likeModel.find({
                likable: id
            }).populate('user')
            .populate({ path: 'likable'})
            
            return { success: true, res: likes }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getSingleLike(type, id) {
        try {
            const like =  await likeModel.findOne({
                likable: id,
                on_model: type
            })
            
            if(like)
                return { success: true, res: like }
            else {
                return { 
                    success: false, 
                    error: {
                        statusCode: 400, 
                        message: 'Like not found' 
                    }
                }
            }

        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async deleteLike(type, id) {
        try {
            const like = await likeModel.findOneAndDelete({
                likable: id,
                on_model: type
            })
            return { success: true, res: like }
        } catch(error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }
}
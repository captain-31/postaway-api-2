import mongoose from "mongoose"
import '../../../env.js'
import { postSchema } from "./post.schema.js"

const postModel = mongoose.model('Post', postSchema)

export default class PostRepository {

    async add(post) {

        try {
            const newPost = new postModel(post)
            await newPost.save()
            return { success: true, res: newPost };
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } };
        }
    }

    async getAll() {
        try {
            const posts = await postModel.find()
            return { success: true, res: posts }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getById(id) {
        try {
            const post = await postModel.findById(id)
            return { success: true, res: post }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getByUserIdAndPostId(userId, postId) {
        try {
            const post = await postModel.findOne({
                _id: postId,
                userId: userId
            })
            return { success: true, res: post }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getByUser(userId) {
        try {
            const posts = await postModel.find({ userId: userId})
            return { success: true, res: posts }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async delete(postId, userId) {
        try {
            const post = await postModel.findOneAndDelete({
                _id: postId,
                userId: userId
            })
            console.log(post)
            return { success: true, res: post }
        } catch(error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async update(post) {
        try {
            const updatedPost = await postModel.findOneAndUpdate(
                { _id: post._id, userId: post.userId },
                {
                    $set: {
                        caption: post.caption,
                        timestamp: post.timestamp,
                        imageUrl: post.imageUrl
                    }
                },
                { new: true }
            )
            return { success: true, res: updatedPost } 
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }
}
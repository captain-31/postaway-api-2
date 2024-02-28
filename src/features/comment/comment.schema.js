import mongoose from "mongoose"

export const commentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userId is required'],
        ref: 'User'
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'postId is required'],
        ref: 'Post'
    },

    timestamp: {
        type: String,
        required: [true, 'Timestamp is required'],
    },

    content: {
        type: String,
        required: [true, 'Content is required'],
    }
    
})
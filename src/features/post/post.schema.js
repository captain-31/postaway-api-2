import mongoose from "mongoose"

export const postSchema = new mongoose.Schema({

    caption: {
        type: String,
        required: [true, 'Caption is required'],
    },

    timestamp: {
        type: String,
        required: [true, 'Timestamp is required'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },

})
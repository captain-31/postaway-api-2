import mongoose from "mongoose"

export const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userId is required'],
        ref: 'User'
    },

    likable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model'
    },

    on_model: {
        type: String,
        enum: ['Post', 'Comment']
    }

})
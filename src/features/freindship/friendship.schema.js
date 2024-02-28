import mongoose from "mongoose"

export const friendshipSchema = new mongoose.Schema({
    // User ID
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    // Friend's User ID  
    friend: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Friendship status
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    },
    // Timestamp of when the friendship was initiated 
    createdAt: { 
        type: Date, 
        default: Date.now 
    } 
})
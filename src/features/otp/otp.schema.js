import mongoose from "mongoose"

export const otpSchema = new mongoose.Schema({

    email: { 
        type: String, 
        required: true 
    },
    otpCode: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        required: true 
    }

})
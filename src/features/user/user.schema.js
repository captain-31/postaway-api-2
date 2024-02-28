import mongoose from "mongoose"

const genderEnum = ['male', 'female', 'other'];

export const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxLength: [25, "Name can't be greater than 25 characters"]
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [ /.+\@.+\../, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function(value) {
        //         return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
        //     },
        //     message: "Password should be between 8-12 characters and have a special character"
        // }
    },

    gender: {
        type: String, 
        required: true,
        enum: {
            values: genderEnum,
            message: 'Gender must be one of: ' + genderEnum.join(', ')
        }
    },

    tokens: [
        {
            type: String
        }
    ]   

})
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import '../../../env.js'

import { userSchema } from "./user.schema.js"
import { compareHashedPassword } from "../../utils/hashPassword.js"

const userModel = mongoose.model('User', userSchema)

export default class UserRepository {

    async signup(user) {
        try {
            const newUser = new userModel(user)
            await newUser.save()
            return { success: true, res: newUser };
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } };
        }
    }

    async signin(userData) {
        try {
            const { email, password } = userData;
            const user = await userModel.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, message: "User not found" },
                };
            } else {
                const passwordValidation = await compareHashedPassword(password, user.password)
                if (passwordValidation) {
                    
                    // token
                    const token = jwt.sign(
                        { userID: user._id, email: email}, 
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h',
                        }
                    )
                    user.tokens.push(token) // Store token in the array
                    await user.save()
                    return { success: true, res: user, token: token }
                } else {
                    return {
                      success: false,
                      error: { statusCode: 400, message: "Invalid credentials" },
                    }
                }
            }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async logout(token, userId) {
        try {
            const user = await userModel.findOne({ _id: userId });
            user.tokens = user.tokens.filter(t => t !== token); // Remove token from array
            await user.save();
            return { success: true, res: user }

        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async logoutAllDevices(userId) {
        try {
            const user = await userModel.findOne({ _id: userId });
            user.tokens = []; // Clear all tokens
            await user.save();
            return { success: true, res: user }

        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    // profile repo functions

    async getSingleUser(userId) {
        try {
            const user = await userModel.findById(userId)
            if(user) 
                user.password = '****'
            return { success: true, res: user }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getSingleUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email: email })
            if(user) 
                return { success: true, res: user }
            else 
                return { 
                    success: false, 
                    error: {
                        statusCode: 404, 
                        message: 'user not found' 
                    }
                }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async getAllUsers() {
        try {
            const users = await userModel.find()
            users.map( u=> u.password = '****') // hide passwords
            return { success: true, res: users }
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async updateUser(userData) {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: userData._id },
                {
                    $set: {
                        name: userData.name,
                        email: userData.email,
                        gender: userData.gender
                    }
                },
                { new: true }
            )
            return { success: true, res: updatedUser } 
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }

    async updatePassword(userId, password) {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        password: password
                    }
                },
                { new: true }
            )
            return { success: true, res: updatedUser } 
        } catch (error) {
            console.log("Error: "+ error)
            return { success: false, error: { statusCode: 400, message: error } }
        }
    }
}
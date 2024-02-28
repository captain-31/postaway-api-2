import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserRepository from "./user.repository.js"
import { ApplicationError } from "../../errorHandler/applicationError.js"
import '../../../env.js'

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository()
    }

    async signUp(req, res, next) {

        try {
            let {  password } = req.body
            password = await bcrypt.hash(password, 12)
            const response = await this.userRepository.signup({ ...req.body, password })
            if(response.success) {
                res.status(201).send({ 
                    success: true,
                    message: 'Account created successfully', 
                    response: response.res 
                })
            } else {
                throw new ApplicationError(response.error.msg, response.error.statusCode)
            }
            
        } catch (error) {
            next(error)
        }
    }

    async signIn(req, res, next) {
        
        
        try {    
            const response = await this.userRepository.signin(req.body)
            if(response.success) {
                // hide password
                response.res.password = "****"
               
                res.cookie('jwtToken', response.token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true }); 
                return res.status(200).send({ 
                    success: true,
                    message: 'User login successful', 
                    userData: response.res,  
                    token: response.token 
                });
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
       
    }

    async logout(req, res, next) {
        try {

            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const response = await this.userRepository.logout(token, decoded.userID)
            if(response.success) {
                res.clearCookie("jwtToken").json({ success: true, message: "Logged out successfully!" })
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
            
        } catch (error) {
            next(error)
        }
    }

    async logoutAllDevices(req, res, next) {
        try {

            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const response = await this.userRepository.logoutAllDevices(decoded.userID)
            if(response.success) {
                res.clearCookie("jwtToken").json({ success: true, message: "Logged out from all devices successfully!" })
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
            
        } catch (error) {
            next(error)
        }
    }

    // Profile controller functions
    async getSingleUser(req, res, next) {
        
        try {
            const response = await this.userRepository.getSingleUser(req.params.userId)
            
            if(response.success) {
                
                if(response.res) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'Fetched user data successfully', 
                        user: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'No user found', 
                        users: response.res,  
                    })
                }
                
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }

        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        
        try {
            const response = await this.userRepository.getAllUsers()
            if(response.success) {
                
                if(response.res.length > 0) {
                    return res.status(200).send({ 
                        success: true,
                        message: 'All users data', 
                        users: response.res,  
                    })
                } else {
                    return res.status(404).send({ 
                        success: false,
                        message: 'No users found', 
                        users: response.res,  
                    })
                }
                
            } else {
                throw new ApplicationError(response.error.message, response.error.statusCode)
            }
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {

        try {

            const response = await this.userRepository.updateUser({ _id: req.params.userId, ...req.body })
            if(response.success) {
                response.res.password = '****'
                res.status(200).send({ 
                    success: true,
                    message: 'User updated successfully', 
                    response: response.res 
                })
            } else {
                throw new ApplicationError(response.error.msg, response.error.statusCode)
            }

        } catch (error) {
            next(error)
        }
    }
}
import { ApplicationError } from "../../errorHandler/applicationError.js"
import UserRepository from "../user/user.repository.js"
import OtpRepository from "./otp.repository.js"

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

export default class OtpController {

    constructor() {
        this.otpRepository = new OtpRepository()
        this.userRepository = new UserRepository()
    }

    async send(req, res, next) {
        try {

            // check if user exists 
            const user = await this.userRepository.getSingleUserByEmail(req.body.email)

            if(user.success) {
                 // Generate OTP code
                const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

                // save OTP to db
                const otpRecord = await this.otpRepository.saveOtp({
                    userId: req.body.userId,
                    email: req.body.email,
                    otpCode: otpCode,
                    expiresAt: new Date(Date.now() + 600000) // Expires in 10 minutes
                })

                console.log(otpRecord)

                if(otpRecord.success) {
                    // Send OTP code via email
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'devhrishikesh31@gmail.com',
                            pass: 'kakt ybik jsyu urge'
                        }
                    });
    
                    await transporter.sendMail({
                        from: 'devhrishikesh31@gmail.com',
                        to: req.body.email,
                        subject: 'Password Reset OTP',
                        text: `Your OTP code for password reset is: ${otpCode}`
                    });
                    
    
                    res.status(200).json({ success: true, message: 'OTP sent successfully' })
                } else {
                    next(error)
                }
                

            } else {
                throw new ApplicationError('User not found. Please signup', 404)
            }

        } catch (error) {
            next(error)
        }
    }

    async verify(req, res, next) {

        try {
            const { email, otpCode } = req.body;
    
            // Find OTP record
            const otpRecord = await this.otpRepository.getOtp(email,otpCode);
    
            if (otpRecord.success) {
                return res.status(200).json({ success: true, message: 'OTP verified successfully' })
            } else {
                return res.status(400).json({ success: false, message: 'Invalid OTP or OTP expired' })
            }
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to verify OTP' });
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, newPassword, otpCode } = req.body

            // check if otp record exists
            const otpRecord = await this.otpRepository.getOtp(email,otpCode);
            if (!otpRecord.success) {
                return res.status(400).json({ success: false, message: 'Invalid OTP or OTP expired' })
            }

            // Find user by email
            const user = await this.userRepository.getSingleUserByEmail(email)
            if (!user.success) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }

            // update password
            let hashedPassword = await bcrypt.hash(newPassword, 12)
            const updatedPassword = await this.userRepository.updatePassword(user.res._id, hashedPassword)
            if(!updatedPassword.success) {
                return res.status(500).json({ success: false, message: 'Faild to update password' })
            }

            // delete otp record 
            await this.otpRepository.deleteOtp(otpRecord.res._id)

            res.status(201).json({ success: true, message: 'Password reset successfully' });


        } catch (error) {
            next(error)
        }
    }
}
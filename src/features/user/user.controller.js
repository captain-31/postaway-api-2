import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'

export default class UserController {

    signUp(req, res) {
        const {name, email, password } = req.body
        const user = UserModel.signup(name, email, password)
        res.status(201).send({ message: 'Account created successfully!', userData: user })
    }

    signIn(req, res) {
        const result = UserModel.signin(req.body.email, req.body.password)
        if(!result) {
            return res.status(400).send({ error: 'Incorrect credentials' });
        } else {

            // 1. Create token (payload, secretkey, options)
            const token = jwt.sign(
                { userID: result.id, email: result.email}, 
                "imk67WU86b5uQY1R2ZtjAYfuM6tZC7jQ",
                {
                    expiresIn: '1h',
                }
            );

            // 2. Send token
            res.cookie('jwtToken', token, { maxAge: 3600000, httpOnly: true }); 

            return res.status(200).send({ message: 'Logged in', userData: result,  token: token });
        }
    }
}
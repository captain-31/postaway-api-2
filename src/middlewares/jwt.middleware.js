import jwt from 'jsonwebtoken'

const jwtAuth = (req, res, next) => {

    // 1. Read the token
    const token = req.headers['authorization']

    // 2. If no token, return the error
    if(!token) {
        return res.status(401).send('Unauthorized')
    }

    // 3. check if token is valid
    try {
        const payload = jwt.verify(token, "imk67WU86b5uQY1R2ZtjAYfuM6tZC7jQ")
        req.userId = payload.userID
        // console.log(payload)
    } catch (error) {
        // 4. return error
        return res.status(401).send('Unauthorized')
    }

    // 5. call next middleware
    next()

}

export default jwtAuth
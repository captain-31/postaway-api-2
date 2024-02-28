import { body, validationResult } from "express-validator"
import { ApplicationError } from "../errorHandler/applicationError.js";

const validateSignUpRequest = async (req, res, next) => {

    const rules = [
        body('name').notEmpty().withMessage('Please provide your name'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.status(400).json({ error: validationErrors.array()[0].msg });
    }
    next();
}

const validateSignInRequest = async (req, res, next) => {

    const rules = [
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.status(403).json({ error: validationErrors.array()[0].msg });
    }
    next();
}

const validatePostData = async (req, res, next) => {

    const rules = [
        body('caption').notEmpty().withMessage('Caption is required'),
        body('imageUrl')
        .custom( (value, {req}) => {
            if(!req.file) {
                throw new Error('Image is required');
            }
            return true;
        })
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.status(403).json({ error: validationErrors.array()[0].msg });
    }
    next()
}


const validateCommentData = async (req, res, next) => {

    const rules = [
        body('content').notEmpty().withMessage('Content is required'),
    ];

    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        return res.status(403).json({ error: validationErrors.array()[0].msg });
    }
    next()
   
}

export {
    validateSignUpRequest,
    validateSignInRequest,
    validatePostData,
    validateCommentData
};
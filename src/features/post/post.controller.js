import UserModel from "../user/user.model.js"
import PostModel from "./post.model.js"

import moment from "moment"

export default class PostController {

    async add(req, res) {
        const { caption } = req.body
        const userId = req.userId

        const imageUrl = "images/" + req.file.filename
        const timeStamp = moment().format('DD MMM YYYY hh:mm A')

        const userExists = UserModel.get(userId);

        if(userExists) {
            const newPost = PostModel.add(userId, caption, imageUrl, timeStamp)
            res.status(201).send({ message: 'Post added!', postData: newPost})
        } else {
            return res.status(404).send({ error: 'Invalid user id' });
        }

    }

    getAll(req, res) {
        const posts = PostModel.getAll();
        res.status(200).send({ posts: posts });
    }

    getById(req, res) {
        const post = PostModel.getById(req.params.id)
        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        return res.status(200).send({ postData: post });
    }

    getByUser(req, res) {
        const userId = req.userId
        const post = PostModel.getByUser(userId)
        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        return res.status(200).send({ postData: post });
    }

    delete(req, res) {
        const userId = req.userId
        const postId = req.params.id

        const deletedPost = PostModel.delete(postId, userId)
        if(deletedPost != null) {
            return res.status(200).send({ message: 'Post deleted successfully', deletedPost: deletedPost })
        } else {
            return res.status(404).send({error: 'Post not found'});
        }
    }

    update(req, res) {
        const postObj = {
            id: Number(req.params.id),
            userId: req.userId, 
            caption: req.body.caption,
            imageUrl: "images/" + req.file.filename,
            timestamp: moment().format('DD MMM YYYY hh:mm A')
        }
        // console.log(postObj)
        const userExists = UserModel.get(req.userId);
        if(userExists) {
            const updatedPost = PostModel.update(postObj)
            if(updatedPost != null) {
                return res.status(200).send({ message: 'Post updated successfully', updatedPost: updatedPost })
            } else {
                return res.status(404).send({error: 'Post not found'});
            }
        } else {
            return res.status(404).send({ error: 'Invalid user id' });
        }
    }
}
import moment from "moment";
import CommentModel from "./comment.model.js";
import PostModel from "../post/post.model.js";

export default class CommentController {

    // get comments by postId
    get(req, res) {
        const comments = CommentModel.get(req.params.id)
        if(comments.length <= 0) {
            return res.status(404).send({ error: 'No comments found for this post' });
        }
        return res.status(200).send({ comments: comments });
    }

    add(req, res) {
        const userId = req.userId
        // const userId = 2
        const postId = req.params.id
        const content = req.body.content
        const timeStamp = moment().format('DD MMM YYYY hh:mm A')

        const postExists = PostModel.getPostByUserId(postId, userId)
        if(postExists) {
            const newComment = CommentModel.add(userId, postId, content, timeStamp)
            res.status(201).send({ message: 'Comment added!', commentData: newComment})
        } else {
            return res.status(404).send({ error: 'No post found for this user' });
        }

    }

    delete(req, res) {
        const userId = req.userId
        const commentId = req.params.id
 
        const deletedComment = CommentModel.delete(commentId, userId)
        if(deletedComment != null) {
           return res.status(200).send({ message: 'Comment deleted successfully', deletedComment: deletedComment })
        } else {
           return res.status(404).send({error: 'Comment not found'});
        }
    }

    update(req, res) {
        const commentId = req.params.id
        const userId = req.userId
        const content = req.body.content 
        const timestamp = moment().format('DD MMM YYYY hh:mm A')

        const commentExists = CommentModel.getCommentByUser(commentId, userId)
        if(commentExists) {
            const updatedComment = CommentModel.update(commentId, userId, content, timestamp)
            if(updatedComment != null) {
                return res.status(200).send({ message: 'Comment updated successfully', updatedComment: updatedComment })
            } else {
                return res.status(404).send({error: 'Comment not found'});
            }
        } else {
            return res.status(404).send({ error: 'No comment found for this user' });
        }
       
    }
}
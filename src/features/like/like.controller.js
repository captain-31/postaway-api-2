import PostModel from "../post/post.model.js";
import LikeModel from "./like.model.js";

export default class LikeController {

    get(req, res) {
        const likes = LikeModel.get(req.params.id)
        if(likes.length <= 0) {
            return res.status(404).send({ error: 'No likes found for this post' });
        }
        return res.status(200).send({ likes: likes });
    }

    toogle(req, res) {
        const postId = req.params.postId
        // const userId = req.userId
        // to update later (after auth)
        const userId = 1

        // check if postId exists then do next 
        const postExists = PostModel.getById(postId)

        if(postExists) {
            // The server checks if the user has already liked post 123.
            const isLiked = LikeModel.getLike(userId, postId)
            if(isLiked) {
                // If the user has liked the post, the server removes the like entry.
                const likeData = LikeModel.remove(userId, postId)
                if(likeData) {
                    return res.status(200).send({ message: "Unliked post", unlikedData: likeData })
                } else {
                    return res.status(500).send({ error: 'Something went wrong while unlike' });
                }
            } else {
                // If the user hasn't liked the post, the server adds a new like entry.
                // console.log('add entry')
                const likeData = LikeModel.add(userId, postId)
                if(likeData) {
                    return res.status(200).send({ message: "Liked post", likedData: likeData })
                } else {
                    return res.status(500).send({ error: 'Something went wrong while like' });
                }
            }
        } else {
            return res.status(404).send({ error: 'No post found for this user' });
        }
        
    }

}
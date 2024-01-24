export default class CommentModel {

    constructor(id, userId, postId, content, timestamp) {
        this.id = id
        this.userId = userId
        this.postId = postId
        this.content = content
        this.timestamp = timestamp
    }

    static get(postId) {
        const data = comments.filter( (c) => c.postId == postId)
        return data
    }

    static add(userId, postId, content, timeStamp) {
        // validate post id before saving, check if it exists
        const newComment = new CommentModel(comments.length + 1, userId, postId, content, timeStamp)
        comments.push(newComment)
        console.log(newComment)
        return newComment
    }

    static delete(commentId, userId) {
        const commentIndex = comments.findIndex( (c) => c.id == commentId && c.userId == userId)
        if(commentIndex == -1) {
            return null;
        } else {
            const commentData = comments[commentIndex]
            comments.splice(commentIndex, 1)
            return commentData
        }
    }

    static update(commentId, userId, content, timeStamp) {
        const index = comments.findIndex( (c) => c.id == commentId && c.userId == userId)
        if(index == -1) {
            return null
        } else {
            comments[index].content = content
            comments[index].timestamp = timeStamp
            return comments[index]
        }
    }

    static getCommentByUser(commentId, userId) {
        const comment = comments.find( (c) => c.id == commentId && c.userId == userId)
        return comment
    }
}

var comments = [
    new CommentModel(1, 1, 1, "Authentic content", "19 Jan 2024 10:41 AM"),
    new CommentModel(2, 2, 1, "Thoughtful post", "20 Jan 2024 11:45 AM"),
    new CommentModel(3, 1, 2, "This is demo comment", "21 Jan 2024 11:11 AM"),
]
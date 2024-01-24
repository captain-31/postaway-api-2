
export default class PostModel {

    constructor(id, userId, caption, imageUrl, timestamp) {
        this.id = id
        this.userId = userId
        this.caption = caption
        this.imageUrl = imageUrl
        this.timestamp = timestamp
    }

    static add(userId, caption, imageUrl, timestamp) {
        const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl, timestamp)
        posts.push(newPost)
        return newPost
    }

    static getAll() {
        return posts
    }

    static getById(id) {
        const post = posts.find(p => p.id == id)
        return post   
    }

    static getByUser(userId) {
        const post = posts.find(p => p.userId == userId)
        return post   
    }

    static getPostByUserId(postId, userId) {
        const post = posts.find(p => p.userId == userId && p.id == postId)
        return post
    }

    static delete(postId, userId) {
        const postIndex = posts.findIndex( (p) => p.id == postId && p.userId == userId)
        if(postIndex == -1) {
            return null;
        } else {
            const postData = posts[postIndex]
            posts.splice(postIndex, 1)
            return postData
        }
    }

    static update(postObj) {
        const index = posts.findIndex( (p) => p.id == postObj.id && p.userId == postObj.userId)
        if(index == -1) {
            return null
        } else {
            posts[index] = postObj
            return posts[index]
        }
    }
}

var posts = [
    new PostModel(1, 1, "Summary of the book Atomic habits", "https://m.media-amazon.com/images/I/91iJduVHk2L._SL1500_.jpg", "15 Jan 2024 11:20 AM"),
    new PostModel(2, 2, "Impact of AI on healthcare", "https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg", "16 Jan 2024 10:24 AM")
];
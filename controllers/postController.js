import Post from "../models/Post"


// Get post
const getAllPosts = async (_req, res, next) => {
    try {
        const posts = Post.find().populate("author");
        res.status(200).json(posts)
    } catch (err) {
        next(err);
    }
} 



const getPostById = async (req, res, next) => {
    try {
        const post = await Post.find(req.params.id)
        if (!post) {
            res.status(404).json({message: "Post not found"})
        }
        res.status(200).json(post)
    }
    catch (err) {
        next (err)
    }

}

// Create Post 

const createPost = async (req, res, next) => {
    try {
        const newPost = Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user?._id
        });
        res.status(201).json({
            message: "Created Post Successfullt",
            data: newPost
        });
    } catch (err) {
        next(err)
    }
}

// Update Post
const updatePost = (req, res) => {
    const id = Number(req.params.id)
    const exist = posts.find(post => post.id === id)
    if (!exist) {
        return res.status(404).send({
            message: "Post not found"
        })
    }
    posts = posts.map(post => post.id === id? {...post, title: req.body.title, content: req.body.content}: post)

    return res.status(200).send({
        message: "Successfully updated post",
        data: posts
    })
    console.log(posts)
}
// Delete Post
const deletePost = (req, res) => {
    const id = Number(req.params.id);
    const exist = posts.find(post => post.id === id)
    if(!exist) {
        return res.status(404).send({
            message: "Post not found"
        })
    }
    posts = posts.filter(post => post.id !== id)
    return res.status(200).send({
        message: "Post has been deleted"
    })


}

module.exports = { createPost, updatePost, getAllPosts, deletePost, getPostById }

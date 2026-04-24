import Post from "../models/Post"


// Get post
const getAllPosts = async (_req, res, next) => {
    try {
        const posts = await Post.find().populate("author");
        res.status(200).json(posts)
    } catch (err) {
        next(err);
    }
} 



const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("author")
        if (!post) {
            return res.status(404).json({message: "Post not found"})
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
        const newPost = await Post.create({
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
const updatePost = async (req, res, next) => {
    try {
        const {title, content} = req.body;

        const updatedFields = {};
        if(title) updatedFields.title = title
        if(content) updatedFields.content = content
        
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
        { $set: updatedFields }, 
        { new: true , runValidators: true })

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found or unauthorized"
            })
        }
        res.status(200).json({
            message: "Successfully updated post",
            data: updatedPost
        });
    } catch (err) {
        next(err)
    }
}
// Delete Post
const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unathorized"})
        }
        res.status(200).json({
            message: "Post has been successfully deleted"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { createPost, updatePost, getAllPosts, deletePost, getPostById }

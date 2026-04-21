let posts = [
    {id: 1, title: "First Post", content: "Hello World"},
    {id: 2, title: "React Post", content: "CRUD example"}
]

// Get post
const getPosts = (_req, res) => {
    res.status(200).send(posts)
}

// Create Post 

const createPost = (req, res) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    }
    posts.push(newPost)
    return res.status(201).send({
        message: "Created post successfully",
    })
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

module.exports = { createPost, updatePost, getPosts, deletePost }

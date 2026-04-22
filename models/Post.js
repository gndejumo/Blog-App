const mongoose = require ("mongoose")
const { Schema, model } = mongoose;


const postSchema = new Schema ({
    title: {String, type: required},
    content: {String, type: required}
}, {timestamps: true})

module.exports = model("Post", postSchema)
// model name: Post
// collection name: posts
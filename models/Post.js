const mongoose = require ("mongoose")
const { Schema, model } = mongoose;


const postSchema = new Schema ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true})

module.exports = model("Post", postSchema)
// model name: Post
// collection name: posts
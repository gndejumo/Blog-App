const mongoose = require ("mongoose")
const { Schema, model } = mongoose

const blacklistSchema = new Schema({
    token: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 //seconds equivalent to 24hrs
    }
});

module.exports = model('Blacklist', blacklistSchema)
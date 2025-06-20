const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./comments');

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    dateOfPost: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

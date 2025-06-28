const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    userId: String,
    title: {type: String, required: true},
    description: {type: String, required: true},
    dateOfPost: {type: Date, default: Date.now},
    photoUrl: {type: String, default: ''},
    likes: {type: Number, default: 0},
    likedByUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [String]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

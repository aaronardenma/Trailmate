const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require("../models/users");
const Trip = require("../models/trips");

router.get('/getPosts', async (req, res) => {
    try {
        const items = await Post.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/getPostsForUser/:userId', async (req, res) => {
    const userID = req.params.userId
    console.log("here i am")
    console.log(userID)
    try {
        console.log(userID)
        const posts = await Post.find({ userId: userID });
        console.log(posts)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addPost', async (req, res) => {
    const { userId, title, description, photoUrl } = req.body;

    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost: new Date(),
        photoUrl: photoUrl || '',
    });
    console.log(newPost)

    try {
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ error: 'Error creating post', details: err.message });
    }
});
router.put('/updatePost/:id', async (req, res) => {
    console.log("her ei am")
    const { userId, title, description, photoUrl, likes, comments } = req.body;


    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost: new Date(),
        photoUrl: photoUrl || '',likes, comments
    });
    console.log(newPost)

    try {
        const updatedUser = await Post.findByIdAndUpdate(
            req.params.id,
            {
                userId, title, description, photoUrl, likes, comments
            },
            { new: true, runValidators: true }
        );

        res.status(201).json({ message: 'Post created successfully', post: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error creating post', details: err.message });
    }
});
router.delete('/deletePost/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const deletedUser = await Post.findByIdAndDelete(req.params.id);
        console.log("inside delete")
        if (!deletedUser) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting post', details: err.message });
    }
});

module.exports = router;

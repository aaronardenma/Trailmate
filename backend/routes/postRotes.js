const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

router.get('/getPosts', async (req, res) => {
    try {
        const items = await Post.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addPost', async (req, res) => {
    const { userId, title, description, dateOfPost, photoUrl } = req.body;

    if (!userId || !title || !description) {
        return res.status(400).json({ error: 'userId, title, and description are required' });
    }

    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost,
        photoUrl: photoUrl || '',
    });

    try {
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ error: 'Error creating post', details: err.message });
    }
});

module.exports = router;

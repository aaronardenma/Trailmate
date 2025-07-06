const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const mongoose = require('mongoose');
const authenticateToken = require("../service/auth")

router.post('/add/:postId', authenticateToken, async (req, res) => {
    const userId = req.user.id
    const {postId} = req.params;
    const {
        comment
    } = req.body;

    const newComment = new Comment({
        userID: userId,
        postID: postId,
        comment,
    });

    console.log(newComment)
    try {
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        res.status(500).json({ error: 'Error  comment', details: err });
    }
});

router.get('/post/:postId', async (req, res) => {
    const {postId} = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }

        const comments = await Comment.find({ postID: postId }).populate('userID')
        
        res.status(200).json({ comments });
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Error fetching comments', details: err.message });
    }
});


module.exports = router;
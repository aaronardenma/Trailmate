const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
router.post('/addComment', async (req, res) => {
    console.log("here")
    const {
        userID,
        postID,
        comment,
        date
    } = req.body;

    const newComment = new Comment({
        userID,
        postID,
        comment,
        date
    });
    try {
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        res.status(500).json({ error: 'Error adding comment', details: err });
    }
});
module.exports = router;
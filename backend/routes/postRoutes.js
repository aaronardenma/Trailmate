const express = require('express');
const router = express.Router();

const Post = require('../models/posts');
const User = require("../models/users");
const authenticateToken = require('../service/auth');
const Trail = require('../models/trails'); 
const mongoose = require('mongoose'); 

const getPostAggregationPipeline = (matchConditions = {}) => {
    return [
        { $match: matchConditions }, 
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userId'
            }
        },
        {
            $unwind: {
                path: '$userId',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                userId: {
                    $cond: {
                        if: { $eq: ['$userId.visibility', 'private'] },
                        then: {
                            _id: '$userId._id',
                            firstName: '$userId.firstName',
                            lastName: '$userId.lastName',
                            gender: '$userId.gender'
                        },
                        else: '$userId'
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'trails', 
                localField: 'trailId',
                foreignField: '_id',
                as: 'trailId'
            }
        },
        {
            $unwind: {
                path: '$trailId',
                preserveNullAndEmptyArrays: true 
            }
        },
        { $sort: { dateOfPost: -1 } } 
    ];
};


router.get('/getPosts', async (req, res) => {
    try {
        const pipeline = getPostAggregationPipeline();
        const items = await Post.aggregate(pipeline);
        res.json(items);
    } catch (err) {
        console.error("Error fetching posts:", err.message);
        res.status(500).json({error: err.message});
    }
});

router.get('/searchAndFilter', async (req, res) => {
    const { q } = req.query; 

    try {
        let matchConditions = {};

        if (q) {
            const regex = new RegExp(q, 'i');
            const matchingTrails = await Trail.find({ name: regex }).select('_id');

            if (matchingTrails.length === 0) {
                return res.json([]); 
            }
            matchConditions.trailId = { $in: matchingTrails.map(trail => trail._id) };
        }

        const pipeline = getPostAggregationPipeline(matchConditions);
        const posts = await Post.aggregate(pipeline);

        res.json(posts);
    } catch (err) {
        console.error("Error searching/filtering posts:", err.message);
        res.status(500).json({ error: 'Error searching and filtering posts', details: err.message });
    }
});


router.get('/getPostsForUser/', authenticateToken, async (req, res) => {
    const userID = req.user.id; 

    try {
        const userObjectId = new mongoose.Types.ObjectId(userID);
        
        const pipeline = getPostAggregationPipeline({ userId: userObjectId });
        const posts = await Post.aggregate(pipeline);
        
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts for user:", err.message);
        res.status(500).json({error: err.message});
    }
});

router.post('/add', authenticateToken, async (req, res) => {
    const {title, description, photoUrl, trailId} = req.body; 
    const userId = req.user.id

    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost: new Date(),
        likes: 0,
        likedByUsers: [],
        photoUrl: photoUrl || '',
        trailId: trailId || null,
    });

    try {
        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post: newPost}); 
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({error: 'Error creating post', details: err.message});
    }
});


router.put('/updatePost/:postId', authenticateToken, async (req, res) => {
    const {title, description, photoUrl, likes, comments, trailId} = req.body; 
    const userId = req.user.id
    const postId = req.params.postId

    try {
        const updateData = {
            title,
            description,
            photoUrl: photoUrl || '',
            trailId: trailId || null,
        };

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updateData,
            {new: true, runValidators: true}
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const populatedUpdatedPost = await Post.aggregate(getPostAggregationPipeline({ _id: updatedPost._id }));
        res.status(200).json({message: 'Post updated successfully', post: populatedUpdatedPost[0]});
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({error: 'Error updating post', details: err.message});
    }
});

router.put('/updatePostLikes/:postId', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    try {
        const currentPost = await Post.findById(postId);
        if (!currentPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userIndex = currentPost.likedByUsers
            .map(id => id.toString())
            .indexOf(userId);

        let message;

        if (userIndex !== -1) {
            currentPost.likedByUsers.splice(userIndex, 1);
            currentPost.likes = Math.max(0, currentPost.likes - 1);
            message = "You unliked this post.";
        } else {
            currentPost.likedByUsers.push(userId);
            currentPost.likes += 1;
            message = "You liked this post!";
        }

        await currentPost.save();
        res.status(200).json({ message, likes: currentPost.likes });
    }
    catch (err) {
        console.error('Error updating post likes:', err);
        res.status(500).json({ error: 'Error updating post likes', details: err.message });
    }
});


router.put('/updatePostComments/:postId', async (req, res) => {
    let { comment } = req.body;
    const postId = req.params.postId;
    const userId = req.user ? req.user.id : null; 

    try {
        let currentPost = await Post.findById(postId);
        if (!currentPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!currentPost.comments) {
            currentPost.comments = [];
        }

        currentPost.comments.push({
            comment: comment,
            userId: userId,
            date: new Date()
        });
        
        await currentPost.save();
        res.status(201).json({ message: 'Comment added successfully' });

    } catch (err) {
        console.error('Error updating post comments:', err);
        res.status(500).json({error: 'Error adding comment to post', details: err.message});
    }
});


router.delete('/deletePost/:id', async (req, res) => {
    const postId = (req.params.id)
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post deleted successfully', post: deletedPost});
    } catch (err) {
        console.error('Error deleting post:', err.message);
        res.status(500).json({error: 'Error deleting post', details: err.message});
    }
});

router.get("/postLikeStatus/:postId", authenticateToken, async (req, res) => {
    const postId = req.params.postId
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const liked = post.likedByUsers
            .map(id => id.toString())
            .includes(userId);

        res.status(200).json({ liked });
    } catch (err) {
        console.error('Error checking like status:', err.message);
        res.status(500).json({ error: 'Error checking like status', details: err.message });
    }

})

module.exports = router;
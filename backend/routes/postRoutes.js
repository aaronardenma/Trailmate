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
        res.status(500).json({error: err.message});
    }
});


router.get('/getPostsForUser/:userId', async (req, res) => {
    const userID = req.params.userId
    console.log(userID)
    try {
        console.log(userID)
        const posts = await Post.find({userId: userID});
        console.log(posts)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/addPost', async (req, res) => {
    const {userId, title, description, photoUrl} = req.body;

    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost: new Date(),
        likedByUsers: [],
        photoUrl: photoUrl || '',
    });
    console.log(newPost)

    try {
        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post: newPost});
    } catch (err) {
        res.status(500).json({error: 'Error creating post', details: err.message});
    }
});


router.put('/updatePost/:id', async (req, res) => {
    console.log("her ei am")
    const {userId, title, description, photoUrl, likes, comments} = req.body;

    const newPost = new Post({
        userId,
        title,
        description,
        dateOfPost: new Date(),
        photoUrl: photoUrl || '', likes, comments
    });
    console.log(newPost)

    try {
        const updatedUser = await Post.findByIdAndUpdate(
            req.params.id,
            {
                userId, title, description, photoUrl, likes, comments
            },
            {new: true, runValidators: true}
        );

        res.status(201).json({message: 'Post created successfully', post: updatedUser});
    } catch (err) {
        res.status(500).json({error: 'Error creating post', details: err.message});
    }
});

router.put('/updatePostLikes/:id', async (req, res) => {
    let currentUserLikingPost = req.body.user_id
    let currentPost = await Post.findOne({_id: req.params.id})
    let message = ""

    // console.log("currentUserLikingPost " + currentUserLikingPost);
    console.log("currentPost.likedByUsers.length >>>>>>>>>>>>>>>" + currentPost.likedByUsers.length);

    try {
        if (currentPost.likes === 0) {
            currentPost.likedByUsers.push(currentUserLikingPost)
            currentPost.likes += 1
            await currentPost.save();
        } else {
            for (let i = 0; i < currentPost.likedByUsers.length; i++) {
                console.log((currentPost.likedByUsers[i]).toString())
                if (currentUserLikingPost === (currentPost.likedByUsers[i]).toString()) {
                    message = 'You have already liked this post'
                    res.status(304).json({message: 'You have already liked this post'});
                }
            }
            currentPost.likedByUsers.push(currentUserLikingPost)
            currentPost.likes += 1
            await currentPost.save();
            message = "You liked this post!"
            // res.status(201).json({message: 'You have already liked this post'});
        }
        console.log("currentPost.likedByUsers.length <<<<<<<<<<<<<<<<<<" + currentPost.likedByUsers.length);
        // console.log("current post AFTER " + currentPost);
        message = "Post updated successfully"
        res.status(201).json({message: message});
    } catch (err) {
        res.status(500).json({error: 'Error creating post', details: err.message});
    }
    // res.status(201).json({message: 'Post updated successfully'});
});


router.put('/updatePostComments/:id', async (req, res) => {
    let currentUserComments = req.body.comments
    let currentPost = await Post.findOne({_id: req.params.id})
    console.log(currentUserComments)

    try {
        if (currentUserComments !== null) {
            currentPost.comments.push(currentUserComments);
        }
        console.log("current comment " + currentUserComments);
        await currentPost.save();
        // res.json(currentPost);
        res.status(201).json({message: 'Post updated successfully'});
    } catch (err) {
        res.status(500).json({error: 'Error creating post', details: err.message});
    }
});


router.delete('/deletePost/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const deletedUser = await Post.findByIdAndDelete(req.params.id);
        console.log("inside delete")
        if (!deletedUser) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post deleted successfully', user: deletedUser});
    } catch (err) {
        res.status(500).json({error: 'Error deleting post', details: err.message});
    }
});


// TODO: This is the new logic
/**
 *
 */
router.get('/getUser/:postID', async (req, res) => {
    const postID = req.params.postID
    let modifiedUser = {}
    try {
        const post = await Post.findOne({_id: postID});
        const user = await User.findOne({_id: post.userId});
        // console.log("POST " + post)
        // console.log("USER " + user)
        if (user.visibility === 'public'){
           modifiedUser = user
        } else {
            modifiedUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
            }
        }
        res.status(200).json(modifiedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;

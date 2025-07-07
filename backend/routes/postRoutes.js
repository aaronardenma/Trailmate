// const express = require('express');
// const router = express.Router();
//
// const Post = require('../models/posts');
// const User = require("../models/users");
// const authenticateToken = require('../service/auth');
//
// router.get('/getPosts', async (req, res) => {
//     try {
//         const items = await Post.aggregate([
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'userId'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$userId',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $addFields: {
//                     userId: {
//                         $cond: {
//                             if: { $eq: ['$userId.visibility', 'private'] },
//                             then: {
//                                 _id: '$userId._id',
//                                 firstName: '$userId.firstName',
//                                 lastName: '$userId.lastName',
//                                 gender: '$userId.gender'
//                             },
//                             else: '$userId'
//                         }
//                     }
//                 }
//             }
//         ]);
//
//         res.json(items);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
//
// });
//
//
// router.get('/getPostsForUser/', authenticateToken, async (req, res) => {
//     const userID = req.user.id
//     console.log(userID)
//     try {
//         console.log(userID)
//         const posts = await Post.find({userId: userID});
//         console.log(posts)
//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// });
//
// router.post('/add', authenticateToken, async (req, res) => {
//     const {title, description, photoUrl} = req.body;
//     const userId = req.user.id
//
//     const newPost = new Post({
//         userId,
//         title,
//         description,
//         dateOfPost: new Date(),
//         likedByUsers: [],
//         photoUrl: photoUrl || '',
//     });
//     console.log(newPost)
//
//     try {
//         await newPost.save();
//         res.status(201).json({message: 'Post created successfully', post: newPost});
//     } catch (err) {
//         res.status(500).json({error: 'Error creating post', details: err.message});
//     }
// });
//
//
// router.put('/updatePost/:postId', authenticateToken, async (req, res) => {
//     const {title, description, photoUrl, likes, comments} = req.body;
//     const userId = req.user.id
//     const postId = req.params.postId
//
//     const newPost = new Post({
//         userId,
//         title,
//         description,
//         dateOfPost: new Date(),
//         photoUrl: photoUrl || '', likes, comments
//     });
//     console.log(newPost)
//
//     try {
//         const updatedUser = await Post.findByIdAndUpdate(
//             postId,
//             {
//                 userId, title, description, photoUrl, likes, comments
//             },
//             {new: true, runValidators: true}
//         );
//
//         res.status(201).json({message: 'Post created successfully', post: updatedUser});
//     } catch (err) {
//         res.status(500).json({error: 'Error creating post', details: err.message});
//     }
// });
//
// router.put('/updatePostLikes/:postId', authenticateToken, async (req, res) => {
//     const userId = req.user.id;
//     const postId = req.params.postId;
//
//     try {
//         const currentPost = await Post.findById(postId);
//         if (!currentPost) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//
//         const userIndex = currentPost.likedByUsers
//             .map(id => id.toString())
//             .indexOf(userId);
//         console.log(userIndex)
//
//         let message;
//
//         if (userIndex !== -1) {
//             currentPost.likedByUsers.splice(userIndex, 1);
//             currentPost.likes = Math.max(0, currentPost.likes - 1);
//             message = "You unliked this post.";
//         } else {
//             currentPost.likedByUsers.push(userId);
//             currentPost.likes += 1;
//             message = "You liked this post!";
//         }
//
//         await currentPost.save();
//         res.status(200).json({ message });
//
//     } catch (err) {
//         res.status(500).json({ error: 'Error updating post', details: err.message });
//     }
// });
//
//
//
// router.put('/updatePostComments/:postId', async (req, res) => {
//     let {currentUserComments} = req.body.comments
//     console.log(currentUserComments)
//     const postId = req.params.postId
//     let currentPost = await Post.findOne({_id: postId})
//     console.log(currentUserComments)
//
//     try {
//         if (currentUserComments !== null) {
//             currentPost.comments.push(currentUserComments);
//         }
//         console.log("current comment " + currentUserComments);
//         await currentPost.save();
//         res.status(201).json({message: 'Post updated successfully'});
//     } catch (err) {
//         res.status(500).json({error: 'Error creating post', details: err.message});
//     }
// });
//
//
// router.delete('/deletePost/:id', async (req, res) => {
//     const postId = (req.params.id)
//     try {
//         const deletedUser = await Post.findByIdAndDelete(postId);
//         console.log("inside delete")
//         if (!deletedUser) {
//             return res.status(404).json({message: 'Post not found'});
//         }
//         res.status(200).json({message: 'Post deleted successfully', user: deletedUser});
//     } catch (err) {
//         res.status(500).json({error: 'Error deleting post', details: err.message});
//     }
// });
//
// router.get("/postLikeStatus/:postId", authenticateToken, async (req, res) => {
//     const postId = req.params.postId
//     const userId = req.user.id;
//
//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//
//         const liked = post.likedByUsers
//             .map(id => id.toString())
//             .includes(userId);
//
//         res.status(200).json({ liked });
//     } catch (err) {
//         res.status(500).json({ error: 'Error checking like status', details: err.message });
//     }
//
// })
//
//
// module.exports = router;

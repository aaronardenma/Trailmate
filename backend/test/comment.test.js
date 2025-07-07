// process.env.NODE_ENV = 'test';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const app = require('../server');
//
// const User = require('../models/users');
// const Post = require('../models/posts');
// const Comment = require('../models/comments');
//
// const expect = chai.expect;
// chai.use(chaiHttp);
//
// describe('Comment API Routes', () => {
//     let user, token, post;
//
//     beforeEach(async () => {
//         await User.deleteMany({});
//         await Post.deleteMany({});
//         await Comment.deleteMany({});
//
//         user = await User.create({
//             firstName: 'Test',
//             lastName: 'User',
//             email: 'test@example.com',
//             password: 'password123'
//         });
//
//         token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
//
//         post = await Post.create({
//             userId: user._id,
//             title: 'Test Post',
//             description: 'Post description',
//             photoUrl: '',
//             likes: 0,
//             likedByUsers: []
//         });
//     });
//
//     afterEach(async () => {
//         await User.deleteMany({});
//         await Post.deleteMany({});
//         await Comment.deleteMany({});
//     });
//
//     describe('POST /api/comments/add/:postId', () => {
//         it('should successfully add a comment to a post', async () => {
//             const commentText = 'This is a test comment';
//
//             const res = await chai
//                 .request(app)
//                 .post(`/api/comments/add/${post._id}`)
//                 .set('Cookie', `token=${token}`)
//                 .send({ comment: commentText });
//
//             expect(res).to.have.status(201);
//             expect(res.body).to.have.property('message', 'Comment added successfully');
//             expect(res.body.comment).to.include({
//                 comment: commentText,
//                 postID: post._id.toString(),
//                 userID: user._id.toString(),
//             });
//         });
//
//         it('should fail without a valid token', async () => {
//             const res = await chai
//                 .request(app)
//                 .post(`/api/comments/add/${post._id}`)
//                 .send({ comment: 'No token comment' });
//
//             expect(res).to.have.status(401);
//         });
//
//         it('should return 400 for empty comment', async () => {
//             const res = await chai
//                 .request(app)
//                 .post(`/api/comments/add/${post._id}`)
//                 .set('Cookie', `token=${token}`)
//                 .send({ comment: '' });
//
//             expect(res).to.have.status(400);
//         });
//     });
//
//     describe('GET /api/comments/post/:postId', () => {
//         it('should retrieve comments for a post', async () => {
//             await Comment.create({
//                 userID: user._id,
//                 postID: post._id,
//                 comment: 'Nice post!'
//             });
//
//             const res = await chai
//                 .request(app)
//                 .get(`/api/comments/post/${post._id}`);
//
//             expect(res).to.have.status(200);
//             expect(res.body.comments).to.be.an('array');
//             expect(res.body.comments[0]).to.have.property('comment', 'Nice post!');
//         });
//
//         it('should return 400 for invalid post ID format', async () => {
//             const res = await chai
//                 .request(app)
//                 .get(`/api/comments/post/invalid123`);
//
//             expect(res).to.have.status(400);
//             expect(res.body).to.have.property('error', 'Invalid post ID format');
//         });
//
//         it('should return empty array if no comments exist', async () => {
//             const res = await chai
//                 .request(app)
//                 .get(`/api/comments/post/${post._id}`);
//
//             expect(res).to.have.status(200);
//             expect(res.body.comments).to.be.an('array').that.is.empty;
//         });
//     });
// });

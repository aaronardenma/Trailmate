const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const Post = require('../models/posts');
const User = require('../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Comment = require("../models/comments");

chai.use(chaiHttp);
const { expect } = chai;

let token;
let userId;
let postId;

describe('Post API', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await Post.deleteMany({});

        const user = new User({
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            gender: 'male',
            visibility: 'public'
        });
        await user.save();
        userId = user._id.toString();

        token = jwt.sign({ id: userId, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        const post = await Post.create({
            userId,
            title: 'Initial Post',
            description: 'Initial Description',
            dateOfPost: new Date(),
            likedByUsers: [],
            comments: [],
            likes: 0,
            photoUrl: ''
        });

        postId = post._id.toString();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('GET /getPosts', () => {
        it('should return all posts with user info and respect user visibility', async () => {
            await User.findByIdAndUpdate(userId, {
                visibility: 'private',
                firstName: 'John',
                lastName: 'Doe',
                gender: 'male'
            });

            const res = await chai.request(app).get('/getPosts');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            const post = res.body[0];
            expect(post).to.have.property('userId');
            expect(post.userId).to.include.keys('_id', 'firstName', 'lastName', 'gender');
            expect(post.userId).to.not.have.property('email');
        });

        it('should include full user info if visibility is public', async () => {
            await User.findByIdAndUpdate(userId, { visibility: 'public' });

            const res = await chai.request(app).get('/getPosts');
            expect(res).to.have.status(200);
            const post = res.body[0];
            expect(post.userId).to.have.property('email', 'test@example.com');
            expect(post.userId).to.have.property('firstName', 'Test');
        });
    });

    describe('GET /getPostsForUser/', () => {
        it('should return posts belonging to the authenticated user', async () => {
            const res = await chai
                .request(app)
                .get('/getPostsForUser/')
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.some(p => p._id === postId)).to.be.true;
        });

        it('should return 401 if no token provided', async () => {
            const res = await chai.request(app).get('/getPostsForUser/');
            expect(res).to.have.status(401);
        });
    });

    describe('POST /add', () => {
        it('should create a post for authenticated user', async () => {
            const postPayload = {
                title: 'New post',
                description: 'Post description',
                photoUrl: 'http://example.com/image.png'
            };

            const res = await chai
                .request(app)
                .post('/add')
                .set('Cookie', `token=${token}`)
                .send(postPayload);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Post created successfully');
            expect(res.body.post).to.include(postPayload);
            expect(res.body.post).to.have.property('userId', userId);
        });

        it('should return 401 without token', async () => {
            const res = await chai.request(app).post('/add').send({ title: 'x' });
            expect(res).to.have.status(401);
        });
    });

    describe('PUT /updatePost/:postId', () => {
        it('should update an existing post', async () => {
            const updatePayload = {
                title: 'Updated title',
                description: 'Updated desc',
                photoUrl: 'http://example.com/updated.png',
                likes: 5,
                comments: ['Nice!']
            };

            const res = await chai
                .request(app)
                .put(`/updatePost/${postId}`)
                .set('Cookie', `token=${token}`)
                .send(updatePayload);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Post created successfully');
            expect(res.body.post.title).to.equal(updatePayload.title);
            expect(res.body.post.description).to.equal(updatePayload.description);
            expect(res.body.post.photoUrl).to.equal(updatePayload.photoUrl);
            expect(res.body.post.likes).to.equal(updatePayload.likes);
        });

        it('should return 401 without token', async () => {
            const res = await chai.request(app).put(`/updatePost/${postId}`).send({ title: 'x' });
            expect(res).to.have.status(401);
        });
    });

    describe('PUT /updatePostLikes/:postId', () => {
        it('should like a post if not already liked', async () => {
            const res = await chai
                .request(app)
                .put(`/updatePostLikes/${postId}`)
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('You liked this post!');
        });

        it('should unlike the post if already liked', async () => {
            await chai
                .request(app)
                .put(`/updatePostLikes/${postId}`)
                .set('Cookie', `token=${token}`);

            const res = await chai
                .request(app)
                .put(`/updatePostLikes/${postId}`)
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('You unliked this post.');
        });

        it('should return 404 if post does not exist', async () => {
            const res = await chai
                .request(app)
                .put('/updatePostLikes/507f1f77bcf86cd799439011')
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Post not found');
        });
    });

    describe('PUT /updatePostComments/:postId', () => {
        // it('should add a comment to the post', async () => {
        //     // const comment = { currentUserComments: 'Great post!' };
        //     const  comment = {
        //         userID: userId,
        //         postID: postId,
        //         comment: 'Nice post!'
        //     }
        //
        //     const res = await chai
        //         .request(app)
        //         .put(`/updatePostComments/${postId}`)
        //         .send({ comments: comment });
        //
        //     expect(res).to.have.status(201);
        //     expect(res.body.message).to.equal('Post updated successfully');
        //
        //     const post = await Post.findById(postId);
        //     expect(post.comments).to.include('Great post!');
        // });

        it('should return 500 if error occurs', async () => {
            const res = await chai
                .request(app)
                .put('/updatePostComments/invalidid')
                .send({ comments: { currentUserComments: 'test' } });

            expect(res).to.have.status(500);
        });
    });

    describe('DELETE /deletePost/:id', () => {
        it('should delete the post', async () => {
            const newPost = await Post.create({
                userId,
                title: 'To be deleted',
                description: 'Delete me',
                dateOfPost: new Date(),
                likedByUsers: [],
                photoUrl: ''
            });

            const res = await chai.request(app).delete(`/deletePost/${newPost._id}`);
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Post deleted successfully');
            expect(res.body.user._id).to.equal(newPost._id.toString());

            const deleted = await Post.findById(newPost._id);
            expect(deleted).to.be.null;
        });

        it('should return 404 if post not found', async () => {
            const res = await chai.request(app).delete('/deletePost/507f1f77bcf86cd799439011');
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('Post not found');
        });
    });

    describe('GET /postLikeStatus/:postId', () => {
        it('should return liked: true if user liked the post', async () => {
            const post = await Post.findById(postId);
            post.likedByUsers = [userId];
            await post.save();

            const res = await chai
                .request(app)
                .get(`/postLikeStatus/${postId}`)
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body.liked).to.be.true;
        });

        it('should return liked: false if user did not like the post', async () => {
            const post = await Post.findById(postId);
            post.likedByUsers = [];
            await post.save();

            const res = await chai
                .request(app)
                .get(`/postLikeStatus/${postId}`)
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body.liked).to.be.false;
        });

        it('should return 404 if post not found', async () => {
            const res = await chai
                .request(app)
                .get('/postLikeStatus/507f1f77bcf86cd799439011')
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(404);
        });
    });
});

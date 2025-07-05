process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');

const Comment = require('../models/comments');
const User = require('../models/users');
const Post = require('../models/posts');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Comment API Routes', () => {
    let user, userId, post;

    beforeEach(async () => {
        await Comment.deleteMany({});
        await User.deleteMany({});
        await Post.deleteMany({});

        user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });
        userId = user._id;

        post = await Post.create({
            userId: userId,
            title: 'Test Post',
            description: 'This is a test post',
            photoUrl: 'https://example.com/image.jpg'
        });
    });

    afterEach(async () => {
        await Comment.deleteMany({});
        await User.deleteMany({});
        await Post.deleteMany({});
    });

    describe('POST /addComment', () => {
        it('should add a comment successfully to a post', (done) => {
            const commentData = {
                userID: userId,
                postID: post._id,
                comment: 'This is a test comment',
                date: new Date().toISOString()
            };
            console.log(commentData)

            chai.request(app)
                .post('/api/comments/addComment')
                .send(commentData)
                .end((err, res) => {
                    if (err) return done(err);

                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'Comment added successfully');
                    expect(res.body.comment).to.have.property('userID').that.equals(commentData.userID.toString());
                    expect(res.body.comment).to.have.property('postID').that.equals(commentData.postID.toString());
                    expect(res.body.comment).to.have.property('comment', commentData.comment);
                    done();
                });
        });
    });
});

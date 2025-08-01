process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const server = require('../server'); // make sure this exports your express app
const Posts = require('../models/posts');
const {ObjectId} = require("mongodb");

chai.use(chaiHttp);

let postId;
let wrongPostId = 1;
let wrongPostIdString = "Hello";
let testUserId = "68551e80e12a0479b20847ef"

const samplePosts = [
    {
        _id: "685f74a6994812ae20f8019f",
        userId: "68551e80e12a0479b20847ef",
        title: "test",
        description: "test",
        dateOfPost: "2025-06-28T04:50:46.724Z",
        photoUrl: "",
        likes: 3,
        likedByUsers: [
            "68551e80e12a0479b20847ef",
            "6865b4327c1c96654c2ace5c",
            "6865b4327c1c96654c2ace5c"
        ],
        comments: [
            "Hello World",
            "Second Comment",
        ],
        createdAt: "2025-06-28T04:50:46.735Z",
        updatedAt: "2025-07-05T04:02:56.406Z",
    },
    {
        _id: "68619b0a9fc96faa8203c627",
        userId: "68551e80e12a0479b20847ef",
        title: "HELLO",
        description: "WORLD",
        dateOfPost: "2025-06-29T19:59:06.389Z",
        photoUrl: "",
        likes: 5,
        likedByUsers: [
            "68551e80e12a0479b20847ef",
            "6865b4327c1c96654c2ace5c",
            "6865b4327c1c96654c2ace5c"
        ],
        comments: [
            "Hello World",
            "Second Comment",
        ],
        createdAt: "2025-06-29T19:59:06.404Z",
        updatedAt: "2025-07-05T04:04:00.756Z",
    },
    {
        _id: "68619b8854a12d93cc1fa476",
        userId: "68551e80e12a0479b20847ef",
        title: "HELLO",
        description: "HELLO WORLD",
        dateOfPost: "2025-06-29T20:01:12.884Z",
        photoUrl: "",
        likes: 3,
        likedByUsers: [
            "68551e80e12a0479b20847ef",
            "6865b4327c1c96654c2ace5c",
            "6865b4327c1c96654c2ace5c"
        ],
        comments: [
            "Cats are great"
        ],
        createdAt: "2025-06-29T20:01:12.898Z",
        updatedAt: "2025-07-03T03:11:01.391Z",
    },
    {
        _id: "6865bc7a64e3b7aec9df18bc",
        userId: "686599d72f5b939146975019",
        title: "cswqwd",
        description: "deeeee",
        dateOfPost: "2025-07-02T23:10:50.332Z",
        photoUrl: "",
        likes: 2,
        likedByUsers: [
            "6865b4327c1c96654c2ace5c",
            "6865b4327c1c96654c2ace5c"
        ],
        comments: [
            "hello"
        ],
        createdAt: "2025-07-02T23:10:50.339Z",
        updatedAt: "2025-07-02T23:12:17.249Z",
    }
]


beforeEach(async () => {
    await Posts.deleteMany({});
    const inserted = await Posts.insertMany(samplePosts);
    postId = inserted[0]._id.toString();
    testUserId = inserted[0].userId.toString()
    console.log(inserted)
});

afterEach(async () => {
    await Posts.deleteMany({});
});

describe('Posts API Test Collection', () => {

    it('should test equality of two values', function () {
        expect(10).to.equal(10);
    });

    it('should get all posts', (done) => {
        chai.request(server)
            .get('/api/posts/getPosts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array')
                done();
            });
    });

    it('should get posts by specific ID', (done) => {
        chai.request(server)
            .get(`/api/posts/getPostsForUser/${postId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array')
                done();
            });
    });

    it('should return error for wrong ID', (done) => {
        chai.request(server)
            .get(`/api/posts/getPostsForUser/${wrongPostId}`)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.be.a('string')
                done();
            });
    });

    it('should return error for wrong ID - String', (done) => {
        chai.request(server)
            .get(`/api/posts/getPostsForUser/${wrongPostIdString}`)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.be.a('string')
                done();
            });
    });

    it('should add a new post', (done) => {
        let post = {
            userId: testUserId,
            title: "Testing Post",
            description: "Post add test",
            photoUrl: '',
        }
        chai.request(server)
            .post('/api/posts/addPost')
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('message', 'Post created successfully');
                expect(res.body).to.have.property('post');
                expect(res.body.post).to.have.property('title', 'Testing Post');
                expect(res.body.post).to.have.property('description', "Post add test");
                expect(res.body.post).to.have.property('photoUrl');
                expect(res.body.post).to.have.property('likes', 0);
                expect(res.body.post).to.have.property('likedByUsers').that.is.an('array').that.is.empty;
                expect(res.body.post).to.have.property('dateOfPost');
                done();
            });
    });

    it('should not add a new post with no userID', (done) => {
        let post = {
            title: "Testing Post",
            description: "Post add test",
            photoUrl: '',
        }
        chai.request(server)
            .post('/api/posts/addPost')
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', 'Error creating post');
                expect(res.body).to.have.property('details', 'Post validation failed: userId: Path `userId` is required.');
                done();
            });
    });

    it('should not add a new post with no title', (done) => {
        let post = {
            userId: testUserId,
            title: "",
            description: "Post add test",
            photoUrl: '',
        }
        chai.request(server)
            .post('/api/posts/addPost')
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', 'Error creating post');
                expect(res.body).to.have.property('details', 'Post validation failed: title: Path `title` is required.');
                done();
            });
    });

    it('should not add a new post with no description', (done) => {
        let post = {
            userId: testUserId,
            title: "Hello",
            description: "",
            photoUrl: '',
        }
        chai.request(server)
            .post('/api/posts/addPost')
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', 'Error creating post');
                expect(res.body).to.have.property('details', 'Post validation failed: description: Path `description` is required.');
                done();
            });
    });

    it('should update likes on a post not already liked by the user', (done) => {
        let post = {
            user_id: new ObjectId,
        }
        chai.request(server)
            .put(`/api/posts/updatePostLikes/${postId}`)
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('post');
                expect(res.body.post).to.have.property('title', 'test');
                expect(res.body.post).to.have.property('description', "test");
                expect(res.body.post).to.have.property('photoUrl');
                expect(res.body.post).to.have.property('likes', 4);
                expect(res.body.post).to.have.property('likedByUsers').that.is.an('array').to.have.lengthOf(4)
                expect(res.body.post).to.have.property('comments');
                done();
            });
    });

    it('should not update likes on a post already liked by the user', (done) => {
        let post = {
            user_id: testUserId,
        }
        chai.request(server)
            .put(`/api/posts/updatePostLikes/${postId}`)
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(304);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it('should update comments on a post', (done) => {
        let post = {
            comments: "this is my new comment",
        }
        chai.request(server)
            .put(`/api/posts/updatePostComments/${postId}`)
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('post');
                expect(res.body.post).to.have.property('comments').that.is.an('array').to.have.lengthOf(3)
                done();
            });
    });

    it('should not delete a post with wrong ID', (done) => {
        chai.request(server)
            .delete(`/api/posts/deletePost/68551e80e12a0479b20847ee`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('message', "Post not found")
                done();
            });
    });

    it('should delete a post with correct ID', (done) => {
        chai.request(server)
            .delete(`/api/posts/deletePost/${postId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('message', "Post deleted successfully")
                done();
            });
    });

    it('should not delete a post with incorrect ID format', (done) => {
        chai.request(server)
            .delete(`/api/posts/deletePost/1`)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', "Error deleting post")
                expect(res.body).to.have.property('details')
                done();
            });
    });

});

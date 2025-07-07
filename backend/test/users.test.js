process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const server = require('../server'); // make sure this exports your express app
const Users = require('../models/users');
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

let userId;
let wrongUserId = 1;
let wrongUserIdString = "Hello";
let testUserId = "68551e80e12a0479b20847ef"
let tokenUserOne = null
let tokenUserTwo = null

const sampleUsers = [
    {
        _id: "6860fd69720131b936b0b687",
        firstName: "User One",
        lastName: "User One Last Name",
        email: "UserOne@gmail.com",
        password: "SomePassword",
        badge: "Beginner",
        gender: "Male",
        nickname: "world",
        country: "String",
        photoUrl: "String",
        visibility: "public",
        gear: [],
        profileCompleted: false,
    },
    // {
    //     _id: "6860fd69720131b936b0b688",
    //     firstName: "User Two",
    //     lastName: "User Two Last Name",
    //     email: "UserTwo@gmail.com",
    //     password: "SomePassword",
    //     badge: "Advanced",
    //     gender: "Female",
    //     nickname: "Hello",
    //     country: "Canada",
    //     photoUrl: "String",
    //     visibility: "public",
    //     gear: [],
    //     profileCompleted: false,
    // },
]


beforeEach(async () => {
    await Users.deleteMany({});
    const inserted = await Users.insertMany(sampleUsers);
    userId = inserted[0]._id.toString();

    tokenUserOne = jwt.sign(
        {id: inserted[0]._id, email: inserted[0].email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    // tokenUserTwo = jwt.sign(
    //     {id: inserted[1]._id, email: inserted[1].email},
    //     process.env.JWT_SECRET,
    //     {expiresIn: '1h'}
    // );
});

afterEach(async () => {
    await Users.deleteMany({});
});

describe('Posts API Test Collection', () => {

    it('should test equality of two values', function () {
        expect(10).to.equal(10);
    });

    // it('should get current user', (done) => {
    //     chai.request(server)
    //         .get('/api/users/me')
    //         .set('Authorization', `Bearer ${tokenUserOne}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.be.an('object');
    //             expect(res.body).to.have.property('_id');
    //             expect(res.body).to.have.property('email');
    //             done();
    //         });
    // });
    //
    // it('should register user', (done) => {
    //     chai.request(server)
    //         .get('/api/users/register/auth')
    //         .set('Authorization', `Bearer ${tokenUserOne}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             done();
    //         });
    // });
    //
    // it('should fail to register user', (done) => {
    //     chai.request(server)
    //         .get('/api/users/register/auth')
    //         .set('Authorization', `Bearer ${tokenUserOne}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(500);
    //             done();
    //         });
    // });

});

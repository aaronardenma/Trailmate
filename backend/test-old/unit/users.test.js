const { MONGO_URI } = process.env;
const mongoose = require('mongoose');
const app = require('../../server');
const User = require('../../models/users');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
//
// chai.use(chaiHttp);
const chai = require("chai");
const chaiAsPromised = require("chai-http");
chai.use(chaiAsPromised);
const { expect } = chai;

let token = '';

before(async () => {
    mongoose.connect(MONGO_URI)

});

afterEach(async () => {
    await User.deleteMany();
});

// Close the database connection after all tests are done
after(async () => {
    await mongoose.connection.close();
});

describe('POST /register/auth', () => {
    it('should register a new user successfully', (done) => {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123',
        };

        chai
            .request(app)
            .post('/register/auth')
            .send(userData)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.user).to.equal('testuser@example.com');
                done();
            });
    });

    it('should return an error if email already exists', (done) => {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123',
        };
        chai
            .request(app)
            .post('/register/auth')
            .send(userData)
            .end(() => {
                chai
                    .request(app)
                    .post('/register/auth')
                    .send(userData)
                    .end((err, res) => {
                        expect(res.status).to.equal(500);
                        expect(res.body.error).to.equal('Email already registered');
                        done();
                    });
            });
    });
});

describe('POST /login/auth', () => {
    it('should login successfully with valid credentials', (done) => {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123',
        };

        chai
            .request(app)
            .post('/register/auth')
            .send(userData)
            .end(() => {
                chai
                    .request(app)
                    .post('/login/auth')
                    .send(userData)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.success).to.equal(true);
                        token = res.body.token; // Store token for authenticated tests
                        done();
                    });
            });
    });

    it('should return an error if credentials are invalid', (done) => {
        const userData = {
            email: 'wronguser@example.com',
            password: 'wrongpassword',
        };

        chai
            .request(app)
            .post('/login/auth')
            .send(userData)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.success).to.equal(false);
                done();
            });
    });
});

// TEST: View Profile (Authenticated)
describe('GET /me', () => {
    it('should return the user profile if authenticated', (done) => {
        chai
            .request(app)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.email).to.equal('testuser@example.com');
                done();
            });
    });

    it('should return 401 if not authenticated', (done) => {
        chai
            .request(app)
            .get('/me')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });
});

// TEST: Update User Gear (Authenticated)
describe('POST /update/gear', () => {
    it('should update the user gear successfully', (done) => {
        const gearData = [
            { category: 'Camping', item: 'Tent' },
            { category: 'Clothing', item: 'Jacket' },
        ];

        chai
            .request(app)
            .post('/update/gear')
            .set('Authorization', `Bearer ${token}`)
            .send({ gear: gearData })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.user.gear).to.deep.equal(gearData);
                done();
            });
    });

    it('should return 404 if user not found', (done) => {
        const invalidToken = 'invalid-token';
        chai
            .request(app)
            .post('/update/gear')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({ gear: [] })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });
});

// TEST: Setup Profile (Authenticated)
describe('POST /register/setup', () => {
    it('should update the user profile successfully', (done) => {
        const setupData = {
            firstName: 'John',
            lastName: 'Doe',
            badge: 'Intermediate',
            gender: 'Male',
            nickname: 'JohnDoe',
            country: 'USA',
            gear: [],
            visibility: 'public',
        };

        chai
            .request(app)
            .post('/register/setup')
            .set('Authorization', `Bearer ${token}`)
            .send(setupData)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.user.firstName).to.equal('John');
                done();
            });
    });

    it('should return 404 if user not found', (done) => {
        const invalidToken = 'invalid-token';
        chai
            .request(app)
            .post('/register/setup')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });
});

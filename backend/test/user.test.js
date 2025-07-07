process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../server');
const User = require('../models/users');

describe('User API', () => {
    let token;
    let userId;

    before(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await User.deleteMany({});
        token = null;
        userId = null;
    });

    describe('POST /register/auth', () => {
        it('should register a new user and return token cookie', async () => {
            const res = await chai.request(app)
                .post('/api/users/register/auth')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success', true);
            expect(res.body).to.have.property('user', 'test@example.com');
            expect(res).to.have.cookie('token');

            const user = await User.findOne({ email: 'test@example.com' });
            expect(user).to.exist;
            userId = user._id;
        });

        it('should not register without email or password', async () => {
            const res = await chai.request(app)
                .post('/api/users/register/auth')
                .send({ email: '' });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('success', false);
            expect(res.body.message).to.equal('Email and password are required');
        });

        it('should not register duplicate email', async () => {
            await User.create({ email: 'dup@example.com', password: 'password123' });
            const res = await chai.request(app)
                .post('/api/users/register/auth')
                .send({ email: 'dup@example.com', password: 'password123' });

            expect(res).to.have.status(500);
            expect(res.body).to.have.property('success', false);
            expect(res.body.error).to.include('Email already registered');
        });
    });

    describe('POST /login/auth', () => {
        beforeEach(async () => {
            const user = new User({ email: 'login@example.com', password: 'password123' });
            await user.save();
        });

        it('should login with correct credentials and set token cookie', async () => {
            const res = await chai.request(app)
                .post('/api/users/login/auth')
                .send({ email: 'login@example.com', password: 'password123' });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success', true);
            expect(res.body.message).to.equal('Login successful');
            expect(res.body.user).to.have.property('email', 'login@example.com');
            expect(res).to.have.cookie('token');
            token = res.header['set-cookie'][0];
        });

        it('should fail login with invalid credentials', async () => {
            const res = await chai.request(app)
                .post('/api/users/login/auth')
                .send({ email: 'login@example.com', password: 'wrongpass' });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('success', false);
            expect(res.body.message).to.equal('Invalid credentials');
        });

        it('should fail login with non-existing user', async () => {
            const res = await chai.request(app)
                .post('/api/users/login/auth')
                .send({ email: 'nouser@example.com', password: 'password123' });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('success', false);
            expect(res.body.message).to.equal('Invalid credentials');
        });
    });

    describe('GET /me', () => {
        beforeEach(async () => {
            const user = new User({ email: 'me@example.com', password: 'password123' });
            await user.save();
            userId = user._id;
            token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret');
        });

        it('should get current user info with valid token', async () => {
            const res = await chai.request(app)
                .get('/api/users/me')
                .set('Cookie', `token=${token}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('email', 'me@example.com');
            expect(res.body).to.not.have.property('password');
        });

        it('should return 404 if user does not exist', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const fakeToken = jwt.sign({ id: fakeId, email: 'fake@example.com' }, process.env.JWT_SECRET || 'testsecret');

            const res = await chai.request(app)
                .get('/api/users/me')
                .set('Cookie', `token=${fakeToken}`);

            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('User not found');
        });

        it('should return 401 if no token provided', async () => {
            const res = await chai.request(app).get('/api/users/me');
            expect(res).to.have.status(401);
        });
    });

    describe('POST /register/setup', () => {
        beforeEach(async () => {
            const user = new User({ email: 'setup@example.com', password: 'password123' });
            await user.save();
            userId = user._id;
            token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret');
        });

        it('should update user profile and mark profileCompleted', async () => {
            const profileData = {
                firstName: 'John',
                lastName: 'Doe',
                badge: 'Intermediate',
                gender: 'male',
                nickname: 'JD',
                country: 'USA',
                gear: [{ category: 'Clothing', item: 'Jacket' }],
                visibility: 'private'
            };

            const res = await chai.request(app)
                .post('/api/users/register/setup')
                .set('Cookie', `token=${token}`)
                .send(profileData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            console.log(res.body.user)
            const resUser = res.body.user;

            expect(resUser.firstName).to.equal(profileData.firstName);
            expect(resUser.lastName).to.equal(profileData.lastName);
            expect(resUser.badge).to.equal(profileData.badge);
            expect(resUser.gender).to.equal(profileData.gender);
            expect(resUser.nickname).to.equal(profileData.nickname);
            expect(resUser.country).to.equal(profileData.country);
            expect(resUser.visibility).to.equal(profileData.visibility);
            expect(res.body.user.gear.length).to.deep.equal(profileData.gear.length);
            expect(res.body.user.profileCompleted).to.be.true;
        });

        it('should return 500 if user not found', async () => {
            const fakeToken = jwt.sign({ id: new mongoose.Types.ObjectId(), email: 'fake@example.com' }, process.env.JWT_SECRET || 'testsecret');
            const res = await chai.request(app)
                .post('/api/users/register/setup')
                .set('Cookie', `token=${fakeToken}`)
                .send({ firstName: 'Jane' });

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('User not found');
        });
    });

    describe('POST /logout', () => {
        it('should clear token cookie and logout successfully', async () => {
            const res = await chai.request(app).post('/api/users/logout');

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.message).to.equal('Logged out successfully');
            expect(res.header['set-cookie'][0]).to.include('token=;'); // cleared cookie
        });
    });

    describe('POST /update/gear', () => {
        beforeEach(async () => {
            const user = new User({ email: 'gear@example.com', password: 'password123' });
            await user.save();
            userId = user._id;
            token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret');
        });

        it('should update user gear with valid token', async () => {
            const gearData = [{ category: 'Electronics', item: 'GPS' }, { category: 'Clothing', item: 'Hat' }];

            const res = await chai.request(app)
                .post('/api/users/update/gear')
                .set('Cookie', `token=${token}`)
                .send({ gear: gearData });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.message).to.equal('Gear updated successfully');
            console.log(res.body.user.gear)
            const returnedGear = res.body.user.gear.map(({ category, item }) => ({ category, item }));
            expect(returnedGear).to.deep.equal(gearData);

            // expect(res.body.user.gear).to.deep.equal(gearData);
        });

        it('should return 404 if user not found', async () => {
            const fakeToken = jwt.sign({ id: new mongoose.Types.ObjectId(), email: 'fake@example.com' }, process.env.JWT_SECRET || 'testsecret');

            const res = await chai.request(app)
                .post('/api/users/update/gear')
                .set('Cookie', `token=${fakeToken}`)
                .send({ gear: [] });

            expect(res).to.have.status(404);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('User not found');
        });

        it('should return 401 if no token provided', async () => {
            const res = await chai.request(app)
                .post('/api/users/update/gear')
                .send({ gear: [] });

            expect(res).to.have.status(401);
        });
    });

});

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../server');
const Favorite = require('../models/favorite');
const User = require('../models/users');
const Trail = require("../models/trails");

const expect = chai.expect;
chai.use(chaiHttp);

let user, token, userId, trail;

const sampleTrail = {
    name: "Test Trail",
    distanceKm: 10,
    avgElevationM: 200,
    timeMinutes: 120,
    location: "Test Location",
    photoUrl: "http://example.com/trail.jpg",
    description: "Test trail description",
    latitude: 49.0,
    longitude: -123.0,
    tags: ["Test"]
};

describe('Favorite API Routes', () => {

    beforeEach(async () => {
        await Favorite.deleteMany({});
        await User.deleteMany({});
        await Trail.deleteMany({});

        user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'testpassword123' });
        token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
        userId = user._id;

        trail = await Trail.create(sampleTrail);
        await Favorite.create({ userId: userId, trailID: trail._id });
    });

    afterEach(async () => {
        await Favorite.deleteMany({});
        await User.deleteMany({});
        await Trail.deleteMany({});
    });


    describe('POST /addFavorite', () => {
        it('should add a favorite trail', (done) => {
            chai.request(app)
                .post('/api/favorite/addFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: new mongoose.Types.ObjectId().toString() })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'Favorite added successfully');
                    expect(res.body.favorite).to.have.property('trailID');
                    done();
                });
        });

        it('should not add duplicate favorite', (done) => {
            chai.request(app)
                .post('/api/favorite/addFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: trail._id.toString() })
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message', 'Trail is already in favorites');
                    done();
                });
        });

        it('should return 400 if trailID is missing', (done) => {
            chai.request(app)
                .post('/api/favorite/addFavorite')
                .set('Cookie', `token=${token}`)
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('GET /getFavoriteTrails', () => {
        it('should get user\'s favorite trails', (done) => {
            chai.request(app)
                .get('/api/favorite/getFavoriteTrails')
                .set('Cookie', `token=${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('trailID').that.equals(trail._id.toString());
                    done();
                });
        });
    });

    describe('POST /isFavorite', () => {
        it('should return true for favorited trail', (done) => {
            chai.request(app)
                .post('/api/favorite/isFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: trail._id.toString() })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('isFavorite', true);
                    done();
                });
        });

        it('should return false for non-favorited trail', (done) => {
            chai.request(app)
                .post('/api/favorite/isFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: new mongoose.Types.ObjectId().toString() })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('isFavorite', false);
                    done();
                });
        });

        it('should return 400 if trailID is missing', (done) => {
            chai.request(app)
                .post('/api/favorite/isFavorite')
                .set('Cookie', `token=${token}`)
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('DELETE /deleteFavorite', () => {
        it('should delete favorite trail', (done) => {
            chai.request(app)
                .delete('/api/favorite/deleteFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: trail._id.toString() })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Favorite removed successfully');
                    done();
                });
        });

        it('should return 404 if favorite not found', (done) => {
            chai.request(app)
                .delete('/api/favorite/deleteFavorite')
                .set('Cookie', `token=${token}`)
                .send({ trailID: new mongoose.Types.ObjectId().toString() })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'Favorite not found');
                    done();
                });
        });

        it('should return 400 if trailID is missing', (done) => {
            chai.request(app)
                .delete('/api/favorite/deleteFavorite')
                .set('Cookie', `token=${token}`)
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});

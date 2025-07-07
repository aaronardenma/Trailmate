// process.env.NODE_ENV = 'test';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const app = require('../server');
//
// const Favorite = require('../models/favorite');
// const User = require('../models/users');
// const Trail = require("../models/trails");
//
// const expect = chai.expect;
// chai.use(chaiHttp);
//
// describe('Favorite API Routes', () => {
//     let user, token, trailID, trail;
//
//     beforeEach(async () => {
//         await Favorite.deleteMany({});
//         await User.deleteMany({});
//
//         user = await User.create({
//             firstName: 'Test',
//             lastName: 'User',
//             email: 'favorite@example.com',
//             password: 'password123'
//         });
//
//         token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
//         trail = await Trail.create( {
//             name: "Oceanview Path",
//             latitude: 49.2700,
//             longitude: -123.1250,
//             photoUrl: "https://example.com/trails/oceanview.jpg",
//             location: "Burnaby",
//             description: "Moderate trail with breathtaking views of the ocean.",
//             avgElevationM: 280,
//             difficulty: "Moderate",
//             distanceKm: 6.1,
//             tags: []
//         })
//         trailID = trail._id
//     });
//
//     afterEach(async () => {
//         await Favorite.deleteMany({});
//         await User.deleteMany({});
//         await Trail.deleteMany({});
//     });
//
//     describe('POST /api/favorites/addFavorite', () => {
//         it('should add a trail to favorites', async () => {
//             const res = await chai.request(app)
//                 .post('/api/favorite/addFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID });
//
//             expect(res).to.have.status(201);
//             console.log(res.body.message)
//             expect(res.body).to.have.property('message', 'Favorite added successfully');
//         });
//
//         it('should return 400 if trailID is missing', async () => {
//             const res = await chai.request(app)
//                 .post('/api/favorite/addFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({});
//
//             expect(res).to.have.status(400);
//         });
//
//         it('should return 409 if trail already exists in favorites', async () => {
//             await Favorite.create({ userId: user._id, trailID });
//
//             const res = await chai.request(app)
//                 .post('/api/favorite/addFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID });
//
//             expect(res).to.have.status(409);
//         });
//     });
//
//     describe('GET /api/favorites/getFavoriteTrails', () => {
//         it('should return favorite trails for the user', async () => {
//             await Favorite.create({ userId: user._id, trailID });
//
//             const res = await chai.request(app)
//                 .get('/api/favorite/getFavoriteTrails')
//                 .set('Cookie', `token=${token}`)
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('array');
//             expect(res.body[0].trailID.toString()).to.equal(trailID.toString());
//         });
//     });
//
//     describe('POST /api/favorites/isFavorite', () => {
//         it('should return true if trail is favorited', async () => {
//             await Favorite.create({ userId: user._id, trailID });
//
//             const res = await chai.request(app)
//                 .post('/api/favorite/isFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID });
//
//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('isFavorite', true);
//         });
//
//         it('should return false if trail is not favorited', async () => {
//             const res = await chai.request(app)
//                 .post('/api/favorite/isFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID: trailID });
//
//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('isFavorite', false);
//         });
//
//         it('should return 400 if trailID is missing', async () => {
//             const res = await chai.request(app)
//                 .post('/api/favorite/isFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({});
//
//             expect(res).to.have.status(400);
//         });
//     });
//
//     describe('DELETE /api/favorites/deleteFavorite', () => {
//         it('should remove a favorite trail', async () => {
//             await Favorite.create({ userId: user._id, trailID });
//
//             const res = await chai.request(app)
//                 .delete('/api/favorite/deleteFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID });
//
//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('message', 'Favorite removed successfully');
//         });
//
//         it('should return 404 if trail is not found', async () => {
//             const res = await chai.request(app)
//                 .delete('/api/favorite/deleteFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({ trailID });
//
//             expect(res).to.have.status(404);
//         });
//
//         it('should return 400 if trailID is missing', async () => {
//             const res = await chai.request(app)
//                 .delete('/api/favorite/deleteFavorite')
//                 .set('Cookie', `token=${token}`)
//                 .send({});
//
//             expect(res).to.have.status(400);
//         });
//     });
// });

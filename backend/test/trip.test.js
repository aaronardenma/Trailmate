// process.env.NODE_ENV = 'test';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const expect = chai.expect;
//
// const server = require('../server');
// const User = require('../models/users');
// const Trail = require('../models/trails');
// const Trip = require('../models/trips');
//
// chai.use(chaiHttp);
//
// let user, token, trail;
//
// const sampleTrail = {
//     name: "Test Trail",
//     distanceKm: 10,
//     avgElevationM: 200,
//     timeMinutes: 120,
//     location: "Test Location",
//     photoUrl: "http://example.com/trail.jpg",
//     description: "Test trail description",
//     latitude: 49.0,
//     longitude: -123.0,
//     tags: []
// };
//
// describe('Trip API Routes', () => {
//     beforeEach(async () => {
//         await User.deleteMany({});
//         await Trail.deleteMany({});
//         await Trip.deleteMany({});
//
//         user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'testpassword123' });
//         token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
//         trail = await Trail.create(sampleTrail);
//     });
//
//     afterEach(async () => {
//         await User.deleteMany({});
//         await Trail.deleteMany({});
//         await Trip.deleteMany({});
//     });
//
//     describe('POST /save', () => {
//         it('should save a new trip with status "Upcoming"', (done) => {
//             chai.request(server)
//                 .post('/api/trips/save')
//                 .set('Cookie', `token=${token}`)
//                 .send({
//                     trailID: trail._id,
//                     startDate: new Date(),
//                     endDate: new Date(),
//                     time: 100
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body.message).to.equal('Trip saved successfully!');
//                     expect(res.body.trip.status).to.equal('Upcoming');
//                     done();
//                 });
//         });
//
//         it('should return error when required fields are missing', (done) => {
//             chai.request(server)
//                 .post('/api/trips/save')
//                 .set('Cookie', `token=${token}`)
//                 .send({
//                     trailID: trail._id,
//                     startDate: new Date(),
//                     time: 100
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(400);
//                     expect(res.body.success).to.equal(false);
//                     expect(res.body.message).to.equal('Trail ID, start date, end date, and time are required');
//                     done();
//                 });
//         });
//     });
//
//     describe('POST /start', () => {
//         it('should start a new trip with status "In Progress"', (done) => {
//             chai.request(server)
//                 .post('/api/trips/start')
//                 .set('Cookie', `token=${token}`)
//                 .send({
//                     trailID: trail._id,
//                     startDate: new Date(),
//                     endDate: new Date(),
//                     time: 100
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body.message).to.equal('Trip started successfully!');
//                     expect(res.body.trip.status).to.equal('In Progress');
//                     done();
//                 });
//         });
//
//         it('should return error if the trip has no required fields', (done) => {
//             chai.request(server)
//                 .post('/api/trips/start')
//                 .set('Cookie', `token=${token}`)
//                 .send({
//                     trailID: trail._id,
//                     startDate: new Date(),
//                     time: 100
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(400);
//                     expect(res.body.success).to.equal(false);
//                     expect(res.body.message).to.equal('Trail ID, start date, end date, and time are required');
//                     done();
//                 });
//         });
//     });
//
//     describe('GET /', () => {
//         it('should retrieve all user trips', async () => {
//             await Trip.create({ userId: user._id, trailID: trail._id, startDate: new Date(), endDate: new Date(), time: 60, status: 'Upcoming' });
//             const res = await chai.request(server)
//                 .get('/api/trips/')
//                 .set('Cookie', `token=${token}`);
//
//             expect(res).to.have.status(200);
//             expect(res.body.success).to.be.true;
//             expect(res.body.trips).to.be.an('array').with.lengthOf(1);
//         });
//
//         it('should return an empty array if the user has no trips', (done) => {
//             chai.request(server)
//                 .get('/api/trips/')
//                 .set('Cookie', `token=${token}`)
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body.success).to.be.true;
//                     expect(res.body.trips).to.be.an('array').that.is.empty;
//                     done();
//                 });
//         });
//     });
//
//     describe('PUT /updateStatus/:tripId', () => {
//         it('should update the trip status', async () => {
//             const trip = await Trip.create({ userId: user._id, trailID: trail._id, startDate: new Date(), endDate: new Date(), time: 60, status: 'Upcoming' });
//             const res = await chai.request(server)
//                 .put(`/api/trips/updateStatus/${trip._id}`)
//                 .set('Cookie', `token=${token}`)
//                 .send({ status: 'Completed' });
//
//             expect(res).to.have.status(200);
//             expect(res.body.message).to.equal('Trip status updated successfully');
//             expect(res.body.trip.status).to.equal('Completed');
//         });
//
//         it('should return an error if status is invalid', async () => {
//             const trip = await Trip.create({ userId: user._id, trailID: trail._id, startDate: new Date(), endDate: new Date(), time: 60, status: 'Upcoming' });
//             const res = await chai.request(server)
//                 .put(`/api/trips/updateStatus/${trip._id}`)
//                 .set('Cookie', `token=${token}`)
//                 .send({ status: 'InvalidStatus' });
//
//             expect(res).to.have.status(400);
//             expect(res.body.message).to.equal('Invalid status. Must be Upcoming, In Progress, or Completed');
//         });
//     });
//
//     describe('DELETE /delete/:tripId', () => {
//         it('should delete a user\'s trip', async () => {
//             const trip = await Trip.create({ userId: user._id, trailID: trail._id, startDate: new Date(), endDate: new Date(), time: 60, status: 'Upcoming' });
//             const res = await chai.request(server)
//                 .delete(`/api/trips/delete/${trip._id}`)
//                 .set('Cookie', `token=${token}`);
//
//             expect(res).to.have.status(200);
//             expect(res.body.message).to.equal('Trip deleted successfully');
//         });
//
//         it('should return error if trip not found', async () => {
//             const res = await chai.request(server)
//                 .delete('/api/trips/delete/60d7e14f7c411e6348f9f71d')
//                 .set('Cookie', `token=${token}`);
//
//             expect(res).to.have.status(404);
//             expect(res.body.message).to.equal('Trip not found or not authorized');
//         });
//     });
// });

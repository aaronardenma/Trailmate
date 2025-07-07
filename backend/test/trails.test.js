process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const server = require('../server');
const Trails = require('../models/trails');
const Tags = require('../models/tags')

chai.use(chaiHttp);

let trailId;

const sampleTrails = [
    {
        name: "Sunset Ridge Trail",
        latitude: 49.2500,
        longitude: -123.1000,
        photoUrl: "https://example.com/trails/sunset_ridge.jpg",
        location: "North Vancouver",
        description: "A beautiful trail with scenic sunset views.",
        avgElevationM: 300,
        difficulty: "Moderate",
        distanceKm: 7.5,
        tags: []
    },
    {
        name: "Eagle Peak Loop",
        latitude: 49.2800,
        longitude: -123.1300,
        photoUrl: "https://example.com/trails/eagle_peak.jpg",
        location: "West Vancouver",
        description: "Challenging loop with panoramic mountain vistas.",
        avgElevationM: 650,
        difficulty: "Challenging",
        distanceKm: 12.3,
        tags: []
    },
    {
        name: "Maple Grove Trail",
        latitude: 49.2650,
        longitude: -123.1100,
        photoUrl: "https://example.com/trails/maple_grove.jpg",
        location: "Vancouver",
        description: "Easy and family-friendly trail through maple forests.",
        avgElevationM: 150,
        difficulty: "Easy",
        distanceKm: 4.2,
        tags: []
    },
    {
        name: "Oceanview Path",
        latitude: 49.2700,
        longitude: -123.1250,
        photoUrl: "https://example.com/trails/oceanview.jpg",
        location: "Burnaby",
        description: "Moderate trail with breathtaking views of the ocean.",
        avgElevationM: 280,
        difficulty: "Moderate",
        distanceKm: 6.1,
        tags: []

    }
];

module.exports = sampleTrails;


beforeEach(async () => {
    await Trails.deleteMany({});
    const inserted = await Trails.insertMany(sampleTrails);
    trailId = inserted[0]._id.toString();
});

afterEach(async () => {
    await Trails.deleteMany({});
});

describe('Trail API Test Collection', () => {

    // it('should test equality of two values', function () {
    //     expect(10).to.equal(10);
    // });

    it('should get all 5 trails', (done) => {
        chai.request(server)
            .get('/api/trails/getTrails')
            .end((err, res) => {
                expect(res).to.have.status(200);

                expect(res.body).to.be.an('array').with.lengthOf(4);
                expect(res.body[0]).to.include.keys(
                    '_id', 'name', 'latitude', 'longitude', 'photoUrl', 'location',
                    'description', 'avgElevationM', 'difficulty', 'distanceKm', 'tags'
                );

                done();
            });
    });

    describe('POST /addTrail', () => {
        it('should create a new trail', (done) => {
            chai.request(server)
                .post('/api/trails/addTrail')
                .send({
                    name: "New Trail",
                    distanceKm: 4.2,
                    avgElevationM: 200,
                    timeMinutes: 60,
                    location: "Somewhere",
                    photoUrl: "http://example.com/new.jpg",
                    description: "Just testing.",
                    latitude: 49.0,
                    longitude: -123.0,
                    tags: []
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal("Trail added successfully");
                    expect(res.body.trail).to.include({name: "New Trail"});
                    done();
                });
        });
    });

    describe('GET /getTrailById/:id', () => {
        it('should fetch a trail by valid ID', (done) => {
            chai.request(server)
                .get(`/api/trails/getTrailById/${trailId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id', trailId);
                    expect(res.body.name).to.equal("Sunset Ridge Trail");
                    done();
                });
        });

        it('should return 404 for non-existing ID', (done) => {
            const fakeId = new mongoose.Types.ObjectId();
            chai.request(server)
                .get(`/api/trails/getTrailById/${fakeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.message).to.equal('Trail not found');
                    done();
                });
        });
    });
});

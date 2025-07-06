process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const server = require('../server'); // make sure this exports your express app
const Trails = require('../models/trails');
const Tags = require('../models/tags')

chai.use(chaiHttp);

let trailId;

const sampleTrails = [
    {
        name: "Grouse Grind",
        distanceKm: 2.9,
        avgElevationM: 853,
        timeMinutes: 105,
        location: "North Vancouver, BC",
        photoUrl: "https://explore-mag.com/wp-content/uploads/2024/03/Grouse-Grind_327942_max.png",
        description: "A steep and challenging trail.",
        latitude: 49.371206,
        longitude: -123.098424,
        tags: ["6868a33d60ce72eeb17cb831", "6868a33d60ce72eeb17cb835"]
    },
    {
        name: "Lynn Loop",
        distanceKm: 5.1,
        avgElevationM: 100,
        timeMinutes: 90,
        location: "Lynn Valley, BC",
        photoUrl: "http://example.com/lynnloop.jpg",
        description: "Peaceful forest loop.",
        latitude: 49.355,
        longitude: -123.016,
        tags: ["6868a33d60ce72eeb17cb838", "6868a33d60ce72eeb17cb82e"]
    },
    {
        name: "Stawamus Chief",
        distanceKm: 7.6,
        avgElevationM: 610,
        timeMinutes: 180,
        location: "Squamish, BC",
        photoUrl: "http://example.com/chief.jpg",
        description: "Famous granite monolith hike.",
        latitude: 49.683,
        longitude: -123.155,
        tags: ["6868a33d60ce72eeb17cb82e", "6868a33d60ce72eeb17cb831"]
    },
    // {
    //     name: "Dog Mountain",
    //     distanceKm: 5.0,
    //     avgElevationM: 150,
    //     timeMinutes: 75,
    //     location: "Mount Seymour, BC",
    //     photoUrl: "http://example.com/dogmountain.jpg",
    //     description: "Easy with great views.",
    //     latitude: 49.384,
    //     longitude: -122.95,
    //     tags: ["Easy", "Viewpoint"]
    // },
    // {
    //     name: "Quarry Rock",
    //     distanceKm: 3.8,
    //     avgElevationM: 100,
    //     timeMinutes: 60,
    //     location: "Deep Cove, BC",
    //     photoUrl: "http://example.com/quarryrock.jpg",
    //     description: "Short, sweet, and scenic.",
    //     latitude: 49.325,
    //     longitude: -122.948,
    //     tags: ["Family", "Short"]
    // }
];

const sampleTags = [
    {
        // _id: new mongoose.Schema.Types.ObjectId,
        name: "Challenging",
    },
    {
        name: "Easy",
    },
    {
        name: "Scenic",
    },
    {
        name: "Loop",
    },
    {
        name: "Family",

    }
];

beforeEach(async () => {
    await Trails.deleteMany({});
    const inserted = await Trails.insertMany(sampleTrails);
    trailId = inserted[0]._id.toString(); // Save ID of Grouse Grind
});

afterEach(async () => {
    await Trails.deleteMany({});
});

describe('Trail API Test Collection', () => {

    it('should test equality of two values', function () {
        expect(10).to.equal(10);
    });

    it('should get all 5 trails', (done) => {
        chai.request(server)
            .get('/api/trails/getTrails')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').with.lengthOf(3);
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
                    expect(res.body.name).to.equal("Grouse Grind");
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

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
// const sinon = require('sinon');
const app = require('../server');
const Gear = require('../models/gear');

const expect = chai.expect;
chai.use(chaiHttp);
let sampleGear;

describe('Gear API Routes', () => {

    sampleGear = [
        { category: 'Essentials', items: [] },
        { category: 'Shelter', items: [] }
    ];



    beforeEach(async () => {
        await Gear.deleteMany({});
        await Gear.insertMany(sampleGear);
    });

    afterEach(async () => {
        await Gear.deleteMany({});
    });


    it('should return all gear items', (done) => {
        chai.request(app)
            .get('/api/gear')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(2);
                console.log(res.body[0])
                expect(res.body[0]).to.have.property('category');
                expect(res.body[0]).to.have.property('items');
                done();
            });
    });

    it('should return an empty array if no gear exists', async () => {
        await Gear.deleteMany({});

        const res = await chai.request(app).get('/api/gear');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.is.empty;
    });

    // it('should return 500 on database failure', async () => {
    //     const stub = sinon.stub(Gear, 'find').throws(new Error('DB failure'));
    //
    //     const res = await chai.request(app).get('/api/gear');
    //     expect(res).to.have.status(500);
    //     expect(res.body).to.have.property('message', 'Failed to load gear data');
    //
    //     stub.restore();
    // });

});

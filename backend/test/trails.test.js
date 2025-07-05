process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const server = require('../server');
const Trails = require('../models/trails');

chai.use(chaiHttp);

before(async () => {
    await Trails.deleteMany({});
});

after(async () => {
    await Trails.deleteMany({});
});

describe('Test Collection', function() {
    it('should test equality of two values', function() {
        const expectedValue = 10;
        const actualValue = 10;

        expect(actualValue).to.be.equal(expectedValue);  // Assert equality
    });

    it('should test zero trails', (done) => {
        chai.request(server)
            .get('/api/trails/getTrails')
            .end((err, res) => {
                if (err) return done(err);

                res.should.have.status(200);
                res.body.should.be.an('array').that.is.empty;

                done();
            });
    });

});

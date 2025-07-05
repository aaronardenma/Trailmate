process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const server = require('../server');
const Favorite = require('../models/favorite');

before(async () => {
    await Favorite.deleteMany({});
});

after(async () => {
    await Favorite.deleteMany({});
});

describe('/First Test Collection', function() {
    it('should test two values...', function() {
        const expectedValue = 10;
        const actualValue = 10;

        expect(actualValue).to.be.equal(expectedValue);  // Assert equality
    });
});

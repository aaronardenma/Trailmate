// process.env.NODE_ENV = 'test';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../server');
// const Tag = require('../models/tags');
//
// const expect = chai.expect;
// chai.use(chaiHttp);
// const sampleTags  = [{ name: 'Scenic' },
//     { name: 'Challenging' }]
//
// describe('Tag API', () => {
//
//     beforeEach(async () => {
//         await Tag.deleteMany({});
//         await Tag.insertMany(sampleTags);
//     });
//
//     afterEach(async () => {
//         await Tag.deleteMany({});
//     });
//
//     describe('GET /api/tags', () => {
//         it('should return all tags', async () => {
//             const res = await chai.request(app).get('/api/tags');
//
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('array');
//             expect(res.body.length).to.equal(2);
//             expect(res.body[0]).to.have.property('name');
//             expect(res.body[0]).to.have.property('name', 'Scenic');
//             expect(res.body[1]).to.have.property('name', 'Challenging');
//         });
//
//         it('should return an empty array when no tags exist', async () => {
//             await Tag.deleteMany({});
//             const res = await chai.request(app).get('/api/tags');
//
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('array').that.is.empty;
//         });
//     });
// });

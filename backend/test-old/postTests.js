// process.env.NODE_ENV = 'test';
//
// let mongoose = require("mongoose");
// let Posts = require('../models/posts');
// const server = require("../server")
//
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const {expect} = require("chai");
// chai.use(chaiHttp);
// let should = chai.should();
//
//
// describe('Posts', () => {
//     it('should add numbers', () => {
//         expect(1 + 1).to.equal(2);
//     });
//
//     it('it should GET all the posts', (done) => {
//         chai.request(server)
//             .get('/api/posts/getPosts')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//                 done();
//             });
//     });
// });

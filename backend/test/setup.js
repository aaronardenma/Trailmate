// process.env.NODE_ENV = 'test';
//
// const mongoose = require('mongoose');
// const User = require('../models/users');
// const Post = require('../models/posts');
// const Comment = require('../models/comments');
// const Trail = require('../models/trails');
//
// let sampleUsers = [];
// let samplePost;
// let sampleTrails = [];
//
// async function setupTestData() {
//     await mongoose.connection.dropDatabase();
//
//     sampleUser = await User.create({
//         firstName: 'Test',
//         lastName: 'User',
//         email: 'test@example.com',
//         password: 'testpassword123'
//     });
//
//
//     sampleTrail = await Trail.create({
//         name: 'Test Trail',
//         latitude: 49.2827,
//         longitude: -123.1207,
//         photoUrl: 'https://example.com/trail.jpg',
//         location: 'Vancouver',
//         description: 'A scenic trail',
//         avgElevationM: 200,
//         difficulty: 'Moderate',
//         distanceKm: 5.5
//     });
// }
//
// async function teardownTestData() {
//     await mongoose.connection.dropDatabase();
// }
//
// module.exports = {
//     setupTestData,
//     teardownTestData,
//     getSampleData: () => ({
//         user: sampleUser,
//         post: samplePost,
//         trail: sampleTrail
//     })
// };

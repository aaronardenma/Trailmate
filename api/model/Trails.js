
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const trailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    city: String,
    description: String,
    elevation: String,
    weather: String,
    tags: [String],
    difficulty: String,
    distance: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Trail', trailsSchema);


// const mongoose = require('mongoose');
// const {UUID} = require("mongodb");
// const Schema = mongoose.Schema;
//
// const trialsSchema = new Schema({
//     id: UUID,
//     name: String,
//     latitude: Float32Array,
//     longitude: Float32Array,
//     city: String,
//     description: String,
//     elevation: String,
//     weather: String,
//     tags: Array,
//     difficulty: String,
//     distance: String,
// });
//
// module.exports = mongoose.model('Trails', trialsSchema);
//
//
//
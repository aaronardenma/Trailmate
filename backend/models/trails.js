
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailsSchema = new Schema({
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
    photoUrl: {
        type: String,
        required: true
    },
    city: String,
    description: String,
    avgElevationM: Number,
    weather: String,
    tags: [String],
    difficulty: String,
    distanceKm: Number,
}, {
    timestamps: true
});

const Trail = mongoose.model('Trail', trailsSchema);
module.exports = Trail;


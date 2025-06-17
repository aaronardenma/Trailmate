
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

const Trail = mongoose.model('Trail', trailsSchema);
module.exports = Trail;



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
    location: String,
    description: String,
    avgElevationM: Number,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Challenging']
    },
    distanceKm: Number,
}, {
    timestamps: true
});

const Trail = mongoose.model('Trail', trailsSchema);
module.exports = Trail;


const mongoose = require('mongoose');

const hazardSchema = new mongoose.Schema({
    trailID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trail',
        required: true
    },
    description: String,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    dateOfPost: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Hazard', hazardSchema);

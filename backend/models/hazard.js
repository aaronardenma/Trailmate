const mongoose = require('mongoose');

const hazardSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    trailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trail',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Hazard', hazardSchema);

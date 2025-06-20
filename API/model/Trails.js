const mongoose = require('mongoose');
const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const trialsSchema = new Schema({
    id: UUID,
    name: String,
    latitude: Float32Array,
    longitude: Float32Array,
    city: String,
    description: String,
    elevation: String,
    weather: String,
    tags: Array,
    difficulty: String,
    distance: String,
});

module.exports = mongoose.model('Trails', trialsSchema);




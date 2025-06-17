const mongoose = require('mongoose');
const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
    id: UUID,
    userId: UUID,
    trailsID: UUID,
    dateOfTrip: Date,
    userRating: Number,
    userComments: String,
});


const Trip = mongoose.model('Trip', tripsSchema);
module.exports = Trip;

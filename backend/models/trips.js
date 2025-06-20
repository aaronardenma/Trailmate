const mongoose = require('mongoose');
const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
    userId: String,
    trailID: String,
    dateOfTrip: Date,
    status:String,
    userRating: Number,
    userComments: String,

});


const Trip = mongoose.model('Trip', tripsSchema);
module.exports = Trip;

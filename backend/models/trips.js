const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripsSchema = new Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true},
    trailID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trail',
            required: true},
    dateOfTrip: Date,
    status:String,
    userRating: Number,
    userComments: String,
});


const Trip = mongoose.model('Trip', tripsSchema);
module.exports = Trip;

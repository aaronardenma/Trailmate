const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
    trailID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trail',
        required: true},
});


const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;

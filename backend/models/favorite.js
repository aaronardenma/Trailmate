const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: String,
    trailID: String,
});


const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;

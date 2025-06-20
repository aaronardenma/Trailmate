const mongoose = require('mongoose');
const {UUID} = require("mongodb");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: UUID,
    firstName: String,
    lastName: String,
    email: String,
    badge: String,
    gender: String,
    language: String,
    nickname: String,
    country: String,
    // preferences: ,
});


module.exports = mongoose.model('Users', usersSchema);